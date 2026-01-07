/**
 * Dashboard Types
 * Mac OS 8/9 Admin Dashboard Widget System
 */

import type { IconName } from '../components/atoms/Icon';

/**
 * Dashboard Statistics
 */
export interface DashboardStats {
  users: {
    total: number;
    newToday: number;
  };
  files: {
    total: number;
    newToday: number;
  };
  storage: {
    used: number;
    available: number;
  };
}

/**
 * Activity Item Types
 */
export type ActivityType = 'user' | 'file' | 'system' | 'settings';

/**
 * Activity Item
 */
export interface ActivityItem {
  id: string;
  time: string;
  icon: IconName;
  message: string;
  type: ActivityType;
}

/**
 * Weekly Activity Data
 */
export interface WeeklyActivityData {
  day: string;
  value: number;
}

/**
 * Quick Action Item
 */
export interface QuickAction {
  id: string;
  icon: IconName;
  label: string;
  onClick: () => void;
}

/**
 * Stat Card Trend
 */
export type StatTrend = 'up' | 'down' | 'neutral';

/**
 * Stat Card Props
 */
export interface StatCardData {
  icon: IconName;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: StatTrend;
  onClick?: () => void;
}
