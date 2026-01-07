/**
 * Settings Store - Zustand State Management
 * Mac OS 8/9 Control Panel Settings
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Settings,
  AppearanceSettings,
  SoundSettings,
  DateTimeSettings,
  DisplaySettings,
} from '../types/settings';
import { DEFAULT_SETTINGS } from '../data/controlPanels';

/**
 * Settings Store Interface
 */
interface SettingsStore {
  // State
  settings: Settings;

  // Actions
  updateAppearance: (updates: Partial<AppearanceSettings>) => void;
  updateSound: (updates: Partial<SoundSettings>) => void;
  updateDateTime: (updates: Partial<DateTimeSettings>) => void;
  updateDisplay: (updates: Partial<DisplaySettings>) => void;
  resetToDefaults: () => void;
}

/**
 * Settings Store Implementation
 */
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      // Initial State
      settings: DEFAULT_SETTINGS,

      // Update appearance settings
      updateAppearance: (updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            appearance: {
              ...state.settings.appearance,
              ...updates,
            },
          },
        })),

      // Update sound settings
      updateSound: (updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            sound: {
              ...state.settings.sound,
              ...updates,
            },
          },
        })),

      // Update date/time settings
      updateDateTime: (updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            dateTime: {
              ...state.settings.dateTime,
              ...updates,
            },
          },
        })),

      // Update display settings
      updateDisplay: (updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            display: {
              ...state.settings.display,
              ...updates,
            },
          },
        })),

      // Reset all settings to defaults
      resetToDefaults: () =>
        set(() => ({
          settings: DEFAULT_SETTINGS,
        })),
    }),
    {
      name: 'macos-settings-storage',
    }
  )
);
