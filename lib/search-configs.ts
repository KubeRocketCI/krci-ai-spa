/**
 * Centralized Search Configurations
 */

import type { SearchConfig } from '@/lib/search-types';
import { ContentType } from '@/lib/content-types';

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
  enableAnalytics: false,
  fuzzySearch: false,
  contentType: ContentType.AGENT,
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
  enableAnalytics: false,
  fuzzySearch: true,
  contentType: ContentType.TEMPLATE,
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
  enableAnalytics: false,
  fuzzySearch: true,
  contentType: ContentType.DATA,
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
  enableAnalytics: false,
  fuzzySearch: false,
  contentType: ContentType.TASK,
} as const;

/**
 * Configuration registry for easy access
 * Type-safe mapping of content types to search configs
 */
export const SEARCH_CONFIGS = {
  [ContentType.AGENT]: AGENT_SEARCH_CONFIG,
  [ContentType.TEMPLATE]: TEMPLATE_SEARCH_CONFIG,
  [ContentType.DATA]: DATA_SEARCH_CONFIG,
  [ContentType.TASK]: TASK_SEARCH_CONFIG,
} as const;

/**
 * Get search configuration for a specific content type
 *
 * @param contentType - The content type to get config for
 * @returns The search configuration for that content type
 *
 * @example
 * ```typescript
 * const agentConfig = getSearchConfig(ContentType.AGENT);
 * ```
 */
export function getSearchConfig(contentType: ContentType): SearchConfig {
  return SEARCH_CONFIGS[contentType];
}

/**
 * Create a custom search configuration by extending a base config
 *
 * @param baseType - Base content type to extend from
 * @param overrides - Configuration overrides
 * @returns New search configuration
 *
 * @example
 * ```typescript
 * const customAgentConfig = createSearchConfig(ContentType.AGENT, {
 *   debounceMs: 500,
 *   fuzzySearch: true
 * });
 * ```
 */
export function createSearchConfig(
  baseType: ContentType,
  overrides: Partial<SearchConfig>,
): SearchConfig {
  const baseConfig = getSearchConfig(baseType);
  return {
    ...baseConfig,
    ...overrides,
  };
}

/**
 * Validate a search configuration
 *
 * @param config - Configuration to validate
 * @returns Validation result with errors
 */
export function validateSearchConfig(config: SearchConfig): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!config.searchFields || config.searchFields.length === 0) {
    errors.push('searchFields is required and must not be empty');
  }

  if (!config.placeholder) {
    warnings.push('placeholder is recommended for better UX');
  }

  // Validate numeric values
  if (config.debounceMs !== undefined && (config.debounceMs < 0 || config.debounceMs > 2000)) {
    warnings.push('debounceMs should be between 0 and 2000ms for optimal UX');
  }

  if (
    config.minQueryLength !== undefined &&
    (config.minQueryLength < 0 || config.minQueryLength > 5)
  ) {
    warnings.push('minQueryLength should be between 0 and 5 characters');
  }

  if (config.maxResults !== undefined && (config.maxResults < 1 || config.maxResults > 1000)) {
    warnings.push('maxResults should be between 1 and 1000 for performance');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Default search configuration for unknown content types
 * Provides sensible defaults when specific config is not available
 */
export const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  searchFields: ['name', 'description'],
  categoryField: 'categories',
  placeholder: 'Search...',
  debounceMs: 300,
  minQueryLength: 1,
  maxResults: 50,
  enableAnalytics: false,
  fuzzySearch: false,
} as const;

/**
 * Performance-optimized search configurations
 * For use cases requiring faster response times
 */
export const FAST_SEARCH_CONFIGS = {
  [ContentType.AGENT]: createSearchConfig(ContentType.AGENT, {
    debounceMs: 150,
    maxResults: 25,
  }),
  [ContentType.TEMPLATE]: createSearchConfig(ContentType.TEMPLATE, {
    debounceMs: 150,
    maxResults: 30,
  }),
  [ContentType.DATA]: createSearchConfig(ContentType.DATA, {
    debounceMs: 150,
    maxResults: 20,
  }),
  [ContentType.TASK]: createSearchConfig(ContentType.TASK, {
    debounceMs: 150,
    maxResults: 25,
  }),
} as const;

/**
 * Get performance-optimized search config
 *
 * @param contentType - Content type
 * @returns Optimized search configuration
 */
export function getFastSearchConfig(contentType: ContentType): SearchConfig {
  return FAST_SEARCH_CONFIGS[contentType];
}

/**
 * Search configuration for comprehensive/detailed search
 * Higher limits and fuzzy search enabled
 */
export const COMPREHENSIVE_SEARCH_CONFIGS = {
  [ContentType.AGENT]: createSearchConfig(ContentType.AGENT, {
    fuzzySearch: true,
    maxResults: 100,
    enableAnalytics: true,
  }),
  [ContentType.TEMPLATE]: createSearchConfig(ContentType.TEMPLATE, {
    maxResults: 200,
    enableAnalytics: true,
  }),
  [ContentType.DATA]: createSearchConfig(ContentType.DATA, {
    maxResults: 150,
    enableAnalytics: true,
  }),
  [ContentType.TASK]: createSearchConfig(ContentType.TASK, {
    fuzzySearch: true,
    maxResults: 100,
    enableAnalytics: true,
  }),
} as const;

/**
 * Get comprehensive search config
 *
 * @param contentType - Content type
 * @returns Comprehensive search configuration
 */
export function getComprehensiveSearchConfig(contentType: ContentType): SearchConfig {
  return COMPREHENSIVE_SEARCH_CONFIGS[contentType];
}
