/**
 * EmptyState Molecule
 * Classic Mac OS 8/9 empty state placeholder
 */

import { type FC } from 'react';
import { Text, Icon, Button } from '../../atoms';
import type { IconName } from '../../atoms';
import styles from './EmptyState.module.css';

export interface EmptyStateAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
}

export interface EmptyStateProps {
  /** Icon to display */
  icon: IconName;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Call-to-action button */
  action?: EmptyStateAction;
  /** Additional CSS class */
  className?: string;
}

/**
 * EmptyState - Placeholder for empty lists/content
 *
 * Classic Mac OS style empty state with:
 * - Large grayed-out icon
 * - Title text
 * - Optional description
 * - Optional action button
 */
export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  const classNames = [
    styles.emptyState,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className={styles.iconWrapper}>
        <Icon name={icon} size="xl" />
      </div>
      
      <Text variant="body" weight="medium" className={styles.title}>
        {title}
      </Text>
      
      {description && (
        <Text variant="small" color="secondary" className={styles.description}>
          {description}
        </Text>
      )}
      
      {action && (
        <Button
          variant="secondary"
          size="sm"
          onClick={action.onClick}
          className={styles.actionButton}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
