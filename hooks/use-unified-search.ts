import { useState, useCallback } from 'react';

export interface UnifiedSearch {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchChange: (query: string) => void;
  clearSearch: () => void;
}

/**
 * Unified search management hook for content hub
 * Benefits: Consistent search experience across all tabs
 */
export function useUnifiedSearch(): UnifiedSearch {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    clearSearch,
  };
}
