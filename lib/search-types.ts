/**
 * Generic search and filter interfaces
 */

export interface BaseSearchableItem {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  tags?: string[];
  categories?: string[]; // For templates
  specializations?: string[]; // For agents
}

export interface SearchConfig<T extends BaseSearchableItem> {
  searchFields: (keyof T)[];
  categoryField?: keyof T;
  placeholder?: string;
  debounceMs?: number;
}

export interface SearchFilterProps<T extends BaseSearchableItem> {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | 'all';
  onCategoryChange: (category: string | 'all') => void;
  availableCategories: string[];
  resultsCount?: number;
  searchConfig: SearchConfig<T>;
  className?: string;
}
