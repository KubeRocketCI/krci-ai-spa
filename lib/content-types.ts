/**
 * Unified Content Type System
 *
 * Refactor (2025-09-24): Simplified content model by removing:
 * - ContentType enum, adapter & factory abstractions
 * - Type guards relying on path heuristics
 * - Search-specific layered interfaces (SearchableContentItem)
 * - Registry/config objects not used by current UI flows
 */

import type { Categorizable } from './category-management';

/**
 * Base content item interface that all content types must implement
 */
export interface BaseContentItem extends Categorizable {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Detailed description */
  description: string;
  /** Version information */
  version?: string;
  /** File path for content stored as files */
  path?: string;
  /** Filename without extension (for installation/reference) */
  filename?: string;
  /** Optional tags for additional metadata */
  tags?: string[];
  /** Creation timestamp */
  createdAt?: string;
  /** Last update timestamp */
  updatedAt?: string;
}

// Re-introduced minimal collection & hook result types (still consumed by data/template providers)
export interface ContentCollection<T extends BaseContentItem> {
  items: T[];
  metadata: {
    totalItems: number;
    categories: string[];
    generatedAt: string;
    version: string;
  };
}

export interface UseContentResult<T extends BaseContentItem> {
  data: ContentCollection<T> | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void> | void; // some providers may not be async
}
