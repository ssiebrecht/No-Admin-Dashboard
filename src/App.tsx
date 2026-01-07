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
import type { MenuItem } from './types/menu';
import type { DesktopIconData } from './types/desktop';
import styles from './App.module.css';

/**
 * Mac OS 8/9 Admin Dashboard
 * Main Application Component with Desktop Shell
 */
const App: FC = () => {
  const { openWindow, windows } = useWindowStore();
  const dialog = useDialog();
  const toast = useToast();

  // Open Dashboard on first load if no windows are open
  useEffect(() => {
    // Only auto-open dashboard if no windows exist
    if (windows.length === 0) {
      openWindow({
        id: 'dashboard',
        title: 'Dashboard',
        icon: '📊',
        initialPosition: { x: 100, y: 60 },
        initialSize: { width: 650, height: 550 },
      });
    }
  }, []); // Empty deps - only run on mount

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

  return (
    <>
      {/* Menu Bar - Fixed at top */}
      <MenuBar onMenuItemClick={handleMenuItemClick} />
      
      {/* Desktop - Main area below menu bar */}
      <Desktop onIconOpen={handleIconOpen}>
        {/* Dashboard Window */}
        <Window
          id="dashboard"
          title="Dashboard"
          icon="📊"
          initialPosition={{ x: 100, y: 60 }}
          initialSize={{ width: 650, height: 550 }}
          minSize={{ width: 500, height: 400 }}
        >
          <Dashboard userName="Admin" />
        </Window>

        {/* Demo Window: About */}
        <Window
          id="about"
          title="About This Dashboard"
          icon="🍎"
          initialPosition={{ x: 150, y: 100 }}
          initialSize={{ width: 350, height: 280 }}
          minSize={{ width: 280, height: 200 }}
        >
          <div className={styles.windowInner}>
            <div className={styles.aboutContent}>
              <span className={styles.aboutIcon}>🍎</span>
              <h1 className={styles.aboutTitle}>Mac OS 8.6</h1>
              <p className={styles.aboutVersion}>Admin Dashboard</p>
              <hr className={styles.divider} />
              <p className={styles.aboutInfo}>
                Built-in Memory: 128 MB<br />
                Virtual Memory: 256 MB<br />
                Startup Disk: Macintosh HD
              </p>
              <p className={styles.aboutFooter}>
                © 2026 Classic Mac Enthusiasts
              </p>
            </div>
          </div>
        </Window>

        {/* Demo Window: User Management */}
        <Window
          id="user-management"
          title="User Management"
          icon="👥"
          initialPosition={{ x: 120, y: 80 }}
          initialSize={{ width: 700, height: 450 }}
          minSize={{ width: 550, height: 350 }}
        >
          <UserManagement />
        </Window>

        {/* Demo Window: File Browser */}
        <Window
          id="file-browser"
          title="Macintosh HD"
          icon="📁"
          initialPosition={{ x: 140, y: 100 }}
          initialSize={{ width: 600, height: 400 }}
          minSize={{ width: 400, height: 300 }}
        >
          <FileBrowser />
        </Window>

        {/* Demo Window: Control Panels */}
        <Window
          id="control-panels"
          title="Control Panels"
          icon="⚙️"
          initialPosition={{ x: 160, y: 120 }}
          initialSize={{ width: 450, height: 350 }}
          minSize={{ width: 300, height: 250 }}
        >
          <ControlPanels />
        </Window>

        {/* Demo Window: Trash */}
        <Window
          id="trash"
          title="Trash"
          icon="🗑️"
          initialPosition={{ x: 180, y: 140 }}
          initialSize={{ width: 400, height: 300 }}
          minSize={{ width: 250, height: 200 }}
        >
          <div className={styles.windowInner}>
            <h1 className={styles.heading}>🗑️ Trash</h1>
            <div className={styles.section}>
              <p className={styles.instructions}>
                The Trash is empty.
              </p>
            </div>
          </div>
        </Window>

        {/* Control Panel Sub-Windows */}
        <Window
          id="panel-appearance"
          title="Appearance"
          icon="🎨"
          initialPosition={{ x: 200, y: 80 }}
          initialSize={{ width: 350, height: 350 }}
          minSize={{ width: 280, height: 250 }}
        >
          <AppearancePanel />
        </Window>

        <Window
          id="panel-sound"
          title="Sound"
          icon="🔊"
          initialPosition={{ x: 220, y: 100 }}
          initialSize={{ width: 350, height: 380 }}
          minSize={{ width: 280, height: 250 }}
        >
          <SoundPanel />
        </Window>

        <Window
          id="panel-date-time"
          title="Date & Time"
          icon="🕐"
          initialPosition={{ x: 240, y: 120 }}
          initialSize={{ width: 320, height: 450 }}
          minSize={{ width: 280, height: 300 }}
        >
          <DateTimePanel />
        </Window>

        <Window
          id="panel-memory"
          title="Memory"
          icon="💾"
          initialPosition={{ x: 260, y: 140 }}
          initialSize={{ width: 380, height: 420 }}
          minSize={{ width: 300, height: 300 }}
        >
          <MemoryPanel />
        </Window>

        <Window
          id="panel-display"
          title="Display"
          icon="🖥️"
          initialPosition={{ x: 280, y: 160 }}
          initialSize={{ width: 400, height: 450 }}
          minSize={{ width: 320, height: 350 }}
        >
          <DisplayPanel />
        </Window>

        <Window
          id="panel-network"
          title="Network"
          icon="🌐"
          initialPosition={{ x: 300, y: 180 }}
          initialSize={{ width: 350, height: 300 }}
          minSize={{ width: 280, height: 200 }}
        >
          <div className={styles.windowInner}>
            <div className={styles.placeholder}>
              <span className={styles.placeholderIcon}>🌐</span>
              <p className={styles.instructions}>
                Network settings will be available in a future update.
              </p>
            </div>
          </div>
        </Window>

        {/* Demo Window: Dialog Test */}
        <Window
          id="dialog-demo"
          title="Dialog Demo"
          icon="💬"
          initialPosition={{ x: 200, y: 80 }}
          initialSize={{ width: 380, height: 420 }}
          minSize={{ width: 320, height: 350 }}
        >
          <div className={styles.windowInner}>
            <h1 className={styles.heading}>💬 Dialog Demo</h1>
            
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Alert Dialogs</h2>
              <div className={styles.buttonGroup}>
                <Button onClick={handleAlertDemo}>ℹ️ Info Alert</Button>
                <Button onClick={handleWarningDemo}>⚠️ Warning</Button>
                <Button onClick={handleErrorDemo}>❌ Error</Button>
                <Button onClick={handleSuccessDemo}>✅ Success</Button>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Confirm Dialogs</h2>
              <div className={styles.buttonGroup}>
                <Button onClick={handleConfirmDemo}>❓ Confirm</Button>
                <Button variant="danger" onClick={handleDangerConfirmDemo}>
                  🗑️ Danger Confirm
                </Button>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Prompt Dialogs</h2>
              <div className={styles.buttonGroup}>
                <Button onClick={handlePromptDemo}>📁 New Folder</Button>
                <Button onClick={handleRenameDemo}>✏️ Rename</Button>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Toast Notifications</h2>
              <div className={styles.buttonGroup}>
                <Button onClick={() => toast.success('Success!', 'Operation completed successfully')}>✅ Success</Button>
                <Button onClick={() => toast.error('Error!', 'Something went wrong')}>❌ Error</Button>
                <Button onClick={() => toast.warning('Warning', 'Low disk space')}>⚠️ Warning</Button>
                <Button onClick={() => toast.info('Info', 'New update available')}>ℹ️ Info</Button>
              </div>
            </div>
          </div>
        </Window>
      </Desktop>

      {/* Toast Container - Global toast notifications */}
      <ToastContainer />
    </>
  );
};

export default App;
