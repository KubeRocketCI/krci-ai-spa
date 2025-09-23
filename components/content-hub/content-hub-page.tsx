'use client';

/**
 * Generic content hub page component
 */

import { useState, useCallback } from 'react';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { ThemedStatCard } from '@/components/ui/themed-stat-card';
import {
  ThemedTabs,
  ThemedTabsList,
  ThemedTabsTrigger,
  ThemedTabsContent,
} from '@/components/ui/themed-tabs';
import { SearchFilter } from '@/components/ui/search-filter';
import { ContentGrid } from './content-grid';
import { useProcessedTabs } from '@/hooks/use-processed-tabs';
import { CONTENT_DESIGN_TOKENS } from '@/lib/content-design-tokens';
import type { BaseContentItem, ContentPageConfig, ContentCollection } from '@/lib/content-types';
import { CATEGORY_ALL_VALUE, type CategoryFilterValue } from '@/lib/constants';
import type { ReactNode } from 'react';

interface ContentTab<T extends BaseContentItem> {
  id: string;
  label: string;
  icon: ReactNode;
  data: ContentCollection<T> | null;
  config: ContentPageConfig;
  renderCard: (item: T) => ReactNode;
  loading?: boolean;
  error?: string | null;
}

interface ContentHubPageProps<T extends BaseContentItem> {
  title: string;
  description: string;
  currentPage: string;
  tabs: ContentTab<T>[];
  defaultTab?: string;
}

export function ContentHubPage<T extends BaseContentItem>({
  title,
  description,
  currentPage,
  tabs,
  defaultTab,
}: ContentHubPageProps<T>) {
  // Search and filter state - single responsibility
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Record<string, CategoryFilterValue>>(
    () => tabs.reduce((acc, tab) => ({ ...acc, [tab.id]: CATEGORY_ALL_VALUE }), {}),
  );

  // Memoized handlers - performance optimization
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback(
    (tabId: string) => (category: CategoryFilterValue) => {
      setSelectedCategories(prev => ({ ...prev, [tabId]: category }));
    },
    [],
  );

  // Process tab data using custom hook
  const processedTabs = useProcessedTabs(tabs, searchQuery, selectedCategories);

  return (
    <>
      <SharedHeader
        currentPage={
          currentPage as
            | 'home'
            | 'quickstart'
            | 'architecture'
            | 'agents'
            | 'use-cases'
            | 'faq'
            | 'roadmap'
        }
      />
      <main className={CONTENT_DESIGN_TOKENS.layout.page.container}>
        {/* Hero Section */}
        <header className={CONTENT_DESIGN_TOKENS.layout.hero.container}>
          <h1
            className={`${CONTENT_DESIGN_TOKENS.layout.hero.title} ${CONTENT_DESIGN_TOKENS.layout.hero.gradient}`}
          >
            {title}
          </h1>
          <p className={CONTENT_DESIGN_TOKENS.layout.hero.subtitle}>{description}</p>
        </header>

        {/* Tabbed Interface */}
        <ThemedTabs
          defaultValue={defaultTab || tabs[0]?.id}
          className={CONTENT_DESIGN_TOKENS.layout.tabs.container}
        >
          <ThemedTabsList className={CONTENT_DESIGN_TOKENS.layout.tabs.list} variant="minimal">
            {tabs.map(tab => (
              <ThemedTabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </ThemedTabsTrigger>
            ))}
          </ThemedTabsList>

          {processedTabs.map(tab => (
            <ThemedTabsContent
              key={tab.id}
              value={tab.id}
              className={CONTENT_DESIGN_TOKENS.layout.tabs.content}
            >
              {tab.loading ? (
                <div className="text-center py-12">
                  <div className="text-slate-500 dark:text-slate-400">
                    <p className="text-lg font-medium mb-2">Loading {tab.label.toLowerCase()}...</p>
                  </div>
                </div>
              ) : tab.error ? (
                <div className="text-center py-12">
                  <div className="text-red-500 dark:text-red-400">
                    <p className="text-lg font-medium mb-2">
                      Failed to load {tab.label.toLowerCase()}
                    </p>
                    <p className="text-sm">{tab.error}</p>
                  </div>
                </div>
              ) : tab.data?.items ? (
                <>
                  {/* Search and Filter */}
                  <section
                    className="mb-8"
                    aria-label={`Filter and search ${tab.label.toLowerCase()}`}
                  >
                    <SearchFilter
                      searchQuery={searchQuery}
                      onSearchChange={handleSearchChange}
                      selectedCategory={selectedCategories[tab.id] || CATEGORY_ALL_VALUE}
                      onCategoryChange={handleCategoryChange(tab.id)}
                      availableCategories={tab.availableCategories}
                      resultsCount={tab.filteredItems.length}
                      totalCount={tab.stats.total}
                      searchConfig={tab.config.searchConfig}
                    />
                  </section>

                  {/* Content Grid */}
                  <section aria-label={`Available ${tab.label.toLowerCase()}`}>
                    <ContentGrid
                      items={tab.filteredItems}
                      variant={tab.config.cardConfig.variant}
                      renderItem={tab.renderCard}
                      aria-label={`${tab.filteredItems.length} ${tab.label.toLowerCase()}`}
                    />
                  </section>
                </>
              ) : (
                /* Stats Only - Coming Soon State */
                <>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
                    aria-label={`${tab.label} statistics`}
                  >
                    <ThemedStatCard
                      value={tab.stats.total.toString()}
                      label={`Available ${tab.label}`}
                      variant="gradient"
                      className="group hover:scale-105 transition-transform duration-200"
                    />
                    <ThemedStatCard
                      value={tab.stats.categories.toString()}
                      label={`${tab.label} Categories`}
                      variant="accent"
                      className="group hover:scale-105 transition-transform duration-200"
                    />
                    <ThemedStatCard
                      value="0"
                      label="KubeRocketAI Core"
                      variant="simple"
                      className="group hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <div className="text-center py-12">
                    <div className="text-slate-500 dark:text-slate-400">
                      <p className="text-lg font-medium mb-2">{tab.label} content coming soon</p>
                      <p className="text-sm">
                        We&apos;re working on populating this section with detailed{' '}
                        {tab.label.toLowerCase()} information
                      </p>
                    </div>
                  </div>
                </>
              )}
            </ThemedTabsContent>
          ))}
        </ThemedTabs>
      </main>
      <SharedFooter />
    </>
  );
}
