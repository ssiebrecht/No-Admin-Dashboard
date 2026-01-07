/**
 * User Store - Zustand State Management
 * Mac OS 8/9 Classic User Management System
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, RoleFilter, CreateUserData, UpdateUserData } from '../types/user';
import { mockUsers } from '../data/mockUsers';

/**
 * Generate a unique user ID
 */
const generateUserId = (): string => {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * User Store State
 */
interface UserState {
  /** All users */
  users: User[];
  /** Currently selected user ID */
  selectedUserId: string | null;
  /** Search query for filtering */
  searchQuery: string;
  /** Role filter */
  filterRole: RoleFilter;
}

/**
 * User Store Actions
 */
interface UserActions {
  /** Create a new user */
  createUser: (data: CreateUserData) => User;
  /** Update an existing user */
  updateUser: (id: string, updates: UpdateUserData) => void;
  /** Delete a user */
  deleteUser: (id: string) => void;
  /** Toggle user active status */
  toggleActive: (id: string) => void;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Set role filter */
  setFilterRole: (role: RoleFilter) => void;
  /** Select a user */
  selectUser: (id: string | null) => void;
  /** Get filtered users */
  getFilteredUsers: () => User[];
  /** Get user by ID */
  getUser: (id: string) => User | undefined;
  /** Get the selected user */
  getSelectedUser: () => User | undefined;
  /** Initialize mock data */
  initializeMockData: (users: User[]) => void;
}

/**
 * User Store Type
 */
type UserStore = UserState & UserActions;

/**
 * User Store Implementation
 */
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial State
      users: mockUsers,
      selectedUserId: null,
      searchQuery: '',
      filterRole: 'all',

      // Create a new user
      createUser: (data: CreateUserData) => {
        const newUser: User = {
          id: generateUserId(),
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
          createdAt: new Date().toISOString(),
          isActive: data.isActive ?? true,
        };

        set((state) => ({
          users: [...state.users, newUser],
        }));

        return newUser;
      },

      // Update an existing user
      updateUser: (id: string, updates: UpdateUserData) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          ),
        }));
      },

      // Delete a user
      deleteUser: (id: string) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          selectedUserId: state.selectedUserId === id ? null : state.selectedUserId,
        }));
      },

      // Toggle user active status
      toggleActive: (id: string) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
          ),
        }));
      },

      // Set search query
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      // Set role filter
      setFilterRole: (role: RoleFilter) => {
        set({ filterRole: role });
      },

      // Select a user
      selectUser: (id: string | null) => {
        set({ selectedUserId: id });
      },

      // Get filtered users
      getFilteredUsers: () => {
        const state = get();
        let filtered = [...state.users];

        // Apply search filter
        if (state.searchQuery.trim()) {
          const query = state.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (user) =>
              user.username.toLowerCase().includes(query) ||
              user.fullName.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query)
          );
        }

        // Apply role filter
        if (state.filterRole !== 'all') {
          filtered = filtered.filter((user) => user.role === state.filterRole);
        }

        // Sort by fullName
        filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));

        return filtered;
      },

      // Get user by ID
      getUser: (id: string) => {
        const state = get();
        return state.users.find((user) => user.id === id);
      },

      // Get the selected user
      getSelectedUser: () => {
        const state = get();
        if (!state.selectedUserId) return undefined;
        return state.users.find((user) => user.id === state.selectedUserId);
      },

      // Initialize mock data
      initializeMockData: (users: User[]) => {
        set({ users });
      },
    }),
    {
      name: 'macos-user-storage',
      partialize: (state) => ({
        users: state.users,
      }),
    }
  )
);
