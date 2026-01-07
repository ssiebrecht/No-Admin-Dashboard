/**
 * Menu Store - Zustand State Management
 * Mac OS 8/9 Classic Menu Bar System
 */

import { create } from 'zustand';
import type { MenuStore } from '../types/menu';

/**
 * Menu Store Implementation
 */
export const useMenuStore = create<MenuStore>()((set) => ({
  // Initial State
  activeMenuId: null,
  activeSubmenuPath: [],

  // Actions
  openMenu: (id: string) => {
    set({
      activeMenuId: id,
      activeSubmenuPath: [],
    });
  },

  closeMenu: () => {
    set({
      activeMenuId: null,
      activeSubmenuPath: [],
    });
  },

  openSubmenu: (itemId: string) => {
    set((state) => ({
      activeSubmenuPath: [...state.activeSubmenuPath, itemId],
    }));
  },

  closeSubmenuToLevel: (level: number) => {
    set((state) => ({
      activeSubmenuPath: state.activeSubmenuPath.slice(0, level),
    }));
  },
}));
