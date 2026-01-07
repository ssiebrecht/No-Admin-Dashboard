/**
 * Dashboard Organism
 * Classic Mac OS 8/9 Admin Dashboard with widgets
 */

import { type FC, useCallback, useMemo } from 'react';
import { Text, Icon } from '../../atoms';
import { 
  WelcomeBanner, 
  StatCard, 
  ActivityGraph, 
  QuickActions 
} from '../../molecules';
import { RecentActivity } from '../RecentActivity';
import { useDashboardStore } from '../../../store/dashboardStore';
import { useUserStore } from '../../../store/userStore';
import { useFileStore } from '../../../store/fileStore';
import { useWindowStore } from '../../../store/windowStore';
import type { QuickActionItem } from '../../molecules/QuickActions';
import styles from './Dashboard.module.css';

export interface DashboardProps {
  /** User name for welcome banner */
  userName?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Format storage size
 */
const formatStorage = (gb: number): string => {
  return `${gb.toFixed(1)} GB`;
};

/**
 * Format time for last updated
 */
const formatLastUpdated = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Dashboard - Main admin dashboard with widgets
 *
 * Layout:
 * - Welcome Banner (Full Width)
 * - Stat Cards (3 columns)
 * - Activity Graph + Quick Actions (2 columns)
 * - Recent Activity (Full Width)
 * - Status Bar
 */
export const Dashboard: FC<DashboardProps> = ({
  userName = 'Admin',
  className = '',
}) => {
  const { 
    stats, 
    activities, 
    weeklyActivity, 
    lastUpdated, 
    isRefreshing,
    refreshStats 
  } = useDashboardStore();
  
  const users = useUserStore((state) => state.users);
  const files = useFileStore((state) => state.files);
  const { openWindow } = useWindowStore();

  // Calculate real stats from stores
  const realStats = useMemo(() => ({
    users: {
      total: users.length,
      newToday: stats.users.newToday,
    },
    files: {
      total: Object.keys(files).length,
      newToday: stats.files.newToday,
    },
    storage: stats.storage,
  }), [users, files, stats]);

  // Activity summary
  const activitySummary = useMemo(() => {
    const total = weeklyActivity.reduce((sum, day) => sum + day.value, 0);
    return `${total} actions this week`;
  }, [weeklyActivity]);

  // Handle stat card clicks
  const handleUsersClick = useCallback(() => {
    openWindow({
      id: 'user-management',
      title: 'User Management',
      icon: '👥',
      initialPosition: { x: 120, y: 80 },
      initialSize: { width: 700, height: 450 },
    });
  }, [openWindow]);

  const handleFilesClick = useCallback(() => {
    openWindow({
      id: 'file-browser',
      title: 'Macintosh HD',
      icon: '📁',
      initialPosition: { x: 140, y: 100 },
      initialSize: { width: 600, height: 400 },
    });
  }, [openWindow]);

  const handleStorageClick = useCallback(() => {
    openWindow({
      id: 'panel-memory',
      title: 'Memory',
      icon: '💾',
      initialPosition: { x: 260, y: 140 },
      initialSize: { width: 380, height: 420 },
    });
  }, [openWindow]);

  // Quick actions
  const quickActions: QuickActionItem[] = useMemo(() => [
    {
      id: 'new-user',
      icon: 'user',
      label: 'New User',
      onClick: () => {
        openWindow({
          id: 'user-management',
          title: 'User Management',
          icon: '👥',
          initialPosition: { x: 120, y: 80 },
          initialSize: { width: 700, height: 450 },
        });
      },
    },
    {
      id: 'new-folder',
      icon: 'folder',
      label: 'New Folder',
      onClick: () => {
        openWindow({
          id: 'file-browser',
          title: 'Macintosh HD',
          icon: '📁',
          initialPosition: { x: 140, y: 100 },
          initialSize: { width: 600, height: 400 },
        });
      },
    },
    {
      id: 'view-reports',
      icon: 'file-text',
      label: 'View Reports',
      onClick: () => {
        // Could open a reports window in the future
        console.log('View Reports clicked');
      },
    },
    {
      id: 'settings',
      icon: 'settings',
      label: 'Settings',
      onClick: () => {
        openWindow({
          id: 'control-panels',
          title: 'Control Panels',
          icon: '⚙️',
          initialPosition: { x: 160, y: 120 },
          initialSize: { width: 450, height: 350 },
        });
      },
    },
  ], [openWindow]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refreshStats();
  }, [refreshStats]);

  const classNames = [
    styles.dashboard,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* Welcome Banner - Full Width */}
      <WelcomeBanner 
        userName={userName}
        greeting="Welcome back"
        showDate
      />

      {/* Stat Cards Row */}
      <div className={styles.statsRow}>
        <StatCard
          icon="users"
          label="Total Users"
          value={realStats.users.total}
          subtitle={`+${realStats.users.newToday} today`}
          trend="up"
          onClick={handleUsersClick}
        />
        <StatCard
          icon="folder"
          label="Total Files"
          value={realStats.files.total}
          subtitle={`+${realStats.files.newToday} today`}
          trend="up"
          onClick={handleFilesClick}
        />
        <StatCard
          icon="disk"
          label="Storage Used"
          value={formatStorage(realStats.storage.used)}
          subtitle={`of ${formatStorage(realStats.storage.available)}`}
          trend="neutral"
          onClick={handleStorageClick}
        />
      </div>

      {/* Activity Graph + Quick Actions Row */}
      <div className={styles.middleRow}>
        <div className={styles.graphContainer}>
          <ActivityGraph
            data={weeklyActivity}
            title="Weekly Activity"
            summary={activitySummary}
          />
        </div>
        <div className={styles.actionsContainer}>
          <QuickActions
            actions={quickActions}
            title="Quick Actions"
          />
        </div>
      </div>

      {/* Recent Activity - Full Width */}
      <RecentActivity
        activities={activities}
        visibleItems={5}
        title="Recent Activity"
        onViewAll={() => console.log('View all activity')}
      />

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <div className={styles.statusLeft}>
          <Text variant="small" color="secondary">
            Last updated: {formatLastUpdated(lastUpdated)}
          </Text>
          <button
            className={styles.refreshButton}
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh data"
          >
            <Icon 
              name="refresh" 
              size="sm" 
              className={isRefreshing ? styles.spinning : ''} 
            />
          </button>
        </div>
        <div className={styles.statusRight}>
          <span className={styles.statusIndicator}>
            <span className={styles.statusDot} />
            <Text variant="small" color="secondary">
              System Status: Online
            </Text>
          </span>
        </div>
      </div>
    </div>
  );
};
