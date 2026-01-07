/**
 * Spinner Atom
 * Classic Mac OS 8/9 loading indicator (Beach Ball style)
 */

import { type FC } from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Additional CSS class */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Spinner - Classic Mac OS loading indicator
 *
 * Beach Ball style spinning indicator.
 * Available in three sizes.
 */
export const Spinner: FC<SpinnerProps> = ({
  size = 'md',
  className = '',
  'aria-label': ariaLabel = 'Loading',
}) => {
  const classNames = [
    styles.spinner,
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      role="status"
      aria-label={ariaLabel}
    >
      <div className={styles.beachball}>
        <div className={styles.segment} />
        <div className={styles.segment} />
        <div className={styles.segment} />
        <div className={styles.segment} />
      </div>
      <span className={styles.srOnly}>{ariaLabel}</span>
    </div>
  );
};
