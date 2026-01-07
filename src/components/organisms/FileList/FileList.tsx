/**
 * FileList Organism
 * Classic Mac OS 8/9 file listing with multiple view modes
 */

import { type FC, type MouseEvent, useCallback, useMemo, useState } from 'react';
import { Text } from '../../atoms';
import { FileItem, FilePreview, EmptyState } from '../../molecules';
import type { FileItem as FileItemType, ViewMode, SortField, SortOrder } from '../../../types/file';
import styles from './FileList.module.css';

export interface FileListProps {
  /** Files to display */
  files: FileItemType[];
  /** Current view mode */
  viewMode: ViewMode;
  /** Selected file IDs */
  selectedFileIds: string[];
  /** File selection handler */
  onSelectFiles: (fileIds: string[]) => void;
  /** Double-click (open) handler */
  onOpen: (file: FileItemType) => void;
  /** Current sort field (for list view header) */
  sortBy?: SortField;
  /** Current sort order */
  sortOrder?: SortOrder;
  /** Sort change handler */
  onSortChange?: (field: SortField) => void;
  /** Column navigation - files in each column */
  columnData?: FileItemType[][];
  /** Column navigation - selected file ID per column */
  columnSelections?: (string | null)[];
  /** Column navigation - click handler */
  onColumnSelect?: (columnIndex: number, file: FileItemType) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * FileList - File listing organism
 *
 * Supports three view modes:
 * - icons: Grid of file icons
 * - list: Table with sortable columns
 * - columns: Miller columns navigation
 */
export const FileList: FC<FileListProps> = ({
  files,
  viewMode,
  selectedFileIds,
  onSelectFiles,
  onOpen,
  sortBy = 'name',
  sortOrder = 'asc',
  onSortChange,
  columnData = [],
  columnSelections = [],
  onColumnSelect,
  className = '',
}) => {
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);

  // Get selected file for preview (single selection only)
  const selectedFile = useMemo(() => {
    if (selectedFileIds.length === 1) {
      return files.find(f => f.id === selectedFileIds[0]) || null;
    }
    return null;
  }, [files, selectedFileIds]);

  // Handle file click with shift/ctrl support
  const handleFileClick = useCallback((file: FileItemType, e: MouseEvent) => {
    const isCtrlClick = e.ctrlKey || e.metaKey;
    const isShiftClick = e.shiftKey;

    if (isCtrlClick) {
      // Toggle selection
      if (selectedFileIds.includes(file.id)) {
        onSelectFiles(selectedFileIds.filter(id => id !== file.id));
      } else {
        onSelectFiles([...selectedFileIds, file.id]);
      }
    } else if (isShiftClick && lastClickedId) {
      // Range selection
      const fileIds = files.map(f => f.id);
      const lastIndex = fileIds.indexOf(lastClickedId);
      const currentIndex = fileIds.indexOf(file.id);
      
      if (lastIndex !== -1 && currentIndex !== -1) {
        const start = Math.min(lastIndex, currentIndex);
        const end = Math.max(lastIndex, currentIndex);
        const rangeIds = fileIds.slice(start, end + 1);
        onSelectFiles(rangeIds);
      }
    } else {
      // Single selection
      onSelectFiles([file.id]);
    }

    setLastClickedId(file.id);
  }, [files, selectedFileIds, lastClickedId, onSelectFiles]);

  // Handle double-click
  const handleDoubleClick = useCallback((file: FileItemType) => {
    onOpen(file);
  }, [onOpen]);

  // Handle background click to clear selection
  const handleBackgroundClick = useCallback((e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectFiles([]);
    }
  }, [onSelectFiles]);

  // Sort header click handler
  const handleSortClick = useCallback((field: SortField) => {
    onSortChange?.(field);
  }, [onSortChange]);

  // Get sort indicator
  const getSortIndicator = (field: SortField) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

  const classNames = [
    styles.fileList,
    styles[viewMode],
    className,
  ].filter(Boolean).join(' ');

  // Empty state
  if (files.length === 0 && viewMode !== 'columns') {
    return (
      <div className={classNames}>
        <EmptyState
          icon="folder"
          title="No Items"
          description="This folder is empty."
        />
      </div>
    );
  }

  // Icons View
  if (viewMode === 'icons') {
    return (
      <div className={classNames} onClick={handleBackgroundClick}>
        <div className={styles.iconGrid}>
          {files.map(file => (
            <FileItem
              key={file.id}
              file={file}
              viewMode="icons"
              selected={selectedFileIds.includes(file.id)}
              onClick={(e) => handleFileClick(file, e)}
              onDoubleClick={() => handleDoubleClick(file)}
            />
          ))}
        </div>
      </div>
    );
  }

  // List View
  if (viewMode === 'list') {
    return (
      <div className={classNames} onClick={handleBackgroundClick}>
        {/* List Header */}
        <div className={styles.listHeader}>
          <button
            type="button"
            className={`${styles.headerCell} ${styles.nameHeader}`}
            onClick={() => handleSortClick('name')}
          >
            <Text variant="small" weight="semibold">
              Name{getSortIndicator('name')}
            </Text>
          </button>
          <button
            type="button"
            className={`${styles.headerCell} ${styles.dateHeader}`}
            onClick={() => handleSortClick('date')}
          >
            <Text variant="small" weight="semibold">
              Date Modified{getSortIndicator('date')}
            </Text>
          </button>
          <button
            type="button"
            className={`${styles.headerCell} ${styles.sizeHeader}`}
            onClick={() => handleSortClick('size')}
          >
            <Text variant="small" weight="semibold">
              Size{getSortIndicator('size')}
            </Text>
          </button>
          <button
            type="button"
            className={`${styles.headerCell} ${styles.kindHeader}`}
            onClick={() => handleSortClick('kind')}
          >
            <Text variant="small" weight="semibold">
              Kind{getSortIndicator('kind')}
            </Text>
          </button>
        </div>

        {/* List Body */}
        <div className={styles.listBody} role="table">
          {files.map(file => (
            <FileItem
              key={file.id}
              file={file}
              viewMode="list"
              selected={selectedFileIds.includes(file.id)}
              onClick={(e) => handleFileClick(file, e)}
              onDoubleClick={() => handleDoubleClick(file)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Columns View (Miller Columns)
  return (
    <div className={classNames}>
      <div className={styles.columnsContainer}>
        {/* Render each column */}
        {columnData.map((columnFiles, columnIndex) => (
          <div key={columnIndex} className={styles.column}>
            <div className={styles.columnContent}>
              {columnFiles.map(file => (
                <FileItem
                  key={file.id}
                  file={file}
                  viewMode="columns"
                  selected={columnSelections[columnIndex] === file.id}
                  onClick={() => onColumnSelect?.(columnIndex, file)}
                  onDoubleClick={() => {
                    if (file.type !== 'folder') {
                      handleDoubleClick(file);
                    }
                  }}
                />
              ))}
              {columnFiles.length === 0 && (
                <div className={styles.columnEmpty}>
                  <Text variant="small" color="secondary">
                    Empty
                  </Text>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Preview Column */}
        <div className={styles.previewColumn}>
          <FilePreview
            file={selectedFile}
            selectedCount={selectedFileIds.length}
          />
        </div>
      </div>
    </div>
  );
};
