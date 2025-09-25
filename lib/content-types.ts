/**
 * Unified Content Type System
 *
 * Provides core interfaces for managing different types of content items
 * (tasks, data files, templates, FAQs, agents) with consistent structure
 * and async loading patterns throughout the application.
 *
 * Optimized for minimal bundle size by including only actively used properties.
 */

import type { Categorizable } from './category-management';

/**
 * Base content item interface that all content types must implement.
 *
 * Provides a unified structure for different content types including tasks,
 * data files, templates, and FAQs. All content items are categorizable
 * and searchable through consistent field naming.
 *
 * @example
 * ```typescript
 * interface Task extends BaseContentItem {
 *   priority: 'high' | 'medium' | 'low';
 * }
 *
 * interface DataFile extends BaseContentItem {
 *   fileSize: number;
 *   format: string;
 * }
 * ```
 */
export interface BaseContentItem extends Categorizable {
  /** Unique identifier used for React keys and accessibility */
  id: string;
  /** Display name shown in card titles and search results */
  name: string;
  /** Detailed description displayed in card content and tooltips */
  description: string;
  /** Version information for metadata tracking (optional) */
  version?: string;
  /** File system path for content stored as files (used in path displays) */
  path?: string;
  /** Base filename without extension (used for CLI installation commands) */
  filename?: string;
  /** Additional metadata tags for enhanced filtering and search */
  tags?: string[];
}

/**
 * Generic collection container for content items with metadata.
 *
 * Wraps arrays of content items with additional metadata about the collection,
 * including totals, available categories, and version information.
 * Used by data providers and content hub components for consistent data structure.
 *
 * @template T - Content item type that extends BaseContentItem
 *
 * @example
 * ```typescript
 * const taskCollection: ContentCollection<Task> = {
 *   items: [task1, task2, task3],
 *   metadata: {
 *     categories: ['development', 'testing']
 *   }
 * };
 * ```
 */
export interface ContentCollection<T extends BaseContentItem> {
  /** Array of content items */
  items: T[];
  /** Collection metadata and statistics */
  metadata: {
    /** Available categories for filtering */
    categories: string[];
  };
}

/**
 * Standard async state interface for content loading hooks.
 *
 * Provides consistent loading state management across all content types.
 * Used by data provider hooks to expose loading status, data, and error states
 * to React components in a predictable pattern.
 *
 * @template T - Content item type that extends BaseContentItem
 *
 * @example
 * ```typescript
 * function useTasksData(): UseContentResult<Task> {
 *   const [data, setData] = useState<ContentCollection<Task> | null>(null);
 *   const [loading, setLoading] = useState(true);
 *   const [error, setError] = useState<string | null>(null);
 *
 *   // ... loading logic
 *
 *   return { data, loading, error };
 * }
 *
 * // Usage in component
 * const tasksResult = useTasksData();
 * if (tasksResult.loading) return <Spinner />;
 * if (tasksResult.error) return <Error message={tasksResult.error} />;
 * if (tasksResult.data) return <TaskList tasks={tasksResult.data.items} />;
 * ```
 */
export interface UseContentResult<T extends BaseContentItem> {
  /** Content collection data, null while loading or on error */
  data: ContentCollection<T> | null;
  /** True while initial load or refresh is in progress */
  loading: boolean;
  /** Error message if loading failed, null on success */
  error: string | null;
}
