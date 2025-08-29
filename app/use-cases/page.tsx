'use client';

import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedCard, ThemedCardHeader, ThemedCardTitle } from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { ThemedLink } from '@/components/ui/themed-link';
import { Terminal, GitBranch, Users, Settings, Network } from 'lucide-react';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { ThemedHeading } from '@/components/ui/themed-heading';
import { ThemedBackground } from '@/components/ui/themed-background';
import { FAQPreview } from '@/components/faq/faq-preview';
import { getUseCasesFAQs } from '@/lib/faq-data';
import {
  ThemedUseCaseText,
  ThemedUseCaseSection,
  ThemedCTACard,
} from '@/components/ui/themed-use-cases';
import { ThemedValueCard, ThemedValueIcon } from '@/components/ui/themed-value-card';

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
    <ThemedBackground variant="main" className="min-h-screen font-sans">
      <SharedHeader currentPage="use-cases" />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <ThemedBadge variant="primary" className="mb-6">
            Target Audience
          </ThemedBadge>

          <ThemedHeading level={1} variant="hero" className="mb-6">
            Who Uses
            <br />
            <span className="text-5xl md:text-7xl">KubeRocketAI?</span>
          </ThemedHeading>

          <ThemedUseCaseText variant="hero-subtitle">
            Keep using your favorite IDE or Web Chat.
          </ThemedUseCaseText>

          <ThemedUseCaseText variant="hero-description">
            Discover if KubeRocketAI is the right solution for your team.
          </ThemedUseCaseText>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <ThemedButton
              variant="primary"
              size="sm"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold transform hover:scale-105"
              asChild
            >
              <a
                href="https://www.youtube.com/@theplatformteam"
                target="_blank"
                rel="noopener noreferrer"
              >
                🎬 Watch Live Development
              </a>
            </ThemedButton>
            <ThemedButton variant="outline" size="sm" asChild>
              <ThemedLink
                href="https://github.com/KubeRocketCI/kuberocketai"
                variant="button"
                external
              >
                ⭐ Star KubeRocketAI
              </ThemedLink>
            </ThemedButton>
          </div>
        </div>
      </section>

      {/* User Profiles & Market Segments */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {userProfiles.map((profile, index) => (
              <ThemedCard key={index} variant="highlight">
                <ThemedCardHeader>
                  <div className="flex items-center mb-6">
                    <div className="text-2xl mr-4">{profile.emoji}</div>
                    <div>
                      <ThemedCardTitle>
                        <ThemedUseCaseText variant="card-title">{profile.title}</ThemedUseCaseText>
                      </ThemedCardTitle>
                      <ThemedUseCaseText variant="card-subtitle">
                        {profile.subtitle}
                      </ThemedUseCaseText>
                    </div>
                  </div>
                </ThemedCardHeader>
                <div className="p-6 pt-4 space-y-4">
                  {profile.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <ThemedUseCaseText variant="checkmark">✓</ThemedUseCaseText>
                      <ThemedUseCaseText variant="card-benefit">{benefit}</ThemedUseCaseText>
                    </div>
                  ))}
                </div>
              </ThemedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Value Section */}
      <ThemedUseCaseSection variant="highlighted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <ThemedHeading level={2} variant="section" className="mb-4">
              Framework Value Proposition
            </ThemedHeading>
            <ThemedUseCaseText variant="section-description">
              Built by developers, for developers - addressing real-world AI workflow challenges
            </ThemedUseCaseText>
          </div>

          <ThemedCard variant="highlight">
            <ThemedValueCard>
              <div className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <ThemedValueIcon variant="blue">
                      <Users className="w-6 h-6" />
                    </ThemedValueIcon>
                    <ThemedUseCaseText variant="value-card-title" className="block">
                      Current Reality
                    </ThemedUseCaseText>
                    <ThemedUseCaseText variant="value-card-text">
                      Built by developers experiencing these exact frustrations daily
                    </ThemedUseCaseText>
                  </div>

                  <div className="text-center">
                    <ThemedValueIcon variant="purple">
                      <Settings className="w-6 h-6" />
                    </ThemedValueIcon>
                    <ThemedUseCaseText variant="value-card-title" className="block">
                      Proven Approach
                    </ThemedUseCaseText>
                    <ThemedUseCaseText variant="value-card-text">
                      Uses familiar DevOps patterns (YAML configs, Git workflows, validation)
                    </ThemedUseCaseText>
                  </div>

                  <div className="text-center">
                    <ThemedValueIcon variant="green">
                      <Terminal className="w-6 h-6" />
                    </ThemedValueIcon>
                    <ThemedUseCaseText variant="value-card-title" className="block">
                      Immediate Benefit
                    </ThemedUseCaseText>
                    <ThemedUseCaseText variant="value-card-text">
                      Same agent definition works in IDE and can be bundled for web chat tools
                    </ThemedUseCaseText>
                  </div>

                  <div className="text-center">
                    <ThemedValueIcon variant="yellow">
                      <Network className="w-6 h-6" />
                    </ThemedValueIcon>
                    <ThemedUseCaseText variant="value-card-title" className="block">
                      Future Growth
                    </ThemedUseCaseText>
                    <ThemedUseCaseText variant="value-card-text">
                      More teams adopt systematic AI workflows as AI tools become standard
                    </ThemedUseCaseText>
                  </div>
                </div>
              </div>
            </ThemedValueCard>
          </ThemedCard>
        </div>
      </ThemedUseCaseSection>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <ThemedHeading level={2} variant="section" className="mb-6">
            Ready to Get Started?
          </ThemedHeading>
          <ThemedUseCaseText variant="cta-description">
            Choose your path based on your team size and explore how KubeRocketAI works.
          </ThemedUseCaseText>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <ThemedCard variant="interactive">
              <div className="p-6 text-center">
                <div className="text-2xl mb-4">🚀</div>
                <ThemedUseCaseText variant="cta-card-title" className="block">
                  Development Squad
                </ThemedUseCaseText>
                <div className="mb-4">
                  <ThemedUseCaseText variant="cta-card-description">
                    Start with shared team configurations
                  </ThemedUseCaseText>
                </div>
                <ThemedButton
                  variant="primary"
                  size="sm"
                  className="transform hover:scale-105"
                  asChild
                >
                  <a href="/quickstart">Quick Start Guide</a>
                </ThemedButton>
              </div>
            </ThemedCard>

            <ThemedCard variant="interactive">
              <ThemedCTACard variant="purple">
                <div className="p-6 text-center">
                  <div className="text-2xl mb-4">⚡</div>
                  <ThemedUseCaseText variant="cta-card-title" className="block">
                    Cross-Functional Teams
                  </ThemedUseCaseText>
                  <div className="mb-4">
                    <ThemedUseCaseText variant="cta-card-description">
                      Explore role-based AI coordination features
                    </ThemedUseCaseText>
                  </div>
                  <ThemedButton
                    variant="outline"
                    size="sm"
                    className="border-purple-600 text-purple-700 hover:bg-purple-100 hover:text-purple-800 dark:border-purple-500 dark:text-purple-300 dark:hover:bg-purple-900/20 dark:hover:text-purple-100"
                    asChild
                  >
                    <ThemedLink href="/architecture" variant="button">
                      View Architecture
                    </ThemedLink>
                  </ThemedButton>
                </div>
              </ThemedCTACard>
            </ThemedCard>

            <ThemedCard variant="interactive">
              <ThemedCTACard variant="green">
                <div className="p-6 text-center">
                  <div className="text-2xl mb-4">🏢</div>
                  <ThemedUseCaseText variant="cta-card-title" className="block">
                    Enterprise Organizations
                  </ThemedUseCaseText>
                  <div className="mb-4">
                    <ThemedUseCaseText variant="cta-card-description">
                      See multi-stream AI framework management
                    </ThemedUseCaseText>
                  </div>
                  <ThemedButton
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-700 hover:bg-green-100 hover:text-green-800 dark:border-green-500 dark:text-green-300 dark:hover:bg-green-900/20 dark:hover:text-green-100"
                    asChild
                  >
                    <ThemedLink
                      href="https://github.com/KubeRocketCI/kuberocketai"
                      variant="button"
                      external
                    >
                      <GitBranch className="w-4 h-4 mr-2" />
                      Explore GitHub
                    </ThemedLink>
                  </ThemedButton>
                </div>
              </ThemedCTACard>
            </ThemedCard>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQPreview faqs={getUseCasesFAQs()} />

      {/* Footer */}
      <SharedFooter />
    </ThemedBackground>
  );
}
