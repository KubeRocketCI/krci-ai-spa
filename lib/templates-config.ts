/**
 * Template page configuration
 */

import { Package } from 'lucide-react';
import { createElement } from 'react';
import type { ContentPageConfig } from '@/lib/content-types';
import type { Template } from '@/lib/templates';

export const TEMPLATES_PAGE_CONFIG: ContentPageConfig<Template> = {
  title: 'Template Library',
  description:
    'Access project templates and configurations for KubeRocketAI development. Streamline your workflow with pre-built templates.',
  icon: createElement(Package, { size: 18 }),
  searchConfig: {
    placeholder: 'Search templates by name, description, or category...',
    searchFields: ['name', 'description', 'path'],
    categoryField: 'categories',
    debounceMs: 300,
  },
  cardConfig: {
    variant: 'feature',
    showActions: true,
    showStats: false,
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

export const getTemplatesTabConfig = () => ({
  id: 'templates',
  label: 'Templates',
  icon: createElement(Package, { size: 18 }),
  config: TEMPLATES_PAGE_CONFIG,
});
