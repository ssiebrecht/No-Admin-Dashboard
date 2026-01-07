/**
 * Icon Atom
 * Classic Mac OS 8/9 icon system using emoji/unicode fallbacks
 */

import { type FC } from 'react';
import styles from './Icon.module.css';

/**
 * Available icon names
 * Uses emoji/unicode as authentic retro fallbacks
 */
export type IconName =
  // System
  | 'folder'
  | 'folder-open'
  | 'file'
  | 'file-text'
  | 'trash'
  | 'computer'
  | 'disk'
  | 'floppy'
  // Actions
  | 'close'
  | 'check'
  | 'plus'
  | 'minus'
  | 'edit'
  | 'copy'
  | 'paste'
  | 'cut'
  | 'undo'
  | 'redo'
  // Navigation
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  // Status
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'question'
  // Media
  | 'search'
  | 'settings'
  | 'user'
  | 'users'
  | 'lock'
  | 'unlock'
  | 'mail'
  | 'calendar'
  | 'clock'
  | 'star'
  | 'heart'
  | 'home'
  // Window
  | 'window'
  | 'maximize'
  | 'minimize'
  | 'refresh'
  | 'external'
  | 'menu'
  | 'grip'
  // View modes
  | 'grid'
  | 'list'
  | 'columns';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  /** Icon name */
  name: IconName;
  /** Icon size */
  size?: IconSize;
  /** Additional CSS class */
  className?: string;
  /** Accessible label (for screen readers) */
  'aria-label'?: string;
}

/**
 * Icon to emoji/unicode mapping
 */
const ICON_MAP: Record<IconName, string> = {
  // System
  'folder': '📁',
  'folder-open': '📂',
  'file': '📄',
  'file-text': '📝',
  'trash': '🗑️',
  'computer': '🖥️',
  'disk': '💾',
  'floppy': '💾',
  // Actions
  'close': '✕',
  'check': '✓',
  'plus': '+',
  'minus': '−',
  'edit': '✏️',
  'copy': '📋',
  'paste': '📋',
  'cut': '✂️',
  'undo': '↩️',
  'redo': '↪️',
  // Navigation
  'arrow-up': '↑',
  'arrow-down': '↓',
  'arrow-left': '←',
  'arrow-right': '→',
  'chevron-up': '▲',
  'chevron-down': '▼',
  'chevron-left': '◀',
  'chevron-right': '▶',
  // Status
  'info': 'ℹ️',
  'warning': '⚠️',
  'error': '❌',
  'success': '✅',
  'question': '❓',
  // Media
  'search': '🔍',
  'settings': '⚙️',
  'user': '👤',
  'users': '👥',
  'lock': '🔒',
  'unlock': '🔓',
  'mail': '✉️',
  'calendar': '📅',
  'clock': '🕐',
  'star': '⭐',
  'heart': '❤️',
  'home': '🏠',
  // Window
  'window': '🪟',
  'maximize': '⬜',
  'minimize': '▬',
  'refresh': '🔄',
  'external': '↗️',
  'menu': '☰',
  'grip': '⋮⋮',
  // View modes
  'grid': '⊞',
  'list': '☰',
  'columns': '▤',
};

/**
 * Icon - Classic Mac OS style icon
 *
 * Uses emoji/unicode as authentic retro fallbacks.
 * Supports 4 sizes: sm (12px), md (16px), lg (24px), xl (32px)
 */
export const Icon: FC<IconProps> = ({
  name,
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
}) => {
  const classNames = [
    styles.icon,
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  const iconContent = ICON_MAP[name] || '?';

  return (
    <span
      className={classNames}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      {iconContent}
    </span>
  );
};
