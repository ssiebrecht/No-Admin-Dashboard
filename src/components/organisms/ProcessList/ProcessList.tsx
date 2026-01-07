/**
 * ProcessList Organism
 * Classic Mac OS 8/9 sortable process list table
 */

import { type FC, useMemo } from 'react';
import { Text, Icon } from '../../atoms';
import type { Process, ProcessSortField, ActivitySortOrder } from '../../../types/activity';
import styles from './ProcessList.module.css';

export interface ProcessListProps {
  /** Array of processes to display */
  processes: Process[];
  /** Current sort field */
  sortBy: ProcessSortField;
  /** Current sort order */
  sortOrder: ActivitySortOrder;
  /** Sort change handler */
  onSort: (field: ProcessSortField) => void;
  /** Maximum height in pixels */
  maxHeight?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * Format bytes to human readable string
 */
const formatBytes = (bytes: number): string => {
  if (bytes >= 1073741824) {
    return `${(bytes / 1073741824).toFixed(1)} GB`;
  }
  if (bytes >= 1048576) {
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${bytes} B`;
};

/**
 * Table columns configuration
 */
const COLUMNS = [
  { field: 'name' as ProcessSortField, label: 'Name', width: '35%' },
  { field: 'cpu' as ProcessSortField, label: '% CPU', width: '15%' },
  { field: 'memory' as ProcessSortField, label: 'Memory', width: '20%' },
  { field: 'pid' as ProcessSortField, label: 'PID', width: '15%' },
  { field: 'user' as ProcessSortField, label: 'User', width: '15%' },
];

/**
 * ProcessList - Sortable process table
 *
 * Classic Mac OS style table with:
 * - Sortable columns
 * - Alternating row colors
 * - Scrollable content
 * - System font styling
 */
export const ProcessList: FC<ProcessListProps> = ({
  processes,
  sortBy,
  sortOrder,
  onSort,
  maxHeight = 200,
  className = '',
}) => {
  // Sort processes
  const sortedProcesses = useMemo(() => {
    const sorted = [...processes].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
    
    return sorted;
  }, [processes, sortBy, sortOrder]);

  const classNames = [
    styles.container,
    className,
  ].filter(Boolean).join(' ');

  const handleHeaderClick = (field: ProcessSortField) => {
    onSort(field);
  };

  return (
    <div className={classNames}>
      {/* Table Header */}
      <div className={styles.header}>
        {COLUMNS.map((column) => (
          <button
            key={column.field}
            type="button"
            className={`${styles.headerCell} ${sortBy === column.field ? styles.sorted : ''}`}
            style={{ width: column.width }}
            onClick={() => handleHeaderClick(column.field)}
          >
            <Text variant="small" weight="semibold">
              {column.label}
            </Text>
            {sortBy === column.field && (
              <Icon
                name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'}
                size="sm"
                className={styles.sortIcon}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Table Body */}
      <div
        className={styles.body}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {sortedProcesses.map((process, index) => (
          <div
            key={process.id}
            className={`${styles.row} ${index % 2 === 1 ? styles.alternate : ''}`}
          >
            <div className={styles.cell} style={{ width: COLUMNS[0]!.width }}>
              <Text variant="small" truncate>
                {process.name}
              </Text>
            </div>
            <div className={styles.cell} style={{ width: COLUMNS[1]!.width }}>
              <Text variant="small" className={styles.mono}>
                {process.cpu.toFixed(1)}
              </Text>
            </div>
            <div className={styles.cell} style={{ width: COLUMNS[2]!.width }}>
              <Text variant="small" className={styles.mono}>
                {formatBytes(process.memoryBytes)}
              </Text>
            </div>
            <div className={styles.cell} style={{ width: COLUMNS[3]!.width }}>
              <Text variant="small" className={styles.mono}>
                {process.pid}
              </Text>
            </div>
            <div className={styles.cell} style={{ width: COLUMNS[4]!.width }}>
              <Text variant="small" color="secondary">
                {process.user}
              </Text>
            </div>
          </div>
        ))}
        
        {sortedProcesses.length === 0 && (
          <div className={styles.empty}>
            <Text variant="small" color="secondary">
              No processes
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
