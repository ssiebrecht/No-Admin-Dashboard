/**
 * Mac OS 8/9 Transition & Animation Tokens
 * Quick, snappy transitions matching classic Mac feel
 */

/**
 * Duration Scale
 * Classic Mac was responsive and snappy
 */
export const durations = {
  /** Instant - no animation */
  instant: '0ms',
  /** Fast - quick feedback */
  fast: '100ms',
  /** Normal - standard transitions */
  normal: '150ms',
  /** Slow - deliberate animations */
  slow: '250ms',
  /** Slower - complex animations */
  slower: '400ms',
} as const;

/**
 * Easing Functions
 */
export const easings = {
  /** Default easing - ease-out */
  default: 'ease-out',
  /** Ease in - slow start */
  in: 'ease-in',
  /** Ease in-out - smooth both ends */
  inOut: 'ease-in-out',
  /** Linear - constant speed */
  linear: 'linear',
  /** Bounce - overshoot effect */
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Snap - quick start, slow end */
  snap: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * Pre-composed Transition Definitions
 */
export const transitionPresets = {
  /** No transition */
  none: 'none',
  
  /** Default all-property transition */
  all: `all ${durations.normal} ${easings.default}`,
  
  /** Fast all-property transition */
  allFast: `all ${durations.fast} ${easings.default}`,
  
  /** Color transitions (background, border, text) */
  colors: `background-color ${durations.fast} ${easings.default}, border-color ${durations.fast} ${easings.default}, color ${durations.fast} ${easings.default}`,
  
  /** Opacity transition */
  opacity: `opacity ${durations.normal} ${easings.default}`,
  
  /** Transform transition */
  transform: `transform ${durations.normal} ${easings.default}`,
  
  /** Shadow transition */
  shadow: `box-shadow ${durations.fast} ${easings.default}`,
  
  /** Width/Height transitions */
  dimensions: `width ${durations.normal} ${easings.inOut}, height ${durations.normal} ${easings.inOut}`,
  
  /** Button hover effect */
  button: `background-color ${durations.fast} ${easings.default}, box-shadow ${durations.fast} ${easings.default}`,
  
  /** Input focus effect */
  input: `border-color ${durations.fast} ${easings.default}, box-shadow ${durations.fast} ${easings.default}`,
} as const;

/**
 * Complete Transitions Object
 */
export const transitions = {
  // Durations
  durationInstant: durations.instant,
  durationFast: durations.fast,
  durationNormal: durations.normal,
  durationSlow: durations.slow,
  durationSlower: durations.slower,
  
  // Easings
  easeDefault: easings.default,
  easeIn: easings.in,
  easeInOut: easings.inOut,
  easeLinear: easings.linear,
  easeBounce: easings.bounce,
  easeSnap: easings.snap,
  
  // Presets
  transitionNone: transitionPresets.none,
  transitionAll: transitionPresets.all,
  transitionAllFast: transitionPresets.allFast,
  transitionColors: transitionPresets.colors,
  transitionOpacity: transitionPresets.opacity,
  transitionTransform: transitionPresets.transform,
  transitionShadow: transitionPresets.shadow,
  transitionDimensions: transitionPresets.dimensions,
  transitionButton: transitionPresets.button,
  transitionInput: transitionPresets.input,
} as const;

/**
 * Type for duration tokens
 */
export type Duration = keyof typeof durations;

/**
 * Type for easing tokens
 */
export type Easing = keyof typeof easings;

/**
 * Type for transition preset tokens
 */
export type TransitionPreset = keyof typeof transitionPresets;

/**
 * CSS Variable accessor for durations
 */
export const durationVar = (duration: Duration): string => {
  const varMap: Record<Duration, string> = {
    instant: 'var(--duration-instant)',
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
    slower: 'var(--duration-slower)',
  };
  return varMap[duration];
};

/**
 * CSS Variable accessor for easings
 */
export const easingVar = (easing: Easing): string => {
  const varMap: Record<Easing, string> = {
    default: 'var(--ease-default)',
    in: 'var(--ease-in)',
    inOut: 'var(--ease-in-out)',
    linear: 'var(--ease-linear)',
    bounce: 'var(--ease-bounce)',
    snap: 'var(--ease-snap, cubic-bezier(0.4, 0, 0.2, 1))',
  };
  return varMap[easing];
};

/**
 * Helper to compose a transition value
 */
export const composeTransition = (
  property: string,
  duration: Duration,
  easing: Easing = 'default'
): string => {
  return `${property} ${durations[duration]} ${easings[easing]}`;
};

/**
 * Helper to compose multiple transitions
 */
export const composeTransitions = (
  items: Array<{ property: string; duration: Duration; easing?: Easing }>
): string => {
  return items
    .map(({ property, duration, easing = 'default' }) =>
      composeTransition(property, duration, easing)
    )
    .join(', ');
};
