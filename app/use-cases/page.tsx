'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal, GitBranch, Users, Settings, Network } from 'lucide-react';
import Link from 'next/link';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';

export default function UseCasesPage() {
  // User profiles data
  const userProfiles = [
    {
      emoji: '🚀',
      title: 'Development Squad',
      subtitle: '2-5 developers seeking coordination',
      benefits: [
        'Git-versioned AI agents that sync with your codebase updates',
        'IDE for quick fixes, Web Chat for deep architecture discussions',
        'No plugins needed — works in Cursor, Claude Code, ChatGPT today',
      ],
    },
    {
      emoji: '⚡',
      title: 'Cross-Functional Teams',
      subtitle: '5-20 people with dedicated SDLC roles',
      benefits: [
        'Role-specific agents (BA, QA, PM, Dev) that share project context',
        "Markdown configs evolve with your team's knowledge and standards",
        'Same agent works in IDE for coding, Web Chat for planning sessions',
      ],
    },
    {
      emoji: '🏢',
      title: 'Enterprise Organizations',
      subtitle: '20+ teams with custom frameworks',
      benefits: [
        'Framework-as-Code templates for internal libraries and patterns',
        'Git-based sharing of successful AI workflows across streams',
        'Governance controls with transparency — no black-box AI decisions',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      <SharedHeader currentPage="use-cases" />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-green-900/30 text-green-300 border-green-700">
            Target Audience
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Who Uses
            <br />
            <span className="text-5xl md:text-7xl">KubeRocketAI?</span>
          </h1>

          <p className="text-lg text-green-300/90 mb-6 max-w-3xl mx-auto font-medium">
            Keep using your favorite IDE or Web Chat.
          </p>

          <p className="text-xl text-slate-300/80 mb-8 max-w-2xl mx-auto">
            Discover if KubeRocketAI is the right solution for your team.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold"
              asChild
            >
              <a
                href="https://www.youtube.com/@theplatformteam"
                target="_blank"
                rel="noopener noreferrer"
              >
                🎬 Watch Live Development
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-100 bg-slate-900/50 hover:bg-slate-800/70 font-medium"
              asChild
            >
              <a
                href="https://github.com/KubeRocketCI/kuberocketai"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⭐ Star KubeRocketAI
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* User Profiles & Market Segments */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {userProfiles.map((profile, index) => (
              <Card
                key={index}
                className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center mb-6">
                    <div className="text-2xl mr-4">{profile.emoji}</div>
                    <div>
                      <CardTitle className="text-green-300 mb-1">{profile.title}</CardTitle>
                      <p className="text-cyan-400 text-sm font-medium">{profile.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-green-400 mr-3 mt-0.5">✓</span>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Value Section */}
      <section className="py-16 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">Framework Value Proposition</h2>
            <p className="text-lg text-slate-300/80 max-w-2xl mx-auto">
              Built by developers, for developers - addressing real-world AI workflow challenges
            </p>
          </div>

          <Card className="bg-gradient-to-r from-gray-900/50 to-black/50 border-green-700/30">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="text-green-300 font-semibold mb-2">Current Reality</h4>
                  <p className="text-sm text-slate-300">
                    Built by developers experiencing these exact frustrations daily
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Settings className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="text-green-300 font-semibold mb-2">Proven Approach</h4>
                  <p className="text-sm text-slate-300">
                    Uses familiar DevOps patterns (YAML configs, Git workflows, validation)
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Terminal className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="text-green-300 font-semibold mb-2">Immediate Benefit</h4>
                  <p className="text-sm text-slate-300">
                    Same agent definition works in IDE and can be bundled for web chat tools
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Network className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="text-green-300 font-semibold mb-2">Future Growth</h4>
                  <p className="text-sm text-slate-300">
                    More teams adopt systematic AI workflows as AI tools become standard
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">Ready to Get Started?</h2>
          <p className="text-lg text-slate-300/80 mb-8">
            Choose your path based on your team size and explore how KubeRocketAI works.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-4">🚀</div>
                <h3 className="text-green-300 font-semibold mb-2">Development Squad</h3>
                <p className="text-sm text-slate-400 mb-4">Start with shared team configurations</p>
                <Link href="/quickstart">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold"
                  >
                    Quick Start Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-700/30 hover:border-purple-600/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-4">⚡</div>
                <h3 className="text-green-300 font-semibold mb-2">Cross-Functional Teams</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Explore role-based AI coordination features
                </p>
                <Link href="/architecture">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-500 text-purple-300 hover:bg-purple-900/20 hover:text-purple-100"
                  >
                    View Architecture
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-green-700/30 hover:border-green-600/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-4">🏢</div>
                <h3 className="text-green-300 font-semibold mb-2">Enterprise Organizations</h3>
                <p className="text-sm text-slate-400 mb-4">
                  See multi-stream AI framework management
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-500 text-green-300 hover:bg-green-900/20 hover:text-green-100"
                  asChild
                >
                  <a
                    href="https://github.com/KubeRocketCI/kuberocketai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    Explore GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />
    </div>
  );
}
