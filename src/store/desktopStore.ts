/**
 * Desktop Store - Zustand State Management
 * Mac OS 8/9 Classic Desktop System
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DesktopStore, DesktopIconData } from '../types/desktop';
import type { Position } from '../types/window';

/**
 * Default desktop icons configuration
 */
const DEFAULT_ICONS: DesktopIconData[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    position: { x: 20, y: 20 },
    type: 'application',
    windowId: 'dashboard',
  },
  {
    id: 'users',
    label: 'Users',
    icon: '👥',
    position: { x: 20, y: 100 },
    type: 'folder',
    windowId: 'user-management',
  },
  {
    id: 'files',
    label: 'Files',
    icon: '📁',
    position: { x: 20, y: 180 },
    type: 'folder',
    windowId: 'file-browser',
  },
  {
    id: 'settings',
    label: 'Control Panels',
    icon: '⚙️',
    position: { x: 20, y: 260 },
    type: 'folder',
    windowId: 'control-panels',
  },
  {
    id: 'trash',
    label: 'Trash',
    icon: '🗑️',
    position: { x: 20, y: 500 },
    type: 'trash',
    windowId: 'trash',
    locked: true,
  },
];

/**
 * Grid spacing for icon arrangement
 */
const GRID_SPACING = 80;
const GRID_START_X = 20;
const GRID_START_Y = 20;

/**
 * Desktop Store Implementation
 */
export const useDesktopStore = create<DesktopStore>()(
  persist(
    (set, get) => ({
      // Initial State
      icons: DEFAULT_ICONS,
      selectedIconId: null,

      // Actions
      selectIcon: (id: string) => {
        set({ selectedIconId: id });
      },

      clearSelection: () => {
        set({ selectedIconId: null });
      },

      moveIcon: (id: string, position: Position) => {
        set((state) => ({
          icons: state.icons.map((icon) =>
            icon.id === id && !icon.locked ? { ...icon, position } : icon
          ),
        }));
      },

      arrangeIcons: () => {
        const state = get();
        const nonTrashIcons = state.icons.filter((i) => i.type !== 'trash');
        const trashIcon = state.icons.find((i) => i.type === 'trash');

        // Arrange non-trash icons in a grid
        const arrangedIcons = nonTrashIcons.map((icon, index) => ({
          ...icon,
          position: {
            x: GRID_START_X,
            y: GRID_START_Y + index * GRID_SPACING,
          },
        }));

        // Keep trash at bottom
        if (trashIcon) {
          arrangedIcons.push(trashIcon);
        }

        set({ icons: arrangedIcons });
      },

      addIcon: (icon: DesktopIconData) => {
        set((state) => ({
          icons: [...state.icons, icon],
        }));
      },

      removeIcon: (id: string) => {
        set((state) => ({
          icons: state.icons.filter((icon) => icon.id !== id),
          selectedIconId: state.selectedIconId === id ? null : state.selectedIconId,
        }));
      },
    }),
    {
      name: 'macos-desktop-storage',
      partialize: (state) => ({
        icons: state.icons,
      }),
    }
  )
);
