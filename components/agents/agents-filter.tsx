'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Search, X } from 'lucide-react';
import { ThemedButton } from '@/components/ui/themed-button';
import {
  ThemedFAQSearchContainer,
  ThemedFAQSearchInput,
  ThemedFAQSearchField,
  ThemedFAQCategoryContainer,
  ThemedFAQCategoryButton,
  ThemedFAQResultsCount,
} from '@/components/ui/themed-faq-search';

export type AgentSpecialization = string;

interface AgentsFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSpecialization: AgentSpecialization | 'all';
  onSpecializationChange: (specialization: AgentSpecialization | 'all') => void;
  resultsCount?: number;
  availableSpecializations: string[];
}

export const AgentsFilter = memo(function AgentsFilter({
  searchQuery,
  onSearchChange,
  selectedSpecialization,
  onSpecializationChange,
  resultsCount = 0,
  availableSpecializations,
}: AgentsFilterProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, onSearchChange]);

  // Keyboard shortcut (Ctrl/Cmd + K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && isFocused) {
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  const clearFilters = useCallback(() => {
    setLocalQuery('');
    onSearchChange('');
    onSpecializationChange('all');
    searchInputRef.current?.focus();
  }, [onSearchChange, onSpecializationChange]);

  const hasActiveFilters = localQuery.trim() !== '' || selectedSpecialization !== 'all';

  return (
    <ThemedFAQSearchContainer>
      {/* Search Input */}
      <ThemedFAQSearchInput>
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-600 dark:text-slate-400"
          aria-hidden="true"
        />
        <ThemedFAQSearchField
          ref={searchInputRef}
          type="text"
          placeholder="Search agents..."
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search agents by name, role, description, or specialization"
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
      </ThemedFAQSearchInput>

      {/* Specialization Filter */}
      <div role="group" aria-label="Filter agents by specialization">
        <ThemedFAQCategoryContainer>
          <ThemedFAQCategoryButton
            onClick={() => onSpecializationChange('all')}
            isActive={selectedSpecialization === 'all'}
          >
            All Agents
          </ThemedFAQCategoryButton>
          {availableSpecializations.map(specialization => (
            <ThemedFAQCategoryButton
              key={specialization}
              onClick={() => onSpecializationChange(specialization as AgentSpecialization)}
              isActive={selectedSpecialization === specialization}
            >
              {specialization}
            </ThemedFAQCategoryButton>
          ))}
        </ThemedFAQCategoryContainer>
      </div>

      {/* Results count */}
      {hasActiveFilters && (
        <div
          role="status"
          aria-live="polite"
          aria-label={`Showing ${resultsCount} agent${resultsCount !== 1 ? 's' : ''} matching your criteria`}
        >
          <ThemedFAQResultsCount>
            {resultsCount} agent{resultsCount !== 1 ? 's' : ''}
          </ThemedFAQResultsCount>
        </div>
      )}

      {/* Hidden keyboard shortcut hint for screen readers */}
      <div id="search-shortcut" className="sr-only">
        Press Ctrl+K or Cmd+K to focus search, Escape to clear focus
      </div>
    </ThemedFAQSearchContainer>
  );
});
