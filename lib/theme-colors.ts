/**
 * Centralized theme color constants
 * Eliminates duplication across 35+ themed components
 */

export const THEME_COLORS = {
  // Text colors - most frequently used
  text: {
    primary: 'text-slate-900 dark:text-white',
    secondary: 'text-slate-700 dark:text-slate-300',
    muted: 'text-slate-600 dark:text-slate-400',
    subtle: 'text-slate-500 dark:text-slate-400',
  },

  // Accent colors - brand consistency
  accent: {
    primary: 'text-cyan-700 dark:text-cyan-300',
    secondary: 'text-cyan-600 dark:text-cyan-400',
    tertiary: 'text-emerald-700 dark:text-green-400',
  },

  // Background colors - layout consistency
  background: {
    card: 'bg-white/90 dark:bg-black/50',
    cardHover: 'hover:bg-gray-50 dark:hover:bg-black/80',
    section: 'bg-gray-50/50 dark:bg-gray-900/20',
  },

  // Border colors - visual consistency
  border: {
    default: 'border-slate-300/60 dark:border-white/20',
    hover: 'hover:border-cyan-400/80 dark:hover:border-cyan-400/60',
    accent:
      'border border-cyan-600 hover:border-cyan-700 dark:border-cyan-500 dark:hover:border-cyan-400', // Button styles
    card: 'border-cyan-300 dark:border-cyan-700', // Card-specific borders
    feature:
      'border-slate-300/60 hover:border-cyan-400/80 dark:border-white/20 dark:hover:border-cyan-400/60', // Feature card borders
  },

  // Gradients - hero elements
  gradient: {
    hero: 'bg-gradient-to-r from-cyan-700 via-blue-700 to-emerald-700 dark:from-cyan-300 dark:via-blue-300 dark:to-emerald-300',
    button:
      'bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 dark:from-cyan-400 dark:via-blue-500 dark:to-emerald-400',
  },
} as const;
