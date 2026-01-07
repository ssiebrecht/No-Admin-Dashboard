/**
 * Card Molecule
 * Classic Mac OS 8/9 card container with header, body, and footer
 */

import { type FC, type ReactNode } from 'react';
import { Text, Icon } from '../../atoms';
import type { IconName } from '../../atoms';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'raised';

export interface CardProps {
  /** Card title */
  title?: string;
  /** Header icon */
  icon?: IconName;
  /** Header action buttons */
  actions?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Card content */
  children: ReactNode;
  /** Visual variant */
  variant?: CardVariant;
  /** Additional CSS class */
  className?: string;
}

/**
 * Card - Container with header, body, and footer
 *
 * Classic Mac OS style card with:
 * - Optional header with icon, title, and actions
 * - Body content area
 * - Optional footer
 * - Default (flat) or raised variant
 */
export const Card: FC<CardProps> = ({
  title,
  icon,
  actions,
  footer,
  children,
  variant = 'default',
  className = '',
}) => {
  const classNames = [
    styles.card,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  const hasHeader = title || icon || actions;

  return (
    <div className={classNames}>
      {hasHeader && (
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {icon && (
              <span className={styles.headerIcon}>
                <Icon name={icon} size="sm" />
              </span>
            )}
            {title && (
              <Text variant="label" weight="semibold" className={styles.title}>
                {title}
              </Text>
            )}
          </div>
          {actions && (
            <div className={styles.headerActions}>
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className={styles.body}>
        {children}
      </div>

      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
};
