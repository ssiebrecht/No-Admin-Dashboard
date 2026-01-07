/**
 * PromptDialog Organism
 * Classic Mac OS 8/9 input/prompt dialog
 */

import {
  type FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Dialog, type DialogIcon, type DialogAction } from '../Dialog';
import { Text } from '../../atoms/Text';
import styles from './PromptDialog.module.css';

export interface PromptDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Close handler (called on Cancel) */
  onClose: () => void;
  /** Submit handler with the input value */
  onSubmit: (value: string) => void;
  /** Icon type to display (default: question) */
  icon?: DialogIcon;
  /** Dialog title */
  title: string;
  /** Optional message below the title */
  message?: string;
  /** Label for the input field */
  inputLabel?: string;
  /** Placeholder text for the input */
  inputPlaceholder?: string;
  /** Default value for the input */
  defaultValue?: string;
  /** Label for the confirm button (default: OK) */
  confirmLabel?: string;
  /** Label for the cancel button (default: Cancel) */
  cancelLabel?: string;
  /** Input validation - if returns string, shows as error */
  validate?: (value: string) => string | undefined;
  /** Whether the input is required (non-empty) */
  required?: boolean;
}

/**
 * PromptDialog - Input dialog with text field
 *
 * Classic Mac OS pattern:
 * - Icon on left, content on right
 * - Input field between message and buttons
 * - Stacked buttons: Cancel top, Confirm bottom
 */
export const PromptDialog: FC<PromptDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  icon = 'question',
  title,
  message,
  inputLabel,
  inputPlaceholder,
  defaultValue = '',
  confirmLabel = 'OK',
  cancelLabel = 'Cancel',
  validate,
  required = false,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset value when dialog opens
  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
      setError(undefined);
      // Focus input after dialog animation
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, defaultValue]);

  const handleSubmit = () => {
    // Validate required
    if (required && !value.trim()) {
      setError('This field is required');
      return;
    }

    // Custom validation
    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    onSubmit(value);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) {
      setError(undefined);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const actions: DialogAction[] = [
    {
      label: cancelLabel,
      variant: 'secondary',
      isCancel: true,
      onClick: onClose,
    },
    {
      label: confirmLabel,
      variant: 'secondary',
      isDefault: true,
      onClick: handleSubmit,
    },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      icon={icon}
      closable={false}
      modal={true}
      actions={actions}
    >
      <div className={styles.content}>
        <Text variant="body" weight="bold">
          {title}
        </Text>
        
        {message && (
          <Text variant="body" color="secondary" className={styles.message}>
            {message}
          </Text>
        )}

        <div className={styles.inputWrapper}>
          {inputLabel && (
            <Text as="label" variant="label" className={styles.inputLabel}>
              {inputLabel}
            </Text>
          )}
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder={inputPlaceholder}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              aria-invalid={!!error}
            />
            {error && (
              <span className={styles.errorText}>{error}</span>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
