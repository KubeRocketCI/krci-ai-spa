import React from 'react';
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
import { FRAMEWORK_METRICS } from '@/lib/constants';

export default function TimelineDemo() {
  const data = [
    {
      title: 'Jun-Aug 2025',
      content: (
        <div>
          <div className="mb-6 flex items-center space-x-4">
            <ThemedTimelineIcon icon={CheckCircle} variant="success" />
            <div>
              <ThemedHeading level={3} variant="section">
                KubeRocketAI MVP Completion
              </ThemedHeading>
              <ThemedText variant="date" size="sm" as="div">
                Jun-Aug 2025
              </ThemedText>
              <ThemedBadge variant="success" className="mt-2">
                COMPLETED
              </ThemedBadge>
            </div>
          </div>
          <ThemedText variant="body" size="sm" as="p" className="mb-8 md:text-base">
            Successfully delivered a proven framework with measurable impact on developer
            productivity and AI-generated content quality across multiple development teams.
          </ThemedText>
          <ThemedTimelineContent>
            <ThemedTimelineListItem variant="success">
              ✅ 10+ developers actively using framework daily
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="success">
              ✅ 15+ KubeRocketCI repositories with agent deployment
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="success">
              ✅ {FRAMEWORK_METRICS.AGENTS.DISPLAY} core agents (PM, Architect, Developer, QA, BA,
              PMM) fully operational
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="success">
              ✅ 85% reduction in AI-generated content adjustment time achieved
            </ThemedTimelineListItem>
          </ThemedTimelineContent>
        </div>
      ),
    },
    {
      title: 'Sep-Dec 2025',
      content: (
        <div>
          <div className="mb-6 flex items-center space-x-4">
            <ThemedTimelineIcon icon={Rocket} variant="progress" />
            <div>
              <ThemedHeading level={3} variant="section">
                KubeRocketCI Platform Integration
              </ThemedHeading>
              <ThemedText variant="date" size="sm" as="div">
                Sep-Dec 2025
              </ThemedText>
              <ThemedBadge variant="primary" className="mt-2">
                EXECUTING
              </ThemedBadge>
            </div>
          </div>
          <ThemedText variant="body" size="sm" as="p" className="mb-8 md:text-base">
            Integrating KubeRocketAI directly into the{' '}
            <ThemedLink href="https://docs.kuberocketci.io" external variant="primary">
              KubeRocketCI platform
            </ThemedLink>
            , transforming it into an AI-powered DevOps ecosystem. This integration enables
            developers to leverage AI agents natively within their CI/CD workflows.
          </ThemedText>
          <ThemedTimelineContent>
            <ThemedTimelineListItem variant="progress">
              🚀 Native KubeRocketAI integration into KubeRocketCI platform core
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="progress">
              🚀 AI agents embedded in CI/CD pipeline execution and monitoring
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="progress">
              🚀 Automated code quality and security analysis via integrated AI
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="progress">
              🚀 Smart deployment recommendations and infrastructure optimization
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="progress">
              🚀 Unified developer experience: AI-powered DevOps in single platform
            </ThemedTimelineListItem>
          </ThemedTimelineContent>
        </div>
      ),
    },
    {
      title: 'Jan - Apr 2026',
      content: (
        <div>
          <div className="mb-6 flex items-center space-x-4">
            <ThemedTimelineIcon icon={Target} variant="planned" />
            <div>
              <ThemedHeading level={3} variant="section">
                Market Deployment
              </ThemedHeading>
              <ThemedText variant="date" size="sm" as="div">
                Dec 2025-Mar 2026
              </ThemedText>
              <ThemedBadge variant="info" className="mt-2">
                PLANNED
              </ThemedBadge>
            </div>
          </div>
          <ThemedText variant="body" size="sm" as="p" className="mb-8 md:text-base">
            Full market deployment with enterprise-grade features, community adoption, and strategic
            partnerships that establish KubeRocketAI as the industry standard.
          </ThemedText>
          <ThemedTimelineContent>
            <ThemedTimelineListItem variant="planned">
              🎯 500+ GitHub stars demonstrating community adoption
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="planned">
              🎯 3+ development teams using AI-enabled KubeRocketCI platform
            </ThemedTimelineListItem>
            <ThemedTimelineListItem variant="planned">
              🎯 3 major partnership integrations with complementary DevOps tools
            </ThemedTimelineListItem>
          </ThemedTimelineContent>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
