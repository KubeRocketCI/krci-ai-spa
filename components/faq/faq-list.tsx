'use client';

import { FAQItem } from '@/lib/faq-data';
import { FAQItemComponent } from './faq-item';

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
      <div className="py-12 text-center">
        <p className="text-slate-400 mb-4">
          {searchQuery ? (
            <>No questions found for &ldquo;{searchQuery}&rdquo;</>
          ) : (
            <>No questions available.</>
          )}
        </p>
        {searchQuery && (
          <p className="text-sm text-slate-500">Try different keywords or browse all categories.</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
      {faqs.map(faq => (
        <FAQItemComponent
          key={faq.id}
          faq={faq}
          searchQuery={searchQuery}
          isExpanded={expandedIds?.has(faq.id) || false}
          onToggleExpanded={onToggleExpanded ? () => onToggleExpanded(faq.id) : undefined}
        />
      ))}
    </div>
  );
}
