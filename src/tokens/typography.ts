/**
 * Mac OS 8/9 Typography Tokens
 * TypeScript constants matching CSS Custom Properties
 */

/**
 * Font Family Stacks
 * Classic Mac used Chicago (9pt) and Charcoal (12pt)
 */
export const fontFamilies = {
  /** System font stack with Chicago/Charcoal feel */
  system: "-apple-system, 'Segoe UI', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
  /** Monospace for technical/code content */
  mono: "'Monaco', 'SF Mono', 'Consolas', 'Liberation Mono', 'Courier New', monospace",
  /** Optional pixel font for extra authenticity */
  chicago: "'ChicagoFLF', 'Chicago', -apple-system, 'Segoe UI', sans-serif",
} as const;

/**
 * Font Sizes - Classic Mac OS Style
 * Uses pixel values for authentic retro feel
 */
export const fontSizes = {
  /** 9px - Fine print, status bar items */
  xs: '9px',
  /** 10px - Labels, menu items */
  sm: '10px',
  /** 12px - Body text, standard (most common) */
  base: '12px',
  /** 14px - Headings, important text */
  lg: '14px',
  /** 18px - Dialog titles, section headers */
  xl: '18px',
  /** 24px - Large titles */
  '2xl': '24px',
} as const;

/**
 * Line Heights
 */
export const lineHeights = {
  /** No line height adjustment */
  none: '1',
  /** Tight - for compact displays */
  tight: '1.1',
  /** Snug - slightly compact */
  snug: '1.2',
  /** Normal - standard readability */
  normal: '1.3',
  /** Relaxed - comfortable reading */
  relaxed: '1.5',
  /** Loose - very open */
  loose: '1.75',
} as const;

/**
 * Font Weights
 */
export const fontWeights = {
  /** Regular weight */
  normal: '400',
  /** Medium weight */
  medium: '500',
  /** Semi-bold */
  semibold: '600',
  /** Bold */
  bold: '700',
} as const;

/**
 * Letter Spacing / Tracking
 */
export const letterSpacing = {
  /** Very tight */
  tighter: '-0.05em',
  /** Slightly tight */
  tight: '-0.025em',
  /** Normal spacing */
  normal: '0',
  /** Slightly wide */
  wide: '0.025em',
  /** Very wide */
  wider: '0.05em',
} as const;

/**
 * Complete Typography Object
 */
export const typography = {
  // Font Families
  fontSystem: fontFamilies.system,
  fontMono: fontFamilies.mono,
  fontChicago: fontFamilies.chicago,
  
  // Font Sizes
  textXs: fontSizes.xs,
  textSm: fontSizes.sm,
  textBase: fontSizes.base,
  textLg: fontSizes.lg,
  textXl: fontSizes.xl,
  text2Xl: fontSizes['2xl'],
  
  // Line Heights
  leadingNone: lineHeights.none,
  leadingTight: lineHeights.tight,
  leadingSnug: lineHeights.snug,
  leadingNormal: lineHeights.normal,
  leadingRelaxed: lineHeights.relaxed,
  leadingLoose: lineHeights.loose,
  
  // Font Weights
  fontNormal: fontWeights.normal,
  fontMedium: fontWeights.medium,
  fontSemibold: fontWeights.semibold,
  fontBold: fontWeights.bold,
  
  // Letter Spacing
  trackingTighter: letterSpacing.tighter,
  trackingTight: letterSpacing.tight,
  trackingNormal: letterSpacing.normal,
  trackingWide: letterSpacing.wide,
  trackingWider: letterSpacing.wider,
} as const;

/**
 * Type for font family tokens
 */
export type FontFamily = keyof typeof fontFamilies;

/**
 * Type for font size tokens
 */
export type FontSize = keyof typeof fontSizes;

/**
 * Type for line height tokens
 */
export type LineHeight = keyof typeof lineHeights;

/**
 * Type for font weight tokens
 */
export type FontWeight = keyof typeof fontWeights;

/**
 * Type for letter spacing tokens
 */
export type LetterSpacing = keyof typeof letterSpacing;

/**
 * CSS Variable accessor for font families
 */
export const fontFamilyVar = (family: FontFamily): string => {
  const varMap: Record<FontFamily, string> = {
    system: 'var(--font-system)',
    mono: 'var(--font-mono)',
    chicago: 'var(--font-chicago)',
  };
  return varMap[family];
};

/**
 * CSS Variable accessor for font sizes
 */
export const fontSizeVar = (size: FontSize): string => {
  const varMap: Record<FontSize, string> = {
    xs: 'var(--text-xs)',
    sm: 'var(--text-sm)',
    base: 'var(--text-base)',
    lg: 'var(--text-lg)',
    xl: 'var(--text-xl)',
    '2xl': 'var(--text-2xl)',
  };
  return varMap[size];
};

/**
 * CSS Variable accessor for line heights
 */
export const lineHeightVar = (height: LineHeight): string => {
  const varMap: Record<LineHeight, string> = {
    none: 'var(--leading-none)',
    tight: 'var(--leading-tight)',
    snug: 'var(--leading-snug)',
    normal: 'var(--leading-normal)',
    relaxed: 'var(--leading-relaxed)',
    loose: 'var(--leading-loose)',
  };
  return varMap[height];
};

/**
 * CSS Variable accessor for font weights
 */
export const fontWeightVar = (weight: FontWeight): string => {
  const varMap: Record<FontWeight, string> = {
    normal: 'var(--font-normal)',
    medium: 'var(--font-medium)',
    semibold: 'var(--font-semibold)',
    bold: 'var(--font-bold)',
  };
  return varMap[weight];
};
