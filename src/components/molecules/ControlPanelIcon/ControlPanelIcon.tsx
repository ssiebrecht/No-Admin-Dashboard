/**
 * ControlPanelIcon Molecule
 * Classic Mac OS 8/9 control panel icon grid cell
 */

import { type FC, type MouseEvent } from 'react';
import { Text } from '../../atoms';
import styles from './ControlPanelIcon.module.css';

export interface ControlPanelIconProps {
  /** Icon to display (emoji or icon character) */
  icon: string;
  /** Label text displayed under the icon */
  label: string;
  /** Whether the icon is currently selected */
  selected?: boolean;
  /** Callback when icon is clicked (selection) */
  onSelect: () => void;
  /** Callback when icon is double-clicked (open panel) */
  onDoubleClick: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * ControlPanelIcon - Control panel icon for grid display
 *
 * Classic Mac OS style icon with:
 * - 32x32 icon area
 * - Name label below
 * - Selection highlight
 * - Single click to select, double click to open
 */
export const ControlPanelIcon: FC<ControlPanelIconProps> = ({
  icon,
  label,
  selected = false,
  onSelect,
  onDoubleClick,
  className = '',
}) => {
  const classNames = [
    styles.controlPanelIcon,
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
      <Text
        variant="small"
        className={styles.label}
        truncate
      >
        {label}
      </Text>
    </button>
  );
};
