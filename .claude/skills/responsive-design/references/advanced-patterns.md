# Responsive Design Advanced Patterns

## Table of Contents
1. Responsive Images
2. Navigation Patterns
3. Layout Recipes
4. Performance Optimization

## 1. Responsive Images

### Picture Element

```tsx
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcSet="/hero-desktop.webp"
    type="image/webp"
  />
  <source 
    media="(min-width: 640px)" 
    srcSet="/hero-tablet.webp"
    type="image/webp"
  />
  <img 
    src="/hero-mobile.jpg" 
    alt="Hero image"
    loading="lazy"
  />
</picture>
```

### Responsive Image Component

```tsx
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  className,
}) => {
  const basePath = src.replace(/\.[^.]+$/, '');
  const ext = src.split('.').pop();
  
  return (
    <img
      src={src}
      srcSet={`
        ${basePath}-400.${ext} 400w,
        ${basePath}-800.${ext} 800w,
        ${basePath}-1200.${ext} 1200w
      `}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
};
```

### Aspect Ratio Container

```css
.aspect-video { aspect-ratio: 16 / 9; }
.aspect-square { aspect-ratio: 1; }
.aspect-portrait { aspect-ratio: 3 / 4; }

.responsive-media {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

## 2. Navigation Patterns

### Mobile Menu Pattern

```tsx
export const MobileNav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useBreakpoint();
  
  if (!isMobile) return <DesktopNav />;
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <MenuIcon />
      </button>
      
      {isOpen && (
        <div className="mobile-nav-overlay">
          <nav className="mobile-nav">
            <button onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
            <NavLinks onClick={() => setIsOpen(false)} />
          </nav>
        </div>
      )}
    </>
  );
};
```

### Bottom Navigation (Mobile)

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: var(--space-2) var(--space-4);
  padding-bottom: env(safe-area-inset-bottom, var(--space-2));
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  z-index: var(--z-fixed);
}

@media (min-width: 768px) {
  .bottom-nav { display: none; }
}
```

## 3. Layout Recipes

### Holy Grail Layout

```css
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
}

.layout__main {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .layout__main {
    grid-template-columns: 250px 1fr 200px;
  }
}
```

### Card Grid Auto-Fill

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: var(--space-6);
}
```

### Sidebar Layout

```css
.sidebar-layout {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .sidebar-layout {
    grid-template-columns: 280px 1fr;
  }
  
  .sidebar-layout__sidebar {
    position: sticky;
    top: var(--header-height);
    height: calc(100dvh - var(--header-height));
    overflow-y: auto;
  }
}
```

### Safe Area Handling (Notch/Island)

```css
.safe-container {
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.fixed-bottom {
  bottom: 0;
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0));
}
```

## 4. Performance Optimization

### Critical CSS Pattern

```tsx
// Load critical CSS inline, defer non-critical
<head>
  <style>{criticalCSS}</style>
  <link 
    rel="preload" 
    href="/styles/main.css" 
    as="style" 
    onLoad="this.rel='stylesheet'"
  />
</head>
```

### Responsive Loading

```tsx
// Only load heavy components on desktop
const HeavyChart = lazy(() => import('./HeavyChart'));

export const Dashboard: FC = () => {
  const { isDesktop } = useBreakpoint();
  
  return (
    <div>
      <MobileStats />
      {isDesktop && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
};
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
export const useReducedMotion = (): boolean => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};
```
