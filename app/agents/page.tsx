'use client';

import { useState, useMemo, useCallback } from 'react';
import { getAgents, getFallbackWhenToUse } from '@/lib/agents';
import { AgentsFilter, type AgentSpecialization } from '@/components/agents/agents-filter';
import { AgentCard } from '@/components/agents/agent-card';
import { getAgentCardClasses } from '@/lib/agents-design-tokens';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { ThemedStatCard } from '@/components/ui/themed-stat-card';
import {
  ThemedTabs,
  ThemedTabsList,
  ThemedTabsTrigger,
  ThemedTabsContent,
} from '@/components/ui/themed-tabs';
import { Bot, Zap, Database, Package } from 'lucide-react';

export default function AgentsPage() {
  // Filter state - must be called before any conditional returns
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<AgentSpecialization | 'all'>(
    'all',
  );

  // Memoized handlers to prevent unnecessary re-renders
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSpecializationChange = useCallback((specialization: AgentSpecialization | 'all') => {
    setSelectedSpecialization(specialization);
  }, []);

  // Get real agent data from our JSON file with error handling
  const agentsData = useMemo(() => {
    try {
      return getAgents();
    } catch (error) {
      console.error('Failed to load agents data:', error);
      return null;
    }
  }, []);

  // Real data from krci-input/.krci-ai structure
  const tasksData = useMemo(
    () => ({
      metadata: {
        totalTasks: 73, // 65 general + 8 krci-ai specific
        generalTasks: 57,
        krciTasks: 8,
        categories: [
          'Project Management',
          'Development',
          'Testing',
          'Documentation',
          'Architecture',
          'KubeRocketAI Core',
        ],
      },
    }),
    [],
  );

  const dataFiles = useMemo(
    () => ({
      metadata: {
        totalFiles: 19, // 16 general + 3 krci-ai specific
        generalFiles: 16,
        krciFiles: 3,
        types: ['Markdown', 'YAML', 'Standards', 'Methodologies'],
      },
    }),
    [],
  );

  const templatesData = useMemo(
    () => ({
      metadata: {
        totalTemplates: 34, // 30 general + 4 krci-ai specific
        generalTemplates: 30,
        krciTemplates: 4,
        types: ['Project Templates', 'Documentation', 'Reports', 'YAML Configs'],
      },
    }),
    [],
  );

  const cardClasses = getAgentCardClasses();

  // Process agents to include whenToUse descriptions (manual field + fallback) - memoized
  const processedAgents = useMemo(() => {
    if (!agentsData) return [];

    return agentsData.agents.map(agent => ({
      ...agent,
      whenToUse: agent.whenToUse || getFallbackWhenToUse(agent),
    }));
  }, [agentsData]);

  // Filter agents based on search and specialization with error handling
  const filteredAgents = useMemo(() => {
    try {
      let filtered = processedAgents;

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(agent => {
          try {
            return (
              (agent.name && agent.name.toLowerCase().includes(query)) ||
              (agent.role && agent.role.toLowerCase().includes(query)) ||
              (agent.description && agent.description.toLowerCase().includes(query)) ||
              (agent.goal && agent.goal.toLowerCase().includes(query)) ||
              (agent.whenToUse && agent.whenToUse.toLowerCase().includes(query))
            );
          } catch (error) {
            console.warn('Error filtering agent:', agent.id, error);
            return false;
          }
        });
      }

      // Filter by specialization
      if (selectedSpecialization !== 'all') {
        filtered = filtered.filter(agent => {
          try {
            return (
              agent.specializations &&
              Array.isArray(agent.specializations) &&
              agent.specializations.includes(selectedSpecialization)
            );
          } catch (error) {
            console.warn('Error filtering agent by specialization:', agent.id, error);
            return false;
          }
        });
      }

      return filtered;
    } catch (error) {
      console.error('Error filtering agents:', error);
      return [];
    }
  }, [processedAgents, searchQuery, selectedSpecialization]);

  // Return error state if data loading fails
  if (!agentsData) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-slate-500 dark:text-slate-400">
            <p className="text-lg font-medium mb-2">Failed to load agents</p>
            <p className="text-sm">Please try refreshing the page</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <SharedHeader currentPage="agents" />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold font-mono mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            KubeRocketAI Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore agents, tasks, data, and templates that power the KubeRocketAI framework.
          </p>
        </header>

        {/* Tabbed Interface */}
        <ThemedTabs defaultValue="agents" className="w-full">
          <ThemedTabsList
            className="grid w-full grid-cols-4 mb-8 max-w-2xl mx-auto"
            variant="minimal"
          >
            <ThemedTabsTrigger value="agents" className="flex items-center gap-2">
              <Bot size={18} />
              Agents
            </ThemedTabsTrigger>
            <ThemedTabsTrigger value="tasks" className="flex items-center gap-2">
              <Zap size={18} />
              Tasks
            </ThemedTabsTrigger>
            <ThemedTabsTrigger value="data" className="flex items-center gap-2">
              <Database size={18} />
              Data
            </ThemedTabsTrigger>
            <ThemedTabsTrigger value="templates" className="flex items-center gap-2">
              <Package size={18} />
              Templates
            </ThemedTabsTrigger>
          </ThemedTabsList>

          {/* Agents Tab */}
          <ThemedTabsContent value="agents" className="space-y-8">
            <section className="mb-8" aria-label="Filter and search agents">
              <AgentsFilter
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
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
          </ThemedTabsContent>

          {/* Tasks Tab */}
          <ThemedTabsContent value="tasks" className="space-y-8">
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
              aria-label="Task collection statistics"
            >
              <ThemedStatCard
                value={tasksData.metadata.totalTasks.toString()}
                label="Available Tasks"
                variant="gradient"
                className="group hover:scale-105 transition-transform duration-200"
              />
              <ThemedStatCard
                value={tasksData.metadata.categories.length.toString()}
                label="Task Categories"
                variant="accent"
                className="group hover:scale-105 transition-transform duration-200"
              />
              <ThemedStatCard
                value={tasksData.metadata.krciTasks.toString()}
                label="KubeRocketAI Core"
                variant="simple"
                className="group hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="text-center py-12">
              <div className="text-slate-500 dark:text-slate-400">
                <p className="text-lg font-medium mb-2">Task content coming soon</p>
                <p className="text-sm">
                  We&apos;re working on populating this section with detailed task information
                </p>
              </div>
            </div>
          </ThemedTabsContent>

          {/* Data Tab */}
          <ThemedTabsContent value="data" className="space-y-8">
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
              aria-label="Data files statistics"
            >
              <ThemedStatCard
                value={dataFiles.metadata.totalFiles.toString()}
                label="Data Files"
                variant="gradient"
                className="group hover:scale-105 transition-transform duration-200"
              />
              <ThemedStatCard
                value={dataFiles.metadata.types.length.toString()}
                label="File Types"
                variant="accent"
                className="group hover:scale-105 transition-transform duration-200"
              />
              <ThemedStatCard
                value={dataFiles.metadata.krciFiles.toString()}
                label="KubeRocketAI Core"
                variant="simple"
                className="group hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="text-center py-12">
              <div className="text-slate-500 dark:text-slate-400">
                <p className="text-lg font-medium mb-2">Data content coming soon</p>
                <p className="text-sm">
                  We&apos;re working on populating this section with detailed data information
                </p>
              </div>
            </div>
          </ThemedTabsContent>

          {/* Templates Tab */}
          <ThemedTabsContent value="templates" className="space-y-8">
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
              aria-label="Template collection statistics"
            >
              <ThemedStatCard
                value={templatesData.metadata.totalTemplates.toString()}
                label="Templates"
                variant="gradient"
                className="group hover:scale-105 transition-transform duration-200"
              />
              <ThemedStatCard
                value={templatesData.metadata.types.length.toString()}
                label="Template Types"
                variant="accent"
                className="group hover:scale-105 transition-transform duration-200"
              />
              <ThemedStatCard
                value={templatesData.metadata.krciTemplates.toString()}
                label="KubeRocketAI Core"
                variant="simple"
                className="group hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="text-center py-12">
              <div className="text-slate-500 dark:text-slate-400">
                <p className="text-lg font-medium mb-2">Template content coming soon</p>
                <p className="text-sm">
                  We&apos;re working on populating this section with detailed template information
                </p>
              </div>
            </div>
          </ThemedTabsContent>
        </ThemedTabs>
      </main>
      <SharedFooter />
    </>
  );
}
