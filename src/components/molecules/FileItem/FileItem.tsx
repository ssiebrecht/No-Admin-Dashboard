/**
 * FileItem Molecule
 * Classic Mac OS 8/9 file/folder item with multiple view modes
 */

import { type FC, type MouseEvent } from 'react';
import { Text } from '../../atoms';
import type { FileItem as FileItemType, ViewMode } from '../../../types/file';
import { getFileIcon, getFileKind, formatFileSize, formatFileDate } from '../../../utils/fileUtils';
import styles from './FileItem.module.css';

export interface FileItemProps {
  /** File data */
  file: FileItemType;
  /** Current view mode */
  viewMode: ViewMode;
  /** Whether the item is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: (e: MouseEvent) => void;
  /** Double-click handler */
  onDoubleClick?: (e: MouseEvent) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * FileItem - File/folder display with multiple view modes
 *
 * Supports three view modes:
 * - icons: Grid layout with centered icon and label
 * - list: Row layout with full details
 * - columns: Compact row for column browser
 */
export const FileItem: FC<FileItemProps> = ({
  file,
  viewMode,
  selected = false,
  onClick,
  onDoubleClick,
  className = '',
}) => {
  const icon = getFileIcon(file);
  const kind = getFileKind(file);
  const size = formatFileSize(file.size);
  const date = formatFileDate(file.modifiedAt);

  const classNames = [
    styles.fileItem,
    styles[viewMode],
    selected ? styles.selected : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);
  };

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDoubleClick?.(e);
  };

  // Icons View - Grid cell with icon and label
  if (viewMode === 'icons') {
    return (
      <div
        className={classNames}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        role="button"
        tabIndex={0}
        aria-selected={selected}
      >
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <Text 
          variant="small" 
          className={styles.label}
          truncate
        >
          {file.name}
        </Text>
      </div>
    );
  }

  // List View - Full row with all details
  if (viewMode === 'list') {
    return (
      <div
        className={classNames}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        role="row"
        tabIndex={0}
        aria-selected={selected}
      >
        <div className={styles.nameCell}>
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
          <Text variant="body" className={styles.name} truncate>
            {file.name}
          </Text>
        </div>
        <div className={styles.dateCell}>
          <Text variant="small" color="secondary">
            {date}
          </Text>
        </div>
        <div className={styles.sizeCell}>
          <Text variant="small" color="secondary">
            {file.type === 'folder' ? '--' : size}
          </Text>
        </div>
        <div className={styles.kindCell}>
          <Text variant="small" color="secondary">
            {kind}
          </Text>
        </div>
      </div>
    );
  }

  // Columns View - Compact row for Miller columns
  return (
    <div
      className={classNames}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={0}
      aria-selected={selected}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <Text variant="small" className={styles.name} truncate>
        {file.name}
      </Text>
      {file.type === 'folder' && (
        <span className={styles.arrow} aria-hidden="true">
          ▶
        </span>
      )}
    </div>
  );
};
