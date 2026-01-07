/**
 * Menu System Type Definitions
 * Mac OS 8/9 Classic Menu Bar Types
 */

/**
 * Single menu item in a dropdown
 */
export interface MenuItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Keyboard shortcut (e.g., "⌘Q") */
  shortcut?: string;
  /** Optional icon (emoji) */
  icon?: string;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether this is a separator line */
  separator?: boolean;
  /** Nested submenu items */
  submenu?: MenuItem[];
  /** Action to perform when clicked */
  action?: () => void;
}

/**
 * Top-level menu in the menu bar
 */
export interface Menu {
  /** Unique identifier */
  id: string;
  /** Display label (shown in menu bar) */
  label: string;
  /** Optional icon for menu (e.g., Apple menu) */
  icon?: string;
  /** Dropdown menu items */
  items: MenuItem[];
  /** Whether the entire menu is disabled */
  disabled?: boolean;
}

/**
 * Position for dropdown menus
 */
export interface MenuPosition {
  x: number;
  y: number;
}

/**
 * Menu Store State
 */
export interface MenuStoreState {
  /** Currently open menu ID (null if no menu is open) */
  activeMenuId: string | null;
  /** Currently open submenu path (array of menu item IDs) */
  activeSubmenuPath: string[];
}

/**
 * Menu Store Actions
 */
export interface MenuStoreActions {
  /** Open a menu by ID */
  openMenu: (id: string) => void;
  /** Close all menus */
  closeMenu: () => void;
  /** Open a submenu */
  openSubmenu: (itemId: string) => void;
  /** Close submenus up to a certain level */
  closeSubmenuToLevel: (level: number) => void;
}

/**
 * Combined Menu Store Type
 */
export type MenuStore = MenuStoreState & MenuStoreActions;
