/**
 * Menu Configuration
 * Mac OS 8/9 Classic Menu Bar Structure
 */

import type { Menu } from '../types/menu';

/**
 * Complete menu bar configuration
 */
export const menuConfig: Menu[] = [
  // Apple Menu
  {
    id: 'apple',
    label: '',
    icon: '🍎',
    items: [
      { id: 'about', label: 'About This Dashboard' },
      { id: 'sep-1', label: '', separator: true },
      { id: 'preferences', label: 'System Preferences...' },
      { id: 'sep-2', label: '', separator: true },
      {
        id: 'recent-apps',
        label: 'Recent Applications',
        submenu: [
          { id: 'app-1', label: 'Dashboard', icon: '📊' },
          { id: 'app-2', label: 'File Browser', icon: '📁' },
          { id: 'app-3', label: 'User Management', icon: '👥' },
        ],
      },
      {
        id: 'recent-docs',
        label: 'Recent Documents',
        submenu: [
          { id: 'doc-1', label: 'Report_2026.pdf', icon: '📄' },
          { id: 'doc-2', label: 'Users.csv', icon: '📄' },
          { id: 'doc-3', label: 'Config.json', icon: '📄' },
        ],
      },
      { id: 'sep-3', label: '', separator: true },
      { id: 'sleep', label: 'Sleep' },
      { id: 'restart', label: 'Restart' },
      { id: 'shutdown', label: 'Shut Down...' },
    ],
  },

  // File Menu
  {
    id: 'file',
    label: 'File',
    items: [
      { id: 'new-window', label: 'New Window', shortcut: '⌘N' },
      { id: 'open', label: 'Open...', shortcut: '⌘O' },
      { id: 'close-window', label: 'Close Window', shortcut: '⌘W' },
      { id: 'sep-1', label: '', separator: true },
      { id: 'get-info', label: 'Get Info', shortcut: '⌘I' },
      { id: 'sep-2', label: '', separator: true },
      { id: 'print', label: 'Print...', shortcut: '⌘P' },
    ],
  },

  // Edit Menu
  {
    id: 'edit',
    label: 'Edit',
    items: [
      { id: 'undo', label: 'Undo', shortcut: '⌘Z' },
      { id: 'redo', label: 'Redo', shortcut: '⇧⌘Z' },
      { id: 'sep-1', label: '', separator: true },
      { id: 'cut', label: 'Cut', shortcut: '⌘X' },
      { id: 'copy', label: 'Copy', shortcut: '⌘C' },
      { id: 'paste', label: 'Paste', shortcut: '⌘V' },
      { id: 'select-all', label: 'Select All', shortcut: '⌘A' },
    ],
  },

  // View Menu
  {
    id: 'view',
    label: 'View',
    items: [
      { id: 'as-icons', label: 'as Icons', shortcut: '⌘1' },
      { id: 'as-list', label: 'as List', shortcut: '⌘2' },
      { id: 'as-columns', label: 'as Columns', shortcut: '⌘3' },
      { id: 'sep-1', label: '', separator: true },
      { id: 'clean-up', label: 'Clean Up' },
      {
        id: 'arrange',
        label: 'Arrange',
        submenu: [
          { id: 'by-name', label: 'by Name' },
          { id: 'by-date', label: 'by Date Modified' },
          { id: 'by-size', label: 'by Size' },
          { id: 'by-kind', label: 'by Kind' },
        ],
      },
      { id: 'sep-2', label: '', separator: true },
      { id: 'hide-toolbar', label: 'Hide Toolbar', shortcut: '⌘B' },
      { id: 'hide-statusbar', label: 'Hide Status Bar' },
    ],
  },

  // Special Menu (Admin-specific)
  {
    id: 'special',
    label: 'Special',
    items: [
      { id: 'dashboard', label: 'Dashboard', shortcut: '⌘D', icon: '📊' },
      { id: 'user-management', label: 'User Management', shortcut: '⌘U', icon: '👥' },
      { id: 'file-browser', label: 'File Browser', shortcut: '⌘F', icon: '📁' },
      { id: 'sep-1', label: '', separator: true },
      { id: 'activity-monitor', label: 'Activity Monitor', icon: '📈' },
      { id: 'system-logs', label: 'System Logs', icon: '📋' },
      { id: 'sep-2', label: '', separator: true },
      { id: 'empty-trash', label: 'Empty Trash...', icon: '🗑️' },
    ],
  },

  // Help Menu
  {
    id: 'help',
    label: 'Help',
    items: [
      { id: 'search-help', label: 'Search' },
      { id: 'sep-1', label: '', separator: true },
      { id: 'dashboard-help', label: 'Dashboard Help' },
      { id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts' },
      { id: 'sep-2', label: '', separator: true },
      { id: 'report-issue', label: 'Report an Issue...' },
      { id: 'about-app', label: 'About Admin Dashboard' },
    ],
  },
];
