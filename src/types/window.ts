/**
 * Window System Type Definitions
 * Mac OS 8/9 Classic Window Management Types
 */

/**
 * Position coordinates for window placement
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Size dimensions for windows
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Window Button Types
 */
export type WindowButtonType = 'close' | 'zoom' | 'collapse';

/**
 * Resize direction for window resizing
 */
export type ResizeDirection =
  | 'n'
  | 's'
  | 'e'
  | 'w'
  | 'ne'
  | 'nw'
  | 'se'
  | 'sw';

/**
 * Window State - Represents the current state of a window
 */
export interface WindowState {
  /** Unique identifier for the window */
  id: string;
  /** Window title displayed in title bar */
  title: string;
  /** Optional icon identifier */
  icon?: string;

  /** Current window position */
  position: Position;
  /** Current window size */
  size: Size;
  /** Minimum allowed size */
  minSize: Size;
  /** Maximum allowed size (optional) */
  maxSize?: Size;

  /** Stored position before maximize */
  restorePosition?: Position;
  /** Stored size before maximize */
  restoreSize?: Size;

  /** Window state flags */
  isMinimized: boolean;
  isMaximized: boolean;
  isCollapsed: boolean;

  /** Z-index for stacking order */
  zIndex: number;

  /** Feature flags */
  resizable: boolean;
  closable: boolean;
  minimizable: boolean;
  maximizable: boolean;
}

/**
 * Configuration for opening a new window
 */
export interface WindowConfig {
  id: string;
  title: string;
  icon?: string;
  initialPosition?: Position;
  initialSize?: Size;
  minSize?: Size;
  maxSize?: Size;
  resizable?: boolean;
  closable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
}

/**
 * Window Store State
 */
export interface WindowStoreState {
  /** Array of all window states */
  windows: WindowState[];
  /** Currently focused window ID */
  activeWindowId: string | null;
  /** Counter for generating unique z-index values */
  topZIndex: number;
}

/**
 * Window Store Actions
 */
export interface WindowStoreActions {
  /** Open a new window with given configuration */
  openWindow: (config: WindowConfig) => void;
  /** Close a window by ID */
  closeWindow: (id: string) => void;
  /** Focus a window (bring to front) */
  focusWindow: (id: string) => void;
  /** Move a window to new position */
  moveWindow: (id: string, position: Position) => void;
  /** Resize a window to new size */
  resizeWindow: (id: string, size: Size) => void;
  /** Minimize a window */
  minimizeWindow: (id: string) => void;
  /** Maximize a window */
  maximizeWindow: (id: string) => void;
  /** Restore a window from maximized/minimized state */
  restoreWindow: (id: string) => void;
  /** Toggle window collapse (window shade) */
  toggleCollapse: (id: string) => void;
  /** Get a window by ID */
  getWindow: (id: string) => WindowState | undefined;
  /** Get the current top z-index */
  getTopZIndex: () => number;
}

/**
 * Combined Window Store Type
 */
export type WindowStore = WindowStoreState & WindowStoreActions;
