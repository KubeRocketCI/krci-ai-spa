"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { SharedHeader } from "@/components/shared-header"
import { GitHubIcon } from "@/components/github-icon"
import { Copy, Check, Star, Terminal, Code, Zap, GitBranch, Users, Globe, Blocks, BellRing, LetterText, ShieldCheck } from "lucide-react"
import { GITHUB_REPO_URL_EXPORT } from "@/lib/use-github-repo"
import Link from "next/link"
import InlineVideo, { AutoplayMode } from "@/components/ui/inline-video"

// Constants
const HERO_COMMAND = "brew tap KubeRocketCI/homebrew-tap && brew install krci-ai"
// Autoplay behavior for the hero video: 'onView' plays when visible, 'onLoad' plays immediately
const VIDEO_AUTOPLAY_MODE: AutoplayMode = 'onView'

export default function HomePage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)


  // Typing animation effect
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < HERO_COMMAND.length) {
        setTypedText(HERO_COMMAND.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // InlineVideo handles autoplay logic

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  // Helper functions
  const copyToClipboard = async (text: string, command: string): Promise<void> => {
    await navigator.clipboard.writeText(text)
    setCopiedCommand(command)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  // Data and configuration
  const features = [
    {
      icon: <Blocks className="w-6 h-6" aria-label="Blocks icon representing plugin-free operation" />,
      title: "Plugin‑free",
      description: "No IDE plugins required",
      cmd: "info",
      hover: "Works in your IDE today. Nothing to install."
    },
    {
      icon: <Zap className="w-6 h-6" aria-label="Lightning bolt icon representing speed and lightweight design" />,
      title: "Lightweight CLI",
      description: "Single binary, fast setup",
      cmd: "krci-ai",
      hover: "One small binary to set up and manage your AI workflow."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" aria-label="Shield check icon representing validation and security verification" />,
      title: "Validate",
      description: "Check configs for consistency",
      cmd: "krci-ai validate",
      hover: "Catch misconfigurations and broken links before they cost time and LLM tokens."
    },
    {
      icon: <LetterText className="w-6 h-6" aria-label="Letter text icon representing token analysis and text processing" />,
      title: "Tokens",
      description: "Analyze token usage",
      cmd: "krci-ai tokens",
      hover: "See context size to prevent truncation and surprise failures."
    },
    {
      icon: <Globe className="w-6 h-6" aria-label="Globe icon representing web bundles and global chat deployment" />,
      title: "Bundles",
      description: "Create agent bundles for chat",
      cmd: "krci-ai bundle",
      hover: "Generate a paste‑ready package for ChatGPT, Claude, or Gemini."
    },
    {
      icon: <GitBranch className="w-6 h-6" aria-label="Git branch icon representing installation and component management" />,
      title: "Install & List",
      description: "Set up and explore components",
      cmd: "krci-ai install",
      hover: "Install core assets and quickly see available agents."
    },
    {
      icon: <Terminal className="w-6 h-6" aria-label="Terminal icon representing shell autocompletion features" />,
      title: "Autocomplete",
      description: "Shell completion scripts",
      cmd: "krci-ai completion",
      hover: "Type less, move faster with shell suggestions."
    },
    {
      icon: <BellRing className="w-6 h-6" aria-label="Bell ring icon representing version tracking and updates" />,
      title: "Versions",
      description: "Check version & updates",
      cmd: "krci-ai version",
      hover: "Verify your setup and share reproducible versions."
    },
  ]

  const stats = [
    { label: "Integrated Codebases", value: "20+" },
    { label: "Agile SDLC Roles", value: "7" },
    { label: "Baseline Tasks", value: "30+" },
    { label: "SDLC Framework", value: "1" },
  ]

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      {/* Header */}
      <SharedHeader currentPage="home" />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-cyan-900/30 text-cyan-300 border-cyan-700">Pipeline-as-Code for AI</Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
            AI-as-Code for
            <br />
            Development Teams
          </h1>

          <p className="text-xl text-slate-300/80 mb-8 max-w-2xl mx-auto">
            Apply Pipeline-as-Code principles to AI agent management. Version-controlled, project-aware AI agents
            that understand your codebase.
          </p>

          {/* Terminal Demo */}
          <div className="bg-gray-900 border border-green-700/30 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto font-mono">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2" aria-hidden="true">
                <div className="w-3 h-3 bg-red-500 rounded-full" title="Close button (decorative)"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full" title="Minimize button (decorative)"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full" title="Maximize button (decorative)"></div>
              </div>
              <span className="ml-4 text-green-400 text-sm">terminal</span>
            </div>
            <div className="text-green-400">
              <span className="text-blue-400">$</span> {typedText}
              {showCursor && <span className="bg-green-300/70 text-transparent px-0.5">|</span>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* PRIMARY CTA - Install Now */}
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 hover:from-cyan-300 hover:via-blue-400 hover:to-emerald-300 text-black font-bold px-8 h-12 text-base shadow-xl shadow-cyan-400/30 hover:shadow-cyan-400/50 ring-2 ring-cyan-300/60 hover:ring-cyan-200/80 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              onClick={() => copyToClipboard(HERO_COMMAND, "brew")}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {copiedCommand === "brew" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              Install Now
            </Button>

            {/* SECONDARY CTA - Star on GitHub */}
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-100 bg-slate-900/50 hover:bg-slate-800/70 px-6 h-12 text-base font-medium shadow-lg shadow-slate-900/25 hover:shadow-slate-700/30 transform hover:scale-102 transition-all duration-300 backdrop-blur-sm"
              asChild
            >
              <a href={GITHUB_REPO_URL_EXPORT} target="_blank" rel="noopener noreferrer" aria-label="Star KubeRocketAI on GitHub (opens in a new tab)">
                <Star className="w-4 h-4 mr-2 text-yellow-400" aria-hidden="true" />
                Star on GitHub
              </a>
            </Button>
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
            <h3 className="relative z-10 text-center text-xs md:text-sm uppercase tracking-[0.08em] text-slate-300/90 mb-6">Adoption at a glance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {stats.map((stat, index) => {
                // Make the "Agile SDLC Roles" stat clickable
                if (stat.label === "Agile SDLC Roles") {
                  return (
                    <Link
                      key={index}
                      href="/architecture#agent-relations"
                      className="relative z-10 block cursor-pointer transition-all duration-200 hover:opacity-80 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] focus:opacity-80 focus:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-md"
                      aria-label="View details about the 7 SDLC agent roles and responsibilities"
                    >
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight [font-variant-numeric:tabular-nums] leading-tight md:leading-[1.1] mb-1 sm:mb-2 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-xs sm:text-sm md:text-base text-slate-400/90 leading-5 font-medium">{stat.label}</div>
                    </Link>
                  )
                }
                // Make the "SDLC Framework" stat clickable
                else if (stat.label === "SDLC Framework") {
                  return (
                    <Link
                      key={index}
                      href="/architecture#sdlc-workflow"
                      className="relative z-10 block cursor-pointer transition-all duration-200 hover:opacity-80 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] focus:opacity-80 focus:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-md"
                      aria-label="View the complete SDLC agent workflow from idea to code"
                    >
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight [font-variant-numeric:tabular-nums] leading-tight md:leading-[1.1] mb-1 sm:mb-2 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-xs sm:text-sm md:text-base text-slate-400/90 leading-5 font-medium">{stat.label}</div>
                    </Link>
                  )
                } else {
                  return (
                    <div key={index} className="relative z-10">
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight [font-variant-numeric:tabular-nums] leading-tight md:leading-[1.1] mb-1 sm:mb-2 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-xs sm:text-sm md:text-base text-slate-400/90 leading-5 font-medium">{stat.label}</div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="relative z-10 text-3xl font-bold text-red-400 mb-6">The Problem</h2>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">×</span>
                    Context switching between AI tools and IDEs
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">×</span>
                    Inconsistent AI configurations across team members
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">×</span>
                    Manual fixes for AI-generated code that doesn&apos;t fit project patterns
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3">×</span>
                    No version control for AI agent definitions
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="relative z-10 text-3xl font-bold text-green-400 mb-6">The Solution</h2>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3">✓</span>
                    Declarative agent management with project-specific context
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3">✓</span>
                    Version-controlled Markdown definitions alongside code
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3">✓</span>
                    Universal compatibility across all AI-powered IDEs
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3">✓</span>
                    Built-in transparency and auditability for security teams
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="relative z-10 text-4xl font-bold text-center mb-12 text-cyan-400">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-black/50 border border-white/20 hover:border-cyan-400/60 hover:bg-black/80 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Hover overlay - fixed hover detection */}
                  <div
                    className="pointer-events-none absolute inset-[1px] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[7px] bg-black/90"
                    aria-hidden="true"
                  >
                    <div className="flex items-center justify-center h-full p-6">
                      <div className="w-full">
                        <div className="font-mono text-xs text-cyan-200/90 mb-2">
                          <span className="text-blue-200">$</span> {feature.cmd ?? 'info'}
                        </div>
                        <div className="font-mono text-[13px] leading-relaxed whitespace-pre-line text-green-200 drop-shadow-[0_0_10px_rgba(34,197,94,0.35)]">
                          {feature.hover ?? 'lorem ipsum dolor sit amet, consectetur adipiscing elit. nulla facilisi.\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <div className="transition-all duration-300 group-hover:blur-[1.5px] group-hover:opacity-60">
                      <div className="text-cyan-300 mb-4">{feature.icon}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/80 text-sm">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </AuroraBackground>

      {/* Installation */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">Installation</h2>

          <div className="space-y-6">
            {/* macOS - Homebrew (Recommended) */}
            <div className="bg-gray-900 border border-green-700/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">macOS - Homebrew (Recommended)</h3>
              <div className="bg-black rounded p-4 flex items-start justify-between font-mono">
                <pre className="text-green-400 whitespace-pre-wrap break-words mr-2"><code>{`brew tap KubeRocketCI/homebrew-tap
brew install krci-ai`}</code></pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`brew tap KubeRocketCI/homebrew-tap\nbrew install krci-ai`, "macos")}
                  className="text-cyan-300 hover:text-cyan-200"
                  aria-label="Copy macOS Homebrew install commands"
                >
                  {copiedCommand === "macos" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Linux - Direct Download */}
            <div className="bg-gray-900 border border-green-700/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">Linux - Direct Download</h3>
              <div className="bg-black rounded p-4 flex items-start justify-between font-mono">
                <pre className="text-green-400 whitespace-pre-wrap break-words mr-2"><code>{`curl -L "https://github.com/KubeRocketCI/kuberocketai/releases/latest/download/krci-ai_Linux_x86_64.tar.gz" | tar -xz
chmod +x krci-ai
sudo mv krci-ai /usr/local/bin/`}</code></pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `curl -L "https://github.com/KubeRocketCI/kuberocketai/releases/latest/download/krci-ai_Linux_x86_64.tar.gz" | tar -xz\nchmod +x krci-ai\nsudo mv krci-ai /usr/local/bin/`,
                      "linux"
                    )
                  }
                  className="text-cyan-300 hover:text-cyan-200"
                  aria-label="Copy Linux install commands"
                >
                  {copiedCommand === "linux" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>



            {/* Quick Start */}
            <div className="bg-gray-900 border border-green-700/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">Quick Start</h3>
              <div className="space-y-2">
                <div className="bg-black rounded p-4 font-mono">
                  <code className="text-green-400">krci-ai install --ide=cursor</code>
                  <span className="text-green-300/60 ml-4"># Install framework with IDE integration</span>
                </div>
                <div className="bg-black rounded p-4 font-mono">
                  <code className="text-green-400">krci-ai validate</code>
                  <span className="text-green-300/60 ml-4"># Validate your agent configurations</span>
                </div>
                <div className="bg-black rounded p-4 font-mono">
                  <code className="text-green-400">krci-ai bundle --agent po</code>
                  <span className="text-green-300/60 ml-4"># Create PO context-aware bundle for web chat tools</span>
                </div>
                <div className="bg-black rounded p-4 font-mono">
                  <code className="text-green-400">krci-ai list agents</code>
                  <span className="text-green-300/60 ml-4"># List available agents</span>
                </div>
                <div className="bg-black rounded p-4 font-mono">
                  <code className="text-green-400">krci-ai install --all</code>
                  <span className="text-green-300/60 ml-4"># Install with all IDE integrations</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Architecture */}
      <section className="py-20 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12 text-cyan-400">How It Works</h2>

          <div className="bg-black/50 border border-green-700/30 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-blue-400 mb-2" aria-label="Developer icon representing the user starting the AI-as-Code workflow" />
                <span className="text-green-300">Developer</span>
              </div>
              <div className="text-green-400 text-2xl" aria-hidden="true">→</div>
              <div className="flex flex-col items-center">
                <Terminal className="w-12 h-12 text-green-400 mb-2" aria-label="Terminal icon representing the KubeRocketAI command-line interface" />
                <span className="text-green-300">krci-ai CLI</span>
              </div>
              <div className="text-green-400 text-2xl" aria-hidden="true">→</div>
              <div className="flex flex-col items-center">
                <Code className="w-12 h-12 text-purple-400 mb-2" aria-label="Code icon representing the local AI framework installation" />
                <span className="text-green-300">Local Framework</span>
              </div>
              <div className="text-green-400 text-2xl" aria-hidden="true">→</div>
              <div className="flex flex-col items-center">
                <GitBranch className="w-12 h-12 text-yellow-400 mb-2" aria-label="Git branch icon representing the target project where AI agents are deployed" />
                <span className="text-green-300">Target Project</span>
              </div>
            </div>
          </div>

          <p className="text-green-300/70 mt-6 max-w-2xl mx-auto">
            Offline operation with native IDE integration. Your AI agents understand your project structure, coding
            patterns, and team conventions without sending data to external services.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">Ready to Transform Your AI Workflow?</h2>
          <p className="text-xl text-green-300/80 mb-8">
            Join the next evolution of DevOps practices. Start managing your AI agents like infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold px-8 ring-1 ring-cyan-300/40"
              asChild
            >
              <Link href="/quickstart" aria-label="Open Quickstart page">
                <Terminal className="w-4 h-4 mr-2" aria-hidden="true" />
                Get Started Now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 bg-transparent"
              asChild
            >
              <a href={GITHUB_REPO_URL_EXPORT} target="_blank" rel="noopener noreferrer" aria-label="View KubeRocketAI on GitHub (opens in a new tab)">
                <GitHubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                View on GitHub
              </a>
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
          <p className="text-green-300/60 text-sm">Pipeline-as-Code for AI Agent Management</p>
          <p className="text-green-300/40 text-xs mt-2">Built with ❤️ for the developer community</p>
        </div>
      </footer>
    </div>
  )
}
