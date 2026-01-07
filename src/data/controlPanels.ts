/**
 * Control Panels Data
 * Panel definitions and default settings
 */

import type { ControlPanelItem, Settings } from '../types/settings';

/**
 * Available control panels
 */
export const CONTROL_PANELS: ControlPanelItem[] = [
  {
    id: 'appearance',
    name: 'Appearance',
    icon: '🎨',
    description: 'Change the look and feel of your Mac',
  },
  {
    id: 'sound',
    name: 'Sound',
    icon: '🔊',
    description: 'Configure sound output and alerts',
  },
  {
    id: 'date-time',
    name: 'Date & Time',
    icon: '🕐',
    description: 'Set the date, time, and time zone',
  },
  {
    id: 'memory',
    name: 'Memory',
    icon: '💾',
    description: 'View memory and disk usage',
  },
  {
    id: 'display',
    name: 'Display',
    icon: '🖥️',
    description: 'Configure display settings and resolution',
  },
  {
    id: 'network',
    name: 'Network',
    icon: '🌐',
    description: 'Manage network connections',
  },
];

/**
 * Highlight color definitions
 */
export const HIGHLIGHT_COLORS = [
  { id: 'blue', name: 'Blue', value: '#3366CC' },
  { id: 'purple', name: 'Purple', value: '#663399' },
  { id: 'green', name: 'Green', value: '#00AA00' },
  { id: 'yellow', name: 'Yellow', value: '#FFCC00' },
  { id: 'orange', name: 'Orange', value: '#FF9900' },
  { id: 'red', name: 'Red', value: '#CC0000' },
  { id: 'graphite', name: 'Graphite', value: '#808080' },
] as const;

/**
 * Alert sound options
 */
export const ALERT_SOUNDS = [
  { id: 'sosumi', name: 'Sosumi' },
  { id: 'wild-eep', name: 'Wild Eep' },
  { id: 'submarine', name: 'Submarine' },
  { id: 'glass', name: 'Glass' },
  { id: 'ping', name: 'Ping' },
] as const;

/**
 * Display scaling options
 */
export const SCALING_OPTIONS = [
  { value: 1, label: '1x', description: 'Default' },
  { value: 1.25, label: '1.25x', description: 'Slightly Larger' },
  { value: 1.5, label: '1.5x', description: 'Medium' },
  { value: 2, label: '2x', description: 'Large' },
  { value: 3, label: '3x', description: 'Extra Large' },
] as const;

/**
 * Default settings
 */
export const DEFAULT_SETTINGS: Settings = {
  appearance: {
    theme: 'platinum',
    highlightColor: 'blue',
    fontSize: 'medium',
  },
  sound: {
    outputVolume: 75,
    muted: false,
    alertSound: 'sosumi',
    alertVolume: 50,
  },
  dateTime: {
    use24Hour: false,
    showDateInMenuBar: false,
  },
  display: {
    scaling: 1,
    brightness: 80,
    autoAdjustBrightness: true,
  },
};

/**
 * Mock memory data
 */
export const MOCK_MEMORY_DATA = {
  total: 16384, // 16 GB in MB
  used: 11264, // 11 GB in MB
  app: 4096, // 4 GB
  wired: 2048, // 2 GB
  compressed: 3072, // 3 GB
  cached: 2048, // 2 GB
};

/**
 * Mock disk data
 */
export const MOCK_DISK_DATA = {
  total: 512000, // 512 GB in MB
  used: 307200, // 300 GB in MB
  name: 'Macintosh HD',
};
