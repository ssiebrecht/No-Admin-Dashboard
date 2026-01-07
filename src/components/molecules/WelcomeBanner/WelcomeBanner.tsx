/**
 * WelcomeBanner Molecule
 * Classic Mac OS 8/9 welcome banner with gradient background
 */

import { type FC } from 'react';
import { Text, Icon } from '../../atoms';
import styles from './WelcomeBanner.module.css';

export interface WelcomeBannerProps {
  /** User name to display */
  userName?: string;
  /** Custom greeting text */
  greeting?: string;
  /** Show current date */
  showDate?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Format current date in German locale
 */
const formatDate = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return now.toLocaleDateString('de-DE', options);
};

/**
 * WelcomeBanner - Full width welcome banner
 *
 * Features:
 * - Gradient background using highlight color
 * - Welcome message with optional user name
 * - Current date display
 * - Classic Mac OS styling
 */
export const WelcomeBanner: FC<WelcomeBannerProps> = ({
  userName = 'Admin',
  greeting = 'Welcome back',
  showDate = true,
  className = '',
}) => {
  const classNames = [
    styles.banner,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <Icon name="computer" size="xl" className={styles.icon} />
        </div>
        <div className={styles.textContainer}>
          <Text variant="h2" weight="bold" className={styles.greeting}>
            {greeting}, {userName}!
          </Text>
          {showDate && (
            <Text variant="body" className={styles.date}>
              {formatDate()}
            </Text>
          )}
        </div>
      </div>
      <div className={styles.decoration}>
        <span className={styles.decorIcon}>🍎</span>
      </div>
    </div>
  );
};
