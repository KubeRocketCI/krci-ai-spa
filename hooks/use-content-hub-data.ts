import { useMemo } from 'react';
import { getAgents, type AgentsData } from '@/lib/agents';
import { useTemplatesData } from '@/components/templates/template-data-provider';
import { useDataFiles } from '@/components/data/data-data-provider';
import { useTasksData } from '@/components/tasks/task-data-provider';

export interface ContentHubData {
  agents: AgentsData | null;
  templates: ReturnType<typeof useTemplatesData>;
  dataFiles: ReturnType<typeof useDataFiles>;
  tasks: ReturnType<typeof useTasksData>;
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

  // Load tasks
  const tasksResult = useTasksData();

  // Compute overall loading state
  const loading = templatesResult.loading || dataFilesResult.loading || tasksResult.loading;

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
    if (tasksResult.error) {
      return tasksResult.error;
    }
    return null;
  }, [agentsData, templatesResult.error, dataFilesResult.error, tasksResult.error]);

  return {
    agents: agentsData,
    templates: templatesResult,
    dataFiles: dataFilesResult,
    tasks: tasksResult,
    loading,
    error,
  };
}
