/**
 * Notification Store - Zustand State Management
 * Mac OS 8/9 Classic Notification System
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Notification, 
  Toast, 
  CreateNotificationData, 
  CreateToastData 
} from '../types/notification';

/**
 * Generate a unique notification ID
 */
const generateId = (): string => {
  return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Default toast duration in milliseconds
 */
const DEFAULT_TOAST_DURATION = 4000;

/**
 * Notification Store State
 */
interface NotificationState {
  /** Persistent notifications for the notification center */
  notifications: Notification[];
  /** Transient toast notifications */
  toasts: Toast[];
}

/**
 * Notification Store Actions
 */
interface NotificationActions {
  /** Add a new notification to the center */
  addNotification: (data: CreateNotificationData) => Notification;
  /** Mark a notification as read */
  markAsRead: (id: string) => void;
  /** Mark all notifications as read */
  markAllAsRead: () => void;
  /** Remove a single notification */
  removeNotification: (id: string) => void;
  /** Clear all notifications */
  clearAll: () => void;
  /** Show a toast notification */
  showToast: (data: CreateToastData) => Toast;
  /** Dismiss a toast */
  dismissToast: (id: string) => void;
  /** Get unread notification count */
  getUnreadCount: () => number;
}

/**
 * Notification Store Type
 */
type NotificationStore = NotificationState & NotificationActions;

/**
 * Notification Store Implementation
 */
export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      // Initial State
      notifications: [],
      toasts: [],

      // Add a new notification to the center
      addNotification: (data: CreateNotificationData) => {
        const notification: Notification = {
          id: generateId(),
          type: data.type,
          title: data.title,
          message: data.message,
          timestamp: new Date().toISOString(),
          read: false,
        };

        set((state) => ({
          notifications: [notification, ...state.notifications].slice(0, 50), // Keep max 50
        }));

        return notification;
      },

      // Mark a notification as read
      markAsRead: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      // Mark all notifications as read
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      // Remove a single notification
      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      // Clear all notifications
      clearAll: () => {
        set({ notifications: [] });
      },

      // Show a toast notification
      showToast: (data: CreateToastData) => {
        // Error toasts don't auto-dismiss by default
        const defaultDuration = data.type === 'error' ? 0 : DEFAULT_TOAST_DURATION;
        
        const toast: Toast = {
          id: generateId(),
          type: data.type,
          title: data.title,
          message: data.message,
          timestamp: new Date().toISOString(),
          duration: data.duration ?? defaultDuration,
        };

        set((state) => ({
          toasts: [...state.toasts, toast],
        }));

        // Auto-dismiss if duration > 0
        if (toast.duration > 0) {
          setTimeout(() => {
            get().dismissToast(toast.id);
          }, toast.duration);
        }

        return toast;
      },

      // Dismiss a toast
      dismissToast: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },

      // Get unread notification count
      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },
    }),
    {
      name: 'macos-notification-storage',
      partialize: (state) => ({
        // Only persist notifications, not toasts
        notifications: state.notifications,
      }),
    }
  )
);
