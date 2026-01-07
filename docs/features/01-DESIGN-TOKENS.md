# 🎨 Feature 01: Design Token System

## Übersicht

Das Design Token System bildet die Grundlage für den authentischen Mac OS 8/9 "Platinum" Look. Alle visuellen Eigenschaften werden als CSS Custom Properties definiert.

## Abhängigkeiten

- **Benötigt**: Projekt-Setup
- **Blockiert**: Alle UI-Komponenten

## Farbpalette

### Platinum Grautöne (Hauptfarben)
```
┌────────────────────────────────────────────┐
│  PLATINUM PALETTE                          │
├────────────────────────────────────────────┤
│  ░░░░░░ #FFFFFF  → Window Background       │
│  ▒▒▒▒▒▒ #EEEEEE  → Surface Light           │
│  ▓▓▓▓▓▓ #DDDDDD  → Platinum Base           │
│  ████▓▓ #CCCCCC  → Platinum Dark           │
│  ██████ #BBBBBB  → Border Light            │
│  ██████ #999999  → Border Medium           │
│  ██████ #666666  → Border Dark             │
│  ██████ #333333  → Text Primary            │
│  ██████ #000000  → Text Black              │
└────────────────────────────────────────────┘
```

### Akzentfarben (Classic Mac OS)
| Name | Hex | Verwendung |
|------|-----|------------|
| Highlight Blue | `#3366CC` | Selection, Focus |
| Classic Purple | `#663399` | Accent Alternative |
| Alert Yellow | `#FFCC00` | Warnings |
| Success Green | `#00AA00` | Success States |
| Error Red | `#CC0000` | Error States |
| Graphite | `#808080` | Alternative Theme |

### Semantic Colors
```css
:root {
  /* Backgrounds */
  --color-desktop: #5C7A99;         /* Classic Desktop Blue-Gray */
  --color-window-bg: #DDDDDD;       /* Platinum Window */
  --color-content-bg: #FFFFFF;      /* Content Area */
  --color-surface: #EEEEEE;         /* Raised Surfaces */
  
  /* Text */
  --color-text: #000000;
  --color-text-secondary: #666666;
  --color-text-disabled: #999999;
  
  /* Borders & Bevels */
  --color-bevel-light: #FFFFFF;     /* 3D Light Edge */
  --color-bevel-dark: #666666;      /* 3D Dark Edge */
  --color-border: #999999;
  
  /* Interactive */
  --color-highlight: #3366CC;
  --color-highlight-text: #FFFFFF;
  
  /* Status */
  --color-success: #00AA00;
  --color-warning: #FFCC00;
  --color-error: #CC0000;
}
```

## Typography

### Schriftarten
Der klassische Mac verwendete **Chicago** (9pt) und **Charcoal** (12pt). Wir verwenden moderne Alternativen:

```css
:root {
  /* System Font Stack (Chicago/Charcoal feel) */
  --font-system: -apple-system, 'Segoe UI', 'SF Pro Text', sans-serif;
  
  /* Monospace für technische Infos */
  --font-mono: 'Monaco', 'SF Mono', 'Consolas', monospace;
  
  /* Optional: Pixel Font für extra Authentizität */
  --font-chicago: 'ChicagoFLF', 'Chicago', var(--font-system);
}
```

### Größen (Classic Mac Sizes)
```css
:root {
  --text-xs: 9px;    /* Fine Print */
  --text-sm: 10px;   /* Labels */
  --text-base: 12px; /* Body Text (Standard) */
  --text-lg: 14px;   /* Headings */
  --text-xl: 18px;   /* Titles */
  --text-2xl: 24px;  /* Large Titles */
  
  --leading-tight: 1.1;
  --leading-normal: 1.3;
  --leading-relaxed: 1.5;
  
  --font-normal: 400;
  --font-bold: 700;
}
```

## Spacing

### 4px Base Grid
```css
:root {
  --space-0: 0;
  --space-1: 2px;    /* Minimal */
  --space-2: 4px;    /* Tight */
  --space-3: 6px;    /* Compact */
  --space-4: 8px;    /* Default */
  --space-5: 12px;   /* Comfortable */
  --space-6: 16px;   /* Spacious */
  --space-8: 24px;   /* Large */
  --space-10: 32px;  /* Extra Large */
  --space-12: 48px;  /* Huge */
}
```

## Borders & Bevels

### 3D Effekte (Kern des Platinum Looks)
```css
:root {
  /* Classic Bevel (Raised) */
  --bevel-raised: 
    inset 1px 1px 0 var(--color-bevel-light),
    inset -1px -1px 0 var(--color-bevel-dark);
    
  /* Classic Bevel (Pressed/Inset) */
  --bevel-inset:
    inset 1px 1px 0 var(--color-bevel-dark),
    inset -1px -1px 0 var(--color-bevel-light);
    
  /* Window Title Bar Bevel */
  --bevel-title:
    inset 0 1px 0 var(--color-bevel-light),
    inset 0 -1px 0 var(--color-bevel-dark);
    
  /* Outset Border (for buttons) */
  --border-outset:
    1px solid var(--color-bevel-dark);
    
  --border-radius-none: 0;
  --border-radius-sm: 2px;
  --border-radius-md: 4px;
  --border-radius-lg: 8px;
}
```

## Shadows

### Klassische Schatten
```css
:root {
  /* Window Drop Shadow */
  --shadow-window: 
    2px 2px 0 rgba(0, 0, 0, 0.3),
    4px 4px 0 rgba(0, 0, 0, 0.15);
    
  /* Menu Drop Shadow */
  --shadow-menu:
    2px 2px 0 rgba(0, 0, 0, 0.25);
    
  /* Dialog Shadow */
  --shadow-dialog:
    3px 3px 0 rgba(0, 0, 0, 0.35);
    
  /* Subtle inner shadow */
  --shadow-inset:
    inset 1px 1px 2px rgba(0, 0, 0, 0.1);
}
```

## Transitions

### Schnelle, knackige Animationen
```css
:root {
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 150ms;
  --duration-slow: 250ms;
  
  --ease-default: ease-out;
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## Z-Index Scale

```css
:root {
  --z-desktop: 0;
  --z-desktop-icon: 10;
  --z-window-base: 100;
  --z-window-active: 200;
  --z-menu-bar: 900;
  --z-menu-dropdown: 910;
  --z-dialog: 1000;
  --z-tooltip: 1100;
  --z-notification: 1200;
}
```

## Implementierung

### tokens/tokens.css
Vollständige CSS Custom Properties Datei

### tokens/colors.ts
```typescript
export const colors = {
  desktop: '#5C7A99',
  windowBg: '#DDDDDD',
  contentBg: '#FFFFFF',
  surface: '#EEEEEE',
  // ... alle Farben
} as const;

export type ColorToken = keyof typeof colors;
```

### tokens/typography.ts
```typescript
export const typography = {
  fontSystem: "var(--font-system)",
  fontMono: "var(--font-mono)",
  // ... Größen, Gewichte
} as const;
```

### tokens/index.ts
```typescript
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './borders';
```

## Komponenten-Zuordnung

| Komponente | Haupt-Tokens |
|------------|--------------|
| Button | `bevel-raised`, `surface`, `text`, `space-2/4` |
| Input | `bevel-inset`, `content-bg`, `border` |
| Window | `window-bg`, `shadow-window`, `bevel-title` |
| Menu | `surface`, `shadow-menu`, `highlight` |
| Dialog | `window-bg`, `shadow-dialog` |
| Scrollbar | `surface`, `bevel-raised`, `bevel-inset` |

## Dateien

```
src/tokens/
├── tokens.css         → Alle CSS Custom Properties
├── colors.ts          → Farb-Konstanten
├── typography.ts      → Schrift-Konstanten
├── spacing.ts         → Abstands-Konstanten
├── shadows.ts         → Schatten-Konstanten
├── borders.ts         → Border-Konstanten
└── index.ts           → Barrel Export
```

## Akzeptanzkriterien

- [ ] Alle CSS Custom Properties sind in tokens.css definiert
- [ ] TypeScript Typen für alle Token-Kategorien
- [ ] Keine Hardcoded Werte in Komponenten
- [ ] Dokumentation für jeden Token
- [ ] Dark Mode Variante für `data-theme="graphite"` (optional)

---

*Geschätzte Dauer: 30 Minuten*
