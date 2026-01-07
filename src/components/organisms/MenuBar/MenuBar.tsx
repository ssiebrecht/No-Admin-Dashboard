/**
 * MenuBar Organism
 * Classic Mac OS 8/9 menu bar with Apple menu, system menus, and status icons
 */

import { type FC, type ReactNode, useRef, useCallback, useEffect, useState } from 'react';
import { MenuBarItem } from '../../molecules/MenuBarItem';
import { DropdownMenu } from '../../molecules/DropdownMenu';
import { Clock } from '../../atoms/Clock';
import { StatusIcon } from '../../atoms/StatusIcon';
import { NotificationBadge } from '../../atoms/NotificationBadge';
import { NotificationCenter } from '../NotificationCenter';
import { useMenuStore } from '../../../store/menuStore';
import { useNotificationStore } from '../../../store/notificationStore';
import { menuConfig } from '../../../data/menuConfig';
import type { Menu, MenuItem, MenuPosition } from '../../../types/menu';
import styles from './MenuBar.module.css';

export interface MenuBarProps {
  /** Custom menus to override defaults (optional) */
  menus?: Menu[];
  /** Custom right-side items (optional) */
  rightItems?: ReactNode;
  /** Callback when a menu item is clicked */
  onMenuItemClick?: (item: MenuItem) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * MenuBar - Classic Mac OS menu bar
 *
 * Features:
 * - Fixed at top of screen (20px height)
 * - Apple menu on the left with system icon
 * - File, Edit, View, Special, Help menus
 * - Clock and status icons on the right
 * - Classic bevel border at bottom
 * - Dropdown menus with hover-switching
 */
export const MenuBar: FC<MenuBarProps> = ({
  menus = menuConfig,
  rightItems,
  onMenuItemClick,
  className = '',
}) => {
  const { activeMenuId, openMenu, closeMenu } = useMenuStore();
  const { getUnreadCount } = useNotificationStore();
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const menuPositions = useRef<Map<string, MenuPosition>>(new Map());
  const unreadCount = getUnreadCount();

  // Close menu when clicking outside
  useEffect(() => {
    if (!activeMenuId) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenuId, closeMenu]);

  // Handle menu item click
  const handleMenuClick = useCallback((menuId: string) => {
    if (activeMenuId === menuId) {
      closeMenu();
    } else {
      openMenu(menuId);
    }
  }, [activeMenuId, openMenu, closeMenu]);

  // Handle hover when a menu is already open
  const handleMenuHover = useCallback((menuId: string) => {
    if (activeMenuId && activeMenuId !== menuId) {
      openMenu(menuId);
    }
  }, [activeMenuId, openMenu]);

  // Handle menu item click
  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.action) {
      item.action();
    }
    onMenuItemClick?.(item);
    closeMenu();
  }, [onMenuItemClick, closeMenu]);

  // Get dropdown position for a menu
  const getDropdownPosition = (menuId: string): MenuPosition => {
    const cached = menuPositions.current.get(menuId);
    if (cached) return cached;
    
    return { x: 0, y: 20 };
  };

  // Store menu button positions for dropdown alignment
  const handleMenuRef = (menuId: string, element: HTMLDivElement | null) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      menuPositions.current.set(menuId, {
        x: rect.left,
        y: rect.bottom,
      });
    }
  };

  const classNames = [styles.menuBar, className].filter(Boolean).join(' ');

  return (
    <div ref={menuBarRef} className={classNames}>
      {/* Left side - Menus */}
      <div className={styles.menusContainer}>
        {menus.map((menu) => (
          <div
            key={menu.id}
            ref={(el) => handleMenuRef(menu.id, el)}
            className={styles.menuWrapper}
          >
            <MenuBarItem
              label={menu.label}
              icon={menu.icon}
              isOpen={activeMenuId === menu.id}
              onClick={() => handleMenuClick(menu.id)}
              onMouseEnter={() => handleMenuHover(menu.id)}
              disabled={menu.disabled}
            />
            
            {activeMenuId === menu.id && (
              <DropdownMenu
                items={menu.items}
                isOpen={true}
                position={getDropdownPosition(menu.id)}
                onClose={closeMenu}
                onItemClick={handleItemClick}
              />
            )}
          </div>
        ))}
      </div>

      {/* Right side - Status icons and clock */}
      <div className={styles.rightContainer}>
        {rightItems ?? (
          <>
            {/* Notification Bell */}
            <div className={styles.notificationWrapper} data-notification-trigger>
              <StatusIcon
                icon="🔔"
                tooltip="Notifications"
                onClick={() => setIsNotificationCenterOpen(!isNotificationCenterOpen)}
                isActive={isNotificationCenterOpen}
              />
              {unreadCount > 0 && (
                <NotificationBadge count={unreadCount} className={styles.notificationBadge} />
              )}
              <NotificationCenter
                isOpen={isNotificationCenterOpen}
                onClose={() => setIsNotificationCenterOpen(false)}
              />
            </div>
            <StatusIcon icon="📶" tooltip="Network" />
            <StatusIcon icon="🔊" tooltip="Sound" />
            <Clock format="12h" showDate={false} />
          </>
        )}
      </div>
    </div>
  );
};
