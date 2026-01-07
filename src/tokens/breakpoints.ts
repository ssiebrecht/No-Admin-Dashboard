/**
 * Mac OS 8/9 Breakpoint Tokens
 * Responsive design breakpoints
 */

/**
 * Breakpoint Scale (pixels)
 */
export const breakpoints = {
  /** Extra small - 320px (legacy phones) */
  xs: 320,
  /** Small - 640px (large phones, small tablets) */
  sm: 640,
  /** Medium - 768px (tablets) */
  md: 768,
  /** Large - 1024px (small desktops, landscape tablets) */
  lg: 1024,
  /** Extra large - 1280px (desktops) */
  xl: 1280,
  /** 2X large - 1536px (large desktops) */
  '2xl': 1536,
} as const;

/**
 * Breakpoint values as pixel strings
 */
export const breakpointsPx = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Media query strings for each breakpoint (min-width)
 */
export const mediaQueries = {
  xs: `(min-width: ${breakpointsPx.xs})`,
  sm: `(min-width: ${breakpointsPx.sm})`,
  md: `(min-width: ${breakpointsPx.md})`,
  lg: `(min-width: ${breakpointsPx.lg})`,
  xl: `(min-width: ${breakpointsPx.xl})`,
  '2xl': `(min-width: ${breakpointsPx['2xl']})`,
} as const;

/**
 * Media query strings for max-width (mobile-first inverse)
 */
export const mediaQueriesMax = {
  xs: `(max-width: ${breakpoints.xs - 1}px)`,
  sm: `(max-width: ${breakpoints.sm - 1}px)`,
  md: `(max-width: ${breakpoints.md - 1}px)`,
  lg: `(max-width: ${breakpoints.lg - 1}px)`,
  xl: `(max-width: ${breakpoints.xl - 1}px)`,
  '2xl': `(max-width: ${breakpoints['2xl'] - 1}px)`,
} as const;

/**
 * Container max-widths for each breakpoint
 */
export const containerWidths = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Type for breakpoint token names
 */
export type BreakpointToken = keyof typeof breakpoints;

/**
 * Check if current viewport matches a breakpoint
 * @param breakpoint - The breakpoint to check
 * @param direction - 'up' for min-width, 'down' for max-width
 */
export const matchesBreakpoint = (
  breakpoint: BreakpointToken,
  direction: 'up' | 'down' = 'up'
): boolean => {
  if (typeof window === 'undefined') return false;
  
  const query = direction === 'up' 
    ? mediaQueries[breakpoint] 
    : mediaQueriesMax[breakpoint];
    
  return window.matchMedia(query).matches;
};

/**
 * Get current breakpoint based on window width
 */
export const getCurrentBreakpoint = (): BreakpointToken => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

/**
 * CSS Variable accessor for breakpoints
 */
export const breakpointVar = (bp: BreakpointToken): string => {
  const varMap: Record<BreakpointToken, string> = {
    xs: 'var(--breakpoint-xs)',
    sm: 'var(--breakpoint-sm)',
    md: 'var(--breakpoint-md)',
    lg: 'var(--breakpoint-lg)',
    xl: 'var(--breakpoint-xl)',
    '2xl': 'var(--breakpoint-2xl)',
  };
  return varMap[bp];
};
