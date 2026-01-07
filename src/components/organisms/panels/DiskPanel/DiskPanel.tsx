/**
 * DiskPanel Organism
 * Activity Monitor Disk tab panel
 */

import { type FC } from 'react';
import { Text } from '../../../atoms';
import { UsageBar, HistoryGraph } from '../../../molecules';
import { useActivityStore } from '../../../../store/activityStore';
import styles from './DiskPanel.module.css';

/**
 * DiskPanel - Disk activity display
 *
 * Shows:
 * - Read/Write speeds as bars
 * - Disk space usage bar
 * - Read/Write history graph
 */
export const DiskPanel: FC = () => {
  const { disk, diskReadHistory, diskWriteHistory } = useActivityStore();

  const diskUsedPercent = (disk.used / disk.total) * 100;
  const maxSpeed = Math.max(
    Math.max(...diskReadHistory),
    Math.max(...diskWriteHistory),
    100
  );

  return (
    <div className={styles.panel}>
      {/* Disk Space */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            Disk Space
          </Text>
          <Text variant="small" color="secondary">
            {disk.used.toFixed(0)} GB of {disk.total.toFixed(0)} GB used
          </Text>
        </div>
        
        <UsageBar
          value={diskUsedPercent}
          size="lg"
          showValue
          aria-label="Disk space usage"
        />
        
        <div className={styles.usageLabels}>
          <Text variant="small" color="secondary">
            {disk.used.toFixed(0)} GB Used
          </Text>
          <Text variant="small" color="secondary">
            {(disk.total - disk.used).toFixed(0)} GB Available
          </Text>
        </div>
      </section>

      {/* I/O Speeds */}
      <section className={styles.section}>
        <Text variant="label" weight="bold">
          Disk Activity
        </Text>
        
        <div className={styles.speedsGrid}>
          <div className={styles.speedItem}>
            <div className={styles.speedHeader}>
              <span className={styles.speedDot} style={{ backgroundColor: '#007AFF' }} />
              <Text variant="small">Read Speed</Text>
              <Text variant="small" weight="semibold" className={styles.speedValue}>
                {disk.readSpeed.toFixed(1)} MB/s
              </Text>
            </div>
            <div className={styles.speedBar}>
              <div
                className={styles.speedFill}
                style={{
                  width: `${(disk.readSpeed / maxSpeed) * 100}%`,
                  backgroundColor: '#007AFF',
                }}
              />
            </div>
          </div>
          
          <div className={styles.speedItem}>
            <div className={styles.speedHeader}>
              <span className={styles.speedDot} style={{ backgroundColor: '#FF9500' }} />
              <Text variant="small">Write Speed</Text>
              <Text variant="small" weight="semibold" className={styles.speedValue}>
                {disk.writeSpeed.toFixed(1)} MB/s
              </Text>
            </div>
            <div className={styles.speedBar}>
              <div
                className={styles.speedFill}
                style={{
                  width: `${(disk.writeSpeed / maxSpeed) * 100}%`,
                  backgroundColor: '#FF9500',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disk I/O History Graph */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            I/O History
          </Text>
          <Text variant="small" color="secondary">
            Last 60 seconds
          </Text>
        </div>
        
        <HistoryGraph
          data={diskReadHistory}
          secondaryData={diskWriteHistory}
          height={100}
          color="#007AFF"
          secondaryColor="#FF9500"
          showGrid
          filled
          aria-label="Disk I/O history"
        />
        
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: '#007AFF' }} />
            <Text variant="small" color="secondary">Read</Text>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: '#FF9500' }} />
            <Text variant="small" color="secondary">Write</Text>
          </div>
        </div>
      </section>

      {/* Disk Info */}
      <section className={styles.section}>
        <Text variant="label" weight="bold">
          Disk Information
        </Text>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">Total Capacity</Text>
            <Text variant="small" className={styles.mono}>{disk.total.toFixed(0)} GB</Text>
          </div>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">Used</Text>
            <Text variant="small" className={styles.mono}>{disk.used.toFixed(1)} GB</Text>
          </div>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">Available</Text>
            <Text variant="small" className={styles.mono}>{(disk.total - disk.used).toFixed(1)} GB</Text>
          </div>
        </div>
      </section>
    </div>
  );
};
