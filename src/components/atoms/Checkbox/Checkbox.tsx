/**
 * Checkbox Atom
 * Classic Mac OS 8/9 checkbox with 12x12px box and checkmark
 */

import { type FC, type ChangeEvent, useRef, useEffect } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in indeterminate state */
  indeterminate?: boolean;
  /** Change handler */
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  /** Label text */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Input name attribute */
  name?: string;
  /** Input value attribute */
  value?: string;
  /** Additional CSS class */
  className?: string;
  /** ID for the input element */
  id?: string;
}

/**
 * Checkbox - Classic Mac OS 8/9 checkbox
 *
 * Features 12x12px box with inset bevel effect.
 * Uses ✓ character for checkmark, — for indeterminate.
 */
export const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  name,
  value,
  className = '',
  id,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle indeterminate state via ref (not a native HTML attribute)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked, e);
    }
  };

  const wrapperClassNames = [
    styles.wrapper,
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  const boxClassNames = [
    styles.box,
    checked ? styles.checked : '',
    indeterminate ? styles.indeterminate : '',
  ].filter(Boolean).join(' ');

  return (
    <label className={wrapperClassNames}>
      <input
        ref={inputRef}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        id={id}
      />
      <span className={boxClassNames} aria-hidden="true">
        {checked && !indeterminate && <span className={styles.checkmark}>✓</span>}
        {indeterminate && <span className={styles.indeterminateMark}>—</span>}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
