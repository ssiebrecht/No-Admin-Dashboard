/**
 * ConfirmDialog Organism
 * Classic Mac OS 8/9 confirmation dialog
 */

import { type FC } from 'react';
import { Dialog, type DialogIcon, type DialogAction } from '../Dialog';
import { Text } from '../../atoms/Text';
import styles from './ConfirmDialog.module.css';

export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Close handler (called on Cancel) */
  onClose: () => void;
  /** Confirm handler */
  onConfirm: () => void;
  /** Icon type to display (default: question) */
  icon?: DialogIcon;
  /** Dialog title */
  title: string;
  /** Optional message below the title */
  message?: string;
  /** Label for the confirm button (default: OK) */
  confirmLabel?: string;
  /** Label for the cancel button (default: Cancel) */
  cancelLabel?: string;
  /** Whether this is a dangerous/destructive action */
  danger?: boolean;
}

/**
 * ConfirmDialog - Confirmation dialog with Cancel and Confirm buttons
 *
 * Classic Mac OS pattern:
 * - Buttons are stacked vertically on the right
 * - Cancel is on top, Confirm is on bottom
 * - Confirm button gets the default outline
 * - danger prop makes confirm button red
 */
export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  icon = 'question',
  title,
  message,
  confirmLabel = 'OK',
  cancelLabel = 'Cancel',
  danger = false,
}) => {
  const actions: DialogAction[] = [
    {
      label: cancelLabel,
      variant: 'secondary',
      isCancel: true,
      onClick: onClose,
    },
    {
      label: confirmLabel,
      variant: danger ? 'danger' : 'secondary',
      isDefault: true,
      onClick: () => {
        onConfirm();
        onClose();
      },
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
      </div>
    </Dialog>
  );
};
