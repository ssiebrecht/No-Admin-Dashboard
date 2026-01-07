/**
 * WindowButton Atom
 * Classic Mac OS 8/9 window control buttons (Close, Zoom, Collapse)
 */

import { type FC, type MouseEvent } from 'react';
import type { WindowButtonType } from '../../../types/window';
import styles from './WindowButton.module.css';

export interface WindowButtonProps {
  /** Type of window button */
  type: WindowButtonType;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * WindowButton - Classic Mac OS window control button
 * 
 * Renders as a small 13x11px button with 3D bevel effect.
 * Each type has a distinct icon pattern.
 */
export const WindowButton: FC<WindowButtonProps> = ({
  type,
  disabled = false,
  onClick,
  className = '',
}) => {
  const classNames = [
    styles.button,
    styles[type],
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering window focus/drag
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  // Aria labels for accessibility
  const ariaLabels: Record<WindowButtonType, string> = {
    close: 'Close window',
    zoom: 'Zoom window',
    collapse: 'Collapse window',
  };

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabels[type]}
    >
      <span className={styles.icon} aria-hidden="true" />
    </button>
  );
};
