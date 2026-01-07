/**
 * UserFormDialog Organism
 * Classic Mac OS 8/9 dialog for creating/editing users
 */

import { type FC, useState, useEffect, useCallback } from 'react';
import { Dialog, type DialogAction } from '../Dialog';
import { Input, Select, Checkbox } from '../../atoms';
import { FormField } from '../../molecules/FormField';
import type { User, Role, CreateUserData, UpdateUserData } from '../../../types/user';
import styles from './UserFormDialog.module.css';

export interface UserFormDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Submit handler */
  onSubmit: (data: CreateUserData | UpdateUserData) => void;
  /** User to edit (undefined for create mode) */
  user?: User;
  /** Mode: 'create' or 'edit' */
  mode?: 'create' | 'edit';
}

/**
 * Role options for the select dropdown
 */
const ROLE_OPTIONS = [
  { value: 'user', label: 'User' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'admin', label: 'Admin' },
];

/**
 * Email regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
}

interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}

/**
 * UserFormDialog - Create/Edit User Dialog
 *
 * Classic Mac OS style dialog with:
 * - Full Name, Username, Email fields
 * - Password field (create mode only)
 * - Role select dropdown
 * - Active checkbox
 * - Validation with error messages
 */
export const UserFormDialog: FC<UserFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  mode = user ? 'edit' : 'create',
}) => {
  const isCreateMode = mode === 'create';

  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Reset form when dialog opens or user changes
  useEffect(() => {
    if (isOpen) {
      if (user && !isCreateMode) {
        setFormData({
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          password: '',
          role: user.role,
          isActive: user.isActive,
        });
      } else {
        setFormData({
          fullName: '',
          username: '',
          email: '',
          password: '',
          role: 'user',
          isActive: true,
        });
      }
      setErrors({});
      setTouched({});
    }
  }, [isOpen, user, isCreateMode]);

  // Validation
  const validate = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (isCreateMode && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (isCreateMode && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  }, [formData, isCreateMode]);

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
    // Mark all fields as touched
    setTouched({
      fullName: true,
      username: true,
      email: true,
      password: true,
      role: true,
    });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isCreateMode) {
      const createData: CreateUserData = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        isActive: formData.isActive,
      };
      onSubmit(createData);
    } else {
      const updateData: UpdateUserData = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        role: formData.role,
        isActive: formData.isActive,
      };
      onSubmit(updateData);
    }

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
      label: isCreateMode ? 'Create User' : 'Save Changes',
      variant: 'primary',
      isDefault: true,
      onClick: handleSubmit,
    },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={isCreateMode ? 'New User' : 'Edit User'}
      icon="question"
      actions={actions}
      width={380}
    >
      <div className={styles.form}>
        <FormField
          label="Full Name"
          required
          error={touched.fullName ? errors.fullName : undefined}
          htmlFor="user-fullName"
        >
          <Input
            id="user-fullName"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Enter full name"
            error={touched.fullName && !!errors.fullName}
          />
        </FormField>

        <FormField
          label="Username"
          required
          error={touched.username ? errors.username : undefined}
          htmlFor="user-username"
        >
          <Input
            id="user-username"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="Enter username"
            error={touched.username && !!errors.username}
          />
        </FormField>

        <FormField
          label="Email"
          required
          error={touched.email ? errors.email : undefined}
          htmlFor="user-email"
        >
          <Input
            id="user-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter email address"
            error={touched.email && !!errors.email}
          />
        </FormField>

        {isCreateMode && (
          <FormField
            label="Password"
            required
            error={touched.password ? errors.password : undefined}
            htmlFor="user-password"
          >
            <Input
              id="user-password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Enter password"
              error={touched.password && !!errors.password}
            />
          </FormField>
        )}

        <FormField
          label="Role"
          htmlFor="user-role"
        >
          <Select
            id="user-role"
            options={ROLE_OPTIONS}
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value as Role)}
          />
        </FormField>

        <div className={styles.checkboxRow}>
          <Checkbox
            id="user-active"
            checked={formData.isActive}
            onChange={(checked) => handleChange('isActive', checked)}
            label="Account is active"
          />
        </div>
      </div>
    </Dialog>
  );
};
