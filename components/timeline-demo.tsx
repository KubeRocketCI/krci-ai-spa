import { memo, useMemo } from 'react';
import { Timeline } from '@/components/ui/timeline';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { ThemedHeading } from '@/components/ui/themed-heading';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedLink } from '@/components/ui/themed-link';
import { ThemedTimelineIcon } from '@/components/ui/themed-timeline-icon';
import {
  ThemedTimelineContent,
  ThemedTimelineListItem,
} from '@/components/ui/themed-timeline-content';
import { CheckCircle, Rocket, Target } from 'lucide-react';
import { ROADMAP_TIMELINE_DATA, type TimelinePhase } from '@/lib/constants';

interface RoadmapTimelineProps {
  timelineData?: TimelinePhase[];
  className?: string;
}

/** Icon mapping for timeline phases */
const ICON_MAP = {
  CheckCircle,
  Rocket,
  Target,
} as const;

/** Badge variant mapping for timeline status */
const BADGE_VARIANT_MAP = {
  success: 'success' as const,
  progress: 'primary' as const,
  planned: 'info' as const,
} as const;

/** Renders description content with optional external link */
function renderDescription(phase: TimelinePhase) {
  if (!phase.descriptionWithLink) {
    return phase.description;
  }

  return (
    <>
      Integrating KubeRocketAI directly into the{' '}
      <ThemedLink href="https://docs.kuberocketci.io" external variant="primary">
        KubeRocketCI platform
      </ThemedLink>
      , transforming it into an AI-powered DevOps ecosystem. This integration enables developers to
      leverage AI agents natively within their CI/CD workflows.
    </>
  );
}

/** Creates timeline data structure for Timeline component */
function createTimelineData(timelineData: TimelinePhase[]) {
  return timelineData.map(phase => {
    const IconComponent = ICON_MAP[phase.icon];
    const badgeVariant = BADGE_VARIANT_MAP[phase.status];

    return {
      title: phase.title,
      content: (
        <div>
          <div className="mb-6 flex items-center space-x-4">
            <ThemedTimelineIcon icon={IconComponent} variant={phase.status} />
            <div>
              <ThemedHeading level={3} variant="section">
                {phase.heading}
              </ThemedHeading>
              <ThemedText variant="date" size="sm" as="div">
                {phase.period}
              </ThemedText>
              <ThemedBadge variant={badgeVariant} className="mt-2">
                {phase.badge}
              </ThemedBadge>
            </div>
          </div>
          <ThemedText variant="body" size="sm" as="p" className="mb-8 md:text-base">
            {renderDescription(phase)}
          </ThemedText>
          <ThemedTimelineContent>
            {phase.items.map((item, index) => (
              <ThemedTimelineListItem key={index} variant={phase.status}>
                {item}
              </ThemedTimelineListItem>
            ))}
          </ThemedTimelineContent>
        </div>
      ),
    };
  });
}

export const RoadmapTimeline = memo(function RoadmapTimeline({
  timelineData = ROADMAP_TIMELINE_DATA,
  className = '',
}: RoadmapTimelineProps) {
  const data = useMemo(() => createTimelineData(timelineData), [timelineData]);

  return (
    <div className={`relative w-full overflow-clip ${className}`.trim()}>
      <Timeline data={data} />
    </div>
  );
});
