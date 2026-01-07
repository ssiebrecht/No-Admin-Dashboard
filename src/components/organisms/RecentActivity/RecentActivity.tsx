/**
 * RecentActivity Organism
 * Classic Mac OS 8/9 activity list with scrollable items
 */

import { type FC } from 'react';
import { Text, Icon, Button } from '../../atoms';
import type { ActivityItem } from '../../../types/dashboard';
import styles from './RecentActivity.module.css';

export interface RecentActivityProps {
  /** Activity items to display */
  activities: ActivityItem[];
  /** Maximum number of visible items (rest scrollable) */
  visibleItems?: number;
  /** Title for the activity panel */
  title?: string;
  /** "View All" click handler */
  onViewAll?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Get color class for activity type
 */
const getActivityTypeClass = (type: ActivityItem['type']): string => {
  switch (type) {
    case 'user':
      return styles.typeUser ?? '';
    case 'file':
      return styles.typeFile ?? '';
    case 'system':
      return styles.typeSystem ?? '';
    case 'settings':
      return styles.typeSettings ?? '';
    default:
      return '';
  }
};

/**
 * RecentActivity - Scrollable activity list
 *
 * Features:
 * - Scrollable list with 5 visible items
 * - Time on left, icon, message
 * - "View All" link at bottom
 * - Classic Mac OS styling
 */
export const RecentActivity: FC<RecentActivityProps> = ({
  activities,
  visibleItems = 5,
  title = 'Recent Activity',
  onViewAll,
  className = '',
}) => {
  const classNames = [
    styles.container,
    className,
  ].filter(Boolean).join(' ');

  // Calculate max height based on visible items
  const maxHeight = visibleItems * 36 + 8; // 36px per item + padding

  return (
    <div className={classNames}>
      <div className={styles.header}>
        <Text variant="label" weight="semibold" className={styles.title}>
          {title}
        </Text>
        <Text variant="small" color="secondary" className={styles.count}>
          {activities.length} items
        </Text>
      </div>
      
      <div 
        className={styles.activityList}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {activities.length === 0 ? (
          <div className={styles.emptyState}>
            <Text variant="body" color="secondary">
              No recent activity
            </Text>
          </div>
        ) : (
          activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`${styles.activityItem} ${getActivityTypeClass(activity.type)}`}
            >
              <Text variant="mono" color="secondary" className={styles.time}>
                {activity.time}
              </Text>
              <div className={styles.iconWrapper}>
                <Icon name={activity.icon} size="sm" className={styles.activityIcon} />
              </div>
              <Text variant="body" className={styles.message}>
                {activity.message}
              </Text>
            </div>
          ))
        )}
      </div>
      
      {onViewAll && activities.length > 0 && (
        <div className={styles.footer}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            rightIcon={<Icon name="chevron-right" size="sm" />}
          >
            View All Activity
          </Button>
        </div>
      )}
    </div>
  );
};
