/**
 * DesktopIcon Molecule
 * Classic Mac OS 8/9 desktop icon with label
 */

import { type FC, type MouseEvent } from 'react';
import styles from './DesktopIcon.module.css';

export interface DesktopIconProps {
  /** Icon to display (emoji or icon character) */
  icon: string;
  /** Label text displayed under the icon */
  label: string;
  /** Whether the icon is currently selected */
  selected?: boolean;
  /** Callback when icon is clicked (selection) */
  onSelect: () => void;
  /** Callback when icon is double-clicked (open) */
  onDoubleClick: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * DesktopIcon - Desktop icon with label
 *
 * Classic Mac OS style icon with:
 * - 32x32 icon area
 * - White text with shadow
 * - Selection highlight
 * - Single click to select, double click to open
 */
export const DesktopIcon: FC<DesktopIconProps> = ({
  icon,
  label,
  selected = false,
  onSelect,
  onDoubleClick,
  className = '',
}) => {
  const classNames = [
    styles.desktopIcon,
    selected ? styles.selected : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDoubleClick();
  };

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      aria-selected={selected}
    >
      <span className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
};
