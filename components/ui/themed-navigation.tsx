'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

interface ThemedNavigationProps {
  children: ReactNode;
  className?: string | undefined;
}

interface ThemedNavLinkProps {
  children: ReactNode;
  href: string;
  isActive?: boolean | undefined;
  external?: boolean | undefined;
  onClick?: (() => void) | undefined;
  className?: string | undefined;
}

/**
 * Themed navigation container with consistent header styling
 * Provides theme-aware navigation wrapper for header components
 */
export function ThemedNavigation({ children, className }: ThemedNavigationProps) {
  return <nav className={cn('flex items-center space-x-8', className)}>{children}</nav>;
}

/**
 * Themed navigation link with terminal-style active indicators
 * Provides consistent navigation link styling with theme support
 */
export function ThemedNavLink({
  children,
  href,
  isActive = false,
  external = false,
  onClick,
  className,
}: ThemedNavLinkProps) {
  const baseStyles = `
    ${THEME_COLORS.text.muted} hover:text-slate-800
    dark:text-cyan-300 dark:hover:text-blue-400
    transition-colors duration-200
    font-sans text-sm font-medium
    relative group flex items-center
  `;

  const activeStyles = isActive ? 'text-slate-800 dark:text-blue-300' : '';

  const linkContent = (
    <>
      <span
        className={cn(
          'mr-1 font-sans font-bold transition-opacity duration-200',
          isActive ? 'text-slate-800 dark:text-blue-300 opacity-100' : 'opacity-0',
        )}
      >
        {'>'}
      </span>
      {children}
      {external && (
        <ExternalLink className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
      )}
      <span
        className={cn(
          'absolute -bottom-1 left-0 h-px transition-all duration-300',
          isActive
            ? 'w-full bg-slate-800 dark:bg-blue-300'
            : 'w-0 bg-slate-800 dark:bg-blue-400 group-hover:w-full',
        )}
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, activeStyles, className)}
        onClick={onClick}
        aria-label={typeof children === 'string' ? `${children} (opens in a new tab)` : undefined}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(baseStyles, activeStyles, className)}
      {...(onClick ? { onClick } : {})}
    >
      {linkContent}
    </Link>
  );
}

/**
 * Mobile navigation link variant with simplified styling
 */
export function ThemedMobileNavLink({
  children,
  href,
  isActive = false,
  external = false,
  onClick,
  className,
}: ThemedNavLinkProps) {
  const baseStyles = `
    ${THEME_COLORS.text.muted} hover:text-slate-800
    dark:text-cyan-300 dark:hover:text-blue-400
    transition-colors duration-200
    font-sans text-sm font-medium
    py-2 px-1
    border-b ${THEME_COLORS.border.default}/20 hover:border-slate-400/40
    dark:border-cyan-500/20 dark:hover:border-blue-400/40
    flex items-center
  `;

  const activeStyles = isActive
    ? 'text-slate-800 dark:text-blue-300 border-slate-600/60 dark:border-blue-300/60'
    : '';

  const linkContent = (
    <>
      <span
        className={cn(
          'mr-2 font-mono transition-opacity duration-200',
          isActive ? 'text-slate-800 dark:text-blue-300 opacity-100' : 'opacity-0',
        )}
      >
        {'>'}
      </span>
      {children}
      {external && <ExternalLink className="w-3 h-3 ml-1 opacity-70" />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, activeStyles, className)}
        onClick={onClick}
        aria-label={typeof children === 'string' ? `${children} (opens in a new tab)` : undefined}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(baseStyles, activeStyles, className)}
      {...(onClick ? { onClick } : {})}
    >
      {linkContent}
    </Link>
  );
}
