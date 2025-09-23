/**
 * Public Search Types for External Use
 */

// Core search interfaces
export type {
  SearchConfig,
  SearchFilterProps,
  SearchProvider,
  SearchResult,
  SearchCriteria,
  SearchAnalytics,
} from '@/lib/search-types';

// Search configuration exports
export {
  AGENT_SEARCH_CONFIG,
  TEMPLATE_SEARCH_CONFIG,
  DATA_SEARCH_CONFIG,
  TASK_SEARCH_CONFIG,
  SEARCH_CONFIGS,
  DEFAULT_SEARCH_CONFIG,
  FAST_SEARCH_CONFIGS,
  COMPREHENSIVE_SEARCH_CONFIGS,
} from '@/lib/search-configs';

// Search configuration utilities
export {
  getSearchConfig,
  createSearchConfig,
  validateSearchConfig,
  getFastSearchConfig,
  getComprehensiveSearchConfig,
} from '@/lib/search-configs';

// Content type compatibility (for legacy support)
export type {
  BaseContentItem,
  AgentContentItem,
  TemplateContentItem,
  DataContentItem,
  TaskContentItem,
  ContentType,
} from '@/types/content';
