/**
 * Mac OS 8/9 Component Sizing Tokens
 * Standard dimensions for UI elements
 */

/**
 * Common Component Heights
 */
export const heights = {
  /** Window title bar */
  titleBar: '20px',
  /** Menu bar */
  menuBar: '20px',
  /** Standard button - small */
  buttonSm: '18px',
  /** Standard button - medium */
  buttonMd: '22px',
  /** Standard button - large */
  buttonLg: '28px',
  /** Input - small */
  inputSm: '18px',
  /** Input - medium */
  inputMd: '22px',
  /** Input - large */
  inputLg: '28px',
  /** List item */
  listItem: '20px',
  /** Toolbar */
  toolbar: '28px',
} as const;

/**
 * Icon Sizes
 */
export const iconSizes = {
  /** Extra small - 12px */
  xs: '12px',
  /** Small - 16px */
  sm: '16px',
  /** Medium - 24px */
  md: '24px',
  /** Large - 32px */
  lg: '32px',
  /** Extra large - 48px */
  xl: '48px',
  /** Desktop icon size - 32px */
  desktop: '32px',
} as const;

/**
 * Scrollbar Dimensions
 */
export const scrollbar = {
  /** Scrollbar width */
  width: '16px',
  /** Scrollbar button height */
  buttonHeight: '16px',
  /** Minimum thumb size */
  minThumbSize: '20px',
} as const;

/**
 * Window Sizing
 */
export const windowSizing = {
  /** Minimum window width */
  minWidth: '200px',
  /** Minimum window height */
  minHeight: '100px',
  /** Default window width */
  defaultWidth: '400px',
  /** Default window height */
  defaultHeight: '300px',
  /** Window resize handle size */
  resizeHandle: '16px',
} as const;

/**
 * Complete Sizing Object
 */
export const sizing = {
  // Heights
  titleBarHeight: heights.titleBar,
  menuBarHeight: heights.menuBar,
  buttonHeightSm: heights.buttonSm,
  buttonHeightMd: heights.buttonMd,
  buttonHeightLg: heights.buttonLg,
  inputHeightSm: heights.inputSm,
  inputHeightMd: heights.inputMd,
  inputHeightLg: heights.inputLg,
  listItemHeight: heights.listItem,
  toolbarHeight: heights.toolbar,
  
  // Icons
  iconSizeXs: iconSizes.xs,
  iconSizeSm: iconSizes.sm,
  iconSizeMd: iconSizes.md,
  iconSizeLg: iconSizes.lg,
  iconSizeXl: iconSizes.xl,
  iconSizeDesktop: iconSizes.desktop,
  
  // Scrollbar
  scrollbarWidth: scrollbar.width,
  scrollbarButtonHeight: scrollbar.buttonHeight,
  scrollbarMinThumb: scrollbar.minThumbSize,
  
  // Window
  windowMinWidth: windowSizing.minWidth,
  windowMinHeight: windowSizing.minHeight,
  windowDefaultWidth: windowSizing.defaultWidth,
  windowDefaultHeight: windowSizing.defaultHeight,
  windowResizeHandle: windowSizing.resizeHandle,
} as const;

/**
 * Type for height tokens
 */
export type HeightToken = keyof typeof heights;

/**
 * Type for icon size tokens
 */
export type IconSize = keyof typeof iconSizes;

/**
 * CSS Variable accessor for sizing
 */
export const heightVar = (height: HeightToken): string => {
  const varMap: Record<HeightToken, string> = {
    titleBar: 'var(--titlebar-height)',
    menuBar: 'var(--menubar-height)',
    buttonSm: 'var(--button-height-sm)',
    buttonMd: 'var(--button-height-md)',
    buttonLg: 'var(--button-height-lg)',
    inputSm: 'var(--input-height-sm)',
    inputMd: 'var(--input-height-md)',
    inputLg: 'var(--input-height-lg)',
    listItem: 'var(--list-item-height, 20px)',
    toolbar: 'var(--toolbar-height, 28px)',
  };
  return varMap[height];
};

/**
 * CSS Variable accessor for icon sizes
 */
export const iconSizeVar = (size: IconSize): string => {
  const varMap: Record<IconSize, string> = {
    xs: 'var(--icon-size-xs)',
    sm: 'var(--icon-size-sm)',
    md: 'var(--icon-size-md)',
    lg: 'var(--icon-size-lg)',
    xl: 'var(--icon-size-xl)',
    desktop: 'var(--icon-size-desktop, 32px)',
  };
  return varMap[size];
};
