"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Terminal, Code, Shield, GitBranch, Users, Clock, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

// Constants
const INSTALL_COMMANDS = {
  macos: "brew tap KubeRocketCI/homebrew-tap && brew install krci-ai",
  linux: `curl -L "https://github.com/KubeRocketCI/kuberocketai/releases/latest/download/krci-ai_Linux_x86_64.tar.gz" | tar -xz
chmod +x krci-ai && sudo mv krci-ai /usr/local/bin/`,
  quickstart: [
    { cmd: "krci-ai install --ide=claude", desc: "Install framework with IDE integration" },
    { cmd: "krci-ai list agents", desc: "See available agents" },
    { cmd: "/pm", desc: "Start with Product Manager persona in IDE" },
    { cmd: "krci-ai validate", desc: "Validate your installation" },
    { cmd: "krci-ai bundle --all --output project-context.md", desc: "Create web chat bundle" }
  ]
}

export default function QuickStartPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Helper functions
  const copyToClipboard = async (text: string, command: string): Promise<void> => {
    await navigator.clipboard.writeText(text)
    setCopiedCommand(command)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const toggleStepComplete = (stepIndex: number): void => {
    setCompletedSteps(prev =>
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    )
  }

  // Data
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "3 Minutes",
      description: "From install to first agent",
      highlight: "3min"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "6 Agents",
      description: "Complete SDLC team ready",
      highlight: "6"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Validation",
      description: "Built-in configuration checks",
      highlight: "✓"
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Version Control",
      description: "Agent definitions in Git",
      highlight: "Git"
    }
  ]

  const quickstartSteps = [
    {
      step: "1",
      title: "Install Framework",
      time: "20 seconds",
      description: "Get KubeRocketAI CLI with IDE integration",
      command: "krci-ai install --ide=claude",
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
ℹ️   • Claude Code commands installed to: .claude/commands/krci-ai/`
    },
    {
      step: "2",
      title: "Meet Your Team",
      time: "10 seconds",
      description: "Discover available AI agents and their roles",
      command: "krci-ai list agents",
      output: `✅ Found 6 agent(s):

Name         | Role               | Description
------------ | ------------------ | -----------------------------------
architect    | Software Architect | Software architect specializing in system design and architecture guidance
ba           | Business Analyst   | Business analyst specializing in requirements gathering...
dev          | Software Developer | Software Developer for implementation and code assistance
pm           | Product Manager    | Product manager specializing in product strategy, requirements...
po           | Product Owner      | Product owner specializing in user story creation and agile...
qa           | QA Engineer        | Quality assurance engineer specializing in testing strategy, test...

ℹ️ Use 'krci-ai list agents -v' for dependency table showing tasks, templates, and data`
    },
            {
      step: "3",
      title: "Start Your First Project",
      time: "2 minutes",
      description: "Use the developer agent in Claude Code",
      command: "claude .",
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

What would you like to work on today?`
    },
    {
      step: "4",
      title: "Validate Everything Works",
      time: "10 seconds",
      description: "Ensure your setup is working correctly",
      command: "krci-ai validate",
      output: `🔍 Validating framework integrity...

✅ FRAMEWORK VALID

📊 Overview: 6 agents, 24 tasks, 14 templates, 11 data files
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

Exit code: 0 (framework functional)`
    },
    {
      step: "5",
      title: "Create Web Chat Bundle",
      time: "30 seconds",
      description: "Bundle agents for ChatGPT/Claude Web",
      command: "krci-ai bundle --all --output project-context.md",
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
ℹ️ • Each section is clearly separated with collision-resistant delimiters`
    }
  ]

  return (
    <div className="min-h-screen bg-black text-slate-200 font-mono">
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-center py-4">
        <div className="w-11/12 max-w-7xl border border-cyan-500/40 bg-gradient-to-r from-blue-950/80 via-slate-950/70 to-green-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-blue-950/40 supports-[backdrop-filter]:via-slate-950/30 supports-[backdrop-filter]:to-green-950/40 shadow-lg shadow-cyan-400/10 rounded-2xl px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <Terminal className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-200" />
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-300 hover:to-blue-300 transition-all duration-300">
              KubeRocketAI
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-cyan-300 hover:text-cyan-200">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-green-900/30 text-green-300 border-green-700">Quick Start Guide</Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Get Running in
            <br />
            <span className="text-5xl md:text-7xl">3 Minutes</span>
          </h1>

          <p className="text-xl text-slate-300/80 mb-8 max-w-2xl mx-auto">
            From zero to AI agent management with KubeRocketAI. No plugins, no complex setup—just pure developer productivity.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="text-cyan-400 mb-2 flex justify-center">{feature.icon}</div>
                  <div className="text-2xl font-bold text-green-300 mb-1">{feature.highlight}</div>
                  <div className="text-sm font-semibold text-slate-200 mb-1">{feature.title}</div>
                  <div className="text-xs text-slate-400">{feature.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">Install KubeRocketAI</h2>

          <div className="space-y-6">
            {/* macOS - Homebrew (Recommended) */}
            <Card className="bg-gray-900/50 border-green-700/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center">
                  <Terminal className="w-5 h-5 mr-2" />
                  macOS (Recommended)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 flex items-start justify-between">
                  <pre className="text-green-400 text-sm"><code>{INSTALL_COMMANDS.macos}</code></pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(INSTALL_COMMANDS.macos, "macos")}
                    className="text-cyan-300 hover:text-cyan-200 ml-4"
                  >
                    {copiedCommand === "macos" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Linux/Windows */}
            <Card className="bg-gray-900/50 border-green-700/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Linux/Windows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 flex items-start justify-between">
                  <pre className="text-green-400 text-sm whitespace-pre-wrap"><code>{INSTALL_COMMANDS.linux}</code></pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(INSTALL_COMMANDS.linux, "linux")}
                    className="text-cyan-300 hover:text-cyan-200 ml-4"
                  >
                    {copiedCommand === "linux" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-green-300/60 text-sm mt-2">
                  Windows users: Download from
                  <a href="https://github.com/KubeRocketCI/kuberocketai/releases/latest" className="text-cyan-400 hover:text-cyan-300 ml-1" target="_blank" rel="noopener noreferrer">
                    releases page
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your First 3 Minutes */}
      <section className="py-16 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">Start in 3 Minutes</h2>

          <div className="space-y-8">
            {quickstartSteps.map((stepData, index) => (
              <Card key={index} className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-300 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold flex items-center justify-center mr-3">
                        {stepData.step}
                      </div>
                      {stepData.title}
                      <Badge className="ml-3 bg-green-900/30 text-green-300 border-green-700">
                        {stepData.time}
                      </Badge>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStepComplete(index)}
                      className={`${completedSteps.includes(index) ? 'text-green-400' : 'text-slate-400'} hover:text-green-300`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-slate-400 ml-11">{stepData.description}</p>
                </CardHeader>
                <CardContent>
                  {/* Command */}
                  <div className="bg-gray-900 border border-green-700/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="ml-4 text-green-400 text-sm">terminal</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-green-400">
                        <span className="text-blue-400">$ </span>{stepData.command}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(stepData.command, `step-${index}`)}
                        className="text-cyan-300 hover:text-cyan-200"
                      >
                        {copiedCommand === `step-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Output */}
                  <div className="bg-black rounded-lg p-4">
                    <div className="text-green-400 text-sm mb-2 opacity-60">Output:</div>
                    <pre className="text-green-300 text-sm whitespace-pre-wrap">{stepData.output}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">🎯 You&apos;re Ready!</h2>
          <p className="text-lg text-green-300/80 mb-8">
            Your agents are ready to be customized with project context using reusable SDLC framework rules.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <Code className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-300 mb-2">Core Concepts</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">Understand framework fundamentals and principles</p>
                <Button variant="outline" className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 bg-transparent mt-auto">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <GitBranch className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-300 mb-2">Architecture</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">See how components work together seamlessly</p>
                <Button
                  variant="outline"
                  className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 bg-transparent mt-auto"
                  onClick={() => window.location.href = '/architecture'}
                >
                  View Architecture
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-cyan-700/30 hover:border-cyan-600/50 transition-colors">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-300 mb-2">Contributing</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">Customize and extend the framework rules</p>
                <Button variant="outline" className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 bg-transparent mt-auto">
                  Contribute
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold px-8">
                <Terminal className="w-4 h-4 mr-2" />
                Explore Framework
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-green-500 text-green-300 hover:bg-green-900/20 hover:text-green-100 bg-transparent"
              onClick={() => window.open('https://github.com/KubeRocketCI/kuberocketai', '_blank')}
            >
              <GitBranch className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">Troubleshooting</h2>

          <div className="space-y-4">
            <Card className="bg-black/50 border-yellow-700/30">
              <CardContent className="p-6">
                <h3 className="text-yellow-400 font-semibold mb-2">Validate your installation</h3>
                <div className="bg-black rounded p-3 mb-2">
                  <code className="text-green-400 text-sm">krci-ai validate -v</code>
                </div>
                <p className="text-slate-400 text-sm">Run verbose validation to diagnose setup issues</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-cyan-700/30">
              <CardContent className="p-6">
                <h3 className="text-cyan-400 font-semibold mb-2">Update to latest version</h3>
                <div className="bg-black rounded p-3 mb-2">
                  <code className="text-green-400 text-sm">brew upgrade krci-ai</code>
                  <span className="text-green-300/60 ml-4"># macOS</span>
                </div>
                <p className="text-slate-400 text-sm">Keep your installation up to date for the best experience</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm mb-4">Need more help?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 bg-transparent"
                onClick={() => window.open('https://github.com/KubeRocketCI/kuberocketai/issues', '_blank')}
              >
                GitHub Issues
              </Button>
              <Button
                variant="outline"
                className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 bg-transparent"
                onClick={() => window.open('https://github.com/KubeRocketCI/kuberocketai', '_blank')}
              >
                Documentation Hub
              </Button>
            </div>
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
          <p className="text-green-300/60 text-sm">⏱️ That&apos;s it! You now have a complete AI-as-Code framework running locally.</p>
          <p className="text-green-300/40 text-xs mt-2">Your agents are ready to help with everything from project planning to code implementation.</p>
        </div>
      </footer>
    </div>
  )
}
