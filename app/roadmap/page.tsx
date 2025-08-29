'use client';

import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { ThemedHeading } from '@/components/ui/themed-heading';
import { ThemedBackground } from '@/components/ui/themed-background';
import { FAQPreview } from '@/components/faq/faq-preview';
import { getRoadmapFAQs } from '@/lib/faq-data';
import { ThemedCard } from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { ThemedHorizontalTimeline } from '@/components/ui/themed-timeline';
import TimelineDemo from '@/components/timeline-demo';
import {
  ThemedRoadmapDescription,
  ThemedRoadmapMetricCard,
  ThemedRoadmapVisionText,
  ThemedRoadmapVisionCardText,
  ThemedRoadmapHighlight,
} from '@/components/ui/themed-roadmap';
import {
  Users,
  GitBranch,
  Star,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  Rocket,
  Target,
  Zap,
} from 'lucide-react';

export default function RoadmapPage() {
  // Horizontal timeline milestones
  const milestones = [
    {
      id: 'start',
      title: 'KubeRocketAI Project Start',
      date: 'Jun 2025',
      status: 'completed' as const,
      description: 'KubeRocketAI framework development begins with initial research and prototype',
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      id: 'mvp',
      title: 'KubeRocketAI MVP Complete',
      date: 'Aug 2025',
      status: 'completed' as const,
      description: 'Proven framework with 85% reduction in AI content adjustment time achieved',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      id: 'kuberocketci',
      title: 'KubeRocketCI Integration',
      date: 'Sep 2025',
      status: 'current' as const,
      description:
        'KubeRocketAI becomes native part of KubeRocketCI platform - second major pilot adoption',
      icon: <Zap className="w-5 h-5" />,
      isKubeRocketCI: true,
    },
    {
      id: 'platform',
      title: 'AI Capabilities Live',
      date: 'Dec 2025',
      status: 'upcoming' as const,
      description:
        'KubeRocketCI platform enhanced with full AI features and enterprise-grade capabilities',
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      id: 'market',
      title: 'Market Deployment',
      date: 'Mar 2026',
      status: 'upcoming' as const,
      description: '500+ GitHub stars, 3+ teams, strategic partnerships established',
      icon: <Target className="w-5 h-5" />,
    },
  ];

  const successMetrics = [
    {
      label: 'Developer Productivity',
      value: '85%',
      description: 'reduction in manual AI fixes',
      status: 'achieved',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: 'Platform Adoption',
      value: '100%',
      description: 'KubeRocketCI repository coverage by Nov 2025',
      status: 'target',
      icon: <GitBranch className="w-5 h-5" />,
    },
    {
      label: 'Customer Growth',
      value: '3+',
      description: 'development teams using AI features by Mar 2026',
      status: 'target',
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Community Adoption',
      value: '500+',
      description: 'GitHub stars demonstrating adoption',
      status: 'target',
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <ThemedBackground variant="main" className="min-h-screen font-sans">
      <SharedHeader currentPage="roadmap" />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <ThemedBadge variant="primary" className="mb-6">
              Strategic Vision
            </ThemedBadge>
            <ThemedHeading level={1} variant="hero" className="mb-6">
              From Proven Framework to
              <br />
              Platform Evolution
            </ThemedHeading>
            <ThemedRoadmapDescription className="max-w-3xl mx-auto">
              Our journey from MVP success to comprehensive AI-powered platform integration,
              enabling development teams worldwide to transform their SDLC workflows.
            </ThemedRoadmapDescription>
          </div>

          {/* Horizontal Timeline */}
          <div className="mt-12">
            <ThemedHorizontalTimeline milestones={milestones} />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12">
        <TimelineDemo />
      </section>

      {/* Success Metrics */}
      <section className="py-16 px-4">
        <ThemedBackground variant="section" className="-mx-4 px-4 py-16">
          <div className="container mx-auto max-w-6xl">
            <ThemedHeading level={2} variant="section" className="text-center mb-12">
              Measurable Success Metrics
            </ThemedHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {successMetrics.map((metric, index) => (
                <ThemedCard key={index} variant="highlight">
                  <ThemedRoadmapMetricCard
                    icon={metric.icon}
                    value={metric.value}
                    label={metric.label}
                    description={metric.description}
                  >
                    <ThemedBadge variant={metric.status === 'achieved' ? 'success' : 'primary'}>
                      {metric.status === 'achieved' ? 'Achieved' : 'Target'}
                    </ThemedBadge>
                  </ThemedRoadmapMetricCard>
                </ThemedCard>
              ))}
            </div>
          </div>
        </ThemedBackground>
      </section>

      {/* Strategic Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <ThemedHeading level={2} variant="section" className="mb-8">
            Strategic Vision: Platform Evolution
          </ThemedHeading>
          <ThemedRoadmapVisionText className="mb-8">
            We&apos;re helping developers use AI in their native IDEs while keeping their code and
            AI agents aligned through context engineering.
          </ThemedRoadmapVisionText>
          <ThemedCard variant="terminal">
            <ThemedRoadmapVisionCardText>
              <ThemedRoadmapHighlight variant="primary">
                Context Engineering:
              </ThemedRoadmapHighlight>{' '}
              Instead of fighting AI hallucinations, we provide tools that keep your codebase and AI
              agents in sync. Developers code in their preferred environment while{' '}
              <ThemedRoadmapHighlight variant="secondary">
                agents understand project context
              </ThemedRoadmapHighlight>{' '}
              automatically.
            </ThemedRoadmapVisionCardText>
          </ThemedCard>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQPreview faqs={getRoadmapFAQs()} />

      {/* Footer */}
      <SharedFooter />
    </ThemedBackground>
  );
}
