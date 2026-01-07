/**
 * User Types
 * Mac OS 8/9 Classic User Management System
 */

/**
 * User role in the system
 */
export type Role = 'admin' | 'moderator' | 'user';

/**
 * User entity
 */
export interface User {
  /** Unique identifier */
  id: string;
  /** Login username */
  username: string;
  /** Display full name */
  fullName: string;
  /** Email address */
  email: string;
  /** User role */
  role: Role;
  /** Avatar URL or data URI (optional) */
  avatar?: string;
  /** Account creation timestamp */
  createdAt: string;
  /** Last login timestamp */
  lastLogin?: string;
  /** Whether the account is active */
  isActive: boolean;
}

/**
 * Data required to create a new user
 */
export interface CreateUserData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  isActive?: boolean;
}

/**
 * Data for updating an existing user
 */
export interface UpdateUserData {
  username?: string;
  fullName?: string;
  email?: string;
  role?: Role;
  isActive?: boolean;
}

/**
 * Data for changing a user's password
 */
export interface ChangePasswordData {
  newPassword: string;
  confirmPassword: string;
  forceChangeOnLogin?: boolean;
}

/**
 * Role filter options
 */
export type RoleFilter = Role | 'all';

/**
 * Role display configuration
 */
export interface RoleConfig {
  label: string;
  variant: 'error' | 'warning' | 'default';
}

/**
 * Role configuration map
 */
export const ROLE_CONFIG: Record<Role, RoleConfig> = {
  admin: { label: 'Admin', variant: 'error' },
  moderator: { label: 'Moderator', variant: 'warning' },
  user: { label: 'User', variant: 'default' },
};
