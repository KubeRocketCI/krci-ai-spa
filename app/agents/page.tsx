'use client';

/**
 * Content hub page - refactored architecture
 */

import { Bot, Zap, Database, Package } from 'lucide-react';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import {
  ThemedTabs,
  ThemedTabsList,
  ThemedTabsTrigger,
  ThemedTabsContent,
} from '@/components/ui/themed-tabs';
import { useContentHubData } from '@/hooks/use-content-hub-data';
import { useUnifiedSearch } from '@/hooks/use-unified-search';
import { AgentsTabContent } from '@/components/content-hub/agents-tab-content';
import { TemplatesTabContent } from '@/components/content-hub/templates-tab-content';
import { TasksTabContent } from '@/components/content-hub/tasks-tab-content';
import { DataTabContent } from '@/components/content-hub/data-tab-content';

export default function AgentsPage() {
  // Data management via centralized hook
  const contentHubData = useContentHubData();

  // Unified search state management
  const unifiedSearch = useUnifiedSearch();

  return (
    <div className="min-h-screen">
      <SharedHeader currentPage="agents" />
      <main className="container mx-auto px-4 py-8 relative z-10 scroll-smooth">
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
            className="grid w-full grid-cols-4 mb-8 max-w-2xl mx-auto isolate"
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
            <ThemedTabsTrigger value="templates" className="flex items-center gap-2">
              <Package size={18} />
              Templates
            </ThemedTabsTrigger>
            <ThemedTabsTrigger value="data" className="flex items-center gap-2">
              <Database size={18} />
              Data
            </ThemedTabsTrigger>
          </ThemedTabsList>

          {/* Agents Tab */}
          <ThemedTabsContent value="agents" className="focus:outline-none">
            <AgentsTabContent
              agentsData={contentHubData.agents}
              searchQuery={unifiedSearch.searchQuery}
              onSearchChange={unifiedSearch.handleSearchChange}
            />
          </ThemedTabsContent>

          {/* Templates Tab */}
          <ThemedTabsContent value="templates" className="focus:outline-none">
            <TemplatesTabContent
              templatesResult={contentHubData.templates}
              searchQuery={unifiedSearch.searchQuery}
              onSearchChange={unifiedSearch.handleSearchChange}
            />
          </ThemedTabsContent>

          {/* Tasks Tab */}
          <ThemedTabsContent value="tasks" className="focus:outline-none">
            <TasksTabContent
              tasksResult={contentHubData.tasks}
              searchQuery={unifiedSearch.searchQuery}
              onSearchChange={unifiedSearch.handleSearchChange}
            />
          </ThemedTabsContent>

          {/* Data Tab */}
          <ThemedTabsContent value="data" className="focus:outline-none">
            <DataTabContent
              dataFilesResult={contentHubData.dataFiles}
              searchQuery={unifiedSearch.searchQuery}
              onSearchChange={unifiedSearch.handleSearchChange}
            />
          </ThemedTabsContent>
        </ThemedTabs>
      </main>
      <SharedFooter />
    </div>
  );
}
