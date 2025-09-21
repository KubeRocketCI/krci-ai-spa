/**
 * Generic content type system
 */

import type { ReactNode } from 'react';

// Base content item interface - Liskov substitution principle
export interface BaseContentItem {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  version?: string;
  filename?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Content adapter interface for transforming domain objects to BaseContentItem
export interface ContentAdapter<TSource, TTarget extends BaseContentItem = BaseContentItem> {
  adapt(source: TSource): TTarget;
}

// Base content adapter with common transformation logic
export abstract class BaseContentAdapter<TSource, TTarget extends BaseContentItem = BaseContentItem>
  implements ContentAdapter<TSource, TTarget>
{
  abstract adapt(source: TSource): TTarget;

  // Helper method for safe string extraction
  protected safeString(value: unknown, fallback: string = ''): string {
    return typeof value === 'string' ? value : fallback;
  }

  // Helper method for safe array extraction
  protected safeArray(value: unknown): string[] {
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string')
      : [];
  }
}

// Content collection metadata
export interface ContentMetadata {
  totalItems: number;
  categories: string[];
  tags?: string[];
  generatedAt: string;
  version: string;
}

// Generic content collection
export interface ContentCollection<T extends BaseContentItem> {
  items: T[];
  metadata: ContentMetadata;
}

// Content page configuration - dependency inversion principle
export interface ContentPageConfig<T extends BaseContentItem> {
  title: string;
  description: string;
  icon: ReactNode;
  searchConfig: {
    placeholder: string;
    searchFields: (keyof T)[];
    categoryField?: keyof T;
    debounceMs?: number;
  };
  cardConfig: {
    variant: 'compact' | 'detailed' | 'feature';
    showActions?: boolean;
    showStats?: boolean;
  };
  gridConfig: {
    columns: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    gap: string;
  };
}

// Provider interface - interface segregation principle
export interface ContentProvider<T extends BaseContentItem> {
  getAll(): Promise<ContentCollection<T>>;
  getById(id: string): Promise<T | null>;
  search(query: string, fields: (keyof T)[]): Promise<T[]>;
}

// Hook interface for data fetching
export interface UseContentResult<T extends BaseContentItem> {
  data: ContentCollection<T> | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}
