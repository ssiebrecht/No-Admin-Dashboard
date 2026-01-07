/**
 * Notification Types
 * Mac OS 8/9 Classic Notification System
 */

/**
 * Notification type variants
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Notification entity for the notification center
 */
export interface Notification {
  /** Unique identifier */
  id: string;
  /** Notification type for styling */
  type: NotificationType;
  /** Notification title */
  title: string;
  /** Optional detailed message */
  message?: string;
  /** ISO timestamp when created */
  timestamp: string;
  /** Whether the notification has been read */
  read: boolean;
}

/**
 * Toast notification (transient)
 */
export interface Toast extends Omit<Notification, 'read'> {
  /** Duration in ms before auto-dismiss. 0 = no auto-dismiss */
  duration: number;
}

/**
 * Create notification data (without id and timestamp)
 */
export interface CreateNotificationData {
  type: NotificationType;
  title: string;
  message?: string;
}

/**
 * Create toast data
 */
export interface CreateToastData extends CreateNotificationData {
  /** Duration in ms. Default: 4000 for non-error, 0 for error */
  duration?: number;
}

/**
 * Toast action for callback buttons
 */
export interface ToastAction {
  label: string;
  onClick: () => void;
}
