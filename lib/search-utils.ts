/**
 * Generic search and filter utilities for KubeRocketAI application
 *
 * This module provides reusable functions for filtering and categorizing
 * searchable content items across the application.
 */

import type { SearchConfig } from './search-types';
import type { BaseContentItem } from './content-types';
import { CATEGORY_ALL_VALUE, type CategoryFilterValue } from './constants';

/**
 * Filter items based on search query and category selection
 *
 * Implements case-insensitive text search across configured fields
 * and category filtering using array includes logic.
 *
 * @template T - Type that extends BaseSearchableItem
 * @param items - Array of items to filter
 * @param searchQuery - Text query to search for
 * @param selectedCategory - Category to filter by, or CATEGORY_ALL_VALUE for no filter
 * @param config - Search configuration specifying fields and behavior
 * @returns Filtered array of items matching the criteria
 *
 * @example
 * ```typescript
 * const filtered = filterItems(
 *   agents,
 *   'development',
 *   'frontend',
 *   agentSearchConfig
 * );
 * ```
 */
export function filterItems<T extends BaseContentItem>(
  items: T[],
  searchQuery: string,
  selectedCategory: CategoryFilterValue,
  config: SearchConfig,
): T[] {
  let filtered = items;

  // Filter by search query - case-insensitive string matching
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => {
      return config.searchFields.some(field => {
        const value = item[field as keyof T];
        return value && typeof value === 'string' && value.toLowerCase().includes(query);
      });
    });
  }

  // Filter by category - array includes logic for multi-category items
  if (selectedCategory !== CATEGORY_ALL_VALUE && config.categoryField) {
    const categoryField = config.categoryField;
    filtered = filtered.filter(item => {
      const categoryValue = item[categoryField as keyof T];
      // Both agents and templates use string arrays for categories
      return Array.isArray(categoryValue) && categoryValue.includes(selectedCategory);
    });
  }

  return filtered;
}
