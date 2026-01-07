/**
 * Pagination Molecule
 * Classic Mac OS 8/9 page navigation
 */

import { type FC } from 'react';
import { Button, Text, Icon } from '../../atoms';
import styles from './Pagination.module.css';

export interface PaginationProps {
  /** Current page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change handler */
  onPageChange: (page: number) => void;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Pagination - Page navigation controls
 *
 * Classic Mac OS style pagination with:
 * - First/Previous/Next/Last buttons
 * - "Page X of Y" indicator
 * - Disabled states at boundaries
 */
export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  disabled = false,
  className = '',
}) => {
  const classNames = [
    styles.pagination,
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const handleFirst = () => {
    if (!isFirstPage && !disabled) {
      onPageChange(1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstPage && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    if (!isLastPage && !disabled) {
      onPageChange(totalPages);
    }
  };

  return (
    <nav className={classNames} aria-label="Pagination">
      <div className={styles.controls}>
        {showFirstLast && (
          <Button
            size="sm"
            variant="secondary"
            onClick={handleFirst}
            disabled={isFirstPage || disabled}
            aria-label="Go to first page"
            className={styles.navButton}
          >
            <Icon name="chevron-left" size="sm" />
            <Icon name="chevron-left" size="sm" className={styles.doubleIcon} />
          </Button>
        )}
        
        <Button
          size="sm"
          variant="secondary"
          onClick={handlePrevious}
          disabled={isFirstPage || disabled}
          aria-label="Go to previous page"
          className={styles.navButton}
        >
          <Icon name="chevron-left" size="sm" />
        </Button>

        <div className={styles.pageInfo}>
          <Text variant="small">
            Page {currentPage} of {totalPages}
          </Text>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleNext}
          disabled={isLastPage || disabled}
          aria-label="Go to next page"
          className={styles.navButton}
        >
          <Icon name="chevron-right" size="sm" />
        </Button>

        {showFirstLast && (
          <Button
            size="sm"
            variant="secondary"
            onClick={handleLast}
            disabled={isLastPage || disabled}
            aria-label="Go to last page"
            className={styles.navButton}
          >
            <Icon name="chevron-right" size="sm" />
            <Icon name="chevron-right" size="sm" className={styles.doubleIcon} />
          </Button>
        )}
      </div>
    </nav>
  );
};
