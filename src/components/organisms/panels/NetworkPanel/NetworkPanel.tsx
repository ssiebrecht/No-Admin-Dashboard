/**
 * NetworkPanel Organism
 * Activity Monitor Network tab panel
 */

import { type FC } from 'react';
import { Text } from '../../../atoms';
import { HistoryGraph } from '../../../molecules';
import { useActivityStore } from '../../../../store/activityStore';
import styles from './NetworkPanel.module.css';

/**
 * Format bytes to human readable string
 */
const formatSpeed = (kbps: number): string => {
  if (kbps >= 1024) {
    return `${(kbps / 1024).toFixed(1)} MB/s`;
  }
  return `${kbps.toFixed(0)} KB/s`;
};

const formatData = (mb: number): string => {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(2)} GB`;
  }
  return `${mb.toFixed(1)} MB`;
};

/**
 * Format large numbers with thousand separators
 */
const formatPackets = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * NetworkPanel - Network activity display
 *
 * Shows:
 * - Received/Sent speeds as bars
 * - Total data transmitted
 * - In/Out history graph
 */
export const NetworkPanel: FC = () => {
  const { network, networkInHistory, networkOutHistory } = useActivityStore();

  const maxSpeed = Math.max(
    Math.max(...networkInHistory),
    Math.max(...networkOutHistory),
    100
  );

  return (
    <div className={styles.panel}>
      {/* Current Speeds */}
      <section className={styles.section}>
        <Text variant="label" weight="bold">
          Network Activity
        </Text>
        
        <div className={styles.speedsGrid}>
          <div className={styles.speedItem}>
            <div className={styles.speedHeader}>
              <span className={styles.speedDot} style={{ backgroundColor: '#34C759' }} />
              <Text variant="small">Received</Text>
              <Text variant="small" weight="semibold" className={styles.speedValue}>
                {formatSpeed(network.received)}
              </Text>
            </div>
            <div className={styles.speedBar}>
              <div
                className={styles.speedFill}
                style={{
                  width: `${(network.received / maxSpeed) * 100}%`,
                  backgroundColor: '#34C759',
                }}
              />
            </div>
          </div>
          
          <div className={styles.speedItem}>
            <div className={styles.speedHeader}>
              <span className={styles.speedDot} style={{ backgroundColor: '#FF3B30' }} />
              <Text variant="small">Sent</Text>
              <Text variant="small" weight="semibold" className={styles.speedValue}>
                {formatSpeed(network.sent)}
              </Text>
            </div>
            <div className={styles.speedBar}>
              <div
                className={styles.speedFill}
                style={{
                  width: `${(network.sent / maxSpeed) * 100}%`,
                  backgroundColor: '#FF3B30',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Network History Graph */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="label" weight="bold">
            Network History
          </Text>
          <Text variant="small" color="secondary">
            Last 60 seconds
          </Text>
        </div>
        
        <HistoryGraph
          data={networkInHistory}
          secondaryData={networkOutHistory}
          height={100}
          color="#34C759"
          secondaryColor="#FF3B30"
          showGrid
          filled
          aria-label="Network activity history"
        />
        
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: '#34C759' }} />
            <Text variant="small" color="secondary">Received</Text>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: '#FF3B30' }} />
            <Text variant="small" color="secondary">Sent</Text>
          </div>
        </div>
      </section>

      {/* Total Data */}
      <section className={styles.section}>
        <Text variant="label" weight="bold">
          Data Transmitted
        </Text>
        
        <div className={styles.totalsGrid}>
          <div className={styles.totalCard}>
            <div className={styles.totalIcon} style={{ backgroundColor: '#34C759' }}>
              ↓
            </div>
            <div className={styles.totalInfo}>
              <Text variant="small" color="secondary">Total Received</Text>
              <Text variant="body" weight="bold" className={styles.mono}>
                {formatData(network.totalReceived)}
              </Text>
            </div>
          </div>
          
          <div className={styles.totalCard}>
            <div className={styles.totalIcon} style={{ backgroundColor: '#FF3B30' }}>
              ↑
            </div>
            <div className={styles.totalInfo}>
              <Text variant="small" color="secondary">Total Sent</Text>
              <Text variant="body" weight="bold" className={styles.mono}>
                {formatData(network.totalSent)}
              </Text>
            </div>
          </div>
        </div>
        
        {/* Packet Statistics */}
        <div className={styles.packetsRow}>
          <div className={styles.packetStat}>
            <Text variant="small" color="secondary">Packets In:</Text>
            <Text variant="small" className={styles.mono}>{formatPackets(network.packetsIn)}</Text>
          </div>
          <div className={styles.packetStat}>
            <Text variant="small" color="secondary">Packets Out:</Text>
            <Text variant="small" className={styles.mono}>{formatPackets(network.packetsOut)}</Text>
          </div>
        </div>
      </section>

      {/* Network Info */}
      <section className={styles.section}>
        <Text variant="label" weight="bold">
          Connection Details
        </Text>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">Interface</Text>
            <Text variant="small" className={styles.mono}>en0 (Ethernet)</Text>
          </div>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">Status</Text>
            <Text variant="small" color="secondary">
              <span className={styles.statusDot} /> Connected
            </Text>
          </div>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">IP Address</Text>
            <Text variant="small" className={styles.mono}>192.168.1.42</Text>
          </div>
        </div>
      </section>
    </div>
  );
};
