/**
 * MemoryPanel Organism
 * Control panel for memory and disk usage display
 */

import { type FC, useState, useCallback } from 'react';
import { Text, Button, ProgressBar } from '../../../atoms';
import { MOCK_MEMORY_DATA, MOCK_DISK_DATA } from '../../../../data/controlPanels';
import styles from './MemoryPanel.module.css';

/**
 * Format bytes to human readable string
 */
const formatBytes = (mb: number): string => {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`;
  }
  return `${mb} MB`;
};

/**
 * MemoryPanel - Memory & disk usage control panel
 *
 * Displays:
 * - Memory usage bar
 * - Memory breakdown (App, Wired, Compressed, Cached)
 * - Disk space usage
 * - Refresh button for mock data
 */
export const MemoryPanel: FC = () => {
  const [memoryData, setMemoryData] = useState(MOCK_MEMORY_DATA);
  const [diskData, setDiskData] = useState(MOCK_DISK_DATA);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const memoryUsedPercent = (memoryData.used / memoryData.total) * 100;
  const diskUsedPercent = (diskData.used / diskData.total) * 100;

  const memoryBreakdown = [
    { label: 'App Memory', value: memoryData.app, color: '#FF9500' },
    { label: 'Wired Memory', value: memoryData.wired, color: '#FF3B30' },
    { label: 'Compressed', value: memoryData.compressed, color: '#34C759' },
    { label: 'Cached Files', value: memoryData.cached, color: '#5856D6' },
  ];

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    // Simulate refresh with slightly randomized data
    setTimeout(() => {
      const variation = () => 0.9 + Math.random() * 0.2;

      setMemoryData({
        ...MOCK_MEMORY_DATA,
        used: Math.round(MOCK_MEMORY_DATA.used * variation()),
        app: Math.round(MOCK_MEMORY_DATA.app * variation()),
        wired: Math.round(MOCK_MEMORY_DATA.wired * variation()),
        compressed: Math.round(MOCK_MEMORY_DATA.compressed * variation()),
        cached: Math.round(MOCK_MEMORY_DATA.cached * variation()),
      });

      setDiskData({
        ...MOCK_DISK_DATA,
        used: Math.round(MOCK_DISK_DATA.used * variation()),
      });

      setIsRefreshing(false);
    }, 500);
  }, []);

  return (
    <div className={styles.panel}>
      {/* Memory Usage */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            Memory Usage
          </Text>
          <Text variant="small" color="secondary">
            {formatBytes(memoryData.used)} of {formatBytes(memoryData.total)}
          </Text>
        </div>
        <ProgressBar
          value={memoryUsedPercent}
          aria-label="Memory usage"
        />
        <div className={styles.usageLabels}>
          <Text variant="small" color="secondary">
            {formatBytes(memoryData.used)} Used
          </Text>
          <Text variant="small" color="secondary">
            {formatBytes(memoryData.total - memoryData.used)} Available
          </Text>
        </div>
      </section>

      {/* Memory Breakdown */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Memory Breakdown
        </Text>
        <div className={styles.breakdown}>
          {memoryBreakdown.map((item) => {
            const percentage = (item.value / memoryData.total) * 100;
            return (
              <div key={item.label} className={styles.breakdownItem}>
                <div className={styles.breakdownHeader}>
                  <div
                    className={styles.colorDot}
                    style={{ backgroundColor: item.color }}
                  />
                  <Text variant="small">{item.label}</Text>
                  <Text variant="small" color="secondary" className={styles.breakdownValue}>
                    {formatBytes(item.value)}
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

      {/* Disk Space */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            Disk Space - {diskData.name}
          </Text>
          <Text variant="small" color="secondary">
            {formatBytes(diskData.used)} of {formatBytes(diskData.total)}
          </Text>
        </div>
        <ProgressBar
          value={diskUsedPercent}
          variant="striped"
          aria-label="Disk usage"
        />
        <div className={styles.usageLabels}>
          <Text variant="small" color="secondary">
            {formatBytes(diskData.used)} Used
          </Text>
          <Text variant="small" color="secondary">
            {formatBytes(diskData.total - diskData.used)} Available
          </Text>
        </div>
      </section>

      {/* Refresh Button */}
      <div className={styles.actions}>
        <Button
          onClick={handleRefresh}
          isLoading={isRefreshing}
          leftIcon="🔄"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};
