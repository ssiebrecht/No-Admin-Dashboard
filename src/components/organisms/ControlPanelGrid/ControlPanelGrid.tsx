/**
 * ControlPanelGrid Organism
 * Grid display of control panel icons
 */

import { type FC, useState, useCallback } from 'react';
import { ControlPanelIcon } from '../../molecules';
import { CONTROL_PANELS } from '../../../data/controlPanels';
import styles from './ControlPanelGrid.module.css';

export interface ControlPanelGridProps {
  /** Callback when a panel is opened */
  onOpenPanel: (panelId: string) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * ControlPanelGrid - Grid of control panel icons
 *
 * Displays all available control panels in a grid layout.
 * Single click to select, double click to open panel window.
 */
export const ControlPanelGrid: FC<ControlPanelGridProps> = ({
  onOpenPanel,
  className = '',
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleDoubleClick = useCallback(
    (id: string) => {
      onOpenPanel(id);
    },
    [onOpenPanel]
  );

  const handleContainerClick = useCallback(() => {
    setSelectedId(null);
  }, []);

  const classNames = [styles.grid, className].filter(Boolean).join(' ');

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={classNames}>
        {CONTROL_PANELS.map((panel) => (
          <ControlPanelIcon
            key={panel.id}
            icon={panel.icon}
            label={panel.name}
            selected={selectedId === panel.id}
            onSelect={() => handleSelect(panel.id)}
            onDoubleClick={() => handleDoubleClick(panel.id)}
          />
        ))}
      </div>
    </div>
  );
};
