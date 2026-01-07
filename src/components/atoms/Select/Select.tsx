/**
 * Select Atom
 * Classic Mac OS 8/9 dropdown select with raised bevel effect
 */

import {
  type FC,
  type SelectHTMLAttributes,
  forwardRef,
} from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  /** Option value */
  value: string;
  /** Option display label */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Available options */
  options: SelectOption[];
  /** Placeholder text (shown as disabled first option) */
  placeholder?: string;
  /** Error state */
  error?: boolean;
  /** Additional CSS class for the wrapper */
  className?: string;
}

/**
 * Select - Classic Mac OS 8/9 dropdown
 *
 * Features raised bevel effect with dropdown arrow.
 * Authentic retro styling.
 */
export const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      error = false,
      disabled = false,
      className = '',
      value,
      ...rest
    },
    ref
  ) => {
    const wrapperClassNames = [
      styles.wrapper,
      error ? styles.error : '',
      disabled ? styles.disabled : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClassNames}>
        <select
          ref={ref}
          className={styles.select}
          disabled={disabled}
          value={value}
          aria-invalid={error}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow} aria-hidden="true">
          ▼
        </span>
      </div>
    );
  }
);

Select.displayName = 'Select';
