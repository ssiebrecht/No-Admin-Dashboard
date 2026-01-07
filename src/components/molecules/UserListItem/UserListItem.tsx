/**
 * UserListItem Molecule
 * Classic Mac OS 8/9 user list item with avatar, name, and role badge
 */

import { type FC, type MouseEvent } from 'react';
import { Text, Badge } from '../../atoms';
import { ROLE_CONFIG, type User } from '../../../types/user';
import styles from './UserListItem.module.css';

export interface UserListItemProps {
  /** User data */
  user: User;
  /** Whether the item is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Double-click handler */
  onDoubleClick?: () => void;
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
 * UserListItem - List entry for users
 *
 * Classic Mac OS style user list item with:
 * - Avatar circle with initials
 * - Full name
 * - Role badge
 * - Inactive indicator
 * - Hover and selected states
 */
export const UserListItem: FC<UserListItemProps> = ({
  user,
  selected = false,
  onClick,
  onDoubleClick,
  className = '',
}) => {
  const classNames = [
    styles.userListItem,
    selected ? styles.selected : '',
    !user.isActive ? styles.inactive : '',
    className,
  ].filter(Boolean).join(' ');

  const roleConfig = ROLE_CONFIG[user.role];

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDoubleClick?.();
  };

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="listitem"
      aria-selected={selected}
      tabIndex={0}
    >
      {/* Avatar Circle */}
      <div className={styles.avatar} aria-hidden="true">
        <span className={styles.initials}>{getInitials(user.fullName)}</span>
      </div>

      {/* User Info */}
      <div className={styles.content}>
        <Text variant="body" weight="medium" className={styles.name} truncate>
          {user.fullName}
        </Text>
        <Text variant="small" color="secondary" className={styles.username} truncate>
          @{user.username}
        </Text>
      </div>

      {/* Status Dot */}
      <div 
        className={`${styles.statusDot} ${user.isActive ? styles.active : ''}`}
        title={user.isActive ? 'Active' : 'Inactive'}
        aria-label={user.isActive ? 'Active' : 'Inactive'}
      />

      {/* Role Badge */}
      <Badge variant={roleConfig.variant} className={styles.badge}>
        {roleConfig.label}
      </Badge>
    </div>
  );
};
