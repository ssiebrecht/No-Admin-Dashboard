# CSS Tokens Advanced Patterns

## Table of Contents
1. Complete Token System
2. Component-Specific Tokens
3. Responsive Tokens
4. Animation Tokens

## 1. Complete Token System

```css
:root {
  /* === PRIMITIVE TOKENS === */
  
  /* Color Palette */
  --blue-50: #eff6ff;
  --blue-100: #dbeafe;
  --blue-200: #bfdbfe;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-500: #6b7280;
  --gray-700: #374151;
  --gray-900: #111827;
  
  --green-500: #22c55e;
  --red-500: #ef4444;
  --amber-500: #f59e0b;
  
  /* === SEMANTIC TOKENS === */
  
  /* Interactive */
  --color-interactive: var(--blue-600);
  --color-interactive-hover: var(--blue-700);
  --color-interactive-active: var(--blue-800);
  --color-interactive-disabled: var(--gray-300);
  
  /* Feedback */
  --color-success: var(--green-500);
  --color-error: var(--red-500);
  --color-warning: var(--amber-500);
  --color-info: var(--blue-500);
  
  /* Focus Ring */
  --focus-ring-color: var(--blue-500);
  --focus-ring-offset: 2px;
  --focus-ring-width: 2px;
  --focus-ring: var(--focus-ring-width) solid var(--focus-ring-color);
}
```

## 2. Component-Specific Tokens

```css
:root {
  /* Button Tokens */
  --btn-padding-x: var(--space-4);
  --btn-padding-y: var(--space-2);
  --btn-font-size: var(--text-sm);
  --btn-font-weight: var(--font-medium);
  --btn-radius: var(--radius-md);
  
  --btn-primary-bg: var(--color-primary);
  --btn-primary-bg-hover: var(--color-primary-hover);
  --btn-primary-text: white;
  
  --btn-secondary-bg: var(--color-surface);
  --btn-secondary-bg-hover: var(--color-border);
  --btn-secondary-text: var(--color-text);
  --btn-secondary-border: var(--color-border);
  
  /* Input Tokens */
  --input-padding-x: var(--space-3);
  --input-padding-y: var(--space-2);
  --input-font-size: var(--text-base);
  --input-radius: var(--radius-md);
  --input-border: 1px solid var(--color-border);
  --input-border-focus: 1px solid var(--color-primary);
  --input-bg: var(--color-background);
  
  /* Card Tokens */
  --card-padding: var(--space-6);
  --card-radius: var(--radius-lg);
  --card-shadow: var(--shadow-md);
  --card-bg: var(--color-surface);
  --card-border: 1px solid var(--color-border);
}
```

## 3. Responsive Tokens

```css
:root {
  /* Fluid Typography */
  --text-fluid-base: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
  --text-fluid-lg: clamp(1.125rem, 1vw + 1rem, 1.5rem);
  --text-fluid-xl: clamp(1.5rem, 2vw + 1rem, 2.5rem);
  --text-fluid-2xl: clamp(2rem, 3vw + 1rem, 4rem);
  
  /* Fluid Spacing */
  --space-fluid-sm: clamp(0.5rem, 1vw, 1rem);
  --space-fluid-md: clamp(1rem, 2vw, 2rem);
  --space-fluid-lg: clamp(2rem, 4vw, 4rem);
  
  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
}

/* Breakpoint-specific tokens */
@media (min-width: 768px) {
  :root {
    --header-height: 80px;
    --sidebar-width: 280px;
  }
}

@media (max-width: 767px) {
  :root {
    --header-height: 60px;
    --sidebar-width: 100%;
  }
}
```

## 4. Animation Tokens

```css
:root {
  /* Duration */
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  /* Easing */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* Common Transitions */
  --transition-colors: color var(--duration-fast) var(--ease-out),
                       background-color var(--duration-fast) var(--ease-out),
                       border-color var(--duration-fast) var(--ease-out);
  --transition-transform: transform var(--duration-normal) var(--ease-out);
  --transition-opacity: opacity var(--duration-normal) var(--ease-out);
  --transition-all: all var(--duration-normal) var(--ease-out);
}
```

## 5. Z-Index Scale

```css
:root {
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-tooltip: 1600;
  --z-toast: 1700;
}
```

## 6. TypeScript Integration

```typescript
// tokens.ts - Type-safe token access
export const tokens = {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    background: 'var(--color-background)',
    text: 'var(--color-text)',
  },
  spacing: {
    1: 'var(--space-1)',
    2: 'var(--space-2)',
    4: 'var(--space-4)',
    8: 'var(--space-8)',
  },
  radii: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
  },
} as const;

// Usage
const style = { padding: tokens.spacing[4] };
```
