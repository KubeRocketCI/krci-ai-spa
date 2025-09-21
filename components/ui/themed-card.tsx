'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import { BaseThemedProps } from '@/lib/component-types';
import type { ReactNode } from 'react';

interface ThemedCardProps extends BaseThemedProps {
  variant?: 'feature' | 'stats' | 'highlight' | 'terminal' | 'glass' | 'interactive' | 'contact';
  onClick?: () => void;
}

interface ThemedCardHeaderProps {
  children: ReactNode;
  variant?: 'default' | 'terminal' | 'feature' | 'step';
  className?: string;
}

interface ThemedCardTitleProps {
  children: ReactNode;
  variant?: 'default' | 'terminal' | 'feature' | 'step';
  className?: string;
  id?: string;
}

interface ThemedCardContentProps {
  children: ReactNode;
  variant?: 'default' | 'terminal' | 'feature';
  className?: string;
}

/**
 * Standardized card component with consistent styling patterns
 * Provides semantic variants for different card use cases
 * Preserves existing dark mode aesthetics
 */
export function ThemedCard({ children, variant = 'feature', className, onClick }: ThemedCardProps) {
  const variantStyles = {
    feature: `
      ${THEME_COLORS.background.card} ${THEME_COLORS.background.cardHover}
      border ${THEME_COLORS.border.default} ${THEME_COLORS.border.hover}
      transition-all duration-300
      backdrop-blur-sm
      rounded-lg
      shadow-sm hover:shadow-md
    `,
    stats: `
      bg-gradient-to-br from-slate-50 to-white
      dark:from-slate-900/50 dark:to-black/50
      border ${THEME_COLORS.border.default}
      rounded-lg
      shadow-sm
      backdrop-blur-sm
    `,
    highlight: `
      ${THEME_COLORS.background.card} ${THEME_COLORS.background.cardHover}
      border ${THEME_COLORS.border.default} ${THEME_COLORS.border.hover}
      transition-all duration-300
      rounded-lg
      shadow-sm hover:shadow-md
    `,
    terminal: `
      bg-sky-50/60 dark:bg-gray-900
      border border-emerald-300/50 dark:border-green-700/30
      text-slate-800 dark:text-slate-200
      rounded-lg
      p-4 sm:p-6
      font-mono
      shadow-sm
    `,
    glass: `
      bg-white/90 backdrop-blur-md
      dark:bg-black/50 dark:backdrop-blur-md
      ${THEME_COLORS.border.default}/60 dark:border-white/10
      rounded-lg
      shadow-lg
    `,
    interactive: `
      bg-white/90 hover:bg-gray-50
      dark:bg-black/50 dark:hover:bg-black/80
      border border-slate-300/60 hover:border-cyan-400/80
      dark:border-white/20 dark:hover:border-cyan-400/60
      transition-all duration-300
      backdrop-blur-sm
      rounded-lg
      shadow-sm hover:shadow-md
      cursor-pointer
    `,
    contact: `
      bg-slate-100 dark:bg-slate-800
      rounded-lg
      p-4
    `,
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={cn(
        variantStyles[variant],
        onClick && 'focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

/**
 * Standardized card header component with consistent theme-aware styling
 * Provides semantic variants for different header contexts
 */
export function ThemedCardHeader({
  children,
  variant = 'default',
  className,
}: ThemedCardHeaderProps) {
  const variantStyles = {
    default: 'p-6 pb-3',
    terminal: 'p-4 pb-2 border-b border-green-300/20 dark:border-green-700/20',
    feature: 'p-6 pb-4',
    step: 'p-6 pb-3 border-b border-slate-200/50 dark:border-slate-700/50',
  };

  return <div className={cn(variantStyles[variant], className)}>{children}</div>;
}

/**
 * Standardized card title component with consistent theme-aware styling
 * Provides semantic variants for different title contexts
 */
export function ThemedCardTitle({
  children,
  variant = 'default',
  className,
  id,
}: ThemedCardTitleProps) {
  const variantStyles = {
    default: 'text-lg font-semibold text-slate-900 dark:text-white',
    terminal: 'text-lg font-semibold text-green-600 dark:text-green-300 font-mono',
    feature: 'text-xl font-bold text-slate-900 dark:text-white',
    step: 'text-lg font-semibold text-green-600 dark:text-green-300',
  };

  return (
    <h3 id={id} className={cn(variantStyles[variant], className)}>
      {children}
    </h3>
  );
}

/**
 * Standardized card content component with consistent theme-aware styling
 * Provides semantic variants for different content contexts
 */
export function ThemedCardContent({
  children,
  variant = 'default',
  className,
}: ThemedCardContentProps) {
  const variantStyles = {
    default: 'p-6',
    terminal: 'p-4',
    feature: 'p-6 pt-0',
  };

  return <div className={cn(variantStyles[variant], className)}>{children}</div>;
}
