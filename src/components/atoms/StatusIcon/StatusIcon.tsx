/**
 * StatusIcon Atom
 * Classic Mac OS 8/9 menu bar status icons
 */

import { type FC, type MouseEvent } from 'react';
import styles from './StatusIcon.module.css';

export interface StatusIconProps {
  /** Icon to display (emoji or icon character) */
  icon: string;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Tooltip text shown on hover */
  tooltip?: string;
  /** Whether the icon is active/pressed */
  isActive?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * StatusIcon - Menu bar status indicator
 *
 * Small clickable icon in the right side of the menu bar.
 * Used for volume, network status, battery, etc.
 */
export const StatusIcon: FC<StatusIconProps> = ({
  icon,
  onClick,
  tooltip,
  isActive = false,
  className = '',
}) => {
  const classNames = [
    styles.statusIcon,
    isActive ? styles.active : '',
    onClick ? styles.clickable : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  if (onClick) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={handleClick}
        title={tooltip}
        aria-label={tooltip}
      >
        <span className={styles.iconContent}>{icon}</span>
      </button>
    );
  }

  return (
    <span className={classNames} title={tooltip}>
      <span className={styles.iconContent}>{icon}</span>
    </span>
  );
};
