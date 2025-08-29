'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { ReactNode } from 'react';

interface ThemedHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'hero' | 'section' | 'subsection' | 'card' | 'accent' | 'stats' | 'feature';
  className?: string;
}

/**
 * Standardized heading component with consistent theme-aware styling
 * Ensures all headings follow the same visual patterns across pages
 */
export function ThemedHeading({
  children,
  level = 1,
  variant = 'hero',
  className,
  ...props
}: ThemedHeadingProps) {
  const baseStyles = {
    hero: `font-bold ${THEME_COLORS.gradient.hero} bg-clip-text text-transparent`,
    section: `font-bold ${THEME_COLORS.accent.primary}`,
    subsection: `font-medium ${THEME_COLORS.text.secondary}`,
    card: `font-semibold ${THEME_COLORS.text.primary}`,
    accent: `font-bold ${THEME_COLORS.accent.tertiary}`,
    stats: `font-bold ${THEME_COLORS.text.primary}`,
    feature: `font-semibold text-slate-800 dark:text-cyan-300`,
  };

  const sizeStyles = {
    1: 'text-5xl md:text-7xl',
    2: 'text-3xl',
    3: 'text-lg',
    4: 'text-base md:text-lg',
    5: 'text-sm md:text-base',
    6: 'text-xs md:text-sm',
  };

  const commonClassName = cn(baseStyles[variant], sizeStyles[level], className);

  switch (level) {
    case 1:
      return (
        <h1 className={commonClassName} {...props}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={commonClassName} {...props}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={commonClassName} {...props}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={commonClassName} {...props}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={commonClassName} {...props}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 className={commonClassName} {...props}>
          {children}
        </h6>
      );
    default:
      return (
        <h1 className={commonClassName} {...props}>
          {children}
        </h1>
      );
  }
}
