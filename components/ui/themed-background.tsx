'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { ReactNode } from 'react';

interface ThemedBackgroundProps {
  children: ReactNode;
  variant?: 'main' | 'section' | 'card' | 'terminal' | 'glass';
  className?: string;
}

/**
 * Standardized background component with consistent theme-aware styling
 * Provides semantic background variants that work well in both light and dark themes
 */
export function ThemedBackground({ children, variant = 'main', className }: ThemedBackgroundProps) {
  const variantStyles = {
    main: `${THEME_COLORS.background.card} ${THEME_COLORS.text.primary}`,
    section: `${THEME_COLORS.background.section} ${THEME_COLORS.text.primary}`,
    card: 'bg-card text-card-foreground border border-border',
    terminal: `bg-gray-100/80 ${THEME_COLORS.border.default}/50 ${THEME_COLORS.text.primary} dark:bg-gray-900 dark:border-green-700/30 dark:text-slate-200`,
    glass: `bg-white/90 backdrop-blur-md ${THEME_COLORS.border.default}/60 shadow-sm dark:bg-black/50 dark:border-white/10`,
  };

  return <div className={cn(variantStyles[variant], className)}>{children}</div>;
}
