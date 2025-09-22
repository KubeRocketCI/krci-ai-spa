import { useState, useMemo, useCallback } from 'react';
import { AgentsFilter, type AgentSpecialization } from '@/components/agents/agents-filter';
import { AgentCard } from '@/components/agents/agent-card';
import { getAgentCardClasses } from '@/lib/agents-design-tokens';
import { filterItems } from '@/lib/search-utils';
import type { AgentsData, Agent } from '@/lib/agents';

interface AgentsTabContentProps {
  agentsData: AgentsData | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

// Agent search configuration - moved outside component to avoid re-creation
const agentSearchConfig = {
  searchFields: ['name', 'role', 'description', 'goal', 'whenToUse'] as (keyof Agent)[],
  categoryField: 'specializations' as keyof Agent,
};

/**
 * Agents tab content component
 * Used by: Content hub main page
 */
export function AgentsTabContent({
  agentsData,
  searchQuery,
  onSearchChange,
}: AgentsTabContentProps) {
  const [selectedSpecialization, setSelectedSpecialization] = useState<AgentSpecialization | 'all'>(
    'all',
  );

  const handleSpecializationChange = useCallback((specialization: AgentSpecialization | 'all') => {
    setSelectedSpecialization(specialization);
  }, []);

  // Process agents - data is complete, no processing needed
  const processedAgents = useMemo(() => {
    if (!agentsData) return [];
    return agentsData.agents;
  }, [agentsData]);

  // Filter agents using unified search utilities
  const filteredAgents = useMemo(() => {
    return filterItems(processedAgents, searchQuery, selectedSpecialization, agentSearchConfig);
  }, [processedAgents, searchQuery, selectedSpecialization]);

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
        <AgentsFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedSpecialization={selectedSpecialization}
          onSpecializationChange={handleSpecializationChange}
          resultsCount={filteredAgents.length}
          availableSpecializations={agentsData.metadata.specializations}
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
