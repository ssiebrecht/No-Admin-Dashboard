/**
 * QuickActions Molecule
 * Classic Mac OS 8/9 quick action button list
 */

import { type FC } from 'react';
import { Button, Icon, Text } from '../../atoms';
import type { IconName } from '../../atoms/Icon';
import styles from './QuickActions.module.css';

export interface QuickActionItem {
  /** Unique identifier */
  id: string;
  /** Action icon */
  icon: IconName;
  /** Action label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export interface QuickActionsProps {
  /** List of quick actions */
  actions: QuickActionItem[];
  /** Title for the actions panel */
  title?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * QuickActions - Vertical button list for common actions
 *
 * Features:
 * - Ghost buttons with icons
 * - Vertical layout
 * - 4 default actions
 * - Classic Mac OS styling
 */
export const QuickActions: FC<QuickActionsProps> = ({
  actions,
  title = 'Quick Actions',
  className = '',
}) => {
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
        </div>
      )}
      
      <div className={styles.actionList}>
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            size="md"
            leftIcon={<Icon name={action.icon} size="sm" />}
            onClick={action.onClick}
            disabled={action.disabled}
            fullWidth
            className={styles.actionButton}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
