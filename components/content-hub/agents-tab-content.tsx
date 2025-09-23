import { useState, useMemo, useCallback } from 'react';
import { SearchFilter } from '@/components/ui/search-filter';
import { AgentCard } from '@/components/agents/agent-card';
import { getAgentCardClasses } from '@/lib/agents-design-tokens';
import { CategoryManager } from '@/lib/category-management';
import { CATEGORY_ALL_VALUE } from '@/lib/constants';
import { AGENT_SEARCH_CONFIG } from '@/lib/search-configs';
import type { AgentsData } from '@/lib/agents';

interface AgentsTabContentProps {
  agentsData: AgentsData | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * Enhanced Agents tab content component
 */
export function AgentsTabContent({
  agentsData,
  searchQuery,
  onSearchChange,
}: AgentsTabContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORY_ALL_VALUE);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Process agents - data is complete, no processing needed
  const processedAgents = useMemo(() => {
    if (!agentsData) return [];
    return agentsData.agents;
  }, [agentsData]);

  // Filter agents using enhanced CategoryManager
  const filteredAgents = useMemo(() => {
    let filtered = processedAgents;

    // Apply text search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(agent => {
        // Search across agent-specific fields
        const searchableFields = ['name', 'role', 'description', 'goal', 'whenToUse'] as const;
        return searchableFields.some(field => {
          const value = agent[field];
          return value && typeof value === 'string' && value.toLowerCase().includes(query);
        });
      });
    }

    // Apply category filter using CategoryManager
    filtered = CategoryManager.filterByCategory(filtered, selectedCategory);

    return filtered;
  }, [processedAgents, searchQuery, selectedCategory]);

  // Get available categories from metadata (pre-computed)
  const availableCategories = useMemo(() => {
    return agentsData?.metadata.categories || [];
  }, [agentsData?.metadata.categories]);

  const cardClasses = getAgentCardClasses();

  // Handle critical error: agents failed to load (required for tab to function)
  if (!agentsData) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 dark:text-red-400">
          <p className="text-lg font-medium mb-2">Failed to load agents</p>
          <p className="text-sm">Unable to load agent data. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="mb-8" aria-label="Filter and search agents">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          availableCategories={availableCategories}
          resultsCount={filteredAgents.length}
          totalCount={processedAgents.length}
          searchConfig={AGENT_SEARCH_CONFIG}
          isLoading={false}
          error={null}
        />
      </section>

      <section aria-label="Available AI agents">
        {filteredAgents.length > 0 ? (
          <div
            className={`grid ${cardClasses.grid}`}
            role="grid"
            aria-label={`${filteredAgents.length} AI agents`}
          >
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" role="status">
            <div className="text-slate-500 dark:text-slate-400">
              <p className="text-lg font-medium mb-2">No agents found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
