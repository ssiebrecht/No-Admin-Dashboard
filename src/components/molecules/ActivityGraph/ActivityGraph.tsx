/**
 * ActivityGraph Molecule
 * Classic Mac OS 8/9 bar chart for weekly activity
 */

import { type FC } from 'react';
import { Text } from '../../atoms';
import type { WeeklyActivityData } from '../../../types/dashboard';
import styles from './ActivityGraph.module.css';

export interface ActivityGraphProps {
  /** Weekly activity data (7 days) */
  data: WeeklyActivityData[];
  /** Chart title */
  title?: string;
  /** Summary text */
  summary?: string;
  /** Maximum value for scaling (auto if not provided) */
  maxValue?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * ActivityGraph - Weekly bar chart
 *
 * Features:
 * - CSS-based bar chart
 * - Day labels (Mo-So)
 * - Auto-scaling bars
 * - Max height 100px
 * - Classic Mac OS styling
 */
export const ActivityGraph: FC<ActivityGraphProps> = ({
  data,
  title = 'Weekly Activity',
  summary,
  maxValue,
  className = '',
}) => {
  // Calculate max value for scaling
  const max = maxValue || Math.max(...data.map(d => d.value), 1);
  
  const classNames = [
    styles.container,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {title && (
        <div className={styles.header}>
          <Text variant="label" weight="semibold" className={styles.title}>
            {title}
          </Text>
          {summary && (
            <Text variant="small" color="secondary" className={styles.summary}>
              {summary}
            </Text>
          )}
        </div>
      )}
      
      <div className={styles.chart}>
        <div className={styles.bars}>
          {data.map((item, index) => {
            const heightPercent = (item.value / max) * 100;
            const isHighest = item.value === Math.max(...data.map(d => d.value));
            
            return (
              <div key={index} className={styles.barContainer}>
                <div className={styles.barWrapper}>
                  <div
                    className={`${styles.bar} ${isHighest ? styles.barHighlight : ''}`}
                    style={{ height: `${heightPercent}%` }}
                    title={`${item.day}: ${item.value}`}
                  >
                    <span className={styles.barValue}>{item.value}</span>
                  </div>
                </div>
                <Text variant="small" color="secondary" className={styles.label}>
                  {item.day}
                </Text>
              </div>
            );
          })}
        </div>
        
        {/* Grid lines */}
        <div className={styles.gridLines}>
          <div className={styles.gridLine} style={{ bottom: '100%' }} />
          <div className={styles.gridLine} style={{ bottom: '75%' }} />
          <div className={styles.gridLine} style={{ bottom: '50%' }} />
          <div className={styles.gridLine} style={{ bottom: '25%' }} />
          <div className={styles.gridLine} style={{ bottom: '0%' }} />
        </div>
      </div>
    </div>
  );
};
