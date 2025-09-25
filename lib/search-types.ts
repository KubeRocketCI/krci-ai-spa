/**
 * Enhanced Search and Filter System
 */

import type { CategoryFilterValue } from './constants';

/**
 * Enhanced search configuration
 *
 * @example
 * ```typescript
 * const agentSearchConfig: SearchConfig = {
 *   searchFields: ['name', 'role', 'description'],
 *   categoryField: 'categories',
 *   placeholder: 'Search agents...',
 *   debounceMs: 300,
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
}
