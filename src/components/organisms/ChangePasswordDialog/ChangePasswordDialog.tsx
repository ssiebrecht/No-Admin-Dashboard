/**
 * ChangePasswordDialog Organism
 * Classic Mac OS 8/9 dialog for changing user passwords
 */

import { type FC, useState, useEffect, useCallback } from 'react';
import { Dialog, type DialogAction } from '../Dialog';
import { Input, Checkbox } from '../../atoms';
import { FormField } from '../../molecules/FormField';
import type { User, ChangePasswordData } from '../../../types/user';
import styles from './ChangePasswordDialog.module.css';

export interface ChangePasswordDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Submit handler */
  onSubmit: (userId: string, data: ChangePasswordData) => void;
  /** User whose password is being changed */
  user?: User;
}

interface FormData {
  newPassword: string;
  confirmPassword: string;
  forceChangeOnLogin: boolean;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

/**
 * ChangePasswordDialog - Change User Password Dialog
 *
 * Classic Mac OS style dialog with:
 * - New Password field
 * - Confirm Password field
 * - Force change on next login checkbox
 * - Validation with error messages
 */
export const ChangePasswordDialog: FC<ChangePasswordDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
}) => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    newPassword: '',
    confirmPassword: '',
    forceChangeOnLogin: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        newPassword: '',
        confirmPassword: '',
        forceChangeOnLogin: false,
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen]);

  // Validation
  const validate = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm the password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  }, [formData]);

  // Validate on change
  useEffect(() => {
    const newErrors = validate();
    setErrors(newErrors);
  }, [validate]);

  // Handle input changes
  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Handle submit
  const handleSubmit = () => {
    if (!user) return;

    // Mark all fields as touched
    setTouched({
      newPassword: true,
      confirmPassword: true,
    });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data: ChangePasswordData = {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      forceChangeOnLogin: formData.forceChangeOnLogin,
    };

    onSubmit(user.id, data);
    onClose();
  };

  // Dialog actions
  const actions: DialogAction[] = [
    {
      label: 'Cancel',
      variant: 'secondary',
      isCancel: true,
      onClick: onClose,
    },
    {
      label: 'Change Password',
      variant: 'primary',
      isDefault: true,
      onClick: handleSubmit,
    },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Change Password"
      icon="question"
      actions={actions}
      width={350}
    >
      <div className={styles.form}>
        {user && (
          <div className={styles.userInfo}>
            Changing password for <strong>{user.fullName}</strong>
          </div>
        )}

        <FormField
          label="New Password"
          required
          error={touched.newPassword ? errors.newPassword : undefined}
          htmlFor="change-password-new"
        >
          <Input
            id="change-password-new"
            type="password"
            value={formData.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
            placeholder="Enter new password"
            error={touched.newPassword && !!errors.newPassword}
          />
        </FormField>

        <FormField
          label="Confirm Password"
          required
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          htmlFor="change-password-confirm"
        >
          <Input
            id="change-password-confirm"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Confirm new password"
            error={touched.confirmPassword && !!errors.confirmPassword}
          />
        </FormField>

        <div className={styles.checkboxRow}>
          <Checkbox
            id="change-password-force"
            checked={formData.forceChangeOnLogin}
            onChange={(checked) => handleChange('forceChangeOnLogin', checked)}
            label="Force password change on next login"
          />
        </div>
      </div>
    </Dialog>
  );
};
