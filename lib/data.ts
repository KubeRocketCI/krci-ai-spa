import dataFilesData from '@/public/data/data.json';
import type { BaseContentItem, ContentCollection } from './content-types';

export interface DataFile extends BaseContentItem {
  id: string;
  name: string;
  description: string;
  categories: string[];
  path: string;
}

export function getDataFiles(): ContentCollection<DataFile> {
  const raw = dataFilesData as unknown as {
    dataFiles: DataFile[];
    metadata: {
      totalDatafiles: number;
      categories: string[];
      generatedAt: string;
      version: string;
    };
  };
  return {
    items: raw.dataFiles,
    metadata: {
      totalItems: raw.metadata.totalDatafiles, // Fix field name (lowercase 'f' in JSON)
      categories: raw.metadata.categories,
      generatedAt: raw.metadata.generatedAt,
      version: raw.metadata.version,
    },
  };
}
