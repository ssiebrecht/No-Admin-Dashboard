/**
 * Mac OS 8/9 Spacing Tokens
 * 4px base grid system
 */

/**
 * Spacing Scale - 4px Base Grid
 * Each step is carefully calculated for consistent layouts
 */
export const spacing = {
  /** 0 - No spacing */
  '0': '0',
  /** 1px - Single pixel */
  px: '1px',
  /** 2px - Minimal spacing */
  '0.5': '2px',
  /** 4px - Tight spacing */
  '1': '4px',
  /** 6px - Compact spacing */
  '1.5': '6px',
  /** 8px - Default spacing */
  '2': '8px',
  /** 10px */
  '2.5': '10px',
  /** 12px - Comfortable spacing */
  '3': '12px',
  /** 16px - Spacious */
  '4': '16px',
  /** 20px */
  '5': '20px',
  /** 24px - Large spacing */
  '6': '24px',
  /** 32px - Extra large */
  '8': '32px',
  /** 40px */
  '10': '40px',
  /** 48px - Huge spacing */
  '12': '48px',
  /** 64px */
  '16': '64px',
  /** 80px */
  '20': '80px',
  /** 96px */
  '24': '96px',
} as const;

/**
 * Named spacing aliases for semantic usage
 */
export const spacingAliases = {
  /** No spacing */
  none: spacing['0'],
  /** Minimal - 2px */
  minimal: spacing['0.5'],
  /** Extra small - 4px */
  xs: spacing['1'],
  /** Small - 6px */
  sm: spacing['1.5'],
  /** Medium/Default - 8px */
  md: spacing['2'],
  /** Large - 12px */
  lg: spacing['3'],
  /** Extra large - 16px */
  xl: spacing['4'],
  /** 2X large - 24px */
  '2xl': spacing['6'],
  /** 3X large - 32px */
  '3xl': spacing['8'],
  /** 4X large - 48px */
  '4xl': spacing['12'],
} as const;

/**
 * Common spacing presets for components
 */
export const componentSpacing = {
  /** Button padding - horizontal */
  buttonPaddingX: spacing['3'],
  /** Button padding - vertical */
  buttonPaddingY: spacing['1'],
  /** Input padding - horizontal */
  inputPaddingX: spacing['2'],
  /** Input padding - vertical */
  inputPaddingY: spacing['1'],
  /** Card/Container padding */
  cardPadding: spacing['4'],
  /** Window content padding */
  windowPadding: spacing['3'],
  /** List item padding */
  listItemPadding: spacing['2'],
  /** Icon gap (space between icon and text) */
  iconGap: spacing['1.5'],
  /** Section gap */
  sectionGap: spacing['6'],
} as const;

/**
 * Type for spacing scale tokens
 */
export type SpacingToken = keyof typeof spacing;

/**
 * Type for spacing alias names
 */
export type SpacingAlias = keyof typeof spacingAliases;

/**
 * CSS Variable accessor for spacing
 * @param token - The spacing token name (e.g., '2', '4', '0.5')
 * @returns CSS variable reference string
 */
export const spacingVar = (token: SpacingToken): string => {
  // Map token names to CSS variable names
  const varMap: Record<SpacingToken, string> = {
    '0': 'var(--space-0)',
    'px': 'var(--space-px)',
    '0.5': 'var(--space-0-5)',
    '1': 'var(--space-1)',
    '1.5': 'var(--space-1-5)',
    '2': 'var(--space-2)',
    '2.5': 'var(--space-2-5)',
    '3': 'var(--space-3)',
    '4': 'var(--space-4)',
    '5': 'var(--space-5)',
    '6': 'var(--space-6)',
    '8': 'var(--space-8)',
    '10': 'var(--space-10)',
    '12': 'var(--space-12)',
    '16': 'var(--space-16)',
    '20': 'var(--space-20)',
    '24': 'var(--space-24)',
  };
  return varMap[token];
};

/**
 * Get spacing value by alias
 * @param alias - Semantic spacing alias
 * @returns The spacing value
 */
export const getSpacingByAlias = (alias: SpacingAlias): string => {
  return spacingAliases[alias];
};
