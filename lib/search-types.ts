/**
 * Enhanced Search and Filter System
 */

import type { CategoryFilterValue } from './constants';

/**
 * Base interface that all searchable items must implement
 * Now extends BaseContentItem for unified type system
 *
 * @deprecated Use BaseContentItem from content-types instead
 */

/**
 * Enhanced searchable item interface
 * Integrates with unified content type system
 */

/**
 * Search highlight interface for displaying search results
 */

/**
 * Search result with metadata
 */

/**
 * Search filter criteria
 */

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
  searchFields: string[];
  /** Field name on items that contains categories (string[]) */
  categoryField?: string;
  placeholder?: string;
  debounceMs?: number;
  minQueryLength?: number;
  maxResults?: number;
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
  totalCount?: number | undefined;
  /** Search configuration object */
  searchConfig: SearchConfig;
  /** Additional CSS classes */
  className?: string;
  /** Loading state for search operations */
  isLoading?: boolean;
  /** Error state for search operations */
  error?: string | null;
  // Advanced criteria removed
}

/**
 * Search provider interface
 */

/**
 * Search analytics interface
 */

/**
 * Search hook interface for React components
 */

/**
 * Search context interface for providing search state
 */

/**
 * Utility type for extracting searchable fields from a type
 */

/**
 * Type-safe search field configuration
 */

/**
 * Search state management interface
 */
