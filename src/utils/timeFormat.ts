/**
 * Time Formatting Utilities
 * Human-readable relative time formatting
 */

/**
 * Format a timestamp as relative time
 * @param timestamp - ISO timestamp string
 * @returns Human-readable relative time string
 */
export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  
  // Handle future dates
  if (diffMs < 0) {
    return 'Just now';
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Just now: less than 30 seconds
  if (diffSeconds < 30) {
    return 'Just now';
  }

  // Seconds: less than 1 minute
  if (diffSeconds < 60) {
    return `${diffSeconds} sec ago`;
  }

  // Minutes: less than 1 hour
  if (diffMinutes < 60) {
    return diffMinutes === 1 ? '1 min ago' : `${diffMinutes} min ago`;
  }

  // Hours: less than 24 hours
  if (diffHours < 24) {
    return diffHours === 1 ? '1 hr ago' : `${diffHours} hrs ago`;
  }

  // Yesterday: 24-48 hours
  if (diffDays === 1) {
    return 'Yesterday';
  }

  // Days: less than 7 days
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  // Weeks: less than 4 weeks
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
  }

  // Months: less than 12 months
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
  }

  // Years
  const diffYears = Math.floor(diffDays / 365);
  return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
};

/**
 * Format a timestamp to a readable date/time string
 * @param timestamp - ISO timestamp string
 * @returns Formatted date/time string
 */
export const formatDateTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
