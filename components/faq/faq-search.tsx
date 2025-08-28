'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FAQCategory, FAQ_CATEGORY_LABELS } from '@/lib/faq-data';

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
    <div className="space-y-4">
      {/* Simple Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search questions..."
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-10 pr-10 py-2 bg-black border border-slate-700 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
        />
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Simple Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            selectedCategory === 'all'
              ? 'bg-slate-700 text-slate-200'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          All
        </button>
        {categories.map(([category, label]) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              selectedCategory === category
                ? 'bg-slate-700 text-slate-200'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results count */}
      {hasActiveFilters && (
        <div className="text-sm text-slate-500">
          {resultsCount} result{resultsCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
