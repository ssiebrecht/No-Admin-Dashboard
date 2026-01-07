/**
 * Desktop Organism
 * Classic Mac OS 8/9 desktop with icons and window container
 */

import { type FC, type ReactNode, type MouseEvent, useCallback } from 'react';
import { DesktopIcon } from '../../molecules/DesktopIcon';
import { useDesktopStore } from '../../../store/desktopStore';
import { useWindowStore } from '../../../store/windowStore';
import { useMenuStore } from '../../../store/menuStore';
import type { DesktopIconData } from '../../../types/desktop';
import styles from './Desktop.module.css';

export interface DesktopProps {
  /** Callback when a desktop icon is double-clicked */
  onIconOpen?: (icon: DesktopIconData) => void;
  /** Children (usually Window components) */
  children?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * Desktop - Classic Mac OS desktop
 *
 * Features:
 * - Blue-gray desktop background with optional pattern
 * - Desktop icons (Dashboard, Users, Files, Settings, Trash)
 * - Windows rendered as children
 * - Click on desktop to clear selection
 * - Double-click icon to open window
 * - Trash icon fixed at bottom
 */
export const Desktop: FC<DesktopProps> = ({
  onIconOpen,
  children,
  className = '',
}) => {
  const { icons, selectedIconId, selectIcon, clearSelection } = useDesktopStore();
  const { openWindow } = useWindowStore();
  const { closeMenu, activeMenuId } = useMenuStore();

  // Handle click on desktop background
  const handleDesktopClick = useCallback((e: MouseEvent) => {
    // Only clear selection if clicking directly on desktop
    if (e.target === e.currentTarget) {
      clearSelection();
      
      // Close any open menus
      if (activeMenuId) {
        closeMenu();
      }
    }
  }, [clearSelection, closeMenu, activeMenuId]);

  // Handle icon selection
  const handleIconSelect = useCallback((iconId: string) => {
    selectIcon(iconId);
  }, [selectIcon]);

  // Handle icon double-click (open)
  const handleIconDoubleClick = useCallback((icon: DesktopIconData) => {
    if (icon.windowId) {
      // Open the associated window
      openWindow({
        id: icon.windowId,
        title: icon.label,
        icon: icon.icon,
        initialPosition: { x: 100, y: 60 },
        initialSize: { width: 500, height: 400 },
      });
    }
    
    onIconOpen?.(icon);
  }, [openWindow, onIconOpen]);

  const classNames = [styles.desktop, className].filter(Boolean).join(' ');

  // Separate trash icon from others
  const regularIcons = icons.filter((i) => i.type !== 'trash');
  const trashIcon = icons.find((i) => i.type === 'trash');

  return (
    <div className={classNames} onClick={handleDesktopClick}>
      {/* Desktop Icons */}
      <div className={styles.iconsContainer}>
        {regularIcons.map((icon) => (
          <div
            key={icon.id}
            className={styles.iconPosition}
            style={{
              left: icon.position.x,
              top: icon.position.y,
            }}
          >
            <DesktopIcon
              icon={icon.icon}
              label={icon.label}
              selected={selectedIconId === icon.id}
              onSelect={() => handleIconSelect(icon.id)}
              onDoubleClick={() => handleIconDoubleClick(icon)}
            />
          </div>
        ))}
      </div>

      {/* Trash Icon - Fixed at bottom right */}
      {trashIcon && (
        <div className={styles.trashContainer}>
          <DesktopIcon
            icon={trashIcon.icon}
            label={trashIcon.label}
            selected={selectedIconId === trashIcon.id}
            onSelect={() => handleIconSelect(trashIcon.id)}
            onDoubleClick={() => handleIconDoubleClick(trashIcon)}
          />
        </div>
      )}

      {/* Windows Container */}
      <div className={styles.windowsContainer}>
        {children}
      </div>
    </div>
  );
};
