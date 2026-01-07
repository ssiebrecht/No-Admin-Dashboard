/**
 * Badge Atom
 * Classic Mac OS 8/9 badge/tag component
 */

import { type FC, type ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge content */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * Badge - Classic Mac OS compact label/tag
 *
 * Small, compact badge with border.
 * Used for status indicators, counts, and labels.
 */
export const Badge: FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
}) => {
  const classNames = [
    styles.badge,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {children}
    </span>
  );
};
