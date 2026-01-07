/**
 * Toast Molecule
 * Classic Mac OS 8/9 toast notification
 */

import { type FC, useEffect, useState } from 'react';
import { Icon, Text } from '../../atoms';
import type { IconName } from '../../atoms/Icon';
import type { NotificationType } from '../../../types/notification';
import styles from './Toast.module.css';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  /** Toast ID */
  id: string;
  /** Toast type for styling */
  type: NotificationType;
  /** Toast title */
  title: string;
  /** Optional message */
  message?: string;
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration: number;
  /** Close callback */
  onClose: (id: string) => void;
  /** Optional action button */
  action?: ToastAction;
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
 * Toast - Classic Mac OS notification toast
 *
 * Features:
 * - Left border accent based on type
 * - Icon based on type
 * - Close button
 * - Slide-in animation from right
 * - Auto-dismiss with progress indicator
 */
export const Toast: FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration,
  onClose,
  action,
  className = '',
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  // Handle close with exit animation
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 200); // Match CSS animation duration
  };

  // Progress bar countdown
  useEffect(() => {
    if (duration <= 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  const classNames = [
    styles.toast,
    styles[type],
    isExiting ? styles.exiting : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="alert" aria-live="polite">
      {/* Progress bar (only if auto-dismiss) */}
      {duration > 0 && (
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }} 
          />
        </div>
      )}

      {/* Left border accent */}
      <div className={styles.accent} />

      {/* Content */}
      <div className={styles.content}>
        {/* Icon */}
        <span className={styles.icon}>
          <Icon name={TYPE_ICONS[type]} size="md" />
        </span>

        {/* Text */}
        <div className={styles.text}>
          <Text variant="label" weight="semibold" className={styles.title}>
            {title}
          </Text>
          {message && (
            <Text variant="small" color="secondary" className={styles.message}>
              {message}
            </Text>
          )}
        </div>

        {/* Action button */}
        {action && (
          <button 
            className={styles.actionButton}
            onClick={action.onClick}
            type="button"
          >
            {action.label}
          </button>
        )}

        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close notification"
          type="button"
        >
          <Icon name="close" size="sm" />
        </button>
      </div>
    </div>
  );
};
