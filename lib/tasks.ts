import tasksData from '@/public/data/tasks.json';
import type { ContentCollection } from './content-types';

// Minimal Task interface (only fields actually consumed by UI components)
export interface Task {
  id: string;
  name: string;
  description: string;
  categories: string[];
  path: string;
  // Optional extended fields retained if present in JSON (not required by UI now)
  version?: string;
  tags?: string[];
}

export function getTasks(): ContentCollection<Task> {
  const raw = tasksData as unknown as {
    tasks: Task[];
    metadata: {
      totalTasks: number;
      categories: string[];
      generatedAt: string;
      version: string;
    };
  };
  return {
    items: raw.tasks,
    metadata: {
      totalItems: raw.metadata.totalTasks, // Fix field name mapping
      categories: raw.metadata.categories,
      generatedAt: raw.metadata.generatedAt,
      version: raw.metadata.version,
    },
  };
}
