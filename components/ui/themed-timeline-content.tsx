'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ThemedTimelineContentProps {
  children: ReactNode;
  className?: string;
}

interface ThemedTimelineListItemProps {
  children: ReactNode;
  variant?: 'success' | 'progress' | 'planned' | 'default';
  className?: string;
}

/**
 * Themed container for timeline content sections
 */
export function ThemedTimelineContent({ children, className }: ThemedTimelineContentProps) {
  return <div className={cn('space-y-3 mb-6', className)}>{children}</div>;
}

/**
 * Themed list item for timeline content with consistent styling
 */
export function ThemedTimelineListItem({
  children,
  variant = 'default',
  className,
}: ThemedTimelineListItemProps) {
  const variantStyles = {
    success: 'text-green-700 dark:text-green-300',
    progress: '${THEME_COLORS.accent.secondary}',
    planned: 'text-purple-600 dark:text-purple-400',
    default: 'text-slate-700 dark:text-slate-300',
  };

  return (
    <div className={cn('flex items-center gap-2 text-sm', variantStyles[variant], className)}>
      {children}
    </div>
  );
}
