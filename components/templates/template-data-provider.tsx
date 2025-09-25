'use client';

/**
 * Template data provider hook
 */

import { useState, useEffect, useCallback } from 'react';
import { getTemplates } from '@/lib/templates';
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
        // Fallback helper removed—assume description already present; leave as-is
        name: template.name,
        tags: template.categories,
      }));

      const contentCollection: ContentCollection<Template> = {
        items: processedTemplates,
        metadata: {
          categories: templatesData.metadata.categories,
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

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error };
}
