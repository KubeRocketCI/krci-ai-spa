/**
 * Design tokens for agents components
 * Centralizes all design decisions for consistency and maintainability
 * Integrates with existing THEME_COLORS system
 */

import { THEME_COLORS } from './theme-colors';

export const AGENTS_DESIGN_TOKENS = {
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
        role: 'min-h-[2.5rem]',
        persona: 'h-4',
        goal: 'h-10',
        categories: 'min-h-[1.5rem]',
        whenToUse: 'h-12',
      },
      padding: {
        header: 'pr-16', // Space for version badge
        section: 'space-y-1',
        install: 'pt-1',
        stats: 'pt-2',
      },
    },
    badge: {
      position: 'absolute top-3 right-3 z-10',
      spacing: 'gap-2',
    },
  },

  // Typography
  typography: {
    persona: 'text-xs font-mono',
    goal: 'text-sm',
    whenToUse: 'text-xs',
    install: 'text-xs font-mono',
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
      },
    },
    border: {
      default: THEME_COLORS.border.default,
      accent: {
        cyan: 'border-cyan-500/30',
      },
    },
    background: {
      badge: 'bg-slate-100/80 dark:bg-slate-800/80',
    },
  },

  // Content Constraints
  content: {
    lineClamp: {
      goal: 2,
      whenToUse: 2,
    },
    maxHeight: {
      goal: 'max-h-10',
      whenToUse: 'max-h-12',
    },
    lineHeight: {
      goal: 'leading-5',
      whenToUse: 'leading-4',
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
    },
  },
} as const;

// Helper functions for accessing tokens
export const getAgentCardClasses = () => ({
  container: `group h-full flex flex-col relative`,
  grid: `${AGENTS_DESIGN_TOKENS.layout.grid.columns.mobile} ${AGENTS_DESIGN_TOKENS.layout.grid.columns.tablet} ${AGENTS_DESIGN_TOKENS.layout.grid.columns.desktop} ${AGENTS_DESIGN_TOKENS.layout.grid.gap}`,
  categoryBadge: `${AGENTS_DESIGN_TOKENS.layout.badge.position} ${AGENTS_DESIGN_TOKENS.typography.install} ${AGENTS_DESIGN_TOKENS.colors.background.badge} backdrop-blur-sm`,
  header: `flex-shrink-0 ${AGENTS_DESIGN_TOKENS.layout.card.padding.header}`,
  content: `flex-1 flex flex-col ${AGENTS_DESIGN_TOKENS.layout.card.padding.section}`,
  roleTitle: `${AGENTS_DESIGN_TOKENS.layout.card.minHeight.role} flex items-center`,
  personaName: `${AGENTS_DESIGN_TOKENS.layout.card.minHeight.persona} flex items-center`,
  goalSection: `${AGENTS_DESIGN_TOKENS.layout.card.minHeight.goal} flex items-start`,
  categoriesSection: `flex flex-wrap ${AGENTS_DESIGN_TOKENS.layout.badge.spacing} ${AGENTS_DESIGN_TOKENS.layout.card.minHeight.categories}`,
  whenToUseSection: `${AGENTS_DESIGN_TOKENS.layout.card.minHeight.whenToUse} flex items-start`,
  installSection: `${AGENTS_DESIGN_TOKENS.layout.card.padding.install} ${AGENTS_DESIGN_TOKENS.colors.border.default} border-t`,
  statsSection: `flex justify-between items-center ${AGENTS_DESIGN_TOKENS.layout.card.padding.stats} ${AGENTS_DESIGN_TOKENS.colors.border.default} border-t mt-auto`,
});

export const getAgentTextClasses = () => ({
  persona: `${AGENTS_DESIGN_TOKENS.typography.persona} ${AGENTS_DESIGN_TOKENS.colors.text.muted}`,
  goal: `${AGENTS_DESIGN_TOKENS.typography.goal} ${AGENTS_DESIGN_TOKENS.colors.text.secondary} overflow-hidden`,
  whenToUseLabel: `${AGENTS_DESIGN_TOKENS.colors.text.accent.cyan} ${AGENTS_DESIGN_TOKENS.typography.install}`,
  whenToUseText: `${AGENTS_DESIGN_TOKENS.typography.whenToUse} ${AGENTS_DESIGN_TOKENS.colors.text.muted} border-l-2 ${AGENTS_DESIGN_TOKENS.colors.border.accent.cyan} pl-3 overflow-hidden`,
  installLabel: `${AGENTS_DESIGN_TOKENS.typography.install} ${AGENTS_DESIGN_TOKENS.colors.text.muted}`,
  stats: `${AGENTS_DESIGN_TOKENS.typography.stats} ${AGENTS_DESIGN_TOKENS.colors.text.muted}`,
});
