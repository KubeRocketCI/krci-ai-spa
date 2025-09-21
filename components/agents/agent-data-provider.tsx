'use client';

/**
 * Agent data provider hook
 */

import { useState, useEffect, useCallback } from 'react';
import { getAgents } from '@/lib/agents';
import type { Agent, AgentsData } from '@/lib/agents';
import type { UseContentResult, ContentCollection } from '@/lib/content-types';

/**
 * Transform raw agents data to content collection format
 */
function transformAgentsToContentCollection(agentsData: AgentsData): ContentCollection<Agent> {
  return {
    items: agentsData.agents,
    metadata: {
      totalItems: agentsData.metadata.totalAgents,
      categories: agentsData.metadata.specializations,
      generatedAt: agentsData.metadata.generatedAt,
      version: agentsData.metadata.version,
    },
  };
}

export function useAgentsData(): UseContentResult<Agent> {
  const [data, setData] = useState<ContentCollection<Agent> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Data fetching - single responsibility
      const rawAgentsData = getAgents();

      // Data transformation - delegated to pure function
      const contentCollection = transformAgentsToContentCollection(rawAgentsData);

      setData(contentCollection);
    } catch (err) {
      console.error('Failed to load agents data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load agents data');
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
