'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FRAMEWORK_METRICS } from '@/lib/constants';
import { Terminal, GitBranch, Users, FileText, Settings, Layers, Network } from 'lucide-react';
import { DiagramCarousel } from '@/components/ui/diagram-carousel';
import Link from 'next/link';
import Image from 'next/image';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';

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

    Note over Stakeholder: Initial Business Idea

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
    note for Data "REFERENCE<br/>Knowledge & Constraints<br/>Level 4: + Knowledge"`,
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
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      <SharedHeader currentPage="architecture" />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-900/30 text-blue-300 border-blue-700">
            System Architecture
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-cyan-300 to-green-300 bg-clip-text text-transparent">
            SDLC Framework
            <br />
            <span className="text-5xl md:text-7xl">Architecture</span>
          </h1>

          <p className="text-xl text-slate-300/80 mb-8 max-w-2xl mx-auto">
            Understand how KubeRocketAI implements AI-as-Code principles for scalable,
            version-controlled AI agent management across development teams.
          </p>

          {/* Core Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {coreComponents.map((component, index) => (
              <Card
                key={index}
                className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors"
              >
                <CardContent className="p-4 text-center">
                  <div className="text-cyan-400 mb-2 flex justify-center">{component.icon}</div>
                  <div className="text-2xl font-bold text-green-300 mb-1">{component.count}</div>
                  <div className="text-sm font-semibold text-slate-200 mb-1">{component.title}</div>
                  <div className="text-xs text-slate-400">{component.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
            System Architecture Overview
          </h2>

          <div className="space-y-6">
            {architectureLayers.map((layer, index) => (
              <Card
                key={index}
                className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-300 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold flex items-center justify-center mr-3">
                        {layer.layer}
                      </div>
                      {layer.title}
                    </CardTitle>
                    <Layers className="w-6 h-6 text-cyan-400" />
                  </div>
                  <p className="text-slate-400 ml-11">{layer.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-3">
                    {layer.components.map((component, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-900 border border-green-700/30 rounded p-3 text-center"
                      >
                        <div className="text-green-400 text-sm font-mono">{component}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Relations */}
      <section id="agent-relations" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Agent Relations Table */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-green-400">
              SDLC Base Agents Relations & Responsibilities
            </h3>

            <Card className="bg-black/50 border-green-700/30">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-green-700/30">
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Agent</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">
                          Primary Responsibilities
                        </th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">
                          Collaborates With
                        </th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Outputs</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">pm</td>
                        <td className="py-3 px-4 font-semibold">Product Manager</td>
                        <td className="py-3 px-4">Strategy, requirements, stakeholder alignment</td>
                        <td className="py-3 px-4 text-blue-300">PO, BA, Architect</td>
                        <td className="py-3 px-4 text-purple-300">
                          Project briefs, PRDs, roadmaps
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">po</td>
                        <td className="py-3 px-4 font-semibold">Product Owner</td>
                        <td className="py-3 px-4">
                          User stories, backlog management, acceptance criteria
                        </td>
                        <td className="py-3 px-4 text-blue-300">PM, BA, Dev, QA</td>
                        <td className="py-3 px-4 text-purple-300">User stories, backlog items</td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">ba</td>
                        <td className="py-3 px-4 font-semibold">Business Analyst</td>
                        <td className="py-3 px-4">
                          Requirements gathering, process analysis, documentation
                        </td>
                        <td className="py-3 px-4 text-blue-300">PM, PO, Architect</td>
                        <td className="py-3 px-4 text-purple-300">
                          Requirements docs, process flows
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">architect</td>
                        <td className="py-3 px-4 font-semibold">Software Architect</td>
                        <td className="py-3 px-4">
                          System design, architecture decisions, tech standards
                        </td>
                        <td className="py-3 px-4 text-blue-300">PM, BA, Dev</td>
                        <td className="py-3 px-4 text-purple-300">
                          Architecture docs, design patterns
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">dev</td>
                        <td className="py-3 px-4 font-semibold">Developer</td>
                        <td className="py-3 px-4">
                          Implementation, code review, technical solutions
                        </td>
                        <td className="py-3 px-4 text-blue-300">Architect, PO, QA</td>
                        <td className="py-3 px-4 text-purple-300">
                          Code, components, technical docs
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">qa</td>
                        <td className="py-3 px-4 font-semibold">QA Engineer</td>
                        <td className="py-3 px-4">
                          Testing strategy, quality assurance, validation
                        </td>
                        <td className="py-3 px-4 text-blue-300">PO, Dev, PM</td>
                        <td className="py-3 px-4 text-purple-300">Test plans, quality reports</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SDLC Process Overview */}
      <section id="sdlc-workflow" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">
            From Idea to Code: SDLC Agent Workflow
          </h2>

          {/* SDLC Diagrams Carousel */}
          <div className="mb-12">
            <DiagramCarousel slides={diagramSlides} />
          </div>
        </div>
      </section>

      {/* Supported IDEs */}
      <section id="supported-ides" className="py-16 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">Supported IDEs</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-cyan-400 mb-2 flex justify-center">
                  <Image
                    src="/icons/ides/cursor.webp"
                    alt="Cursor IDE"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">Cursor</div>
                <div className="text-xs text-slate-400">AI-native IDE</div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-cyan-400 mb-2 flex justify-center">
                  <Image
                    src="/icons/ides/windsurf.svg"
                    alt="Windsurf IDE"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">Windsurf</div>
                <div className="text-xs text-slate-400">AI-first IDE</div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-cyan-400 mb-2 flex justify-center">
                  <Image
                    src="/icons/ides/copilot.png"
                    alt="GitHub Copilot"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">Copilot</div>
                <div className="text-xs text-slate-400">GitHub AI assistant</div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-cyan-400 mb-2 flex justify-center">
                  <Image
                    src="/icons/ides/claude.ico"
                    alt="Claude Code"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">Claude Code</div>
                <div className="text-xs text-slate-400">Web-based AI IDE</div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors cursor-pointer group">
              <CardContent className="p-4 text-center">
                <div className="text-cyan-400 mb-2 flex justify-center">
                  <div className="w-8 h-8 border-2 border-dashed border-cyan-400/50 rounded flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                    <span className="text-2xl text-cyan-400/70 group-hover:text-cyan-400 transition-colors">
                      +
                    </span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">Your IDE</div>
                <div className="text-xs text-slate-400">Add your favorite</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">Ready to Explore?</h2>
          <p className="text-lg text-green-300/80 mb-8">
            Dive deeper into the framework or start building with the quickstart guide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quickstart">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold px-8"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Quick Start Guide
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-green-500 text-green-300 hover:bg-green-900/20 hover:text-green-100 bg-transparent"
              asChild
            >
              <a
                href="https://github.com/KubeRocketCI/kuberocketai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View KubeRocketAI source code on GitHub (opens in a new tab)"
              >
                <GitBranch className="w-4 h-4 mr-2" aria-hidden="true" />
                View Source Code
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />
    </div>
  );
}
