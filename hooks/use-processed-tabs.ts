import { useMemo } from 'react';
import { filterItems, extractCategories } from '@/lib/search-utils';
import type { BaseContentItem, ContentPageConfig, ContentCollection } from '@/lib/content-types';
import type { ReactNode } from 'react';

/**
 * Input tab configuration for content hub pages
 *
 * @template T - Type that extends BaseContentItem
 */
interface ContentTab<T extends BaseContentItem> {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Icon component to display in the tab */
  icon: ReactNode;
  /** Content data collection, null if not loaded */
  data: ContentCollection<T> | null;
  /** Configuration for search and display behavior */
  config: ContentPageConfig<T>;
  /** Function to render individual content items */
  renderCard: (item: T) => ReactNode;
  /** Whether the tab is currently loading */
  loading?: boolean;
  /** Error message if tab failed to load */
  error?: string | null;
}

/**
 * Processed tab with additional computed properties
 *
 * @template T - Type that extends BaseContentItem
 */
interface ProcessedTab<T extends BaseContentItem> extends ContentTab<T> {
  /** Items filtered by current search and category criteria */
  filteredItems: T[];
  /** Available categories extracted from all items */
  availableCategories: string[];
  /** Statistical information about the tab's content */
  stats: {
    /** Total number of items in the tab */
    total: number;
    /** Number of unique categories */
    categories: number;
  };
}

/**
 * Custom hook to process content tabs with search and filter logic
 *
 * Extracts complex tab processing computation from the main component,
 * applying search queries and category filters to generate filtered
 * results and statistics for each tab.
 *
 * @template T - Type that extends BaseContentItem
 * @param tabs - Array of content tabs to process
 * @param searchQuery - Current search query string
 * @param selectedCategories - Map of tab IDs to selected categories
 * @returns Array of processed tabs with filtered data and statistics
 *
 * @example
 * ```typescript
 * const processedTabs = useProcessedTabs(
 *   contentTabs,
 *   'development',
 *   { agents: 'frontend', templates: 'all' }
 * );
 * ```
 */
export function useProcessedTabs<T extends BaseContentItem>(
  tabs: ContentTab<T>[],
  searchQuery: string,
  selectedCategories: Record<string, string | 'all'>,
): ProcessedTab<T>[] {
  return useMemo(
    () =>
      tabs.map(tab => {
        if (!tab.data?.items) {
          return {
            ...tab,
            filteredItems: [],
            availableCategories: [],
            stats: { total: 0, categories: 0 },
          };
        }

        const availableCategories = tab.config.searchConfig.categoryField
          ? extractCategories(tab.data.items, tab.config.searchConfig.categoryField)
          : [];

        const filteredItems = filterItems(
          tab.data.items,
          searchQuery,
          selectedCategories[tab.id] || 'all',
          tab.config.searchConfig,
        );

        return {
          ...tab,
          filteredItems,
          availableCategories,
          stats: {
            total: tab.data.items.length,
            categories: availableCategories.length,
          },
        };
      }),
    [tabs, searchQuery, selectedCategories],
  );
}
