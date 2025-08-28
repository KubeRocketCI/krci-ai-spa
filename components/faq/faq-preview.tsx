'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getTopFAQs, FAQItem } from '@/lib/faq-data';
import { FAQItemComponent } from './faq-item';

interface FAQPreviewProps {
  count?: number;
  faqs?: FAQItem[];
}

export function FAQPreview({ count = 4, faqs }: FAQPreviewProps) {
  const topFAQs = faqs || getTopFAQs(count);

  return (
    <section className="py-16 px-4 bg-gray-900/10">
      <div className="container mx-auto max-w-6xl">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-400">Frequently Asked Questions</h2>
        </div>

        {/* Two-column FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {topFAQs.map(faq => (
            <FAQItemComponent key={faq.id} faq={faq} />
          ))}
        </div>

        {/* Simplified View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 bg-transparent px-8"
            asChild
          >
            <Link href="/faq">View All FAQ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
