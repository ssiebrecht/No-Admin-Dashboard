/**
 * Input Atom
 * Classic Mac OS 8/9 text input field with inset bevel effect
 */

import {
  type FC,
  type ReactNode,
  type InputHTMLAttributes,
  forwardRef,
} from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Error message or error state */
  error?: boolean | string;
  /** Icon to display on the left side */
  leftIcon?: ReactNode;
  /** Icon to display on the right side */
  rightIcon?: ReactNode;
  /** Additional CSS class for the wrapper */
  className?: string;
  /** Additional CSS class for the input element */
  inputClassName?: string;
}

/**
 * Input - Classic Mac OS 8/9 text input
 *
 * Features authentic inset bevel effect.
 * Supports error state with red border.
 */
export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      leftIcon,
      rightIcon,
      className = '',
      inputClassName = '',
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const hasError = Boolean(error);

    const wrapperClassNames = [
      styles.wrapper,
      hasError ? styles.error : '',
      disabled ? styles.disabled : '',
      leftIcon ? styles.hasLeftIcon : '',
      rightIcon ? styles.hasRightIcon : '',
      className,
    ].filter(Boolean).join(' ');

    const inputClassNames = [styles.input, inputClassName]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        {leftIcon && (
          <span className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={inputClassNames}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={typeof error === 'string' ? `${rest.id}-error` : undefined}
          {...rest}
        />
        {rightIcon && (
          <span className={styles.iconRight} aria-hidden="true">
            {rightIcon}
          </span>
        )}
        {typeof error === 'string' && error && (
          <span id={`${rest.id}-error`} className={styles.errorText}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
