'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { BaseThemedProps, CommonVariant } from '@/lib/component-types';

interface ThemedTextProps extends BaseThemedProps {
  variant?:
    | CommonVariant
    | 'lead'
    | 'body'
    | 'terminal'
    | 'problem'
    | 'solution'
    | 'stats'
    | 'caption'
    | 'date';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  as?: 'p' | 'span' | 'div' | 'small';
}

/**
 * Standardized text component with consistent theme-aware styling
 * Provides semantic color variants that work well in both light and dark themes
 * Preserves existing dark mode colors while adding more semantic options
 */
export function ThemedText({
  children,
  variant = 'body',
  size = 'base',
  as = 'span',
  className,
}: ThemedTextProps) {
  const Component = as;

  const variantStyles = {
    lead: `${THEME_COLORS.text.muted} font-medium leading-relaxed`, // Hero intro text
    body: `${THEME_COLORS.text.secondary} leading-relaxed`, // Standard readable text
    muted: THEME_COLORS.text.subtle, // Secondary/subtle text
    primary: THEME_COLORS.text.primary, // Primary text color
    secondary: THEME_COLORS.text.secondary, // Secondary text color
    accent: THEME_COLORS.accent.primary, // Cyan accent color
    terminal: `${THEME_COLORS.accent.tertiary} font-mono`, // Terminal/code text
    problem: 'text-red-600 dark:text-red-400', // Error/problem indicators
    solution: THEME_COLORS.accent.tertiary, // Success/solution indicators
    stats: `${THEME_COLORS.text.secondary} font-medium`, // Stats and metrics
    caption: `${THEME_COLORS.text.subtle} text-sm leading-snug`, // Small helper text
    date: 'text-cyan-700/70 dark:text-cyan-300/70', // Date and timestamp text - matches timeline titles
  };

  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  return (
    <Component className={cn(variantStyles[variant], sizeStyles[size], className)}>
      {children}
    </Component>
  );
}
