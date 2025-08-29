'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ThemedSectionProps {
  children: ReactNode;
  variant?: 'hero' | 'content' | 'feature' | 'stats' | 'cta';
  spacing?: 'tight' | 'normal' | 'loose' | 'hero';
  background?: 'none' | 'muted' | 'accent' | 'aurora';
  className?: string;
}

/**
 * Standardized section component with consistent spacing and background patterns
 * Provides semantic layout variants for different page sections
 */
export function ThemedSection({
  children,
  variant = 'content',
  spacing = 'normal',
  background = 'none',
  className,
}: ThemedSectionProps) {
  const variantStyles = {
    hero: 'text-center',
    content: '',
    feature: '',
    stats: 'text-center',
    cta: 'text-center',
  };

  const spacingStyles = {
    tight: 'py-8 px-4',
    normal: 'py-16 px-4',
    loose: 'py-20 px-4',
    hero: 'py-20 px-4',
  };

  const backgroundStyles = {
    none: '',
    muted: 'bg-slate-50 dark:bg-slate-900/20',
    accent:
      'bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20',
    aurora: '', // Will be wrapped with AuroraBackground component
  };

  return (
    <section
      className={cn(
        spacingStyles[spacing],
        backgroundStyles[background],
        variantStyles[variant],
        className,
      )}
    >
      {variant === 'hero' || variant === 'stats' || variant === 'cta' ? (
        <div className="container mx-auto max-w-4xl">{children}</div>
      ) : variant === 'feature' ? (
        <div className="container mx-auto max-w-6xl">{children}</div>
      ) : (
        <div className="container mx-auto max-w-4xl">{children}</div>
      )}
    </section>
  );
}
