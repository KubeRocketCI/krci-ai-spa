'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { ReactNode } from 'react';

interface ThemedCodeBlockProps {
  children: ReactNode;
  variant?: 'inline' | 'block' | 'terminal';
  className?: string;
}

/**
 * Standardized code block component with consistent theme-aware styling
 * Provides semantic variants for different code display contexts
 * Preserves existing dark mode terminal aesthetics
 */
export function ThemedCodeBlock({ children, variant = 'block', className }: ThemedCodeBlockProps) {
  const variantStyles = {
    inline: `
      ${THEME_COLORS.background.section} dark:bg-slate-800
      text-slate-800 dark:text-slate-200
      px-2 py-1 rounded text-sm font-mono
      border border-slate-200 dark:border-slate-700
    `,
    block: `
      bg-slate-100 dark:bg-black
      text-slate-800 dark:text-green-400
      rounded p-3 sm:p-4 font-mono
      border border-slate-200 dark:border-green-700/30
      whitespace-pre-wrap break-words
    `,
    terminal: `
      bg-slate-100 dark:bg-black
      text-slate-800 dark:text-green-400
      rounded p-4 font-mono
      border border-slate-200 dark:border-green-700/30
      whitespace-pre-wrap break-words
    `,
  };

  return <div className={cn(variantStyles[variant], className)}>{children}</div>;
}
