/**
 * ActivityMemoryPanel Organism
 * Activity Monitor Memory tab panel
 */

import { type FC, useState, useCallback } from 'react';
import { Text } from '../../../atoms';
import { UsageBar, HistoryGraph } from '../../../molecules';
import { ProcessList } from '../../ProcessList';
import { useActivityStore } from '../../../../store/activityStore';
import type { ProcessSortField, ActivitySortOrder } from '../../../../types/activity';
import styles from './ActivityMemoryPanel.module.css';

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
 * ActivityMemoryPanel - Memory activity display
 *
 * Shows:
 * - Memory usage bar (Used/Available)
 * - Memory breakdown: Wired, Compressed, Cached
 * - 60-second history graph
 * - Process list sorted by memory
 */
export const ActivityMemoryPanel: FC = () => {
  const { memory, memoryHistory, processes } = useActivityStore();
  const [sortBy, setSortBy] = useState<ProcessSortField>('memory');
  const [sortOrder, setSortOrder] = useState<ActivitySortOrder>('desc');

  const handleSort = useCallback((field: ProcessSortField) => {
    if (field === sortBy) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  }, [sortBy]);

  const usedPercent = (memory.used / memory.total) * 100;

  const memoryBreakdown = [
    { label: 'Wired Memory', value: memory.wired, color: '#FF3B30' },
    { label: 'Compressed', value: memory.compressed, color: '#34C759' },
    { label: 'Cached Files', value: memory.cached, color: '#5856D6' },
    { label: 'Available', value: memory.available, color: '#BBBBBB' },
  ];

  return (
    <div className={styles.panel}>
      {/* Memory Usage Bar */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            Memory Usage
          </Text>
          <Text variant="small" color="secondary">
            {formatMB(memory.used)} of {formatMB(memory.total)} used
          </Text>
        </div>
        
        <UsageBar
          value={usedPercent}
          size="lg"
          showValue
          aria-label="Memory usage"
        />
        
        <div className={styles.usageLabels}>
          <Text variant="small" color="secondary">
            {formatMB(memory.used)} Used
          </Text>
          <Text variant="small" color="secondary">
            {formatMB(memory.available)} Available
          </Text>
        </div>
      </section>

      {/* Memory Breakdown */}
      <section className={styles.section}>
        <Text variant="label" weight="bold">
          Memory Breakdown
        </Text>
        
        <div className={styles.breakdown}>
          {memoryBreakdown.map((item) => {
            const percentage = (item.value / memory.total) * 100;
            return (
              <div key={item.label} className={styles.breakdownItem}>
                <div className={styles.breakdownHeader}>
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: item.color }}
                  />
                  <Text variant="small">{item.label}</Text>
                  <Text variant="small" color="secondary" className={styles.breakdownValue}>
                    {formatMB(item.value)}
                  </Text>
                </div>
                <div className={styles.breakdownBar}>
                  <div
                    className={styles.breakdownFill}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Memory History Graph */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            Memory Pressure
          </Text>
          <Text variant="small" color="secondary">
            Last 60 seconds
          </Text>
        </div>
        
        <HistoryGraph
          data={memoryHistory}
          height={80}
          color="#5856D6"
          maxValue={100}
          showGrid
          filled
          aria-label="Memory usage history"
        />
      </section>

      {/* Process List */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            Processes by Memory
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
          maxHeight={150}
        />
      </section>
    </div>
  );
};
