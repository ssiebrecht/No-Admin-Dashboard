/**
 * FormField Molecule
 * Classic Mac OS 8/9 form field with label, input/select, and error/hint
 */

import { type FC, type ReactElement } from 'react';
import { Text } from '../../atoms';
import styles from './FormField.module.css';

export interface FormFieldProps {
  /** Field label text */
  label: string;
  /** Error message */
  error?: string;
  /** Hint/help text */
  hint?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Input/Select element as children */
  children: ReactElement;
  /** Additional CSS class */
  className?: string;
  /** ID for the input (for label association) */
  htmlFor?: string;
}

/**
 * FormField - Label + Input/Select + Error/Hint combination
 *
 * Classic Mac OS form field layout with:
 * - Label with optional required asterisk
 * - Wrapped input or select
 * - Error message in red
 * - Hint text in secondary color
 */
export const FormField: FC<FormFieldProps> = ({
  label,
  error,
  hint,
  required = false,
  children,
  className = '',
  htmlFor,
}) => {
  const classNames = [
    styles.formField,
    error ? styles.hasError : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <label className={styles.label} htmlFor={htmlFor}>
        <Text variant="label" weight="medium">
          {label}
          {required && <span className={styles.required}>*</span>}
        </Text>
      </label>
      <div className={styles.inputWrapper}>
        {children}
      </div>
      {error && (
        <Text variant="small" color="error" className={styles.error}>
          {error}
        </Text>
      )}
      {hint && !error && (
        <Text variant="small" color="secondary" className={styles.hint}>
          {hint}
        </Text>
      )}
    </div>
  );
};
