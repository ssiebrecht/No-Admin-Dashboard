/**
 * Dashboard Store - Zustand State Management
 * Mac OS 8/9 Admin Dashboard System
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DashboardStats, ActivityItem, WeeklyActivityData } from '../types/dashboard';
import { mockDashboardStats, mockActivities, mockWeeklyActivity } from '../data/mockDashboard';

/**
 * Dashboard Store State
 */
interface DashboardState {
  /** Dashboard statistics */
  stats: DashboardStats;
  /** Recent activity items */
  activities: ActivityItem[];
  /** Weekly activity data for graph */
  weeklyActivity: WeeklyActivityData[];
  /** Last update timestamp */
  lastUpdated: string;
  /** Loading state */
  isRefreshing: boolean;
}

/**
 * Dashboard Store Actions
 */
interface DashboardActions {
  /** Refresh all dashboard data */
  refreshStats: () => void;
  /** Add a new activity item */
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;
  /** Clear all activities */
  clearActivities: () => void;
  /** Update specific stat */
  updateStats: (stats: Partial<DashboardStats>) => void;
}

/**
 * Dashboard Store Type
 */
type DashboardStore = DashboardState & DashboardActions;

/**
 * Generate a unique activity ID
 */
const generateActivityId = (): string => {
  return `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Simulate refreshing data with slight randomization
 */
const simulateRefresh = (currentStats: DashboardStats): DashboardStats => {
  // Slight random variations to simulate real-time updates
  const variation = () => Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
  
  return {
    users: {
      total: currentStats.users.total + variation(),
      newToday: Math.max(0, currentStats.users.newToday + variation()),
    },
    files: {
      total: currentStats.files.total + Math.floor(Math.random() * 5),
      newToday: Math.max(0, currentStats.files.newToday + variation()),
    },
    storage: {
      used: Math.round((currentStats.storage.used + (Math.random() - 0.5) * 0.1) * 10) / 10,
      available: currentStats.storage.available,
    },
  };
};

/**
 * Dashboard Store Implementation
 */
export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      // Initial State
      stats: mockDashboardStats,
      activities: mockActivities,
      weeklyActivity: mockWeeklyActivity,
      lastUpdated: new Date().toISOString(),
      isRefreshing: false,

      // Refresh all stats
      refreshStats: () => {
        set({ isRefreshing: true });
        
        // Simulate async refresh
        setTimeout(() => {
          const currentStats = get().stats;
          set({
            stats: simulateRefresh(currentStats),
            lastUpdated: new Date().toISOString(),
            isRefreshing: false,
          });
        }, 500);
      },

      // Add a new activity
      addActivity: (activityData) => {
        const newActivity: ActivityItem = {
          ...activityData,
          id: generateActivityId(),
        };
        
        set((state) => ({
          activities: [newActivity, ...state.activities].slice(0, 50), // Keep last 50
        }));
      },

      // Clear all activities
      clearActivities: () => {
        set({ activities: [] });
      },

      // Update specific stats
      updateStats: (statsUpdate) => {
        set((state) => ({
          stats: {
            ...state.stats,
            ...statsUpdate,
          },
          lastUpdated: new Date().toISOString(),
        }));
      },
    }),
    {
      name: 'macos-dashboard-storage',
      partialize: (state) => ({
        activities: state.activities.slice(0, 20), // Only persist recent 20
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
