'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ThemedInstallationTitleProps {
  children: ReactNode;
  className?: string;
}

interface ThemedInstallationCodeBlockProps {
  children: ReactNode;
  className?: string;
}

interface ThemedInstallationCommandProps {
  children: ReactNode;
  className?: string;
}

interface ThemedInstallationCommentProps {
  children: ReactNode;
  className?: string;
}

interface ThemedInstallationHelpTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Themed installation section title with consistent emerald color
 */
export function ThemedInstallationTitle({ children, className }: ThemedInstallationTitleProps) {
  return (
    <h3
      className={cn(
        'text-lg sm:text-xl font-semibold text-emerald-700 dark:text-green-300 mb-4',
        className,
      )}
    >
      {children}
    </h3>
  );
}

/**
 * Themed code block background for installation commands
 */
export function ThemedInstallationCodeBlock({
  children,
  className,
}: ThemedInstallationCodeBlockProps) {
  return (
    <div
      className={cn(
        'bg-slate-100 dark:bg-black rounded p-3 sm:p-4 flex items-start justify-between font-mono',
        'border border-slate-200 dark:border-gray-800',
        'shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Themed command text within installation code blocks
 */
export function ThemedInstallationCommand({ children, className }: ThemedInstallationCommandProps) {
  return <code className={cn('text-emerald-700 dark:text-green-400', className)}>{children}</code>;
}

/**
 * Themed comment text for installation commands
 */
export function ThemedInstallationComment({ children, className }: ThemedInstallationCommentProps) {
  return (
    <span className={cn('text-emerald-600/70 dark:text-green-300/60', className)}>{children}</span>
  );
}

/**
 * Themed help text for installation section
 */
export function ThemedInstallationHelpText({
  children,
  className,
}: ThemedInstallationHelpTextProps) {
  return <p className={cn('${THEME_COLORS.text.muted} text-sm', className)}>{children}</p>;
}
