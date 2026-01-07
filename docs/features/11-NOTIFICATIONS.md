# 🔔 Feature 11: Notification System

## Übersicht

Das Benachrichtigungssystem zeigt System-Alerts, Erfolgs- und Fehlermeldungen im klassischen Mac OS Stil. Es umfasst Toast-Notifications und ein Notification Center.

## Abhängigkeiten

- **Benötigt**: Atoms (04), Design Tokens (01)
- **Blockiert**: None

## Notification-Typen

| Typ | Icon | Verwendung | Auto-Dismiss |
|-----|------|------------|--------------|
| Success | ✅ | Erfolgreiche Aktionen | 3 Sekunden |
| Error | ❌ | Fehler | Manuell |
| Warning | ⚠️ | Warnungen | 5 Sekunden |
| Info | ℹ️ | Informationen | 4 Sekunden |

## Toast Notification

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   ✅  User created successfully                      [✕]  │
│       jane.smith has been added to the system             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Notification Center (Im Menü)

```
┌────────────────────────────────────────────────────────────┐
│ 🔔 Notifications                                      │ 3 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ⚠️  Storage Warning                        2 min ago │ │
│  │    Disk space is running low (15% remaining)         │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ℹ️  System Update                         15 min ago │ │
│  │    A new update is available                         │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ✅  Backup Complete                          1 hr ago │ │
│  │    System backup completed successfully              │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                      [Clear All]                           │
└────────────────────────────────────────────────────────────┘
```

## Komponenten

### 1. Toast (Molecule)

```typescript
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // ms, 0 = no auto-dismiss
  onClose: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### 2. ToastContainer (Organism)

```typescript
interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
```

### 3. NotificationCenter (Organism)

```typescript
interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}
```

### 4. NotificationItem (Molecule)

```typescript
interface NotificationItemProps {
  notification: Notification;
  onDismiss: () => void;
  onClick?: () => void;
}
```

### 5. NotificationBadge (Atom)

```typescript
interface NotificationBadgeProps {
  count: number;
  max?: number; // Default: 9 (zeigt "9+" bei mehr)
}
```

## Toast Styling

```css
.toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  
  min-width: 300px;
  max-width: 400px;
  padding: var(--space-3) var(--space-4);
  
  background: var(--color-window-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-dialog);
  
  animation: toastSlideIn 200ms ease-out;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toastSlideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.toast.exiting {
  animation: toastSlideOut 150ms ease-in forwards;
}

.toastIcon {
  font-size: 20px;
  flex-shrink: 0;
}

.toastContent {
  flex: 1;
}

.toastTitle {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-1);
}

.toastMessage {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.toastClose {
  flex-shrink: 0;
  padding: var(--space-1);
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.5;
}

.toastClose:hover {
  opacity: 1;
}

/* Type Variants - Left Border Accent */
.toast.success {
  border-left: 3px solid var(--color-success);
}

.toast.error {
  border-left: 3px solid var(--color-error);
}

.toast.warning {
  border-left: 3px solid var(--color-warning);
}

.toast.info {
  border-left: 3px solid var(--color-highlight);
}
```

## Toast Container

```css
.toastContainer {
  position: fixed;
  z-index: var(--z-notification);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.toastContainer.topRight {
  top: var(--space-6);
  right: var(--space-4);
}

.toastContainer.topLeft {
  top: var(--space-6);
  left: var(--space-4);
}

.toastContainer.bottomRight {
  bottom: var(--space-6);
  right: var(--space-4);
}

.toastContainer.bottomLeft {
  bottom: var(--space-6);
  left: var(--space-4);
}
```

## Notification Center Styling

```css
.notificationCenter {
  position: fixed;
  top: 20px; /* Unter Menüleiste */
  right: var(--space-2);
  
  width: 320px;
  max-height: 400px;
  
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-menu);
  
  z-index: var(--z-menu-dropdown);
}

.notificationHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border);
  font-weight: var(--font-bold);
  font-size: var(--text-sm);
}

.notificationList {
  max-height: 300px;
  overflow-y: auto;
  padding: var(--space-2);
}

.notificationItem {
  padding: var(--space-2);
  margin-bottom: var(--space-2);
  background: var(--color-content-bg);
  border: 1px solid var(--color-border-light);
  cursor: pointer;
}

.notificationItem:hover {
  background: var(--color-surface);
}

.notificationItem.unread {
  border-left: 2px solid var(--color-highlight);
}

.notificationItemHeader {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-1);
}

.notificationItemIcon {
  font-size: 14px;
}

.notificationItemTitle {
  flex: 1;
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
}

.notificationItemTime {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.notificationItemMessage {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  margin-left: 22px; /* Aligned with title */
}

.notificationFooter {
  padding: var(--space-2);
  border-top: 1px solid var(--color-border);
  text-align: center;
}
```

## Notification Badge

```css
.notificationBadge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  min-width: 16px;
  height: 16px;
  padding: 0 var(--space-1);
  
  background: var(--color-error);
  color: white;
  
  font-size: 10px;
  font-weight: var(--font-bold);
  
  border-radius: var(--border-radius-full);
}
```

## State Management

```typescript
// types/notification.ts
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// store/notificationStore.ts
interface NotificationStore {
  // Persistent Notifications (Notification Center)
  notifications: Notification[];
  unreadCount: number;
  
  // Transient Toasts
  toasts: Toast[];
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  
  // Toast Actions
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}
```

## Toast Hook

```typescript
// hooks/useToast.ts
interface UseToastReturn {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  custom: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export const useToast = (): UseToastReturn => {
  const { showToast, dismissToast } = useNotificationStore();
  
  const success = (title: string, message?: string) => {
    showToast({ type: 'success', title, message, duration: 3000 });
  };
  
  const error = (title: string, message?: string) => {
    showToast({ type: 'error', title, message, duration: 0 }); // No auto-dismiss
  };
  
  // ...
  
  return { success, error, warning, info, custom, dismiss, dismissAll };
};
```

## Verwendungsbeispiele

```typescript
// In einer Komponente
const toast = useToast();

// Nach erfolgreicher User-Erstellung
const handleCreateUser = async (data: UserFormData) => {
  try {
    await userStore.createUser(data);
    toast.success('User created', `${data.fullName} has been added`);
  } catch (error) {
    toast.error('Failed to create user', error.message);
  }
};

// Für persistente Notifications
const notificationStore = useNotificationStore();

// System-Warnung
notificationStore.addNotification({
  type: 'warning',
  title: 'Storage Warning',
  message: 'Disk space is running low (15% remaining)',
});
```

## Time Formatting

```typescript
// utils/timeFormat.ts
export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return then.toLocaleDateString();
};
```

## Dateien

```
src/
├── components/
│   ├── atoms/
│   │   └── NotificationBadge/
│   │
│   ├── molecules/
│   │   ├── Toast/
│   │   └── NotificationItem/
│   │
│   └── organisms/
│       ├── ToastContainer/
│       └── NotificationCenter/
│
├── store/
│   └── notificationStore.ts
│
├── hooks/
│   └── useToast.ts
│
├── utils/
│   └── timeFormat.ts
│
└── types/
    └── notification.ts
```

## Akzeptanzkriterien

- [ ] Toast-Benachrichtigungen für alle 4 Typen
- [ ] Auto-Dismiss nach konfigurierbarer Zeit
- [ ] Manuelles Dismiss per X-Button
- [ ] Toast-Stack (mehrere gleichzeitig)
- [ ] Slide-In/Out Animation
- [ ] Notification Center in der Menüleiste
- [ ] Unread Badge mit Count
- [ ] Mark as Read
- [ ] Clear All Funktion
- [ ] Time Ago Formatierung
- [ ] useToast Hook für einfache Verwendung
- [ ] Persistenz der Notifications

---

*Geschätzte Dauer: 1 Stunde*
