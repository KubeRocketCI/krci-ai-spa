/**
 * Unified Content Type System
 */

import type { ReactNode } from 'react';
import type { Categorizable, CategoryMetadata } from './category-management';
import { CONTENT_PATH_PATTERNS } from './constants';

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

/**
 * Searchable content interface
 * Extends BaseContentItem with search-specific fields
 */
export interface SearchableContentItem extends BaseContentItem {
  /** Alternative title field for search */
  title?: string;
  /** Search-optimized content fields */
  searchableFields?: string[];
}

/**
 * Agent-specific content interface
 * Follows Open/Closed Principle - extends base without modifying it
 */
export interface AgentContentItem extends SearchableContentItem {
  /** Agent role/title */
  role: string;
  /** Agent's primary goal */
  goal: string;
  /** Visual icon representation */
  icon: string;
  /** Agent's operational scope */
  scope: string;
  /** Usage guidance */
  whenToUse: string;
  /** Number of available commands */
  commandCount: number;
  /** Number of available tasks */
  taskCount: number;
  /** Available commands mapping */
  commands: Record<string, string>;
}

/**
 * Template-specific content interface
 */
export interface TemplateContentItem extends SearchableContentItem {
  /** Template type or format */
  type?: string;
  /** Usage instructions */
  usage?: string;
  /** Required variables */
  variables?: string[];
  /** Template language/framework */
  language?: string;
}

/**
 * Data file content interface
 */
export interface DataContentItem extends SearchableContentItem {
  /** Data format (md, yaml, json, etc.) */
  format?: string;
  /** Data schema version */
  schemaVersion?: string;
  /** Last modified date */
  lastModified?: string;
  /** File size in bytes */
  size?: number;
}

/**
 * Task-specific content interface
 */
export interface TaskContentItem extends SearchableContentItem {
  /** Task dependencies */
  dependencies?: string[];
  /** Task parameters */
  parameters?: Record<string, unknown>;
  /** Estimated execution time */
  estimatedTime?: string;
  /** Required permissions */
  permissions?: string[];
}

/**
 * Content adapter interface for transforming between different representations
 */
export interface ContentAdapter<TSource, TTarget extends BaseContentItem = BaseContentItem> {
  /**
   * Transform source data to target content item
   */
  adapt(source: TSource): TTarget;

  /**
   * Validate source data before transformation
   */
  validate?(source: TSource): boolean;

  /**
   * Get content type for this adapter
   */
  getContentType?(): ContentType;
}

/**
 * Base content adapter implementation
 * Provides common functionality for all adapters
 */
export abstract class BaseContentAdapter<TSource, TTarget extends BaseContentItem = BaseContentItem>
  implements ContentAdapter<TSource, TTarget>
{
  abstract adapt(source: TSource): TTarget;

  validate(source: TSource): boolean {
    return source != null && typeof source === 'object';
  }

  /**
   * Helper method for safe string extraction
   */
  protected safeString(value: unknown, fallback: string = ''): string {
    return typeof value === 'string' ? value : fallback;
  }

  /**
   * Helper method for safe array extraction
   */
  protected safeArray(value: unknown): string[] {
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string')
      : [];
  }

  /**
   * Normalize and validate categories
   */
  protected normalizeCategories(categories: unknown): string[] {
    if (!Array.isArray(categories)) return [];
    return categories
      .filter((cat): cat is string => typeof cat === 'string' && cat.trim().length > 0)
      .map(cat => cat.trim())
      .filter((cat, index, arr) => arr.indexOf(cat) === index) // Remove duplicates
      .sort();
  }

  /**
   * Generate ID from name or filename
   */
  protected generateId(name: string, filename?: string): string {
    const base = filename || name;
    return base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Extract filename from path
   */
  protected extractFilename(path: string): string {
    return (
      path
        .split('/')
        .pop()
        ?.replace(/\.[^/.]+$/, '') || ''
    );
  }
}

/**
 * Content type enumeration for type discrimination
 */
export enum ContentType {
  AGENT = 'agent',
  TEMPLATE = 'template',
  DATA = 'data',
  TASK = 'task',
}

/**
 * Content collection metadata
 * Enhanced with category management features
 */
export interface ContentMetadata extends CategoryMetadata {
  /** Optional additional tags */
  tags?: string[];
}

/**
 * Generic content collection
 * Type-safe wrapper for content collections with metadata
 */
export interface ContentCollection<T extends BaseContentItem> {
  /** Array of content items */
  items: T[];
  /** Collection metadata including categories */
  metadata: ContentMetadata;
}

/**
 * Content type configuration
 * Defines behavior and properties for each content type
 */
export interface ContentTypeConfig {
  /** Content type identifier */
  type: ContentType;
  /** Display name for the content type */
  displayName: string;
  /** Plural form of the display name */
  displayNamePlural: string;
  /** Icon for UI representation */
  icon: string;
  /** Default search fields */
  defaultSearchFields: string[];
  /** Default category field */
  categoryField: string;
  /** Default placeholder text for search */
  searchPlaceholder: string;
  /** File extension for source files */
  fileExtension?: string;
  /** Source directory path */
  sourceDirectory?: string;
}

/**
 * Enhanced with unified type system
 */
export interface ContentPageConfig {
  title: string;
  description: string;
  icon: ReactNode;
  searchConfig: {
    placeholder: string;
    searchFields: string[];
    categoryField?: string;
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

export interface ContentProvider<T extends BaseContentItem> {
  getAll(): Promise<ContentCollection<T>>;
  getById(id: string): Promise<T | null>;
  search(query: string, fields: string[]): Promise<T[]>;
}

/**
 * Hook interface for data fetching
 */
export interface UseContentResult<T extends BaseContentItem> {
  data: ContentCollection<T> | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Union type for all content items
 */
export type AnyContentItem =
  | AgentContentItem
  | TemplateContentItem
  | DataContentItem
  | TaskContentItem;

/**
 * Type guard functions for runtime type checking
 */

export function isAgentContent(item: BaseContentItem): item is AgentContentItem {
  return 'role' in item && 'goal' in item && 'scope' in item;
}

export function isTemplateContent(item: BaseContentItem): item is TemplateContentItem {
  return 'path' in item && !!item.path?.includes(CONTENT_PATH_PATTERNS.TEMPLATES);
}

export function isDataContent(item: BaseContentItem): item is DataContentItem {
  return 'path' in item && !!item.path?.includes(CONTENT_PATH_PATTERNS.DATA);
}

export function isTaskContent(item: BaseContentItem): item is TaskContentItem {
  return 'dependencies' in item || 'parameters' in item;
}

/**
 * Content type configurations
 * Centralized configuration following Single Responsibility Principle
 */
export const CONTENT_TYPE_CONFIGS: Record<ContentType, ContentTypeConfig> = {
  [ContentType.AGENT]: {
    type: ContentType.AGENT,
    displayName: 'Agent',
    displayNamePlural: 'Agents',
    icon: '🤖',
    defaultSearchFields: ['name', 'role', 'description', 'goal', 'whenToUse'],
    categoryField: 'categories',
    searchPlaceholder: 'Search agents by name, role, description, or specialization...',
    fileExtension: '.yaml',
    sourceDirectory: '.krci-ai/agents',
  },

  [ContentType.TEMPLATE]: {
    type: ContentType.TEMPLATE,
    displayName: 'Template',
    displayNamePlural: 'Templates',
    icon: '📄',
    defaultSearchFields: ['name', 'description'],
    categoryField: 'categories',
    searchPlaceholder: 'Search templates by name, description...',
    fileExtension: '.md',
    sourceDirectory: '.krci-ai/templates',
  },

  [ContentType.DATA]: {
    type: ContentType.DATA,
    displayName: 'Data File',
    displayNamePlural: 'Data Files',
    icon: '📊',
    defaultSearchFields: ['name', 'description'],
    categoryField: 'categories',
    searchPlaceholder: 'Search data files...',
    fileExtension: '.md',
    sourceDirectory: '.krci-ai/data',
  },

  [ContentType.TASK]: {
    type: ContentType.TASK,
    displayName: 'Task',
    displayNamePlural: 'Tasks',
    icon: '⚡',
    defaultSearchFields: ['name', 'description'],
    categoryField: 'categories',
    searchPlaceholder: 'Search tasks...',
    fileExtension: '.md',
    sourceDirectory: '.krci-ai/tasks',
  },
};

/**
 * Utility functions
 */

/**
 * Get content type configuration
 */
export function getContentTypeConfig(type: ContentType): ContentTypeConfig {
  return CONTENT_TYPE_CONFIGS[type];
}

/**
 * Get content type from item
 */
export function getContentType(item: BaseContentItem): ContentType | null {
  if (isAgentContent(item)) return ContentType.AGENT;
  if (isTemplateContent(item)) return ContentType.TEMPLATE;
  if (isDataContent(item)) return ContentType.DATA;
  if (isTaskContent(item)) return ContentType.TASK;
  return null;
}

/**
 * Create empty content collection
 */
export function createEmptyCollection<T extends BaseContentItem>(): ContentCollection<T> {
  return {
    items: [],
    metadata: {
      totalItems: 0,
      categories: [],
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
    },
  };
}
