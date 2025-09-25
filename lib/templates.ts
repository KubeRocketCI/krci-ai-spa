import templatesData from '@/public/data/templates.json';

export interface Template {
  id: string;
  path: string;
  name: string;
  description: string;
  categories: string[];
  tags?: string[];
}

interface TemplatesDataInternal {
  templates: Template[];
  metadata: {
    totalTemplates: number;
    categories: string[];
    generatedAt: string;
    version: string;
  };
}

/**
 * Get all templates data
 * @throws {Error} If templates data is invalid or unavailable
 */
export function getTemplates(): TemplatesDataInternal {
  try {
    const data = templatesData as unknown as TemplatesDataInternal;

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
