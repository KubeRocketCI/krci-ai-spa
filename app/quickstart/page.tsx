'use client';

import { useState } from 'react';
import { FRAMEWORK_METRICS } from '@/lib/constants';
import {
  Copy,
  Check,
  Terminal,
  Code,
  GitBranch,
  Users,
  Clock,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { FAQPreview } from '@/components/faq/faq-preview';
import { getQuickstartFAQs } from '@/lib/faq-data';
import { ThemedHeading } from '@/components/ui/themed-heading';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedCard, ThemedCardHeader, ThemedCardTitle } from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { ThemedLink } from '@/components/ui/themed-link';
import { ThemedBackground } from '@/components/ui/themed-background';
import {
  ThemedInstallationTitle,
  ThemedInstallationCodeBlock,
  ThemedInstallationCommand,
  ThemedInstallationComment,
} from '@/components/ui/themed-installation';
import {
  ThemedFeatureIcon,
  ThemedFeatureTitle,
  ThemedFeatureDescription,
} from '@/components/ui/themed-feature';

// Constants
const INSTALL_COMMANDS = {
  macos: 'brew tap KubeRocketCI/homebrew-tap && brew install krci-ai',
  linux: `curl -L "https://github.com/KubeRocketCI/kuberocketai/releases/latest/download/krci-ai_Linux_x86_64.tar.gz" | tar -xz
chmod +x krci-ai && sudo mv krci-ai /usr/local/bin/`,
  quickstart: [
    { cmd: 'krci-ai install --ide=claude', desc: 'Install framework with IDE integration' },
    { cmd: 'krci-ai list agents', desc: 'See available agents' },
    { cmd: '/pm', desc: 'Start with Product Manager persona in IDE' },
    { cmd: 'krci-ai validate', desc: 'Validate your installation' },
    { cmd: 'krci-ai bundle --all --output project-context.md', desc: 'Create web chat bundle' },
  ],
};

export default function QuickStartPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Helper functions
  const copyToClipboard = async (text: string, command: string): Promise<void> => {
    await navigator.clipboard.writeText(text);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const toggleStepComplete = (stepIndex: number): void => {
    setCompletedSteps(prev =>
      prev.includes(stepIndex) ? prev.filter(i => i !== stepIndex) : [...prev, stepIndex],
    );
  };

  // Data
  const features = [
    {
      icon: (
        <Clock
          className="w-6 h-6"
          aria-label="Clock icon indicating quick 3-minute installation time"
        />
      ),
      title: '3 Minutes',
      description: 'From install to first agent',
      highlight: '3min',
    },
    {
      icon: (
        <Users
          className="w-6 h-6"
          aria-label={`Users icon representing the ${FRAMEWORK_METRICS.AGENTS.DISPLAY} SDLC agents available`}
        />
      ),
      title: '7 Agents',
      description: 'Complete SDLC team ready',
      highlight: '7',
    },
    {
      icon: (
        <ShieldCheck
          className="w-6 h-6"
          aria-label="Shield check icon representing built-in validation and security features"
        />
      ),
      title: 'Validation',
      description: 'Built-in configuration checks',
      highlight: '✓',
    },
    {
      icon: (
        <GitBranch
          className="w-6 h-6"
          aria-label="Git branch icon representing version control integration"
        />
      ),
      title: 'Version Control',
      description: 'Agent definitions in Git',
      highlight: 'Git',
    },
  ];

  const quickstartSteps = [
    {
      step: '1',
      title: 'Install Framework',
      time: '20 seconds',
      description: 'Get KubeRocketAI CLI with IDE integration',
      command: 'krci-ai install --ide=claude',
      output: `🔄 Installing KubeRocketAI framework components...
ℹ️ IDE integration: claude
ℹ️ Creating .krci-ai directory structure...
ℹ️ Setting up Claude Code integration...
✅ Claude Code integration installed successfully!
✅ Framework installation completed successfully!
ℹ️ Framework components installed to: .krci-ai
ℹ️
Next steps:
ℹ️   • Run 'krci-ai list agents' to see available agents
ℹ️   • Run 'krci-ai validate' to verify installation
ℹ️   • Claude Code commands installed to: .claude/commands/krci-ai/`,
    },
    {
      step: '2',
      title: 'Meet Your Team',
      time: '10 seconds',
      description: 'Discover available AI agents and their roles',
      command: 'krci-ai list agents',
      output: `✅ Found 7 agent(s):

Name         | Role               | Description
------------ | ------------------ | -----------------------------------
architect    | Software Architect | Software architect specializing in system design and architecture guidance
ba           | Business Analyst   | Business analyst specializing in requirements gathering...
dev          | Software Developer | Software Developer for implementation and code assistance
pm           | Product Manager    | Product manager specializing in product strategy, requirements...
po           | Product Owner      | Product owner specializing in user story creation and agile...
qa           | QA Engineer        | Quality assurance engineer specializing in testing strategy, test...

ℹ️ Use 'krci-ai list agents -v' for dependency table showing tasks, templates, and data`,
    },
    {
      step: '3',
      title: 'Start Your First Project',
      time: '2 minutes',
      description: 'Use the developer agent in Claude Code',
      command: 'claude .',
      output: `╭───────────────────────────────────────────────────────────────────────╮
│ ✻ Welcome to Claude Code!                                             │
│                                                                       │
│   /help for help, /status for your current setup                      │
│                                                                       │
│   cwd: /Users/username/krci-ai-spa                                    │
╰───────────────────────────────────────────────────────────────────────╯

> /krci-ai:dev

Hello! I'm Alex Developer, your Software Developer 💻

I'm here to help build beautiful, performant, and accessible user interfaces
for the KubeRocketAI showcase website.

Available Commands:
- help - Show available commands
- chat - Development consultation and assistance
- add-component - Create new component
- optimize-code - Code optimization
- exit - Exit Developer persona

What would you like to work on today?`,
    },
    {
      step: '4',
      title: 'Validate Everything Works',
      time: '10 seconds',
      description: 'Ensure your setup is working correctly',
      command: 'krci-ai validate',
      output: `🔍 Validating framework integrity...

✅ FRAMEWORK VALID

📊 Overview: 7 agents, 24 tasks, 14 templates, 11 data files
🔗 All internal links resolved (33 references checked)

💡 FRAMEWORK INSIGHTS:
   • architect → 4 tasks → 3 templates
   • ba → 4 tasks → 4 templates
   • dev → 3 tasks → 1 templates
   • pm → 4 tasks → 2 templates
   • po → 5 tasks → 2 templates
   • qa → 4 tasks → 4 templates
   • Most used template: story.md (used by 3 tasks)
⚡ Validation completed in 0.0s

Exit code: 0 (framework functional)`,
    },
    {
      step: '5',
      title: 'Create Web Chat Bundle',
      time: '30 seconds',
      description: 'Bundle agents for ChatGPT/Claude Web',
      command: 'krci-ai bundle --all --output project-context.md',
      output: `🔄 Validating framework integrity...
✅ Framework validation passed
🔄 Discovering agents and dependencies...
ℹ️ Generating bundle: /tmp/test/.krci-ai/bundle/project-context.md
✅ Bundle generated successfully!
ℹ️ Bundle file: /tmp/test/.krci-ai/bundle/project-context.md
ℹ️ Bundle size: 293329 bytes
ℹ️
Usage instructions:
ℹ️ • Copy the entire bundle content to your web chat tool (ChatGPT, Claude Web, Gemini Pro)
ℹ️ • The bundle includes all agents, tasks, templates, and project-specific data
ℹ️ • Each section is clearly separated with collision-resistant delimiters`,
    },
  ];

  return (
    <ThemedBackground variant="main" className="min-h-screen font-sans">
      <SharedHeader currentPage="quickstart" />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <ThemedBadge variant="primary" className="mb-6">
            Quick Start Guide
          </ThemedBadge>

          <ThemedHeading level={1} variant="hero" className="mb-6">
            Get Running in
            <br />
            <span className="text-5xl md:text-7xl">3 Minutes</span>
          </ThemedHeading>

          <ThemedText variant="lead" size="xl" className="mb-8 max-w-2xl mx-auto block">
            From zero to AI agent management with KubeRocketAI. No plugins, no complex setup—just
            pure developer productivity.
          </ThemedText>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <ThemedCard key={index} variant="highlight">
                <div className="p-4 text-center">
                  <ThemedFeatureIcon>{feature.icon}</ThemedFeatureIcon>
                  <div className="text-2xl font-bold text-emerald-700 dark:text-green-300 mb-1">
                    {feature.highlight}
                  </div>
                  <ThemedFeatureTitle>{feature.title}</ThemedFeatureTitle>
                  <ThemedFeatureDescription>{feature.description}</ThemedFeatureDescription>
                </div>
              </ThemedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="install" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <ThemedHeading level={2} variant="section" className="text-center mb-12">
            Install KubeRocketAI
          </ThemedHeading>

          <div className="space-y-6">
            {/* macOS - Homebrew (Recommended) */}
            <ThemedCard variant="terminal">
              <ThemedCardHeader variant="terminal">
                <ThemedInstallationTitle className="flex items-center">
                  <Terminal className="w-5 h-5 mr-2" />
                  macOS (Recommended)
                </ThemedInstallationTitle>
              </ThemedCardHeader>
              <div className="p-6 pt-4">
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    <ThemedInstallationCommand>{INSTALL_COMMANDS.macos}</ThemedInstallationCommand>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() => copyToClipboard(INSTALL_COMMANDS.macos, 'macos')}
                    className="flex-shrink-0"
                    aria-label="Copy macOS install commands"
                  >
                    {copiedCommand === 'macos' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
              </div>
            </ThemedCard>

            {/* Linux/Windows */}
            <ThemedCard variant="terminal">
              <ThemedCardHeader variant="terminal">
                <ThemedInstallationTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Linux/Windows
                </ThemedInstallationTitle>
              </ThemedCardHeader>
              <div className="p-6 pt-4">
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    <ThemedInstallationCommand>{INSTALL_COMMANDS.linux}</ThemedInstallationCommand>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() => copyToClipboard(INSTALL_COMMANDS.linux, 'linux')}
                    className="flex-shrink-0"
                    aria-label="Copy Linux install commands"
                  >
                    {copiedCommand === 'linux' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
                <ThemedInstallationComment className="mt-2">
                  Windows users: Download from{' '}
                  <ThemedLink
                    href="https://github.com/KubeRocketCI/kuberocketai/releases/latest"
                    variant="primary"
                    external
                    className="ml-1"
                  >
                    releases page
                  </ThemedLink>
                </ThemedInstallationComment>
              </div>
            </ThemedCard>
          </div>
        </div>
      </section>

      {/* Your First 3 Minutes */}
      <section id="agents" className="py-16 px-4">
        <ThemedBackground variant="section" className="py-16 px-4 -mx-4">
          <div className="container mx-auto max-w-5xl">
            <ThemedHeading level={2} variant="section" className="text-center mb-12">
              Start in 3 Minutes
            </ThemedHeading>

            <div className="space-y-8">
              {quickstartSteps.map((stepData, index) => (
                <ThemedCard key={index} variant="highlight">
                  <ThemedCardHeader variant="step">
                    <div className="flex items-center justify-between">
                      <ThemedCardTitle variant="step" className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold flex items-center justify-center mr-3">
                          {stepData.step}
                        </div>
                        {stepData.title}
                        <ThemedBadge variant="success" className="ml-3">
                          {stepData.time}
                        </ThemedBadge>
                      </ThemedCardTitle>
                      <ThemedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStepComplete(index)}
                        className={`${completedSteps.includes(index) ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'} hover:text-green-600 dark:hover:text-green-300`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </ThemedButton>
                    </div>
                    <ThemedText variant="muted" className="ml-11">
                      {stepData.description}
                    </ThemedText>
                  </ThemedCardHeader>
                  <div className="p-6 pt-4">
                    {/* Command */}
                    <div className="bg-gray-100/90 dark:bg-gray-900 border border-yellow-200 dark:border-green-700/30 rounded-lg p-4 mb-4 font-mono">
                      <div className="flex items-center mb-2">
                        <div className="flex space-x-2" aria-hidden="true">
                          <div
                            className="w-3 h-3 bg-red-500 rounded-full"
                            title="Close button (decorative)"
                          ></div>
                          <div
                            className="w-3 h-3 bg-yellow-500 rounded-full"
                            title="Minimize button (decorative)"
                          ></div>
                          <div
                            className="w-3 h-3 bg-green-500 rounded-full"
                            title="Maximize button (decorative)"
                          ></div>
                        </div>
                        <span className="ml-4 text-emerald-700 dark:text-green-400 text-sm">
                          terminal
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-emerald-700 dark:text-green-400">
                          <span className="text-blue-600 dark:text-blue-400">$ </span>
                          {stepData.command}
                        </div>
                        <ThemedButton
                          size="sm"
                          variant="copy"
                          onClick={() => copyToClipboard(stepData.command, `step-${index}`)}
                          className="flex-shrink-0"
                          aria-label={`Copy step ${stepData.step} command`}
                        >
                          {copiedCommand === `step-${index}` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </ThemedButton>
                      </div>
                    </div>

                    {/* Output */}
                    <div className="bg-gray-50 dark:bg-black rounded-lg p-4 font-mono">
                      <div className="text-emerald-700 dark:text-green-400 text-sm mb-2 opacity-60">
                        Output:
                      </div>
                      <pre className="text-slate-700 dark:text-green-300 text-sm whitespace-pre-wrap">
                        {stepData.output}
                      </pre>
                    </div>
                  </div>
                </ThemedCard>
              ))}
            </div>
          </div>
        </ThemedBackground>
      </section>

      {/* Next Steps */}
      <section id="usage" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <ThemedHeading level={2} variant="section" className="mb-6">
            🎯 You&apos;re Ready!
          </ThemedHeading>
          <ThemedText variant="body" size="lg" className="mb-8 block">
            Your agents are ready to be customized with project context using reusable SDLC
            framework rules.
          </ThemedText>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <ThemedCard variant="highlight" className="border-cyan-500/30 hover:border-cyan-400/60">
              <div className="p-6 text-center flex flex-col h-full">
                <ThemedFeatureIcon>
                  <Code className="w-8 h-8" />
                </ThemedFeatureIcon>
                <ThemedFeatureTitle className="text-lg mb-2">Core Concepts</ThemedFeatureTitle>
                <ThemedFeatureDescription className="text-sm mb-4 flex-grow">
                  Understand framework fundamentals and principles
                </ThemedFeatureDescription>
                <ThemedButton variant="outline" className="mt-auto" asChild>
                  <ThemedLink
                    href="https://www.youtube.com/@theplatformteam/shorts"
                    variant="button"
                    external
                  >
                    Learn More
                  </ThemedLink>
                </ThemedButton>
              </div>
            </ThemedCard>

            <ThemedCard variant="highlight" className="border-blue-500/30 hover:border-blue-400/60">
              <div className="p-6 text-center flex flex-col h-full">
                <ThemedFeatureIcon>
                  <GitBranch className="w-8 h-8" />
                </ThemedFeatureIcon>
                <ThemedFeatureTitle className="text-lg mb-2">Architecture</ThemedFeatureTitle>
                <ThemedFeatureDescription className="text-sm mb-4 flex-grow">
                  See how components work together seamlessly
                </ThemedFeatureDescription>
                <ThemedButton variant="outline" className="mt-auto" asChild>
                  <ThemedLink href="/architecture" variant="button">
                    View Architecture
                  </ThemedLink>
                </ThemedButton>
              </div>
            </ThemedCard>

            <ThemedCard
              variant="highlight"
              className="border-green-500/30 hover:border-green-400/60"
            >
              <div className="p-6 text-center flex flex-col h-full">
                <ThemedFeatureIcon>
                  <Users className="w-8 h-8" />
                </ThemedFeatureIcon>
                <ThemedFeatureTitle className="text-lg mb-2">Contributing</ThemedFeatureTitle>
                <ThemedFeatureDescription className="text-sm mb-4 flex-grow">
                  Customize and extend the framework rules
                </ThemedFeatureDescription>
                <ThemedButton variant="outline" className="mt-auto" asChild>
                  <ThemedLink
                    href="https://github.com/KubeRocketCI/kuberocketai/blob/main/CONTRIBUTING.md"
                    variant="button"
                    external
                  >
                    Contribute
                  </ThemedLink>
                </ThemedButton>
              </div>
            </ThemedCard>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQPreview faqs={getQuickstartFAQs()} />

      {/* Footer */}
      <SharedFooter />
    </ThemedBackground>
  );
}
