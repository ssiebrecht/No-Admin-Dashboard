/**
 * UsageBar Molecule
 * Classic Mac OS 8/9 horizontal usage bar with segments
 */

import { type FC } from 'react';
import { Text } from '../../atoms';
import styles from './UsageBar.module.css';

export interface UsageSegment {
  /** Segment value (0-100) */
  value: number;
  /** Segment color */
  color: string;
  /** Segment label */
  label?: string;
}

export interface UsageBarProps {
  /** Single value (0-100) or segments for multi-color */
  value?: number;
  /** Multiple segments for multi-color bar */
  segments?: UsageSegment[];
  /** Show percentage labels */
  showLabels?: boolean;
  /** Show value text on bar */
  showValue?: boolean;
  /** Bar height variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * UsageBar - Horizontal usage indicator
 *
 * Classic Mac OS style usage bar with:
 * - Inset appearance
 * - Single or multi-segment support
 * - Optional labels
 */
export const UsageBar: FC<UsageBarProps> = ({
  value,
  segments,
  showLabels = false,
  showValue = false,
  size = 'md',
  className = '',
  'aria-label': ariaLabel = 'Usage',
}) => {
  const classNames = [
    styles.container,
    className,
  ].filter(Boolean).join(' ');

  const trackClassNames = [
    styles.track,
    styles[size],
  ].filter(Boolean).join(' ');

  // Calculate total value for segments
  const totalValue = segments
    ? segments.reduce((sum, seg) => sum + seg.value, 0)
    : value ?? 0;

  // Clamp total to 100
  const clampedTotal = Math.min(100, Math.max(0, totalValue));

  return (
    <div className={classNames}>
      <div
        className={trackClassNames}
        role="meter"
        aria-valuenow={clampedTotal}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div className={styles.fillContainer}>
          {segments ? (
            // Multi-segment bar
            segments.map((segment, index) => (
              <div
                key={index}
                className={styles.segment}
                style={{
                  width: `${segment.value}%`,
                  backgroundColor: segment.color,
                }}
                title={segment.label ? `${segment.label}: ${segment.value.toFixed(1)}%` : `${segment.value.toFixed(1)}%`}
              />
            ))
          ) : (
            // Single value bar
            <div
              className={styles.fill}
              style={{ width: `${clampedTotal}%` }}
            />
          )}
        </div>
        
        {showValue && (
          <span className={styles.valueOverlay}>
            {clampedTotal.toFixed(1)}%
          </span>
        )}
      </div>
      
      {showLabels && segments && (
        <div className={styles.labels}>
          {segments.map((segment, index) => (
            <div key={index} className={styles.labelItem}>
              <span
                className={styles.labelDot}
                style={{ backgroundColor: segment.color }}
              />
              <Text variant="small" color="secondary">
                {segment.label || `Segment ${index + 1}`}: {segment.value.toFixed(1)}%
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
