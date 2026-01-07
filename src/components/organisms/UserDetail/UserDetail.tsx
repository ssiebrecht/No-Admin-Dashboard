/**
 * UserDetail Organism
 * Classic Mac OS 8/9 detailed user view with actions
 */

import { type FC } from 'react';
import { Text, Badge, Button, Divider } from '../../atoms';
import { EmptyState } from '../../molecules/EmptyState';
import { ROLE_CONFIG, type User } from '../../../types/user';
import styles from './UserDetail.module.css';

export interface UserDetailProps {
  /** User to display */
  user?: User;
  /** Edit button click handler */
  onEdit?: (user: User) => void;
  /** Change password button click handler */
  onChangePassword?: (user: User) => void;
  /** Toggle active button click handler */
  onToggleActive?: (user: User) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Get initials from full name
 */
const getInitials = (name: string): string => {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (!first) return '?';
  if (parts.length === 1) return first.charAt(0).toUpperCase();
  if (!last) return first.charAt(0).toUpperCase();
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
};

/**
 * Format date for display
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * UserDetail - Detailed user information view
 *
 * Classic Mac OS style with:
 * - Large avatar with initials
 * - User information fields
 * - Role badge and status
 * - Action buttons
 */
export const UserDetail: FC<UserDetailProps> = ({
  user,
  onEdit,
  onChangePassword,
  onToggleActive,
  className = '',
}) => {
  const classNames = [
    styles.userDetail,
    className,
  ].filter(Boolean).join(' ');

  // Empty state when no user is selected
  if (!user) {
    return (
      <div className={classNames}>
        <EmptyState
          icon="user"
          title="No User Selected"
          description="Select a user from the list to view their details."
        />
      </div>
    );
  }

  const roleConfig = ROLE_CONFIG[user.role];

  return (
    <div className={classNames}>
      {/* Header with Avatar */}
      <div className={styles.header}>
        <div className={styles.avatarLarge} aria-hidden="true">
          <span className={styles.initials}>{getInitials(user.fullName)}</span>
        </div>
        <div className={styles.headerInfo}>
          <Text variant="h2" weight="bold" className={styles.fullName}>
            {user.fullName}
          </Text>
          <Text variant="body" color="secondary" className={styles.username}>
            @{user.username}
          </Text>
          <div className={styles.badges}>
            <Badge variant={roleConfig.variant}>
              {roleConfig.label}
            </Badge>
            <Badge variant={user.isActive ? 'success' : 'default'}>
              {user.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </div>

      <Divider />

      {/* User Information */}
      <div className={styles.infoSection}>
        <div className={styles.infoRow}>
          <Text variant="label" weight="medium" className={styles.infoLabel}>
            Email
          </Text>
          <Text variant="body" className={styles.infoValue}>
            {user.email}
          </Text>
        </div>

        <div className={styles.infoRow}>
          <Text variant="label" weight="medium" className={styles.infoLabel}>
            Created
          </Text>
          <Text variant="body" className={styles.infoValue}>
            {formatDate(user.createdAt)}
          </Text>
        </div>

        <div className={styles.infoRow}>
          <Text variant="label" weight="medium" className={styles.infoLabel}>
            Last Login
          </Text>
          <Text variant="body" className={styles.infoValue}>
            {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
          </Text>
        </div>
      </div>

      <Divider />

      {/* Action Buttons */}
      <div className={styles.actions}>
        <Button
          variant="secondary"
          onClick={() => onEdit?.(user)}
          className={styles.actionButton}
        >
          ✏️ Edit User
        </Button>
        <Button
          variant="secondary"
          onClick={() => onChangePassword?.(user)}
          className={styles.actionButton}
        >
          🔑 Change Password
        </Button>
        <Button
          variant={user.isActive ? 'danger' : 'primary'}
          onClick={() => onToggleActive?.(user)}
          className={styles.actionButton}
        >
          {user.isActive ? '🚫 Deactivate' : '✅ Activate'}
        </Button>
      </div>
    </div>
  );
};
