/**
 * useResizable Hook
 * Handles resize operations for windows
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Size, Position, ResizeDirection } from '../types/window';

export interface UseResizableProps {
  /** Initial size of the element */
  initialSize: Size;
  /** Minimum allowed size */
  minSize?: Size;
  /** Maximum allowed size */
  maxSize?: Size;
  /** Callback when resize ends */
  onResizeEnd?: (size: Size, position?: Position) => void;
  /** Callback during resize (for live updates) */
  onResize?: (size: Size, position?: Position) => void;
  /** Current position (needed for edge dragging that affects position) */
  position?: Position;
  /** Whether resizing is disabled */
  disabled?: boolean;
}

export interface UseResizableReturn {
  /** Current size */
  size: Size;
  /** Whether currently resizing */
  isResizing: boolean;
  /** Set size programmatically */
  setSize: (size: Size) => void;
  /** Handlers to attach to resize handle elements */
  resizeHandlers: {
    onMouseDown: (e: React.MouseEvent, direction?: ResizeDirection) => void;
  };
}

const DEFAULT_MIN_SIZE: Size = { width: 200, height: 150 };

/**
 * Hook for making elements resizable
 */
export const useResizable = ({
  initialSize,
  minSize = DEFAULT_MIN_SIZE,
  maxSize,
  onResizeEnd,
  onResize,
  position,
  disabled = false,
}: UseResizableProps): UseResizableReturn => {
  const [size, setSize] = useState<Size>(initialSize);
  const [isResizing, setIsResizing] = useState(false);

  // Refs to track resize state
  const startMouseRef = useRef<Position>({ x: 0, y: 0 });
  const initialSizeRef = useRef<Size>(initialSize);
  const initialPositionRef = useRef<Position>({ x: 0, y: 0 });
  const directionRef = useRef<ResizeDirection>('se');

  // Update size when initialSize prop changes (e.g., from store)
  useEffect(() => {
    if (!isResizing) {
      setSize(initialSize);
    }
  }, [initialSize, isResizing]);

  // Update position ref when position changes
  useEffect(() => {
    if (position) {
      initialPositionRef.current = position;
    }
  }, [position]);

  /**
   * Constrain size within min/max bounds
   */
  const constrainSize = useCallback(
    (newSize: Size): Size => {
      return {
        width: Math.max(
          minSize.width,
          maxSize ? Math.min(newSize.width, maxSize.width) : newSize.width
        ),
        height: Math.max(
          minSize.height,
          maxSize ? Math.min(newSize.height, maxSize.height) : newSize.height
        ),
      };
    },
    [minSize, maxSize]
  );

  /**
   * Handle mouse move during resize
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startMouseRef.current.x;
      const deltaY = e.clientY - startMouseRef.current.y;
      const direction = directionRef.current;

      let newWidth = initialSizeRef.current.width;
      let newHeight = initialSizeRef.current.height;
      let newPosition: Position | undefined;

      // Calculate new size based on direction
      // SE (Southeast) is the most common - bottom-right corner
      switch (direction) {
        case 'se':
          newWidth = initialSizeRef.current.width + deltaX;
          newHeight = initialSizeRef.current.height + deltaY;
          break;
        case 'e':
          newWidth = initialSizeRef.current.width + deltaX;
          break;
        case 's':
          newHeight = initialSizeRef.current.height + deltaY;
          break;
        case 'sw':
          newWidth = initialSizeRef.current.width - deltaX;
          newHeight = initialSizeRef.current.height + deltaY;
          newPosition = {
            x: initialPositionRef.current.x + deltaX,
            y: initialPositionRef.current.y,
          };
          break;
        case 'ne':
          newWidth = initialSizeRef.current.width + deltaX;
          newHeight = initialSizeRef.current.height - deltaY;
          newPosition = {
            x: initialPositionRef.current.x,
            y: initialPositionRef.current.y + deltaY,
          };
          break;
        case 'nw':
          newWidth = initialSizeRef.current.width - deltaX;
          newHeight = initialSizeRef.current.height - deltaY;
          newPosition = {
            x: initialPositionRef.current.x + deltaX,
            y: initialPositionRef.current.y + deltaY,
          };
          break;
        case 'n':
          newHeight = initialSizeRef.current.height - deltaY;
          newPosition = {
            x: initialPositionRef.current.x,
            y: initialPositionRef.current.y + deltaY,
          };
          break;
        case 'w':
          newWidth = initialSizeRef.current.width - deltaX;
          newPosition = {
            x: initialPositionRef.current.x + deltaX,
            y: initialPositionRef.current.y,
          };
          break;
      }

      const constrainedSize = constrainSize({ width: newWidth, height: newHeight });

      // Adjust position if size was constrained for edge dragging
      if (newPosition) {
        if (direction.includes('w')) {
          newPosition.x = initialPositionRef.current.x + (initialSizeRef.current.width - constrainedSize.width);
        }
        if (direction.includes('n')) {
          newPosition.y = initialPositionRef.current.y + (initialSizeRef.current.height - constrainedSize.height);
        }
      }

      setSize(constrainedSize);
      onResize?.(constrainedSize, newPosition);
    },
    [isResizing, constrainSize, onResize]
  );

  /**
   * Handle mouse up - end resize
   */
  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      onResizeEnd?.(size);
    }
  }, [isResizing, size, onResizeEnd]);

  /**
   * Handle mouse down on resize handle - start resize
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection = 'se') => {
      if (disabled) return;

      // Only respond to left mouse button
      if (e.button !== 0) return;

      // Prevent text selection and event bubbling
      e.preventDefault();
      e.stopPropagation();

      startMouseRef.current = { x: e.clientX, y: e.clientY };
      initialSizeRef.current = size;
      if (position) {
        initialPositionRef.current = position;
      }
      directionRef.current = direction;
      setIsResizing(true);
    },
    [disabled, size, position]
  );

  // Attach global mouse event listeners during resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // Add cursor style to body during resize
      const cursorMap: Record<ResizeDirection, string> = {
        n: 'ns-resize',
        s: 'ns-resize',
        e: 'ew-resize',
        w: 'ew-resize',
        ne: 'nesw-resize',
        sw: 'nesw-resize',
        nw: 'nwse-resize',
        se: 'nwse-resize',
      };
      document.body.style.cursor = cursorMap[directionRef.current];
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    size,
    isResizing,
    setSize,
    resizeHandlers: {
      onMouseDown: handleMouseDown,
    },
  };
};
