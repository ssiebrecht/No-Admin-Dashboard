/**
 * DateTimePanel Organism
 * Control panel for date and time settings
 */

import { type FC, useState, useCallback, useMemo } from 'react';
import { Text, Checkbox, Input } from '../../../atoms';
import { useSettingsStore } from '../../../../store/settingsStore';
import styles from './DateTimePanel.module.css';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * DateTimePanel - Date & Time settings control panel
 *
 * Features:
 * - Calendar showing current month
 * - Time input (HH:MM:SS)
 * - 24-hour format toggle
 * - Show date in menu bar toggle
 */
export const DateTimePanel: FC = () => {
  const { settings, updateDateTime } = useSettingsStore();
  const { dateTime } = settings;

  const [currentDate] = useState(new Date());
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());

  // Calculate calendar grid
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(displayedYear, displayedMonth, 1);
    const lastDayOfMonth = new Date(displayedYear, displayedMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    // Fill remaining cells to complete the grid (6 rows)
    const remainingCells = 42 - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(null);
    }

    return days;
  }, [displayedMonth, displayedYear]);

  const isToday = useCallback(
    (day: number | null) => {
      if (day === null) return false;
      return (
        day === currentDate.getDate() &&
        displayedMonth === currentDate.getMonth() &&
        displayedYear === currentDate.getFullYear()
      );
    },
    [currentDate, displayedMonth, displayedYear]
  );

  const goToPrevMonth = useCallback(() => {
    if (displayedMonth === 0) {
      setDisplayedMonth(11);
      setDisplayedYear((y) => y - 1);
    } else {
      setDisplayedMonth((m) => m - 1);
    }
  }, [displayedMonth]);

  const goToNextMonth = useCallback(() => {
    if (displayedMonth === 11) {
      setDisplayedMonth(0);
      setDisplayedYear((y) => y + 1);
    } else {
      setDisplayedMonth((m) => m + 1);
    }
  }, [displayedMonth]);

  const formatTime = (date: Date, use24Hour: boolean) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (use24Hour) {
      return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      };
    } else {
      const displayHours = hours % 12 || 12;
      return {
        hours: String(displayHours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        period: hours >= 12 ? 'PM' : 'AM',
      };
    }
  };

  const timeDisplay = formatTime(currentDate, dateTime.use24Hour);

  return (
    <div className={styles.panel}>
      {/* Calendar */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Date
        </Text>
        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navButton}
              onClick={goToPrevMonth}
              aria-label="Previous month"
            >
              ◀
            </button>
            <Text variant="body" weight="semibold">
              {MONTHS[displayedMonth]} {displayedYear}
            </Text>
            <button
              type="button"
              className={styles.navButton}
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              ▶
            </button>
          </div>
          <div className={styles.calendarGrid}>
            {/* Day headers */}
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className={styles.dayHeader}>
                {day}
              </div>
            ))}
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`${styles.dayCell} ${
                  day === null ? styles.empty : ''
                } ${isToday(day) ? styles.today : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Time */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Time
        </Text>
        <div className={styles.timeInputs}>
          <Input
            value={timeDisplay.hours}
            readOnly
            className={styles.timeInput}
            aria-label="Hours"
          />
          <span className={styles.timeSeparator}>:</span>
          <Input
            value={timeDisplay.minutes}
            readOnly
            className={styles.timeInput}
            aria-label="Minutes"
          />
          <span className={styles.timeSeparator}>:</span>
          <Input
            value={timeDisplay.seconds}
            readOnly
            className={styles.timeInput}
            aria-label="Seconds"
          />
          {!dateTime.use24Hour && timeDisplay.period && (
            <span className={styles.period}>{timeDisplay.period}</span>
          )}
        </div>
      </section>

      {/* Options */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Options
        </Text>
        <div className={styles.options}>
          <Checkbox
            checked={dateTime.use24Hour}
            onChange={(checked) => updateDateTime({ use24Hour: checked })}
            label="Use 24-hour clock"
          />
          <Checkbox
            checked={dateTime.showDateInMenuBar}
            onChange={(checked) => updateDateTime({ showDateInMenuBar: checked })}
            label="Show date in menu bar"
          />
        </div>
      </section>
    </div>
  );
};
