/**
 * NotificationBadge Atom
 * Classic Mac OS 8/9 notification count badge
 */

import { type FC } from 'react';
import styles from './NotificationBadge.module.css';

export interface NotificationBadgeProps {
  /** Notification count to display */
  count: number;
  /** Maximum count before showing "max+" (default: 9) */
  max?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * NotificationBadge - Small red bubble with count
 *
 * Classic Mac OS style notification badge.
 * Shows count up to max, then "max+" (e.g., "9+")
 * Hidden when count is 0.
 */
export const NotificationBadge: FC<NotificationBadgeProps> = ({
  count,
  max = 9,
  className = '',
}) => {
  // Don't render if count is 0 or negative
  if (count <= 0) {
    return null;
  }

  const classNames = [
    styles.badge,
    className,
  ].filter(Boolean).join(' ');

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span 
      className={classNames}
      aria-label={`${count} notification${count !== 1 ? 's' : ''}`}
    >
      {displayCount}
    </span>
  );
};
