'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { ReactNode } from 'react';

interface ThemedHighlightProps {
  children: ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'feature';
  className?: string;
}

/**
 * Standardized highlight component for special content sections
 * Provides semantic variants for different highlight contexts
 * Preserves existing dark mode highlight aesthetics
 */
export function ThemedHighlight({ children, variant = 'info', className }: ThemedHighlightProps) {
  const variantStyles = {
    info: `
      bg-blue-50 dark:bg-blue-950/20
      border border-blue-200 dark:border-blue-500/30
      text-blue-800 dark:text-blue-300
    `,
    warning: `
      bg-yellow-50 ${THEME_COLORS.background.card}/50
      ${THEME_COLORS.border.default} dark:border-yellow-500/30
      text-yellow-800 dark:text-yellow-300
    `,
    success: `
      bg-green-50 dark:bg-green-950/20
      border border-green-200 dark:border-green-500/30
      text-green-800 dark:text-green-300
    `,
    feature: `
      bg-slate-50 dark:bg-black/50
      border border-slate-200 dark:border-green-700/30
      text-slate-800 dark:text-slate-200
    `,
  };

  return <div className={cn('rounded-lg p-6', variantStyles[variant], className)}>{children}</div>;
}
