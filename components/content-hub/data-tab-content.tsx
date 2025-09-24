import { useState, useMemo, useCallback } from 'react';
import { SearchFilter } from '@/components/ui/search-filter';
import { DataCard } from '@/components/data/data-card';
import { CategoryManager } from '@/lib/category-management';
import { CATEGORY_ALL_VALUE } from '@/lib/constants';
import { DATA_SEARCH_CONFIG } from '@/lib/search-configs';
import type { DataFile } from '@/lib/data';
import type { ContentHubData } from '@/hooks/use-content-hub-data';

interface DataTabContentProps {
  dataFilesResult: ContentHubData['dataFiles'];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * Enhanced Data tab content component
 */
export function DataTabContent({
  dataFilesResult,
  searchQuery,
  onSearchChange,
}: DataTabContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORY_ALL_VALUE);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filteredDataFiles = useMemo(() => {
    if (!dataFilesResult.data?.items) return [];

    let filtered: DataFile[] = dataFilesResult.data.items;

    // Apply text search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((dataFile: DataFile) => {
        // Search across data file specific fields
        const searchableFields = ['name', 'description'] as const;
        return searchableFields.some(field => {
          const value = dataFile[field];
          return value && typeof value === 'string' && value.toLowerCase().includes(query);
        });
      });
    }

    // Apply category filter using CategoryManager
    filtered = CategoryManager.filterByCategory(filtered, selectedCategory);

    return filtered;
  }, [dataFilesResult.data?.items, searchQuery, selectedCategory]);

  // Get data file categories - prefer pre-computed metadata, fallback to extraction
  const availableCategories = useMemo(() => {
    // First try to get from metadata (pre-computed)
    if (dataFilesResult.data?.metadata?.categories) {
      return dataFilesResult.data.metadata.categories;
    }

    // Fallback to runtime extraction if metadata not available
    if (dataFilesResult.data?.items) {
      return CategoryManager.extractCategories(dataFilesResult.data.items);
    }

    return [];
  }, [dataFilesResult.data]);

  return (
    <div className="space-y-8">
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        availableCategories={availableCategories}
        resultsCount={filteredDataFiles.length}
        totalCount={dataFilesResult.data?.items?.length}
        searchConfig={DATA_SEARCH_CONFIG}
        isLoading={dataFilesResult.loading}
        error={dataFilesResult.error}
      />

      {dataFilesResult.loading ? (
        <div className="text-center py-12">
          <p className="text-lg">Loading data files...</p>
        </div>
      ) : dataFilesResult.error ? (
        <div className="text-center py-12">
          <div className="text-red-500 dark:text-red-400">
            <p className="text-lg font-medium mb-2">Failed to load data files</p>
            <p className="text-sm">{dataFilesResult.error}</p>
          </div>
        </div>
      ) : filteredDataFiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDataFiles.map(dataFile => (
            <DataCard key={dataFile.id} dataFile={dataFile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg font-medium mb-2">No data files found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
