import { useState, useMemo, useCallback } from 'react';
import { SearchFilter } from '@/components/ui/search-filter';
import { CategoryManager } from '@/lib/category-management';
import { CATEGORY_ALL_VALUE } from '@/lib/constants';
import { TASK_SEARCH_CONFIG } from '@/lib/search-configs';
import type { ContentHubData } from '@/hooks/use-content-hub-data';
import { TaskCard } from '@/components/tasks/task-card';
import { getTaskCardClasses } from '@/lib/tasks-design-tokens';

interface TasksTabContentProps {
  tasksResult: ContentHubData['tasks'];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TasksTabContent({
  tasksResult,
  searchQuery,
  onSearchChange,
}: TasksTabContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORY_ALL_VALUE);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filteredTasks = useMemo(() => {
    if (!tasksResult.data?.items) return [];

    let filtered = tasksResult.data.items;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => {
        const searchableFields = ['name', 'description'] as const;
        return searchableFields.some(field => {
          const value = task[field];
          return value && typeof value === 'string' && value.toLowerCase().includes(query);
        });
      });
    }

    filtered = CategoryManager.filterByCategory(filtered, selectedCategory);
    return filtered;
  }, [tasksResult.data?.items, searchQuery, selectedCategory]);

  const availableCategories = useMemo(() => {
    if (tasksResult.data?.metadata?.categories) return tasksResult.data.metadata.categories;
    if (tasksResult.data?.items) return CategoryManager.extractCategories(tasksResult.data.items);
    return [];
  }, [tasksResult.data]);

  const taskCardClasses = getTaskCardClasses();

  return (
    <div className="space-y-8">
      <section className="mb-8" aria-label="Filter and search tasks">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          availableCategories={availableCategories}
          resultsCount={filteredTasks.length}
          totalCount={tasksResult.data?.items?.length}
          searchConfig={TASK_SEARCH_CONFIG}
          isLoading={tasksResult.loading}
          error={tasksResult.error}
        />
      </section>

      <section aria-label="Available tasks">
        {tasksResult.loading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading tasks...</p>
          </div>
        ) : tasksResult.error ? (
          <div className="text-center py-12">
            <div className="text-red-500 dark:text-red-400">
              <p className="text-lg font-medium mb-2">Failed to load tasks</p>
              <p className="text-sm">{tasksResult.error}</p>
            </div>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div
            className={`grid ${taskCardClasses.grid}`}
            role="grid"
            aria-label={`${filteredTasks.length} tasks`}
          >
            {filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" role="status">
            <div className="text-slate-500 dark:text-slate-400">
              <p className="text-lg font-medium mb-2">No tasks found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
