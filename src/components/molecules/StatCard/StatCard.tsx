/**
 * StatCard Molecule
 * Classic Mac OS 8/9 statistics card with bevel effect
 */

import { type FC, type MouseEvent } from 'react';
import { Text, Icon } from '../../atoms';
import type { IconName } from '../../atoms/Icon';
import type { StatTrend } from '../../../types/dashboard';
import styles from './StatCard.module.css';

export interface StatCardProps {
  /** Icon to display */
  icon: IconName;
  /** Label text */
  label: string;
  /** Main value */
  value: string | number;
  /** Subtitle text */
  subtitle?: string;
  /** Trend indicator */
  trend?: StatTrend;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Get trend icon and color
 */
const getTrendDisplay = (trend: StatTrend): { icon: string; className: string } => {
  switch (trend) {
    case 'up':
      return { icon: '▲', className: styles.trendUp ?? '' };
    case 'down':
      return { icon: '▼', className: styles.trendDown ?? '' };
    default:
      return { icon: '●', className: styles.trendNeutral ?? '' };
  }
};

/**
 * StatCard - Clickable statistics card
 *
 * Features:
 * - Classic raised bevel effect
 * - Inset effect on click
 * - Large icon (32px)
 * - Optional trend indicator
 * - Clickable to open related window
 */
export const StatCard: FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtitle,
  trend,
  onClick,
  className = '',
}) => {
  const isClickable = !!onClick;
  
  const classNames = [
    styles.card,
    isClickable ? styles.clickable : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <div
      className={classNames}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      <div className={styles.iconContainer}>
        <Icon name={icon} size="lg" className={styles.icon} />
      </div>
      
      <div className={styles.content}>
        <Text variant="small" color="secondary" className={styles.label}>
          {label}
        </Text>
        
        <div className={styles.valueRow}>
          <Text variant="h2" weight="bold" className={styles.value}>
            {value}
          </Text>
          
          {trend && (
            <span className={`${styles.trend} ${getTrendDisplay(trend).className}`}>
              {getTrendDisplay(trend).icon}
            </span>
          )}
        </div>
        
        {subtitle && (
          <Text variant="small" color="secondary" className={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </div>
      
      {isClickable && (
        <div className={styles.arrow}>
          <Icon name="chevron-right" size="sm" />
        </div>
      )}
    </div>
  );
};
