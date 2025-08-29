'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { ReactNode } from 'react';

interface ThemedTerminalProps {
  children: ReactNode;
  variant?: 'default' | 'compact' | 'interactive' | 'hero';
  showHeader?: boolean;
  className?: string;
}

interface ThemedTerminalTextProps {
  children: ReactNode;
  variant?: 'command' | 'prompt' | 'output' | 'label';
  className?: string;
}

interface ThemedTerminalCursorProps {
  visible?: boolean;
  className?: string;
}

/**
 * Standardized terminal component with consistent theme-aware styling
 * Provides semantic variants for different terminal contexts
 * Preserves existing dark mode terminal aesthetics
 */
export function ThemedTerminal({
  children,
  variant = 'default',
  showHeader = true,
  className,
}: ThemedTerminalProps) {
  const variantStyles = {
    default: `
      ${THEME_COLORS.background.section} dark:bg-gray-900
      border border-green-300/30 dark:border-green-700/30
      rounded-lg
      shadow-sm
    `,
    compact: `
      bg-slate-50 dark:bg-gray-800
      border border-green-300/20 dark:border-green-700/20
      rounded
      shadow-sm
    `,
    interactive: `
      ${THEME_COLORS.background.section} dark:bg-gray-900
      border border-green-300/30 dark:border-green-700/30
      hover:border-green-400/50 dark:hover:border-green-600/50
      rounded-lg
      shadow-sm hover:shadow-md
      transition-all duration-200
    `,
    hero: `
      bg-gray-100/90 dark:bg-gray-900
      border border-slate-300/50 dark:border-green-700/30
      text-slate-900 dark:text-slate-200
      rounded-lg
    `,
  };

  const headerStyles =
    variant === 'hero'
      ? 'flex items-center mb-4'
      : 'flex items-center px-4 py-2 border-b border-green-300/20 dark:border-green-700/20';

  const contentStyles =
    variant === 'hero' ? '' : 'p-6 font-mono text-green-600 dark:text-green-400';

  return (
    <div
      className={cn(variantStyles[variant], variant === 'hero' ? 'p-6 font-mono' : '', className)}
    >
      {showHeader && (
        <div className={headerStyles}>
          <div className="flex space-x-2" aria-hidden="true">
            <div
              className="w-3 h-3 bg-red-500 rounded-full"
              title="Close button (decorative)"
            ></div>
            <div
              className="w-3 h-3 bg-yellow-500 rounded-full"
              title="Minimize button (decorative)"
            ></div>
            <div
              className="w-3 h-3 bg-green-500 rounded-full"
              title="Maximize button (decorative)"
            ></div>
          </div>
          {variant === 'hero' ? (
            <ThemedTerminalText variant="label" className="ml-4 text-sm">
              terminal
            </ThemedTerminalText>
          ) : (
            <div className="ml-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
              Terminal
            </div>
          )}
        </div>
      )}
      <div className={contentStyles}>{children}</div>
    </div>
  );
}

/**
 * Themed terminal text with semantic variants for different terminal elements
 */
export function ThemedTerminalText({
  children,
  variant = 'output',
  className,
}: ThemedTerminalTextProps) {
  const variantStyles = {
    // Command text - high contrast for readability
    command: 'text-emerald-700 dark:text-green-400',
    // Shell prompt ($) - distinctive blue
    prompt: 'text-blue-600 dark:text-blue-400',
    // Regular output - standard terminal text
    output: 'text-slate-800 dark:text-slate-300',
    // Labels like "terminal" - muted but readable
    label: 'text-slate-600 dark:text-green-400',
  };

  return <span className={cn(variantStyles[variant], className)}>{children}</span>;
}

/**
 * Themed terminal cursor with proper visibility in both themes
 */
export function ThemedTerminalCursor({ visible = true, className }: ThemedTerminalCursorProps) {
  if (!visible) return null;

  return (
    <span
      className={cn('bg-emerald-600/80 dark:bg-green-300/70 text-transparent px-0.5', className)}
    >
      |
    </span>
  );
}
