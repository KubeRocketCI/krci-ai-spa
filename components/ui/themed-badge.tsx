'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { BaseThemedProps, SizeVariant, StateVariant } from '@/lib/component-types';

interface ThemedBadgeProps extends BaseThemedProps {
  variant?: 'primary' | 'secondary' | 'accent' | StateVariant | 'outline';
  size?: SizeVariant;
}

/**
 * Standardized badge component with consistent theme-aware styling
 * Provides semantic variants for different badge contexts
 * Preserves existing dark mode aesthetics
 */
export function ThemedBadge({
  children,
  variant = 'primary',
  size = 'sm',
  className,
}: ThemedBadgeProps) {
  const variantStyles = {
    primary: `
      bg-cyan-700/90 text-white border border-cyan-800
      dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700
    `,
    secondary: `
      bg-slate-200/50 dark:bg-slate-800/50
      ${THEME_COLORS.text.secondary}
      ${THEME_COLORS.border.default}
    `,
    accent: `
      bg-blue-200/30 dark:bg-blue-900/30
      text-blue-700 dark:text-blue-300
      border border-blue-600 dark:border-blue-700
    `,
    success: `
      bg-green-100 text-green-700 border border-green-300
      dark:bg-green-900/30 dark:text-green-300 dark:border-green-700
    `,
    warning: `
      bg-yellow-200/30 dark:bg-yellow-900/30
      text-yellow-700 dark:text-yellow-300
      border border-yellow-600 dark:border-yellow-700
    `,
    info: `
      bg-purple-200/30 dark:bg-purple-900/30
      text-purple-700 dark:text-purple-300
      border border-purple-600 dark:border-purple-700
    `,
    error: `
      bg-red-100 text-red-700 border border-red-300
      dark:bg-red-900/30 dark:text-red-300 dark:border-red-700
    `,
    outline: `
      bg-transparent
      ${THEME_COLORS.text.muted}
      ${THEME_COLORS.border.default}
    `,
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs rounded-md',
    default: 'px-3 py-1.5 text-sm rounded-md',
    lg: 'px-4 py-2 text-base rounded-lg',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
