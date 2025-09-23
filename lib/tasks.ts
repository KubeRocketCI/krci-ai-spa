import tasksData from '@/public/data/tasks.json';
import type { BaseContentItem } from './content-types';

export interface Task extends BaseContentItem {
  id: string;
  name: string;
  description: string;
  categories: string[];
  path: string;
}

export interface TasksData {
  tasks: Task[];
  metadata: {
    totalTasks: number;
    categories: string[];
    generatedAt: string;
    version: string;
  };
}

export function getTasks(): TasksData {
  return tasksData as unknown as TasksData;
}
