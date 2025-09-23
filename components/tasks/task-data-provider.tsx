'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTasks } from '@/lib/tasks';
import type { Task } from '@/lib/tasks';
import type { UseContentResult, ContentCollection } from '@/lib/content-types';

export function useTasksData(): UseContentResult<Task> {
  const [data, setData] = useState<ContentCollection<Task> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const tasksData = getTasks();
      setData({
        items: tasksData.tasks,
        metadata: {
          totalItems: tasksData.metadata.totalTasks,
          categories: tasksData.metadata.categories,
          generatedAt: tasksData.metadata.generatedAt,
          version: tasksData.metadata.version,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
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
