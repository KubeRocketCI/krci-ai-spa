import { useMemo } from 'react';
import { getAgents, type AgentsData } from '@/lib/agents';
import { useTemplatesData } from '@/components/templates/template-data-provider';
import { useDataFiles } from '@/components/data/data-data-provider';

export interface ContentHubData {
  agents: AgentsData | null;
  templates: ReturnType<typeof useTemplatesData>;
  dataFiles: ReturnType<typeof useDataFiles>;
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

  // Load data files
  const dataFilesResult = useDataFiles();

  // Compute overall loading state
  const loading = templatesResult.loading || dataFilesResult.loading;

  // Compute overall error state
  const error = useMemo(() => {
    if (!agentsData) {
      return 'Failed to load agents data';
    }
    if (templatesResult.error) {
      return templatesResult.error;
    }
    if (dataFilesResult.error) {
      return dataFilesResult.error;
    }
    return null;
  }, [agentsData, templatesResult.error, dataFilesResult.error]);

  return {
    agents: agentsData,
    templates: templatesResult,
    dataFiles: dataFilesResult,
    loading,
    error,
  };
}
