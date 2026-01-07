/**
 * Mac OS 8/9 Platinum Color Tokens
 * TypeScript constants matching CSS Custom Properties
 */

/**
 * Platinum Gray Palette - Core System Colors
 */
export const platinumGrays = {
  white: '#FFFFFF',
  platinumLightest: '#EEEEEE',
  platinumLight: '#DDDDDD',
  platinumBase: '#CCCCCC',
  platinumDark: '#BBBBBB',
  grayLight: '#999999',
  grayMedium: '#666666',
  grayDark: '#333333',
  black: '#000000',
} as const;

/**
 * Semantic Background Colors
 */
export const backgrounds = {
  /** Classic Desktop Blue-Gray */
  desktop: '#5C7A99',
  /** Platinum Window Background */
  windowBg: '#DDDDDD',
  /** Content Area Background */
  contentBg: '#FFFFFF',
  /** Raised Surface Background */
  surface: '#EEEEEE',
  /** Raised Surface Variation */
  surfaceRaised: '#EEEEEE',
  /** Sunken Surface Variation */
  surfaceSunken: '#CCCCCC',
} as const;

/**
 * Text Colors
 */
export const textColors = {
  /** Primary Text Color */
  primary: '#000000',
  /** Secondary/Muted Text */
  secondary: '#666666',
  /** Disabled Text */
  disabled: '#999999',
  /** Inverse Text (on dark backgrounds) */
  inverse: '#FFFFFF',
} as const;

/**
 * Border & Bevel Colors for 3D Effects
 */
export const bevelColors = {
  /** Light edge of 3D bevel */
  light: '#FFFFFF',
  /** Dark edge of 3D bevel */
  dark: '#666666',
  /** Darker edge for strong bevels */
  darker: '#333333',
} as const;

/**
 * Border Colors
 */
export const borderColors = {
  /** Standard border */
  default: '#999999',
  /** Light border variant */
  light: '#BBBBBB',
  /** Dark border variant */
  dark: '#666666',
} as const;

/**
 * Interactive/Highlight Colors
 */
export const interactiveColors = {
  /** Selection/Focus highlight */
  highlight: '#3366CC',
  /** Lighter highlight variant */
  highlightLight: '#4477DD',
  /** Darker highlight variant */
  highlightDark: '#224499',
  /** Text on highlighted background */
  highlightText: '#FFFFFF',
  /** Focus ring color */
  focus: '#3366CC',
  /** Focus ring with transparency */
  focusRing: 'rgba(51, 102, 204, 0.5)',
} as const;

/**
 * Classic Mac OS Accent Colors
 */
export const accentColors = {
  /** Classic Purple accent */
  purple: '#663399',
  /** Graphite theme accent */
  graphite: '#808080',
} as const;

/**
 * Status/Feedback Colors
 */
export const statusColors = {
  success: '#00AA00',
  successLight: '#00CC00',
  successDark: '#008800',
  warning: '#FFCC00',
  warningLight: '#FFDD33',
  warningDark: '#CC9900',
  error: '#CC0000',
  errorLight: '#EE0000',
  errorDark: '#990000',
  info: '#0066CC',
  infoLight: '#0088EE',
  infoDark: '#004499',
} as const;

/**
 * Complete Colors Object
 * Maps to CSS Custom Properties: --color-{name}
 */
export const colors = {
  // Platinum Grays
  ...platinumGrays,
  
  // Backgrounds
  desktop: backgrounds.desktop,
  windowBg: backgrounds.windowBg,
  contentBg: backgrounds.contentBg,
  surface: backgrounds.surface,
  surfaceRaised: backgrounds.surfaceRaised,
  surfaceSunken: backgrounds.surfaceSunken,
  
  // Text
  text: textColors.primary,
  textPrimary: textColors.primary,
  textSecondary: textColors.secondary,
  textDisabled: textColors.disabled,
  textInverse: textColors.inverse,
  
  // Bevels
  bevelLight: bevelColors.light,
  bevelDark: bevelColors.dark,
  bevelDarker: bevelColors.darker,
  
  // Borders
  border: borderColors.default,
  borderLight: borderColors.light,
  borderDark: borderColors.dark,
  
  // Interactive
  highlight: interactiveColors.highlight,
  highlightLight: interactiveColors.highlightLight,
  highlightDark: interactiveColors.highlightDark,
  highlightText: interactiveColors.highlightText,
  focus: interactiveColors.focus,
  focusRing: interactiveColors.focusRing,
  
  // Accents
  accentPurple: accentColors.purple,
  accentGraphite: accentColors.graphite,
  
  // Status
  success: statusColors.success,
  successLight: statusColors.successLight,
  successDark: statusColors.successDark,
  warning: statusColors.warning,
  warningLight: statusColors.warningLight,
  warningDark: statusColors.warningDark,
  error: statusColors.error,
  errorLight: statusColors.errorLight,
  errorDark: statusColors.errorDark,
  info: statusColors.info,
  infoLight: statusColors.infoLight,
  infoDark: statusColors.infoDark,
} as const;

/**
 * Type for individual color token names
 */
export type ColorToken = keyof typeof colors;

/**
 * Type for color token values
 */
export type ColorValue = typeof colors[ColorToken];

/**
 * CSS Variable accessor for colors
 * @param token - The color token name
 * @returns CSS variable reference string
 */
export const colorVar = (token: ColorToken): string => {
  // Convert camelCase to kebab-case for CSS variable name
  const cssName = token.replace(/([A-Z])/g, '-$1').toLowerCase();
  return `var(--color-${cssName})`;
};
