/**
 * Desktop System Type Definitions
 * Mac OS 8/9 Classic Desktop Types
 */

import type { Position } from './window';

/**
 * Types of desktop icons
 */
export type DesktopIconType = 'folder' | 'file' | 'application' | 'trash' | 'disk';

/**
 * Desktop Icon Definition
 */
export interface DesktopIconData {
  /** Unique identifier */
  id: string;
  /** Display label under the icon */
  label: string;
  /** Icon to display (emoji or icon identifier) */
  icon: string;
  /** Position on desktop */
  position: Position;
  /** Type of icon (affects behavior) */
  type: DesktopIconType;
  /** Optional window ID to open on double-click */
  windowId?: string;
  /** Whether the icon is locked in position */
  locked?: boolean;
}

/**
 * Desktop Store State
 */
export interface DesktopStoreState {
  /** Array of desktop icons */
  icons: DesktopIconData[];
  /** Currently selected icon ID (null if none selected) */
  selectedIconId: string | null;
}

/**
 * Desktop Store Actions
 */
export interface DesktopStoreActions {
  /** Select an icon by ID */
  selectIcon: (id: string) => void;
  /** Clear current selection */
  clearSelection: () => void;
  /** Move an icon to a new position */
  moveIcon: (id: string, position: Position) => void;
  /** Arrange icons in a grid */
  arrangeIcons: () => void;
  /** Add a new icon to the desktop */
  addIcon: (icon: DesktopIconData) => void;
  /** Remove an icon from the desktop */
  removeIcon: (id: string) => void;
}

/**
 * Combined Desktop Store Type
 */
export type DesktopStore = DesktopStoreState & DesktopStoreActions;
