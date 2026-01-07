import { type FC, useCallback, useEffect } from 'react';
import { Window } from './components/organisms/Window';
import { MenuBar } from './components/organisms/MenuBar';
import { Desktop } from './components/organisms/Desktop';
import { FileBrowser } from './components/organisms/FileBrowser';
import { UserManagement } from './components/organisms/UserManagement';
import { ControlPanels } from './components/organisms/ControlPanels';
import { Dashboard } from './components/organisms/Dashboard';
import { ToastContainer } from './components/organisms/ToastContainer';
import {
  AppearancePanel,
  SoundPanel,
  DateTimePanel,
  MemoryPanel,
  DisplayPanel,
} from './components/organisms/panels';
import { Button } from './components/atoms/Button';
import { useWindowStore } from './store/windowStore';
import { useDialog } from './hooks/useDialog';
import { useToast } from './hooks/useToast';
import { useSettingsStore } from './store/settingsStore';
import { HIGHLIGHT_COLORS } from './data/controlPanels';
import type { MenuItem } from './types/menu';
import type { DesktopIconData } from './types/desktop';
import styles from './App.module.css';

/**
 * Mac OS 8/9 Admin Dashboard
 * Main Application Component with Desktop Shell
 */
const FONT_SIZE_MAP = {
  small: {
    '--text-xs': '8px',
    '--text-sm': '9px',
    '--text-base': '10px',
    '--text-lg': '12px',
    '--text-xl': '14px',
    '--text-2xl': '18px',
  },
  medium: {
    '--text-xs': '9px',
    '--text-sm': '10px',
    '--text-base': '12px',
    '--text-lg': '14px',
    '--text-xl': '18px',
    '--text-2xl': '24px',
  },
  large: {
    '--text-xs': '10px',
    '--text-sm': '12px',
    '--text-base': '14px',
    '--text-lg': '16px',
    '--text-xl': '22px',
    '--text-2xl': '28px',
  },
};

const App: FC = () => {
  const { openWindow, windows } = useWindowStore();
  const dialog = useDialog();
  const toast = useToast();
  const { settings } = useSettingsStore();
  const { theme, highlightColor, fontSize } = settings.appearance;

  // Open Dashboard on first load if no windows are open
  useEffect(() => {
    // Only auto-open dashboard if no windows exist
    if (windows.length === 0) {
      openWindow({
        id: 'dashboard',
        title: 'Dashboard',
        icon: '📊',
        initialPosition: { x: 100, y: 60 },
        initialSize: { width: 900, height: 775 }, // Höhe um 75px erhöht
      });
    }
  }, []); // Empty deps - only run on mount

  // Dynamische Anwendung von Theme, Highlight und Fontgröße
  useEffect(() => {
    // Theme: data-theme Attribut setzen
    document.documentElement.setAttribute('data-theme', theme);

    // Highlight: --color-highlight setzen
    const highlight = HIGHLIGHT_COLORS.find(c => c.id === highlightColor);
    if (highlight) {
      document.documentElement.style.setProperty('--color-highlight', highlight.value);
      // Optional: auch --color-focus, --color-highlight-light/dark setzen, falls gewünscht
    }

    // Fontgrößen: alle relevanten Custom Properties setzen
    const fontMap = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.medium;
    Object.entries(fontMap).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme, highlightColor, fontSize]);

  // Dialog demo handlers
  const handleAlertDemo = async () => {
    await dialog.alert({
      title: 'Welcome to Mac OS 8.6',
      message: 'Your system is ready. Click OK to continue.',
      icon: 'info',
    });
    console.log('Alert closed');
  };

  const handleWarningDemo = async () => {
    await dialog.alert({
      title: 'Low Disk Space',
      message: 'Your startup disk is almost full. Delete files to make room.',
      icon: 'warning',
    });
  };

  const handleErrorDemo = async () => {
    await dialog.alert({
      title: 'An error occurred',
      message: 'The application "Finder" has unexpectedly quit. Error code: -39',
      icon: 'error',
    });
  };

  const handleSuccessDemo = async () => {
    await dialog.alert({
      title: 'File Copied',
      message: 'The file has been copied successfully to the destination folder.',
      icon: 'success',
    });
  };

  const handleConfirmDemo = async () => {
    const confirmed = await dialog.confirm({
      title: 'Empty Trash?',
      message: 'Are you sure you want to permanently erase the items in the Trash?',
      icon: 'question',
      confirmLabel: 'Empty Trash',
      cancelLabel: 'Cancel',
    });
    console.log('Confirmed:', confirmed);
    if (confirmed) {
      await dialog.alert({
        title: 'Trash Emptied',
        message: 'The Trash has been emptied.',
        icon: 'success',
      });
    }
  };

  const handleDangerConfirmDemo = async () => {
    const confirmed = await dialog.confirm({
      title: 'Delete User?',
      message: 'This action cannot be undone. All user data will be permanently removed.',
      icon: 'warning',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      danger: true,
    });
    if (confirmed) {
      console.log('User deleted');
    }
  };

  const handlePromptDemo = async () => {
    const name = await dialog.prompt({
      title: 'Create New Folder',
      message: 'Enter a name for the new folder:',
      inputPlaceholder: 'untitled folder',
      defaultValue: 'New Folder',
      icon: 'question',
      confirmLabel: 'Create',
      cancelLabel: 'Cancel',
      required: true,
    });
    if (name !== null) {
      await dialog.alert({
        title: 'Folder Created',
        message: `Folder "${name}" has been created.`,
        icon: 'success',
      });
    }
  };

  const handleRenameDemo = async () => {
    const newName = await dialog.prompt({
      title: 'Rename Item',
      inputLabel: 'New name:',
      defaultValue: 'My Document.txt',
      icon: 'question',
      confirmLabel: 'Rename',
      cancelLabel: 'Cancel',
      validate: (value) => {
        if (value.includes('/')) {
          return 'Name cannot contain "/"';
        }
        if (value.length > 31) {
          return 'Name must be 31 characters or less';
        }
        return undefined;
      },
    });
    if (newName !== null) {
      console.log('Renamed to:', newName);
    }
  };

  // Handle menu item clicks
  const handleMenuItemClick = useCallback((item: MenuItem) => {
    console.log('Menu item clicked:', item.id);
    
    // Handle specific menu actions
    switch (item.id) {
      case 'about':
        openWindow({
          id: 'about',
          title: 'About This Dashboard',
          icon: '🍎',
          initialPosition: { x: 150, y: 100 },
          initialSize: { width: 350, height: 280 },
        });
        break;
      case 'dashboard':
        openWindow({
          id: 'dashboard',
          title: 'Dashboard',
          icon: '📊',
          initialPosition: { x: 100, y: 60 },
          initialSize: { width: 600, height: 450 },
        });
        break;
      case 'user-management':
        openWindow({
          id: 'user-management',
          title: 'User Management',
          icon: '👥',
          initialPosition: { x: 120, y: 80 },
          initialSize: { width: 550, height: 400 },
        });
        break;
      case 'file-browser':
        openWindow({
          id: 'file-browser',
          title: 'File Browser',
          icon: '📁',
          initialPosition: { x: 140, y: 100 },
          initialSize: { width: 500, height: 350 },
        });
        break;
      case 'activity-monitor':
        openWindow({
          id: 'activity-monitor',
          title: 'Activity Monitor',
          icon: '📈',
          initialPosition: { x: 160, y: 120 },
          initialSize: { width: 600, height: 400 },
        });
        break;
      case 'dialog-demo':
        openWindow({
          id: 'dialog-demo',
          title: 'Dialog Demo',
          icon: '💬',
          initialPosition: { x: 200, y: 80 },
          initialSize: { width: 380, height: 420 },
        });
        break;
      default:
        // Other menu items
        break;
    }
  }, [openWindow]);

  // Handle desktop icon opens
  const handleIconOpen = useCallback((icon: DesktopIconData) => {
    console.log('Desktop icon opened:', icon.id);
  }, []);

  // Mapping window.id zu Inhalt
  const renderWindowContent = (windowId: string) => {
    switch (windowId) {
      case 'dashboard':
        return <Dashboard userName="Admin" />;
      case 'user-management':
        return <UserManagement />;
      case 'file-browser':
        return <FileBrowser />;
      case 'control-panels':
        return <ControlPanels />;
      case 'panel-appearance':
        return <AppearancePanel />;
      case 'panel-sound':
        return <SoundPanel />;
      case 'panel-date-time':
        return <DateTimePanel />;
      case 'panel-memory':
        return <MemoryPanel />;
      case 'panel-display':
        return <DisplayPanel />;
      // ...weitere Fenster hier ergänzen...
      default:
        return <div style={{ padding: 24 }}>Unknown window: {windowId}</div>;
    }
  };

  return (
    <>
      {/* Menu Bar - Fixed at top */}
      <MenuBar onMenuItemClick={handleMenuItemClick} />
      
      {/* Desktop - Main area below menu bar */}
      <Desktop onIconOpen={handleIconOpen}>
        {/* Dynamisch alle offenen Fenster rendern */}
        {windows.map(w => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            icon={w.icon}
            initialPosition={w.position}
            initialSize={w.size}
            minSize={w.minSize}
            maxSize={w.maxSize}
            resizable={w.resizable}
            closable={w.closable}
            minimizable={w.minimizable}
            maximizable={w.maximizable}
          >
            {renderWindowContent(w.id)}
          </Window>
        ))}
      </Desktop>

      {/* Toast Container - Global toast notifications */}
      <ToastContainer />
    </>
  );
};

export default App;
