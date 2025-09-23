/**
 * Category Management System
 */

/**
 * Interface for content items that support categories
 */
export interface Categorizable {
  categories: string[];
}

/**
 * Category metadata interface
 */
export interface CategoryMetadata {
  totalItems: number;
  categories: string[];
  generatedAt: string;
  version: string;
}

/**
 * Content data structure with category metadata
 */
export interface ContentData<T extends Categorizable> {
  items: T[];
  metadata: CategoryMetadata;
}

/**
 * Category validation result
 */
export interface CategoryValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Core category management class
 */
export class CategoryManager {
  /**
   * Extract unique categories from items (runtime fallback)
   * @param items Array of categorizable items
   * @returns Sorted array of unique categories
   */
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

  /**
   * Validate category structure and content
   * @param categories Array of category strings to validate
   * @returns Validation result with errors and warnings
   */
  static validateCategories(categories: string[]): CategoryValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!Array.isArray(categories)) {
      errors.push('Categories must be an array');
      return { isValid: false, errors, warnings };
    }

    const uniqueCategories = new Set<string>();
    const duplicates = new Set<string>();

    categories.forEach((category, index) => {
      // Check for valid string
      if (typeof category !== 'string') {
        errors.push(`Category at index ${index} is not a string: ${typeof category}`);
        return;
      }

      // Check for empty categories
      const trimmed = category.trim();
      if (!trimmed) {
        errors.push(`Category at index ${index} is empty or whitespace-only`);
        return;
      }

      // Check for duplicates
      if (uniqueCategories.has(trimmed)) {
        duplicates.add(trimmed);
      } else {
        uniqueCategories.add(trimmed);
      }

      // Check for naming conventions
      if (trimmed !== category) {
        warnings.push(`Category "${category}" has leading/trailing whitespace`);
      }

      // Check for consistent casing (Title Case recommended)
      if (trimmed.toLowerCase() === trimmed || trimmed.toUpperCase() === trimmed) {
        warnings.push(`Category "${category}" should use Title Case (e.g., "Development")`);
      }
    });

    // Report duplicates
    if (duplicates.size > 0) {
      errors.push(`Duplicate categories found: ${Array.from(duplicates).join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Normalize categories by removing duplicates, trimming, and sorting
   * @param categories Array of category strings
   * @returns Normalized category array
   */
  static normalizeCategories(categories: string[]): string[] {
    if (!Array.isArray(categories)) {
      return [];
    }

    const normalized = new Set<string>();

    categories.forEach(category => {
      if (typeof category === 'string') {
        const trimmed = category.trim();
        if (trimmed) {
          normalized.add(trimmed);
        }
      }
    });

    return Array.from(normalized).sort();
  }

  /**
   * Merge categories from multiple sources with validation
   * @param categorySources Array of category arrays to merge
   * @returns Merged and normalized categories
   */
  static mergeCategories(...categorySources: string[][]): string[] {
    const allCategories = categorySources.flat();
    return this.normalizeCategories(allCategories);
  }

  /**
   * Filter items by category
   * @param items Array of categorizable items
   * @param selectedCategory Category to filter by, or CATEGORY_ALL_VALUE for no filter
   * @returns Filtered items array
   */
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

  /**
   * Get category statistics
   * @param items Array of categorizable items
   * @returns Map of category names to item counts
   */
  static getCategoryStats<T extends Categorizable>(items: T[]): Map<string, number> {
    const stats = new Map<string, number>();

    items.forEach(item => {
      if (Array.isArray(item.categories)) {
        item.categories.forEach(category => {
          if (typeof category === 'string') {
            const trimmed = category.trim();
            if (trimmed) {
              stats.set(trimmed, (stats.get(trimmed) || 0) + 1);
            }
          }
        });
      }
    });

    return stats;
  }

  /**
   * Validate content data structure
   * @param data Content data to validate
   * @returns Validation result
   */
  static validateContentData<T extends Categorizable>(
    data: ContentData<T>,
  ): CategoryValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate structure
    if (!data || typeof data !== 'object') {
      errors.push('Content data must be an object');
      return { isValid: false, errors, warnings };
    }

    if (!Array.isArray(data.items)) {
      errors.push('Content data must have an items array');
    }

    if (!data.metadata || typeof data.metadata !== 'object') {
      errors.push('Content data must have metadata object');
    } else {
      // Validate metadata
      if (typeof data.metadata.totalItems !== 'number') {
        errors.push('Metadata must have totalItems as number');
      }

      if (!Array.isArray(data.metadata.categories)) {
        errors.push('Metadata must have categories as array');
      } else {
        // Validate metadata categories
        const categoryValidation = this.validateCategories(data.metadata.categories);
        errors.push(...categoryValidation.errors);
        warnings.push(...categoryValidation.warnings);
      }

      if (typeof data.metadata.generatedAt !== 'string') {
        warnings.push('Metadata should have generatedAt as string');
      }

      if (typeof data.metadata.version !== 'string') {
        warnings.push('Metadata should have version as string');
      }
    }

    // Validate consistency between items and metadata
    if (data.items && data.metadata) {
      const actualCount = data.items.length;
      const metadataCount = data.metadata.totalItems;

      if (actualCount !== metadataCount) {
        errors.push(`Item count mismatch: actual ${actualCount}, metadata ${metadataCount}`);
      }

      // Validate that metadata categories match extracted categories
      const extractedCategories = this.extractCategories(data.items);
      const metadataCategories = this.normalizeCategories(data.metadata.categories);

      const missingFromMetadata = extractedCategories.filter(
        cat => !metadataCategories.includes(cat),
      );
      const extraInMetadata = metadataCategories.filter(cat => !extractedCategories.includes(cat));

      if (missingFromMetadata.length > 0) {
        warnings.push(`Categories in items but not in metadata: ${missingFromMetadata.join(', ')}`);
      }

      if (extraInMetadata.length > 0) {
        warnings.push(`Categories in metadata but not in items: ${extraInMetadata.join(', ')}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

import { CATEGORY_ALL_VALUE, type CategoryFilterValue } from './constants';

/**
 * Utility functions for backward compatibility and convenience
 */

/**
 * Type guard for categorizable items
 */
export function isCategorizable(item: unknown): item is Categorizable {
  return (
    typeof item === 'object' &&
    item !== null &&
    'categories' in item &&
    Array.isArray((item as Record<string, unknown>).categories)
  );
}
