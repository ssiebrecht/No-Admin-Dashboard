# 💬 Feature 06: System Dialogs

## Übersicht

Das Dialog-System implementiert die klassischen Mac OS Alert-Boxen, Bestätigungsdialoge und modale Fenster. Diese Dialoge haben einen unverwechselbaren Look mit Icon auf der linken Seite und gestapelten Buttons.

## Abhängigkeiten

- **Benötigt**: Atoms (04), Molecules (05), Window System (02)
- **Blockiert**: User Management, File Browser Operationen

## Dialog-Typen

| Typ | Verwendung | Buttons |
|-----|------------|---------|
| Alert | Information anzeigen | OK |
| Confirm | Bestätigung einholen | Cancel, OK |
| Prompt | Eingabe erfragen | Cancel, OK |
| Custom | Komplexe Dialoge | Custom |

## Dialog-Anatomie (Classic Mac Style)

```
┌─────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← Title Bar (optional)
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐                                               │
│   │         │   Are you sure you want to delete             │
│   │   ⚠️    │   this item?                                  │
│   │         │                                               │
│   │         │   This action cannot be undone.               │
│   └─────────┘                                               │
│                                                             │
│                                        ┌─────────────────┐  │
│                                        │     Cancel      │  │
│                                        └─────────────────┘  │
│                                        ┌─────────────────┐  │
│                                        │      OK         │  │  ← Default Button (mit Rahmen)
│                                        └─────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Komponenten

### 1. Dialog (Organism)

```typescript
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  
  // Content
  title?: string;
  icon?: 'info' | 'warning' | 'error' | 'question' | 'success' | ReactNode;
  children: ReactNode;
  
  // Actions
  actions?: DialogAction[];
  
  // Behavior
  showTitleBar?: boolean;
  closable?: boolean;
  modal?: boolean;
  
  // Size
  width?: number;
  maxWidth?: number;
}

interface DialogAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  isDefault?: boolean; // Enter-Key trigger
  isCancel?: boolean;  // Escape-Key trigger
  onClick: () => void;
  disabled?: boolean;
}
```

### 2. AlertDialog

```typescript
interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  
  icon?: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message?: string;
  
  confirmLabel?: string; // Default: "OK"
}
```

### 3. ConfirmDialog

```typescript
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  
  icon?: 'warning' | 'question' | 'error';
  title: string;
  message?: string;
  
  confirmLabel?: string;  // Default: "OK"
  cancelLabel?: string;   // Default: "Cancel"
  
  danger?: boolean; // Roter Confirm-Button
}
```

### 4. PromptDialog

```typescript
interface PromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  
  icon?: 'question' | 'info';
  title: string;
  message?: string;
  
  inputLabel?: string;
  inputPlaceholder?: string;
  defaultValue?: string;
  
  confirmLabel?: string;
  cancelLabel?: string;
}
```

### 5. DialogOverlay (Atom)

```typescript
interface DialogOverlayProps {
  isOpen: boolean;
  onClick?: () => void;
  children: ReactNode;
}
```

## Dialog Icons (Classic Mac Style)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ⓘ  Info       ⚠️  Warning      ❌  Error       ❓  Question      │
│                                                                     │
│   32x32 pixelated icons in the classic Mac style                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Styling

### Dialog Base
```css
.dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  min-width: 300px;
  max-width: 500px;
  
  background: var(--color-window-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-dialog);
  
  z-index: var(--z-dialog);
}

.dialogTitleBar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  
  background: linear-gradient(
    to bottom,
    var(--color-surface) 0px,
    var(--color-surface) 1px,
    var(--color-border-light) 1px,
    var(--color-border-light) 2px
  );
  background-size: 100% 2px;
  
  font-weight: var(--font-bold);
  font-size: var(--text-sm);
}
```

### Dialog Content Layout
```css
.dialogContent {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-6);
}

.dialogIcon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}

.dialogBody {
  flex: 1;
}

.dialogTitle {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
}

.dialogMessage {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

### Dialog Actions (Classic Stacking)
```css
.dialogActions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  align-items: flex-end;
}

.dialogButton {
  min-width: 100px;
}

/* Default Button hat extra Rahmen */
.dialogButton.default {
  outline: 2px solid var(--color-text);
  outline-offset: 3px;
  border-radius: var(--border-radius-md);
}
```

### Overlay
```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: calc(var(--z-dialog) - 1);
}
```

## Dialog Service / Hook

```typescript
// hooks/useDialog.ts
interface DialogService {
  alert: (options: AlertOptions) => Promise<void>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  prompt: (options: PromptOptions) => Promise<string | null>;
}

interface AlertOptions {
  icon?: DialogIcon;
  title: string;
  message?: string;
}

interface ConfirmOptions extends AlertOptions {
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

interface PromptOptions extends AlertOptions {
  defaultValue?: string;
  placeholder?: string;
}

// Usage
const dialog = useDialog();

// Alert
await dialog.alert({
  icon: 'info',
  title: 'File saved successfully',
});

// Confirm
const confirmed = await dialog.confirm({
  icon: 'warning',
  title: 'Delete user?',
  message: 'This action cannot be undone.',
  danger: true,
});

if (confirmed) {
  deleteUser(userId);
}

// Prompt
const name = await dialog.prompt({
  icon: 'question',
  title: 'Rename folder',
  defaultValue: folder.name,
});

if (name) {
  renameFolder(folderId, name);
}
```

## Dialog Context Provider

```typescript
// context/DialogContext.tsx
interface DialogContextValue {
  alert: DialogService['alert'];
  confirm: DialogService['confirm'];
  prompt: DialogService['prompt'];
}

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogs, setDialogs] = useState<DialogState[]>([]);
  
  const alert = useCallback((options: AlertOptions) => {
    return new Promise<void>((resolve) => {
      setDialogs(prev => [...prev, {
        type: 'alert',
        ...options,
        resolve,
      }]);
    });
  }, []);
  
  // ... confirm, prompt implementations
  
  return (
    <DialogContext.Provider value={{ alert, confirm, prompt }}>
      {children}
      {dialogs.map(dialog => (
        <RenderDialog key={dialog.id} {...dialog} />
      ))}
    </DialogContext.Provider>
  );
};
```

## Keyboard Navigation

| Taste | Aktion |
|-------|--------|
| Enter | Default Button klicken |
| Escape | Cancel Button / Schließen |
| Tab | Zwischen Buttons navigieren |

## Animationen (Optional)

```css
/* Dialog Appear */
@keyframes dialogAppear {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.dialog {
  animation: dialogAppear 150ms ease-out;
}

/* Overlay Fade */
@keyframes overlayFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.overlay {
  animation: overlayFade 150ms ease-out;
}
```

## Beispiel-Dialoge

### Delete Confirmation
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   ⚠️     Are you sure you want to delete       │
│          "user_data.csv"?                       │
│                                                 │
│          This item will be moved to the Trash. │
│                                                 │
│                          ┌───────────────────┐  │
│                          │      Cancel       │  │
│                          └───────────────────┘  │
│                          ┌───────────────────┐  │
│                          │      Delete       │  │ ← Danger Style
│                          └───────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Input Prompt
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   ❓     Enter a name for the new folder:       │
│                                                 │
│          ┌───────────────────────────────┐     │
│          │ Untitled Folder               │     │
│          └───────────────────────────────┘     │
│                                                 │
│                          ┌───────────────────┐  │
│                          │      Cancel       │  │
│                          └───────────────────┘  │
│                          ┌───────────────────┐  │
│                          │       OK          │  │
│                          └───────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Dateien

```
src/
├── components/
│   ├── atoms/
│   │   └── DialogOverlay/
│   │
│   └── organisms/
│       ├── Dialog/
│       │   ├── Dialog.tsx
│       │   ├── Dialog.module.css
│       │   └── index.ts
│       ├── AlertDialog/
│       ├── ConfirmDialog/
│       └── PromptDialog/
│
├── context/
│   └── DialogContext.tsx
│
└── hooks/
    └── useDialog.ts
```

## Akzeptanzkriterien

- [ ] Alert-Dialog zeigt Message mit OK-Button
- [ ] Confirm-Dialog liefert true/false zurück
- [ ] Prompt-Dialog liefert eingegeben Text zurück
- [ ] ESC schließt Dialog / triggert Cancel
- [ ] Enter triggert Default-Button
- [ ] Default-Button hat extra Outline
- [ ] Icons werden korrekt angezeigt
- [ ] Overlay blockiert Hintergrund
- [ ] Dialog ist modal (keine Interaktion mit Hintergrund)
- [ ] useDialog Hook funktioniert wie beschrieben
- [ ] Focus wird beim Öffnen auf Dialog gesetzt
- [ ] Focus wird beim Schließen zurückgesetzt

---

*Geschätzte Dauer: 1 Stunde*
