import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Rocket, Target } from 'lucide-react';
import { FRAMEWORK_METRICS } from '@/lib/constants';

export default function TimelineDemo() {
  const data = [
    {
      title: 'Jun-Aug 2025',
      content: (
        <div>
          <div className="mb-6 flex items-center space-x-4">
            <div className="text-green-400 p-2 rounded-full bg-green-500/10">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">KubeRocketAI MVP Completion</h3>
              <p className="text-slate-300 text-sm">Jun-Aug 2025</p>
              <Badge className="mt-2 bg-green-900/30 text-green-300 border-green-700">
                COMPLETED
              </Badge>
            </div>
          </div>
          <p className="mb-8 text-sm font-normal text-slate-300 md:text-base">
            Successfully delivered a proven framework with measurable impact on developer
            productivity and AI-generated content quality across multiple development teams.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-green-300">
              ✅ 10+ developers actively using framework daily
            </div>
            <div className="flex items-center gap-2 text-sm text-green-300">
              ✅ 15+ KubeRocketCI repositories with agent deployment
            </div>
            <div className="flex items-center gap-2 text-sm text-green-300">
              ✅ {FRAMEWORK_METRICS.AGENTS.DISPLAY} core agents (PM, Architect, Developer, QA, BA,
              PMM) fully operational
            </div>
            <div className="flex items-center gap-2 text-sm text-green-300">
              ✅ 85% reduction in AI-generated content adjustment time achieved
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Sep-Dec 2025',
      content: (
        <div>
          <div className="mb-6 flex items-center space-x-4">
            <div className="text-cyan-400 p-2 rounded-full bg-cyan-500/10">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">KubeRocketCI Platform Integration</h3>
              <p className="text-slate-300 text-sm">Sep-Dec 2025</p>
              <Badge className="mt-2 bg-cyan-900/30 text-cyan-300 border-cyan-700">EXECUTING</Badge>
            </div>
          </div>
          <p className="mb-8 text-sm font-normal text-slate-300 md:text-base">
            Integrating KubeRocketAI directly into the{' '}
            <a
              href="https://docs.kuberocketci.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-colors"
            >
              KubeRocketCI platform
            </a>
            , transforming it into an AI-powered DevOps ecosystem. This integration enables
            developers to leverage AI agents natively within their CI/CD workflows.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🚀 Native KubeRocketAI integration into KubeRocketCI platform core
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🚀 AI agents embedded in CI/CD pipeline execution and monitoring
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🚀 Automated code quality and security analysis via integrated AI
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🚀 Smart deployment recommendations and infrastructure optimization
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🚀 Unified developer experience: AI-powered DevOps in single platform
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Jan - Apr 2026',
      content: (
        <div>
          <div className="mb-6 flex items-center space-x-4">
            <div className="text-purple-400 p-2 rounded-full bg-purple-500/10">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Market Deployment</h3>
              <p className="text-slate-300 text-sm">Dec 2025-Mar 2026</p>
              <Badge className="mt-2 bg-purple-900/30 text-purple-300 border-purple-700">
                PLANNED
              </Badge>
            </div>
          </div>
          <p className="mb-8 text-sm font-normal text-slate-300 md:text-base">
            Full market deployment with enterprise-grade features, community adoption, and strategic
            partnerships that establish KubeRocketAI as the industry standard.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🎯 500+ GitHub stars demonstrating community adoption
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🎯 3+ development teams using AI-enabled KubeRocketCI platform
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🎯 3 major partnership integrations with complementary DevOps tools
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip bg-black">
      <Timeline data={data} />
    </div>
  );
}
