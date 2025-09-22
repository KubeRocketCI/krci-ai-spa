import { useState, useMemo } from 'react';
import { SearchFilter } from '@/components/ui/search-filter';
import { DataCard } from '@/components/data/data-card';
import { filterItems, extractCategories } from '@/lib/search-utils';
import type { DataFile } from '@/lib/data';
import type { ContentHubData } from '@/hooks/use-content-hub-data';

interface DataTabContentProps {
  dataFilesResult: ContentHubData['dataFiles'];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * Data tab content component
 * Used by: Content hub main page
 */
export function DataTabContent({
  dataFilesResult,
  searchQuery,
  onSearchChange,
}: DataTabContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDataFiles = useMemo(() => {
    if (!dataFilesResult.data?.items) return [];

    return filterItems(dataFilesResult.data.items, searchQuery, selectedCategory, {
      searchFields: ['name', 'description'] as (keyof DataFile)[],
      categoryField: 'categories' as keyof DataFile,
    });
  }, [dataFilesResult.data?.items, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    if (!dataFilesResult.data?.items) return [];
    return extractCategories(dataFilesResult.data.items, 'categories');
  }, [dataFilesResult.data?.items]);

  return (
    <div className="space-y-8">
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        availableCategories={categories}
        resultsCount={filteredDataFiles.length}
        searchConfig={{
          searchFields: ['name', 'description'],
          categoryField: 'categories',
          placeholder: 'Search data files...',
          debounceMs: 300,
        }}
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
