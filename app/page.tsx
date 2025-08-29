'use client';
import { useState, useEffect } from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { GitHubIcon } from '@/components/github-icon';
import { FRAMEWORK_METRICS } from '@/lib/constants';
import {
  Copy,
  Check,
  Star,
  Terminal,
  Code,
  Zap,
  GitBranch,
  Users,
  Globe,
  Blocks,
  BellRing,
  LetterText,
  ShieldCheck,
  MessageCircle,
  PencilLine,
  Brain,
  Presentation,
  FileText,
  NotebookText,
} from 'lucide-react';
import { GITHUB_REPO_URL_EXPORT } from '@/lib/use-github-repo';
import InlineVideo, { AutoplayMode } from '@/components/ui/inline-video';
import { FAQPreview } from '@/components/faq/faq-preview';
import { ThemedHeading } from '@/components/ui/themed-heading';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedBackground } from '@/components/ui/themed-background';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedCard } from '@/components/ui/themed-card';
import {
  ThemedFeatureIcon,
  ThemedFeatureTitle,
  ThemedFeatureDescription,
  ThemedFeatureMobileTapIndicator,
  ThemedFeatureHoverOverlay,
} from '@/components/ui/themed-feature';
import {
  ThemedInstallationTitle,
  ThemedInstallationCodeBlock,
  ThemedInstallationCommand,
  ThemedInstallationComment,
  ThemedInstallationHelpText,
} from '@/components/ui/themed-installation';
import { ThemedLink } from '@/components/ui/themed-link';
import { ThemedStatCard } from '@/components/ui/themed-stat-card';
import {
  ThemedTabs,
  ThemedTabsList,
  ThemedTabsTrigger,
  ThemedTabsContent,
} from '@/components/ui/themed-tabs';
import {
  ThemedTerminal,
  ThemedTerminalText,
  ThemedTerminalCursor,
} from '@/components/ui/themed-terminal';
import { ThemedPhilosophyText, ThemedPhilosophyHighlight } from '@/components/ui/themed-philosophy';
import {
  ThemedPillarIcon,
  ThemedPillarTitle,
  ThemedPillarDescription,
  ThemedPillarHighlight,
} from '@/components/ui/themed-pillar';
import {
  ThemedWorkflowTitle,
  ThemedWorkflowStep,
  ThemedWorkflowStepLabel,
  ThemedWorkflowStepDescription,
  ThemedWorkflowArrow,
  ThemedWorkflowDescription,
  ThemedWorkflowHighlight,
} from '@/components/ui/themed-workflow';
import {
  ThemedIntegrationTitle,
  ThemedIntegrationSubtitle,
  ThemedIntegrationListItem,
  ThemedIntegrationCommand,
} from '@/components/ui/themed-integration';
import {
  ThemedContextEngineeringBox,
  ThemedContextEngineeringTitle,
  ThemedContextEngineeringText,
  ThemedContextEngineeringHighlight,
} from '@/components/ui/themed-context-engineering';

// Constants
const HERO_COMMAND = 'brew tap KubeRocketCI/homebrew-tap && brew install krci-ai';
// Autoplay behavior for the hero video: 'onView' plays when visible, 'onLoad' plays immediately
const VIDEO_AUTOPLAY_MODE: AutoplayMode = 'onView';

export default function HomePage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < HERO_COMMAND.length) {
        setTypedText(HERO_COMMAND.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // InlineVideo handles autoplay logic

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Helper functions
  const copyToClipboard = async (text: string, command: string): Promise<void> => {
    await navigator.clipboard.writeText(text);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const toggleFeatureExpansion = (index: number): void => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  // Data and configuration
  const features = [
    {
      icon: (
        <Blocks className="w-6 h-6" aria-label="Blocks icon representing plugin-free operation" />
      ),
      title: 'Plugin‑free',
      description: 'No IDE plugins required',
      cmd: 'info',
      hover: 'Works in your IDE today. Nothing to install.',
    },
    {
      icon: (
        <Zap
          className="w-6 h-6"
          aria-label="Lightning bolt icon representing speed and lightweight design"
        />
      ),
      title: 'Lightweight CLI',
      description: 'Single binary, fast setup',
      cmd: 'krci-ai',
      hover: 'One small binary to set up and manage your AI workflow.',
    },
    {
      icon: (
        <ShieldCheck
          className="w-6 h-6"
          aria-label="Shield check icon representing validation and security verification"
        />
      ),
      title: 'Validate',
      description: 'Check configs for consistency',
      cmd: 'krci-ai validate',
      hover: 'Catch misconfigurations and broken links before they cost time and LLM tokens.',
    },
    {
      icon: (
        <LetterText
          className="w-6 h-6"
          aria-label="Letter text icon representing token analysis and text processing"
        />
      ),
      title: 'Tokens',
      description: 'Analyze token usage',
      cmd: 'krci-ai tokens',
      hover: 'See context size to prevent truncation and surprise failures.',
    },
    {
      icon: (
        <Globe
          className="w-6 h-6"
          aria-label="Globe icon representing web bundles and global chat deployment"
        />
      ),
      title: 'Bundles',
      description: 'Create agent bundles for chat',
      cmd: 'krci-ai bundle',
      hover: 'Generate a paste‑ready package for ChatGPT, Claude, or Gemini.',
    },
    {
      icon: (
        <GitBranch
          className="w-6 h-6"
          aria-label="Git branch icon representing installation and component management"
        />
      ),
      title: 'Install & List',
      description: 'Set up and explore components',
      cmd: 'krci-ai install',
      hover: 'Install core assets and quickly see available agents.',
    },
    {
      icon: (
        <Terminal
          className="w-6 h-6"
          aria-label="Terminal icon representing shell autocompletion features"
        />
      ),
      title: 'Autocomplete',
      description: 'Shell completion scripts',
      cmd: 'krci-ai completion',
      hover: 'Type less, move faster with shell suggestions.',
    },
    {
      icon: (
        <BellRing
          className="w-6 h-6"
          aria-label="Bell ring icon representing version tracking and updates"
        />
      ),
      title: 'Versions',
      description: 'Check version & updates',
      cmd: 'krci-ai version',
      hover: 'Verify your setup and share reproducible versions.',
    },
  ];

  const stats = [
    { label: 'Integrated Codebases', value: FRAMEWORK_METRICS.INTEGRATED_CODEBASES.DISPLAY },
    { label: 'Agile SDLC Roles', value: FRAMEWORK_METRICS.AGENTS.DISPLAY },
    { label: 'Baseline Tasks', value: FRAMEWORK_METRICS.BASELINE_TASKS.DISPLAY },
    { label: 'Supported IDEs', value: FRAMEWORK_METRICS.SUPPORTED_IDES.DISPLAY },
    { label: 'SDLC Framework', value: FRAMEWORK_METRICS.FRAMEWORKS.DISPLAY },
  ];

  return (
    <ThemedBackground variant="main" className="min-h-screen font-sans">
      {/* Header */}
      <SharedHeader currentPage="home" />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <ThemedBadge variant="primary" className="mb-6">
            Pipeline-as-Code for AI
          </ThemedBadge>

          <ThemedHeading level={1} variant="hero" className="mb-6">
            AI-as-Code for
            <br />
            Development Teams
          </ThemedHeading>

          <ThemedText variant="lead" size="xl" as="p" className="mb-8 max-w-2xl mx-auto">
            Apply Pipeline-as-Code principles to AI agent management. Version-controlled,
            project-aware AI agents that understand your codebase.
          </ThemedText>

          {/* Terminal Demo */}
          <ThemedTerminal variant="hero" className="mb-8 text-left max-w-2xl mx-auto">
            <div>
              <ThemedTerminalText variant="prompt">$</ThemedTerminalText>{' '}
              <ThemedTerminalText variant="command">{typedText}</ThemedTerminalText>
              <ThemedTerminalCursor visible={showCursor} />
            </div>
          </ThemedTerminal>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* PRIMARY CTA - Install Now */}
            <ThemedButton
              variant="primary"
              size="lg"
              className="px-8 h-12 text-base transform hover:scale-105"
              onClick={() => copyToClipboard(HERO_COMMAND, 'brew')}
            >
              {copiedCommand === 'brew' ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Install Now
            </ThemedButton>

            {/* SECONDARY CTA - Star on GitHub */}
            <ThemedButton
              variant="outline"
              size="lg"
              className="px-6 h-12 text-base font-medium shadow-lg transform hover:scale-102 backdrop-blur-sm"
              asChild
            >
              <a
                href={GITHUB_REPO_URL_EXPORT}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Star KubeRocketAI on GitHub (opens in a new tab)"
              >
                <Star className="w-4 h-4 mr-2 text-yellow-400" aria-hidden="true" />
                Star on GitHub
              </a>
            </ThemedButton>
          </div>

          {/* Video Demo (simple, autoplay on view) */}
          <div className="mt-6 max-w-4xl mx-auto" id="hero-demo">
            <InlineVideo
              src="https://3nwqeqhvckfwsch6.public.blob.vercel-storage.com/krci-ai-user-intro.mp4"
              poster="/social.png"
              title="KubeRocketAI — 60-second intro"
              ariaLabel="KubeRocketAI — 60-second intro video"
              autoPlayMode={VIDEO_AUTOPLAY_MODE}
              intersectionThreshold={0.35}
              className="rounded-md bg-black transition ring-0 group-hover:ring-1 group-hover:ring-cyan-500/30 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.10)]"
              containerClassName="group"
            />
          </div>
        </div>
      </section>

      {/* Aurora Background Section - From Stats to Features */}
      <AuroraBackground className="py-0 -my-8">
        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="relative z-10 text-center text-xs md:text-sm uppercase tracking-[0.08em] text-slate-600 dark:text-slate-300/90 mb-6">
              Adoption at a glance
            </h3>
            <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-6 text-center">
              {stats.map((stat, index) => {
                // Make the "Agile SDLC Roles" stat clickable
                if (stat.label === 'Agile SDLC Roles') {
                  return (
                    <ThemedStatCard
                      key={index}
                      value={stat.value}
                      label={stat.label}
                      variant="gradient"
                      href="/architecture#agent-relations"
                    />
                  );
                }
                // Make the "Supported IDEs" stat clickable
                else if (stat.label === 'Supported IDEs') {
                  return (
                    <ThemedStatCard
                      key={index}
                      value={stat.value}
                      label={stat.label}
                      variant="gradient"
                      href="/architecture#supported-ides"
                    />
                  );
                }
                // Make the "SDLC Framework" stat clickable
                else if (stat.label === 'SDLC Framework') {
                  return (
                    <ThemedStatCard
                      key={index}
                      value={stat.value}
                      label={stat.label}
                      variant="gradient"
                      href="/architecture#sdlc-workflow"
                    />
                  );
                } else {
                  return (
                    <ThemedStatCard
                      key={index}
                      value={stat.value}
                      label={stat.label}
                      variant="gradient"
                    />
                  );
                }
              })}
            </div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <ThemedHeading
                  level={2}
                  variant="section"
                  className="relative z-10 mb-6 text-red-600 dark:text-red-400"
                >
                  The Problem
                </ThemedHeading>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <ThemedText variant="problem" className="mr-3">
                      ×
                    </ThemedText>
                    <ThemedText variant="body">
                      Context switching between AI tools and IDEs
                    </ThemedText>
                  </li>
                  <li className="flex items-start">
                    <ThemedText variant="problem" className="mr-3">
                      ×
                    </ThemedText>
                    <ThemedText variant="body">
                      Inconsistent AI configurations across team members
                    </ThemedText>
                  </li>
                  <li className="flex items-start">
                    <ThemedText variant="problem" className="mr-3">
                      ×
                    </ThemedText>
                    <ThemedText variant="body">
                      Manual fixes for AI-generated code that doesn&apos;t fit project patterns
                    </ThemedText>
                  </li>
                  <li className="flex items-start">
                    <ThemedText variant="problem" className="mr-3">
                      ×
                    </ThemedText>
                    <ThemedText variant="body">
                      No version control for AI agent definitions
                    </ThemedText>
                  </li>
                </ul>
              </div>
              <div>
                <ThemedHeading
                  level={2}
                  variant="section"
                  className="relative z-10 mb-6 text-green-600 dark:text-green-400"
                >
                  The Solution
                </ThemedHeading>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <ThemedText variant="solution" className="mr-3">
                      ✓
                    </ThemedText>
                    <ThemedText variant="body">
                      Declarative agent management with project-specific context
                    </ThemedText>
                  </li>
                  <li className="flex items-start">
                    <ThemedText variant="solution" className="mr-3">
                      ✓
                    </ThemedText>
                    <ThemedText variant="body">
                      Version-controlled Markdown definitions alongside code
                    </ThemedText>
                  </li>
                  <li className="flex items-start">
                    <ThemedText variant="solution" className="mr-3">
                      ✓
                    </ThemedText>
                    <ThemedText variant="body">
                      Universal compatibility across all AI-powered IDEs
                    </ThemedText>
                  </li>
                  <li className="flex items-start">
                    <ThemedText variant="solution" className="mr-3">
                      ✓
                    </ThemedText>
                    <ThemedText variant="body">
                      Built-in transparency and auditability for security teams
                    </ThemedText>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <ThemedHeading level={2} variant="section" className="relative z-10 text-center mb-12">
              Key Features
            </ThemedHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const isExpanded = expandedFeature === index;
                return (
                  <ThemedCard
                    key={index}
                    variant="interactive"
                    className="group relative overflow-hidden"
                    onClick={() => toggleFeatureExpansion(index)}
                  >
                    {/* Mobile tap indicator - only visible on small screens */}
                    <ThemedFeatureMobileTapIndicator />

                    {/* Hover overlay for desktop + tap overlay for mobile */}
                    <ThemedFeatureHoverOverlay
                      isVisible={isExpanded}
                      command={feature.cmd}
                      hoverText={feature.hover}
                    />

                    <div className="p-6 relative z-10">
                      <div
                        className={`transition-all duration-300 ${
                          // Desktop: blur on hover, Mobile: blur when expanded
                          'group-hover:blur-[1.5px] group-hover:opacity-60 sm:group-hover:blur-[1.5px] sm:group-hover:opacity-60'
                        } ${isExpanded ? 'blur-[1.5px] opacity-60 sm:blur-0 sm:opacity-100 sm:group-hover:blur-[1.5px] sm:group-hover:opacity-60' : ''}`}
                      >
                        <ThemedFeatureIcon>{feature.icon}</ThemedFeatureIcon>
                        <ThemedFeatureTitle>{feature.title}</ThemedFeatureTitle>
                        <ThemedFeatureDescription>{feature.description}</ThemedFeatureDescription>
                      </div>
                    </div>
                  </ThemedCard>
                );
              })}
            </div>
          </div>
        </section>
      </AuroraBackground>

      {/* Installation */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <ThemedHeading level={2} variant="section" className="text-center mb-12">
            Installation
          </ThemedHeading>

          <ThemedTabs defaultValue="macos" className="w-full">
            <ThemedTabsList className="">
              <ThemedTabsTrigger value="macos">macOS</ThemedTabsTrigger>
              <ThemedTabsTrigger value="linux">Linux</ThemedTabsTrigger>
              <ThemedTabsTrigger value="windows">Windows</ThemedTabsTrigger>
            </ThemedTabsList>

            {/* macOS Tab */}
            <ThemedTabsContent variant="terminal" value="macos">
              <div>
                <ThemedInstallationTitle>Homebrew (Recommended)</ThemedInstallationTitle>
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    <ThemedInstallationCommand>{`brew tap KubeRocketCI/homebrew-tap
brew install krci-ai`}</ThemedInstallationCommand>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() =>
                      copyToClipboard(
                        `brew tap KubeRocketCI/homebrew-tap\nbrew install krci-ai`,
                        'macos',
                      )
                    }
                    className="flex-shrink-0"
                    aria-label="Copy macOS Homebrew install commands"
                  >
                    {copiedCommand === 'macos' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
              </div>
            </ThemedTabsContent>

            {/* Linux Tab */}
            <ThemedTabsContent variant="terminal" value="linux">
              <div>
                <ThemedInstallationTitle>Direct Download</ThemedInstallationTitle>
                <ThemedInstallationCodeBlock>
                  {/* Mobile: truncated version, Desktop: full version */}
                  <div className="flex-1 mr-2">
                    <div className="block sm:hidden overflow-hidden">
                      <div className="truncate">
                        <ThemedInstallationCommand>
                          curl -L &quot;https://github.com/KubeRocketCI/...&quot;
                        </ThemedInstallationCommand>
                      </div>
                      <div className="truncate">
                        <ThemedInstallationCommand>chmod +x krci-ai</ThemedInstallationCommand>
                      </div>
                      <div className="truncate">
                        <ThemedInstallationCommand>
                          sudo mv krci-ai /usr/local/bin/
                        </ThemedInstallationCommand>
                      </div>
                    </div>
                    <pre className="hidden sm:block whitespace-pre-wrap break-words">
                      <ThemedInstallationCommand>{`curl -L "https://github.com/KubeRocketCI/kuberocketai/releases/latest/download/krci-ai_Linux_x86_64.tar.gz" | tar -xz
chmod +x krci-ai
sudo mv krci-ai /usr/local/bin/`}</ThemedInstallationCommand>
                    </pre>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() =>
                      copyToClipboard(
                        `curl -L "https://github.com/KubeRocketCI/kuberocketai/releases/latest/download/krci-ai_Linux_x86_64.tar.gz" | tar -xz\nchmod +x krci-ai\nsudo mv krci-ai /usr/local/bin/`,
                        'linux',
                      )
                    }
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
              </div>
            </ThemedTabsContent>

            {/* Windows Tab */}
            <ThemedTabsContent variant="terminal" value="windows">
              <div>
                <ThemedInstallationTitle>PowerShell / Command Prompt</ThemedInstallationTitle>
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    {/* Mobile: truncated version, Desktop: full version */}
                    <div className="block sm:hidden overflow-hidden">
                      <div className="truncate">
                        <ThemedInstallationCommand>
                          curl -L &quot;https://github.com/KubeRocketCI/...&quot; -o krci-ai.zip
                        </ThemedInstallationCommand>
                      </div>
                      <div className="truncate">
                        <ThemedInstallationCommand>
                          Expand-Archive -Path krci-ai.zip -DestinationPath .
                        </ThemedInstallationCommand>
                      </div>
                      <div className="truncate">
                        <ThemedInstallationCommand>
                          Move-Item krci-ai.exe &quot;C:\Program Files\krci-ai\...&quot;
                        </ThemedInstallationCommand>
                      </div>
                    </div>
                    <pre className="hidden sm:block whitespace-pre-wrap break-words">
                      <ThemedInstallationCommand>{`# Download and extract
curl -L "https://github.com/KubeRocketCI/kuberocketai/releases/latest/download/krci-ai_Windows_x86_64.zip" -o krci-ai.zip
Expand-Archive -Path krci-ai.zip -DestinationPath .
# Move to PATH (requires admin)
Move-Item krci-ai.exe "C:\\Program Files\\krci-ai\\krci-ai.exe"`}</ThemedInstallationCommand>
                    </pre>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() =>
                      copyToClipboard(
                        `curl -L "https://github.com/KubeRocketCI/kuberocketai/releases/latest/download/krci-ai_Windows_x86_64.zip" -o krci-ai.zip\nExpand-Archive -Path krci-ai.zip -DestinationPath .\nMove-Item krci-ai.exe "C:\\Program Files\\krci-ai\\krci-ai.exe"`,
                        'windows',
                      )
                    }
                    className="flex-shrink-0"
                    aria-label="Copy Windows install commands"
                  >
                    {copiedCommand === 'windows' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
              </div>
            </ThemedTabsContent>
          </ThemedTabs>

          {/* Installation Help */}
          <div className="text-center mt-6">
            <ThemedInstallationHelpText>
              Having installation issues?{' '}
              <ThemedLink href="/faq" variant="primary">
                Check our FAQ
              </ThemedLink>{' '}
              for troubleshooting help.
            </ThemedInstallationHelpText>
          </div>

          {/* Quick Start section remains below tabs */}
          <div className="mt-8 sm:mt-12">
            <ThemedCard variant="terminal">
              <ThemedInstallationTitle>Quick Start</ThemedInstallationTitle>
              <div className="space-y-2">
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    <ThemedInstallationCommand>
                      krci-ai install --ide=cursor
                    </ThemedInstallationCommand>
                    <ThemedInstallationComment className="ml-4 hidden sm:inline">
                      # Install framework with IDE integration
                    </ThemedInstallationComment>
                    <div className="text-xs mt-1 sm:hidden">
                      <ThemedInstallationComment>
                        # Install framework with IDE integration
                      </ThemedInstallationComment>
                    </div>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() => copyToClipboard('krci-ai install --ide=cursor', 'quickstart-1')}
                    className="flex-shrink-0"
                    aria-label="Copy install command"
                  >
                    {copiedCommand === 'quickstart-1' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    <ThemedInstallationCommand>krci-ai validate</ThemedInstallationCommand>
                    <ThemedInstallationComment className="ml-4 hidden sm:inline">
                      # Validate your agent configurations
                    </ThemedInstallationComment>
                    <div className="text-xs mt-1 sm:hidden">
                      <ThemedInstallationComment>
                        # Validate your agent configurations
                      </ThemedInstallationComment>
                    </div>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() => copyToClipboard('krci-ai validate', 'quickstart-2')}
                    className="flex-shrink-0"
                    aria-label="Copy validate command"
                  >
                    {copiedCommand === 'quickstart-2' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    <ThemedInstallationCommand>krci-ai bundle --agent po</ThemedInstallationCommand>
                    <ThemedInstallationComment className="ml-4 hidden sm:inline">
                      # Create PO context-aware bundle for web chat tools
                    </ThemedInstallationComment>
                    <div className="text-xs mt-1 sm:hidden">
                      <ThemedInstallationComment>
                        # Create PO context-aware bundle for web chat tools
                      </ThemedInstallationComment>
                    </div>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() => copyToClipboard('krci-ai bundle --agent po', 'quickstart-3')}
                    className="flex-shrink-0"
                    aria-label="Copy bundle command"
                  >
                    {copiedCommand === 'quickstart-3' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    <ThemedInstallationCommand>krci-ai list agents</ThemedInstallationCommand>
                    <ThemedInstallationComment className="ml-4 hidden sm:inline">
                      # List available agents
                    </ThemedInstallationComment>
                    <div className="text-xs mt-1 sm:hidden">
                      <ThemedInstallationComment># List available agents</ThemedInstallationComment>
                    </div>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() => copyToClipboard('krci-ai list agents', 'quickstart-4')}
                    className="flex-shrink-0"
                    aria-label="Copy list agents command"
                  >
                    {copiedCommand === 'quickstart-4' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
                <ThemedInstallationCodeBlock>
                  <div className="flex-1 mr-2">
                    <ThemedInstallationCommand>krci-ai install --all</ThemedInstallationCommand>
                    <ThemedInstallationComment className="ml-4 hidden sm:inline">
                      # Install with all IDE integrations
                    </ThemedInstallationComment>
                    <div className="text-xs mt-1 sm:hidden">
                      <ThemedInstallationComment>
                        # Install with all IDE integrations
                      </ThemedInstallationComment>
                    </div>
                  </div>
                  <ThemedButton
                    size="sm"
                    variant="copy"
                    onClick={() => copyToClipboard('krci-ai install --all', 'quickstart-5')}
                    className="flex-shrink-0"
                    aria-label="Copy install all command"
                  >
                    {copiedCommand === 'quickstart-5' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </ThemedButton>
                </ThemedInstallationCodeBlock>
              </div>
            </ThemedCard>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <ThemedBackground variant="section" className="py-20 px-4 -mx-4">
          <div className="container mx-auto max-w-6xl">
            <ThemedHeading level={2} variant="section" className="text-center mb-12">
              How It Works
            </ThemedHeading>

            {/* Framework Philosophy */}
            <div className="text-center mb-16">
              <ThemedPhilosophyText>
                <ThemedPhilosophyHighlight>AI-as-Code methodology</ThemedPhilosophyHighlight> for
                development teams. Define AI agents in simple Markdown files that live with your
                codebase, understand your project context, and follow structured SDLC workflows.
              </ThemedPhilosophyText>
            </div>

            {/* Three Core Pillars */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <ThemedCard
                variant="highlight"
                className="border-cyan-500/30 hover:border-cyan-400/60"
              >
                <div className="p-6 text-center">
                  <ThemedPillarIcon>
                    <PencilLine
                      className="w-12 h-12 text-cyan-400"
                      aria-label="No-code markdown and YAML approach"
                    />
                  </ThemedPillarIcon>
                  <ThemedPillarTitle>No-Code Simplicity</ThemedPillarTitle>
                  <ThemedPillarDescription>
                    Define agents using familiar{' '}
                    <ThemedPillarHighlight className="text-cyan-700 dark:text-cyan-300">
                      Markdown + YAML
                    </ThemedPillarHighlight>{' '}
                    format. No complex coding required—just structured documentation that agents
                    understand.
                  </ThemedPillarDescription>
                </div>
              </ThemedCard>

              <ThemedCard
                variant="highlight"
                className="border-green-500/30 hover:border-green-400/60"
              >
                <div className="p-6 text-center">
                  <ThemedPillarIcon>
                    <Users
                      className="w-12 h-12 text-green-400"
                      aria-label="Human-centered AI assistance"
                    />
                  </ThemedPillarIcon>
                  <ThemedPillarTitle>Human-Centered</ThemedPillarTitle>
                  <ThemedPillarDescription>
                    <ThemedPillarHighlight className="text-green-700 dark:text-green-300">
                      Agents assist, don&apos;t replace
                    </ThemedPillarHighlight>{' '}
                    developers. Human-in-the-loop design ensures you stay in control of all
                    decisions.
                  </ThemedPillarDescription>
                </div>
              </ThemedCard>

              <ThemedCard
                variant="highlight"
                className="border-purple-500/30 hover:border-purple-400/60"
              >
                <div className="p-6 text-center">
                  <ThemedPillarIcon>
                    <GitBranch
                      className="w-12 h-12 text-purple-400"
                      aria-label="Version-controlled codebase integration"
                    />
                  </ThemedPillarIcon>
                  <ThemedPillarTitle>Version-Controlled</ThemedPillarTitle>
                  <ThemedPillarDescription>
                    Agents{' '}
                    <ThemedPillarHighlight className="text-purple-700 dark:text-purple-300">
                      live in your codebase
                    </ThemedPillarHighlight>
                    , understand your patterns, and evolve with your project through Git version
                    control.
                  </ThemedPillarDescription>
                </div>
              </ThemedCard>
            </div>

            {/* SDLC Workflow */}
            <div className="mb-20">
              <ThemedWorkflowTitle>Structured SDLC Workflow</ThemedWorkflowTitle>
              <ThemedCard variant="terminal" className="p-8">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-4">
                  <ThemedWorkflowStep>
                    <Brain
                      className="w-10 h-10 text-blue-400 mb-2"
                      aria-label="Initial idea generation"
                    />
                    <ThemedWorkflowStepLabel>Idea</ThemedWorkflowStepLabel>
                    <ThemedWorkflowStepDescription>Concept</ThemedWorkflowStepDescription>
                  </ThemedWorkflowStep>
                  <ThemedWorkflowArrow>→</ThemedWorkflowArrow>
                  <ThemedWorkflowStep>
                    <Presentation
                      className="w-10 h-10 text-cyan-400 mb-2"
                      aria-label="Project brief creation"
                    />
                    <ThemedWorkflowStepLabel>Brief</ThemedWorkflowStepLabel>
                    <ThemedWorkflowStepDescription>Vision</ThemedWorkflowStepDescription>
                  </ThemedWorkflowStep>
                  <ThemedWorkflowArrow>→</ThemedWorkflowArrow>
                  <ThemedWorkflowStep>
                    <FileText
                      className="w-10 h-10 text-purple-400 mb-2"
                      aria-label="Product requirements document"
                    />
                    <ThemedWorkflowStepLabel>PRD</ThemedWorkflowStepLabel>
                    <ThemedWorkflowStepDescription>Requirements</ThemedWorkflowStepDescription>
                  </ThemedWorkflowStep>
                  <ThemedWorkflowArrow>→</ThemedWorkflowArrow>
                  <ThemedWorkflowStep>
                    <Zap
                      className="w-10 h-10 text-yellow-400 mb-2"
                      aria-label="Epic feature definition"
                    />
                    <ThemedWorkflowStepLabel>Epic</ThemedWorkflowStepLabel>
                    <ThemedWorkflowStepDescription>Features</ThemedWorkflowStepDescription>
                  </ThemedWorkflowStep>
                  <ThemedWorkflowArrow>→</ThemedWorkflowArrow>
                  <ThemedWorkflowStep>
                    <NotebookText
                      className="w-10 h-10 text-cyan-400 mb-2"
                      aria-label="User story creation"
                    />
                    <ThemedWorkflowStepLabel>Story</ThemedWorkflowStepLabel>
                    <ThemedWorkflowStepDescription>User Needs</ThemedWorkflowStepDescription>
                  </ThemedWorkflowStep>
                  <ThemedWorkflowArrow>→</ThemedWorkflowArrow>
                  <ThemedWorkflowStep>
                    <Code
                      className="w-10 h-10 text-green-400 mb-2"
                      aria-label="Code implementation"
                    />
                    <ThemedWorkflowStepLabel>Code</ThemedWorkflowStepLabel>
                    <ThemedWorkflowStepDescription>Implementation</ThemedWorkflowStepDescription>
                  </ThemedWorkflowStep>
                </div>
                <ThemedWorkflowDescription>
                  <ThemedWorkflowHighlight>
                    {FRAMEWORK_METRICS.AGENTS.DESCRIPTION}
                  </ThemedWorkflowHighlight>{' '}
                  guide you through proven agile workflows, ensuring consistent quality from initial
                  idea to delivered code.
                </ThemedWorkflowDescription>
              </ThemedCard>
            </div>

            {/* Two Integration Paths */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* IDE Integration */}
              <ThemedCard variant="highlight" className="border-cyan-500/30">
                <div className="p-6">
                  <div className="text-center mb-4">
                    <Code
                      className="w-12 h-12 text-cyan-400 mb-3 mx-auto"
                      aria-label="IDE integration workflow"
                    />
                    <ThemedIntegrationTitle>IDE Integration</ThemedIntegrationTitle>
                    <ThemedIntegrationSubtitle className="text-cyan-600 dark:text-cyan-300/80">
                      Native workflow in your editor
                    </ThemedIntegrationSubtitle>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <ShieldCheck className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <ThemedIntegrationListItem>
                        Cross-IDE compatible (Cursor, Claude Code, VS Code, JetBrains)
                      </ThemedIntegrationListItem>
                    </div>
                    <div className="flex items-start">
                      <Blocks className="w-4 h-4 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                      <ThemedIntegrationListItem>
                        No plugins required—agents read Markdown files directly
                      </ThemedIntegrationListItem>
                    </div>
                    <div className="flex items-start">
                      <GitBranch className="w-4 h-4 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                      <ThemedIntegrationListItem>
                        Context-aware: agents understand your project structure
                      </ThemedIntegrationListItem>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-700/30">
                    <ThemedIntegrationCommand>
                      krci-ai install --ide=cursor
                    </ThemedIntegrationCommand>
                  </div>
                </div>
              </ThemedCard>

              {/* Web Chat Bundles */}
              <ThemedCard variant="highlight" className="border-green-500/30">
                <div className="p-6">
                  <div className="text-center mb-4">
                    <Globe
                      className="w-12 h-12 text-green-400 mb-3 mx-auto"
                      aria-label="Web chat bundle creation"
                    />
                    <ThemedIntegrationTitle>Web Chat Bundles</ThemedIntegrationTitle>
                    <ThemedIntegrationSubtitle className="text-green-600 dark:text-green-300/80">
                      Portable context for any AI tool
                    </ThemedIntegrationSubtitle>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <MessageCircle className="w-4 h-4 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                      <ThemedIntegrationListItem>
                        Works with ChatGPT, Claude Web, Gemini Pro
                      </ThemedIntegrationListItem>
                    </div>
                    <div className="flex items-start">
                      <Copy className="w-4 h-4 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <ThemedIntegrationListItem>
                        Paste-ready bundles with complete project context
                      </ThemedIntegrationListItem>
                    </div>
                    <div className="flex items-start">
                      <ShieldCheck className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <ThemedIntegrationListItem>
                        Validated packages ensure reliable AI interactions
                      </ThemedIntegrationListItem>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-700/30">
                    <ThemedIntegrationCommand>krci-ai bundle --agent po</ThemedIntegrationCommand>
                  </div>
                </div>
              </ThemedCard>
            </div>

            {/* Context Engineering */}
            <div className="mt-16 text-center">
              <ThemedContextEngineeringBox>
                <ThemedContextEngineeringTitle>
                  Context Engineering vs Static Prompting
                </ThemedContextEngineeringTitle>
                <ThemedContextEngineeringText>
                  Instead of static prompts that ignore your project, KubeRocketAI agents use
                  <ThemedContextEngineeringHighlight variant="primary">
                    {' '}
                    dynamic context engineering
                  </ThemedContextEngineeringHighlight>
                  —reading your codebase structure, existing patterns, and{' '}
                  <ThemedContextEngineeringHighlight variant="secondary">
                    simple validation rules
                  </ThemedContextEngineeringHighlight>{' '}
                  to provide intelligent, project-aware assistance that reduces token usage and
                  improves accuracy.
                </ThemedContextEngineeringText>
              </ThemedContextEngineeringBox>
            </div>
          </div>
        </ThemedBackground>
      </section>

      {/* FAQ Preview */}
      <FAQPreview />

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <ThemedHeading level={2} variant="section" className="mb-6">
            Ready to Transform Your AI Workflow?
          </ThemedHeading>
          <ThemedText variant="muted" size="xl" className="mb-6 block">
            Join the next evolution of DevOps practices. Start managing your AI agents like
            infrastructure.
          </ThemedText>
          <ThemedText variant="muted" size="sm" className="mb-8 block">
            Questions about implementation or adoption?{' '}
            <ThemedLink href="/faq" variant="primary">
              View our FAQ
            </ThemedLink>{' '}
            for detailed answers.
          </ThemedText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton
              variant="primary"
              size="lg"
              className="px-8 transform hover:scale-105"
              asChild
            >
              <a href="/quickstart">
                <Terminal className="w-4 h-4 mr-2" aria-hidden="true" />
                Get Started Now
              </a>
            </ThemedButton>
            <ThemedButton variant="outline" size="lg" className="" asChild>
              <a
                href={GITHUB_REPO_URL_EXPORT}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View KubeRocketAI on GitHub (opens in a new tab)"
              >
                <GitHubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                View on GitHub
              </a>
            </ThemedButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />
    </ThemedBackground>
  );
}
