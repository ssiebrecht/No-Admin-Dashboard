/**
 * Mock Dashboard Data
 * Mac OS 8/9 Admin Dashboard
 */

import type { DashboardStats, ActivityItem, WeeklyActivityData } from '../types/dashboard';

/**
 * Mock Dashboard Statistics
 */
export const mockDashboardStats: DashboardStats = {
  users: {
    total: 24,
    newToday: 3,
  },
  files: {
    total: 1247,
    newToday: 18,
  },
  storage: {
    used: 3.2, // GB
    available: 8.0, // GB
  },
};

/**
 * Mock Weekly Activity Data
 */
export const mockWeeklyActivity: WeeklyActivityData[] = [
  { day: 'Mo', value: 45 },
  { day: 'Di', value: 72 },
  { day: 'Mi', value: 38 },
  { day: 'Do', value: 85 },
  { day: 'Fr', value: 62 },
  { day: 'Sa', value: 28 },
  { day: 'So', value: 15 },
];

/**
 * Mock Activity Items
 */
export const mockActivities: ActivityItem[] = [
  {
    id: 'act-1',
    time: '09:45',
    icon: 'user',
    message: 'New user "jsmith" created',
    type: 'user',
  },
  {
    id: 'act-2',
    time: '09:32',
    icon: 'folder',
    message: 'Folder "Reports 2026" created',
    type: 'file',
  },
  {
    id: 'act-3',
    time: '09:15',
    icon: 'settings',
    message: 'System preferences updated',
    type: 'settings',
  },
  {
    id: 'act-4',
    time: '08:58',
    icon: 'file',
    message: 'Document "Q1 Budget.doc" modified',
    type: 'file',
  },
  {
    id: 'act-5',
    time: '08:45',
    icon: 'users',
    message: 'User "mwilson" role changed to Admin',
    type: 'user',
  },
  {
    id: 'act-6',
    time: '08:30',
    icon: 'disk',
    message: 'Disk cleanup completed (1.2 GB freed)',
    type: 'system',
  },
  {
    id: 'act-7',
    time: '08:12',
    icon: 'lock',
    message: 'Security scan completed',
    type: 'system',
  },
  {
    id: 'act-8',
    time: '07:55',
    icon: 'file-text',
    message: 'Log files archived',
    type: 'system',
  },
  {
    id: 'act-9',
    time: '07:40',
    icon: 'user',
    message: 'User "admin" logged in',
    type: 'user',
  },
  {
    id: 'act-10',
    time: '07:30',
    icon: 'computer',
    message: 'System startup completed',
    type: 'system',
  },
];
