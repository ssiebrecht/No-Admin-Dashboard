/**
 * Organisms - Complex UI sections with business logic
 * 
 * Components to be added:
 * - Sidebar
 */

// Export organisms here as they are created
export * from './Window';
export * from './MenuBar';
export * from './Desktop';

// Dialog System
export * from './Dialog';
export * from './AlertDialog';
export * from './ConfirmDialog';
export * from './PromptDialog';

// File Browser
export * from './FileList';
export * from './FileBrowser';
export * from './GetInfoDialog';

// User Management
export * from './UserList';
export * from './UserDetail';
export * from './UserFormDialog';
export * from './ChangePasswordDialog';
export * from './UserManagement';

// Control Panels
export * from './ControlPanelGrid';
export * from './ControlPanels';

// Control Panel Sub-Panels
export { AppearancePanel } from './panels/AppearancePanel';
export { SoundPanel } from './panels/SoundPanel';
export { DateTimePanel } from './panels/DateTimePanel';
export { MemoryPanel } from './panels/MemoryPanel';
export { DisplayPanel } from './panels/DisplayPanel';

// Activity Monitor Panels
export { CPUPanel } from './panels/CPUPanel';
export { ActivityMemoryPanel } from './panels/ActivityMemoryPanel';
export { DiskPanel } from './panels/DiskPanel';
export { NetworkPanel } from './panels/NetworkPanel';

// Process List
export * from './ProcessList';

// Activity Monitor
export * from './ActivityMonitor';

// Dashboard
export * from './RecentActivity';
export * from './Dashboard';

// Notifications
export * from './ToastContainer';
export * from './NotificationCenter';
