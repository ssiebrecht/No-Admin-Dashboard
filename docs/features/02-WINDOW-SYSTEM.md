# 🪟 Feature 02: Window System

## Übersicht

Das Fenster-System ist das Herzstück des Mac OS Erlebnisses. Jedes Fenster verhält sich wie ein klassisches Mac-Fenster mit Drag, Resize, Minimize, Maximize und der ikonischen gestreiften Titelleiste.

## Abhängigkeiten

- **Benötigt**: Design Tokens (Feature 01)
- **Blockiert**: Alle Fenster-basierten Features

## Fenster-Anatomie

```
┌─────────────────────────────────────────────────────────┐
│ ▫️ ═══════════════ Document Name ═══════════════════ ▫️ │  ← Striped Title Bar
├─────────────────────────────────────────────────────────┤
│ [Close] [Zoom] [Collapse]               [Proxy Icon]    │  ← Title Bar Buttons
├─────────────────────────────────────────────────────────┤
│                                                         │
│                                                         │
│                    CONTENT AREA                         │
│                                                         │
│                                                         │
│                                               ▲         │
│                                               █         │  ← Scrollbar
│                                               █         │
│                                               ▼         │
├─────────────────────────────────────────────────────────┤
│ ◀ ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ▶  │ ↘ │   │  ← Grow Box
└─────────────────────────────────────────────────────────┘
```

## Komponenten

### 1. Window (Organism)

```typescript
interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  children: ReactNode;
  
  // Position & Size
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  
  // Features
  resizable?: boolean;
  closable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  
  // Callbacks
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
}
```

### 2. WindowTitleBar (Molecule)

```typescript
interface WindowTitleBarProps {
  title: string;
  icon?: string;
  isActive: boolean;
  
  // Button visibility
  showClose?: boolean;
  showZoom?: boolean;
  showCollapse?: boolean;
  
  // Callbacks
  onClose?: () => void;
  onZoom?: () => void;
  onCollapse?: () => void;
  onDoubleClick?: () => void;
  
  // Drag handling
  onDragStart?: (e: MouseEvent) => void;
}
```

### 3. WindowButton (Atom)

```typescript
type WindowButtonType = 'close' | 'zoom' | 'collapse';

interface WindowButtonProps {
  type: WindowButtonType;
  disabled?: boolean;
  onClick?: () => void;
}
```

## Title Bar Styling

### Horizontale Streifen (Key Feature!)
```css
.titleBar {
  background: linear-gradient(
    to bottom,
    var(--color-surface) 0px,
    var(--color-surface) 1px,
    var(--color-border-light) 1px,
    var(--color-border-light) 2px
  );
  background-size: 100% 2px;
  background-repeat: repeat;
  
  box-shadow: var(--bevel-title);
}

/* Inactive Window */
.titleBar.inactive {
  background: var(--color-surface);
  /* Keine Streifen bei inaktiven Fenstern */
}
```

### Button Stile
```css
.windowButton {
  width: 13px;
  height: 11px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--bevel-raised);
}

.windowButton:active {
  box-shadow: var(--bevel-inset);
}

.closeButton {
  /* X-förmiges Muster oder Icon */
}

.zoomButton {
  /* Kleines Quadrat-Icon */
}

.collapseButton {
  /* Doppellinie-Icon (Rollup) */
}
```

## Fenster-States

```typescript
interface WindowState {
  id: string;
  title: string;
  icon: string;
  
  // Position & Größe
  position: { x: number; y: number };
  size: { width: number; height: number };
  
  // Gespeicherte Werte vor Maximize
  restorePosition?: { x: number; y: number };
  restoreSize?: { width: number; height: number };
  
  // Zustände
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  
  // Z-Order
  zIndex: number;
}
```

## Zustand-Store

```typescript
// store/windowStore.ts
interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  
  // CRUD
  openWindow: (config: Partial<WindowState> & { id: string }) => void;
  closeWindow: (id: string) => void;
  
  // Position & Size
  moveWindow: (id: string, position: { x: number; y: number }) => void;
  resizeWindow: (id: string, size: { width: number; height: number }) => void;
  
  // State Changes
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  
  // Focus Management
  focusWindow: (id: string) => void;
  getTopZIndex: () => number;
}
```

## Drag & Drop

### useDraggable Hook
```typescript
interface UseDraggableProps {
  initialPosition: { x: number; y: number };
  onDragEnd?: (position: { x: number; y: number }) => void;
  constraints?: {
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  };
}

interface UseDraggableReturn {
  position: { x: number; y: number };
  isDragging: boolean;
  dragHandlers: {
    onMouseDown: (e: MouseEvent) => void;
  };
}
```

### useResizable Hook
```typescript
interface UseResizableProps {
  initialSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  onResizeEnd?: (size: { width: number; height: number }) => void;
}

interface UseResizableReturn {
  size: { width: number; height: number };
  isResizing: boolean;
  resizeHandlers: {
    onMouseDown: (e: MouseEvent, direction: ResizeDirection) => void;
  };
}
```

## Fenster-Aktionen

### Close
1. Animation (optional): Fenster "schrumpft" in die Titelleiste
2. Fenster aus Store entfernen
3. Nächstes Fenster fokussieren

### Minimize (Collapse)
1. Fenster auf Titelleiste miniaturisieren
2. In "Window Shade" Modus (nur Title Bar sichtbar)
3. Oder: In Dock/Desktop-Bereich minimieren

### Maximize (Zoom)
1. Position/Größe speichern
2. Fenster auf Bildschirmgröße erweitern (unter Menüleiste)
3. Bei erneutem Klick: Wiederherstellen

### Focus
1. Z-Index erhöhen
2. Titelleiste aktivieren (Streifen zeigen)
3. Andere Fenster deaktivieren

## Window Content Scrolling

### Classic Scrollbar Styling
```css
.windowContent::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

.windowContent::-webkit-scrollbar-track {
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
}

.windowContent::-webkit-scrollbar-thumb {
  background: var(--color-surface);
  box-shadow: var(--bevel-raised);
  border: 1px solid var(--color-border);
}

.windowContent::-webkit-scrollbar-button {
  /* Pfeil-Buttons oben/unten */
  height: 16px;
  background: var(--color-surface);
  box-shadow: var(--bevel-raised);
}
```

## Grow Box (Resize Handle)

```css
.growBox {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  cursor: nwse-resize;
  
  /* Diagonale Linien Pattern */
  background: linear-gradient(
    -45deg,
    transparent 30%,
    var(--color-border) 30%,
    var(--color-border) 40%,
    transparent 40%,
    transparent 60%,
    var(--color-border) 60%,
    var(--color-border) 70%,
    transparent 70%
  );
}
```

## Dateien

```
src/
├── components/
│   ├── atoms/
│   │   └── WindowButton/
│   │       ├── WindowButton.tsx
│   │       ├── WindowButton.module.css
│   │       └── index.ts
│   │
│   ├── molecules/
│   │   └── WindowTitleBar/
│   │       ├── WindowTitleBar.tsx
│   │       ├── WindowTitleBar.module.css
│   │       └── index.ts
│   │
│   └── organisms/
│       └── Window/
│           ├── Window.tsx
│           ├── Window.module.css
│           └── index.ts
│
├── hooks/
│   ├── useDraggable.ts
│   └── useResizable.ts
│
├── store/
│   └── windowStore.ts
│
└── types/
    └── window.ts
```

## Interaktionen

| Aktion | Verhalten |
|--------|-----------|
| Klick auf Fenster | Fokus setzen, Z-Index erhöhen |
| Drag Titelleiste | Fenster verschieben |
| Doppelklick Titelleiste | Maximize/Restore |
| Drag Grow Box | Fenster vergrößern |
| Klick Close | Fenster schließen |
| Klick Collapse | Window Shade Toggle |
| Klick Zoom | Maximize/Restore |

## Akzeptanzkriterien

- [ ] Fenster sind draggable via Titelleiste
- [ ] Fenster sind resizable via Grow Box
- [ ] Gestreifte Titelleiste bei aktivem Fenster
- [ ] Graue Titelleiste bei inaktivem Fenster
- [ ] Close/Zoom/Collapse Buttons funktionieren
- [ ] Z-Index Management für überlappende Fenster
- [ ] Window Shade (Collapse) Animation
- [ ] Fenster bleiben im sichtbaren Desktop-Bereich
- [ ] Mindestgröße wird respektiert
- [ ] Zustand wird im Store persistiert

---

*Geschätzte Dauer: 1.5 Stunden*
