/**
 * Divider Atom
 * Classic Mac OS 8/9 divider with 3D gradient effect
 */

import { type FC } from 'react';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  /** Divider orientation */
  orientation?: DividerOrientation;
  /** Additional CSS class */
  className?: string;
}

/**
 * Divider - Classic Mac OS separator line
 *
 * Features 2px with gradient (dark to light) for 3D effect.
 * Horizontal or vertical orientation.
 */
export const Divider: FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  const classNames = [
    styles.divider,
    styles[orientation],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      role="separator"
      aria-orientation={orientation}
    />
  );
};
