'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { ReactNode } from 'react';

interface ThemedInfoBoxProps {
  children: ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'notice' | 'disclaimer' | 'critical';
  title?: string;
  className?: string;
}

/**
 * Themed information box component for legal/policy content
 * Provides semantic variants for different information contexts
 * Supports light/dark themes with consistent styling
 */
export function ThemedInfoBox({
  children,
  variant = 'info',
  title,
  className,
}: ThemedInfoBoxProps) {
  const variantStyles = {
    info: `
      bg-blue-500/10 dark:bg-blue-500/10
      border border-blue-500/30 dark:border-blue-500/30
      text-blue-600 dark:text-blue-400
    `,
    warning: `
      bg-yellow-500/10 dark:bg-yellow-500/10
      border border-yellow-500/30 dark:border-yellow-500/30
      text-yellow-600 dark:text-yellow-400
    `,
    success: `
      bg-green-500/10 dark:bg-green-500/10
      border border-green-500/30 dark:border-green-500/30
      text-green-600 dark:text-green-400
    `,
    notice: `
      bg-slate-200/50 dark:bg-slate-800/50
      ${THEME_COLORS.border.default}/30 dark:border-slate-600/30
      text-gray-700 dark:text-gray-300
    `,
    disclaimer: `
      bg-red-500/10 dark:bg-red-500/10
      border border-red-500/30 dark:border-red-500/30
      text-red-600 dark:text-red-400
    `,
    critical: `
      bg-slate-200/50 dark:bg-slate-800/50
      ${THEME_COLORS.border.default}/30 dark:border-slate-600/30
      text-slate-700 dark:text-gray-300
    `,
  };

  const titleStyles = {
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    success: 'text-green-600 dark:text-green-400',
    notice: 'text-gray-800 dark:text-gray-200',
    disclaimer: 'text-red-600 dark:text-red-400',
    critical: 'text-slate-800 dark:text-gray-200',
  };

  return (
    <div className={cn('p-4 rounded mb-4', variantStyles[variant], className)}>
      {title && <h3 className={cn('font-semibold mb-2', titleStyles[variant])}>{title}</h3>}
      <div className={variant === 'notice' ? 'text-gray-700 dark:text-gray-300' : ''}>
        {children}
      </div>
    </div>
  );
}
