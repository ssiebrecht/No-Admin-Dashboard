/**
 * UserManagement Organism
 * Classic Mac OS 8/9 complete user management interface
 */

import { type FC, useState, useCallback } from 'react';
import { Toolbar, type ToolbarItem } from '../../molecules/Toolbar';
import { StatusBar } from '../../molecules/StatusBar';
import { UserList } from '../UserList';
import { UserDetail } from '../UserDetail';
import { UserFormDialog } from '../UserFormDialog';
import { ChangePasswordDialog } from '../ChangePasswordDialog';
import { useUserStore } from '../../../store/userStore';
import { useDialog } from '../../../hooks/useDialog';
import type { User, CreateUserData, UpdateUserData, ChangePasswordData } from '../../../types/user';
import styles from './UserManagement.module.css';

export interface UserManagementProps {
  /** Additional CSS class */
  className?: string;
}

/**
 * UserManagement - Complete User Management Page
 *
 * Classic Mac OS style with:
 * - Toolbar with New, Delete, Edit buttons
 * - Split panel: UserList on left, UserDetail on right
 * - StatusBar at bottom
 * - Modal dialogs for user creation/editing
 */
export const UserManagement: FC<UserManagementProps> = ({
  className = '',
}) => {
  const dialog = useDialog();
  
  const {
    users,
    selectedUserId,
    createUser,
    updateUser,
    deleteUser,
    toggleActive,
    getSelectedUser,
  } = useUserStore();

  // Dialog states
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [passwordUser, setPasswordUser] = useState<User | undefined>(undefined);

  const selectedUser = getSelectedUser();

  // Toolbar handlers
  const handleNewUser = useCallback(() => {
    setEditingUser(undefined);
    setIsUserFormOpen(true);
  }, []);

  const handleDeleteUser = useCallback(async () => {
    if (!selectedUser) return;

    const confirmed = await dialog.confirm({
      title: 'Delete User?',
      message: `Are you sure you want to delete "${selectedUser.fullName}"? This action cannot be undone.`,
      icon: 'warning',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      danger: true,
    });

    if (confirmed) {
      deleteUser(selectedUser.id);
      await dialog.alert({
        title: 'User Deleted',
        message: `User "${selectedUser.fullName}" has been deleted.`,
        icon: 'success',
      });
    }
  }, [selectedUser, deleteUser, dialog]);

  const handleEditUser = useCallback(() => {
    if (!selectedUser) return;
    setEditingUser(selectedUser);
    setIsUserFormOpen(true);
  }, [selectedUser]);

  // User detail handlers
  const handleDetailEdit = useCallback((user: User) => {
    setEditingUser(user);
    setIsUserFormOpen(true);
  }, []);

  const handleDetailChangePassword = useCallback((user: User) => {
    setPasswordUser(user);
    setIsPasswordDialogOpen(true);
  }, []);

  const handleDetailToggleActive = useCallback(async (user: User) => {
    const action = user.isActive ? 'deactivate' : 'activate';
    const confirmed = await dialog.confirm({
      title: `${user.isActive ? 'Deactivate' : 'Activate'} User?`,
      message: `Are you sure you want to ${action} "${user.fullName}"?`,
      icon: 'question',
      confirmLabel: user.isActive ? 'Deactivate' : 'Activate',
      cancelLabel: 'Cancel',
      danger: user.isActive,
    });

    if (confirmed) {
      toggleActive(user.id);
    }
  }, [toggleActive, dialog]);

  // Form handlers
  const handleUserFormSubmit = useCallback((data: CreateUserData | UpdateUserData) => {
    if (editingUser) {
      // Edit mode
      updateUser(editingUser.id, data as UpdateUserData);
    } else {
      // Create mode
      createUser(data as CreateUserData);
    }
    setIsUserFormOpen(false);
    setEditingUser(undefined);
  }, [editingUser, createUser, updateUser]);

  const handleUserFormClose = useCallback(() => {
    setIsUserFormOpen(false);
    setEditingUser(undefined);
  }, []);

  const handlePasswordSubmit = useCallback((_userId: string, _data: ChangePasswordData) => {
    // In a real app, this would call an API
    dialog.alert({
      title: 'Password Changed',
      message: 'The password has been changed successfully.',
      icon: 'success',
    });
    setIsPasswordDialogOpen(false);
    setPasswordUser(undefined);
  }, [dialog]);

  const handlePasswordClose = useCallback(() => {
    setIsPasswordDialogOpen(false);
    setPasswordUser(undefined);
  }, []);

  // Toolbar items
  const toolbarItems: ToolbarItem[] = [
    {
      type: 'button',
      icon: 'plus',
      label: 'New User',
      onClick: handleNewUser,
      showLabel: true,
    },
    {
      type: 'separator',
    },
    {
      type: 'button',
      icon: 'edit',
      label: 'Edit',
      onClick: handleEditUser,
      disabled: !selectedUserId,
    },
    {
      type: 'button',
      icon: 'trash',
      label: 'Delete',
      onClick: handleDeleteUser,
      disabled: !selectedUserId,
    },
    {
      type: 'spacer',
    },
  ];

  // Status bar info
  const activeUsers = users.filter((u) => u.isActive).length;
  const statusText = `${users.length} users (${activeUsers} active)`;

  const classNames = [
    styles.userManagement,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* Toolbar */}
      <Toolbar items={toolbarItems} className={styles.toolbar} />

      {/* Split Panel */}
      <div className={styles.splitPanel}>
        {/* Left: User List */}
        <UserList className={styles.userList} />

        {/* Right: User Detail */}
        <UserDetail
          user={selectedUser}
          onEdit={handleDetailEdit}
          onChangePassword={handleDetailChangePassword}
          onToggleActive={handleDetailToggleActive}
          className={styles.userDetail}
        />
      </div>

      {/* Status Bar */}
      <StatusBar text={statusText} className={styles.statusBar} />

      {/* User Form Dialog (Create/Edit) */}
      <UserFormDialog
        isOpen={isUserFormOpen}
        onClose={handleUserFormClose}
        onSubmit={handleUserFormSubmit}
        user={editingUser}
        mode={editingUser ? 'edit' : 'create'}
      />

      {/* Change Password Dialog */}
      <ChangePasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={handlePasswordClose}
        onSubmit={handlePasswordSubmit}
        user={passwordUser}
      />
    </div>
  );
};
