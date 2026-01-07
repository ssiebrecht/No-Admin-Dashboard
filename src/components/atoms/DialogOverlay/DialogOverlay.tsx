/**
 * DialogOverlay Atom
 * Classic Mac OS 8/9 modal overlay for dialogs
 */

import { type FC, type ReactNode, type MouseEvent } from 'react';
import styles from './DialogOverlay.module.css';

export interface DialogOverlayProps {
  /** Whether the overlay is visible */
  isOpen: boolean;
  /** Click handler for the overlay background */
  onClick?: () => void;
  /** Content to display (typically a Dialog) */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * DialogOverlay - Modal backdrop for dialogs
 *
 * Provides a semi-transparent overlay that centers its children.
 * Clicking the overlay (not its children) triggers the onClick callback.
 */
export const DialogOverlay: FC<DialogOverlayProps> = ({
  isOpen,
  onClick,
  children,
  className = '',
}) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    // Only trigger if clicking directly on the overlay, not its children
    if (e.target === e.currentTarget && onClick) {
      onClick();
    }
  };

  const classNames = [styles.overlay, className].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      onClick={handleOverlayClick}
      role="presentation"
      aria-hidden="true"
    >
      {children}
    </div>
  );
};
