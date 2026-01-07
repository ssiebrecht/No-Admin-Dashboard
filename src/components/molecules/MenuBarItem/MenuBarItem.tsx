/**
 * MenuBarItem Molecule
 * Classic Mac OS 8/9 menu bar item (clickable menu trigger)
 */

import { type FC, type MouseEvent } from 'react';
import styles from './MenuBarItem.module.css';

export interface MenuBarItemProps {
  /** Display label */
  label: string;
  /** Optional icon (for Apple menu) */
  icon?: string;
  /** Whether this menu is currently open */
  isOpen: boolean;
  /** Click handler to toggle menu */
  onClick: () => void;
  /** Mouse enter handler for menu switching */
  onMouseEnter?: () => void;
  /** Whether the menu is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * MenuBarItem - Single menu in the menu bar
 *
 * Renders as a clickable item that triggers a dropdown menu.
 * Highlights when hovered or when its dropdown is open.
 */
export const MenuBarItem: FC<MenuBarItemProps> = ({
  label,
  icon,
  isOpen,
  onClick,
  onMouseEnter,
  disabled = false,
  className = '',
}) => {
  const classNames = [
    styles.menuBarItem,
    isOpen ? styles.open : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled && onMouseEnter) {
      onMouseEnter();
    }
  };

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
};
