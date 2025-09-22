/**
 * Generic search and filter interfaces for KubeRocketAI application
 *
 * This module provides type-safe interfaces for implementing search functionality
 * across different content types (agents, templates, FAQs, etc.)
 */

import type { HighlightConfig } from './search-highlight-utils';

/**
 * Base interface that all searchable items must implement
 *
 * @example
 * ```typescript
 * interface Agent extends BaseSearchableItem {
 *   role: string;
 *   categories: string[];
 * }
 * ```
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
 * Configuration object for search functionality
 *
 * @template T - Type that extends BaseSearchableItem
 *
 * @example
 * ```typescript
 * const agentSearchConfig: SearchConfig<Agent> = {
 *   searchFields: ['name', 'role', 'description'],
 *   categoryField: 'categories',
 *   placeholder: 'Search agents...',
 *   debounceMs: 300
 * };
 * ```
 */
export interface SearchConfig<T extends BaseSearchableItem> {
  /** Fields to search within for text matching */
  searchFields: (keyof T)[];
  /** Field to use for category filtering (must be string array) */
  categoryField?: keyof T;
  /** Placeholder text for search input */
  placeholder?: string;
  /** Debounce delay in milliseconds (default: 300) */
  debounceMs?: number;
  /** Configuration for search result highlighting */
  highlightConfig?: HighlightConfig;
}

/**
 * Props interface for the SearchFilter component
 *
 * @template T - Type that extends BaseSearchableItem
 *
 * @example
 * ```typescript
 * <SearchFilter<Agent>
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
export interface SearchFilterProps<T extends BaseSearchableItem> {
  /** Current search query string */
  searchQuery: string;
  /** Callback fired when search query changes */
  onSearchChange: (query: string) => void;
  /** Currently selected category filter */
  selectedCategory: string | 'all';
  /** Callback fired when category selection changes */
  onCategoryChange: (category: string | 'all') => void;
  /** Available categories for filtering */
  availableCategories: string[];
  /** Number of items matching current filters */
  resultsCount?: number;
  /** Total number of items available (for "X of Y" display) */
  totalCount?: number;
  /** Search configuration object */
  searchConfig: SearchConfig<T>;
  /** Additional CSS classes */
  className?: string;
  /** Loading state for search operations */
  isLoading?: boolean;
}
