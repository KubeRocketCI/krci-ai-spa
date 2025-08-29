'use client';

import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedCard } from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { ThemedLink } from '@/components/ui/themed-link';
import { FRAMEWORK_METRICS } from '@/lib/constants';
import { Terminal, GitBranch, Users, FileText, Settings, Network } from 'lucide-react';
import { DiagramCarousel } from '@/components/ui/diagram-carousel';
import Image from 'next/image';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import { FAQPreview } from '@/components/faq/faq-preview';
import { getArchitectureFAQs } from '@/lib/faq-data';
import { ThemedHeading } from '@/components/ui/themed-heading';
import { ThemedBackground } from '@/components/ui/themed-background';
import {
  ThemedArchitectureLayer,
  ThemedComponentStat,
  ThemedArchitectureTable,
  ThemedTableRow,
  ThemedTableCell,
  ThemedSectionBackground,
} from '@/components/ui/themed-architecture';

export default function ArchitecturePage() {
  // Diagram data for carousel
  const diagramSlides = [
    {
      id: 'artifacts-dependency',
      title: 'SDLC Artifacts Dependency Flow',
      description:
        'How artifacts depend on each other, forming a clear hierarchy from vision to implementation',
      badge: 'Artifact Flow',
      zoom: 1.25,
      diagram: `graph TD
    Idea([💡 Idea]) --> Brief[📄 Project Brief<br/>Vision & Strategy]
    Brief --> PRD[📋 PRD<br/>Product Requirements]
    PRD --> Epic[🎯 Epic<br/>High-level Feature]
    Epic --> Story[📖 Story<br/>User Requirement<br/>+ Implementation Tasks<br/>+ Deployment Info]

    PRD --> Arch[🏗️ Architecture<br/>System Design]
    Epic --> Arch
    Story --> Code[💻 Code<br/>Implementation<br/>+ Deployment Config]
    Arch --> Code

    Code --> Test[🧪 Test Result<br/>Quality Validation]
    Story --> Test

    Code --> MVP[🎉 MVP Delivered]
    Test --> MVP

    style Idea fill:#e1f5fe,stroke:#22d3ee,color:#000
    style Brief fill:#f0e68c,stroke:#eab308,color:#000
    style PRD fill:#f3e5f5,stroke:#a855f7,color:#000
    style Epic fill:#e8f5e8,stroke:#10b981,color:#000
    style Story fill:#fff3e0,stroke:#f59e0b,color:#000
    style Arch fill:#e0f2f1,stroke:#06b6d4,color:#000
    style Code fill:#f1f8e9,stroke:#22c55e,color:#000
    style Test fill:#fff9c4,stroke:#facc15,color:#000
    style MVP fill:#ffebee,stroke:#ef4444,color:#000`,
    },
    {
      id: 'business-process-flow',
      title: 'Business Process Flow',
      description: 'Role-based collaboration flow showing how teams work together through the SDLC',
      badge: 'Team Flow',
      zoom: 1.25,
      diagram: `flowchart TD
    Idea([Idea]) -->|Market Research| PM[Product Manager]
    PM -->|PRD| BA[Business Analyst]
    BA -->|Refined PRD| PO[Product Owner]
    PM -->|Roadmap + Vision| PO
    BA -.Draft Epics.-> Arch[Architect]
    PO -->|Epics + Stories| Arch
    PO -->|Prioritized Backlog| Dev[Developer]
    Arch -->|Architecture Documents| Dev
    Dev -->|Code + Pull Requests| QA[QA Engineer]
    QA -->|Test Results| Dev
    QA -->|Test Validation| DevOps[DevOps Engineer]
    DevOps -->|CI/CD + Infrastructure| MVP([MVP Delivered])
    MVP -->|Feedback| PO
    MVP -->|Feedback + Metrics| PM

    style Idea fill:#e1f5fe,stroke:#22d3ee,color:#000
    style PM fill:#f0e68c,stroke:#eab308,color:#000
    style BA fill:#f3e5f5,stroke:#a855f7,color:#000
    style PO fill:#e8f5e8,stroke:#10b981,color:#000
    style Arch fill:#e0f2f1,stroke:#06b6d4,color:#000
    style Dev fill:#f1f8e9,stroke:#22c55e,color:#000
    style QA fill:#fff9c4,stroke:#facc15,color:#000
    style DevOps fill:#ffebee,stroke:#ef4444,color:#000
    style MVP fill:#e1f5fe,stroke:#22d3ee,color:#000`,
    },
    {
      id: 'artifact-sequence',
      title: 'Artifact Transfer Sequence',
      description:
        'Detailed sequence showing how artifacts are created and transferred between roles',
      badge: 'Sequence Flow',
      scale: 'compact' as const,
      diagram: `sequenceDiagram
    participant Stakeholder
    participant PM as Product Manager
    participant BA as Business Analyst
    participant PO as Product Owner
    participant Arch as Architect
    participant Dev as Developer
    participant QA as QA Engineer

    Note over Stakeholder: Initial Business Idea√

    Stakeholder->>PM: Business Idea & Market Opportunity
    PM->>PM: Market Research & Analysis
    PM->>PM: Create Project Brief

    PM->>PM: Create PRD (based on Project Brief)
    PM->>BA: PRD for Analysis
    BA->>BA: Refine PRD with Detailed Requirements
    BA->>PO: Refined PRD

    PO->>PO: Create Epics (based on PRD)
    PO->>Arch: PRD + Epics for Technical Review
    Arch->>Arch: Create Architecture Documents

    PO->>PO: Create Stories (based on Epics)
    PO->>Dev: Stories + Architecture Documents

    Dev->>Dev: Implement Code (based on Stories + Architecture)
    Dev->>QA: Code + Stories for Testing

    QA->>QA: Create Test Results (based on Stories + Code)
    QA->>Dev: Test Results

    alt Tests Pass
        QA->>PM: Test Results (Success)
        Note over PM: MVP Ready for Delivery
    else Tests Fail
        QA->>Dev: Test Results (Issues Found)
        Dev->>Dev: Fix Code Issues
        Dev->>QA: Updated Code
    end`,
    },
    {
      id: 'component-relationships',
      title: 'Framework Components Relationships',
      description:
        'UML diagram showing the relationships and interactions between the four framework components',
      badge: 'Data Model',
      zoom: 2.75,
      scale: 'compact' as const,
      diagram: `classDiagram
    class Agent {
        +string name
        +string description
        +string[] principles
        +string activation_prompt
        +object commands
        +string[] tasks
    }

    class Task {
        +string task
        +string description
        +string instructions
    }

    class Template {
        +string content
        +string[] variables
    }

    class Data {
        +any content
        +string type
    }

    Agent --> Task : exposes via commands
    Agent --> Data : references behavioral
    Task --> Data : references technical
    Task --> Template : references formatting

    note for Agent "WHO<br/>Persona & Behavior<br/>Level 1: Core Identity"
    note for Task "WHAT<br/>Procedural Workflows<br/>Level 2: + Logic"
    note for Template "HOW<br/>Output Formatting<br/>Level 3: + Structure"
    note for Data "REFERENCE<br/>Knowledge & Constraints<br/>Level 4: + Knowledge"

    classDef default fill:#f9f9f9,stroke:#333,color:#000
    classDef noteStyle fill:#fff2cc,stroke:#d6b656,color:#000`,
    },
    {
      id: 'ide-integration',
      title: 'KubeRocketAI IDE Integration Flow',
      description:
        'How KubeRocketAI integrates with IDEs using declarative AI-as-Code approach without plugins',
      badge: 'IDE Integration',
      scale: 'compact' as const,
      zoom: 2.75,
      diagram: `graph TD
    Developer["👨‍💻 Developer<br/>Uses existing tools"]
    CLI["🛠️ krci-ai CLI<br/>📦 Embedded Framework Assets<br/>🔧 AI-as-Code Management"]
    IDE["🎨 AI-Powered IDE<br/>Native Integration<br/>(No plugins required)"]
    LocalFramework["📁 ./krci-ai/<br/>🔗 Declarative AI Agents<br/>📋 Extracted + Local"]
    TargetProject["💻 Target Project<br/>🔀 Git Repository"]
    GoldenRepo["🏢 Golden Source<br/>🔗 Git Repository<br/>🤖 AI-as-Code<br/>🔮 Future Enhancement"]

    Developer --> CLI
    Developer --> IDE
    CLI -->|"📦 Extract embedded assets<br/>Offline operation"| LocalFramework
    IDE -.->|"📖 Reads declarative configs<br/>Native filesystem access"| LocalFramework
    LocalFramework --> TargetProject
    GoldenRepo -.->|"🔮 Post-MVP: Remote updates<br/>Community contributions"| CLI
    TargetProject -.->|"🔄 Future: Contribute back<br/>Local customizations"| GoldenRepo

    style CLI fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#111
    style IDE fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#111
    style GoldenRepo fill:#f0f0f0,stroke:#999999,stroke-width:1px,stroke-dasharray: 5 5,color:#111
    style LocalFramework fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#111
    style Developer fill:#e8f5e8,stroke:#388e3c,stroke-width:2px,color:#111
    style TargetProject fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#111`,
    },
  ];

  // Data
  const coreComponents = [
    {
      icon: (
        <Users
          className="w-8 h-8"
          aria-label={`Users icon representing the ${FRAMEWORK_METRICS.AGENTS.DISPLAY} SDLC agent personas`}
        />
      ),
      title: 'SDLC Agents',
      count: FRAMEWORK_METRICS.AGENTS.DISPLAY,
      description: 'Pre-configured agent personas covering complete software development lifecycle',
      details: [
        'Product Manager',
        'Product Owner',
        'Business Analyst',
        'Software Architect',
        'Developer',
        'QA Engineer',
      ],
    },
    {
      icon: (
        <FileText
          className="w-8 h-8"
          aria-label="Document icon representing framework rules and templates"
        />
      ),
      title: 'Framework Rules',
      count: '30+',
      description: 'Reusable, extendable SDLC framework rules and templates',
      details: ['Task Templates', 'Documentation Patterns', 'Code Standards', 'Review Processes'],
    },
    {
      icon: (
        <Settings
          className="w-8 h-8"
          aria-label="Settings icon representing CLI command interface"
        />
      ),
      title: 'CLI Commands',
      count: '10+',
      description: 'Comprehensive command-line interface for agent management',
      details: ['Install & Setup', 'Validation', 'Bundling', 'Token Analysis'],
    },
    {
      icon: (
        <Network
          className="w-8 h-8"
          aria-label="Network icon representing universal IDE integration"
        />
      ),
      title: 'IDE Integration',
      count: 'Universal',
      description: 'Works across all AI-powered IDEs without plugins',
      details: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Any AI IDE'],
    },
  ];

  const architectureLayers = [
    {
      layer: '1',
      title: 'User Interface Layer',
      description: 'IDE integration and command-line interface',
      components: ['Claude Code Commands', 'Cursor Integration', 'CLI Tools', 'Web Bundles'],
    },
    {
      layer: '2',
      title: 'Agent Management Layer',
      description: 'AI agent orchestration and persona management',
      components: ['Agent Router', 'Persona Loader', 'Context Manager', 'Command Parser'],
    },
    {
      layer: '3',
      title: 'Framework Rules Layer',
      description: 'SDLC framework rules and templates',
      components: ['Task Templates', 'Documentation Rules', 'Code Standards', 'Process Guidelines'],
    },
    {
      layer: '4',
      title: 'Data & Storage Layer',
      description: 'Version-controlled configurations and project context',
      components: ['Git Repository', 'Configuration Files', 'Project Context', 'Agent Definitions'],
    },
  ];

  return (
    <ThemedBackground variant="main" className="min-h-screen font-sans">
      <SharedHeader currentPage="architecture" />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <ThemedBadge variant="primary" className="mb-6">
            System Architecture
          </ThemedBadge>

          <ThemedHeading level={1} variant="hero" className="mb-6">
            SDLC Framework
            <br />
            <span className="text-5xl md:text-7xl">Architecture</span>
          </ThemedHeading>

          <p className="text-xl text-slate-700/80 dark:text-slate-300/80 mb-8 max-w-2xl mx-auto">
            Understand how KubeRocketAI implements AI-as-Code principles for scalable,
            version-controlled AI agent management across development teams.
          </p>

          {/* Core Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {coreComponents.map((component, index) => (
              <ThemedComponentStat
                key={index}
                icon={component.icon}
                title={component.title}
                count={component.count}
                description={component.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <ThemedSectionBackground>
        <div className="container mx-auto max-w-6xl">
          <ThemedHeading level={2} variant="section" className="text-center mb-12">
            System Architecture Overview
          </ThemedHeading>

          <div className="space-y-6">
            {architectureLayers.map((layer, index) => (
              <ThemedArchitectureLayer
                key={index}
                layer={layer.layer}
                title={layer.title}
                description={layer.description}
                components={layer.components}
              />
            ))}
          </div>
        </div>
      </ThemedSectionBackground>

      {/* Agent Relations */}
      <section id="agent-relations" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Agent Relations Table */}
          <div>
            <ThemedHeading level={3} variant="accent" className="text-center mb-8">
              SDLC Base Agents Relations & Responsibilities
            </ThemedHeading>

            <ThemedArchitectureTable>
              <thead>
                <tr className="border-b border-emerald-200/30 dark:border-green-700/30">
                  <ThemedTableCell variant="header">Agent</ThemedTableCell>
                  <ThemedTableCell variant="header">Role</ThemedTableCell>
                  <ThemedTableCell variant="header">Primary Responsibilities</ThemedTableCell>
                  <ThemedTableCell variant="header">Collaborates With</ThemedTableCell>
                  <ThemedTableCell variant="header">Outputs</ThemedTableCell>
                </tr>
              </thead>
              <tbody>
                <ThemedTableRow>
                  <ThemedTableCell variant="agent">pm</ThemedTableCell>
                  <ThemedTableCell variant="role">Product Manager</ThemedTableCell>
                  <ThemedTableCell variant="responsibility">
                    Strategy, requirements, stakeholder alignment
                  </ThemedTableCell>
                  <ThemedTableCell variant="collaboration">PO, BA, Architect</ThemedTableCell>
                  <ThemedTableCell variant="output">Project briefs, PRDs, roadmaps</ThemedTableCell>
                </ThemedTableRow>
                <ThemedTableRow>
                  <ThemedTableCell variant="agent">po</ThemedTableCell>
                  <ThemedTableCell variant="role">Product Owner</ThemedTableCell>
                  <ThemedTableCell variant="responsibility">
                    User stories, backlog management, acceptance criteria
                  </ThemedTableCell>
                  <ThemedTableCell variant="collaboration">PM, BA, Dev, QA</ThemedTableCell>
                  <ThemedTableCell variant="output">User stories, backlog items</ThemedTableCell>
                </ThemedTableRow>
                <ThemedTableRow>
                  <ThemedTableCell variant="agent">ba</ThemedTableCell>
                  <ThemedTableCell variant="role">Business Analyst</ThemedTableCell>
                  <ThemedTableCell variant="responsibility">
                    Requirements gathering, process analysis, documentation
                  </ThemedTableCell>
                  <ThemedTableCell variant="collaboration">PM, PO, Architect</ThemedTableCell>
                  <ThemedTableCell variant="output">
                    Requirements docs, process flows
                  </ThemedTableCell>
                </ThemedTableRow>
                <ThemedTableRow>
                  <ThemedTableCell variant="agent">architect</ThemedTableCell>
                  <ThemedTableCell variant="role">Software Architect</ThemedTableCell>
                  <ThemedTableCell variant="responsibility">
                    System design, architecture decisions, tech standards
                  </ThemedTableCell>
                  <ThemedTableCell variant="collaboration">PM, BA, Dev</ThemedTableCell>
                  <ThemedTableCell variant="output">
                    Architecture docs, design patterns
                  </ThemedTableCell>
                </ThemedTableRow>
                <ThemedTableRow>
                  <ThemedTableCell variant="agent">dev</ThemedTableCell>
                  <ThemedTableCell variant="role">Developer</ThemedTableCell>
                  <ThemedTableCell variant="responsibility">
                    Implementation, code review, technical solutions
                  </ThemedTableCell>
                  <ThemedTableCell variant="collaboration">Architect, PO, QA</ThemedTableCell>
                  <ThemedTableCell variant="output">
                    Code, components, technical docs
                  </ThemedTableCell>
                </ThemedTableRow>
                <ThemedTableRow>
                  <ThemedTableCell variant="agent">qa</ThemedTableCell>
                  <ThemedTableCell variant="role">QA Engineer</ThemedTableCell>
                  <ThemedTableCell variant="responsibility">
                    Testing strategy, quality assurance, validation
                  </ThemedTableCell>
                  <ThemedTableCell variant="collaboration">PO, Dev, PM</ThemedTableCell>
                  <ThemedTableCell variant="output">Test plans, quality reports</ThemedTableCell>
                </ThemedTableRow>
              </tbody>
            </ThemedArchitectureTable>
          </div>
        </div>
      </section>

      {/* SDLC Process Overview */}
      <section id="sdlc-workflow" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <ThemedHeading level={2} variant="section" className="text-center mb-12">
            From Idea to Code: SDLC Agent Workflow
          </ThemedHeading>

          {/* SDLC Diagrams Carousel */}
          <div className="mb-12">
            <DiagramCarousel slides={diagramSlides} />
          </div>
        </div>
      </section>

      {/* Supported IDEs */}
      <ThemedSectionBackground id="supported-ides">
        <div className="container mx-auto max-w-4xl">
          <ThemedHeading level={2} variant="section" className="text-center mb-12">
            Supported IDEs
          </ThemedHeading>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <ThemedCard variant="highlight">
              <div className="p-4 text-center">
                <div className="text-cyan-600 dark:text-cyan-400 mb-2 flex justify-center">
                  <Image
                    src="/icons/ides/cursor.webp"
                    alt="Cursor IDE"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Cursor
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">AI-native IDE</div>
              </div>
            </ThemedCard>

            <ThemedCard variant="highlight">
              <div className="p-4 text-center">
                <div className="text-cyan-600 dark:text-cyan-400 mb-2 flex justify-center">
                  <Image
                    src="/icons/ides/windsurf.svg"
                    alt="Windsurf IDE"
                    width={32}
                    height={32}
                    className="w-8 h-8 brightness-0 dark:brightness-100"
                  />
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Windsurf
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">AI-first IDE</div>
              </div>
            </ThemedCard>

            <ThemedCard variant="highlight">
              <div className="p-4 text-center">
                <div className="text-cyan-600 dark:text-cyan-400 mb-2 flex justify-center">
                  <Image
                    src="/icons/ides/copilot.png"
                    alt="GitHub Copilot"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Copilot
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  GitHub AI assistant
                </div>
              </div>
            </ThemedCard>

            <ThemedCard variant="highlight">
              <div className="p-4 text-center">
                <div className="text-cyan-600 dark:text-cyan-400 mb-2 flex justify-center">
                  <Image
                    src="/icons/ides/claude.ico"
                    alt="Claude Code"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Claude Code
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Web-based AI IDE</div>
              </div>
            </ThemedCard>

            <ThemedCard variant="interactive" className="cursor-pointer group">
              <div className="p-4 text-center">
                <ThemedLink
                  href="https://github.com/KubeRocketCI/kuberocketai/issues"
                  variant="button"
                  external
                  className="block"
                >
                  <div className="text-cyan-600 dark:text-cyan-400 mb-2 flex justify-center">
                    <div className="w-8 h-8 border-2 border-dashed border-cyan-600/50 dark:border-cyan-400/50 rounded flex items-center justify-center group-hover:border-cyan-600 dark:group-hover:border-cyan-400 transition-colors">
                      <span className="text-2xl text-cyan-600/70 dark:text-cyan-400/70 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        +
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Your IDE
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Add your favorite
                  </div>
                </ThemedLink>
              </div>
            </ThemedCard>
          </div>
        </div>
      </ThemedSectionBackground>

      {/* Getting Started */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <ThemedHeading level={2} variant="section" className="mb-6">
            Ready to Explore?
          </ThemedHeading>
          <p className="text-lg text-slate-700 dark:text-green-300/80 mb-8">
            Dive deeper into the framework or start building with the quickstart guide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton
              variant="primary"
              size="lg"
              className="px-8 transform hover:scale-105"
              asChild
            >
              <a href="/quickstart">
                <Terminal className="w-4 h-4 mr-2" />
                Quick Start Guide
              </a>
            </ThemedButton>
            <ThemedButton variant="outline" size="lg" className="" asChild>
              <ThemedLink
                href="https://github.com/KubeRocketCI/kuberocketai"
                variant="button"
                external
                aria-label="View KubeRocketAI source code on GitHub (opens in a new tab)"
              >
                <GitBranch className="w-4 h-4 mr-2" aria-hidden="true" />
                View Source Code
              </ThemedLink>
            </ThemedButton>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQPreview faqs={getArchitectureFAQs()} />

      {/* Footer */}
      <SharedFooter />
    </ThemedBackground>
  );
}
