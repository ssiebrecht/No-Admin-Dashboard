/**
 * Window Store - Zustand State Management
 * Mac OS 8/9 Classic Window System
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  WindowStore,
  WindowState,
  WindowConfig,
  Position,
  Size,
} from '../types/window';

/**
 * Default window settings
 */
const DEFAULT_SIZE: Size = { width: 400, height: 300 };
const DEFAULT_MIN_SIZE: Size = { width: 200, height: 150 };
const DEFAULT_POSITION: Position = { x: 50, y: 50 };
const BASE_Z_INDEX = 100;

/**
 * Calculate cascading position for new windows
 */
const getCascadingPosition = (windowCount: number): Position => ({
  x: DEFAULT_POSITION.x + (windowCount * 25),
  y: DEFAULT_POSITION.y + (windowCount * 25),
});

/**
 * Window Store Implementation
 */
export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      // Initial State
      windows: [],
      activeWindowId: null,
      topZIndex: BASE_Z_INDEX,

      // Actions
      openWindow: (config: WindowConfig) => {
        const state = get();
        
        // Check if window with same ID already exists
        const existingWindow = state.windows.find(w => w.id === config.id);
        if (existingWindow) {
          // Focus existing window instead of creating new one
          get().focusWindow(config.id);
          return;
        }

        const newZIndex = state.topZIndex + 1;
        const position = config.initialPosition ?? getCascadingPosition(state.windows.length);

        const newWindow: WindowState = {
          id: config.id,
          title: config.title,
          icon: config.icon,
          position,
          size: config.initialSize ?? DEFAULT_SIZE,
          minSize: config.minSize ?? DEFAULT_MIN_SIZE,
          maxSize: config.maxSize,
          isMinimized: false,
          isMaximized: false,
          isCollapsed: false,
          zIndex: newZIndex,
          resizable: config.resizable ?? true,
          closable: config.closable ?? true,
          minimizable: config.minimizable ?? true,
          maximizable: config.maximizable ?? true,
        };

        set({
          windows: [...state.windows, newWindow],
          activeWindowId: config.id,
          topZIndex: newZIndex,
        });
      },

      closeWindow: (id: string) => {
        const state = get();
        const remainingWindows = state.windows.filter(w => w.id !== id);
        
        // Find new active window (the one with highest z-index)
        let newActiveId: string | null = null;
        if (remainingWindows.length > 0) {
          const topWindow = remainingWindows.reduce((prev, curr) =>
            curr.zIndex > prev.zIndex ? curr : prev
          );
          newActiveId = topWindow.id;
        }

        set({
          windows: remainingWindows,
          activeWindowId: state.activeWindowId === id ? newActiveId : state.activeWindowId,
        });
      },

      focusWindow: (id: string) => {
        const state = get();
        const window = state.windows.find(w => w.id === id);
        
        if (!window || state.activeWindowId === id) return;

        const newZIndex = state.topZIndex + 1;

        set({
          windows: state.windows.map(w =>
            w.id === id
              ? { ...w, zIndex: newZIndex, isMinimized: false }
              : w
          ),
          activeWindowId: id,
          topZIndex: newZIndex,
        });
      },

      moveWindow: (id: string, position: Position) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, position } : w
          ),
        }));
      },

      resizeWindow: (id: string, size: Size) => {
        set(state => ({
          windows: state.windows.map(w => {
            if (w.id !== id) return w;
            
            // Enforce min/max constraints
            const constrainedSize: Size = {
              width: Math.max(
                w.minSize.width,
                w.maxSize ? Math.min(size.width, w.maxSize.width) : size.width
              ),
              height: Math.max(
                w.minSize.height,
                w.maxSize ? Math.min(size.height, w.maxSize.height) : size.height
              ),
            };
            
            return { ...w, size: constrainedSize };
          }),
        }));
      },

      minimizeWindow: (id: string) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, isMinimized: true } : w
          ),
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        }));
      },

      maximizeWindow: (id: string) => {
        set(state => ({
          windows: state.windows.map(w => {
            if (w.id !== id) return w;
            
            if (w.isMaximized) {
              // Restore from maximized
              return {
                ...w,
                isMaximized: false,
                position: w.restorePosition ?? w.position,
                size: w.restoreSize ?? w.size,
                restorePosition: undefined,
                restoreSize: undefined,
              };
            } else {
              // Maximize window
              return {
                ...w,
                isMaximized: true,
                restorePosition: w.position,
                restoreSize: w.size,
                position: { x: 0, y: 20 }, // Below menu bar
                size: {
                  width: window.innerWidth,
                  height: window.innerHeight - 20,
                },
              };
            }
          }),
        }));
      },

      restoreWindow: (id: string) => {
        set(state => ({
          windows: state.windows.map(w => {
            if (w.id !== id) return w;
            
            return {
              ...w,
              isMinimized: false,
              isMaximized: false,
              isCollapsed: false,
              position: w.restorePosition ?? w.position,
              size: w.restoreSize ?? w.size,
              restorePosition: undefined,
              restoreSize: undefined,
            };
          }),
        }));
      },

      toggleCollapse: (id: string) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, isCollapsed: !w.isCollapsed } : w
          ),
        }));
      },

      getWindow: (id: string) => {
        return get().windows.find(w => w.id === id);
      },

      getTopZIndex: () => {
        return get().topZIndex;
      },
    }),
    {
      name: 'macos-window-storage',
      partialize: (state) => ({
        windows: state.windows.map(w => ({
          ...w,
          // Reset transient states on reload
          isMinimized: false,
        })),
        topZIndex: state.topZIndex,
      }),
    }
  )
);
