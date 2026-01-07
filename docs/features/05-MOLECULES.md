# 🧬 Feature 05: Core UI Molecules

## Übersicht

Molecules kombinieren Atoms zu funktionalen Einheiten mit einfacher Logik. Sie sind kontextunabhängig und können in verschiedenen Organisms verwendet werden.

## Abhängigkeiten

- **Benötigt**: Atoms (04), Design Tokens (01)
- **Blockiert**: Organisms (Dialogs, File Browser, etc.)

## Komponenten-Übersicht

| Molecule | Zusammensetzung | Beschreibung |
|----------|-----------------|--------------|
| FormField | Input + Text | Formularfeld mit Label und Error |
| SearchField | Input + Button + Icon | Suchfeld mit Submit |
| ListItem | Text + Icon + Checkbox | Listeneintrag mit Aktionen |
| Card | Divider + Text + Content | Container mit Header |
| TabBar | Button[] | Tab-Navigation |
| Toolbar | Button[] + Divider | Werkzeugleiste |
| StatusBar | Text + Icon | Statusanzeige |
| EmptyState | Icon + Text + Button | Leere-Liste-Anzeige |
| Breadcrumb | Text + Icon | Pfad-Navigation |
| Pagination | Button + Text | Seitennavigation |

---

## 1. FormField

### Props
```typescript
interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode; // Input, Select, etc.
}
```

### Layout
```
┌────────────────────────────────┐
│ Label *                        │  ← Text (label)
├────────────────────────────────┤
│ ┌────────────────────────────┐ │
│ │ Input Field                │ │  ← Children (Input)
│ └────────────────────────────┘ │
│ Hint text or Error message     │  ← Text (hint/error)
└────────────────────────────────┘
```

### Styling
```css
.formField {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.label {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--color-text);
}

.required::after {
  content: ' *';
  color: var(--color-error);
}

.hint {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.error {
  font-size: var(--text-xs);
  color: var(--color-error);
}
```

---

## 2. SearchField

### Props
```typescript
interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}
```

### Layout
```
┌────────────────────────────────────────────┐
│ 🔍 │ Search...                    │ Search │
└────────────────────────────────────────────┘
```

### Styling
```css
.searchField {
  display: flex;
  align-items: stretch;
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel-inset);
}

.searchIcon {
  padding: var(--space-2);
  color: var(--color-text-secondary);
}

.searchInput {
  flex: 1;
  border: none;
  background: transparent;
  box-shadow: none;
}

.searchButton {
  border-radius: 0;
  border-left: 1px solid var(--color-border);
}
```

---

## 3. ListItem

### Props
```typescript
interface ListItemProps {
  icon?: string;
  label: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  actions?: Array<{
    icon: string;
    label: string;
    onClick: () => void;
  }>;
  checkbox?: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
}
```

### Layout
```
┌─────────────────────────────────────────────────────────┐
│ ☐ │ 📁 │ Folder Name        │ 12 items    │ [✏️] [🗑️] │
└─────────────────────────────────────────────────────────┘
```

### Styling
```css
.listItem {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  cursor: default;
}

.listItem:hover {
  background: var(--color-surface);
}

.listItem.selected {
  background: var(--color-highlight);
  color: var(--color-highlight-text);
}

.listItemIcon {
  flex-shrink: 0;
}

.listItemContent {
  flex: 1;
  min-width: 0;
}

.listItemLabel {
  font-size: var(--text-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listItemDescription {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.listItemActions {
  display: flex;
  gap: var(--space-1);
  opacity: 0;
}

.listItem:hover .listItemActions {
  opacity: 1;
}
```

---

## 4. Card

### Props
```typescript
interface CardProps {
  title?: string;
  icon?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'raised';
}
```

### Layout
```
┌─────────────────────────────────────────────┐
│ 📊 Card Title              [Action] [Action]│  ← Header
├─────────────────────────────────────────────┤
│                                             │
│              Card Content                   │  ← Body
│                                             │
├─────────────────────────────────────────────┤
│ Footer content                              │  ← Footer (optional)
└─────────────────────────────────────────────┘
```

### Styling
```css
.card {
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
}

.card.raised {
  box-shadow: var(--bevel-raised);
}

.cardHeader {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.cardTitle {
  flex: 1;
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
}

.cardBody {
  padding: var(--space-3);
}

.cardFooter {
  padding: var(--space-2) var(--space-3);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}
```

---

## 5. TabBar

### Props
```typescript
interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}
```

### Layout (Folder Tab Style)
```
     ┌─────────┐
─────┤  Tab 1  ├──┬─────────┬──┬─────────┬──────
     └─────────┘  │  Tab 2  │  │  Tab 3  │
                  └─────────┘  └─────────┘
```

### Styling
```css
.tabBar {
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid var(--color-border);
  padding-left: var(--space-2);
}

.tab {
  position: relative;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
  
  margin-right: -1px;
}

.tab.active {
  background: var(--color-content-bg);
  z-index: 1;
  padding-bottom: calc(var(--space-2) + 1px);
  margin-bottom: -1px;
}

.tab:not(.active):hover {
  background: var(--color-surface-hover);
}
```

---

## 6. Toolbar

### Props
```typescript
interface ToolbarItem {
  id: string;
  type: 'button' | 'separator' | 'spacer';
  icon?: string;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface ToolbarProps {
  items: ToolbarItem[];
}
```

### Layout
```
┌──────────────────────────────────────────────────────────┐
│ [📄] [📁] [💾] │ [✂️] [📋] [📌] │        │ [🔍 Search  ] │
└──────────────────────────────────────────────────────────┘
```

### Styling
```css
.toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.toolbarButton {
  padding: var(--space-1);
}

.toolbarSeparator {
  width: 1px;
  height: 20px;
  background: var(--color-border);
  margin: 0 var(--space-2);
}

.toolbarSpacer {
  flex: 1;
}
```

---

## 7. StatusBar

### Props
```typescript
interface StatusBarProps {
  items: Array<{
    id: string;
    content: ReactNode;
    align?: 'left' | 'right';
  }>;
}
```

### Layout
```
┌─────────────────────────────────────────────────────────┐
│ 📁 15 items, 2.5 GB available                 │ 🔒 Admin │
└─────────────────────────────────────────────────────────┘
```

### Styling
```css
.statusBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-1) var(--space-3);
  
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: var(--bevel-raised);
  
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.statusBarLeft {
  display: flex;
  gap: var(--space-4);
}

.statusBarRight {
  display: flex;
  gap: var(--space-4);
}
```

---

## 8. EmptyState

### Props
```typescript
interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│              📁                     │
│                                     │
│        No items found               │
│   This folder is empty. Add some   │
│   items to get started.            │
│                                     │
│         [ Add Item ]                │
│                                     │
└─────────────────────────────────────┘
```

### Styling
```css
.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  text-align: center;
}

.emptyStateIcon {
  font-size: 48px;
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.emptyStateTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
}

.emptyStateDescription {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  max-width: 300px;
  margin-bottom: var(--space-4);
}
```

---

## 9. Breadcrumb

### Props
```typescript
interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}
```

### Layout
```
🏠 Home  ▶  📁 Users  ▶  📁 Admin  ▶  Settings
```

### Styling
```css
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
}

.breadcrumbItem {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-secondary);
}

.breadcrumbItem:hover {
  color: var(--color-highlight);
  text-decoration: underline;
}

.breadcrumbItem.active {
  color: var(--color-text);
  font-weight: var(--font-bold);
}

.breadcrumbSeparator {
  color: var(--color-text-disabled);
}
```

---

## 10. Pagination

### Props
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
}
```

### Layout
```
[◀◀] [◀] │  3 of 12  │ [▶] [▶▶]
```

### Styling
```css
.pagination {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.paginationButton {
  padding: var(--space-1) var(--space-2);
}

.paginationInfo {
  font-size: var(--text-sm);
  padding: 0 var(--space-3);
}
```

---

## Dateien

```
src/components/molecules/
├── FormField/
│   ├── FormField.tsx
│   ├── FormField.module.css
│   └── index.ts
├── SearchField/
├── ListItem/
├── Card/
├── TabBar/
├── Toolbar/
├── StatusBar/
├── EmptyState/
├── Breadcrumb/
├── Pagination/
└── index.ts (Barrel Export)
```

## Akzeptanzkriterien

- [ ] Alle 10 Molecules implementiert
- [ ] Konsistente Verwendung von Atoms
- [ ] Keine direkten CSS-Werte, nur Tokens
- [ ] Alle Props sind typisiert
- [ ] Flexible Slots für Children
- [ ] Barrel Export in index.ts

---

*Geschätzte Dauer: 1 Stunde*
