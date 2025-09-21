import { ThemedStatCard } from '@/components/ui/themed-stat-card';
import { TASKS_MOCK_DATA, CONTENT_HUB_CONFIG } from '@/lib/content-hub-constants';

/**
 * Tasks tab content component
 * Used by: Content hub main page
 */
export function TasksTabContent() {
  return (
    <div className="space-y-8">
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        aria-label="Task collection statistics"
      >
        <ThemedStatCard
          value={TASKS_MOCK_DATA.totalTasks.toString()}
          label="Available Tasks"
          variant="gradient"
          className="group hover:scale-105 transition-transform duration-200"
        />
        <ThemedStatCard
          value={TASKS_MOCK_DATA.categories.length.toString()}
          label="Task Categories"
          variant="accent"
          className="group hover:scale-105 transition-transform duration-200"
        />
        <ThemedStatCard
          value={CONTENT_HUB_CONFIG.kubeRocketAICoreTasks.toString()}
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
    </div>
  );
}
