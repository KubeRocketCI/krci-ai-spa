'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

interface ThemedFooterProps {
  children: ReactNode;
  className?: string | undefined;
}

interface ThemedFooterSectionProps {
  children: ReactNode;
  title?: string | undefined;
  className?: string | undefined;
}

interface ThemedFooterLinkProps {
  children: ReactNode;
  href: string;
  external?: boolean | undefined;
  icon?: ReactNode | undefined;
  onClick?: (() => void) | undefined;
  className?: string | undefined;
}

interface ThemedFooterButtonProps {
  children: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}

/**
 * Themed footer container with consistent styling
 */
export function ThemedFooter({ children, className }: ThemedFooterProps) {
  return (
    <footer
      className={cn('border-t border-slate-200/30 dark:border-green-900/30 py-12 px-4', className)}
    >
      <div className="container mx-auto max-w-6xl">{children}</div>
    </footer>
  );
}

/**
 * Themed footer section with title and content
 */
export function ThemedFooterSection({ children, title, className }: ThemedFooterSectionProps) {
  return (
    <div className={cn('md:col-span-1', className)}>
      {title && <h3 className={`${THEME_COLORS.accent.primary} font-semibold mb-4`}>{title}</h3>}
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/**
 * Themed footer link with consistent styling
 */
export function ThemedFooterLink({
  children,
  href,
  external = false,
  icon,
  onClick,
  className,
}: ThemedFooterLinkProps) {
  const baseStyles = `
    flex items-center
    ${THEME_COLORS.text.muted}/80 hover:text-slate-500
    dark:text-green-300/80 dark:hover:text-green-200
    text-sm transition-colors
  `;

  const externalStyles = external ? 'dark:text-green-300/80 dark:hover:text-green-200' : '';

  const linkContent = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {external && <ExternalLink className={`w-3 h-3 ml-1 ${THEME_COLORS.text.subtle}`} />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, externalStyles, className)}
        onClick={onClick}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(baseStyles, className)} {...(onClick ? { onClick } : {})}>
      {linkContent}
    </Link>
  );
}

/**
 * Themed footer button for interactive elements
 */
export function ThemedFooterButton({
  children,
  onClick,
  icon,
  className,
}: ThemedFooterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center',
        'text-slate-600/80 hover:text-slate-500',
        'dark:text-green-300/80 dark:hover:text-green-200',
        'text-sm transition-colors cursor-pointer',
        className,
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

/**
 * Themed footer border separator
 */
export function ThemedFooterSeparator({ className }: { className?: string }) {
  return (
    <div className={cn('border-t border-slate-200/30 dark:border-green-800/30 pt-8', className)} />
  );
}

/**
 * Themed footer brand section with logo and description
 */
export function ThemedFooterBrand({
  children,
  logo,
  title,
  description,
}: {
  children?: ReactNode;
  logo?: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="md:col-span-1">
      {(logo || title) && (
        <div className="flex items-center space-x-3 mb-4">
          {logo}
          {title && (
            <span className="text-xl font-bold text-slate-800 dark:text-green-400">{title}</span>
          )}
        </div>
      )}
      {description && (
        <p className="text-slate-600/60 dark:text-green-300/60 text-sm leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
