/**
 * Constants for content hub components
 */

export interface TasksMetadata {
  totalTasks: number;
  categories: string[];
}

export interface DataFilesMetadata {
  totalFiles: number;
  types: string[];
}

export const TASKS_MOCK_DATA: TasksMetadata = {
  totalTasks: 73,
  categories: [
    'Project Management',
    'Development',
    'Testing',
    'Documentation',
    'Architecture',
    'KubeRocketAI Core',
  ],
};

export const DATA_FILES_MOCK_DATA: DataFilesMetadata = {
  totalFiles: 19,
  types: ['Markdown', 'YAML', 'Standards', 'Methodologies'],
};

export const CONTENT_HUB_CONFIG = {
  kubeRocketAICoreTasks: 8,
  kubeRocketAICoreDataFiles: 3,
} as const;
