# ⚛️ Feature 04: Core UI Atoms

## Übersicht

Die Atoms sind die kleinsten, unteilbaren UI-Elemente im klassischen Mac OS 8/9 Stil. Jedes Atom ist vollständig wiederverwendbar und folgt dem Platinum Design.

## Abhängigkeiten

- **Benötigt**: Design Tokens (01)
- **Blockiert**: Molecules (05), alle höheren Komponenten

## Komponenten-Übersicht

| Atom | Beschreibung | Varianten |
|------|--------------|-----------|
| Button | Klassischer 3D-Button | primary, secondary, danger, ghost |
| Input | Textfeld mit Inset-Bevel | default, error, disabled |
| Checkbox | Ankreuzfeld mit Check-Häkchen | checked, unchecked, indeterminate |
| Radio | Radiobutton mit Punkt | selected, unselected |
| Select | Dropdown-Auswahl mit Pfeil | default, disabled |
| Icon | 32x32 Pixel Icons | diverse |
| Text | Typografie-Komponente | h1, h2, h3, body, label, small |
| Badge | Status-Anzeige | default, success, warning, error |
| ProgressBar | Fortschrittsanzeige | determinate, indeterminate |
| Divider | Trennlinie | horizontal, vertical |
| Spinner | Ladeanimation | sm, md, lg |

---

## 1. Button

### Props
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}
```

### Styling
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  font-family: var(--font-system);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  cursor: default;
  
  transition: none; /* Keine Transitions für authentischen Look */
}

/* Primary (Default) */
.primary {
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--bevel-raised);
}

.primary:hover {
  background: var(--color-surface-hover);
}

.primary:active {
  box-shadow: var(--bevel-inset);
  background: var(--color-surface);
}

/* Danger */
.danger {
  background: var(--color-error);
  color: white;
  border-color: var(--color-error-dark);
}

/* Ghost (nur bei Hover sichtbar) */
.ghost {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}

.ghost:hover {
  background: var(--color-surface);
  border-color: var(--color-border);
}

/* Sizes */
.sm { padding: var(--space-1) var(--space-3); }
.md { padding: var(--space-2) var(--space-4); font-size: var(--text-base); }
.lg { padding: var(--space-3) var(--space-6); font-size: var(--text-lg); }

/* States */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button:focus {
  outline: 2px solid var(--color-highlight);
  outline-offset: 2px;
}
```

---

## 2. Input

### Props
```typescript
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
```

### Styling
```css
.input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  
  font-family: var(--font-system);
  font-size: var(--text-base);
  
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel-inset);
}

.input:focus {
  outline: none;
  border-color: var(--color-highlight);
}

.input.error {
  border-color: var(--color-error);
}

.input:disabled {
  background: var(--color-surface);
  color: var(--color-text-disabled);
}
```

---

## 3. Checkbox

### Props
```typescript
interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}
```

### Styling
```css
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: default;
}

.checkboxInput {
  appearance: none;
  width: 12px;
  height: 12px;
  
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel-inset);
}

.checkboxInput:checked {
  background: var(--color-content-bg);
}

.checkboxInput:checked::after {
  content: '✓';
  display: block;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 10px;
}

.checkboxInput:indeterminate::after {
  content: '-';
}

.checkboxLabel {
  font-size: var(--text-sm);
}
```

---

## 4. Radio

### Props
```typescript
interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label?: string;
}
```

### Styling
```css
.radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.radioInput {
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel-inset);
}

.radioInput:checked {
  background: radial-gradient(
    circle,
    var(--color-text) 40%,
    var(--color-content-bg) 40%
  );
}
```

---

## 5. Select

### Props
```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'children'> {
  options: SelectOption[];
  placeholder?: string;
}
```

### Styling
```css
.select {
  appearance: none;
  padding: var(--space-2) var(--space-6) var(--space-2) var(--space-3);
  
  font-family: var(--font-system);
  font-size: var(--text-base);
  
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel-raised);
  
  cursor: default;
}

.selectWrapper {
  position: relative;
  display: inline-block;
}

.selectArrow {
  position: absolute;
  right: var(--space-2);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  
  /* Klassischer Dropdown-Pfeil */
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--color-text);
}
```

---

## 6. Icon

### Props
```typescript
type IconName = 
  | 'folder' | 'file' | 'trash' | 'user'
  | 'settings' | 'search' | 'close' | 'check'
  | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-down'
  | 'edit' | 'delete' | 'add' | 'minus'
  | 'alert' | 'info' | 'warning' | 'error'
  | 'dashboard' | 'report' | 'save' | 'print';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}
```

### Icon Sizes
```css
.icon.sm { width: 12px; height: 12px; }
.icon.md { width: 16px; height: 16px; }
.icon.lg { width: 24px; height: 24px; }
.icon.xl { width: 32px; height: 32px; }

.icon {
  display: inline-block;
  vertical-align: middle;
  image-rendering: pixelated; /* Für authentischen Retro-Look */
}
```

---

## 7. Text

### Props
```typescript
type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'small' | 'mono';

interface TextProps {
  variant?: TextVariant;
  weight?: 'normal' | 'bold';
  color?: 'default' | 'muted' | 'error' | 'success';
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
}
```

### Styling
```css
.h1 { font-size: var(--text-2xl); font-weight: var(--font-bold); }
.h2 { font-size: var(--text-xl); font-weight: var(--font-bold); }
.h3 { font-size: var(--text-lg); font-weight: var(--font-bold); }
.body { font-size: var(--text-base); }
.label { font-size: var(--text-sm); font-weight: var(--font-bold); }
.small { font-size: var(--text-xs); }
.mono { font-family: var(--font-mono); font-size: var(--text-sm); }

.muted { color: var(--color-text-secondary); }
.error { color: var(--color-error); }
.success { color: var(--color-success); }
```

---

## 8. Badge

### Props
```typescript
type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}
```

### Styling
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  
  border: 1px solid currentColor;
  border-radius: var(--border-radius-sm);
}

.default { background: var(--color-surface); color: var(--color-text); }
.success { background: var(--color-success-light); color: var(--color-success); }
.warning { background: var(--color-warning-light); color: var(--color-warning-dark); }
.error { background: var(--color-error-light); color: var(--color-error); }
.info { background: var(--color-highlight-light); color: var(--color-highlight); }
```

---

## 9. ProgressBar

### Props
```typescript
interface ProgressBarProps {
  value: number; // 0-100
  variant?: 'default' | 'striped';
  showLabel?: boolean;
}
```

### Styling (Candy Stripe!)
```css
.progressBar {
  width: 100%;
  height: 12px;
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel-inset);
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: var(--color-highlight);
  transition: width 200ms;
}

/* Classic Candy Stripe Animation */
.striped .progressFill {
  background: repeating-linear-gradient(
    -45deg,
    var(--color-highlight) 0px,
    var(--color-highlight) 8px,
    var(--color-highlight-dark) 8px,
    var(--color-highlight-dark) 16px
  );
  background-size: 22px 100%;
  animation: progressStripe 500ms linear infinite;
}

@keyframes progressStripe {
  0% { background-position: 0 0; }
  100% { background-position: 22px 0; }
}
```

---

## 10. Divider

### Props
```typescript
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}
```

### Styling
```css
.divider {
  border: none;
  background: none;
}

.horizontal {
  width: 100%;
  height: 2px;
  background: linear-gradient(
    to bottom,
    var(--color-bevel-dark),
    var(--color-bevel-light)
  );
}

.vertical {
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to right,
    var(--color-bevel-dark),
    var(--color-bevel-light)
  );
}
```

---

## 11. Spinner

### Props
```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}
```

### Styling (Classic "Beach Ball" Style)
```css
.spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.sm { width: 16px; height: 16px; }
.md { width: 24px; height: 24px; }
.lg { width: 32px; height: 32px; }

.spinner {
  background: conic-gradient(
    #FF0000 0deg 60deg,
    #00FF00 60deg 120deg,
    #0000FF 120deg 180deg,
    #FFFF00 180deg 240deg,
    #FF00FF 240deg 300deg,
    #00FFFF 300deg 360deg
  );
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Dateien

```
src/components/atoms/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   └── index.ts
├── Input/
├── Checkbox/
├── Radio/
├── Select/
├── Icon/
├── Text/
├── Badge/
├── ProgressBar/
├── Divider/
├── Spinner/
└── index.ts (Barrel Export)
```

## Akzeptanzkriterien

- [ ] Alle 11 Atoms implementiert
- [ ] Konsistente Verwendung von Design Tokens
- [ ] Keine hardcoded Farben/Größen
- [ ] Alle Varianten funktionieren
- [ ] Keyboard-Accessible (Focus States)
- [ ] Typisierte Props für alle Komponenten
- [ ] Barrel Export in index.ts

---

*Geschätzte Dauer: 1.5 Stunden*
