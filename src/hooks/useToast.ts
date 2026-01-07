/**
 * useToast Hook
 * Convenient toast notification API
 */

import { useCallback, useMemo } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import type { Toast, CreateToastData } from '../types/notification';

/**
 * Toast API interface
 */
export interface ToastAPI {
  /** Show a success toast */
  success: (title: string, message?: string, duration?: number) => Toast;
  /** Show an error toast */
  error: (title: string, message?: string, duration?: number) => Toast;
  /** Show a warning toast */
  warning: (title: string, message?: string, duration?: number) => Toast;
  /** Show an info toast */
  info: (title: string, message?: string, duration?: number) => Toast;
  /** Show a custom toast */
  show: (data: CreateToastData) => Toast;
  /** Dismiss a toast by ID */
  dismiss: (id: string) => void;
  /** Dismiss all toasts */
  dismissAll: () => void;
}

/**
 * useToast - Convenient hook for showing toast notifications
 *
 * @example
 * ```tsx
 * const toast = useToast();
 * 
 * // Simple usage
 * toast.success('User created', 'John Doe has been added');
 * toast.error('Failed to delete', 'Permission denied');
 * toast.warning('Low storage', 'Only 10% remaining');
 * toast.info('Update available', 'New version 2.1.0');
 * 
 * // With custom duration
 * toast.success('Quick message', undefined, 2000);
 * 
 * // Custom toast
 * toast.show({ type: 'info', title: 'Custom', message: 'Toast', duration: 5000 });
 * ```
 */
export const useToast = (): ToastAPI => {
  const { showToast, dismissToast, toasts } = useNotificationStore();

  const success = useCallback(
    (title: string, message?: string, duration?: number): Toast => {
      return showToast({ type: 'success', title, message, duration });
    },
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number): Toast => {
      return showToast({ type: 'error', title, message, duration });
    },
    [showToast]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number): Toast => {
      return showToast({ type: 'warning', title, message, duration });
    },
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number): Toast => {
      return showToast({ type: 'info', title, message, duration });
    },
    [showToast]
  );

  const show = useCallback(
    (data: CreateToastData): Toast => {
      return showToast(data);
    },
    [showToast]
  );

  const dismiss = useCallback(
    (id: string): void => {
      dismissToast(id);
    },
    [dismissToast]
  );

  const dismissAll = useCallback((): void => {
    toasts.forEach((t) => dismissToast(t.id));
  }, [toasts, dismissToast]);

  return useMemo(
    () => ({
      success,
      error,
      warning,
      info,
      show,
      dismiss,
      dismissAll,
    }),
    [success, error, warning, info, show, dismiss, dismissAll]
  );
};
