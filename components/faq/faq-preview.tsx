'use client';

import Link from 'next/link';
import { getTopFAQs } from '@/lib/faq-data';
import type { FAQItem } from '@/lib/faq-data';
import { FAQItemComponent } from './faq-item';
import { ThemedFAQSection } from '@/components/ui/themed-faq-section';
import { ThemedButton } from '@/components/ui/themed-button';

interface FAQPreviewProps {
  count?: number;
  faqs?: FAQItem[];
}

export function FAQPreview({ count = 4, faqs }: FAQPreviewProps) {
  const topFAQs = faqs || getTopFAQs(count);

  return (
    <ThemedFAQSection variant="preview">
      <div className="container mx-auto max-w-6xl">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Two-column FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {topFAQs.map(faq => (
            <FAQItemComponent key={faq.id} faq={faq} />
          ))}
        </div>

        {/* Simplified View All Button */}
        <div className="text-center">
          <ThemedButton variant="outline" size="lg" className="px-8" asChild>
            <Link href="/faq">View All FAQ</Link>
          </ThemedButton>
        </div>
      </div>
    </ThemedFAQSection>
  );
}
