"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Star, Github, Terminal, Code, Shield, Zap, GitBranch, Users } from "lucide-react"

// Types
interface GitHubRepoData {
  stargazers_count: number
  forks_count: number
}

interface UseGitHubRepoReturn {
  data: GitHubRepoData | null
  loading: boolean
  error: string | null
}

// Constants
const GITHUB_REPO_URL = 'https://github.com/KubeRocketCI/kuberocketai'
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
const HERO_COMMAND = "brew tap KubeRocketCI/homebrew-tap && brew install krci-ai"

// Custom hook for fetching GitHub repository data
const useGitHubRepo = (repoUrl: string): UseGitHubRepoReturn => {
  const [data, setData] = useState<GitHubRepoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepoData = async (): Promise<void> => {
      const cacheKey = `github-repo-${repoUrl}`
      const cachedData = sessionStorage.getItem(cacheKey)
      const cacheTime = sessionStorage.getItem(`${cacheKey}-time`)

      // Check if we have valid cached data (less than 10 minutes old)
      if (cachedData && cacheTime) {
        const age = Date.now() - parseInt(cacheTime, 10)
        if (age < CACHE_DURATION) {
          setData(JSON.parse(cachedData))
          setLoading(false)
          return
        }
      }

      try {
        const repoPath = repoUrl.replace('https://github.com/', '')
        const response = await fetch(`https://api.github.com/repos/${repoPath}`)

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const repoData = await response.json()
        const result: GitHubRepoData = {
          stargazers_count: repoData.stargazers_count,
          forks_count: repoData.forks_count
        }

        // Cache the result
        sessionStorage.setItem(cacheKey, JSON.stringify(result))
        sessionStorage.setItem(`${cacheKey}-time`, Date.now().toString())

        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repository data')
      } finally {
        setLoading(false)
      }
    }

    fetchRepoData()
  }, [repoUrl])

  return { data, loading, error }
}

export default function HomePage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  // Fetch GitHub repository data
  const { data: repoData, loading: repoLoading, error: repoError } = useGitHubRepo(GITHUB_REPO_URL)

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

  const formatStarCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const getGitHubStarsValue = (): string => {
    if (repoLoading) return "..."
    if (repoError || !repoData) return "100+"
    return formatStarCount(repoData.stargazers_count)
  }

  const openGitHubRepo = (): void => {
    window.open(GITHUB_REPO_URL, '_blank')
  }

  // Data and configuration
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Project-Local Definitions",
      description: "Version-controlled Markdown files living alongside your code",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Universal Compatibility",
      description: "Works across Cursor, Claude Code, WindSurf, and web chat tools",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Token Transparency",
      description: "Built-in size calculation and optimization for cost control",
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Selective Installation",
      description: "Install only what you need, when you need it",
    },
  ]

  const stats = [
    { label: "Reduction in AI fixes", value: "85%" },
    { label: "Daily time saved", value: "5-10 min" },
    { label: "GitHub Stars", value: getGitHubStarsValue() },
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="border-b border-green-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6 text-green-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              KubeRocketAI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
              onClick={() => window.open('https://github.com/KubeRocketCI/kuberocketai', '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              <Star className="w-4 h-4 mr-1" />
              {getGitHubStarsValue()}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-green-900/30 text-green-300 border-green-700">Pipeline-as-Code for AI</Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI-as-Code for
            <br />
            Development Teams
          </h1>

          <p className="text-xl text-green-300/80 mb-8 max-w-2xl mx-auto">
            Apply Pipeline-as-Code principles to AI agent management. Version-controlled, project-aware AI agents
            that understand your codebase.
          </p>

          {/* Terminal Demo */}
          <div className="bg-gray-900 border border-green-700/30 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-green-400 text-sm">terminal</span>
            </div>
            <div className="text-green-400">
              <span className="text-blue-400">$</span> {typedText}
              {showCursor && <span className="bg-green-400 text-black">█</span>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-black font-semibold px-8"
              onClick={() => copyToClipboard(HERO_COMMAND, "brew")}
            >
              {copiedCommand === "brew" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              Install Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-400 hover:bg-green-900/20 bg-transparent"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-green-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
                <div className="text-green-300/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-red-400 mb-6">The Problem</h2>
              <ul className="space-y-4 text-green-300/80">
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
              <h2 className="text-3xl font-bold text-green-400 mb-6">The Solution</h2>
              <ul className="space-y-4 text-green-300/80">
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
      <section className="py-20 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black/50 border-green-700/30 hover:border-green-600/50 transition-colors">
                <CardContent className="p-6">
                  <div className="text-green-400 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-green-300 mb-2">{feature.title}</h3>
                  <p className="text-green-300/70 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">Installation</h2>

          <div className="space-y-6">
            {/* macOS - Homebrew (Recommended) */}
            <div className="bg-gray-900 border border-green-700/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">macOS - Homebrew (Recommended)</h3>
              <div className="bg-black rounded p-4 flex items-start justify-between">
                <pre className="text-green-400 whitespace-pre-wrap break-words mr-2"><code>{`brew tap KubeRocketCI/homebrew-tap
brew install krci-ai`}</code></pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`brew tap KubeRocketCI/homebrew-tap\nbrew install krci-ai`, "macos")}
                  className="text-green-400 hover:text-green-300"
                  aria-label="Copy macOS Homebrew install commands"
                >
                  {copiedCommand === "macos" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Linux - Direct Download */}
            <div className="bg-gray-900 border border-green-700/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">Linux - Direct Download</h3>
              <div className="bg-black rounded p-4 flex items-start justify-between">
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
                  className="text-green-400 hover:text-green-300"
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
                <div className="bg-black rounded p-4">
                  <code className="text-green-400">krci-ai install --ide=cursor</code>
                  <span className="text-green-300/60 ml-4"># Install framework with IDE integration</span>
                </div>
                <div className="bg-black rounded p-4">
                  <code className="text-green-400">krci-ai validate</code>
                  <span className="text-green-300/60 ml-4"># Validate your agent configurations</span>
                </div>
                <div className="bg-black rounded p-4">
                  <code className="text-green-400">krci-ai bundle --agent po</code>
                  <span className="text-green-300/60 ml-4"># Create PO context-aware bundle for web chat tools</span>
                </div>
                <div className="bg-black rounded p-4">
                  <code className="text-green-400">krci-ai list agents</code>
                  <span className="text-green-300/60 ml-4"># List available agents</span>
                </div>
                <div className="bg-black rounded p-4">
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
          <h2 className="text-4xl font-bold mb-12 text-green-400">How It Works</h2>

          <div className="bg-black/50 border border-green-700/30 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-blue-400 mb-2" />
                <span className="text-green-300">Developer</span>
              </div>
              <div className="text-green-400 text-2xl">→</div>
              <div className="flex flex-col items-center">
                <Terminal className="w-12 h-12 text-green-400 mb-2" />
                <span className="text-green-300">krci-ai CLI</span>
              </div>
              <div className="text-green-400 text-2xl">→</div>
              <div className="flex flex-col items-center">
                <Code className="w-12 h-12 text-purple-400 mb-2" />
                <span className="text-green-300">Local Framework</span>
              </div>
              <div className="text-green-400 text-2xl">→</div>
              <div className="flex flex-col items-center">
                <GitBranch className="w-12 h-12 text-yellow-400 mb-2" />
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
          <h2 className="text-4xl font-bold mb-6 text-green-400">Ready to Transform Your AI Workflow?</h2>
          <p className="text-xl text-green-300/80 mb-8">
            Join the next evolution of DevOps practices. Start managing your AI agents like infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-black font-semibold px-8">
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-400 hover:bg-green-900/20 bg-transparent"
              onClick={openGitHubRepo}
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
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
