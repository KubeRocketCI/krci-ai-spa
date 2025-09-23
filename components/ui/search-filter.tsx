'use client';

/**
 * Enhanced Unified Search Filter Component
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
import type { SearchFilterProps } from '@/lib/search-types';
import { CATEGORY_ALL_VALUE } from '@/lib/constants';

/**
 * Enhanced search filter component supporting both legacy and new content systems
 */
function SearchFilterComponent({
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
  error = null,
  showAdvancedOptions = false,
}: SearchFilterProps) {
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
    onCategoryChange(CATEGORY_ALL_VALUE);
    searchInputRef.current?.focus();
  }, [onSearchChange, onCategoryChange]);

  // Keyboard shortcuts management using custom hook
  useSearchKeyboard(searchInputRef, {
    isFocused,
    onClearFilters: clearFilters,
  });

  const hasActiveFilters = localQuery.trim() !== '' || selectedCategory !== CATEGORY_ALL_VALUE;
  const minQueryLength = searchConfig.minQueryLength || 0;
  const shouldShowResults = localQuery.length >= minQueryLength;

  return (
    <ThemedSearchContainer className={className}>
      {/* Error Display */}
      {error && (
        <div
          role="alert"
          className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
        >
          <p className="text-sm text-red-700 dark:text-red-300">
            <strong>Search Error:</strong> {error}
          </p>
        </div>
      )}

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
          aria-describedby="search-shortcut search-help"
          aria-invalid={!!error}
          disabled={isLoading}
          minLength={minQueryLength}
        />
        {hasActiveFilters && !isLoading && (
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
              onClick={() => onCategoryChange(CATEGORY_ALL_VALUE)}
              isActive={selectedCategory === CATEGORY_ALL_VALUE}
            >
              All
            </ThemedCategoryButton>
            {[...availableCategories].sort().map(category => (
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

      {/* Search Help Text */}
      {minQueryLength > 0 && localQuery.length > 0 && localQuery.length < minQueryLength && (
        <div id="search-help" className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Type at least {minQueryLength} characters to search
        </div>
      )}

      {/* Results count or loading state */}
      {isLoading && hasActiveFilters && shouldShowResults && (
        <div role="status" aria-live="polite" aria-label="Searching...">
          <ThemedSearchLoading />
        </div>
      )}

      {!isLoading && hasActiveFilters && shouldShowResults && !error && (
        <div
          role="status"
          aria-live="polite"
          aria-label={`Showing ${resultsCount} ${totalCount ? `of ${totalCount}` : ''} result${resultsCount !== 1 ? 's' : ''} matching your criteria`}
        >
          <ThemedResultsCount isLoading={isLoading}>
            {resultsCount} {totalCount ? `of ${totalCount}` : ''} result
            {resultsCount !== 1 ? 's' : ''}
            {searchConfig.maxResults && resultsCount >= searchConfig.maxResults && (
              <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                (showing first {searchConfig.maxResults})
              </span>
            )}
          </ThemedResultsCount>
        </div>
      )}

      {/* No results message */}
      {!isLoading && !error && hasActiveFilters && shouldShowResults && resultsCount === 0 && (
        <div
          role="status"
          className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No results found for &ldquo;{localQuery}&rdquo;
            {selectedCategory !== CATEGORY_ALL_VALUE && ` in ${selectedCategory} category`}.
            <br />
            <span className="text-xs">Try adjusting your search terms or clearing filters.</span>
          </p>
        </div>
      )}

      {/* Advanced Options (if enabled) */}
      {showAdvancedOptions && (
        <details className="mt-4">
          <summary className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">
            Advanced Search Options
          </summary>
          <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Search across: {searchConfig.searchFields.join(', ')}
              {searchConfig.fuzzySearch && ' • Fuzzy search enabled'}
              {searchConfig.enableAnalytics && ' • Analytics enabled'}
            </p>
          </div>
        </details>
      )}

      {/* Hidden accessibility helpers */}
      <div id="search-shortcut" className="sr-only">
        Press Ctrl+K or Cmd+K to focus search, Escape to clear focus
      </div>

      {/* Screen reader announcements for search completion */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {hasActiveFilters && shouldShowResults && !isLoading && (
          <span>
            Search completed. {resultsCount} {totalCount ? `of ${totalCount}` : ''} results found
            {selectedCategory !== CATEGORY_ALL_VALUE && ` in ${selectedCategory} category`}
            {searchQuery.trim() && ` for "${searchQuery}"`}.{error && ` Error: ${error}`}
          </span>
        )}
      </div>
    </ThemedSearchContainer>
  );
}

// Memoized export - performance optimization
export const SearchFilter = memo(SearchFilterComponent) as typeof SearchFilterComponent;
