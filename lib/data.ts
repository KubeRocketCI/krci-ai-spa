import dataFilesData from '@/public/data/data.json';
import { BaseSearchableItem } from './search-types';

export interface DataFile extends BaseSearchableItem {
  id: string;
  name: string;
  description: string;
  categories: string[];
  path: string;
}

export interface DataFilesData {
  dataFiles: DataFile[];
  metadata: {
    totalDataFiles: number;
    categories: string[];
    generatedAt: string;
    version: string;
  };
}

export function getDataFiles(): DataFilesData {
  return dataFilesData as unknown as DataFilesData;
}
