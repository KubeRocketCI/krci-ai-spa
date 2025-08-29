'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { LucideIcon } from 'lucide-react';

interface ThemedTimelineIconProps {
  icon: LucideIcon;
  variant?: 'success' | 'progress' | 'planned';
  className?: string;
}

/**
 * Standardized timeline icon component with consistent theme-aware styling
 * Provides semantic variants for different timeline states
 */
export function ThemedTimelineIcon({
  icon: Icon,
  variant = 'success',
  className,
}: ThemedTimelineIconProps) {
  const variantStyles = {
    success: `
      text-green-600 dark:text-green-400
      bg-green-200/10 dark:bg-green-500/10
      p-2 rounded-full
    `,
    progress: `
      ${THEME_COLORS.accent.secondary}
      bg-cyan-500/10 dark:bg-cyan-500/10
      p-2 rounded-full
    `,
    planned: `
      text-purple-600 dark:text-purple-400
      bg-purple-500/10 dark:bg-purple-500/10
      p-2 rounded-full
    `,
  };

  return (
    <div className={cn(variantStyles[variant], className)}>
      <Icon className="w-6 h-6" />
    </div>
  );
}
