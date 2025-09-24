import { useState, useCallback } from 'react';

/**
 * Return type for the useUnifiedSearch hook
 *
 * Provides search state and handlers for managing search functionality
 * across multiple content tabs.
 */
interface UnifiedSearch {
  /** Current search query string */
  searchQuery: string;
  /** Direct setter for search query (use sparingly) */
  setSearchQuery: (query: string) => void;
  /** Memoized handler for search input changes */
  handleSearchChange: (query: string) => void;
  /** Memoized function to clear the search query */
  clearSearch: () => void;
}

/**
 * Unified search management hook for content hub pages
 *
 * Provides centralized search state management that can be shared
 * across multiple content tabs, ensuring consistent search experience.
 *
 * @returns Object containing search state and memoized handlers
 *
 * @example
 * ```typescript
 * function ContentHub() {
 *   const { searchQuery, handleSearchChange, clearSearch } = useUnifiedSearch();
 *
 *   return (
 *     <SearchFilter
 *       searchQuery={searchQuery}
 *       onSearchChange={handleSearchChange}
 *       // ... other props
 *     />
 *   );
 * }
 * ```
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
