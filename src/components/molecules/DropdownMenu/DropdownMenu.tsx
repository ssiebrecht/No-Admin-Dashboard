/**
 * DropdownMenu Molecule
 * Classic Mac OS 8/9 dropdown menu with items, separators, and submenus
 */

import { type FC, type MouseEvent, useEffect, useRef, useState } from 'react';
import type { MenuItem, MenuPosition } from '../../../types/menu';
import styles from './DropdownMenu.module.css';

export interface DropdownMenuProps {
  /** Menu items to display */
  items: MenuItem[];
  /** Whether the menu is visible */
  isOpen: boolean;
  /** Position of the dropdown */
  position: MenuPosition;
  /** Callback when menu should close */
  onClose: () => void;
  /** Callback when an item is clicked */
  onItemClick: (item: MenuItem) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * DropdownMenu - Classic Mac OS dropdown menu
 *
 * Features:
 * - Menu items with optional icons and shortcuts
 * - Separator lines
 * - Nested submenus with arrow indicator
 * - Disabled items
 * - Classic shadow and border styling
 */
export const DropdownMenu: FC<DropdownMenuProps> = ({
  items,
  isOpen,
  position,
  onClose,
  onItemClick,
  className = '',
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<MenuPosition>({ x: 0, y: 0 });
  const submenuTimeoutRef = useRef<number | null>(null);

  // Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Delay to prevent immediate close from triggering click
    const timeout = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Cleanup submenu timeout
  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleItemClick = (e: MouseEvent, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();

    if (item.disabled || item.separator) return;

    // If item has submenu, don't trigger action
    if (item.submenu && item.submenu.length > 0) return;

    onItemClick(item);
    onClose();
  };

  const handleItemMouseEnter = (e: MouseEvent, item: MenuItem) => {
    // Clear previous timeout
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }

    if (item.submenu && item.submenu.length > 0) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      
      // Position submenu to the right of the item
      setSubmenuPosition({
        x: rect.right - 2,
        y: rect.top,
      });
      setActiveSubmenu(item.id);
    } else {
      // Delay closing submenu to prevent flickering
      submenuTimeoutRef.current = window.setTimeout(() => {
        setActiveSubmenu(null);
      }, 100);
    }
  };

  const classNames = [styles.dropdown, className].filter(Boolean).join(' ');

  return (
    <div
      ref={menuRef}
      className={classNames}
      style={{
        left: position.x,
        top: position.y,
      }}
      role="menu"
    >
      {items.map((item) => {
        if (item.separator) {
          return <div key={item.id} className={styles.separator} role="separator" />;
        }

        const itemClassNames = [
          styles.item,
          item.disabled ? styles.disabled : '',
          item.submenu ? styles.hasSubmenu : '',
          activeSubmenu === item.id ? styles.submenuOpen : '',
        ].filter(Boolean).join(' ');

        return (
          <div
            key={item.id}
            className={itemClassNames}
            onClick={(e) => handleItemClick(e, item)}
            onMouseEnter={(e) => handleItemMouseEnter(e, item)}
            role="menuitem"
            aria-disabled={item.disabled}
            aria-haspopup={item.submenu ? 'menu' : undefined}
          >
            <span className={styles.iconSlot}>
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
            </span>
            <span className={styles.label}>{item.label}</span>
            {item.shortcut && (
              <span className={styles.shortcut}>{item.shortcut}</span>
            )}
            {item.submenu && item.submenu.length > 0 && (
              <span className={styles.submenuArrow}>▶</span>
            )}
            
            {/* Render submenu */}
            {activeSubmenu === item.id && item.submenu && (
              <DropdownMenu
                items={item.submenu}
                isOpen={true}
                position={submenuPosition}
                onClose={() => setActiveSubmenu(null)}
                onItemClick={(subItem) => {
                  onItemClick(subItem);
                  onClose();
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
