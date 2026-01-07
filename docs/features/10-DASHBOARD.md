# 📊 Feature 10: Dashboard Widgets

## Übersicht

Das Dashboard-Fenster zeigt eine Übersicht aller wichtigen Informationen in Form von Widgets. Es bietet Quick Actions und stellt die "Startseite" des Admin-Dashboards dar.

## Abhängigkeiten

- **Benötigt**: Window System (02), Atoms (04), Molecules (05), andere Stores
- **Blockiert**: None

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░  📊 Dashboard  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       Welcome back, Admin!                          │   │
│  │                    Tuesday, January 7, 2026                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │ 👥               │  │ 📁               │  │ 💾               │            │
│  │      Users       │  │     Files        │  │     Storage      │            │
│  │                  │  │                  │  │                  │            │
│  │      127         │  │     2,456        │  │    234 GB        │            │
│  │   ↑ 12 today     │  │   ↑ 45 new       │  │   278 GB free    │            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘            │
│                                                                             │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ 📈 Activity Graph                   │  │ ⚡ Quick Actions           │  │
│  │ ─────────────────────────────────── │  │ ─────────────────────────── │  │
│  │                                     │  │                             │  │
│  │     ▄                               │  │  [👤 New User]              │  │
│  │    ▄█   ▄                           │  │                             │  │
│  │   ▄██  ▄█▄  ▄                       │  │  [📁 New Folder]            │  │
│  │  ▄███ ▄███ ▄█   ▄                   │  │                             │  │
│  │ ▄████▄████▄██▄ ▄█▄  ▄               │  │  [📊 View Reports]          │  │
│  │ Mo Di Mi Do Fr Sa So                │  │                             │  │
│  │                                     │  │  [⚙️ Settings]              │  │
│  │ Logins this week: 342               │  │                             │  │
│  └─────────────────────────────────────┘  └─────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🕐 Recent Activity                                                  │   │
│  │ ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                     │   │
│  │  14:32  👤 John Doe logged in                                       │   │
│  │  14:28  📁 New folder "Reports" created by Admin                    │   │
│  │  14:15  👤 New user "jane.smith" created                            │   │
│  │  13:45  ⚙️ Settings updated by Admin                                │   │
│  │  13:30  🗑️ File "old_data.csv" moved to Trash                      │   │
│  │                                                                     │   │
│  │                              [View All Activity →]                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ Last updated: Just now │ System Status: ● Online                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Widget-Typen

| Widget | Beschreibung | Größe |
|--------|--------------|-------|
| WelcomeBanner | Begrüßung mit Datum | Full Width |
| StatCard | Einzelne Statistik | 1/3 Width |
| ActivityGraph | Wochen-Balkendiagramm | 1/2 Width |
| QuickActions | Action-Buttons | 1/2 Width |
| RecentActivity | Aktivitäts-Feed | Full Width |
| SystemStatus | Server/System Status | Varies |

## Komponenten

### 1. Dashboard (Page/Organism)

```typescript
interface DashboardProps {
  // Optional: Refresh callback
  onRefresh?: () => void;
}
```

### 2. WelcomeBanner (Molecule)

```typescript
interface WelcomeBannerProps {
  userName: string;
  greeting?: string;
}
```

```css
.welcomeBanner {
  background: linear-gradient(135deg, var(--color-highlight), var(--color-highlight-dark));
  color: white;
  padding: var(--space-6);
  text-align: center;
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel-raised);
}

.welcomeName {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
}

.welcomeDate {
  font-size: var(--text-sm);
  opacity: 0.9;
}
```

### 3. StatCard (Molecule)

```typescript
interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  onClick?: () => void;
}
```

```
┌─────────────────────┐
│  👥                 │  ← Icon
│                     │
│     Users           │  ← Label
│                     │
│      127            │  ← Value (groß)
│   ↑ 12 today        │  ← Trend/Subtitle
└─────────────────────┘
```

```css
.statCard {
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel-raised);
  padding: var(--space-4);
  text-align: center;
  cursor: pointer;
  transition: transform 100ms;
}

.statCard:hover {
  background: var(--color-surface);
}

.statCard:active {
  box-shadow: var(--bevel-inset);
}

.statIcon {
  font-size: 32px;
  margin-bottom: var(--space-2);
}

.statLabel {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.statValue {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-1);
}

.statTrend {
  font-size: var(--text-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
}

.statTrend.up { color: var(--color-success); }
.statTrend.down { color: var(--color-error); }
.statTrend.neutral { color: var(--color-text-secondary); }
```

### 4. ActivityGraph (Molecule)

```typescript
interface ActivityGraphProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  title: string;
  summary?: string;
}
```

```
┌────────────────────────────────────┐
│ 📈 Activity Graph                  │
│ ────────────────────────────────── │
│                                    │
│      ▄                             │
│     ▄█   ▄                         │
│    ▄██  ▄█▄  ▄                     │
│   ▄███ ▄███ ▄█   ▄                 │
│  ▄████▄████▄██▄ ▄█▄  ▄             │
│  Mo Di Mi Do Fr Sa So              │
│                                    │
│ Logins this week: 342              │
└────────────────────────────────────┘
```

```css
.activityGraph {
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  padding: var(--space-4);
}

.graphTitle {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.graphBars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100px;
  padding: 0 var(--space-2);
  margin-bottom: var(--space-2);
}

.graphBar {
  width: 20px;
  background: var(--color-highlight);
  border: 1px solid var(--color-highlight-dark);
  box-shadow: var(--bevel-raised);
}

.graphLabels {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.graphSummary {
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border-light);
  padding-top: var(--space-2);
}
```

### 5. QuickActions (Molecule)

```typescript
interface QuickAction {
  id: string;
  icon: string;
  label: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}
```

```css
.quickActions {
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  padding: var(--space-4);
}

.quickActionsTitle {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-3);
}

.quickActionsList {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.quickActionButton {
  text-align: left;
  justify-content: flex-start;
}
```

### 6. RecentActivity (Organism)

```typescript
interface ActivityItem {
  id: string;
  time: string;
  icon: string;
  message: string;
  type: 'user' | 'file' | 'system' | 'settings';
}

interface RecentActivityProps {
  activities: ActivityItem[];
  maxItems?: number;
  onViewAll?: () => void;
}
```

```css
.recentActivity {
  background: var(--color-content-bg);
  border: 1px solid var(--color-border);
  padding: var(--space-4);
}

.activityTitle {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-3);
}

.activityList {
  display: flex;
  flex-direction: column;
}

.activityItem {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: var(--text-sm);
}

.activityItem:last-child {
  border-bottom: none;
}

.activityTime {
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  width: 50px;
  flex-shrink: 0;
}

.activityIcon {
  font-size: 16px;
}

.activityMessage {
  flex: 1;
}

.viewAllLink {
  text-align: center;
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border-light);
}
```

### 7. SystemStatus (Atom)

```typescript
interface SystemStatusProps {
  status: 'online' | 'offline' | 'warning';
  label: string;
}
```

```css
.systemStatus {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}

.statusDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.statusDot.online { background: var(--color-success); }
.statusDot.offline { background: var(--color-error); }
.statusDot.warning { background: var(--color-warning); }
```

## Dashboard State

```typescript
// store/dashboardStore.ts
interface DashboardStats {
  users: {
    total: number;
    newToday: number;
  };
  files: {
    total: number;
    newToday: number;
  };
  storage: {
    used: number;
    available: number;
  };
}

interface DashboardStore {
  stats: DashboardStats;
  activities: ActivityItem[];
  weeklyActivity: number[];
  isLoading: boolean;
  lastUpdated: string | null;
  
  fetchDashboardData: () => Promise<void>;
  refreshStats: () => Promise<void>;
}
```

## Mock-Daten

```typescript
// data/mockDashboard.ts
export const mockStats: DashboardStats = {
  users: {
    total: 127,
    newToday: 12,
  },
  files: {
    total: 2456,
    newToday: 45,
  },
  storage: {
    used: 234,
    available: 278,
  },
};

export const mockWeeklyActivity = [42, 65, 38, 82, 53, 28, 34];

export const mockActivities: ActivityItem[] = [
  {
    id: '1',
    time: '14:32',
    icon: '👤',
    message: 'John Doe logged in',
    type: 'user',
  },
  {
    id: '2',
    time: '14:28',
    icon: '📁',
    message: 'New folder "Reports" created by Admin',
    type: 'file',
  },
  // ...
];
```

## Quick Actions

```typescript
const defaultQuickActions: QuickAction[] = [
  {
    id: 'new-user',
    icon: '👤',
    label: 'New User',
    onClick: () => openWindow('user-management'),
  },
  {
    id: 'new-folder',
    icon: '📁',
    label: 'New Folder',
    onClick: () => openWindow('file-browser'),
  },
  {
    id: 'view-reports',
    icon: '📊',
    label: 'View Reports',
    onClick: () => openWindow('reports'),
  },
  {
    id: 'settings',
    icon: '⚙️',
    label: 'Settings',
    onClick: () => openWindow('control-panels'),
  },
];
```

## Grid Layout

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  padding: var(--space-4);
}

.dashboard > .welcomeBanner {
  grid-column: 1 / -1; /* Full width */
}

.dashboard > .statCard {
  /* 1/3 width (default grid cell) */
}

.dashboard > .activityGraph,
.dashboard > .quickActions {
  grid-column: span 2; /* Half width on 6-col, adapt as needed */
}

.dashboard > .recentActivity {
  grid-column: 1 / -1; /* Full width */
}

/* Responsive */
@media (max-width: 800px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
  
  .dashboard > * {
    grid-column: 1 / -1;
  }
}
```

## Dateien

```
src/
├── components/
│   ├── atoms/
│   │   └── SystemStatus/
│   │
│   ├── molecules/
│   │   ├── WelcomeBanner/
│   │   ├── StatCard/
│   │   ├── ActivityGraph/
│   │   └── QuickActions/
│   │
│   └── organisms/
│       ├── RecentActivity/
│       └── Dashboard/
│
├── store/
│   └── dashboardStore.ts
│
└── data/
    └── mockDashboard.ts
```

## Akzeptanzkriterien

- [ ] Welcome Banner mit Name und Datum
- [ ] 3 StatCards (Users, Files, Storage)
- [ ] Activity Graph mit Wochendaten
- [ ] Quick Actions Liste
- [ ] Recent Activity Feed
- [ ] "View All" Link für Activities
- [ ] System Status Anzeige
- [ ] Responsive Grid Layout
- [ ] Auto-Refresh Option
- [ ] Klickbare Stat Cards öffnen entsprechende Fenster

---

*Geschätzte Dauer: 1.5 Stunden*
