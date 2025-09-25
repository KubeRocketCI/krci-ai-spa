'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDataFiles } from '@/lib/data';
import type { DataFile } from '@/lib/data';
import type { UseContentResult, ContentCollection } from '@/lib/content-types';

export function useDataFiles(): UseContentResult<DataFile> {
  const [data, setData] = useState<ContentCollection<DataFile> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const dataFilesData = getDataFiles();
      setData(dataFilesData);
    } catch {
      setError('Failed to load data files');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error };
}
