/**
 * AlertDialog Organism
 * Classic Mac OS 8/9 simple information dialog
 */

import { type FC } from 'react';
import { Dialog, type DialogIcon } from '../Dialog';
import { Text } from '../../atoms/Text';

export interface AlertDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Icon type to display (default: info) */
  icon?: DialogIcon;
  /** Alert title */
  title: string;
  /** Optional message below the title */
  message?: string;
  /** Label for the confirm button (default: OK) */
  confirmLabel?: string;
}

/**
 * AlertDialog - Simple information dialog
 *
 * Displays a message with a single "OK" button.
 * Used for notifications, warnings, and informational messages.
 */
export const AlertDialog: FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  icon = 'info',
  title,
  message,
  confirmLabel = 'OK',
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      icon={icon}
      closable={false}
      modal={true}
      actions={[
        {
          label: confirmLabel,
          isDefault: true,
          onClick: onClose,
        },
      ]}
    >
      <Text variant="body" weight="bold">
        {title}
      </Text>
      {message && (
        <Text variant="body" color="secondary" className="dialog-message">
          {message}
        </Text>
      )}
    </Dialog>
  );
};
