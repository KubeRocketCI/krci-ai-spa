/**
 * Public Content Types for External Use
 */

// Core types and interfaces
export type {
  BaseContentItem,
  SearchableContentItem,
  AgentContentItem,
  TemplateContentItem,
  DataContentItem,
  TaskContentItem,
  AnyContentItem,
} from '@/lib/content-types';

// Content type enumeration and configurations
export {
  ContentType,
  CONTENT_TYPE_CONFIGS,
  getContentTypeConfig,
  getContentType,
} from '@/lib/content-types';

// Type guards for runtime checking
export {
  isAgentContent,
  isTemplateContent,
  isDataContent,
  isTaskContent,
} from '@/lib/content-types';

// Content collection and metadata types
export type {
  ContentCollection,
  ContentMetadata,
  ContentTypeConfig,
  ContentPageConfig,
} from '@/lib/content-types';

// Adapter pattern types
export type { ContentAdapter } from '@/lib/content-types';

export { BaseContentAdapter } from '@/lib/content-types';

// Utility functions
export { createEmptyCollection } from '@/lib/content-types';

// Provider and hook interfaces
export type { ContentProvider, UseContentResult } from '@/lib/content-types';

// Category management re-exports
export type {
  Categorizable,
  CategoryMetadata,
  CategoryValidationResult,
} from '@/lib/category-management';

export { CategoryManager } from '@/lib/category-management';
