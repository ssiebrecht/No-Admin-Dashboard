/**
 * NotificationItem Molecule
 * Single notification for the notification center
 */

import { type FC } from 'react';
import { Icon, Text } from '../../atoms';
import type { IconName } from '../../atoms/Icon';
import type { Notification, NotificationType } from '../../../types/notification';
import { formatTimeAgo } from '../../../utils/timeFormat';
import styles from './NotificationItem.module.css';

export interface NotificationItemProps {
  /** Notification data */
  notification: Notification;
  /** Click handler */
  onClick?: (notification: Notification) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Icon mapping for notification types
 */
const TYPE_ICONS: Record<NotificationType, IconName> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

/**
 * NotificationItem - Single notification in the center
 *
 * Features:
 * - Icon based on type
 * - Title and optional message
 * - Relative timestamp (e.g., "2 min ago")
 * - Unread indicator (blue left border)
 * - Hover state
 */
export const NotificationItem: FC<NotificationItemProps> = ({
  notification,
  onClick,
  className = '',
}) => {
  const { type, title, message, timestamp, read } = notification;

  const handleClick = () => {
    onClick?.(notification);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(notification);
    }
  };

  const classNames = [
    styles.item,
    styles[type],
    !read ? styles.unread : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${read ? '' : 'Unread '}${type} notification: ${title}`}
    >
      {/* Unread indicator */}
      {!read && <div className={styles.unreadIndicator} />}

      {/* Icon */}
      <span className={styles.icon}>
        <Icon name={TYPE_ICONS[type]} size="md" />
      </span>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <Text 
            variant="label" 
            weight={read ? 'normal' : 'semibold'} 
            className={styles.title}
          >
            {title}
          </Text>
          <Text variant="small" color="secondary" className={styles.time}>
            {formatTimeAgo(timestamp)}
          </Text>
        </div>
        {message && (
          <Text variant="small" color="secondary" className={styles.message}>
            {message}
          </Text>
        )}
      </div>
    </div>
  );
};
