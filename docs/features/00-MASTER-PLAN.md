# 🍎 Mac OS 8/9 Admin Dashboard - Master Plan

## Projektübersicht

Ein vollständiges Admin-Dashboard im authentischen **Mac OS 8/9 "Platinum" Stil** (ca. 1997-2001). Das Dashboard emuliert den klassischen Macintosh-Look mit allen charakteristischen UI-Elementen und bietet gleichzeitig moderne Admin-Funktionalitäten.

## 🎨 Design Vision

### Authentische Elemente
- **Platinum Farbschema**: Silber-Grau Töne mit multi-colored Akzenten
- **Horizontale Streifen**: Die ikonischen gestreiften Titelleisten
- **3D Bevel-Effekte**: Erhabene und eingedrückte Elemente
- **Chicago/Charcoal Fonts**: Systemschriften der Ära
- **32x32 Pixel Icons**: Farbige, pixelige Stil-Icons
- **Klassische Scrollbars**: Breite Scrollbalken mit Pfeilen
- **Desktop Metapher**: Fenster, Ordner, Trash

### UI-Charakteristiken
| Element | Beschreibung |
|---------|--------------|
| Fenster | Gestreifte Titelleiste, Close/Zoom/Collapse Buttons |
| Buttons | 3D Bevel, Platinum grau, schwarze Schrift |
| Menüs | Schwarz-weiße Apple-Menüleiste, Pull-down Menüs |
| Dialoge | Zentrierte Alerts mit Icon und gestapelten Buttons |
| Listen | Alternating Row Colors, Selection Highlight |
| Tabs | Folder-Tab Style |
| Progress | Candy-stripe Fortschrittsbalken |

## 📦 Feature-Module (Entwicklungsreihenfolge)

Die Module bauen aufeinander auf und werden in dieser Reihenfolge implementiert:

```
┌─────────────────────────────────────────────────────────────┐
│                    PHASE 1: FOUNDATION                      │
├─────────────────────────────────────────────────────────────┤
│  01. Design Tokens      → Farben, Fonts, Spacing            │
│  02. Window System      → Fenster mit Drag & Resize         │
│  03. Desktop Shell      → Menüleiste + Desktop              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    PHASE 2: CORE UI                         │
├─────────────────────────────────────────────────────────────┤
│  04. Atoms              → Buttons, Inputs, Checkboxes       │
│  05. Molecules          → Forms, Cards, ListItems           │
│  06. System Dialogs     → Alerts, Confirms, Modals          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   PHASE 3: APPLICATIONS                     │
├─────────────────────────────────────────────────────────────┤
│  07. File Browser       → Finder-Style Navigation           │
│  08. User Management    → Benutzer CRUD                     │
│  09. Control Panels     → Systemeinstellungen               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   PHASE 4: DASHBOARD                        │
├─────────────────────────────────────────────────────────────┤
│  10. Dashboard Widgets  → Stats, Charts, Monitoring         │
│  11. Notification Ctr   → System Notifications              │
│  12. Activity Monitor   → Prozesse & Performance            │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Projektstruktur

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Select/
│   │   ├── Icon/
│   │   ├── Text/
│   │   ├── ProgressBar/
│   │   ├── Scrollbar/
│   │   └── Divider/
│   │
│   ├── molecules/
│   │   ├── WindowTitleBar/
│   │   ├── MenuItem/
│   │   ├── ListItem/
│   │   ├── FormField/
│   │   ├── TabBar/
│   │   ├── Toolbar/
│   │   ├── StatusBar/
│   │   └── SearchField/
│   │
│   ├── organisms/
│   │   ├── Window/
│   │   ├── MenuBar/
│   │   ├── Desktop/
│   │   ├── Dialog/
│   │   ├── FileList/
│   │   ├── UserTable/
│   │   ├── ControlPanel/
│   │   └── StatWidget/
│   │
│   ├── templates/
│   │   ├── DesktopLayout/
│   │   ├── WindowLayout/
│   │   └── DialogLayout/
│   │
│   └── pages/
│       ├── DesktopPage/
│       ├── UserManagementPage/
│       ├── FileBrowserPage/
│       ├── ControlPanelPage/
│       └── DashboardPage/
│
├── store/
│   ├── windowStore.ts      → Fenster-State (Position, Z-Index, etc.)
│   ├── desktopStore.ts     → Desktop Icons, Shortcuts
│   ├── menuStore.ts        → Menü-State
│   ├── userStore.ts        → User Management
│   ├── fileStore.ts        → File Browser State
│   └── settingsStore.ts    → App Settings
│
├── tokens/
│   ├── colors.ts           → Platinum Farbpalette
│   ├── typography.ts       → Chicago/Charcoal Fonts
│   ├── spacing.ts          → Klassische Abstände
│   ├── shadows.ts          → 3D Bevel Shadows
│   ├── borders.ts          → Border Styles
│   └── tokens.css          → CSS Custom Properties
│
├── types/
│   ├── window.ts
│   ├── menu.ts
│   ├── user.ts
│   ├── file.ts
│   └── index.ts
│
├── hooks/
│   ├── useDraggable.ts
│   ├── useResizable.ts
│   ├── useWindow.ts
│   └── useClickOutside.ts
│
├── assets/
│   └── icons/              → Classic Mac Icons (SVG)
│
├── App.tsx
├── main.tsx
└── index.css
```

## 🎯 Daten-Entitäten

### User (Benutzerverwaltung)
```typescript
interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}
```

### Window (Fenster-System)
```typescript
interface Window {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content: WindowContentType;
}
```

### File (File Browser)
```typescript
interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'application';
  icon: string;
  size?: number;
  createdAt: string;
  modifiedAt: string;
  parentId: string | null;
}
```

### Settings (Control Panels)
```typescript
interface Settings {
  appearance: {
    theme: 'platinum' | 'graphite';
    highlightColor: string;
    fontSize: 'small' | 'medium' | 'large';
  };
  desktop: {
    showIcons: boolean;
    gridSnap: boolean;
    wallpaper: string;
  };
  sounds: {
    enabled: boolean;
    volume: number;
  };
}
```

## 🖥️ Screens / Windows

### 1. Desktop (Hauptansicht)
- Apple Menüleiste oben
- Desktop-Bereich mit Icons
- Trash in der Ecke
- Fenster können geöffnet werden

### 2. Dashboard Window
- Übersichts-Widgets (Benutzer, Dateien, System)
- Quick Actions
- Recent Activity

### 3. User Management Window
- Benutzerliste (ListView)
- User Details Panel
- Add/Edit User Dialog
- Role Management

### 4. File Browser Window (Finder-Style)
- Spaltenansicht oder Listenansicht
- Navigation mit Breadcrumbs
- File Operations (Copy, Move, Delete)
- Get Info Dialog

### 5. Control Panels Window
- Grid von Control Panel Icons
- Einzelne Panels:
  - Appearance (Themes, Colors)
  - Users & Groups
  - Sound
  - Date & Time
  - Network (Mock)
  - Memory (Mock Stats)

### 6. About This Mac Dialog
- Mac OS Logo
- System Version
- Memory Info
- Disk Space

## 📅 Entwicklungsphasen

### Phase 1: Foundation (Basis)
**Dauer: ~4 Stunden**
- Projekt-Setup (Vite, React, TypeScript, Zustand)
- Design Token System (90er Apple Palette)
- Window System als Kern-Feature
- Desktop Shell mit Menüleiste

### Phase 2: Core UI (Basis-Komponenten)
**Dauer: ~3 Stunden**
- Alle Atoms im Platinum Style
- Wichtige Molecules (Forms, Lists)
- Dialog-System (Alert, Confirm, Prompt)

### Phase 3: Applications (Features)
**Dauer: ~4 Stunden**
- File Browser mit Finder-Feeling
- User Management komplett
- Control Panels System

### Phase 4: Dashboard & Polish
**Dauer: ~3 Stunden**
- Dashboard Widgets
- Notifications
- Activity Monitor
- Feinschliff & Animationen

## 🛠️ Technische Anforderungen

### Dependencies
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zustand": "^5.0.0",
    "nanoid": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.3.0"
  }
}
```

### Browser Support
- Moderne Browser (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties
- CSS Grid & Flexbox

## 📝 Feature-Plan Dokumente

Jedes Feature hat einen eigenen Plan:
- `01-DESIGN-TOKENS.md` - Farbsystem & Typography
- `02-WINDOW-SYSTEM.md` - Fenster-Komponente
- `03-DESKTOP-SHELL.md` - Menüleiste & Desktop
- `04-ATOMS.md` - Basis-Komponenten
- `05-MOLECULES.md` - Zusammengesetzte Komponenten
- `06-DIALOGS.md` - Dialog-System
- `07-FILE-BROWSER.md` - Finder-Clone
- `08-USER-MANAGEMENT.md` - Benutzerverwaltung
- `09-CONTROL-PANELS.md` - Einstellungen
- `10-DASHBOARD.md` - Dashboard Widgets
- `11-NOTIFICATIONS.md` - Benachrichtigungssystem
- `12-ACTIVITY-MONITOR.md` - System Monitor

---

*Erstellt: Januar 2026*
*Projekt: Mac OS 8/9 Admin Dashboard*
