/**
 * useDraggable Hook
 * Handles drag operations for window movement
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Position } from '../types/window';

export interface UseDraggableProps {
  /** Initial position of the element */
  initialPosition: Position;
  /** Callback when drag ends */
  onDragEnd?: (position: Position) => void;
  /** Callback during drag (for live updates) */
  onDrag?: (position: Position) => void;
  /** Constraints for the drag area */
  constraints?: {
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  };
  /** Whether dragging is disabled */
  disabled?: boolean;
}

export interface UseDraggableReturn {
  /** Current position */
  position: Position;
  /** Whether currently dragging */
  isDragging: boolean;
  /** Set position programmatically */
  setPosition: (position: Position) => void;
  /** Handlers to attach to the drag handle element */
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
  };
}

/**
 * Hook for making elements draggable
 */
export const useDraggable = ({
  initialPosition,
  onDragEnd,
  onDrag,
  constraints,
  disabled = false,
}: UseDraggableProps): UseDraggableReturn => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use refs to track drag state without causing re-renders
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });
  const initialPosRef = useRef<Position>(initialPosition);

  // Update position when initialPosition prop changes (e.g., from store)
  useEffect(() => {
    if (!isDragging) {
      setPosition(initialPosition);
    }
  }, [initialPosition, isDragging]);

  /**
   * Constrain position within bounds
   */
  const constrainPosition = useCallback(
    (pos: Position): Position => {
      let { x, y } = pos;

      if (constraints) {
        if (constraints.minX !== undefined) x = Math.max(constraints.minX, x);
        if (constraints.maxX !== undefined) x = Math.min(constraints.maxX, x);
        if (constraints.minY !== undefined) y = Math.max(constraints.minY, y);
        if (constraints.maxY !== undefined) y = Math.min(constraints.maxY, y);
      }

      // Keep window at least partially visible
      // Ensure at least 50px of the window is visible
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      x = Math.max(-200, Math.min(x, viewportWidth - 100));
      y = Math.max(0, Math.min(y, viewportHeight - 50));

      return { x, y };
    },
    [constraints]
  );

  /**
   * Handle mouse move during drag
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      const newPosition = constrainPosition({
        x: initialPosRef.current.x + deltaX,
        y: initialPosRef.current.y + deltaY,
      });

      setPosition(newPosition);
      onDrag?.(newPosition);
    },
    [isDragging, constrainPosition, onDrag]
  );

  /**
   * Handle mouse up - end drag
   */
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.(position);
    }
  }, [isDragging, position, onDragEnd]);

  /**
   * Handle mouse down on drag handle - start drag
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      
      // Only respond to left mouse button
      if (e.button !== 0) return;

      // Prevent text selection during drag
      e.preventDefault();

      dragStartRef.current = { x: e.clientX, y: e.clientY };
      initialPosRef.current = position;
      setIsDragging(true);
    },
    [disabled, position]
  );

  // Attach global mouse event listeners during drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Add cursor style to body during drag
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging,
    setPosition,
    dragHandlers: {
      onMouseDown: handleMouseDown,
    },
  };
};
