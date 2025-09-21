import templatesData from '@/public/data/templates.json';

export interface Template {
  id: string;
  path: string;
  name: string;
  description: string;
  categories: string[];
  // BaseContentItem compatibility
  tags?: string[];
  version?: string;
}

export interface TemplatesData {
  templates: Template[];
  metadata: {
    totalTemplates: number;
    categories: string[];
    generatedAt: string;
    version: string;
  };
}

/**
 * Extract filename from template path
 */
export function getTemplateFilename(template: Template): string {
  try {
    if (!template || !template.path) {
      console.warn('Invalid template for filename extraction:', template);
      return '';
    }

    const pathParts = template.path.split('/');
    return pathParts[pathParts.length - 1] || '';
  } catch (error) {
    console.error('Error extracting filename from template path:', error);
    return '';
  }
}

/**
 * Get all templates data
 * @throws {Error} If templates data is invalid or unavailable
 */
export function getTemplates(): TemplatesData {
  try {
    const data = templatesData as unknown as TemplatesData;

    // Basic validation
    if (!data || !data.templates || !Array.isArray(data.templates)) {
      throw new Error('Invalid templates data structure');
    }

    if (!data.metadata || typeof data.metadata.totalTemplates !== 'number') {
      throw new Error('Invalid templates metadata');
    }

    return data;
  } catch (error) {
    console.error('Error loading templates data:', error);
    throw new Error('Failed to load templates data');
  }
}

/**
 * Get templates filtered by category
 */
export function getTemplatesByCategory(category: string): Template[] {
  try {
    if (!category || typeof category !== 'string') {
      console.warn('Invalid category parameter:', category);
      return [];
    }

    const { templates } = getTemplates();
    return templates.filter(
      template =>
        template.categories &&
        Array.isArray(template.categories) &&
        template.categories.includes(category),
    );
  } catch (error) {
    console.error('Error filtering templates by category:', error);
    return [];
  }
}

/**
 * Get single template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  try {
    if (!id || typeof id !== 'string') {
      console.warn('Invalid template ID parameter:', id);
      return undefined;
    }

    const { templates } = getTemplates();
    return templates.find(template => template.id === id);
  } catch (error) {
    console.error('Error finding template by ID:', error);
    return undefined;
  }
}

/**
 * Get all available categories
 */
export function getTemplateCategories(): string[] {
  try {
    const { metadata } = getTemplates();

    if (!metadata.categories || !Array.isArray(metadata.categories)) {
      console.warn('Invalid categories in metadata');
      return [];
    }

    return metadata.categories;
  } catch (error) {
    console.error('Error getting template categories:', error);
    return [];
  }
}

/**
 * Fallback description for templates without detailed descriptions
 */
export function getFallbackTemplateDescription(template: Template): string {
  try {
    if (!template || !template.name) {
      console.warn('Invalid template for fallback description:', template);
      return 'Template for project development and documentation';
    }

    return `${template.name} for streamlined project development`;
  } catch (error) {
    console.error('Error generating fallback template description:', error);
    return 'Template for project development and documentation';
  }
}
