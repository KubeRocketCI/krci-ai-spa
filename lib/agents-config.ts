/**
 * Agent page configuration
 */

import { Bot } from 'lucide-react';
import { createElement } from 'react';
import type { ContentPageConfig } from '@/lib/content-types';
import type { Agent } from '@/lib/agents';

export const AGENTS_PAGE_CONFIG: ContentPageConfig<Agent> = {
  title: 'AI Agents Directory',
  description:
    'Discover specialized AI agents for development, architecture, QA, and more. Each agent brings unique expertise to your workflow.',
  icon: createElement(Bot, { size: 18 }),
  searchConfig: {
    placeholder: 'Search agents by name, role, description, or specialization...',
    searchFields: ['name', 'role', 'description', 'goal', 'whenToUse'],
    categoryField: 'categories',
    debounceMs: 300,
  },
  cardConfig: {
    variant: 'feature',
    showActions: true,
    showStats: true,
  },
  gridConfig: {
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
    gap: 'gap-4 sm:gap-6',
  },
};

export const getAgentsTabConfig = () => ({
  id: 'agents',
  label: 'Agents',
  icon: createElement(Bot, { size: 18 }),
  config: AGENTS_PAGE_CONFIG,
});
