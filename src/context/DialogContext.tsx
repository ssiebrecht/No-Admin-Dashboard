/**
 * DialogContext
 * React Context for managing dialog state and imperative dialog API
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type FC,
  type ReactNode,
} from 'react';
import { AlertDialog } from '../components/organisms/AlertDialog';
import { ConfirmDialog } from '../components/organisms/ConfirmDialog';
import { PromptDialog } from '../components/organisms/PromptDialog';
import type { DialogIcon } from '../components/organisms/Dialog';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface AlertOptions {
  /** Alert title */
  title: string;
  /** Optional message */
  message?: string;
  /** Icon type (default: info) */
  icon?: DialogIcon;
  /** Confirm button label (default: OK) */
  confirmLabel?: string;
}

export interface ConfirmOptions {
  /** Dialog title */
  title: string;
  /** Optional message */
  message?: string;
  /** Icon type (default: question) */
  icon?: DialogIcon;
  /** Confirm button label (default: OK) */
  confirmLabel?: string;
  /** Cancel button label (default: Cancel) */
  cancelLabel?: string;
  /** Whether this is a destructive action (shows red button) */
  danger?: boolean;
}

export interface PromptOptions {
  /** Dialog title */
  title: string;
  /** Optional message */
  message?: string;
  /** Icon type (default: question) */
  icon?: DialogIcon;
  /** Input label */
  inputLabel?: string;
  /** Input placeholder */
  inputPlaceholder?: string;
  /** Default input value */
  defaultValue?: string;
  /** Confirm button label (default: OK) */
  confirmLabel?: string;
  /** Cancel button label (default: Cancel) */
  cancelLabel?: string;
  /** Validation function */
  validate?: (value: string) => string | undefined;
  /** Whether input is required */
  required?: boolean;
}

export interface DialogContextValue {
  /** Show an alert dialog */
  alert: (options: AlertOptions) => Promise<void>;
  /** Show a confirmation dialog, returns true if confirmed */
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  /** Show a prompt dialog, returns the input value or null if cancelled */
  prompt: (options: PromptOptions) => Promise<string | null>;
}

// ============================================
// CONTEXT
// ============================================

const DialogContext = createContext<DialogContextValue | null>(null);

// ============================================
// INTERNAL DIALOG STATE TYPES
// ============================================

interface BaseDialogState {
  id: string;
  isOpen: boolean;
}

interface AlertDialogState extends BaseDialogState {
  type: 'alert';
  options: AlertOptions;
  resolve: () => void;
}

interface ConfirmDialogState extends BaseDialogState {
  type: 'confirm';
  options: ConfirmOptions;
  resolve: (confirmed: boolean) => void;
}

interface PromptDialogState extends BaseDialogState {
  type: 'prompt';
  options: PromptOptions;
  resolve: (value: string | null) => void;
}

type DialogState = AlertDialogState | ConfirmDialogState | PromptDialogState;

// ============================================
// PROVIDER COMPONENT
// ============================================

export interface DialogProviderProps {
  children: ReactNode;
}

/**
 * DialogProvider - Provides dialog context and renders active dialogs
 *
 * Wrap your app with this provider to enable the useDialog hook.
 * Supports stacking multiple dialogs.
 */
export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [dialogs, setDialogs] = useState<DialogState[]>([]);

  // Generate unique dialog ID
  const generateId = useCallback(() => {
    return `dialog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Remove dialog from stack
  const removeDialog = useCallback((id: string) => {
    setDialogs((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // ========================================
  // ALERT
  // ========================================
  const alert = useCallback(
    (options: AlertOptions): Promise<void> => {
      return new Promise<void>((resolve) => {
        const id = generateId();
        const dialogState: AlertDialogState = {
          id,
          type: 'alert',
          isOpen: true,
          options,
          resolve: () => {
            removeDialog(id);
            resolve();
          },
        };
        setDialogs((prev) => [...prev, dialogState]);
      });
    },
    [generateId, removeDialog]
  );

  // ========================================
  // CONFIRM
  // ========================================
  const confirm = useCallback(
    (options: ConfirmOptions): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        const id = generateId();
        const dialogState: ConfirmDialogState = {
          id,
          type: 'confirm',
          isOpen: true,
          options,
          resolve: (confirmed: boolean) => {
            removeDialog(id);
            resolve(confirmed);
          },
        };
        setDialogs((prev) => [...prev, dialogState]);
      });
    },
    [generateId, removeDialog]
  );

  // ========================================
  // PROMPT
  // ========================================
  const prompt = useCallback(
    (options: PromptOptions): Promise<string | null> => {
      return new Promise<string | null>((resolve) => {
        const id = generateId();
        const dialogState: PromptDialogState = {
          id,
          type: 'prompt',
          isOpen: true,
          options,
          resolve: (value: string | null) => {
            removeDialog(id);
            resolve(value);
          },
        };
        setDialogs((prev) => [...prev, dialogState]);
      });
    },
    [generateId, removeDialog]
  );

  const contextValue: DialogContextValue = {
    alert,
    confirm,
    prompt,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}

      {/* Render active dialogs */}
      {dialogs.map((dialog) => {
        switch (dialog.type) {
          case 'alert':
            return (
              <AlertDialog
                key={dialog.id}
                isOpen={dialog.isOpen}
                onClose={dialog.resolve}
                title={dialog.options.title}
                message={dialog.options.message}
                icon={dialog.options.icon}
                confirmLabel={dialog.options.confirmLabel}
              />
            );

          case 'confirm':
            return (
              <ConfirmDialog
                key={dialog.id}
                isOpen={dialog.isOpen}
                onClose={() => dialog.resolve(false)}
                onConfirm={() => dialog.resolve(true)}
                title={dialog.options.title}
                message={dialog.options.message}
                icon={dialog.options.icon}
                confirmLabel={dialog.options.confirmLabel}
                cancelLabel={dialog.options.cancelLabel}
                danger={dialog.options.danger}
              />
            );

          case 'prompt':
            return (
              <PromptDialog
                key={dialog.id}
                isOpen={dialog.isOpen}
                onClose={() => dialog.resolve(null)}
                onSubmit={(value) => dialog.resolve(value)}
                title={dialog.options.title}
                message={dialog.options.message}
                icon={dialog.options.icon}
                inputLabel={dialog.options.inputLabel}
                inputPlaceholder={dialog.options.inputPlaceholder}
                defaultValue={dialog.options.defaultValue}
                confirmLabel={dialog.options.confirmLabel}
                cancelLabel={dialog.options.cancelLabel}
                validate={dialog.options.validate}
                required={dialog.options.required}
              />
            );

          default:
            return null;
        }
      })}
    </DialogContext.Provider>
  );
};

// ============================================
// HOOK
// ============================================

/**
 * useDialogContext - Access dialog context directly
 * Prefer using the useDialog hook instead.
 */
export const useDialogContext = (): DialogContextValue => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};

export { DialogContext };
