/**
 * Centralized Search Configurations
 */

import type { SearchConfig } from '@/lib/search-types';

/**
 * Agent search configuration
 * Optimized for agent-specific fields and use cases
 */
export const AGENT_SEARCH_CONFIG: SearchConfig = {
  searchFields: ['name', 'role', 'description', 'goal', 'whenToUse'],
  categoryField: 'categories',
  placeholder: 'Search agents by name, role, description, or specialization...',
  debounceMs: 300,
  minQueryLength: 1,
  maxResults: 50,
} as const;

/**
 * Template search configuration
 * Focused on template discovery and categorization
 */
export const TEMPLATE_SEARCH_CONFIG: SearchConfig = {
  searchFields: ['name', 'description'],
  categoryField: 'categories',
  placeholder: 'Search templates by name, description...',
  debounceMs: 300,
  minQueryLength: 1,
  maxResults: 100,
} as const;

/**
 * Data file search configuration
 * Optimized for reference data discovery
 */
export const DATA_SEARCH_CONFIG: SearchConfig = {
  searchFields: ['name', 'description'],
  categoryField: 'categories',
  placeholder: 'Search data files by name or content...',
  debounceMs: 300,
  minQueryLength: 2,
  maxResults: 75,
} as const;

/**
 * Task search configuration
 * Tailored for task and workflow discovery
 */
export const TASK_SEARCH_CONFIG: SearchConfig = {
  searchFields: ['name', 'description'],
  categoryField: 'categories',
  placeholder: 'Search tasks and workflows...',
  debounceMs: 300,
  minQueryLength: 1,
  maxResults: 50,
} as const;
