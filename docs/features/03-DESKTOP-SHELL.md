# 🖥️ Feature 03: Desktop Shell

## Übersicht

Die Desktop Shell besteht aus der klassischen Apple-Menüleiste am oberen Bildschirmrand und dem Desktop-Bereich mit Icons. Dies ist das "Betriebssystem"-Feeling.

## Abhängigkeiten

- **Benötigt**: Design Tokens (01), Window System (02)
- **Blockiert**: Alle Desktop-Interaktionen

## Desktop-Anatomie

```
┌──────────────────────────────────────────────────────────────────────────┐
│ 🍎 File  Edit  View  Special  Help          📶 🔊  Mo 14:35           │  ← MenuBar
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📁 Dashboard    📁 Users     📁 Files                                  │
│                                                                          │
│  📁 Settings     📁 Reports                                              │
│                                                                          │
│                                                                          │
│                               ┌──────────────────────────┐              │
│                               │ ░░░░ Window Title ░░░░░ │              │
│                               │                          │              │
│                               │     Window Content       │              │
│                               │                          │              │
│                               └──────────────────────────┘              │
│                                                                          │
│                                                                          │
│                                                                          │
│                                                               🗑️        │  ← Trash
└──────────────────────────────────────────────────────────────────────────┘
```

## Komponenten

### 1. MenuBar (Organism)

```typescript
interface MenuBarProps {
  menus: Menu[];
  rightItems?: ReactNode; // Clock, Status Icons
}

interface Menu {
  id: string;
  label: string;
  icon?: string;      // Für Apple Menu
  items: MenuItem[];
  disabled?: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  shortcut?: string;  // "⌘Q"
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenuItem[];
  action?: () => void;
}
```

### 2. MenuBarItem (Molecule)

```typescript
interface MenuBarItemProps {
  label: string;
  icon?: string;
  isOpen: boolean;
  onClick: () => void;
}
```

### 3. DropdownMenu (Molecule)

```typescript
interface DropdownMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onItemClick: (item: MenuItem) => void;
}
```

### 4. Desktop (Organism)

```typescript
interface DesktopProps {
  icons: DesktopIcon[];
  onIconDoubleClick: (icon: DesktopIcon) => void;
  children?: ReactNode; // Windows
}

interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
  position: { x: number; y: number };
  type: 'folder' | 'file' | 'application' | 'trash';
}
```

### 5. DesktopIcon (Molecule)

```typescript
interface DesktopIconProps {
  icon: string;
  label: string;
  selected?: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onDragEnd?: (position: { x: number; y: number }) => void;
}
```

### 6. StatusIcon (Atom)

```typescript
interface StatusIconProps {
  icon: string;
  onClick?: () => void;
  tooltip?: string;
}
```

### 7. Clock (Atom)

```typescript
interface ClockProps {
  format?: '12h' | '24h';
  showDate?: boolean;
}
```

## MenuBar Styling

```css
.menuBar {
  height: 20px;
  background: var(--color-surface);
  box-shadow: 
    inset 0 -1px 0 var(--color-bevel-dark),
    0 1px 0 var(--color-bevel-light);
  
  display: flex;
  align-items: center;
  padding: 0 var(--space-2);
  
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-menu-bar);
}

.menuItem {
  padding: var(--space-1) var(--space-3);
  cursor: default;
}

.menuItem:hover,
.menuItem.open {
  background: var(--color-highlight);
  color: var(--color-highlight-text);
}
```

## Dropdown Menu Styling

```css
.dropdown {
  position: absolute;
  min-width: 180px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-menu);
  z-index: var(--z-menu-dropdown);
  
  padding: var(--space-1) 0;
}

.dropdownItem {
  display: flex;
  justify-content: space-between;
  padding: var(--space-1) var(--space-4);
  font-size: var(--text-sm);
}

.dropdownItem:hover {
  background: var(--color-highlight);
  color: var(--color-highlight-text);
}

.dropdownItem .shortcut {
  color: var(--color-text-secondary);
  margin-left: var(--space-6);
}

.separator {
  height: 1px;
  background: var(--color-border);
  margin: var(--space-1) 0;
}
```

## Desktop Styling

```css
.desktop {
  position: fixed;
  top: 20px; /* Unter MenuBar */
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Classic Desktop Pattern */
  background: var(--color-desktop);
  
  /* Optional: Desktop Pattern */
  background-image: 
    linear-gradient(45deg, rgba(0,0,0,0.03) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(0,0,0,0.03) 25%, transparent 25%);
  background-size: 4px 4px;
}

.desktopIcon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  cursor: default;
  user-select: none;
}

.desktopIcon img {
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
}

.desktopIcon .label {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: white;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  text-align: center;
  max-width: 72px;
  word-wrap: break-word;
}

.desktopIcon.selected {
  background: rgba(51, 102, 204, 0.5);
}

.desktopIcon.selected .label {
  background: var(--color-highlight);
  color: white;
}
```

## Menü-Struktur

### Apple Menu (🍎)
```
┌─────────────────────────────┐
│ About This Dashboard        │
│ ─────────────────────────── │
│ System Preferences...       │
│ ─────────────────────────── │
│ Recent Applications    ▶    │
│ Recent Documents       ▶    │
│ ─────────────────────────── │
│ Sleep                       │
│ Restart                     │
│ Shut Down...                │
└─────────────────────────────┘
```

### File Menu
```
┌─────────────────────────────┐
│ New Window         ⌘N       │
│ Open...            ⌘O       │
│ Close Window       ⌘W       │
│ ─────────────────────────── │
│ Get Info           ⌘I       │
│ ─────────────────────────── │
│ Print...           ⌘P       │
└─────────────────────────────┘
```

### Edit Menu
```
┌─────────────────────────────┐
│ Undo               ⌘Z       │
│ Redo               ⇧⌘Z      │
│ ─────────────────────────── │
│ Cut                ⌘X       │
│ Copy               ⌘C       │
│ Paste              ⌘V       │
│ Select All         ⌘A       │
└─────────────────────────────┘
```

### View Menu
```
┌─────────────────────────────┐
│ as Icons           ⌘1       │
│ as List            ⌘2       │
│ as Columns         ⌘3       │
│ ─────────────────────────── │
│ Clean Up                    │
│ Arrange            ▶        │
│ ─────────────────────────── │
│ Hide Toolbar       ⌘B       │
│ Hide Status Bar             │
└─────────────────────────────┘
```

### Special Menu (Admin-Spezifisch)
```
┌─────────────────────────────┐
│ Dashboard           ⌘D      │
│ User Management     ⌘U      │
│ File Browser        ⌘F      │
│ ─────────────────────────── │
│ Activity Monitor            │
│ System Logs                 │
│ ─────────────────────────── │
│ Empty Trash...              │
└─────────────────────────────┘
```

## Desktop Icons (Standard)

| Icon | Label | Öffnet |
|------|-------|--------|
| 📊 | Dashboard | Dashboard Window |
| 👥 | Users | User Management |
| 📁 | Files | File Browser |
| ⚙️ | Control Panels | Settings Grid |
| 📈 | Reports | Reports Window |
| 🗑️ | Trash | Trash Window |

## State Management

```typescript
// store/desktopStore.ts
interface DesktopStore {
  icons: DesktopIcon[];
  selectedIconId: string | null;
  
  // Actions
  selectIcon: (id: string) => void;
  clearSelection: () => void;
  moveIcon: (id: string, position: { x: number; y: number }) => void;
  arrangeIcons: () => void;
}

// store/menuStore.ts
interface MenuStore {
  activeMenuId: string | null;
  
  openMenu: (id: string) => void;
  closeMenu: () => void;
}
```

## Interaktionen

| Aktion | Verhalten |
|--------|-----------|
| Klick auf Desktop | Selection aufheben |
| Klick auf Icon | Icon selektieren |
| Doppelklick auf Icon | Entsprechendes Fenster öffnen |
| Drag Icon | Icon verschieben (Grid Snap optional) |
| Klick auf Menü | Dropdown öffnen |
| Hover über Menü (wenn offen) | Zu anderem Menü wechseln |
| Klick außerhalb Menü | Menü schließen |
| Esc | Menü schließen |

## Dateien

```
src/
├── components/
│   ├── atoms/
│   │   ├── Clock/
│   │   └── StatusIcon/
│   │
│   ├── molecules/
│   │   ├── MenuBarItem/
│   │   ├── DropdownMenu/
│   │   └── DesktopIcon/
│   │
│   └── organisms/
│       ├── MenuBar/
│       └── Desktop/
│
├── store/
│   ├── desktopStore.ts
│   └── menuStore.ts
│
├── data/
│   └── menuConfig.ts    → Menü-Definitionen
│
└── types/
    ├── menu.ts
    └── desktop.ts
```

## Akzeptanzkriterien

- [ ] Menüleiste ist fixiert am oberen Rand
- [ ] Apple-Menü mit korrektem Icon
- [ ] Dropdown-Menüs öffnen bei Klick
- [ ] Menü-Hover-Wechsel funktioniert
- [ ] Keyboard Shortcuts werden angezeigt
- [ ] Desktop Icons sind verschiebbar
- [ ] Desktop Icons öffnen Fenster per Doppelklick
- [ ] Icon-Selektion mit visueller Hervorhebung
- [ ] Uhr zeigt aktuelle Zeit
- [ ] Trash-Icon in rechter unterer Ecke

---

*Geschätzte Dauer: 1.5 Stunden*
