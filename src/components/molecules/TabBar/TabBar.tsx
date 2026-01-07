/**
 * TabBar Molecule
 * Classic Mac OS 8/9 folder tab style navigation
 */

import { type FC } from 'react';
import { Text, Icon } from '../../atoms';
import type { IconName } from '../../atoms';
import styles from './TabBar.module.css';

export interface Tab {
  /** Unique tab identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Optional tab icon */
  icon?: IconName;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

export interface TabBarProps {
  /** Array of tab definitions */
  tabs: Tab[];
  /** Currently active tab ID */
  activeTab: string;
  /** Tab change handler */
  onChange: (tabId: string) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * TabBar - Folder tab style navigation
 *
 * Classic Mac OS style tabs with:
 * - Folder tab appearance
 * - Active tab connected to content
 * - Optional icons
 * - Disabled state support
 */
export const TabBar: FC<TabBarProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  const classNames = [
    styles.tabBar,
    className,
  ].filter(Boolean).join(' ');

  const handleTabClick = (tab: Tab) => {
    if (!tab.disabled && tab.id !== activeTab) {
      onChange(tab.id);
    }
  };

  return (
    <div className={classNames} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const tabClassNames = [
          styles.tab,
          isActive ? styles.active : '',
          tab.disabled ? styles.disabled : '',
        ].filter(Boolean).join(' ');

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={tabClassNames}
            onClick={() => handleTabClick(tab)}
            disabled={tab.disabled}
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            tabIndex={isActive ? 0 : -1}
          >
            {tab.icon && (
              <span className={styles.tabIcon}>
                <Icon name={tab.icon} size="sm" />
              </span>
            )}
            <Text variant="label" weight={isActive ? 'medium' : 'normal'}>
              {tab.label}
            </Text>
          </button>
        );
      })}
      {/* Spacer to fill remaining width */}
      <div className={styles.spacer} />
    </div>
  );
};
