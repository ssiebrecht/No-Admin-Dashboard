# 👥 Feature 08: User Management

## Übersicht

Das User Management ermöglicht die vollständige Verwaltung von Benutzern im klassischen Mac OS Stil. Es umfasst eine Benutzerübersicht, Detail-Ansichten, und CRUD-Operationen.

## Abhängigkeiten

- **Benötigt**: Window System (02), Atoms (04), Molecules (05), Dialogs (06)
- **Blockiert**: None

## Benutzer-Fenster Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░  👥 Users & Groups  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────────────────────────────────────────────────┤
│ [👤 New User] [🗑️ Delete] [✏️ Edit] │ 🔍 Search users...                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ┌───────────────────────────────────┬─────────────────────────────────────┐ │
│ │ Users                             │ User Details                        │ │
│ ├───────────────────────────────────┼─────────────────────────────────────┤ │
│ │                                   │                                     │ │
│ │ 👤 John Doe            ● Admin    │      👤                             │ │
│ │ 👤 Jane Smith          ○ User   ◄─┼──────                               │ │
│ │ 👤 Mike Johnson        ○ Mod      │    Jane Smith                       │ │
│ │ 👤 Sarah Wilson        ○ User     │    jane.smith@company.com           │ │
│ │ 👤 Tom Brown           ○ User     │                                     │ │
│ │                                   │    ─────────────────────────────    │ │
│ │                                   │                                     │ │
│ │                                   │    Role:     User                   │ │
│ │                                   │    Status:   🟢 Active              │ │
│ │                                   │    Created:  Jan 3, 2026            │ │
│ │                                   │    Last Login: Today, 14:32         │ │
│ │                                   │                                     │ │
│ │                                   │    ─────────────────────────────    │ │
│ │                                   │                                     │ │
│ │                                   │    [Change Password] [Edit User]    │ │
│ │                                   │                                     │ │
│ └───────────────────────────────────┴─────────────────────────────────────┘ │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5 users total │ 1 admin, 1 moderator, 3 users │ Last updated: Just now     │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Komponenten

### 1. UserManagement (Page/Organism)

```typescript
interface UserManagementProps {
  // Optional: Pre-select a user
  selectedUserId?: string;
}
```

### 2. UserList (Organism)

```typescript
interface UserListProps {
  users: User[];
  selectedUserId: string | null;
  onSelect: (userId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterRole: Role | 'all';
  onFilterChange: (role: Role | 'all') => void;
}
```

### 3. UserListItem (Molecule)

```typescript
interface UserListItemProps {
  user: User;
  selected?: boolean;
  onClick: () => void;
}
```

### 4. UserDetail (Organism)

```typescript
interface UserDetailProps {
  user: User | null;
  onEdit: (user: User) => void;
  onChangePassword: (userId: string) => void;
  onDelete: (userId: string) => void;
}
```

### 5. UserForm (Organism)

```typescript
interface UserFormProps {
  user?: User; // Undefined = Create Mode
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

interface UserFormData {
  username: string;
  fullName: string;
  email: string;
  role: Role;
  isActive: boolean;
  password?: string; // Nur bei Create
}
```

### 6. UserFormDialog (Organism)

```typescript
interface UserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onSave: (data: UserFormData) => void;
}
```

## User Form Dialog

```
┌─────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░  New User  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   👤  Create a new user account                                │
│                                                                 │
│   ─────────────────────────────────────────────────────────    │
│                                                                 │
│   Full Name *                                                   │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                                                         │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   Username *                                                    │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                                                         │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   Email *                                                       │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                                                         │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   Password *                                                    │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ ••••••••                                                │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   Role                                                          │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ User                                                 ▼  │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ☑ Account is active                                          │
│                                                                 │
│   ─────────────────────────────────────────────────────────    │
│                                                                 │
│                                      ┌─────────────────────┐   │
│                                      │       Cancel        │   │
│                                      └─────────────────────┘   │
│                                      ┌─────────────────────┐   │
│                                      │    Create User      │   │
│                                      └─────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Change Password Dialog

```
┌────────────────────────────────────────────────────┐
│ ░░░░░░░░░░  Change Password  ░░░░░░░░░░░░░░░░░░░ │
├────────────────────────────────────────────────────┤
│                                                    │
│   🔑  Change password for: jane.smith             │
│                                                    │
│   ───────────────────────────────────────────     │
│                                                    │
│   New Password *                                   │
│   ┌──────────────────────────────────────────┐    │
│   │ ••••••••                                 │    │
│   └──────────────────────────────────────────┘    │
│                                                    │
│   Confirm Password *                               │
│   ┌──────────────────────────────────────────┐    │
│   │ ••••••••                                 │    │
│   └──────────────────────────────────────────┘    │
│                                                    │
│   ☐ Force password change on next login          │
│                                                    │
│                          ┌───────────────────┐    │
│                          │      Cancel       │    │
│                          └───────────────────┘    │
│                          ┌───────────────────┐    │
│                          │  Change Password  │    │
│                          └───────────────────┘    │
│                                                    │
└────────────────────────────────────────────────────┘
```

## Datentypen

```typescript
// types/user.ts
type Role = 'admin' | 'moderator' | 'user';

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: Role;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

interface UserFormData {
  username: string;
  fullName: string;
  email: string;
  role: Role;
  isActive: boolean;
  password?: string;
}
```

## State Management

```typescript
// store/userStore.ts
interface UserStore {
  // Data
  users: User[];
  selectedUserId: string | null;
  
  // UI State
  searchQuery: string;
  filterRole: Role | 'all';
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUsers: () => Promise<void>;
  selectUser: (id: string | null) => void;
  
  createUser: (data: UserFormData) => Promise<User>;
  updateUser: (id: string, data: Partial<UserFormData>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  changePassword: (id: string, password: string) => Promise<void>;
  toggleUserActive: (id: string) => Promise<void>;
  
  setSearchQuery: (query: string) => void;
  setFilterRole: (role: Role | 'all') => void;
  
  // Computed
  getFilteredUsers: () => User[];
  getUserById: (id: string) => User | undefined;
}
```

## Mock-Daten

```typescript
// data/mockUsers.ts
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'jdoe',
    fullName: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    createdAt: '2025-06-15T10:00:00Z',
    lastLogin: '2026-01-07T14:32:00Z',
    isActive: true,
  },
  {
    id: '2',
    username: 'jsmith',
    fullName: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'user',
    createdAt: '2025-08-20T09:00:00Z',
    lastLogin: '2026-01-07T11:15:00Z',
    isActive: true,
  },
  {
    id: '3',
    username: 'mjohnson',
    fullName: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'moderator',
    createdAt: '2025-10-01T14:00:00Z',
    lastLogin: '2026-01-06T16:45:00Z',
    isActive: true,
  },
  {
    id: '4',
    username: 'swilson',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'user',
    createdAt: '2025-11-10T11:00:00Z',
    lastLogin: '2026-01-05T09:20:00Z',
    isActive: true,
  },
  {
    id: '5',
    username: 'tbrown',
    fullName: 'Tom Brown',
    email: 'tom.brown@company.com',
    role: 'user',
    createdAt: '2025-12-01T08:00:00Z',
    lastLogin: null,
    isActive: false,
  },
];
```

## Role Badges

```typescript
const roleBadges: Record<Role, { label: string; variant: BadgeVariant }> = {
  admin: { label: 'Admin', variant: 'error' },
  moderator: { label: 'Moderator', variant: 'warning' },
  user: { label: 'User', variant: 'default' },
};
```

## Styling

### User List
```css
.userList {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border);
  height: 100%;
  overflow-y: auto;
}

.userListItem {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
  cursor: default;
}

.userListItem:hover {
  background: var(--color-surface);
}

.userListItem.selected {
  background: var(--color-highlight);
  color: var(--color-highlight-text);
}

.userAvatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
}

.userName {
  flex: 1;
  font-size: var(--text-sm);
}

.userRole {
  font-size: var(--text-xs);
}
```

### User Detail
```css
.userDetail {
  padding: var(--space-6);
  height: 100%;
  overflow-y: auto;
}

.userDetailHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: var(--space-6);
}

.userDetailAvatar {
  width: 64px;
  height: 64px;
  font-size: 32px;
  margin-bottom: var(--space-3);
}

.userDetailName {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
}

.userDetailEmail {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.userDetailSection {
  margin-bottom: var(--space-4);
}

.userDetailRow {
  display: flex;
  justify-content: space-between;
  padding: var(--space-2) 0;
  font-size: var(--text-sm);
  border-bottom: 1px solid var(--color-border-light);
}

.userDetailLabel {
  color: var(--color-text-secondary);
}

.userDetailValue {
  font-weight: var(--font-bold);
}
```

## Validierung

```typescript
interface ValidationErrors {
  username?: string;
  fullName?: string;
  email?: string;
  password?: string;
}

const validateUserForm = (data: UserFormData, isCreate: boolean): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }
  
  if (!data.username.trim()) {
    errors.username = 'Username is required';
  } else if (!/^[a-z0-9_]+$/.test(data.username)) {
    errors.username = 'Username can only contain lowercase letters, numbers, and underscores';
  }
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (isCreate && (!data.password || data.password.length < 8)) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return errors;
};
```

## Dateien

```
src/
├── components/
│   ├── molecules/
│   │   └── UserListItem/
│   │
│   └── organisms/
│       ├── UserList/
│       ├── UserDetail/
│       ├── UserForm/
│       ├── UserFormDialog/
│       ├── ChangePasswordDialog/
│       └── UserManagement/
│
├── store/
│   └── userStore.ts
│
├── data/
│   └── mockUsers.ts
│
├── utils/
│   └── userValidation.ts
│
└── types/
    └── user.ts
```

## Akzeptanzkriterien

- [ ] Benutzerliste mit Suche und Filter
- [ ] Benutzerdetails bei Auswahl
- [ ] Neuen Benutzer erstellen
- [ ] Benutzer bearbeiten
- [ ] Benutzer löschen (mit Bestätigung)
- [ ] Passwort ändern
- [ ] Benutzer aktivieren/deaktivieren
- [ ] Rollen-Badges (Admin, Mod, User)
- [ ] Formular-Validierung
- [ ] Leerer Zustand bei keiner Auswahl
- [ ] Sortierung nach Name
- [ ] Persist im localStorage

---

*Geschätzte Dauer: 1.5 Stunden*
