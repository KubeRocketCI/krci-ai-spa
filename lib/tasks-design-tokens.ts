/**
 * Design tokens for tasks components
 */

import { THEME_COLORS } from './theme-colors';

export const TASKS_DESIGN_TOKENS = {
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
      },
      padding: {
        header: 'pr-16',
        section: 'space-y-4',
        filePath: 'mt-2 pt-1.5',
      },
    },
    badge: {
      position: 'absolute top-3 right-3 z-10',
    },
  },

  typography: {
    name: 'text-lg font-semibold',
    description: 'text-sm',
    filePath: 'text-xs font-mono',
    fileLabel: 'text-xs font-mono',
  },

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

  states: {
    hover: 'hover:text-slate-800 dark:hover:text-slate-200',
    focus: 'focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
  },

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

export const getTaskCardClasses = () => ({
  container: `group h-full flex flex-col relative`,
  grid: `${TASKS_DESIGN_TOKENS.layout.grid.columns.mobile} ${TASKS_DESIGN_TOKENS.layout.grid.columns.tablet} ${TASKS_DESIGN_TOKENS.layout.grid.columns.desktop} ${TASKS_DESIGN_TOKENS.layout.grid.gap}`,
  categoryBadge: `${TASKS_DESIGN_TOKENS.layout.badge.position} ${TASKS_DESIGN_TOKENS.typography.fileLabel} ${TASKS_DESIGN_TOKENS.colors.background.badge} backdrop-blur-sm`,
  header: `flex-shrink-0 ${TASKS_DESIGN_TOKENS.layout.card.padding.header}`,
  content: `flex-1 flex flex-col ${TASKS_DESIGN_TOKENS.layout.card.padding.section}`,
  nameTitle: `${TASKS_DESIGN_TOKENS.layout.card.minHeight.name} flex items-center`,
  descriptionSection: `${TASKS_DESIGN_TOKENS.layout.card.minHeight.description} flex items-start`,
  filePathSection: `${TASKS_DESIGN_TOKENS.layout.card.padding.filePath} ${TASKS_DESIGN_TOKENS.colors.border.default} border-t mt-auto`,
});

export const getTaskTextClasses = () => ({
  description: `${TASKS_DESIGN_TOKENS.typography.description} ${TASKS_DESIGN_TOKENS.colors.text.secondary} overflow-hidden`,
  fileLabel: `${TASKS_DESIGN_TOKENS.typography.fileLabel} ${TASKS_DESIGN_TOKENS.colors.text.muted}`,
  filePath: `${TASKS_DESIGN_TOKENS.typography.filePath} ${TASKS_DESIGN_TOKENS.colors.text.accent.cyan}`,
});
