/**
 * ActivityMonitor Organism
 * Classic Mac OS 8/9 Activity Monitor with live system stats
 */

import { type FC, useState, useCallback, useMemo } from 'react';
import { TabBar, StatusBar } from '../../molecules';
import { CPUPanel } from '../panels/CPUPanel';
import { ActivityMemoryPanel } from '../panels/ActivityMemoryPanel';
import { DiskPanel } from '../panels/DiskPanel';
import { NetworkPanel } from '../panels/NetworkPanel';
import { useActivityStore } from '../../../store/activityStore';
import { useActivitySimulation } from '../../../hooks/useActivitySimulation';
import type { ActivityTab } from '../../../types/activity';
import type { Tab } from '../../molecules/TabBar/TabBar';
import styles from './ActivityMonitor.module.css';

export interface ActivityMonitorProps {
  /** Whether the window is visible/active */
  isActive?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Tab definitions
 */
const tabs: Tab[] = [
  { id: 'cpu', label: 'CPU' },
  { id: 'memory', label: 'Memory' },
  { id: 'disk', label: 'Disk' },
  { id: 'network', label: 'Network' },
];

/**
 * Format bytes to human readable string
 */
const formatMB = (mb: number): string => {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`;
  }
  return `${mb.toFixed(0)} MB`;
};

/**
 * ActivityMonitor - System activity monitoring window
 *
 * Features:
 * - Tab-based navigation (CPU, Memory, Disk, Network)
 * - Live-updating statistics
 * - Process list
 * - History graphs
 * - Status bar with summary
 */
export const ActivityMonitor: FC<ActivityMonitorProps> = ({
  isActive = true,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<ActivityTab>('cpu');
  const { cpu, memory, processes } = useActivityStore();
  
  // Start/stop simulation based on visibility
  useActivitySimulation(isActive);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as ActivityTab);
  }, []);

  const classNames = [
    styles.container,
    className,
  ].filter(Boolean).join(' ');

  // Render active panel
  const renderPanel = () => {
    switch (activeTab) {
      case 'cpu':
        return <CPUPanel />;
      case 'memory':
        return <ActivityMemoryPanel />;
      case 'disk':
        return <DiskPanel />;
      case 'network':
        return <NetworkPanel />;
      default:
        return <CPUPanel />;
    }
  };

  // Status bar items
  const totalCPU = cpu.system + cpu.user;
  
  // Calculate estimated threads (stable based on process count - roughly 6 threads per process)
  const estimatedThreads = useMemo(() => {
    return processes.length * 6 + Math.floor(processes.length * 0.5);
  }, [processes.length]);
  
  const statusLeftItems = [
    {
      id: 'processes',
      content: `Processes: ${processes.length}`,
    },
    {
      id: 'threads',
      content: `Threads: ${estimatedThreads}`,
    },
  ];

  const statusRightItems = [
    {
      id: 'cpu',
      content: `CPU: ${totalCPU.toFixed(0)}%`,
    },
    {
      id: 'memory',
      content: `Memory: ${formatMB(memory.used)} / ${formatMB(memory.total)}`,
    },
  ];

  return (
    <div className={classNames}>
      {/* Tab Bar */}
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onChange={handleTabChange}
        className={styles.tabBar}
      />
      
      {/* Panel Content */}
      <div className={styles.content}>
        {renderPanel()}
      </div>
      
      {/* Status Bar */}
      <StatusBar
        leftItems={statusLeftItems}
        rightItems={statusRightItems}
        className={styles.statusBar}
      />
    </div>
  );
};
