'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { ReactNode } from 'react';

interface ThemedTabsProps {
  children: ReactNode;
  defaultValue: string;
  className?: string;
}

interface ThemedTabsListProps {
  children: ReactNode;
  variant?: 'default' | 'minimal' | 'accent';
  className?: string;
}

interface ThemedTabsTriggerProps {
  children: ReactNode;
  value: string;
  variant?: 'default' | 'minimal' | 'accent';
  className?: string;
}

interface ThemedTabsContentProps {
  children: ReactNode;
  value: string;
  variant?: 'default' | 'terminal' | 'card';
  className?: string;
}

/**
 * Standardized tabs component with consistent theme-aware styling
 * Provides semantic variants for different tab contexts
 * Preserves existing dark mode aesthetics
 */
export function ThemedTabs({ children, defaultValue, className }: ThemedTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className={cn('w-full', className)}>
      {children}
    </Tabs>
  );
}

export function ThemedTabsList({ children, variant = 'default', className }: ThemedTabsListProps) {
  const variantStyles = {
    default: `
      bg-slate-100 dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
    `,
    minimal: `
      bg-transparent
      border-b border-slate-200 dark:border-slate-700
    `,
    accent: `
      bg-cyan-50 dark:bg-cyan-950/30
      border border-cyan-200 dark:border-cyan-800
    `,
  };

  return (
    <TabsList
      className={cn('grid w-full mb-8 sm:mb-10 mx-auto', variantStyles[variant], className)}
    >
      {children}
    </TabsList>
  );
}

export function ThemedTabsTrigger({
  children,
  value,
  variant = 'default',
  className,
}: ThemedTabsTriggerProps) {
  const variantStyles = {
    default: `
      ${THEME_COLORS.text.muted}
      data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100
      data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700
      hover:text-slate-800 dark:hover:text-slate-200
    `,
    minimal: `
      ${THEME_COLORS.text.muted}
      data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400
      data-[state=active]:border-b-2 data-[state=active]:border-cyan-600 dark:data-[state=active]:border-cyan-400
      hover:text-slate-800 dark:hover:text-slate-200
    `,
    accent: `
      ${THEME_COLORS.accent.primary}
      data-[state=active]:text-cyan-900 dark:data-[state=active]:text-cyan-100
      data-[state=active]:bg-cyan-200 dark:data-[state=active]:bg-cyan-800
      hover:text-cyan-800 dark:hover:text-cyan-200
    `,
  };

  return (
    <TabsTrigger value={value} className={cn(variantStyles[variant], className)}>
      {children}
    </TabsTrigger>
  );
}

export function ThemedTabsContent({
  children,
  value,
  variant = 'default',
  className,
}: ThemedTabsContentProps) {
  const variantStyles = {
    default: `
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-700
      rounded-lg p-4 sm:p-6
    `,
    terminal: `
      bg-slate-100 dark:bg-gray-900
      border border-green-300/30 dark:border-green-700/30
      rounded-lg p-4 sm:p-6
      font-mono
    `,
    card: `
      bg-slate-50 dark:bg-slate-800/50
      border border-slate-200 dark:border-slate-700
      rounded-lg p-6
    `,
  };

  return (
    <TabsContent value={value} className={cn(variantStyles[variant], className)}>
      {children}
    </TabsContent>
  );
}
