/**
 * Dialog Organism
 * Classic Mac OS 8/9 modal dialog component
 */

import {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { DialogOverlay } from '../../atoms/DialogOverlay';
import { Icon, type IconName } from '../../atoms/Icon';
import styles from './Dialog.module.css';

export type DialogIcon = 'info' | 'warning' | 'error' | 'question' | 'success';

export interface DialogAction {
  /** Button label */
  label: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Is this the default button (triggered by Enter) */
  isDefault?: boolean;
  /** Is this the cancel button (triggered by Escape) */
  isCancel?: boolean;
  /** Click handler */
  onClick: () => void;
  /** Disable the button */
  disabled?: boolean;
}

export interface DialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Optional dialog title (shows title bar if provided) */
  title?: string;
  /** Icon type to display */
  icon?: DialogIcon;
  /** Dialog content */
  children: ReactNode;
  /** Action buttons */
  actions?: DialogAction[];
  /** Show striped title bar (like windows) */
  showTitleBar?: boolean;
  /** Allow closing via X button in title bar */
  closable?: boolean;
  /** Whether clicking overlay closes dialog */
  modal?: boolean;
  /** Custom width (default auto with min/max constraints) */
  width?: number | string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Map dialog icon types to Icon component names
 */
const ICON_MAP: Record<DialogIcon, IconName> = {
  info: 'info',
  warning: 'warning',
  error: 'error',
  question: 'question',
  success: 'success',
};

/**
 * Dialog - Classic Mac OS modal dialog
 *
 * Features:
 * - Icon on the left (32x32)
 * - Content on the right
 * - Stacked buttons at bottom right (vertical!)
 * - Default button has extra black outline
 * - Keyboard: Enter → Default, Escape → Cancel/Close
 */
export const Dialog: FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  actions = [],
  showTitleBar = false,
  closable = true,
  modal = true,
  width,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const defaultButtonRef = useRef<HTMLButtonElement>(null);

  // Find default and cancel actions
  const defaultAction = actions.find((a) => a.isDefault);
  const cancelAction = actions.find((a) => a.isCancel);

  // Focus management - focus default button on open
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (defaultButtonRef.current) {
          defaultButtonRef.current.focus();
        } else if (dialogRef.current) {
          // Fallback: focus the dialog itself
          dialogRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        if (cancelAction && !cancelAction.disabled) {
          cancelAction.onClick();
        } else if (closable) {
          onClose();
        }
      }

      if (e.key === 'Enter') {
        // Don't trigger if user is focused on a different button
        const activeElement = document.activeElement;
        const isOnOtherButton =
          activeElement?.tagName === 'BUTTON' &&
          activeElement !== defaultButtonRef.current;

        if (!isOnOtherButton && defaultAction && !defaultAction.disabled) {
          e.preventDefault();
          defaultAction.onClick();
        }
      }
    },
    [isOpen, defaultAction, cancelAction, closable, onClose]
  );

  // Attach keyboard listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Trap focus within dialog
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
    if (!modal && closable) {
      onClose();
    }
  };

  const classNames = [styles.dialog, className].filter(Boolean).join(' ');

  const dialogStyle: React.CSSProperties = {};
  if (width) {
    dialogStyle.width = typeof width === 'number' ? `${width}px` : width;
  }

  return (
    <DialogOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <div
        ref={dialogRef}
        className={classNames}
        style={dialogStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        tabIndex={-1}
      >
        {/* Optional Title Bar */}
        {(showTitleBar || title) && (
          <div className={styles.titleBar}>
            <div className={styles.titleBarStripes} aria-hidden="true" />
            {title && (
              <span id="dialog-title" className={styles.titleText}>
                {title}
              </span>
            )}
            {closable && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close dialog"
              >
                <span aria-hidden="true">✕</span>
              </button>
            )}
          </div>
        )}

        {/* Dialog Body */}
        <div className={styles.body}>
          {/* Icon */}
          {icon && (
            <div className={styles.iconContainer}>
              <Icon name={ICON_MAP[icon]} size="lg" aria-hidden="true" />
            </div>
          )}

          {/* Content */}
          <div className={styles.content}>{children}</div>
        </div>

        {/* Action Buttons */}
        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((action, index) => {
              const buttonClasses = [
                styles.actionButton,
                action.variant === 'danger' ? styles.actionButtonDanger : '',
                action.isDefault ? styles.defaultButton : '',
              ].filter(Boolean).join(' ');

              return (
                <button
                  key={index}
                  ref={action.isDefault ? defaultButtonRef : undefined}
                  type="button"
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={buttonClasses}
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Border Frame (3D Effect) */}
        <div className={styles.borderFrame} aria-hidden="true" />
      </div>
    </DialogOverlay>
  );
};
