'use client';

import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { FAQPreview } from '@/components/faq/faq-preview';
import { getRoadmapFAQs } from '@/lib/faq-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HorizontalTimeline } from '@/components/ui/horizontal-timeline';
import TimelineDemo from '@/components/timeline-demo';
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
    <div className="min-h-screen bg-black text-slate-200">
      <SharedHeader currentPage="roadmap" />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-cyan-900/30 text-cyan-300 border-cyan-700">
              Strategic Vision
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
              From Proven Framework to
              <br />
              Platform Evolution
            </h1>
            <p className="text-xl text-slate-300/80 max-w-3xl mx-auto">
              Our journey from MVP success to comprehensive AI-powered platform integration,
              enabling development teams worldwide to transform their SDLC workflows.
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="mt-12">
            <HorizontalTimeline milestones={milestones} />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12">
        <TimelineDemo />
      </section>

      {/* Success Metrics */}
      <section className="py-16 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
            Measurable Success Metrics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <Card
                key={index}
                className="bg-black/50 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-cyan-400 mb-4 flex justify-center">{metric.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">{metric.label}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{metric.description}</p>
                  <Badge
                    className={`mt-3 ${
                      metric.status === 'achieved'
                        ? 'bg-green-900/30 text-green-300 border-green-700'
                        : 'bg-blue-900/30 text-blue-300 border-blue-700'
                    }`}
                  >
                    {metric.status === 'achieved' ? 'Achieved' : 'Target'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">
            Strategic Vision: Platform Evolution
          </h2>
          <p className="text-xl text-slate-300/90 leading-relaxed mb-8">
            We&apos;re helping developers use AI in their native IDEs while keeping their code and
            AI agents aligned through context engineering.
          </p>
          <div className="bg-black/50 border border-green-700/30 rounded-lg p-8">
            <p className="text-lg text-green-300/90 leading-relaxed">
              <strong className="text-cyan-300">Context Engineering:</strong> Instead of fighting AI
              hallucinations, we provide tools that keep your codebase and AI agents in sync.
              Developers code in their preferred environment while{' '}
              <strong className="text-green-300">agents understand project context</strong>{' '}
              automatically.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQPreview faqs={getRoadmapFAQs()} />

      {/* Footer */}
      <SharedFooter />
    </div>
  );
}
