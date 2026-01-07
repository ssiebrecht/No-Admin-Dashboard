/**
 * ProgressBar Atom
 * Classic Mac OS 8/9 progress indicator with optional candy-stripe animation
 */

import { type FC } from 'react';
import styles from './ProgressBar.module.css';

export type ProgressBarVariant = 'default' | 'striped';

export interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number;
  /** Progress bar variant */
  variant?: ProgressBarVariant;
  /** Show percentage label */
  showLabel?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * ProgressBar - Classic Mac OS progress indicator
 *
 * Features inset container with filled bar.
 * Striped variant shows animated diagonal candy-stripes.
 */
export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  variant = 'default',
  showLabel = false,
  className = '',
  'aria-label': ariaLabel = 'Progress',
}) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  const wrapperClassNames = [
    styles.wrapper,
    className,
  ].filter(Boolean).join(' ');

  const fillClassNames = [
    styles.fill,
    variant === 'striped' ? styles.striped : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassNames}>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div
          className={fillClassNames}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{Math.round(clampedValue)}%</span>
      )}
    </div>
  );
};
