/**
 * Radio Atom
 * Classic Mac OS 8/9 radio button with 12x12px circular design
 */

import { type FC, type ChangeEvent } from 'react';
import styles from './Radio.module.css';

export interface RadioProps {
  /** Whether the radio is selected */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  /** Label text */
  label?: string;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Input name attribute (for radio groups) */
  name: string;
  /** Input value attribute */
  value: string;
  /** Additional CSS class */
  className?: string;
  /** ID for the input element */
  id?: string;
}

/**
 * Radio - Classic Mac OS 8/9 radio button
 *
 * Features 12x12px circular design with inset bevel effect.
 * Selected state shows a centered radial dot.
 */
export const Radio: FC<RadioProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  name,
  value,
  className = '',
  id,
}) => {
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

  const circleClassNames = [
    styles.circle,
    checked ? styles.checked : '',
  ].filter(Boolean).join(' ');

  return (
    <label className={wrapperClassNames}>
      <input
        type="radio"
        className={styles.input}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        id={id}
      />
      <span className={circleClassNames} aria-hidden="true">
        {checked && <span className={styles.dot} />}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
