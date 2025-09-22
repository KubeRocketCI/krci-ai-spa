/**
 * Generic search and filter utilities for KubeRocketAI application
 *
 * This module provides reusable functions for filtering and categorizing
 * searchable content items across the application.
 */

import type { BaseSearchableItem, SearchConfig } from './search-types';

/**
 * Filter items based on search query and category selection
 *
 * Implements case-insensitive text search across configured fields
 * and category filtering using array includes logic.
 *
 * @template T - Type that extends BaseSearchableItem
 * @param items - Array of items to filter
 * @param searchQuery - Text query to search for
 * @param selectedCategory - Category to filter by, or 'all' for no filter
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
export function filterItems<T extends BaseSearchableItem>(
  items: T[],
  searchQuery: string,
  selectedCategory: string | 'all',
  config: SearchConfig<T>,
): T[] {
  let filtered = items;

  // Filter by search query - case-insensitive string matching
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => {
      return config.searchFields.some(field => {
        const value = item[field];
        return value && typeof value === 'string' && value.toLowerCase().includes(query);
      });
    });
  }

  // Filter by category - array includes logic for multi-category items
  if (selectedCategory !== 'all' && config.categoryField) {
    const categoryField = config.categoryField;
    filtered = filtered.filter(item => {
      const categoryValue = item[categoryField];
      // Both agents and templates use string arrays for categories
      return Array.isArray(categoryValue) && categoryValue.includes(selectedCategory);
    });
  }

  return filtered;
}

/**
 * Extract unique categories from a collection of items
 *
 * Processes the specified category field from all items and returns
 * a sorted array of unique category values.
 *
 * @template T - Type that extends BaseSearchableItem
 * @param items - Array of items to extract categories from
 * @param categoryField - Field name containing category data
 * @returns Sorted array of unique category strings
 *
 * @example
 * ```typescript
 * const categories = extractCategories(agents, 'specializations');
 * // Returns: ['backend', 'frontend', 'fullstack']
 * ```
 */
export function extractCategories<T extends BaseSearchableItem>(
  items: T[],
  categoryField: keyof T,
): string[] {
  const categories = new Set<string>();

  items.forEach(item => {
    const value = item[categoryField];
    // Handle string arrays for category fields
    if (Array.isArray(value)) {
      value.forEach((category: string) => categories.add(category));
    }
  });

  return Array.from(categories).sort();
}
