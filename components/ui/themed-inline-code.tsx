'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { ReactNode } from 'react';

interface ThemedInlineCodeProps {
  children: ReactNode;
  variant?: 'default' | 'command' | 'highlight';
  className?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  title?: string;
}

/**
 * Standardized inline code component with consistent theme-aware styling
 * Designed specifically for inline use within paragraphs and text content
 * Uses <span> element to avoid HTML nesting issues
 */
export function ThemedInlineCode({
  children,
  variant = 'default',
  className,
  onClick,
  role,
  tabIndex,
  onKeyDown,
  title,
}: ThemedInlineCodeProps) {
  const variantStyles = {
    default: `
      ${THEME_COLORS.accent.secondary}
      ${THEME_COLORS.background.card}
      px-1 py-0.5 rounded font-mono text-xs
      border border-slate-300/50 dark:border-slate-700/50
    `,
    command: `
      inline-flex items-center gap-1
      ${THEME_COLORS.accent.secondary}
      ${THEME_COLORS.background.card}
      px-2 py-1 rounded font-mono text-xs
      border border-slate-300/50 dark:border-slate-700/50
      hover:bg-slate-300 dark:hover:bg-slate-700
      cursor-pointer transition-colors
    `,
    highlight: `
      text-green-600 dark:text-green-400
      bg-green-100/50 dark:bg-green-900/20
      px-1 py-0.5 rounded font-mono text-xs
      border border-green-300/50 dark:border-green-700/50
    `,
  };

  return (
    <span
      className={cn(variantStyles[variant], className)}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      title={title}
    >
      {children}
    </span>
  );
}
