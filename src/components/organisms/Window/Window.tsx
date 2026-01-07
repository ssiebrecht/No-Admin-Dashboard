/**
 * Window Organism
 * Classic Mac OS 8/9 draggable, resizable window
 */

import { type FC, type ReactNode, useEffect, useCallback } from 'react';
import { WindowTitleBar } from '../../molecules/WindowTitleBar';
import { useDraggable } from '../../../hooks/useDraggable';
import { useResizable } from '../../../hooks/useResizable';
import { useWindowStore } from '../../../store/windowStore';
import type { Position, Size } from '../../../types/window';
import styles from './Window.module.css';

export interface WindowProps {
  /** Unique window identifier */
  id: string;
  /** Window title displayed in title bar */
  title: string;
  /** Optional icon (emoji or icon identifier) */
  icon?: string;
  /** Window content */
  children: ReactNode;

  /** Initial position (used if not in store) */
  initialPosition?: Position;
  /** Initial size (used if not in store) */
  initialSize?: Size;
  /** Minimum allowed size */
  minSize?: Size;
  /** Maximum allowed size */
  maxSize?: Size;

  /** Enable/disable resizing */
  resizable?: boolean;
  /** Enable/disable close button */
  closable?: boolean;
  /** Enable/disable minimize button */
  minimizable?: boolean;
  /** Enable/disable maximize button */
  maximizable?: boolean;

  /** Callback when window is closed */
  onClose?: () => void;
  /** Callback when window gains focus */
  onFocus?: () => void;

  /** Additional CSS class */
  className?: string;
}

const DEFAULT_SIZE: Size = { width: 400, height: 300 };
const DEFAULT_MIN_SIZE: Size = { width: 200, height: 150 };
const DEFAULT_POSITION: Position = { x: 100, y: 50 };

/**
 * Window - Classic Mac OS window component
 *
 * Features:
 * - Draggable via title bar
 * - Resizable via grow box (bottom-right corner)
 * - Close, Zoom, Collapse buttons
 * - Classic 3D bevel styling
 * - Window shade (collapse) animation
 * - Z-index management for stacking
 */
export const Window: FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  initialPosition = DEFAULT_POSITION,
  initialSize = DEFAULT_SIZE,
  minSize = DEFAULT_MIN_SIZE,
  maxSize,
  resizable = true,
  closable = true,
  minimizable = true,
  maximizable = true,
  onClose,
  onFocus,
  className = '',
}) => {
  // Get window state and actions from store
  const windowState = useWindowStore((state) =>
    state.windows.find((w) => w.id === id)
  );
  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const {
    openWindow,
    closeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    maximizeWindow,
    toggleCollapse,
  } = useWindowStore();

  // Determine if this window is active
  const isActive = activeWindowId === id;

  // Initialize window in store if not present
  useEffect(() => {
    if (!windowState) {
      openWindow({
        id,
        title,
        icon,
        initialPosition,
        initialSize,
        minSize,
        maxSize,
        resizable,
        closable,
        minimizable,
        maximizable,
      });
    }
  }, [id]); // Only run on mount

  // Draggable hook for window movement
  const {
    position,
    isDragging,
    dragHandlers,
  } = useDraggable({
    initialPosition: windowState?.position ?? initialPosition,
    onDragEnd: (newPosition) => {
      moveWindow(id, newPosition);
    },
    disabled: windowState?.isMaximized,
  });

  // Resizable hook for window resizing
  const {
    size,
    isResizing,
    resizeHandlers,
  } = useResizable({
    initialSize: windowState?.size ?? initialSize,
    minSize: windowState?.minSize ?? minSize,
    maxSize: windowState?.maxSize ?? maxSize,
    onResizeEnd: (newSize) => {
      resizeWindow(id, newSize);
    },
    disabled: !resizable || windowState?.isMaximized || windowState?.isCollapsed,
  });

  // Focus handler
  const handleFocus = useCallback(() => {
    if (!isActive) {
      focusWindow(id);
      onFocus?.();
    }
  }, [id, isActive, focusWindow, onFocus]);

  // Close handler
  const handleClose = useCallback(() => {
    closeWindow(id);
    onClose?.();
  }, [id, closeWindow, onClose]);

  // Zoom handler (maximize/restore)
  const handleZoom = useCallback(() => {
    maximizeWindow(id);
  }, [id, maximizeWindow]);

  // Collapse handler (window shade)
  const handleCollapse = useCallback(() => {
    toggleCollapse(id);
  }, [id, toggleCollapse]);

  // Don't render if minimized or not in store yet
  if (!windowState || windowState.isMinimized) {
    return null;
  }

  const isCollapsed = windowState.isCollapsed;
  const isMaximized = windowState.isMaximized;

  // Use store values for maximized state, hook values otherwise
  const currentPosition = isMaximized ? windowState.position : position;
  const currentSize = isMaximized ? windowState.size : size;

  const classNames = [
    styles.window,
    isActive ? styles.active : styles.inactive,
    isDragging ? styles.dragging : '',
    isResizing ? styles.resizing : '',
    isCollapsed ? styles.collapsed : '',
    isMaximized ? styles.maximized : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
        width: currentSize.width,
        height: isCollapsed ? 'auto' : currentSize.height,
        zIndex: windowState.zIndex,
      }}
      onMouseDown={handleFocus}
    >
      {/* Title Bar */}
      <WindowTitleBar
        title={title}
        icon={icon}
        isActive={isActive}
        isCollapsed={isCollapsed}
        showClose={closable}
        showZoom={maximizable}
        showCollapse={minimizable}
        onClose={handleClose}
        onZoom={handleZoom}
        onCollapse={handleCollapse}
        onDoubleClick={handleZoom}
        dragHandlers={dragHandlers}
      />

      {/* Content Area - Hidden when collapsed */}
      {!isCollapsed && (
        <div className={styles.content}>
          {children}
        </div>
      )}

      {/* Grow Box (Resize Handle) - Only shown when resizable and not collapsed */}
      {resizable && !isCollapsed && !isMaximized && (
        <div
          className={styles.growBox}
          onMouseDown={(e) => resizeHandlers.onMouseDown(e, 'se')}
          aria-label="Resize window"
        />
      )}

      {/* Window Border Frame */}
      <div className={styles.borderFrame} aria-hidden="true" />
    </div>
  );
};
