/**
 * Text Atom
 * Classic Mac OS 8/9 typography component
 */

import { type FC, type ReactNode, type ElementType } from 'react';
import styles from './Text.module.css';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'small' | 'mono';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'disabled' | 'inverse' | 'error' | 'success' | 'warning' | 'info';

export interface TextProps {
  /** Text variant (determines size and default element) */
  variant?: TextVariant;
  /** Font weight */
  weight?: TextWeight;
  /** Text color */
  color?: TextColor;
  /** Override the HTML element */
  as?: ElementType;
  /** Text content */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Center align text */
  center?: boolean;
}

/**
 * Default HTML element for each variant
 */
const DEFAULT_ELEMENTS: Record<TextVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  label: 'span',
  small: 'span',
  mono: 'code',
};

/**
 * Text - Classic Mac OS typography component
 *
 * Uses the design token typography system.
 * Supports multiple variants and semantic colors.
 */
export const Text: FC<TextProps> = ({
  variant = 'body',
  weight,
  color,
  as,
  children,
  className = '',
  truncate = false,
  center = false,
}) => {
  const Component = as || DEFAULT_ELEMENTS[variant];

  const classNames = [
    styles.text,
    styles[variant],
    weight ? styles[`weight-${weight}`] : '',
    color ? styles[`color-${color}`] : '',
    truncate ? styles.truncate : '',
    center ? styles.center : '',
    className,
  ].filter(Boolean).join(' ');

  return <Component className={classNames}>{children}</Component>;
};
