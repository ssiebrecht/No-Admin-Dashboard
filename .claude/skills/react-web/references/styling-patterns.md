# React Styling Patterns

## CSS Modules

Scoped CSS with automatic class name generation.

```tsx
// Button.module.css
.button { padding: 8px 16px; }
.primary { background: var(--color-primary); }

// Button.tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary', children }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

## Tailwind CSS

Utility-first CSS with React.

```tsx
export function Card({ children }) {
  return (
    <div className="rounded-lg shadow-md p-4 bg-white dark:bg-gray-800">
      {children}
    </div>
  );
}
```

### With clsx for conditional classes:
```tsx
import clsx from 'clsx';

function Button({ variant, disabled, children }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded font-medium',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-800',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  );
}
```

## CSS-in-JS with styled-components

```tsx
import styled from 'styled-components';

const Button = styled.button<{ $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  background: ${props => props.$primary ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.$primary ? 'white' : 'var(--color-text)'};
`;
```

## Design Tokens Integration

Use CSS custom properties for theming:

```css
/* tokens.css */
:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --radius-md: 8px;
}

[data-theme="dark"] {
  --color-primary: #3b82f6;
  --color-background: #1e293b;
}
```

```tsx
// Access in React
function ThemedButton() {
  return (
    <button style={{
      background: 'var(--color-primary)',
      padding: 'var(--spacing-md)',
      borderRadius: 'var(--radius-md)'
    }}>
      Themed Button
    </button>
  );
}
```

## CSS Container Queries

Component-responsive styling:

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { display: flex; }
}
```
