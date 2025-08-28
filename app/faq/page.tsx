'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { FAQSearch } from '@/components/faq/faq-search';
import { FAQList } from '@/components/faq/faq-list';
import { CollapseAllButton, CollapseAllButtonMobile } from '@/components/faq/collapse-all-button';
import { JsonLd } from '@/app/components/JsonLd';
import { FAQ_DATA, FAQCategory, getFAQsByCategory } from '@/lib/faq-data';
import { generateFAQSchema, getFAQMetaTags, getFAQBreadcrumbSchema } from '@/lib/faq-schema';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'all'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let faqs = FAQ_DATA;

    // Apply category filter
    if (selectedCategory !== 'all') {
      faqs = getFAQsByCategory(selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      faqs = faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    return faqs;
  }, [searchQuery, selectedCategory]);

  // Handlers for expand/collapse functionality
  const toggleFAQExpanded = (faqId: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  // Generate structured data for all FAQs (for rich results)
  const faqSchema = generateFAQSchema(FAQ_DATA);
  const breadcrumbSchema = getFAQBreadcrumbSchema();
  const metaTags = getFAQMetaTags();

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <meta property="og:title" content={metaTags.openGraph.title} />
        <meta property="og:description" content={metaTags.openGraph.description} />
        <meta property="og:type" content={metaTags.openGraph.type} />
        <meta property="og:url" content={metaTags.openGraph.url} />
        <meta name="twitter:card" content={metaTags.twitter.card} />
        <meta name="twitter:title" content={metaTags.twitter.title} />
        <meta name="twitter:description" content={metaTags.twitter.description} />
        <link rel="canonical" href="https://krci-ai.kuberocketci.io/faq" />
      </Head>

      {/* JSON-LD Structured Data for Google Rich Results */}
      <JsonLd>{faqSchema}</JsonLd>
      <JsonLd>{breadcrumbSchema}</JsonLd>

      <div className="min-h-screen bg-black text-slate-200 font-sans">
        <SharedHeader currentPage="faq" />

        {/* Clean Header */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl font-bold text-slate-200 mb-2">Frequently asked questions</h1>
            <p className="text-slate-400">
              Find answers to common questions about installation, implementation, and usage.
            </p>
          </div>
        </section>

        {/* Main FAQ Content */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Simple Search */}
            <div className="mb-8">
              <FAQSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                resultsCount={filteredFAQs.length}
              />
            </div>

            {/* Collapse All - Mobile Version */}
            <div className="block md:hidden">
              <CollapseAllButtonMobile
                onCollapseAll={collapseAll}
                expandedCount={expandedIds.size}
                isVisible={expandedIds.size > 0}
              />
            </div>

            {/* Two Column FAQ List */}
            <FAQList
              faqs={filteredFAQs}
              searchQuery={searchQuery}
              showNoResults={true}
              expandedIds={expandedIds}
              onToggleExpanded={toggleFAQExpanded}
            />

            {/* Collapse All - Desktop Version (Fixed Position) */}
            <div className="hidden md:block">
              <CollapseAllButton
                onCollapseAll={collapseAll}
                expandedCount={expandedIds.size}
                isVisible={expandedIds.size > 0}
              />
            </div>
          </div>
        </section>

        {/* Simple Help Section */}
        <section className="py-8 px-4 border-t border-slate-700/30 bg-slate-900/10">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-slate-400 mb-4">
              Still have questions? Check the{' '}
              <Link href="/quickstart" className="text-cyan-400 hover:text-cyan-300 underline">
                Quick Start Guide
              </Link>{' '}
              or visit our{' '}
              <a
                href="https://github.com/KubeRocketCI/kuberocketai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                documentation
              </a>
              . Need fast feedback?{' '}
              <a
                href="https://t.me/kuberocketai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Join Telegram
              </a>
              .
            </p>
          </div>
        </section>

        {/* Footer */}
        <SharedFooter />
      </div>
    </>
  );
}
