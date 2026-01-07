/**
 * UserList Organism
 * Classic Mac OS 8/9 scrollable user list with search and filter
 */

import { type FC } from 'react';
import { Input, Select } from '../../atoms';
import { UserListItem } from '../../molecules/UserListItem';
import { EmptyState } from '../../molecules/EmptyState';
import { useUserStore } from '../../../store/userStore';
import type { RoleFilter } from '../../../types/user';
import styles from './UserList.module.css';

export interface UserListProps {
  /** Additional CSS class */
  className?: string;
}

/**
 * Role filter options for the dropdown
 */
const ROLE_OPTIONS = [
  { value: 'all', label: 'All Roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'user', label: 'User' },
];

/**
 * UserList - Scrollable list of users with filtering
 *
 * Classic Mac OS style with:
 * - Search input
 * - Role filter dropdown
 * - Scrollable list of UserListItems
 * - Empty state when no results
 */
export const UserList: FC<UserListProps> = ({
  className = '',
}) => {
  const {
    selectedUserId,
    searchQuery,
    filterRole,
    setSearchQuery,
    setFilterRole,
    selectUser,
    getFilteredUsers,
  } = useUserStore();

  const filteredUsers = getFilteredUsers();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRole(e.target.value as RoleFilter);
  };

  const handleUserClick = (userId: string) => {
    selectUser(userId);
  };

  const handleUserDoubleClick = (userId: string) => {
    selectUser(userId);
    // Could trigger edit dialog here
  };

  const classNames = [
    styles.userList,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* Filter Header */}
      <div className={styles.filterHeader}>
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <Select
          options={ROLE_OPTIONS}
          value={filterRole}
          onChange={handleRoleChange}
          className={styles.roleFilter}
        />
      </div>

      {/* User List */}
      <div className={styles.listContainer} role="list">
        {filteredUsers.length === 0 ? (
          <EmptyState
            icon="user"
            title="No Users Found"
            description={
              searchQuery || filterRole !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'No users have been created yet.'
            }
          />
        ) : (
          filteredUsers.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              selected={selectedUserId === user.id}
              onClick={() => handleUserClick(user.id)}
              onDoubleClick={() => handleUserDoubleClick(user.id)}
            />
          ))
        )}
      </div>

      {/* List Footer */}
      <div className={styles.listFooter}>
        {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};
