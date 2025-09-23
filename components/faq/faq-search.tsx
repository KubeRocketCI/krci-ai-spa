'use client';

import { SearchFilter } from '@/components/ui/search-filter';
import { FAQCategory, FAQ_SEARCH_CONFIG, type FAQItem } from '@/lib/faq-data';
import { extractCategories } from '@/lib/search-utils';
import { CATEGORY_ALL_VALUE } from '@/lib/constants';

interface FAQSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: FAQCategory | typeof CATEGORY_ALL_VALUE;
  onCategoryChange: (category: FAQCategory | typeof CATEGORY_ALL_VALUE) => void;
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
  const handleCategoryChange = (category: string | typeof CATEGORY_ALL_VALUE) => {
    if (category === CATEGORY_ALL_VALUE) {
      onCategoryChange(CATEGORY_ALL_VALUE);
    } else {
      onCategoryChange(category as FAQCategory);
    }
  };

  return (
    <SearchFilter
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
