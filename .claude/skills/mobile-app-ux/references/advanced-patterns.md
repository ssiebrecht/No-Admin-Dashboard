# Mobile App UX Advanced Patterns

## Table of Contents
1. Gesture Patterns
2. Mobile Navigation Patterns
3. Loading & Empty States
4. Mobile Form Patterns
5. Visual Feedback

## 1. Gesture Patterns

### Supported Gestures

| Gesture | Common Use | Implementation |
|---------|------------|----------------|
| Tap | Primary action | onClick |
| Long press | Context menu, selection | onLongPress (500ms) |
| Swipe horizontal | Delete, archive, navigation | onSwipeLeft/Right |
| Swipe vertical | Refresh, dismiss | onSwipeUp/Down |
| Pinch | Zoom images, maps | onPinch |
| Pull down | Refresh content | Pull-to-refresh |

### Gesture Hook

```tsx
interface GestureHandlers {
  onTap?: () => void;
  onLongPress?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const useGesture = (handlers: GestureHandlers) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  
  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    
    if (handlers.onLongPress) {
      longPressTimer.current = setTimeout(handlers.onLongPress, 500);
    }
  };
  
  const onTouchEnd = (e: TouchEvent) => {
    clearTimeout(longPressTimer.current);
    
    if (!touchStart) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const threshold = 50;
    
    if (isHorizontalSwipe && Math.abs(deltaX) > threshold) {
      if (deltaX > 0) handlers.onSwipeRight?.();
      else handlers.onSwipeLeft?.();
    } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      handlers.onTap?.();
    }
    
    setTouchStart(null);
  };
  
  return { onTouchStart, onTouchEnd };
};
```

### Swipe-to-Delete Pattern

```tsx
export const SwipeableListItem: FC<Props> = ({ item, onDelete }) => {
  const [offset, setOffset] = useState(0);
  const deleteThreshold = -80;
  
  return (
    <div className="swipeable-container">
      <div className="swipeable-background swipeable-background--delete">
        <TrashIcon />
      </div>
      <div 
        className="swipeable-content"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {/* List item content */}
      </div>
    </div>
  );
};
```

## 2. Mobile Navigation Patterns

### Bottom Tab Navigation

```tsx
interface Tab {
  id: string;
  icon: ReactNode;
  label: string;
  badge?: number;
}

export const BottomTabs: FC<{ tabs: Tab[]; activeTab: string; onChange: (id: string) => void }> = ({
  tabs,
  activeTab,
  onChange,
}) => (
  <nav className="bottom-tabs" role="tablist">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        className={cn('bottom-tab', activeTab === tab.id && 'bottom-tab--active')}
        onClick={() => onChange(tab.id)}
      >
        <span className="bottom-tab__icon">
          {tab.icon}
          {tab.badge && <span className="badge">{tab.badge}</span>}
        </span>
        <span className="bottom-tab__label">{tab.label}</span>
      </button>
    ))}
  </nav>
);
```

```css
.bottom-tabs {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding-bottom: env(safe-area-inset-bottom);
}

.bottom-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  min-width: 64px;
  color: var(--color-text-muted);
  transition: color var(--duration-fast);
}

.bottom-tab--active {
  color: var(--color-primary);
}
```

### Floating Action Button (FAB)

```tsx
export const FAB: FC<{ onClick: () => void; icon: ReactNode }> = ({ onClick, icon }) => (
  <button
    className="fab"
    onClick={onClick}
    aria-label="Primary action"
  >
    {icon}
  </button>
);
```

```css
.fab {
  position: fixed;
  bottom: calc(var(--space-4) + 56px + env(safe-area-inset-bottom)); /* Above bottom nav */
  right: var(--space-4);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-fixed);
}
```

## 3. Loading & Empty States

### Skeleton Screen

```tsx
export const CardSkeleton: FC = () => (
  <div className="card-skeleton">
    <div className="skeleton skeleton--image" />
    <div className="skeleton skeleton--title" />
    <div className="skeleton skeleton--text" />
    <div className="skeleton skeleton--text skeleton--text-short" />
  </div>
);

export const ListSkeleton: FC<{ count?: number }> = ({ count = 5 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="list-item-skeleton">
        <div className="skeleton skeleton--avatar" />
        <div className="skeleton-text-group">
          <div className="skeleton skeleton--title" />
          <div className="skeleton skeleton--text" />
        </div>
      </div>
    ))}
  </>
);
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-border) 25%,
    var(--color-surface) 50%,
    var(--color-border) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton--avatar { width: 48px; height: 48px; border-radius: var(--radius-full); }
.skeleton--image { width: 100%; aspect-ratio: 16/9; }
.skeleton--title { height: 20px; width: 60%; }
.skeleton--text { height: 16px; width: 100%; }
.skeleton--text-short { width: 40%; }
```

### Empty State

```tsx
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState: FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="empty-state">
    <div className="empty-state__icon">{icon}</div>
    <h3 className="empty-state__title">{title}</h3>
    <p className="empty-state__description">{description}</p>
    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);
```

## 4. Mobile Form Patterns

### Input with Keyboard Type

```tsx
<input
  type="email"
  inputMode="email"
  autoComplete="email"
  autoCapitalize="none"
/>

<input
  type="tel"
  inputMode="tel"
  autoComplete="tel"
/>

<input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  autoComplete="one-time-code"
/>
```

### Sticky Submit Button

```tsx
export const MobileForm: FC = () => (
  <form className="mobile-form">
    <div className="mobile-form__fields">
      {/* Form fields */}
    </div>
    <div className="mobile-form__submit">
      <Button type="submit" fullWidth>
        Submit
      </Button>
    </div>
  </form>
);
```

```css
.mobile-form__submit {
  position: sticky;
  bottom: 0;
  padding: var(--space-4);
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
  background: var(--color-background);
  border-top: 1px solid var(--color-border);
}
```

## 5. Visual Feedback

### Ripple Effect

```css
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
}

.ripple:active::after {
  opacity: 0.1;
  transform: scale(2);
  transition: transform 0.3s, opacity 0.3s;
}
```

### Press State

```css
.pressable {
  transition: transform var(--duration-fast), opacity var(--duration-fast);
}

.pressable:active {
  transform: scale(0.97);
  opacity: 0.8;
}

@media (prefers-reduced-motion: reduce) {
  .pressable:active {
    transform: none;
  }
}
```

### Toast Notification

```tsx
export const Toast: FC<{ message: string; type: 'success' | 'error' }> = ({ message, type }) => (
  <div className={cn('toast', `toast--${type}`)} role="alert">
    {type === 'success' ? <CheckIcon /> : <XIcon />}
    <span>{message}</span>
  </div>
);
```

```css
.toast {
  position: fixed;
  bottom: calc(72px + env(safe-area-inset-bottom));
  left: var(--space-4);
  right: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  animation: toast-slide-up var(--duration-normal) var(--ease-out);
}

@keyframes toast-slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```
