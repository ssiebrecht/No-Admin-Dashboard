/**
 * FileToolbar Molecule
 * Classic Mac OS 8/9 file browser toolbar
 */

import { type FC, type ChangeEvent, useState, useCallback } from 'react';
import { Button, Icon, Input } from '../../atoms';
import type { ViewMode } from '../../../types/file';
import styles from './FileToolbar.module.css';

export interface FileToolbarProps {
  /** Can navigate back */
  canGoBack: boolean;
  /** Can navigate forward */
  canGoForward: boolean;
  /** Back button handler */
  onBack: () => void;
  /** Forward button handler */
  onForward: () => void;
  /** Current view mode */
  viewMode: ViewMode;
  /** View mode change handler */
  onViewModeChange: (mode: ViewMode) => void;
  /** Search value */
  searchValue: string;
  /** Search change handler */
  onSearchChange: (value: string) => void;
  /** New folder handler */
  onNewFolder: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * FileToolbar - Navigation and view controls
 *
 * Features:
 * - Back/Forward navigation buttons
 * - View mode switcher (icons, list, columns)
 * - Search field
 * - New folder button
 */
export const FileToolbar: FC<FileToolbarProps> = ({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  viewMode,
  onViewModeChange,
  searchValue,
  onSearchChange,
  onNewFolder,
  className = '',
}) => {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange(value);
  }, [onSearchChange]);

  const classNames = [
    styles.toolbar,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* Navigation Controls */}
      <div className={styles.navSection}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          disabled={!canGoBack}
          title="Go Back"
          aria-label="Go back"
        >
          ◀
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onForward}
          disabled={!canGoForward}
          title="Go Forward"
          aria-label="Go forward"
        >
          ▶
        </Button>
      </div>

      {/* View Mode Switcher */}
      <div className={styles.viewSection}>
        <button
          type="button"
          className={`${styles.viewButton} ${viewMode === 'icons' ? styles.active : ''}`}
          onClick={() => onViewModeChange('icons')}
          title="Icon View"
          aria-label="Icon view"
          aria-pressed={viewMode === 'icons'}
        >
          <Icon name="grid" size="sm" />
        </button>
        <button
          type="button"
          className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
          onClick={() => onViewModeChange('list')}
          title="List View"
          aria-label="List view"
          aria-pressed={viewMode === 'list'}
        >
          <Icon name="list" size="sm" />
        </button>
        <button
          type="button"
          className={`${styles.viewButton} ${viewMode === 'columns' ? styles.active : ''}`}
          onClick={() => onViewModeChange('columns')}
          title="Column View"
          aria-label="Column view"
          aria-pressed={viewMode === 'columns'}
        >
          <Icon name="columns" size="sm" />
        </button>
      </div>

      {/* Spacer */}
      <div className={styles.spacer} />

      {/* Search Field */}
      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <Icon name="search" size="sm" />
          </span>
          <Input
            type="text"
            value={localSearch}
            onChange={handleSearchChange}
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* New Folder Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={onNewFolder}
        leftIcon={<Icon name="folder" size="sm" />}
        title="New Folder"
      >
        New
      </Button>
    </div>
  );
};
