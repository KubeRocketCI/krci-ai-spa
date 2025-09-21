'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ThemedFAQSearchContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Standardized FAQ search container component with consistent theme-aware styling
 */
export function ThemedFAQSearchContainer({ children, className }: ThemedFAQSearchContainerProps) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

interface ThemedFAQSearchInputProps {
  children: ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

/**
 * Themed FAQ search input container
 */
export function ThemedFAQSearchInput({
  children,
  variant = 'default',
  className,
}: ThemedFAQSearchInputProps) {
  const variantStyles = {
    default: 'relative',
    compact: 'relative w-full max-w-md mx-auto',
  };

  return <div className={cn(variantStyles[variant], className)}>{children}</div>;
}

interface ThemedFAQSearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'compact';
}

/**
 * Themed FAQ search input field
 */
export const ThemedFAQSearchField = React.forwardRef<HTMLInputElement, ThemedFAQSearchFieldProps>(
  ({ variant = 'default', className, ...props }, ref) => {
    const variantStyles = {
      default: `
      w-full pl-10 pr-10 py-2
      bg-white dark:bg-black
      border border-slate-300 dark:border-slate-700
      rounded
      text-slate-800 dark:text-slate-200
      placeholder-slate-400 dark:placeholder-slate-500
      focus:outline-none
      focus:border-slate-400 dark:focus:border-slate-500
      transition-colors
    `,
      compact: `
      w-full pl-10 pr-10 py-2
      bg-slate-50 dark:bg-slate-900/50
      border border-slate-300 dark:border-slate-700
      rounded
      text-slate-800 dark:text-slate-200
      placeholder-slate-400 dark:placeholder-slate-500
      focus:outline-none
      focus:border-cyan-400 dark:focus:border-cyan-500
      transition-colors
    `,
    };

    return <input ref={ref} className={cn(variantStyles[variant], className)} {...props} />;
  },
);

ThemedFAQSearchField.displayName = 'ThemedFAQSearchField';

interface ThemedFAQCategoryContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Themed FAQ category filter container
 */
export function ThemedFAQCategoryContainer({
  children,
  className,
}: ThemedFAQCategoryContainerProps) {
  return <div className={cn('flex flex-wrap gap-2 sm:gap-3', className)}>{children}</div>;
}

interface ThemedFAQCategoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: 'default' | 'compact';
}

/**
 * Themed FAQ category filter button
 */
export function ThemedFAQCategoryButton({
  isActive = false,
  variant = 'default',
  className,
  children,
  ...props
}: ThemedFAQCategoryButtonProps) {
  const variantStyles = {
    default: isActive
      ? 'px-3 py-1 text-sm rounded transition-colors bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
      : 'px-3 py-1 text-sm rounded transition-colors text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300',
    compact: isActive
      ? 'px-3 py-1 text-sm rounded transition-colors bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
      : 'px-3 py-1 text-sm rounded transition-colors text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300',
  };

  return (
    <button className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </button>
  );
}

interface ThemedFAQResultsCountProps {
  children: ReactNode;
  className?: string;
}

/**
 * Themed FAQ search results count display
 */
export function ThemedFAQResultsCount({ children, className }: ThemedFAQResultsCountProps) {
  return (
    <div className={cn('text-sm text-slate-500 dark:text-slate-500', className)}>{children}</div>
  );
}

interface ThemedFAQNoResultsProps {
  children: ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

/**
 * Themed FAQ no results display
 */
export function ThemedFAQNoResults({
  children,
  variant = 'default',
  className,
}: ThemedFAQNoResultsProps) {
  const variantStyles = {
    default: 'py-12 text-center',
    compact: 'py-8 text-center',
  };

  return (
    <div className={cn(variantStyles[variant], className)}>
      <p className="${THEME_COLORS.text.muted} mb-4">{children}</p>
    </div>
  );
}
