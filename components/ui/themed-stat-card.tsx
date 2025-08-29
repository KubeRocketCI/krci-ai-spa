'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import Link from 'next/link';

interface ThemedStatCardProps {
  value: string;
  label: string;
  variant?: 'gradient' | 'simple' | 'accent';
  className?: string;
  onClick?: () => void;
  href?: string;
}

/**
 * Standardized stat card component with consistent theme-aware styling
 * Provides semantic variants for different stat display contexts
 * Preserves existing dark mode gradient aesthetics
 */
export function ThemedStatCard({
  value,
  label,
  variant = 'gradient',
  className,
  onClick,
  href,
}: ThemedStatCardProps) {
  const valueStyles = {
    gradient: `
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight
      [font-variant-numeric:tabular-nums] leading-tight md:leading-[1.1] mb-1 sm:mb-2
      text-blue-600 dark:text-cyan-300
    `,
    simple: `
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight
      [font-variant-numeric:tabular-nums] leading-tight md:leading-[1.1] mb-1 sm:mb-2
      ${THEME_COLORS.text.primary}
    `,
    accent: `
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight
      [font-variant-numeric:tabular-nums] leading-tight md:leading-[1.1] mb-1 sm:mb-2
      ${THEME_COLORS.accent.secondary}
    `,
  };

  const labelStyles = `
    text-xs sm:text-sm md:text-sm ${THEME_COLORS.text.secondary}/90 leading-4 font-medium
  `;

  const baseClassName = cn(
    'relative z-10 text-center',
    (onClick || href) &&
      'cursor-pointer transition-all duration-200 hover:opacity-80 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] focus:opacity-80 focus:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-md',
    className,
  );

  const content = (
    <>
      <div className={valueStyles[variant]}>{value}</div>
      <div className={labelStyles}>{label}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn('block', baseClassName)}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button className={baseClassName} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={baseClassName}>{content}</div>;
}
