'use client';

import type { FAQItem } from '@/lib/faq-data';
import { FAQItemComponent } from './faq-item';
import { ThemedNoResults } from '@/components/ui/themed-search';

interface FAQListProps {
  faqs: FAQItem[];
  showNoResults?: boolean;
  searchQuery?: string;
  expandedIds?: Set<string>;
  onToggleExpanded?: (faqId: string) => void;
}

export function FAQList({
  faqs,
  showNoResults = true,
  searchQuery,
  expandedIds,
  onToggleExpanded,
}: FAQListProps) {
  if (faqs.length === 0 && showNoResults) {
    return (
      <ThemedNoResults>
        {searchQuery ? (
          <>No questions found for &ldquo;{searchQuery}&rdquo;</>
        ) : (
          <>No questions available.</>
        )}
        {searchQuery && (
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Try different keywords or browse all categories.
          </p>
        )}
      </ThemedNoResults>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
      {faqs.map(faq => (
        <FAQItemComponent
          key={faq.id}
          faq={faq}
          {...(searchQuery !== undefined ? { searchQuery } : {})}
          isExpanded={expandedIds?.has(faq.id) || false}
          {...(onToggleExpanded ? { onToggleExpanded: () => onToggleExpanded(faq.id) } : {})}
        />
      ))}
    </div>
  );
}
