# 📁 Feature 07: File Browser (Finder-Style)

## Übersicht

Der File Browser emuliert den klassischen Macintosh Finder mit Spaltenansicht, Listenansicht und Icon-Ansicht. Er ermöglicht Navigation, Dateioperationen und eine "Get Info" Funktion.

## Abhängigkeiten

- **Benötigt**: Window System (02), Atoms (04), Molecules (05), Dialogs (06)
- **Blockiert**: None (eigenständiges Feature)

## Ansichten

### 1. Icon View (als Icons)
```
┌──────────────────────────────────────────────────────────────────────┐
│ ◀ ▶ │ 🏠 Home ▶ 📁 Documents ▶ 📁 Projects │      │ 🔍 Search...   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   📁          📁          📁          📄          📄               │
│  Assets     Components    Hooks      README.md   package.json       │
│                                                                      │
│   📁          📄          📄          📄                            │
│   src       index.ts    config.ts   LICENSE                         │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ 8 items, 45.2 MB available                                          │
└──────────────────────────────────────────────────────────────────────┘
```

### 2. List View (als Liste)
```
┌──────────────────────────────────────────────────────────────────────┐
│ ◀ ▶ │ 🏠 Home ▶ 📁 Documents ▶ 📁 Projects │      │ 🔍 Search...   │
├──────────────────────────────────────────────────────────────────────┤
│ Name                    │ Date Modified    │ Size    │ Kind         │
├─────────────────────────┼──────────────────┼─────────┼──────────────┤
│ ▶ 📁 src                │ Today, 14:23     │ --      │ Folder       │
│ ▶ 📁 components         │ Today, 12:45     │ --      │ Folder       │
│   📄 index.ts           │ Yesterday        │ 2.4 KB  │ TypeScript   │
│   📄 package.json       │ Jan 3, 2026      │ 1.1 KB  │ JSON         │
│   📄 README.md          │ Jan 2, 2026      │ 4.2 KB  │ Markdown     │
│   📄 LICENSE            │ Jan 1, 2026      │ 1 KB    │ Text         │
├──────────────────────────────────────────────────────────────────────┤
│ 6 items, 45.2 MB available                                          │
└──────────────────────────────────────────────────────────────────────┘
```

### 3. Column View (als Spalten)
```
┌──────────────────────────────────────────────────────────────────────┐
│ ◀ ▶ │ View: Columns │                           │ 🔍 Search...     │
├──────────────────────────────────────────────────────────────────────┤
│ 🏠 Home        │ 📁 Documents  │ 📁 Projects   │ Preview          │
├────────────────┼───────────────┼───────────────┼──────────────────┤
│ 📁 Desktop     │ 📁 Projects ▶ │ 📁 src      ▶ │                  │
│ 📁 Documents ▶ │ 📁 Archive    │ 📁 components │   📄             │
│ 📁 Downloads   │ 📄 Notes.txt  │ 📄 index.ts ● │                  │
│ 📁 Pictures    │               │ 📄 config.ts  │  index.ts        │
│ 📁 Music       │               │ 📄 README.md  │                  │
│                │               │               │  TypeScript      │
│                │               │               │  2.4 KB          │
│                │               │               │  Modified: Today │
├──────────────────────────────────────────────────────────────────────┤
│ 📁 Projects selected                                                 │
└──────────────────────────────────────────────────────────────────────┘
```

## Komponenten

### 1. FileBrowser (Organism/Page)

```typescript
interface FileBrowserProps {
  rootPath?: string;
  onFileOpen?: (file: FileItem) => void;
  onFileSelect?: (files: FileItem[]) => void;
}
```

### 2. FileList (Organism)

```typescript
interface FileListProps {
  files: FileItem[];
  viewMode: 'icons' | 'list' | 'columns';
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onOpen: (file: FileItem) => void;
  onContextMenu: (file: FileItem, event: MouseEvent) => void;
  sortBy: SortField;
  sortOrder: 'asc' | 'desc';
  onSort: (field: SortField) => void;
}

type SortField = 'name' | 'date' | 'size' | 'kind';
```

### 3. FileItem (Molecule)

```typescript
interface FileItemProps {
  file: FileItem;
  viewMode: 'icons' | 'list' | 'columns';
  selected?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  extension?: string;
  size?: number;
  createdAt: string;
  modifiedAt: string;
  parentId: string | null;
  icon?: string;
  children?: FileItem[]; // Für Ordner
}
```

### 4. FileToolbar (Molecule)

```typescript
interface FileToolbarProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNewFolder: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}
```

### 5. FilePathBar (Molecule - Breadcrumb)

```typescript
interface FilePathBarProps {
  path: FileItem[]; // Array von Ordnern im Pfad
  onNavigate: (folderId: string) => void;
}
```

### 6. FilePreview (Molecule)

```typescript
interface FilePreviewProps {
  file: FileItem | null;
}
```

### 7. GetInfoDialog (Organism)

```typescript
interface GetInfoDialogProps {
  file: FileItem;
  isOpen: boolean;
  onClose: () => void;
}
```

## Get Info Dialog

```
┌─────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░ index.ts Info ░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────────────────────┤
│                                                 │
│     📄                                          │
│   index.ts                                      │
│                                                 │
├─────────────────────────────────────────────────┤
│ General Information                             │
├─────────────────────────────────────────────────┤
│                                                 │
│ Kind:         TypeScript File                   │
│ Size:         2,456 bytes (2.4 KB on disk)     │
│ Where:        /Projects/my-app/src             │
│                                                 │
│ Created:      January 5, 2026 at 10:32 AM      │
│ Modified:     January 7, 2026 at 14:23 PM      │
│                                                 │
├─────────────────────────────────────────────────┤
│ Name & Extension                                │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐│
│ │ index.ts                                    ││
│ └─────────────────────────────────────────────┘│
│ ☐ Hide extension                               │
│                                                 │
├─────────────────────────────────────────────────┤
│                              ┌───────────────┐ │
│                              │      OK       │ │
│                              └───────────────┘ │
└─────────────────────────────────────────────────┘
```

## Context Menu

```
┌──────────────────────────────┐
│ Open                     ⌘O  │
│ Open With            ▶       │
│ ──────────────────────────── │
│ Get Info                 ⌘I  │
│ Rename                       │
│ Duplicate                    │
│ ──────────────────────────── │
│ Copy                     ⌘C  │
│ Cut                      ⌘X  │
│ Paste                    ⌘V  │
│ ──────────────────────────── │
│ Move to Trash            ⌘⌫  │
└──────────────────────────────┘
```

## State Management

```typescript
// store/fileStore.ts
interface FileStore {
  // Current state
  currentFolderId: string;
  selectedFileIds: string[];
  
  // Navigation history
  history: string[];
  historyIndex: number;
  
  // View settings
  viewMode: 'icons' | 'list' | 'columns';
  sortBy: SortField;
  sortOrder: 'asc' | 'desc';
  
  // Data
  files: Record<string, FileItem>;
  
  // Actions
  navigateTo: (folderId: string) => void;
  goBack: () => void;
  goForward: () => void;
  
  selectFiles: (ids: string[]) => void;
  clearSelection: () => void;
  
  createFolder: (name: string) => void;
  renameFile: (id: string, newName: string) => void;
  deleteFiles: (ids: string[]) => void;
  moveFiles: (ids: string[], targetFolderId: string) => void;
  copyFiles: (ids: string[], targetFolderId: string) => void;
  
  setViewMode: (mode: ViewMode) => void;
  setSort: (field: SortField, order: 'asc' | 'desc') => void;
}
```

## Mock-Daten

```typescript
// data/mockFiles.ts
export const mockFileSystem: FileItem[] = [
  {
    id: 'root',
    name: 'Macintosh HD',
    type: 'folder',
    parentId: null,
    createdAt: '2026-01-01',
    modifiedAt: '2026-01-07',
  },
  {
    id: 'users',
    name: 'Users',
    type: 'folder',
    parentId: 'root',
    createdAt: '2026-01-01',
    modifiedAt: '2026-01-07',
  },
  {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    parentId: 'users',
    createdAt: '2026-01-02',
    modifiedAt: '2026-01-06',
  },
  // ... mehr Dateien
];
```

## File Icons

| Extension | Icon | Kind |
|-----------|------|------|
| folder | 📁 | Folder |
| .txt | 📄 | Text Document |
| .md | 📝 | Markdown |
| .ts, .tsx | 📘 | TypeScript |
| .js, .jsx | 📒 | JavaScript |
| .json | 📋 | JSON |
| .css | 🎨 | Stylesheet |
| .html | 🌐 | HTML |
| .png, .jpg | 🖼️ | Image |
| .pdf | 📕 | PDF |
| .zip | 📦 | Archive |

```typescript
// utils/fileIcons.ts
export const getFileIcon = (file: FileItem): string => {
  if (file.type === 'folder') return '📁';
  
  const ext = file.extension?.toLowerCase();
  const iconMap: Record<string, string> = {
    txt: '📄',
    md: '📝',
    ts: '📘',
    tsx: '📘',
    js: '📒',
    jsx: '📒',
    // ...
  };
  
  return iconMap[ext ?? ''] ?? '📄';
};

export const getFileKind = (file: FileItem): string => {
  if (file.type === 'folder') return 'Folder';
  
  const kindMap: Record<string, string> = {
    txt: 'Text Document',
    md: 'Markdown Document',
    ts: 'TypeScript File',
    // ...
  };
  
  return kindMap[file.extension ?? ''] ?? 'Document';
};
```

## Styling

### List View Rows
```css
.fileRow {
  display: grid;
  grid-template-columns: 1fr 150px 80px 100px;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}

.fileRow:nth-child(odd) {
  background: var(--color-content-bg);
}

.fileRow:nth-child(even) {
  background: var(--color-surface);
}

.fileRow.selected {
  background: var(--color-highlight);
  color: var(--color-highlight-text);
}

.fileRow:hover:not(.selected) {
  background: var(--color-surface-hover);
}
```

### Column View
```css
.columnView {
  display: flex;
  height: 100%;
  overflow-x: auto;
}

.column {
  min-width: 180px;
  max-width: 250px;
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}

.columnItem {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2);
}

.columnItem.hasChildren::after {
  content: '▶';
  margin-left: auto;
  font-size: 8px;
}
```

### Icon View
```css
.iconView {
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
  gap: var(--space-4);
  padding: var(--space-4);
}

.iconItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.iconItem img {
  width: 32px;
  height: 32px;
}

.iconItem .name {
  font-size: var(--text-xs);
  margin-top: var(--space-1);
  max-width: 72px;
  word-wrap: break-word;
}
```

## Keyboard Shortcuts

| Shortcut | Aktion |
|----------|--------|
| ⌘O | Öffne ausgewählte Datei |
| ⌘I | Get Info |
| ⌘N | Neuer Ordner |
| ⌘C | Kopieren |
| ⌘V | Einfügen |
| ⌫ | In den Papierkorb |
| ⌘A | Alles auswählen |
| ↑/↓ | Navigation |
| ↩ | Umbenennen |
| ⌘1 | Icon-Ansicht |
| ⌘2 | Listen-Ansicht |
| ⌘3 | Spalten-Ansicht |

## Dateien

```
src/
├── components/
│   ├── molecules/
│   │   ├── FileItem/
│   │   ├── FileToolbar/
│   │   ├── FilePathBar/
│   │   └── FilePreview/
│   │
│   └── organisms/
│       ├── FileList/
│       ├── FileBrowser/
│       └── GetInfoDialog/
│
├── store/
│   └── fileStore.ts
│
├── utils/
│   └── fileIcons.ts
│
├── data/
│   └── mockFiles.ts
│
└── types/
    └── file.ts
```

## Akzeptanzkriterien

- [ ] Drei Ansichtsmodi (Icons, List, Columns)
- [ ] Navigation in Ordner per Doppelklick
- [ ] Zurück/Vorwärts Navigation funktioniert
- [ ] Breadcrumb-Navigation
- [ ] Sortierung nach Name, Datum, Größe, Art
- [ ] Einzelselektion per Klick
- [ ] Mehrfachselektion per Cmd+Klick
- [ ] Context-Menü per Rechtsklick
- [ ] Get Info Dialog
- [ ] Neuer Ordner erstellen
- [ ] Umbenennen von Dateien
- [ ] Dateien löschen (in Trash)
- [ ] Search/Filter-Funktionalität
- [ ] Keyboard-Navigation

---

*Geschätzte Dauer: 2 Stunden*
