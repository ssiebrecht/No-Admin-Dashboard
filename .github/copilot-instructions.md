# Mac OS 8/9 Admin Dashboard - AI Coding Instructions

## Project Overview

A React + TypeScript admin dashboard emulating **Mac OS 8/9 "Platinum" UI** (1997-2001 era). This is a nostalgic recreation with authentic retro styling, not a modern UI system.

**Tech Stack:** React 19, TypeScript, Zustand (state), Vite, CSS Modules

## Architecture

### Atomic Design Component Hierarchy

```
atoms → molecules → organisms → templates → pages
```

- **Atoms** (`src/components/atoms/`): Base elements with Mac OS styling (Button, Input, Checkbox, Icon)
- **Molecules** (`src/components/molecules/`): Composites like WindowTitleBar, FileItem, FormField
- **Organisms** (`src/components/organisms/`): Full features like Window, FileBrowser, UserManagement
- **Templates/Pages**: Layout structures and route-level components

### Window System (Core Pattern)

The windowing system is central to the architecture:

```typescript
// Opening windows via store - see src/store/windowStore.ts
const { openWindow } = useWindowStore();
openWindow({
  id: 'unique-id',        // Reused = focuses existing window
  title: 'Window Title',
  icon: '📁',             // Emoji icons are standard here
  initialPosition: { x: 100, y: 60 },
  initialSize: { width: 500, height: 400 },
});
```

Windows auto-register in `windowStore`, manage z-index stacking, and support drag/resize via `useDraggable`/`useResizable` hooks.

### State Management Pattern

All Zustand stores follow the same structure in `src/store/`:

```typescript
// Pattern: create store with persist middleware
export const useXxxStore = create<XxxStore>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      // Actions
      addItem: (item) => set(state => ({ items: [...state.items, item] })),
    }),
    { name: 'storage-key' }
  )
);
```

Key stores: `windowStore`, `desktopStore`, `fileStore`, `userStore`, `settingsStore`

## Component Conventions

### File Structure Per Component

```
ComponentName/
├── ComponentName.tsx       # Component logic
├── ComponentName.module.css # Scoped styles
├── index.ts                # Re-export
└── ComponentName.types.ts  # Types (if complex)
```

### Component Pattern

```tsx
// JSDoc description is required
/**
 * ComponentName - Brief description
 * Features: list key behaviors
 */
export const ComponentName: FC<ComponentNameProps> = ({
  variant = 'default',  // Props with defaults inline
  size = 'md',
  children,
}) => {
  // Class composition pattern
  const classNames = [
    styles.base,
    styles[variant],
    styles[size],
  ].filter(Boolean).join(' ');

  return <div className={classNames}>{children}</div>;
};
```

### Barrel Exports

Every folder has `index.ts` re-exporting its contents. Import from folder, not file:

```typescript
// ✅ Correct
import { Button, Input } from '@/components/atoms';
// ❌ Avoid
import { Button } from '@/components/atoms/Button/Button';
```

## Styling System

### Design Tokens (`src/tokens/`)

All styling uses CSS custom properties from the token system:

```css
/* Use token variables, never hardcode values */
background: var(--color-surface);
padding: var(--space-2);
box-shadow: var(--bevel-raised);  /* 3D effect */
font-family: var(--font-system);   /* Chicago/Charcoal style */
```

Key token files: `colors.ts`, `spacing.ts`, `shadows.ts`, `typography.ts`

### Platinum 3D Bevel Effect (Critical Pattern)

Mac OS 8/9's signature look uses inset box-shadows:

```css
/* Raised appearance */
box-shadow: var(--bevel-raised);
/* Pressed/inset appearance */
box-shadow: var(--bevel-inset);
```

No CSS transitions for authentic retro feel.

### Color Semantics

```typescript
// src/tokens/colors.ts
platinumGrays    // #CCCCCC base gray palette
backgrounds      // desktop: #5C7A99, windowBg: #DDDDDD
interactiveColors // highlight: #3366CC
statusColors     // success/warning/error variants
```

## Dialog System

Use the imperative dialog API via `useDialog` hook:

```tsx
const dialog = useDialog();

// Alert - await completion
await dialog.alert({ title: 'Info', message: 'Done!', icon: 'success' });

// Confirm - returns boolean
const confirmed = await dialog.confirm({ title: 'Delete?', danger: true });

// Prompt - returns string | null
const name = await dialog.prompt({ title: 'Rename', defaultValue: 'file.txt' });
```

Dialogs are rendered by `DialogProvider` in `src/context/DialogContext.tsx`.

## Types

All types live in `src/types/` with barrel export from `index.ts`:

- `window.ts` - WindowState, WindowConfig, Position, Size
- `file.ts` - FileItem, FileType
- `user.ts` - User, UserRole
- `menu.ts` - MenuItem, MenuSection

## Commands

```bash
npm run dev      # Start dev server
npm run build    # TypeScript + Vite production build
npm run lint     # ESLint check
npm run deploy   # Build + deploy to gh-pages
```

## Key Integration Points

1. **Adding a Window**: Define in `App.tsx` with `<Window id="x">` component, add menu trigger in `handleMenuItemClick`
2. **New Organism**: Create in `organisms/`, add window wrapper in `App.tsx`, register menu item in `src/data/menuConfig.ts`
3. **Control Panel**: Add panel component to `organisms/panels/`, register in `src/data/controlPanels.ts`
4. **Toast Notifications**: Use `useToast()` hook with `.success()`, `.error()`, `.warning()`, `.info()` methods

## Don't Forget

- Emoji icons (🗑️📁👥) are intentional and part of the retro aesthetic
- The 3D bevel effect is achieved with `box-shadow`, not `border`
- Windows use string IDs - opening same ID focuses existing window
- All stores persist to localStorage via Zustand's `persist` middleware
