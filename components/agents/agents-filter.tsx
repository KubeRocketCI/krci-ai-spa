'use client';

/**
 * Agent-specific search filter - thin wrapper around generic SearchFilter
 */

import { memo } from 'react';
import { SearchFilter } from '@/components/ui/search-filter';
import type { Agent } from '@/lib/agents';

export type AgentSpecialization = string;

interface AgentsFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSpecialization: AgentSpecialization | 'all';
  onSpecializationChange: (specialization: AgentSpecialization | 'all') => void;
  resultsCount?: number;
  availableSpecializations: string[];
}

export const AgentsFilter = memo(function AgentsFilter({
  searchQuery,
  onSearchChange,
  selectedSpecialization,
  onSpecializationChange,
  resultsCount = 0,
  availableSpecializations,
}: AgentsFilterProps) {
  // Agent search configuration - single place to define agent search behavior
  const agentSearchConfig = {
    searchFields: ['name', 'role', 'description', 'goal', 'whenToUse'] as (keyof Agent)[],
    categoryField: 'categories' as keyof Agent,
    placeholder: 'Search agents by name, role, description, or specialization...',
    debounceMs: 300,
  };

  return (
    <SearchFilter<Agent>
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      selectedCategory={selectedSpecialization}
      onCategoryChange={onSpecializationChange}
      availableCategories={availableSpecializations}
      resultsCount={resultsCount}
      searchConfig={agentSearchConfig}
    />
  );
});
