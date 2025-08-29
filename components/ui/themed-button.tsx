'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { THEME_COLORS } from '@/lib/theme-colors';
import { BaseThemedProps, SizeVariant } from '@/lib/component-types';

interface ThemedButtonProps extends BaseThemedProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'terminal' | 'success' | 'copy';
  size?: SizeVariant | 'icon';
  onClick?: () => void;
  disabled?: boolean;
  asChild?: boolean;
  title?: string;
  'aria-label'?: string;
}

/**
 * Standardized button component with consistent theme-aware styling
 * Provides semantic variants for different button contexts
 * Preserves existing dark mode aesthetics while adding theme flexibility
 */
export function ThemedButton({
  children,
  variant = 'primary',
  size = 'default',
  className,
  onClick,
  disabled,
  asChild,
  title,
  'aria-label': ariaLabel,
}: ThemedButtonProps) {
  const variantStyles = {
    primary: `
      ${THEME_COLORS.gradient.button}
      hover:from-cyan-700 hover:via-blue-700 hover:to-emerald-700
      dark:hover:from-cyan-300 dark:hover:via-blue-400 dark:hover:to-emerald-300
      text-white font-bold
      dark:text-black dark:font-bold
      shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40
      dark:shadow-xl dark:shadow-cyan-400/30 dark:hover:shadow-cyan-400/50
      ring-2 ring-cyan-600/50 hover:ring-cyan-700/60
      dark:ring-cyan-300/60 dark:hover:ring-cyan-200/80
      transition-all duration-300
    `,
    secondary: `
      ${THEME_COLORS.background.card} ${THEME_COLORS.background.cardHover}
      ${THEME_COLORS.text.primary}
      ${THEME_COLORS.border.default} ${THEME_COLORS.border.hover}
      transition-all duration-200
    `,
    outline: `
      bg-transparent hover:bg-cyan-50
      dark:bg-transparent dark:hover:bg-cyan-900/20
      ${THEME_COLORS.border.accent}
      ${THEME_COLORS.accent.primary} hover:text-cyan-800
      dark:hover:text-cyan-100
      transition-all duration-300
    `,
    ghost: `
      bg-transparent ${THEME_COLORS.background.cardHover}
      ${THEME_COLORS.text.secondary} hover:text-slate-900
      dark:hover:text-slate-100
      transition-all duration-200
    `,
    terminal: `
      bg-sky-50 hover:bg-sky-100
      dark:bg-gray-900 dark:hover:bg-gray-800
      border border-emerald-400/60 hover:border-emerald-500/80
      dark:border-green-600/30 dark:hover:border-green-500/50
      ${THEME_COLORS.accent.tertiary} hover:text-emerald-800
      font-mono
      transition-all duration-200
    `,
    success: `
      bg-gradient-to-r from-emerald-600 to-green-600
      hover:from-emerald-700 hover:to-green-700
      dark:from-green-500 dark:to-emerald-500
      dark:hover:from-green-400 dark:hover:to-emerald-400
      text-white font-semibold
      ring-1 ring-emerald-500/40 hover:ring-emerald-500/60
      dark:ring-green-400/40 dark:hover:ring-green-400/60
      shadow-lg hover:shadow-xl
      transition-all duration-300
    `,
    copy: `
      bg-transparent hover:bg-cyan-50
      dark:bg-transparent dark:hover:bg-cyan-900/20
      ${THEME_COLORS.accent.secondary} hover:text-cyan-700
      dark:hover:text-cyan-200
      transition-all duration-200
    `,
  };

  return (
    <Button
      size={size}
      className={cn(variantStyles[variant], className)}
      onClick={onClick}
      disabled={disabled}
      asChild={asChild}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
}
