/**
 * Generic design tokens for content components
 */

import { THEME_COLORS } from './theme-colors';

export const CONTENT_DESIGN_TOKENS = {
  // Layout & Grid System
  layout: {
    page: {
      container: 'container mx-auto px-4 py-8',
      maxWidth: 'max-w-7xl',
      spacing: 'space-y-8',
    },
    hero: {
      container: 'text-center mb-12',
      title: 'text-4xl font-bold font-mono mb-4',
      subtitle: 'text-lg text-muted-foreground max-w-2xl mx-auto',
      gradient: 'bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent',
    },
    tabs: {
      container: 'w-full',
      list: 'grid w-full grid-cols-4 mb-8 max-w-2xl mx-auto',
      content: 'space-y-8',
    },
    grid: {
      container: 'grid gap-4 sm:gap-6',
      columns: {
        mobile: 'grid-cols-1',
        tablet: 'sm:grid-cols-2',
        desktop: 'lg:grid-cols-3',
        wide: 'xl:grid-cols-4',
      },
      adaptive: {
        compact: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        detailed: 'grid-cols-1 lg:grid-cols-2',
        feature: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      },
    },
  },

  // Card System
  card: {
    container: 'group h-full flex flex-col relative',
    padding: {
      compact: 'p-4',
      feature: 'p-6',
      detailed: 'p-6 sm:p-8',
    },
    minHeight: {
      compact: 'min-h-[200px]',
      feature: 'min-h-[250px]',
      detailed: 'min-h-[300px]',
    },
    sections: {
      header: 'flex-shrink-0 mb-4',
      content: 'flex-1 space-y-3',
      footer: 'flex-shrink-0 mt-4 pt-4 border-t',
      actions: 'flex items-center justify-between',
    },
    badge: {
      position: 'absolute top-3 right-3 z-10',
      spacing: 'gap-2',
    },
  },

  // Typography System
  typography: {
    title: {
      large: 'text-xl font-bold',
      medium: 'text-lg font-semibold',
      small: 'text-base font-medium',
    },
    subtitle: {
      large: 'text-base font-medium',
      medium: 'text-sm font-medium',
      small: 'text-xs font-medium',
    },
    body: {
      large: 'text-sm',
      medium: 'text-xs',
      small: 'text-xs',
    },
    code: {
      inline: 'text-xs font-mono',
      block: 'text-sm font-mono',
    },
    labels: {
      field: 'text-xs font-mono uppercase tracking-wide',
      category: 'text-xs font-medium',
      stats: 'text-xs',
    },
  },

  // Color System (extends THEME_COLORS)
  colors: {
    text: {
      primary: THEME_COLORS.text.primary,
      secondary: THEME_COLORS.text.secondary,
      muted: THEME_COLORS.text.muted,
      accent: {
        cyan: THEME_COLORS.accent.primary,
        green: THEME_COLORS.accent.tertiary,
      },
    },
    background: {
      card: THEME_COLORS.background.card,
      cardHover: THEME_COLORS.background.cardHover,
      section: THEME_COLORS.background.section,
    },
    border: {
      default: THEME_COLORS.border.default,
      hover: THEME_COLORS.border.hover,
      accent: THEME_COLORS.border.accent,
    },
    gradient: {
      hero: THEME_COLORS.gradient.hero,
      button: THEME_COLORS.gradient.button,
    },
  },

  // Interactive States
  states: {
    hover: 'transition-all duration-300 hover:scale-[1.02]',
    focus: 'focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
    active: 'active:scale-[0.98]',
    loading: 'animate-pulse',
  },

  // Content Constraints
  content: {
    lineClamp: {
      description: 2,
      summary: 3,
      title: 1,
    },
    maxHeight: {
      description: 'max-h-12',
      summary: 'max-h-16',
      title: 'max-h-6',
    },
    lineHeight: {
      tight: 'leading-4',
      normal: 'leading-5',
      relaxed: 'leading-6',
    },
  },

  // Component Variants
  variants: {
    card: {
      compact: 'feature',
      detailed: 'glass',
      feature: 'interactive',
    },
    button: {
      primary: 'primary',
      secondary: 'outline',
      ghost: 'ghost',
    },
    badge: {
      category: 'primary',
      tag: 'secondary',
      version: 'outline',
      status: 'success',
    },
    size: {
      small: 'sm',
      medium: 'default',
      large: 'lg',
    },
  },
} as const;

export const getContentGridClasses = (variant: 'compact' | 'detailed' | 'feature' = 'feature') => ({
  container: `${CONTENT_DESIGN_TOKENS.layout.grid.container} ${CONTENT_DESIGN_TOKENS.layout.grid.adaptive[variant]}`,
  item: CONTENT_DESIGN_TOKENS.card.container,
});

export const getContentCardClasses = (variant: 'compact' | 'detailed' | 'feature' = 'feature') => ({
  container: `${CONTENT_DESIGN_TOKENS.card.container} ${CONTENT_DESIGN_TOKENS.card.minHeight[variant]}`,
  padding: CONTENT_DESIGN_TOKENS.card.padding[variant],
  header: CONTENT_DESIGN_TOKENS.card.sections.header,
  content: CONTENT_DESIGN_TOKENS.card.sections.content,
  footer: CONTENT_DESIGN_TOKENS.card.sections.footer,
  actions: CONTENT_DESIGN_TOKENS.card.sections.actions,
  badge: CONTENT_DESIGN_TOKENS.card.badge.position,
});

export const getContentTextClasses = () => ({
  title: `${CONTENT_DESIGN_TOKENS.typography.title.medium} ${CONTENT_DESIGN_TOKENS.colors.text.primary}`,
  subtitle: `${CONTENT_DESIGN_TOKENS.typography.subtitle.medium} ${CONTENT_DESIGN_TOKENS.colors.text.secondary}`,
  description: `${CONTENT_DESIGN_TOKENS.typography.body.large} ${CONTENT_DESIGN_TOKENS.colors.text.muted}`,
  label: `${CONTENT_DESIGN_TOKENS.typography.labels.field} ${CONTENT_DESIGN_TOKENS.colors.text.accent.cyan}`,
  stats: `${CONTENT_DESIGN_TOKENS.typography.labels.stats} ${CONTENT_DESIGN_TOKENS.colors.text.muted}`,
});
