/**
 * ToastContainer Organism
 * Fixed container for toast notifications
 */

import { type FC } from 'react';
import { Toast } from '../../molecules/Toast';
import { useNotificationStore } from '../../../store/notificationStore';
import styles from './ToastContainer.module.css';

export interface ToastContainerProps {
  /** Additional CSS class */
  className?: string;
}

/**
 * ToastContainer - Fixed position container for toasts
 *
 * Features:
 * - Fixed position top-right (under menu bar)
 * - Stacked toasts with gap
 * - Manages toast list from store
 * - Auto-dismiss handled by store
 */
export const ToastContainer: FC<ToastContainerProps> = ({
  className = '',
}) => {
  const { toasts, dismissToast } = useNotificationStore();

  if (toasts.length === 0) {
    return null;
  }

  const classNames = [
    styles.container,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={dismissToast}
        />
      ))}
    </div>
  );
};
