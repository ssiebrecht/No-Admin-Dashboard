/**
 * CPUPanel Organism
 * Activity Monitor CPU tab panel
 */

import { type FC, useState, useCallback } from 'react';
import { Text } from '../../../atoms';
import { UsageBar, HistoryGraph } from '../../../molecules';
import { ProcessList } from '../../ProcessList';
import { useActivityStore } from '../../../../store/activityStore';
import type { ProcessSortField, ActivitySortOrder } from '../../../../types/activity';
import styles from './CPUPanel.module.css';

/**
 * CPUPanel - CPU activity display
 *
 * Shows:
 * - Total CPU usage bar with System/User segments
 * - System %, User %, Idle % labels
 * - 60-second history graph
 * - Process list sorted by CPU
 */
export const CPUPanel: FC = () => {
  const { cpu, cpuHistory, processes } = useActivityStore();
  const [sortBy, setSortBy] = useState<ProcessSortField>('cpu');
  const [sortOrder, setSortOrder] = useState<ActivitySortOrder>('desc');

  const handleSort = useCallback((field: ProcessSortField) => {
    if (field === sortBy) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  }, [sortBy]);

  const totalCPU = cpu.system + cpu.user;

  const cpuSegments = [
    { value: cpu.system, color: '#FF3B30', label: 'System' },
    { value: cpu.user, color: '#007AFF', label: 'User' },
  ];

  return (
    <div className={styles.panel}>
      {/* CPU Usage Bar */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            CPU Usage
          </Text>
          <Text variant="small" color="secondary">
            {totalCPU.toFixed(1)}% used
          </Text>
        </div>
        
        <UsageBar
          segments={cpuSegments}
          showLabels
          size="lg"
          aria-label="CPU usage"
        />
        
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statDot} style={{ backgroundColor: '#FF3B30' }} />
            <Text variant="small">System:</Text>
            <Text variant="small" weight="semibold" className={styles.mono}>
              {cpu.system.toFixed(1)}%
            </Text>
          </div>
          <div className={styles.stat}>
            <span className={styles.statDot} style={{ backgroundColor: '#007AFF' }} />
            <Text variant="small">User:</Text>
            <Text variant="small" weight="semibold" className={styles.mono}>
              {cpu.user.toFixed(1)}%
            </Text>
          </div>
          <div className={styles.stat}>
            <span className={styles.statDot} style={{ backgroundColor: '#34C759' }} />
            <Text variant="small">Idle:</Text>
            <Text variant="small" weight="semibold" className={styles.mono}>
              {cpu.idle.toFixed(1)}%
            </Text>
          </div>
        </div>
      </section>

      {/* CPU History Graph */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            CPU History
          </Text>
          <Text variant="small" color="secondary">
            Last 60 seconds
          </Text>
        </div>
        
        <HistoryGraph
          data={cpuHistory}
          height={80}
          color="#007AFF"
          maxValue={100}
          showGrid
          filled
          aria-label="CPU usage history"
        />
      </section>

      {/* Process List */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            Processes
          </Text>
          <Text variant="small" color="secondary">
            {processes.length} processes
          </Text>
        </div>
        
        <ProcessList
          processes={processes}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          maxHeight={180}
        />
      </section>
    </div>
  );
};
