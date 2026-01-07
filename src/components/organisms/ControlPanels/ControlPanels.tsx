/**
 * ControlPanels Organism
 * Main Control Panels component with grid view
 */

import { type FC, useCallback } from 'react';
import { ControlPanelGrid } from '../ControlPanelGrid';
import { useWindowStore } from '../../../store/windowStore';
import { CONTROL_PANELS } from '../../../data/controlPanels';
import styles from './ControlPanels.module.css';

/**
 * Panel window configurations
 */
export const PANEL_CONFIGS: Record<
  string,
  {
    title: string;
    icon: string;
    width: number;
    height: number;
  }
> = {
  appearance: {
    title: 'Appearance',
    icon: '🎨',
    width: 350,
    height: 350,
  },
  sound: {
    title: 'Sound',
    icon: '🔊',
    width: 350,
    height: 380,
  },
  'date-time': {
    title: 'Date & Time',
    icon: '🕐',
    width: 320,
    height: 450,
  },
  memory: {
    title: 'Memory',
    icon: '💾',
    width: 380,
    height: 420,
  },
  display: {
    title: 'Display',
    icon: '🖥️',
    width: 400,
    height: 450,
  },
  network: {
    title: 'Network',
    icon: '🌐',
    width: 350,
    height: 300,
  },
};

export interface ControlPanelsProps {
  /** Additional CSS class */
  className?: string;
}

/**
 * ControlPanels - Control Panels main component
 *
 * Displays a grid of control panel icons.
 * Double-clicking an icon opens its corresponding settings panel
 * as a separate window.
 */
export const ControlPanels: FC<ControlPanelsProps> = ({ className = '' }) => {
  const { openWindow, windows } = useWindowStore();

  const handleOpenPanel = useCallback(
    (panelId: string) => {
      const config = PANEL_CONFIGS[panelId];
      const panelInfo = CONTROL_PANELS.find((p) => p.id === panelId);

      if (!config || !panelInfo) {
        console.warn(`Unknown panel: ${panelId}`);
        return;
      }

      const windowId = `panel-${panelId}`;
      
      // Calculate position based on existing windows
      const existingPanelWindows = windows.filter((w) =>
        w.id.startsWith('panel-')
      );
      const offset = existingPanelWindows.length * 25;

      openWindow({
        id: windowId,
        title: config.title,
        icon: config.icon,
        initialPosition: { x: 200 + offset, y: 80 + offset },
        initialSize: { width: config.width, height: config.height },
        minSize: { width: 280, height: 250 },
      });
    },
    [openWindow, windows]
  );

  const classNames = [styles.controlPanels, className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <ControlPanelGrid onOpenPanel={handleOpenPanel} />
    </div>
  );
};
