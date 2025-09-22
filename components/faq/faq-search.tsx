'use client';

import { SearchFilter } from '@/components/ui/search-filter';
import { FAQCategory, FAQ_SEARCH_CONFIG, type FAQItem } from '@/lib/faq-data';
import { extractCategories } from '@/lib/search-utils';

interface FAQSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: FAQCategory | 'all';
  onCategoryChange: (category: FAQCategory | 'all') => void;
  resultsCount?: number;
  totalCount?: number;
  faqData: FAQItem[];
}

export function FAQSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  resultsCount = 0,
  totalCount,
  faqData,
}: FAQSearchProps) {
  // Extract available categories from FAQ data
  const availableCategories = extractCategories(faqData, 'categories');

  // Convert category change handler to work with string types
  const handleCategoryChange = (category: string | 'all') => {
    if (category === 'all') {
      onCategoryChange('all');
    } else {
      onCategoryChange(category as FAQCategory);
    }
  };

  return (
    <SearchFilter<FAQItem>
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
      availableCategories={availableCategories}
      resultsCount={resultsCount}
      totalCount={totalCount}
      searchConfig={FAQ_SEARCH_CONFIG}
    />
  );
}
