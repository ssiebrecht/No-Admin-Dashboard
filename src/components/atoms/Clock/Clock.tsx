/**
 * Clock Atom
 * Classic Mac OS 8/9 menu bar clock
 */

import { type FC, useState, useEffect } from 'react';
import styles from './Clock.module.css';

export type ClockFormat = '12h' | '24h';

export interface ClockProps {
  /** Time format (12-hour or 24-hour) */
  format?: ClockFormat;
  /** Whether to show the date */
  showDate?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Format time according to Mac OS 8/9 style
 */
const formatTime = (date: Date, format: ClockFormat): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const paddedMinutes = minutes.toString().padStart(2, '0');

  if (format === '12h') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${paddedMinutes} ${period}`;
  }

  return `${hours.toString().padStart(2, '0')}:${paddedMinutes}`;
};

/**
 * Format date in short Mac OS style (e.g., "Mon Jan 7")
 */
const formatDate = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();

  return `${dayName} ${monthName} ${dayNum}`;
};

/**
 * Clock - Classic Mac OS menu bar clock
 *
 * Displays current time in the menu bar, updating every minute.
 * Optionally shows the date.
 */
export const Clock: FC<ClockProps> = ({
  format = '12h',
  showDate = false,
  className = '',
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update immediately to sync with current time
    setCurrentTime(new Date());

    // Calculate time until next minute
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Set timeout for first update at start of next minute
    const initialTimeout = setTimeout(() => {
      setCurrentTime(new Date());

      // Then set interval for every minute
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);

      // Store interval ID for cleanup
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(initialTimeout);
  }, []);

  // Secondary effect for minute-based updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const classNames = [styles.clock, className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {showDate && (
        <span className={styles.date}>{formatDate(currentTime)}</span>
      )}
      <span className={styles.time}>{formatTime(currentTime, format)}</span>
    </div>
  );
};
