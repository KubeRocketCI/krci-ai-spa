/**
 * Design tokens for data components
 * Centralizes all design decisions for consistency and maintainability
 * Integrates with existing THEME_COLORS system
 */

import { THEME_COLORS } from './theme-colors';

export const DATA_DESIGN_TOKENS = {
  // Layout & Spacing
  layout: {
    grid: {
      gap: 'gap-4 sm:gap-6',
      columns: {
        mobile: 'grid-cols-1',
        tablet: 'sm:grid-cols-2',
        desktop: 'lg:grid-cols-3',
      },
    },
    card: {
      minHeight: {
        container: 'min-h-[280px]',
        name: 'min-h-[2.5rem]',
        description: 'h-16',
        categories: 'min-h-[1.5rem]',
      },
      padding: {
        header: 'pr-16', // Space for category badge
        section: 'space-y-4',
        categories: 'mt-auto pt-4',
      },
    },
    badge: {
      position: 'absolute top-3 right-3 z-10',
    },
  },

  // Typography
  typography: {
    name: 'text-lg font-semibold',
    description: 'text-sm',
    path: 'text-xs font-mono',
    categoryLabel: 'text-xs font-mono',
    stats: 'text-xs',
  },

  // Colors (using existing theme system)
  colors: {
    text: {
      primary: THEME_COLORS.text.primary,
      secondary: THEME_COLORS.text.secondary,
      muted: THEME_COLORS.text.muted,
      accent: {
        cyan: THEME_COLORS.accent.secondary,
        green: THEME_COLORS.accent.tertiary,
      },
    },
    border: {
      default: THEME_COLORS.border.default,
      accent: {
        cyan: 'border-cyan-500/30',
        green: 'border-green-500/20',
      },
    },
    background: {
      badge: 'bg-slate-100/80 dark:bg-slate-800/80',
    },
  },

  // Interactive States
  states: {
    hover: 'hover:text-slate-800 dark:hover:text-slate-200',
    focus: 'focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
  },

  // Content Constraints
  content: {
    lineClamp: {
      description: 2,
    },
    maxHeight: {
      description: 'max-h-10',
    },
    lineHeight: {
      description: 'leading-5',
    },
  },

  // Component Variants
  variants: {
    card: 'interactive',
    cardHeader: 'terminal',
    cardContent: 'terminal',
    cardTitle: 'terminal',
    badge: {
      category: 'outline',
      primary: 'default',
    },
    size: {
      badge: 'sm',
      button: 'sm',
    },
  },
} as const;

// Helper functions for accessing tokens
export const getDataCardClasses = () => ({
  container: `group h-full flex flex-col relative`,
  grid: `${DATA_DESIGN_TOKENS.layout.grid.columns.mobile} ${DATA_DESIGN_TOKENS.layout.grid.columns.tablet} ${DATA_DESIGN_TOKENS.layout.grid.columns.desktop} ${DATA_DESIGN_TOKENS.layout.grid.gap}`,
  categoryBadge: `${DATA_DESIGN_TOKENS.layout.badge.position} ${DATA_DESIGN_TOKENS.typography.categoryLabel} ${DATA_DESIGN_TOKENS.colors.background.badge} backdrop-blur-sm`,
  header: `flex-shrink-0 ${DATA_DESIGN_TOKENS.layout.card.padding.header}`,
  content: `flex-1 flex flex-col ${DATA_DESIGN_TOKENS.layout.card.padding.section}`,
  nameTitle: `${DATA_DESIGN_TOKENS.layout.card.minHeight.name} flex items-center`,
  descriptionSection: `${DATA_DESIGN_TOKENS.layout.card.minHeight.description} flex items-start`,
  filePathSection: `mt-2 pt-1.5 ${DATA_DESIGN_TOKENS.colors.border.default} border-t mt-auto`,
});

export const getDataTextClasses = () => ({
  description: `${DATA_DESIGN_TOKENS.typography.description} ${DATA_DESIGN_TOKENS.colors.text.secondary} overflow-hidden`,
  fileLabel: `${DATA_DESIGN_TOKENS.typography.categoryLabel} ${DATA_DESIGN_TOKENS.colors.text.muted}`,
  filePath: `${DATA_DESIGN_TOKENS.typography.path} ${DATA_DESIGN_TOKENS.colors.text.accent.cyan}`,
});
