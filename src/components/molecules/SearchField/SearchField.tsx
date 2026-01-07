/**
 * SearchField Molecule
 * Classic Mac OS 8/9 search input with icon and button
 */

import { type FC, type KeyboardEvent, type ChangeEvent } from 'react';
import { Button, Icon, Spinner } from '../../atoms';
import styles from './SearchField.module.css';

export interface SearchFieldProps {
  /** Current search value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Search submit handler */
  onSearch: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * SearchField - Search input with icon and button
 *
 * Classic Mac OS style search field with:
 * - Inset bevel effect for the entire combo
 * - Search icon (magnifying glass)
 * - Search button
 * - Loading spinner state
 */
export const SearchField: FC<SearchFieldProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  isLoading = false,
  disabled = false,
  className = '',
}) => {
  const classNames = [
    styles.searchField,
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled && !isLoading) {
      onSearch(value);
    }
  };

  const handleSearch = () => {
    if (!disabled && !isLoading) {
      onSearch(value);
    }
  };

  return (
    <div className={classNames}>
      <div className={styles.inputContainer}>
        <span className={styles.searchIcon} aria-hidden="true">
          <Icon name="search" size="sm" />
        </span>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          aria-label={placeholder}
        />
        {isLoading && (
          <span className={styles.loadingIcon}>
            <Spinner size="sm" />
          </span>
        )}
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={handleSearch}
        disabled={disabled || isLoading}
        className={styles.searchButton}
      >
        Search
      </Button>
    </div>
  );
};
