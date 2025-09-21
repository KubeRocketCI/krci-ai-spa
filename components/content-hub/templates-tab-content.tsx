import { useState, useMemo, useCallback } from 'react';
import { SearchFilter } from '@/components/ui/search-filter';
import { TemplateCard } from '@/components/templates/template-card';
import { getTemplateCardClasses } from '@/lib/templates-design-tokens';
import { filterItems, extractCategories } from '@/lib/search-utils';
import type { Template } from '@/lib/templates';
import type { ContentHubData } from '@/hooks/use-content-hub-data';

interface TemplatesTabContentProps {
  templatesResult: ContentHubData['templates'];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * Templates tab content component
 * Used by: Content hub main page
 */
export function TemplatesTabContent({
  templatesResult,
  searchQuery,
  onSearchChange,
}: TemplatesTabContentProps) {
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string>('all');

  const handleTemplateCategoryChange = useCallback((category: string) => {
    setSelectedTemplateCategory(category);
  }, []);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    if (!templatesResult.data?.items) return [];

    const searchConfig = {
      searchFields: ['name', 'description'] as (keyof Template)[],
      categoryField: 'categories' as keyof Template,
    };

    return filterItems(
      templatesResult.data.items,
      searchQuery,
      selectedTemplateCategory,
      searchConfig,
    );
  }, [templatesResult.data?.items, searchQuery, selectedTemplateCategory]);

  // Get template categories
  const templateCategories = useMemo(() => {
    if (!templatesResult.data?.items) return [];
    return extractCategories(templatesResult.data.items, 'categories');
  }, [templatesResult.data?.items]);

  const templateCardClasses = getTemplateCardClasses();

  return (
    <div className="space-y-8">
      <section className="mb-8" aria-label="Filter and search templates">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedCategory={selectedTemplateCategory}
          onCategoryChange={handleTemplateCategoryChange}
          availableCategories={templateCategories}
          resultsCount={filteredTemplates.length}
          searchConfig={{
            searchFields: ['name', 'description'],
            categoryField: 'categories',
            placeholder: 'Search templates by name, description...',
            debounceMs: 300,
          }}
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
