/**
 * Breadcrumb Molecule
 * Classic Mac OS 8/9 path navigation
 */

import { type FC } from 'react';
import { Text } from '../../atoms';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Click handler (if clickable) */
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator character or element */
  separator?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Breadcrumb - Path navigation
 *
 * Classic Mac OS style breadcrumb with:
 * - Clickable path segments
 * - Custom separator support
 * - Last item highlighted (current location)
 */
export const Breadcrumb: FC<BreadcrumbProps> = ({
  items,
  separator = '▶',
  className = '',
}) => {
  const classNames = [
    styles.breadcrumb,
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={classNames} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isClickable = !isLast && item.onClick;

          return (
            <li key={item.id} className={styles.item}>
              {isClickable ? (
                <button
                  type="button"
                  className={styles.link}
                  onClick={item.onClick}
                >
                  <Text variant="small">
                    {item.label}
                  </Text>
                </button>
              ) : (
                <span className={isLast ? styles.current : styles.text}>
                  <Text 
                    variant="small" 
                    weight={isLast ? 'semibold' : 'normal'}
                  >
                    {item.label}
                  </Text>
                </span>
              )}
              
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
