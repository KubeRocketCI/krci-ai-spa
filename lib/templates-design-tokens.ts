/**
 * Design tokens for templates components
 * Centralizes all design decisions for consistency and maintainability
 * Integrates with existing THEME_COLORS system
 */

import { THEME_COLORS } from './theme-colors';

export const TEMPLATES_DESIGN_TOKENS = {
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
        name: 'min-h-[2.5rem]',
        description: 'h-10',
        filePath: 'min-h-[1.5rem]',
      },
      padding: {
        header: 'pr-16', // Space for category badge
        section: 'space-y-4',
        filePath: 'mt-2 pt-1.5',
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
    filePath: 'text-xs font-mono',
    fileLabel: 'text-xs font-mono',
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
      category: 'primary',
    },
    size: {
      badge: 'sm',
      button: 'sm',
    },
  },
} as const;

// Helper functions for accessing tokens
export const getTemplateCardClasses = () => ({
  container: `group h-full flex flex-col relative`,
  grid: `${TEMPLATES_DESIGN_TOKENS.layout.grid.columns.mobile} ${TEMPLATES_DESIGN_TOKENS.layout.grid.columns.tablet} ${TEMPLATES_DESIGN_TOKENS.layout.grid.columns.desktop} ${TEMPLATES_DESIGN_TOKENS.layout.grid.gap}`,
  categoryBadge: `${TEMPLATES_DESIGN_TOKENS.layout.badge.position} ${TEMPLATES_DESIGN_TOKENS.typography.fileLabel} ${TEMPLATES_DESIGN_TOKENS.colors.background.badge} backdrop-blur-sm`,
  header: `flex-shrink-0 ${TEMPLATES_DESIGN_TOKENS.layout.card.padding.header}`,
  content: `flex-1 flex flex-col ${TEMPLATES_DESIGN_TOKENS.layout.card.padding.section}`,
  nameTitle: `${TEMPLATES_DESIGN_TOKENS.layout.card.minHeight.name} flex items-center`,
  descriptionSection: `${TEMPLATES_DESIGN_TOKENS.layout.card.minHeight.description} flex items-start`,
  filePathSection: `${TEMPLATES_DESIGN_TOKENS.layout.card.padding.filePath} ${TEMPLATES_DESIGN_TOKENS.colors.border.default} border-t mt-auto`,
});

export const getTemplateTextClasses = () => ({
  description: `${TEMPLATES_DESIGN_TOKENS.typography.description} ${TEMPLATES_DESIGN_TOKENS.colors.text.secondary} overflow-hidden`,
  fileLabel: `${TEMPLATES_DESIGN_TOKENS.typography.fileLabel} ${TEMPLATES_DESIGN_TOKENS.colors.text.muted}`,
  filePath: `${TEMPLATES_DESIGN_TOKENS.typography.filePath} ${TEMPLATES_DESIGN_TOKENS.colors.text.accent.cyan}`,
});
