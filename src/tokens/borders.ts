/**
 * Mac OS 8/9 Border Tokens
 * Border radii, widths, and styles
 */

/**
 * Border Radius Scale
 * Classic Mac OS used mostly sharp corners
 */
export const borderRadius = {
  /** No radius - sharp corners (most common in classic Mac) */
  none: '0',
  /** Small radius - 2px */
  sm: '2px',
  /** Medium radius - 4px */
  md: '4px',
  /** Large radius - 8px */
  lg: '8px',
  /** Extra large - 12px */
  xl: '12px',
  /** Full/Pill shape */
  full: '9999px',
} as const;

/**
 * Border Width Scale
 */
export const borderWidth = {
  /** No border */
  '0': '0',
  /** Standard border - 1px */
  '1': '1px',
  /** Double border - 2px */
  '2': '2px',
  /** Triple border - 3px */
  '3': '3px',
  /** Thick border - 4px */
  '4': '4px',
} as const;

/**
 * Border Styles
 */
export const borderStyles = {
  none: 'none',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  groove: 'groove',
  ridge: 'ridge',
  inset: 'inset',
  outset: 'outset',
} as const;

/**
 * Pre-composed Border Definitions
 * Ready-to-use border values
 */
export const borderPresets = {
  /** No border */
  none: 'none',
  
  /** Standard border */
  default: '1px solid #999999',
  
  /** Light border */
  light: '1px solid #BBBBBB',
  
  /** Dark border */
  dark: '1px solid #666666',
  
  /** Focus border */
  focus: '1px solid #3366CC',
  
  /** Error border */
  error: '1px solid #CC0000',
  
  /** Thick border */
  thick: '2px solid #999999',
  
  /** Window border */
  window: '1px solid #666666',
  
  /** Outset border (for buttons) */
  outset: '1px solid #666666',
  
  /** Inset border (for inputs) */
  inset: '1px solid #999999',
} as const;

/**
 * Complete Borders Object
 */
export const borders = {
  // Radius
  radiusNone: borderRadius.none,
  radiusSm: borderRadius.sm,
  radiusMd: borderRadius.md,
  radiusLg: borderRadius.lg,
  radiusXl: borderRadius.xl,
  radiusFull: borderRadius.full,
  
  // Widths
  borderWidth0: borderWidth['0'],
  borderWidth1: borderWidth['1'],
  borderWidth2: borderWidth['2'],
  borderWidth3: borderWidth['3'],
  borderWidth4: borderWidth['4'],
  
  // Presets
  borderNone: borderPresets.none,
  borderDefault: borderPresets.default,
  borderLight: borderPresets.light,
  borderDark: borderPresets.dark,
  borderFocus: borderPresets.focus,
  borderError: borderPresets.error,
  borderThick: borderPresets.thick,
  borderWindow: borderPresets.window,
  borderOutset: borderPresets.outset,
  borderInset: borderPresets.inset,
} as const;

/**
 * Type for border radius tokens
 */
export type BorderRadius = keyof typeof borderRadius;

/**
 * Type for border width tokens
 */
export type BorderWidth = keyof typeof borderWidth;

/**
 * Type for border style tokens
 */
export type BorderStyle = keyof typeof borderStyles;

/**
 * Type for border preset tokens
 */
export type BorderPreset = keyof typeof borderPresets;

/**
 * CSS Variable accessor for border radius
 */
export const radiusVar = (radius: BorderRadius): string => {
  const varMap: Record<BorderRadius, string> = {
    none: 'var(--radius-none)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    full: 'var(--radius-full)',
  };
  return varMap[radius];
};

/**
 * CSS Variable accessor for border width
 */
export const borderWidthVar = (width: BorderWidth): string => {
  const varMap: Record<BorderWidth, string> = {
    '0': 'var(--border-0)',
    '1': 'var(--border-1)',
    '2': 'var(--border-2)',
    '3': 'var(--border-3)',
    '4': 'var(--border-4)',
  };
  return varMap[width];
};

/**
 * Helper to compose a border value
 */
export const composeBorder = (
  width: BorderWidth,
  style: BorderStyle,
  color: string
): string => {
  if (style === 'none') return 'none';
  return `${borderWidth[width]} ${borderStyles[style]} ${color}`;
};
