/**
 * useDialog Hook
 * Imperative API for showing dialogs
 */

import { useDialogContext } from '../context/DialogContext';
import type {
  DialogContextValue,
  AlertOptions,
  ConfirmOptions,
  PromptOptions,
} from '../context/DialogContext';

/**
 * useDialog - Access dialog methods for showing alerts, confirms, and prompts
 *
 * @example
 * ```tsx
 * const dialog = useDialog();
 *
 * // Alert
 * await dialog.alert({
 *   title: 'Information',
 *   message: 'Operation completed successfully',
 *   icon: 'success'
 * });
 *
 * // Confirm
 * const confirmed = await dialog.confirm({
 *   title: 'Delete Item?',
 *   message: 'This action cannot be undone.',
 *   danger: true
 * });
 *
 * if (confirmed) {
 *   // proceed with deletion
 * }
 *
 * // Prompt
 * const name = await dialog.prompt({
 *   title: 'Enter Name',
 *   inputLabel: 'Name:',
 *   defaultValue: 'New Item',
 *   required: true
 * });
 *
 * if (name !== null) {
 *   // use the name
 * }
 * ```
 */
export const useDialog = (): DialogContextValue => {
  return useDialogContext();
};

// Re-export types for convenience
export type { AlertOptions, ConfirmOptions, PromptOptions };
