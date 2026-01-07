/**
 * ListItem Molecule
 * Classic Mac OS 8/9 list item with icon, label, description, and actions
 */

import { type FC, type ReactNode, type MouseEvent } from 'react';
import { Text, Icon, Checkbox } from '../../atoms';
import type { IconName } from '../../atoms';
import styles from './ListItem.module.css';

export interface ListItemAction {
  /** Action icon */
  icon: IconName;
  /** Action label (for accessibility) */
  label: string;
  /** Action click handler */
  onClick: () => void;
  /** Whether the action is disabled */
  disabled?: boolean;
}

export interface ListItemProps {
  /** Icon name or custom icon element */
  icon?: IconName | ReactNode;
  /** Primary label text */
  label: string;
  /** Secondary description text */
  description?: string;
  /** Whether the item is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Double-click handler */
  onDoubleClick?: () => void;
  /** Action buttons */
  actions?: ListItemAction[];
  /** Show checkbox instead of/with icon */
  checkbox?: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * ListItem - List entry with icon, label, description, and actions
 *
 * Classic Mac OS style list item with:
 * - Optional icon or checkbox
 * - Primary label
 * - Optional description
 * - Hover and selected states
 * - Action buttons on hover
 */
export const ListItem: FC<ListItemProps> = ({
  icon,
  label,
  description,
  selected = false,
  onClick,
  onDoubleClick,
  actions,
  checkbox,
  disabled = false,
  className = '',
}) => {
  const classNames = [
    styles.listItem,
    selected ? styles.selected : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: MouseEvent) => {
    if (!disabled && onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const handleDoubleClick = (e: MouseEvent) => {
    if (!disabled && onDoubleClick) {
      e.stopPropagation();
      onDoubleClick();
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (!disabled && checkbox?.onChange) {
      checkbox.onChange(checked);
    }
  };

  const handleActionClick = (action: ListItemAction, e: MouseEvent) => {
    e.stopPropagation();
    if (!action.disabled) {
      action.onClick();
    }
  };

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <Icon name={icon as IconName} size="md" />;
    }
    return icon;
  };

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="listitem"
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {checkbox && (
        <div className={styles.checkboxWrapper}>
          <Checkbox
            checked={checkbox.checked}
            onChange={handleCheckboxChange}
            disabled={disabled}
          />
        </div>
      )}
      
      {icon && !checkbox && (
        <div className={styles.iconWrapper}>
          {renderIcon()}
        </div>
      )}

      <div className={styles.content}>
        <Text variant="body" className={styles.label} truncate>
          {label}
        </Text>
        {description && (
          <Text variant="small" color="secondary" className={styles.description} truncate>
            {description}
          </Text>
        )}
      </div>

      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <button
              key={index}
              type="button"
              className={styles.actionButton}
              onClick={(e) => handleActionClick(action, e)}
              disabled={action.disabled || disabled}
              aria-label={action.label}
              title={action.label}
            >
              <Icon name={action.icon} size="sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
