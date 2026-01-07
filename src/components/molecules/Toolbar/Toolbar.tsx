/**
 * Toolbar Molecule
 * Classic Mac OS 8/9 toolbar with buttons, separators, and spacers
 */

import { type FC, type ReactNode } from 'react';
import { Button, Icon, Divider } from '../../atoms';
import type { IconName } from '../../atoms';
import styles from './Toolbar.module.css';

export type ToolbarItemType = 'button' | 'separator' | 'spacer' | 'custom';

export interface ToolbarButtonItem {
  type: 'button';
  /** Button icon */
  icon?: IconName;
  /** Button label (shown as tooltip or text) */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Show label text (default: icon only) */
  showLabel?: boolean;
  /** Button variant */
  variant?: 'secondary' | 'primary' | 'ghost';
}

export interface ToolbarSeparatorItem {
  type: 'separator';
}

export interface ToolbarSpacerItem {
  type: 'spacer';
}

export interface ToolbarCustomItem {
  type: 'custom';
  /** Custom content to render */
  content: ReactNode;
}

export type ToolbarItem = 
  | ToolbarButtonItem 
  | ToolbarSeparatorItem 
  | ToolbarSpacerItem 
  | ToolbarCustomItem;

export interface ToolbarProps {
  /** Toolbar items */
  items: ToolbarItem[];
  /** Additional CSS class */
  className?: string;
}

/**
 * Toolbar - Toolbar with buttons, separators, and spacers
 *
 * Classic Mac OS style toolbar with:
 * - Icon buttons with optional labels
 * - Vertical separators
 * - Flexible spacers
 * - Custom content support
 */
export const Toolbar: FC<ToolbarProps> = ({
  items,
  className = '',
}) => {
  const classNames = [
    styles.toolbar,
    className,
  ].filter(Boolean).join(' ');

  const renderItem = (item: ToolbarItem, index: number) => {
    switch (item.type) {
      case 'button':
        return (
          <Button
            key={index}
            size="sm"
            variant={item.variant || 'ghost'}
            onClick={item.onClick}
            disabled={item.disabled}
            leftIcon={item.icon ? <Icon name={item.icon} size="sm" /> : undefined}
            className={styles.toolbarButton}
            title={item.label}
            aria-label={item.label}
          >
            {item.showLabel ? item.label : null}
          </Button>
        );

      case 'separator':
        return (
          <Divider 
            key={index} 
            orientation="vertical" 
            className={styles.separator} 
          />
        );

      case 'spacer':
        return (
          <div key={index} className={styles.spacer} />
        );

      case 'custom':
        return (
          <div key={index} className={styles.customItem}>
            {item.content}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={classNames} role="toolbar">
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
};
