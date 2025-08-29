'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { ThemedButton } from '@/components/ui/themed-button';
import { FAQCategory, FAQ_CATEGORY_LABELS } from '@/lib/faq-data';
import {
  ThemedFAQSearchContainer,
  ThemedFAQSearchInput,
  ThemedFAQSearchField,
  ThemedFAQCategoryContainer,
  ThemedFAQCategoryButton,
  ThemedFAQResultsCount,
} from '@/components/ui/themed-faq-search';

interface FAQSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: FAQCategory | 'all';
  onCategoryChange: (category: FAQCategory | 'all') => void;
  resultsCount?: number;
}

export function FAQSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  resultsCount = 0,
}: FAQSearchProps) {
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

  const clearSearch = () => {
    setLocalQuery('');
    onSearchChange('');
    onCategoryChange('all');
    searchInputRef.current?.focus();
  };

  const hasActiveFilters = localQuery.trim() !== '' || selectedCategory !== 'all';
  const categories = Object.entries(FAQ_CATEGORY_LABELS) as [FAQCategory, string][];

  return (
    <ThemedFAQSearchContainer>
      {/* Simple Search Input */}
      <ThemedFAQSearchInput>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-600 dark:text-slate-400" />
        <ThemedFAQSearchField
          ref={searchInputRef}
          type="text"
          placeholder="Search questions..."
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {hasActiveFilters && (
          <ThemedButton
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </ThemedButton>
        )}
      </ThemedFAQSearchInput>

      {/* Simple Category Filter */}
      <ThemedFAQCategoryContainer>
        <ThemedFAQCategoryButton
          onClick={() => onCategoryChange('all')}
          isActive={selectedCategory === 'all'}
        >
          All
        </ThemedFAQCategoryButton>
        {categories.map(([category, label]) => (
          <ThemedFAQCategoryButton
            key={category}
            onClick={() => onCategoryChange(category)}
            isActive={selectedCategory === category}
          >
            {label}
          </ThemedFAQCategoryButton>
        ))}
      </ThemedFAQCategoryContainer>

      {/* Results count */}
      {hasActiveFilters && (
        <ThemedFAQResultsCount>
          {resultsCount} result{resultsCount !== 1 ? 's' : ''}
        </ThemedFAQResultsCount>
      )}
    </ThemedFAQSearchContainer>
  );
}
