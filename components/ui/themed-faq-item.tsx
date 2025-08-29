'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import type { ReactNode } from 'react';

interface ThemedFAQItemProps {
  children: ReactNode;
  variant?: 'default' | 'compact' | 'bordered';
  className?: string;
  id?: string;
}

/**
 * Standardized FAQ item container component with consistent theme-aware styling
 * Provides semantic variants for different FAQ item display contexts
 * Preserves existing dark mode terminal aesthetics while adding light theme support
 */
export function ThemedFAQItem({
  children,
  variant = 'default',
  className,
  id,
}: ThemedFAQItemProps) {
  const variantStyles = {
    default: `
      group
      border-b border-slate-300/30 dark:border-slate-700/30
      hover:border-slate-400/50 dark:hover:border-slate-600/50
      transition-colors
    `,
    compact: `
      group
      border-b border-slate-200/50 dark:border-slate-700/30
      hover:border-slate-300/70 dark:hover:border-slate-600/50
      transition-colors
    `,
    bordered: `
      group
      border border-slate-200 dark:border-slate-700/50
      rounded-lg mb-4 last:mb-0
      hover:border-slate-300 dark:hover:border-slate-600/70
      bg-white/50 dark:bg-black/20
      transition-all duration-200
    `,
  };

  return (
    <article
      id={id}
      className={cn(variantStyles[variant], className)}
      itemScope
      itemType="https://schema.org/Question"
    >
      {children}
    </article>
  );
}

interface ThemedFAQHeaderProps {
  children: ReactNode;
  variant?: 'default' | 'compact';
  isExpanded?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Themed FAQ header component for question display
 */
export function ThemedFAQHeader({
  children,
  variant = 'default',
  isExpanded = false,
  onClick,
  className,
}: ThemedFAQHeaderProps) {
  const variantStyles = {
    default: `
      flex items-center justify-between py-4 px-0
      cursor-pointer
      hover:bg-slate-100/50 dark:hover:bg-slate-900/20
      transition-colors
    `,
    compact: `
      flex items-center justify-between py-3 px-0
      cursor-pointer
      hover:bg-slate-50/50 dark:hover:bg-slate-900/10
      transition-colors
    `,
  };

  return (
    <div
      onClick={onClick}
      className={cn(variantStyles[variant], className)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-expanded={isExpanded}
    >
      {children}
    </div>
  );
}

interface ThemedFAQQuestionProps {
  children?: ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
  dangerouslySetInnerHTML?: { __html: string };
}

/**
 * Themed FAQ question text component
 */
export function ThemedFAQQuestion({
  children,
  variant = 'default',
  className,
  dangerouslySetInnerHTML,
}: ThemedFAQQuestionProps) {
  const variantStyles = {
    default: `
      text-lg font-medium
      text-slate-800 dark:text-slate-200
      text-left leading-tight
    `,
    compact: `
      text-base font-medium
      text-slate-800 dark:text-slate-200
      text-left leading-tight
    `,
  };

  if (dangerouslySetInnerHTML) {
    return (
      <h3
        className={cn(variantStyles[variant], className)}
        itemProp="name"
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    );
  }

  return (
    <h3 className={cn(variantStyles[variant], className)} itemProp="name">
      {children}
    </h3>
  );
}

interface ThemedFAQAnswerProps {
  children: ReactNode;
  variant?: 'default' | 'compact';
  isExpanded?: boolean;
  className?: string;
  id?: string;
}

/**
 * Themed FAQ answer content component
 */
export const ThemedFAQAnswer = React.forwardRef<HTMLDivElement, ThemedFAQAnswerProps>(
  ({ children, variant = 'default', isExpanded = false, className, id, ...props }, ref) => {
    const variantStyles = {
      default: `
      overflow-hidden transition-all duration-300 ease-out
      ${THEME_COLORS.text.muted}
      leading-relaxed text-sm
    `,
      compact: `
      overflow-hidden transition-all duration-300 ease-out
      ${THEME_COLORS.text.muted}
      leading-relaxed text-sm
    `,
    };

    return (
      <div
        ref={ref}
        id={id}
        className={cn(variantStyles[variant], className)}
        style={{ maxHeight: isExpanded ? 'none' : '0px' }}
        itemScope
        itemType="https://schema.org/Answer"
        itemProp="acceptedAnswer"
        {...props}
      >
        <div className="pb-6 pl-0 pr-8">
          <div itemProp="text">
            <div className="prose prose-slate dark:prose-invert max-w-none prose-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ThemedFAQAnswer.displayName = 'ThemedFAQAnswer';

interface ThemedFAQListItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Themed FAQ list item component for answer bullets
 */
export function ThemedFAQListItem({ children, className }: ThemedFAQListItemProps) {
  return (
    <li
      className={cn(
        'mb-1 leading-relaxed flex items-start text-sm',
        '${THEME_COLORS.text.muted}',
        className,
      )}
    >
      <span className="text-slate-500 dark:text-slate-500 mr-2 mt-1 text-xs">•</span>
      <span className="flex-1">{children}</span>
    </li>
  );
}

interface ThemedFAQHeaderTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Themed FAQ header text component for answer sections
 */
export function ThemedFAQHeaderText({ children, className }: ThemedFAQHeaderTextProps) {
  return (
    <h4
      className={cn(
        'font-medium text-base mb-2 mt-4 first:mt-0',
        'text-slate-700 dark:text-slate-300',
        className,
      )}
    >
      {children}
    </h4>
  );
}

interface ThemedFAQParagraphProps {
  children: ReactNode;
  className?: string;
}

/**
 * Themed FAQ paragraph component for answer text
 */
export function ThemedFAQParagraph({ children, className }: ThemedFAQParagraphProps) {
  return (
    <p
      className={cn(
        'mb-2 last:mb-0 leading-relaxed text-sm',
        '${THEME_COLORS.text.muted}',
        className,
      )}
    >
      {children}
    </p>
  );
}
