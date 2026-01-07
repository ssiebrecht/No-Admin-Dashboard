/**
 * WindowTitleBar Molecule
 * Classic Mac OS 8/9 striped title bar with window controls
 */

import { type FC, type MouseEvent } from 'react';
import { WindowButton } from '../../atoms/WindowButton';
import styles from './WindowTitleBar.module.css';

export interface WindowTitleBarProps {
  /** Window title text */
  title: string;
  /** Optional icon identifier */
  icon?: string;
  /** Whether this window is currently active/focused */
  isActive: boolean;
  /** Whether the window is collapsed (window shade) */
  isCollapsed?: boolean;
  
  /** Show close button */
  showClose?: boolean;
  /** Show zoom button */
  showZoom?: boolean;
  /** Show collapse button */
  showCollapse?: boolean;
  
  /** Close button callback */
  onClose?: () => void;
  /** Zoom button callback */
  onZoom?: () => void;
  /** Collapse button callback */
  onCollapse?: () => void;
  /** Double-click callback (typically to zoom) */
  onDoubleClick?: () => void;
  
  /** Drag handlers from useDraggable hook */
  dragHandlers?: {
    onMouseDown: (e: React.MouseEvent) => void;
  };
  
  /** Additional CSS class */
  className?: string;
}

/**
 * WindowTitleBar - Classic Mac OS window title bar
 * 
 * Features:
 * - Horizontal striped pattern when active
 * - Solid gray when inactive
 * - Close, Zoom, Collapse buttons
 * - Drag handle for window movement
 * - Double-click to zoom
 */
export const WindowTitleBar: FC<WindowTitleBarProps> = ({
  title,
  icon,
  isActive,
  isCollapsed = false,
  showClose = true,
  showZoom = true,
  showCollapse = true,
  onClose,
  onZoom,
  onCollapse,
  onDoubleClick,
  dragHandlers,
  className = '',
}) => {
  const classNames = [
    styles.titleBar,
    isActive ? styles.active : styles.inactive,
    isCollapsed ? styles.collapsed : '',
    className,
  ].filter(Boolean).join(' ');

  const handleDoubleClick = (e: MouseEvent) => {
    // Only trigger if not clicking on buttons
    if ((e.target as HTMLElement).closest('button')) return;
    onDoubleClick?.();
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // Only start drag if not clicking on buttons
    if ((e.target as HTMLElement).closest('button')) return;
    dragHandlers?.onMouseDown(e);
  };

  return (
    <div
      className={classNames}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      {/* Left side - Close button */}
      <div className={styles.leftControls}>
        {showClose && (
          <WindowButton
            type="close"
            onClick={onClose}
            disabled={!isActive}
          />
        )}
      </div>

      {/* Center - Title with optional icon */}
      <div className={styles.titleContainer}>
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.title}>{title}</span>
      </div>

      {/* Right side - Zoom and Collapse buttons */}
      <div className={styles.rightControls}>
        {showZoom && (
          <WindowButton
            type="zoom"
            onClick={onZoom}
            disabled={!isActive}
          />
        )}
        {showCollapse && (
          <WindowButton
            type="collapse"
            onClick={onCollapse}
            disabled={!isActive}
          />
        )}
      </div>
    </div>
  );
};
