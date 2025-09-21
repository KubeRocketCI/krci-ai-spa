'use client';

/**
 * Template data provider hook
 */

import { useState, useEffect, useCallback } from 'react';
import { getTemplates, getFallbackTemplateDescription } from '@/lib/templates';
import type { Template } from '@/lib/templates';
import type { UseContentResult, ContentCollection } from '@/lib/content-types';

export function useTemplatesData(): UseContentResult<Template> {
  const [data, setData] = useState<ContentCollection<Template> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const templatesData = getTemplates();

      // Process templates to ensure BaseContentItem compatibility
      const processedTemplates = templatesData.templates.map(template => ({
        ...template,
        description: template.description || getFallbackTemplateDescription(template),
        // Ensure BaseContentItem compatibility
        name: template.name, // Use template name as display name
        tags: template.categories, // Use categories as tags
      }));

      const contentCollection: ContentCollection<Template> = {
        items: processedTemplates,
        metadata: {
          totalItems: templatesData.metadata.totalTemplates,
          categories: templatesData.metadata.categories,
          generatedAt: templatesData.metadata.generatedAt,
          version: templatesData.metadata.version,
        },
      };

      setData(contentCollection);
    } catch (err) {
      console.error('Failed to load templates data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load templates data');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refresh };
}
