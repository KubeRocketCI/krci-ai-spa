'use client';

import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';
import { MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { ThemedTerminalText } from './themed-terminal';

interface ThemedFeatureIconProps {
  children: ReactNode;
  className?: string;
}

interface ThemedFeatureTitleProps {
  children: ReactNode;
  className?: string;
}

interface ThemedFeatureDescriptionProps {
  children: ReactNode;
  className?: string;
}

interface ThemedFeatureMobileTapIndicatorProps {
  className?: string;
}

interface ThemedFeatureHoverOverlayProps {
  isVisible: boolean;
  className?: string;
  command?: string;
  hoverText?: string;
}

/**
 * Themed feature icon with consistent color scheme
 */
export function ThemedFeatureIcon({ children, className }: ThemedFeatureIconProps) {
  return <div className={cn(`${THEME_COLORS.accent.secondary} mb-4`, className)}>{children}</div>;
}

/**
 * Themed feature title with proper contrast
 */
export function ThemedFeatureTitle({ children, className }: ThemedFeatureTitleProps) {
  return (
    <h3 className={cn(`text-lg font-semibold ${THEME_COLORS.text.primary} mb-2`, className)}>
      {children}
    </h3>
  );
}

/**
 * Themed feature description with readable contrast
 */
export function ThemedFeatureDescription({ children, className }: ThemedFeatureDescriptionProps) {
  return <p className={cn('text-slate-700 dark:text-white/80 text-sm', className)}>{children}</p>;
}

/**
 * Mobile tap indicator with theme-aware colors
 */
export function ThemedFeatureMobileTapIndicator({
  className,
}: ThemedFeatureMobileTapIndicatorProps) {
  return (
    <div className="absolute top-3 right-3 z-30 sm:hidden">
      <div
        className={cn(
          'flex items-center justify-center w-6 h-6 rounded-full',
          'bg-cyan-100/60 dark:bg-cyan-900/40',
          'border border-cyan-600/50 dark:border-cyan-500/50',
          className,
        )}
      >
        <MessageCircle className="w-3 h-3 ${THEME_COLORS.accent.primary}" />
      </div>
    </div>
  );
}

/**
 * Feature hover overlay with theme-aware background and content
 */
export function ThemedFeatureHoverOverlay({
  isVisible,
  className,
  command,
  hoverText,
}: ThemedFeatureHoverOverlayProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-[1px] z-20 transition-opacity duration-300 rounded-[7px]',
        'bg-white/95 dark:bg-black/90',
        'opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100',
        isVisible ? 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100' : '',
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-center h-full p-6">
        <div className="w-full">
          <div className="font-mono text-xs mb-2">
            <ThemedTerminalText variant="prompt">$</ThemedTerminalText>{' '}
            <ThemedTerminalText variant="output">{command ?? 'info'}</ThemedTerminalText>
          </div>
          <div className="font-mono text-[13px] leading-relaxed whitespace-pre-line text-emerald-700 dark:text-green-200 dark:drop-shadow-[0_0_10px_rgba(34,197,94,0.35)]">
            {hoverText ??
              'lorem ipsum dolor sit amet, consectetur adipiscing elit. nulla facilisi.\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
          </div>
        </div>
      </div>
    </div>
  );
}
