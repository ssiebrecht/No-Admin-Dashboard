/**
 * StatusBar Molecule
 * Classic Mac OS 8/9 status bar at the bottom of windows
 */

import { type FC, type ReactNode } from 'react';
import { Text } from '../../atoms';
import styles from './StatusBar.module.css';

export interface StatusBarItem {
  /** Item identifier */
  id: string;
  /** Item content */
  content: ReactNode;
  /** Flex grow (for dynamic width) */
  flex?: number;
  /** Min width in pixels */
  minWidth?: number;
}

export interface StatusBarProps {
  /** Left-aligned items */
  leftItems?: StatusBarItem[];
  /** Right-aligned items */
  rightItems?: StatusBarItem[];
  /** Simple text (alternative to items) */
  text?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * StatusBar - Status display at window bottom
 *
 * Classic Mac OS style status bar with:
 * - Raised bevel effect
 * - Small typography
 * - Left and right aligned sections
 * - Multiple status items
 */
export const StatusBar: FC<StatusBarProps> = ({
  leftItems,
  rightItems,
  text,
  className = '',
}) => {
  const classNames = [
    styles.statusBar,
    className,
  ].filter(Boolean).join(' ');

  // Simple text mode
  if (text && !leftItems && !rightItems) {
    return (
      <div className={classNames}>
        <Text variant="small" color="secondary" className={styles.text}>
          {text}
        </Text>
      </div>
    );
  }

  const renderItem = (item: StatusBarItem) => (
    <div
      key={item.id}
      className={styles.item}
      style={{
        flex: item.flex || 0,
        minWidth: item.minWidth ? `${item.minWidth}px` : undefined,
      }}
    >
      {typeof item.content === 'string' ? (
        <Text variant="small" color="secondary">
          {item.content}
        </Text>
      ) : (
        item.content
      )}
    </div>
  );

  return (
    <div className={classNames}>
      {leftItems && leftItems.length > 0 && (
        <div className={styles.leftSection}>
          {leftItems.map(renderItem)}
        </div>
      )}
      
      <div className={styles.spacer} />
      
      {rightItems && rightItems.length > 0 && (
        <div className={styles.rightSection}>
          {rightItems.map(renderItem)}
        </div>
      )}
    </div>
  );
};
