/**
 * Slider Atom
 * Classic Mac OS 8/9 slider with bevel effects
 */

import {
  type FC,
  type ReactNode,
  type ChangeEvent,
  type MouseEvent,
  useRef,
  useCallback,
} from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Icon displayed on the left side of the slider */
  leftIcon?: ReactNode;
  /** Icon displayed on the right side of the slider */
  rightIcon?: ReactNode;
  /** Show the current value */
  showValue?: boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Slider - Classic Mac OS 8/9 slider control
 *
 * Features:
 * - Inset track with raised thumb
 * - Optional icons on left/right
 * - Optional value display
 */
export const Slider: FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  leftIcon,
  rightIcon,
  showValue = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Slider',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate percentage for styling
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(Number(e.target.value));
    }
  };

  // Allow clicking on track to set value
  const handleTrackClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (disabled || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const trackWidth = rect.width;
      const clickPercentage = Math.max(0, Math.min(1, clickX / trackWidth));
      const newValue = min + clickPercentage * (max - min);
      
      // Snap to step
      const steppedValue = Math.round(newValue / step) * step;
      onChange(Math.max(min, Math.min(max, steppedValue)));
    },
    [disabled, min, max, step, onChange]
  );

  const wrapperClassNames = [
    styles.wrapper,
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassNames}>
      {leftIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      
      <div className={styles.sliderContainer}>
        <div
          ref={trackRef}
          className={styles.track}
          onClick={handleTrackClick}
        >
          <div
            className={styles.fill}
            style={{ width: `${percentage}%` }}
          />
          <div
            className={styles.thumb}
            style={{ left: `${percentage}%` }}
          />
        </div>
        
        {/* Native range input for accessibility */}
        <input
          type="range"
          className={styles.input}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel}
        />
      </div>
      
      {rightIcon && (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
      
      {showValue && (
        <span className={styles.value}>{Math.round(value)}</span>
      )}
    </div>
  );
};
