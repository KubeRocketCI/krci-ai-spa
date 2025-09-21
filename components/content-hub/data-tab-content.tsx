import { ThemedStatCard } from '@/components/ui/themed-stat-card';
import { DATA_FILES_MOCK_DATA, CONTENT_HUB_CONFIG } from '@/lib/content-hub-constants';

/**
 * Data tab content component
 * Used by: Content hub main page
 */
export function DataTabContent() {
  return (
    <div className="space-y-8">
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        aria-label="Data files statistics"
      >
        <ThemedStatCard
          value={DATA_FILES_MOCK_DATA.totalFiles.toString()}
          label="Data Files"
          variant="gradient"
          className="group hover:scale-105 transition-transform duration-200"
        />
        <ThemedStatCard
          value={DATA_FILES_MOCK_DATA.types.length.toString()}
          label="File Types"
          variant="accent"
          className="group hover:scale-105 transition-transform duration-200"
        />
        <ThemedStatCard
          value={CONTENT_HUB_CONFIG.kubeRocketAICoreDataFiles.toString()}
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
    </div>
  );
}
