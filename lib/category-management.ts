/** Simplified Category Management (pruned unused validation & stats logic) */

// Minimal interface kept because other type systems extend it
export interface Categorizable {
  categories: string[];
}

// Lightweight manager with only the functions actually used in the codebase
export class CategoryManager {
  static extractCategories<T extends Categorizable>(items: T[]): string[] {
    const categories = new Set<string>();
    items.forEach(item => {
      if (Array.isArray(item.categories)) {
        item.categories.forEach(category => {
          if (category && typeof category === 'string') {
            categories.add(category.trim());
          }
        });
      }
    });
    return Array.from(categories).sort();
  }

  static filterByCategory<T extends Categorizable>(
    items: T[],
    selectedCategory: CategoryFilterValue,
  ): T[] {
    if (selectedCategory === CATEGORY_ALL_VALUE || !selectedCategory) {
      return items;
    }
    return items.filter(
      item => Array.isArray(item.categories) && item.categories.includes(selectedCategory),
    );
  }
}

import { CATEGORY_ALL_VALUE, type CategoryFilterValue } from './constants';
