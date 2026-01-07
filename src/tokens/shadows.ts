/**
 * Mac OS 8/9 Shadow Tokens
 * Classic hard-edge shadow effects
 */

/**
 * Drop Shadows - External shadows for floating elements
 * Classic Mac OS used hard-edge, offset shadows
 */
export const dropShadows = {
  /** No shadow */
  none: 'none',
  
  /** Window drop shadow */
  window: '2px 2px 0 rgba(0, 0, 0, 0.3), 4px 4px 0 rgba(0, 0, 0, 0.15)',
  
  /** Menu drop shadow */
  menu: '2px 2px 0 rgba(0, 0, 0, 0.25)',
  
  /** Dialog shadow - more prominent */
  dialog: '3px 3px 0 rgba(0, 0, 0, 0.35), 6px 6px 0 rgba(0, 0, 0, 0.15)',
  
  /** Tooltip shadow - subtle */
  tooltip: '1px 1px 0 rgba(0, 0, 0, 0.25)',
  
  /** Small shadow for subtle elevation */
  sm: '1px 1px 0 rgba(0, 0, 0, 0.2)',
  
  /** Medium shadow */
  md: '2px 2px 0 rgba(0, 0, 0, 0.25)',
  
  /** Large shadow */
  lg: '3px 3px 0 rgba(0, 0, 0, 0.3)',
} as const;

/**
 * Inset Shadows - Internal shadows for depth effects
 */
export const insetShadows = {
  /** No inset shadow */
  none: 'none',
  
  /** Subtle inner shadow */
  subtle: 'inset 1px 1px 2px rgba(0, 0, 0, 0.1)',
  
  /** Standard inset */
  default: 'inset 1px 1px 2px rgba(0, 0, 0, 0.15)',
  
  /** Deep inner shadow for wells/inputs */
  well: 'inset 1px 1px 3px rgba(0, 0, 0, 0.2), inset 2px 2px 6px rgba(0, 0, 0, 0.1)',
  
  /** Strong inset for pressed states */
  pressed: 'inset 2px 2px 4px rgba(0, 0, 0, 0.25)',
} as const;

/**
 * Bevel Shadows - 3D raised/inset effects (core Platinum look)
 */
export const bevelShadows = {
  /** Raised bevel - for buttons, toolbars */
  raised: 'inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #666666',
  
  /** Inset bevel - for inputs, pressed states */
  inset: 'inset 1px 1px 0 #666666, inset -1px -1px 0 #FFFFFF',
  
  /** Title bar bevel */
  title: 'inset 0 1px 0 #FFFFFF, inset 0 -1px 0 #666666',
  
  /** Strong raised bevel */
  raisedStrong: 'inset 2px 2px 0 #FFFFFF, inset -2px -2px 0 #666666',
  
  /** Strong inset bevel */
  insetStrong: 'inset 2px 2px 0 #666666, inset -2px -2px 0 #FFFFFF',
  
  /** Frame/Group box bevel */
  frame: 'inset 1px 1px 0 #666666, inset -1px -1px 0 #FFFFFF, inset 2px 2px 0 #FFFFFF, inset -2px -2px 0 #666666',
} as const;

/**
 * Combined shadows for complete component styling
 */
export const componentShadows = {
  /** Button default state */
  button: bevelShadows.raised,
  
  /** Button pressed state */
  buttonPressed: bevelShadows.inset,
  
  /** Input field */
  input: bevelShadows.inset,
  
  /** Text area / content well */
  textArea: `${bevelShadows.inset}, ${insetShadows.subtle}`,
  
  /** Card/Panel */
  card: bevelShadows.raised,
  
  /** Window */
  window: dropShadows.window,
  
  /** Active window */
  windowActive: dropShadows.dialog,
  
  /** Menu dropdown */
  menuDropdown: dropShadows.menu,
  
  /** Scrollbar thumb */
  scrollThumb: bevelShadows.raised,
  
  /** Scrollbar track */
  scrollTrack: bevelShadows.inset,
} as const;

/**
 * Complete Shadows Object
 */
export const shadows = {
  // Drop Shadows
  shadowNone: dropShadows.none,
  shadowWindow: dropShadows.window,
  shadowMenu: dropShadows.menu,
  shadowDialog: dropShadows.dialog,
  shadowTooltip: dropShadows.tooltip,
  shadowSm: dropShadows.sm,
  shadowMd: dropShadows.md,
  shadowLg: dropShadows.lg,
  
  // Inset Shadows
  shadowInset: insetShadows.default,
  shadowInsetSubtle: insetShadows.subtle,
  shadowWell: insetShadows.well,
  shadowPressed: insetShadows.pressed,
  
  // Bevels
  bevelRaised: bevelShadows.raised,
  bevelInset: bevelShadows.inset,
  bevelTitle: bevelShadows.title,
  bevelRaisedStrong: bevelShadows.raisedStrong,
  bevelInsetStrong: bevelShadows.insetStrong,
  bevelFrame: bevelShadows.frame,
} as const;

/**
 * Type for drop shadow tokens
 */
export type DropShadow = keyof typeof dropShadows;

/**
 * Type for inset shadow tokens
 */
export type InsetShadow = keyof typeof insetShadows;

/**
 * Type for bevel shadow tokens
 */
export type BevelShadow = keyof typeof bevelShadows;

/**
 * CSS Variable accessor for drop shadows
 */
export const shadowVar = (shadow: DropShadow): string => {
  const varMap: Record<DropShadow, string> = {
    none: 'var(--shadow-none)',
    window: 'var(--shadow-window)',
    menu: 'var(--shadow-menu)',
    dialog: 'var(--shadow-dialog)',
    tooltip: 'var(--shadow-tooltip)',
    sm: 'var(--shadow-sm, 1px 1px 0 rgba(0, 0, 0, 0.2))',
    md: 'var(--shadow-md, 2px 2px 0 rgba(0, 0, 0, 0.25))',
    lg: 'var(--shadow-lg, 3px 3px 0 rgba(0, 0, 0, 0.3))',
  };
  return varMap[shadow];
};

/**
 * CSS Variable accessor for bevel effects
 */
export const bevelVar = (bevel: BevelShadow): string => {
  const varMap: Record<BevelShadow, string> = {
    raised: 'var(--bevel-raised)',
    inset: 'var(--bevel-inset)',
    title: 'var(--bevel-title)',
    raisedStrong: 'var(--bevel-raised-strong)',
    insetStrong: 'var(--bevel-inset-strong)',
    frame: 'var(--bevel-frame)',
  };
  return varMap[bevel];
};
