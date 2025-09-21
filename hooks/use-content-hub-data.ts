import { useMemo } from 'react';
import { getAgents, type AgentsData } from '@/lib/agents';
import { useTemplatesData } from '@/components/templates/template-data-provider';

export interface ContentHubData {
  agents: AgentsData | null;
  templates: ReturnType<typeof useTemplatesData>;
  loading: boolean;
  error: string | null;
}

/**
 * Centralized data management hook for content hub
 * Used by: Content hub main page and tab components
 */
export function useContentHubData(): ContentHubData {
  // Load agents data with error handling
  const agentsData = useMemo(() => {
    try {
      return getAgents();
    } catch (err) {
      console.error('Failed to load agents data:', err);
      return null;
    }
  }, []);

  // Load templates data using existing provider
  const templatesResult = useTemplatesData();

  // Compute overall loading state
  const loading = templatesResult.loading;

  // Compute overall error state
  const error = useMemo(() => {
    if (!agentsData) {
      return 'Failed to load agents data';
    }
    if (templatesResult.error) {
      return templatesResult.error;
    }
    return null;
  }, [agentsData, templatesResult.error]);

  return {
    agents: agentsData,
    templates: templatesResult,
    loading,
    error,
  };
}
