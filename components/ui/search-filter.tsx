'use client';

/**
 * Generic search filter component
 */

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchKeyboard } from '@/hooks/use-search-keyboard';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { ThemedButton } from '@/components/ui/themed-button';
import {
  ThemedSearchContainer,
  ThemedSearchInput,
  ThemedSearchField,
  ThemedCategoryContainer,
  ThemedCategoryButton,
  ThemedResultsCount,
  ThemedSearchLoading,
} from '@/components/ui/themed-search';
import type { BaseSearchableItem, SearchFilterProps } from '@/lib/search-types';

function SearchFilterComponent<T extends BaseSearchableItem>({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  availableCategories,
  resultsCount = 0,
  totalCount,
  searchConfig,
  className,
  isLoading = false,
}: SearchFilterProps<T>) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debounceMs = searchConfig.debounceMs || 300;
  const placeholder = searchConfig.placeholder || 'Search...';

  // Use the custom debounce hook instead of manual debouncing
  const debouncedQuery = useDebouncedValue(localQuery, debounceMs);

  useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, onSearchChange]);

  const clearFilters = useCallback(() => {
    setLocalQuery('');
    onSearchChange('');
    onCategoryChange('all');
    searchInputRef.current?.focus();
  }, [onSearchChange, onCategoryChange]);

  // Keyboard shortcuts management using custom hook
  useSearchKeyboard(searchInputRef, {
    isFocused,
    onClearFilters: clearFilters,
  });

  const hasActiveFilters = localQuery.trim() !== '' || selectedCategory !== 'all';

  return (
    <ThemedSearchContainer className={className}>
      {/* Search Input */}
      <ThemedSearchInput>
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-600 dark:text-slate-400"
          aria-hidden="true"
        />
        <ThemedSearchField
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label={`Search by ${placeholder.toLowerCase()}`}
          aria-describedby="search-shortcut"
        />
        {hasActiveFilters && (
          <ThemedButton
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 h-6 w-6 p-0"
            aria-label="Clear search and filters"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </ThemedButton>
        )}
      </ThemedSearchInput>

      {/* Category Filter */}
      {availableCategories.length > 0 && (
        <div role="group" aria-label="Filter by category">
          <ThemedCategoryContainer>
            <ThemedCategoryButton
              onClick={() => onCategoryChange('all')}
              isActive={selectedCategory === 'all'}
            >
              All
            </ThemedCategoryButton>
            {availableCategories.map(category => (
              <ThemedCategoryButton
                key={category}
                onClick={() => onCategoryChange(category)}
                isActive={selectedCategory === category}
              >
                {category}
              </ThemedCategoryButton>
            ))}
          </ThemedCategoryContainer>
        </div>
      )}

      {/* Results count or loading state */}
      {isLoading && hasActiveFilters && (
        <div role="status" aria-live="polite" aria-label="Searching...">
          <ThemedSearchLoading />
        </div>
      )}

      {!isLoading && hasActiveFilters && (
        <div
          role="status"
          aria-live="polite"
          aria-label={`Showing ${resultsCount} ${totalCount ? `of ${totalCount}` : ''} result${resultsCount !== 1 ? 's' : ''} matching your criteria`}
        >
          <ThemedResultsCount isLoading={isLoading}>
            {resultsCount} {totalCount ? `of ${totalCount}` : ''} result
            {resultsCount !== 1 ? 's' : ''}
          </ThemedResultsCount>
        </div>
      )}

      {/* Hidden keyboard shortcut hint for screen readers */}
      <div id="search-shortcut" className="sr-only">
        Press Ctrl+K or Cmd+K to focus search, Escape to clear focus
      </div>

      {/* Screen reader announcements for search completion */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {hasActiveFilters && (
          <span>
            Search completed. {resultsCount} {totalCount ? `of ${totalCount}` : ''} results found
            {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
            {searchQuery.trim() && ` for "${searchQuery}"`}.
          </span>
        )}
      </div>
    </ThemedSearchContainer>
  );
}

// Memoized export - performance optimization
export const SearchFilter = memo(SearchFilterComponent) as typeof SearchFilterComponent;
