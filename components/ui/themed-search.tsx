'use client';

/**
 * Generic search UI components
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ThemedSearchContainerProps {
  children: ReactNode;
  className?: string;
}

export function ThemedSearchContainer({ children, className }: ThemedSearchContainerProps) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

interface ThemedSearchInputProps {
  children: ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

export function ThemedSearchInput({
  children,
  variant = 'default',
  className,
}: ThemedSearchInputProps) {
  const variantStyles = {
    default: 'relative',
    compact: 'relative w-full max-w-md mx-auto',
  };

  return <div className={cn(variantStyles[variant], className)}>{children}</div>;
}

interface ThemedSearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'compact';
}

export const ThemedSearchField = React.forwardRef<HTMLInputElement, ThemedSearchFieldProps>(
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

ThemedSearchField.displayName = 'ThemedSearchField';

interface ThemedCategoryContainerProps {
  children: ReactNode;
  className?: string;
}

export function ThemedCategoryContainer({ children, className }: ThemedCategoryContainerProps) {
  return <div className={cn('flex flex-wrap gap-2 sm:gap-3', className)}>{children}</div>;
}

interface ThemedCategoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: 'default' | 'compact';
}

export function ThemedCategoryButton({
  isActive = false,
  variant = 'default',
  className,
  children,
  ...props
}: ThemedCategoryButtonProps) {
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

interface ThemedResultsCountProps {
  children: ReactNode;
  className?: string;
}

export function ThemedResultsCount({ children, className }: ThemedResultsCountProps) {
  return (
    <div className={cn('text-sm text-slate-500 dark:text-slate-500', className)}>{children}</div>
  );
}

interface ThemedNoResultsProps {
  children: ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

export function ThemedNoResults({
  children,
  variant = 'default',
  className,
}: ThemedNoResultsProps) {
  const variantStyles = {
    default: 'py-12 text-center',
    compact: 'py-8 text-center',
  };

  return (
    <div className={cn(variantStyles[variant], className)}>
      <div className="text-slate-500 dark:text-slate-400">{children}</div>
    </div>
  );
}
