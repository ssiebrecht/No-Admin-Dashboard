/**
 * Mac OS 8/9 Z-Index Tokens
 * Layering system for window management
 */

/**
 * Z-Index Scale for Window Management
 * Carefully ordered for proper stacking context
 */
export const zIndex = {
  /** Behind everything */
  behind: -1,
  
  /** Base level */
  base: 0,
  
  /** Desktop layer */
  desktop: 0,
  
  /** Desktop icons */
  desktopIcon: 10,
  
  /** Inactive windows */
  windowBase: 100,
  
  /** Active/focused window */
  windowActive: 200,
  
  /** Window being dragged */
  windowDragging: 300,
  
  /** Menu bar (always above windows) */
  menuBar: 900,
  
  /** Open menu dropdowns */
  menuDropdown: 910,
  
  /** Dialog windows (above everything except modals) */
  dialog: 1000,
  
  /** Modal backdrop */
  modalBackdrop: 1050,
  
  /** Modal windows */
  modal: 1100,
  
  /** Tooltips */
  tooltip: 1200,
  
  /** Notifications/Alerts */
  notification: 1300,
  
  /** Absolute maximum for critical overlays */
  maximum: 9999,
} as const;

/**
 * Z-Index aliases for common use cases
 */
export const zIndexAliases = {
  /** Standard popup menus */
  popup: zIndex.menuDropdown,
  
  /** Floating elements */
  floating: zIndex.dialog,
  
  /** Overlay content */
  overlay: zIndex.modal,
  
  /** Top-most visible element */
  topmost: zIndex.notification,
} as const;

/**
 * Type for z-index token names
 */
export type ZIndexToken = keyof typeof zIndex;

/**
 * Type for z-index alias names
 */
export type ZIndexAlias = keyof typeof zIndexAliases;

/**
 * CSS Variable accessor for z-index values
 */
export const zIndexVar = (token: ZIndexToken): string => {
  const varMap: Record<ZIndexToken, string> = {
    behind: 'var(--z-behind)',
    base: 'var(--z-base)',
    desktop: 'var(--z-desktop)',
    desktopIcon: 'var(--z-desktop-icon)',
    windowBase: 'var(--z-window-base)',
    windowActive: 'var(--z-window-active)',
    windowDragging: 'var(--z-window-dragging)',
    menuBar: 'var(--z-menu-bar)',
    menuDropdown: 'var(--z-menu-dropdown)',
    dialog: 'var(--z-dialog)',
    modalBackdrop: 'var(--z-modal-backdrop)',
    modal: 'var(--z-modal)',
    tooltip: 'var(--z-tooltip)',
    notification: 'var(--z-notification)',
    maximum: 'var(--z-maximum)',
  };
  return varMap[token];
};

/**
 * Get the raw numeric z-index value
 */
export const getZIndex = (token: ZIndexToken): number => {
  return zIndex[token];
};

/**
 * Calculate a z-index value relative to a base level
 * Useful for stacking windows dynamically
 */
export const relativeZIndex = (base: ZIndexToken, offset: number): number => {
  return zIndex[base] + offset;
};
