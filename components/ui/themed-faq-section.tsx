'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ThemedFAQSectionProps {
  children: ReactNode;
  variant?: 'preview' | 'full' | 'compact';
  className?: string;
}

/**
 * Standardized FAQ section component with consistent theme-aware styling
 * Provides semantic variants for different FAQ display contexts
 * Preserves existing dark mode terminal aesthetics while adding light theme support
 */
export function ThemedFAQSection({
  children,
  variant = 'preview',
  className,
}: ThemedFAQSectionProps) {
  const variantStyles = {
    preview: `
      py-16 px-4
      bg-slate-50/50 dark:bg-gray-900/10
      text-slate-900 dark:text-slate-200
    `,
    full: `
      py-8 px-4
      bg-white dark:bg-black
      text-slate-900 dark:text-slate-200
    `,
    compact: `
      py-8 px-4
      bg-slate-50/30 dark:bg-gray-900/5
      text-slate-900 dark:text-slate-200
    `,
  };

  return <section className={cn(variantStyles[variant], className)}>{children}</section>;
}
