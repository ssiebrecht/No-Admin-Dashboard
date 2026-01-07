/**
 * Mac OS 8/9 Design Tokens
 * Barrel export for all token modules
 */

// Colors
export {
  colors,
  platinumGrays,
  backgrounds,
  textColors,
  bevelColors,
  borderColors,
  interactiveColors,
  accentColors,
  statusColors,
  colorVar,
  type ColorToken,
  type ColorValue,
} from './colors';

// Typography
export {
  typography,
  fontFamilies,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacing,
  fontFamilyVar,
  fontSizeVar,
  lineHeightVar,
  fontWeightVar,
  type FontFamily,
  type FontSize,
  type LineHeight,
  type FontWeight,
  type LetterSpacing,
} from './typography';

// Spacing
export {
  spacing,
  spacingAliases,
  componentSpacing,
  spacingVar,
  getSpacingByAlias,
  type SpacingToken,
  type SpacingAlias,
} from './spacing';

// Shadows
export {
  shadows,
  dropShadows,
  insetShadows,
  bevelShadows,
  componentShadows,
  shadowVar,
  bevelVar,
  type DropShadow,
  type InsetShadow,
  type BevelShadow,
} from './shadows';

// Borders
export {
  borders,
  borderRadius,
  borderWidth,
  borderStyles,
  borderPresets,
  radiusVar,
  borderWidthVar,
  composeBorder,
  type BorderRadius,
  type BorderWidth,
  type BorderStyle,
  type BorderPreset,
} from './borders';

// Z-Index
export {
  zIndex,
  zIndexAliases,
  zIndexVar,
  getZIndex,
  relativeZIndex,
  type ZIndexToken,
  type ZIndexAlias,
} from './zIndex';

// Transitions
export {
  transitions,
  durations,
  easings,
  transitionPresets,
  durationVar,
  easingVar,
  composeTransition,
  composeTransitions,
  type Duration,
  type Easing,
  type TransitionPreset,
} from './transitions';

// Breakpoints
export {
  breakpoints,
  breakpointsPx,
  mediaQueries,
  mediaQueriesMax,
  containerWidths,
  matchesBreakpoint,
  getCurrentBreakpoint,
  breakpointVar,
  type BreakpointToken,
} from './breakpoints';

// Sizing
export {
  sizing,
  heights,
  iconSizes,
  scrollbar,
  windowSizing,
  heightVar,
  iconSizeVar,
  type HeightToken,
  type IconSize,
} from './sizing';

/**
 * All tokens combined (for reference/debugging)
 */
export const allTokens = {
  colors: () => import('./colors').then((m) => m.colors),
  typography: () => import('./typography').then((m) => m.typography),
  spacing: () => import('./spacing').then((m) => m.spacing),
  shadows: () => import('./shadows').then((m) => m.shadows),
  borders: () => import('./borders').then((m) => m.borders),
  zIndex: () => import('./zIndex').then((m) => m.zIndex),
  transitions: () => import('./transitions').then((m) => m.transitions),
  breakpoints: () => import('./breakpoints').then((m) => m.breakpoints),
  sizing: () => import('./sizing').then((m) => m.sizing),
} as const;
