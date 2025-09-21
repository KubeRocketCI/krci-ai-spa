/**
 * Generic search and filter utilities
 */

import type { BaseSearchableItem, SearchConfig } from './search-types';

/**
 * Filter items based on search query and category
 * Open/Closed: Open for extension with new search strategies
 */
export function filterItems<T extends BaseSearchableItem>(
  items: T[],
  searchQuery: string,
  selectedCategory: string | 'all',
  config: SearchConfig<T>,
): T[] {
  let filtered = items;

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => {
      return config.searchFields.some(field => {
        const value = item[field];
        return value && typeof value === 'string' && value.toLowerCase().includes(query);
      });
    });
  }

  // Filter by category - direct array handling
  if (selectedCategory !== 'all' && config.categoryField) {
    const categoryField = config.categoryField;
    filtered = filtered.filter(item => {
      const categoryValue = item[categoryField];
      // Both agents and templates now use string arrays for categories
      return Array.isArray(categoryValue) && categoryValue.includes(selectedCategory);
    });
  }

  return filtered;
}

/**
 * Extract unique categories from items
 * Single responsibility: Category extraction logic with consistent data handling
 */
export function extractCategories<T extends BaseSearchableItem>(
  items: T[],
  categoryField: keyof T,
): string[] {
  const categories = new Set<string>();

  items.forEach(item => {
    const value = item[categoryField];
    // Both agents and templates now use string arrays for categories
    if (Array.isArray(value)) {
      value.forEach((category: string) => categories.add(category));
    }
  });

  return Array.from(categories).sort();
}
