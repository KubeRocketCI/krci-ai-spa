import { useState, useMemo, useCallback } from 'react';
import { SearchFilter } from '@/components/ui/search-filter';
import { TemplateCard } from '@/components/templates/template-card';
import { getTemplateCardClasses } from '@/lib/templates-design-tokens';
import { CategoryManager } from '@/lib/category-management';
import { CATEGORY_ALL_VALUE } from '@/lib/constants';
import { TEMPLATE_SEARCH_CONFIG } from '@/lib/search-configs';
import type { ContentHubData } from '@/hooks/use-content-hub-data';

interface TemplatesTabContentProps {
  templatesResult: ContentHubData['templates'];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * Enhanced Templates tab content component
 */
export function TemplatesTabContent({
  templatesResult,
  searchQuery,
  onSearchChange,
}: TemplatesTabContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORY_ALL_VALUE);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Filter templates using enhanced CategoryManager
  const filteredTemplates = useMemo(() => {
    if (!templatesResult.data?.items) return [];

    let filtered = templatesResult.data.items;

    // Apply text search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(template => {
        // Search across template-specific fields
        const searchableFields = ['name', 'description'] as const;
        return searchableFields.some(field => {
          const value = template[field];
          return value && typeof value === 'string' && value.toLowerCase().includes(query);
        });
      });
    }

    // Apply category filter using CategoryManager
    filtered = CategoryManager.filterByCategory(filtered, selectedCategory);

    return filtered;
  }, [templatesResult.data?.items, searchQuery, selectedCategory]);

  // Get template categories - prefer pre-computed metadata, fallback to extraction
  const availableCategories = useMemo(() => {
    // First try to get from metadata (pre-computed)
    if (templatesResult.data?.metadata?.categories) {
      return templatesResult.data.metadata.categories;
    }

    // Fallback to runtime extraction if metadata not available
    if (templatesResult.data?.items) {
      return CategoryManager.extractCategories(templatesResult.data.items);
    }

    return [];
  }, [templatesResult.data]);

  const templateCardClasses = getTemplateCardClasses();

  return (
    <div className="space-y-8">
      <section className="mb-8" aria-label="Filter and search templates">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          availableCategories={availableCategories}
          resultsCount={filteredTemplates.length}
          totalCount={templatesResult.data?.items?.length}
          searchConfig={TEMPLATE_SEARCH_CONFIG}
          isLoading={templatesResult.loading}
          error={templatesResult.error}
        />
      </section>

      <section aria-label="Available templates">
        {templatesResult.loading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading templates...</p>
          </div>
        ) : templatesResult.error ? (
          <div className="text-center py-12">
            <div className="text-red-500 dark:text-red-400">
              <p className="text-lg font-medium mb-2">Failed to load templates</p>
              <p className="text-sm">{templatesResult.error}</p>
            </div>
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div
            className={`grid ${templateCardClasses.grid}`}
            role="grid"
            aria-label={`${filteredTemplates.length} templates`}
          >
            {filteredTemplates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" role="status">
            <div className="text-slate-500 dark:text-slate-400">
              <p className="text-lg font-medium mb-2">No templates found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
