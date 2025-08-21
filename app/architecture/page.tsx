"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Shield, GitBranch, Users, FileText, Settings, Layers, Zap, Database, Network } from "lucide-react"
import Link from "next/link"
import { SharedHeader } from "@/components/shared-header"


export default function ArchitecturePage() {

  // Data
  const coreComponents = [
    {
      icon: <Users className="w-8 h-8" aria-label="Users icon representing the 7 SDLC agent personas" />,
      title: "SDLC Agents",
      count: "7",
      description: "Pre-configured agent personas covering complete software development lifecycle",
      details: ["Product Manager", "Product Owner", "Business Analyst", "Software Architect", "Developer", "QA Engineer"]
    },
    {
      icon: <FileText className="w-8 h-8" aria-label="Document icon representing framework rules and templates" />,
      title: "Framework Rules",
      count: "30+",
      description: "Reusable, extendable SDLC framework rules and templates",
      details: ["Task Templates", "Documentation Patterns", "Code Standards", "Review Processes"]
    },
    {
      icon: <Settings className="w-8 h-8" aria-label="Settings icon representing CLI command interface" />,
      title: "CLI Commands",
      count: "10+",
      description: "Comprehensive command-line interface for agent management",
      details: ["Install & Setup", "Validation", "Bundling", "Token Analysis"]
    },
    {
      icon: <Network className="w-8 h-8" aria-label="Network icon representing universal IDE integration" />,
      title: "IDE Integration",
      count: "Universal",
      description: "Works across all AI-powered IDEs without plugins",
      details: ["Claude Code", "Cursor", "GitHub Copilot", "Any AI IDE"]
    }
  ]

  const architectureLayers = [
    {
      layer: "1",
      title: "User Interface Layer",
      description: "IDE integration and command-line interface",
      components: ["Claude Code Commands", "Cursor Integration", "CLI Tools", "Web Bundles"]
    },
    {
      layer: "2",
      title: "Agent Management Layer",
      description: "AI agent orchestration and persona management",
      components: ["Agent Router", "Persona Loader", "Context Manager", "Command Parser"]
    },
    {
      layer: "3",
      title: "Framework Rules Layer",
      description: "SDLC framework rules and templates",
      components: ["Task Templates", "Documentation Rules", "Code Standards", "Process Guidelines"]
    },
    {
      layer: "4",
      title: "Data & Storage Layer",
      description: "Version-controlled configurations and project context",
      components: ["Git Repository", "Configuration Files", "Project Context", "Agent Definitions"]
    }
  ]



  return (
    <div className="min-h-screen bg-black text-slate-200 font-mono">
      <SharedHeader currentPage="architecture" />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-900/30 text-blue-300 border-blue-700">System Architecture</Badge>

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
              <Card key={index} className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
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
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">System Architecture Overview</h2>

          <div className="space-y-6">
            {architectureLayers.map((layer, index) => (
              <Card key={index} className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-all duration-300">
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
                      <div key={idx} className="bg-gray-900 border border-green-700/30 rounded p-3 text-center">
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
            <h3 className="text-2xl font-bold text-center mb-8 text-green-400">SDLC Base Agents Relations & Responsibilities</h3>

            <Card className="bg-black/50 border-green-700/30">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-green-700/30">
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Agent</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Primary Responsibilities</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Collaborates With</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Outputs</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">pm</td>
                        <td className="py-3 px-4 font-semibold">Product Manager</td>
                        <td className="py-3 px-4">Strategy, requirements, stakeholder alignment</td>
                        <td className="py-3 px-4 text-blue-300">PO, BA, Architect</td>
                        <td className="py-3 px-4 text-purple-300">Project briefs, PRDs, roadmaps</td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">po</td>
                        <td className="py-3 px-4 font-semibold">Product Owner</td>
                        <td className="py-3 px-4">User stories, backlog management, acceptance criteria</td>
                        <td className="py-3 px-4 text-blue-300">PM, BA, Dev, QA</td>
                        <td className="py-3 px-4 text-purple-300">User stories, backlog items</td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">ba</td>
                        <td className="py-3 px-4 font-semibold">Business Analyst</td>
                        <td className="py-3 px-4">Requirements gathering, process analysis, documentation</td>
                        <td className="py-3 px-4 text-blue-300">PM, PO, Architect</td>
                        <td className="py-3 px-4 text-purple-300">Requirements docs, process flows</td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">architect</td>
                        <td className="py-3 px-4 font-semibold">Software Architect</td>
                        <td className="py-3 px-4">System design, architecture decisions, tech standards</td>
                        <td className="py-3 px-4 text-blue-300">PM, BA, Dev</td>
                        <td className="py-3 px-4 text-purple-300">Architecture docs, design patterns</td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">dev</td>
                        <td className="py-3 px-4 font-semibold">Developer</td>
                        <td className="py-3 px-4">Implementation, code review, technical solutions</td>
                        <td className="py-3 px-4 text-blue-300">Architect, PO, QA</td>
                        <td className="py-3 px-4 text-purple-300">Code, components, technical docs</td>
                      </tr>
                      <tr className="hover:bg-gray-800/20">
                        <td className="py-3 px-4 font-mono text-green-400">qa</td>
                        <td className="py-3 px-4 font-semibold">QA Engineer</td>
                        <td className="py-3 px-4">Testing strategy, quality assurance, validation</td>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">From Idea to Code: SDLC Agent Workflow</h2>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-black/50 border-blue-700/30 hover:border-blue-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Ideation Phase</h3>
                <p className="text-sm text-slate-400">Initial business needs identified and scoped by Product Manager</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-green-700/30 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🔨</div>
                <h3 className="text-lg font-semibold text-green-300 mb-2">Development Phase</h3>
                <p className="text-sm text-slate-400">Architects design, Developers implement, QA validates quality</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-700/30 hover:border-purple-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Delivery Phase</h3>
                <p className="text-sm text-slate-400">MVP delivered with complete documentation and deployment</p>
              </CardContent>
            </Card>
          </div>


        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">Design Principles</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black/50 border-green-700/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  AI-as-Code
                </h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Version-controlled agent definitions in Git
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Declarative configuration management
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Reproducible deployments across environments
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Audit trails and change tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-blue-700/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Universal Compatibility
                </h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    No IDE plugins required - works everywhere
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Single binary deployment model
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Cross-platform support (macOS, Linux, Windows)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Lightweight, fast installation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-700/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Project-Aware Context
                </h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Automatic project structure understanding
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Code pattern recognition and adherence
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Team convention enforcement
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    Dynamic context injection
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-cyan-700/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Enterprise Ready
                </h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Built-in validation and consistency checks
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Token usage analysis and optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Security-first design principles
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Scalable team collaboration
                  </li>
                </ul>
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
              <Button size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold px-8">
                <Terminal className="w-4 h-4 mr-2" />
                Quick Start Guide
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-green-500 text-green-300 hover:bg-green-900/20 hover:text-green-100 bg-transparent"
              onClick={() => window.open('https://github.com/KubeRocketCI/kuberocketai', '_blank')}
            >
              <GitBranch className="w-4 h-4 mr-2" />
              View Source Code
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-900/30 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="text-lg font-bold text-green-400">KubeRocketAI</span>
          </div>
          <p className="text-green-300/60 text-sm">🏗️ Built for scale, designed for developers</p>
          <p className="text-green-300/40 text-xs mt-2">AI-as-Code architecture for modern development teams</p>
        </div>
      </footer>
    </div>
  )
}
