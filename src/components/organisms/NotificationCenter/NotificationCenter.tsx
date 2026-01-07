/**
 * NotificationCenter Organism
 * Dropdown notification center from the menu bar
 */

import { type FC, useRef, useEffect, useCallback } from 'react';
import { Text, Button, Divider } from '../../atoms';
import { NotificationBadge } from '../../atoms/NotificationBadge';
import { NotificationItem } from '../../molecules/NotificationItem';
import { EmptyState } from '../../molecules/EmptyState';
import { useNotificationStore } from '../../../store/notificationStore';
import type { Notification } from '../../../types/notification';
import styles from './NotificationCenter.module.css';

export interface NotificationCenterProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Close callback */
  onClose: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * NotificationCenter - Dropdown notification center
 *
 * Features:
 * - Header with title and unread badge
 * - Scrollable list of notifications
 * - Empty state when no notifications
 * - "Mark All as Read" and "Clear All" actions
 * - Click outside to close
 */
export const NotificationCenter: FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearAll,
    getUnreadCount,
  } = useNotificationStore();

  const unreadCount = getUnreadCount();

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        // Don't close if clicking on the notification bell button
        const target = e.target as HTMLElement;
        if (target.closest('[data-notification-trigger]')) {
          return;
        }
        onClose();
      }
    };

    // Delay to avoid immediate close
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
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

  // Handle notification click
  const handleNotificationClick = useCallback((notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  }, [markAsRead]);

  // Handle clear all
  const handleClearAll = useCallback(() => {
    clearAll();
  }, [clearAll]);

  // Handle mark all as read
  const handleMarkAllRead = useCallback(() => {
    markAllAsRead();
  }, [markAllAsRead]);

  if (!isOpen) {
    return null;
  }

  const classNames = [
    styles.container,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={classNames}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Text variant="label" weight="semibold">
            Notifications
          </Text>
          {unreadCount > 0 && (
            <NotificationBadge count={unreadCount} />
          )}
        </div>
        {unreadCount > 0 && (
          <button
            className={styles.markReadButton}
            onClick={handleMarkAllRead}
            type="button"
          >
            Mark all read
          </button>
        )}
      </div>

      <Divider />

      {/* Notification list */}
      <div className={styles.list}>
        {notifications.length === 0 ? (
          <EmptyState
            icon="info"
            title="No notifications"
            description="You're all caught up!"
          />
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={handleNotificationClick}
            />
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <>
          <Divider />
          <div className={styles.footer}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
