/**
 * Enhanced Search and Filter System
 */

import type { HighlightConfig } from './search-highlight-utils';
import type { BaseContentItem, ContentType } from './content-types';
import type { CategoryFilterValue } from './constants';

/**
 * Base interface that all searchable items must implement
 * Now extends BaseContentItem for unified type system
 *
 * @deprecated Use BaseContentItem from content-types instead
 */
export interface BaseSearchableItem {
  /** Unique identifier for the item */
  id: string;
  /** Display name of the item */
  name?: string;
  /** Alternative title field for the item */
  title?: string;
  /** Detailed description of the item */
  description?: string;
  /** Searchable tags associated with the item */
  tags?: string[];
  /** Categories for templates and general content */
  categories?: string[];
}

/**
 * Enhanced searchable item interface
 * Integrates with unified content type system
 */
export interface SearchableItem extends BaseContentItem {
  /** Search ranking/score for results ordering */
  searchScore?: number;
  /** Highlighted text snippets for search results */
  highlights?: SearchHighlight[];
  /** Last search timestamp for caching */
  lastSearched?: string;
}

/**
 * Search highlight interface for displaying search results
 */
export interface SearchHighlight {
  /** Field name where the highlight was found */
  field: string;
  /** Original text value */
  original: string;
  /** Text with highlight markers */
  highlighted: string;
  /** Start position of the highlight */
  startPos: number;
  /** End position of the highlight */
  endPos: number;
}

/**
 * Search result with metadata
 */
export interface SearchResult<T extends BaseContentItem> {
  /** The matched item */
  item: T;
  /** Search relevance score (0-1) */
  score: number;
  /** Highlighted text snippets */
  highlights: SearchHighlight[];
  /** Matched fields */
  matchedFields: (keyof T)[];
}

/**
 * Search filter criteria
 */
export interface SearchCriteria {
  /** Text query to search for */
  query: string;
  /** Selected category filter */
  category: CategoryFilterValue;
  /** Additional filters */
  filters?: Record<string, unknown>;
  /** Sort criteria */
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  /** Pagination */
  pagination?: {
    page: number;
    pageSize: number;
  };
}

/**
 * Enhanced search configuration
 * Supports both legacy BaseSearchableItem and new BaseContentItem
 *
 * @template T - Type that extends BaseContentItem or BaseSearchableItem
 *
 * @example
 * ```typescript
 * const agentSearchConfig: SearchConfig = {
 *   searchFields: ['name', 'role', 'description'],
 *   categoryField: 'categories',
 *   placeholder: 'Search agents...',
 *   debounceMs: 300,
 *   contentType: ContentType.AGENT
 * };
 * ```
 */
export interface SearchConfig {
  /** Fields to search within for text matching */
  searchFields: string[];
  /** Field to use for category filtering (must be string array) */
  categoryField?: string;
  /** Placeholder text for search input */
  placeholder?: string;
  /** Debounce delay in milliseconds (default: 300) */
  debounceMs?: number;
  /** Configuration for search result highlighting */
  highlightConfig?: HighlightConfig;
  /** Content type for enhanced search features */
  contentType?: ContentType;
  /** Enable fuzzy search */
  fuzzySearch?: boolean;
  /** Minimum query length before searching */
  minQueryLength?: number;
  /** Maximum number of results to return */
  maxResults?: number;
  /** Enable search analytics */
  enableAnalytics?: boolean;
}

/**
 * Enhanced props interface for the SearchFilter component
 * Supports both legacy and new content type systems
 *
 * @template T - Type that extends BaseContentItem or BaseSearchableItem
 *
 * @example
 * ```typescript
 * <SearchFilter
 *   searchQuery={query}
 *   onSearchChange={setQuery}
 *   selectedCategory="all"
 *   onCategoryChange={setCategory}
 *   availableCategories={['development', 'design']}
 *   resultsCount={5}
 *   totalCount={20}
 *   searchConfig={agentSearchConfig}
 * />
 * ```
 */
export interface SearchFilterProps {
  /** Current search query string */
  searchQuery: string;
  /** Callback fired when search query changes */
  onSearchChange: (query: string) => void;
  /** Currently selected category filter */
  selectedCategory: CategoryFilterValue;
  /** Callback fired when category selection changes */
  onCategoryChange: (category: CategoryFilterValue) => void;
  /** Available categories for filtering */
  availableCategories: string[];
  /** Number of items matching current filters */
  resultsCount?: number;
  /** Total number of items available (for "X of Y" display) */
  totalCount?: number;
  /** Search configuration object */
  searchConfig: SearchConfig;
  /** Additional CSS classes */
  className?: string;
  /** Loading state for search operations */
  isLoading?: boolean;
  /** Error state for search operations */
  error?: string | null;
  /** Callback for advanced search criteria changes */
  onSearchCriteriaChange?: (criteria: SearchCriteria) => void;
  /** Show advanced search options */
  showAdvancedOptions?: boolean;
}

/**
 * Search provider interface
 */
export interface SearchProvider<T extends BaseContentItem> {
  /**
   * Perform search operation
   */
  search(criteria: SearchCriteria): Promise<SearchResult<T>[]>;

  /**
   * Get search suggestions
   */
  getSuggestions?(query: string, maxSuggestions?: number): Promise<string[]>;

  /**
   * Clear search cache
   */
  clearCache?(): void;

  /**
   * Get search analytics
   */
  getAnalytics?(): Promise<SearchAnalytics>;
}

/**
 * Search analytics interface
 */
export interface SearchAnalytics {
  /** Total number of searches performed */
  totalSearches: number;
  /** Most popular search terms */
  popularTerms: Array<{ term: string; count: number }>;
  /** Average search response time in ms */
  averageResponseTime: number;
  /** Search success rate (found results) */
  successRate: number;
  /** Most searched categories */
  popularCategories: Array<{ category: string; count: number }>;
}

/**
 * Search hook interface for React components
 */
export interface UseSearchResult<T extends BaseContentItem> {
  /** Search results */
  results: SearchResult<T>[];
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: string | null;
  /** Search function */
  search: (criteria: SearchCriteria) => Promise<void>;
  /** Clear results */
  clear: () => void;
  /** Search suggestions */
  suggestions: string[];
  /** Get suggestions function */
  getSuggestions: (query: string) => Promise<void>;
}

/**
 * Search context interface for providing search state
 */
export interface SearchContextValue<T extends BaseContentItem> {
  /** Current search criteria */
  criteria: SearchCriteria;
  /** Update search criteria */
  updateCriteria: (criteria: Partial<SearchCriteria>) => void;
  /** Search results */
  results: SearchResult<T>[];
  /** Available categories */
  categories: string[];
  /** Search provider */
  provider: SearchProvider<T>;
  /** Search configuration */
  config: SearchConfig;
}

/**
 * Utility type for extracting searchable fields from a type
 */
export type SearchableFields<T> = {
  [K in keyof T]: T[K] extends string | string[] | undefined ? K : never;
}[keyof T];

/**
 * Type-safe search field configuration
 */
export type TypedSearchFields<T extends BaseContentItem> = SearchableFields<T>[];

/**
 * Search state management interface
 */
export interface SearchState {
  /** Current search criteria */
  criteria: SearchCriteria;
  /** Search history */
  history: SearchCriteria[];
  /** Saved searches */
  savedSearches: Array<{ name: string; criteria: SearchCriteria }>;
  /** Search preferences */
  preferences: {
    defaultSort: string;
    resultsPerPage: number;
    enableFuzzySearch: boolean;
  };
}
