'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface ThemedLinkProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted' | 'footer' | 'breadcrumb' | 'button';
  external?: boolean;
  className?: string;
}

/**
 * Standardized link component with consistent theme-aware styling
 * Provides semantic variants for different link contexts
 * Preserves existing dark mode aesthetics
 */
export function ThemedLink({
  children,
  href,
  variant = 'primary',
  external = false,
  className,
}: ThemedLinkProps) {
  const variantStyles = {
    primary: `
      ${THEME_COLORS.accent.secondary}
      hover:text-cyan-700 dark:hover:text-cyan-300
      underline decoration-cyan-600/30 dark:decoration-cyan-400/30
      hover:decoration-cyan-600/60 dark:hover:decoration-cyan-400/60
      transition-all duration-200
    `,
    secondary: `
      ${THEME_COLORS.text.secondary}
      hover:${THEME_COLORS.accent.secondary}
      underline decoration-slate-400/30 dark:decoration-slate-400/30
      hover:decoration-cyan-600/60 dark:hover:decoration-cyan-400/60
      transition-all duration-200
    `,
    accent: `
      text-green-600 dark:text-green-400
      hover:text-green-700 dark:hover:text-green-300
      underline decoration-green-600/30 dark:decoration-green-400/30
      hover:decoration-green-600/60 dark:hover:decoration-green-400/60
      transition-all duration-200
    `,
    muted: `
      text-slate-500 dark:text-slate-400
      hover:text-slate-700 dark:hover:text-slate-300
      no-underline hover:underline
      decoration-slate-400/50 dark:decoration-slate-400/50
      transition-all duration-200
    `,
    footer: `
      text-slate-400 dark:text-slate-500
      hover:text-slate-600 dark:hover:text-slate-400
      no-underline hover:underline
      decoration-slate-400/50 dark:decoration-slate-400/50
      transition-all duration-200
    `,
    breadcrumb: `
      text-cyan-400 dark:text-cyan-400
      hover:text-cyan-300 dark:hover:text-cyan-300
      no-underline
      transition-colors duration-200
    `,
    button: `
      no-underline
      transition-colors duration-200
    `,
  };

  const commonProps = {
    className: cn(variantStyles[variant], className),
    ...(external && {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
  };

  return (
    <Link href={href} {...commonProps}>
      {children}
    </Link>
  );
}
