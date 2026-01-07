/**
 * Settings Types
 * Type definitions for Control Panel settings
 */

/**
 * Theme options for appearance settings
 */
export type Theme = 'platinum' | 'graphite';

/**
 * Highlight color options
 */
export type HighlightColor = 
  | 'blue' 
  | 'purple' 
  | 'green' 
  | 'yellow' 
  | 'orange' 
  | 'red' 
  | 'graphite';

/**
 * Font size options
 */
export type FontSize = 'small' | 'medium' | 'large';

/**
 * Alert sound options
 */
export type AlertSound = 
  | 'sosumi' 
  | 'wild-eep' 
  | 'submarine' 
  | 'glass' 
  | 'ping';

/**
 * Display scaling options
 */
export type DisplayScaling = 1 | 1.25 | 1.5 | 2 | 3;

/**
 * Appearance settings
 */
export interface AppearanceSettings {
  theme: Theme;
  highlightColor: HighlightColor;
  fontSize: FontSize;
}

/**
 * Sound settings
 */
export interface SoundSettings {
  outputVolume: number; // 0-100
  muted: boolean;
  alertSound: AlertSound;
  alertVolume: number; // 0-100
}

/**
 * Date & Time settings
 */
export interface DateTimeSettings {
  use24Hour: boolean;
  showDateInMenuBar: boolean;
}

/**
 * Display settings
 */
export interface DisplaySettings {
  scaling: DisplayScaling;
  brightness: number; // 0-100
  autoAdjustBrightness: boolean;
}

/**
 * All settings combined
 */
export interface Settings {
  appearance: AppearanceSettings;
  sound: SoundSettings;
  dateTime: DateTimeSettings;
  display: DisplaySettings;
}

/**
 * Control Panel definition
 */
export interface ControlPanelItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}
