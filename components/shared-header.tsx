"use client"

import { Button } from "@/components/ui/button"
import { Terminal, Container, Star, Clock, Play, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { useGitHubRepo, formatStarCount, GITHUB_REPO_URL_EXPORT } from "@/lib/use-github-repo"
import { GitHubIcon } from "@/components/github-icon"
import type { JSX } from "react"

interface SharedHeaderProps {
  currentPage?: 'home' | 'quickstart' | 'architecture' | 'roadmap' | 'use-cases'
}

export function SharedHeader({ currentPage = 'home' }: SharedHeaderProps) {
  // Fetch GitHub repository data
  const { data: repoData, loading: repoLoading, error: repoError } = useGitHubRepo()

  // Helper functions
  const getGitHubStarsValue = (): string | JSX.Element => {
    if (repoLoading) return "..."
    if (repoError || !repoData) {
      return <Clock className="w-4 h-4 animate-pulse text-cyan-400" />
    }
    return formatStarCount(repoData.stargazers_count)
  }

  const openGitHubRepo = (): void => {
    window.open(GITHUB_REPO_URL_EXPORT, '_blank')
  }


  return (
    <header className="sticky top-0 z-50 flex justify-center py-4">
      <div className="w-11/12 max-w-7xl border border-cyan-500/40 bg-gradient-to-r from-blue-950/80 via-slate-950/70 to-green-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-blue-950/40 supports-[backdrop-filter]:via-slate-950/30 supports-[backdrop-filter]:to-green-950/40 shadow-lg shadow-cyan-400/10 rounded-2xl px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center justify-center sm:justify-start space-x-3 group">
          <Terminal className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-200" aria-label="KubeRocketAI logo terminal icon" />
          {currentPage === 'home' ? (
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-300 hover:to-blue-300 transition-all duration-300">
              KubeRocketAI
            </span>
          ) : (
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-300 hover:to-blue-300 transition-all duration-300">
              KubeRocketAI
            </Link>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          {/* Navigation Buttons - All uniform size */}
          <Button
            variant="ghost"
            className="text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-green-900/20 hover:from-cyan-800/40 hover:via-blue-800/30 hover:to-green-800/40 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-cyan-400/20 px-4 h-10 w-full sm:w-auto sm:min-w-[120px]"
            onClick={() => window.location.href = '/quickstart'}
          >
            <Terminal className="w-4 h-4 mr-2" />
            <span className="font-semibold">Quick Start</span>
          </Button>

          <Button
            variant="ghost"
            className="text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-green-900/20 hover:from-cyan-800/40 hover:via-blue-800/30 hover:to-green-800/40 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-cyan-400/20 px-4 h-10 w-full sm:w-auto sm:min-w-[120px]"
            onClick={() => window.location.href = '/architecture'}
          >
            <Container className="w-4 h-4 mr-2" />
            <span className="font-semibold">Architecture</span>
          </Button>

          <Button
            variant="ghost"
            className="text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-green-900/20 hover:from-cyan-800/40 hover:via-blue-800/30 hover:to-green-800/40 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-cyan-400/20 px-4 h-10 w-full sm:w-auto sm:min-w-[120px]"
            onClick={() => window.location.href = '/use-cases'}
          >
            <Users className="w-4 h-4 mr-2" />
            <span className="font-semibold">Use Cases</span>
          </Button>

          <Button
            variant="ghost"
            className="text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-green-900/20 hover:from-cyan-800/40 hover:via-blue-800/30 hover:to-green-800/40 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-cyan-400/20 px-4 h-10 w-full sm:w-auto sm:min-w-[120px]"
            onClick={() => window.location.href = '/roadmap'}
          >
            <MapPin className="w-4 h-4 mr-2" />
            <span className="font-semibold">Roadmap</span>
          </Button>

          {/* YouTube Tutorials */}
          <Button
            variant="ghost"
            className="group text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-green-900/20 hover:from-cyan-800/40 hover:via-blue-800/30 hover:to-green-800/40 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-cyan-400/20 px-4 h-10 w-full sm:w-auto sm:min-w-[120px]"
            asChild
          >
            <a href="https://www.youtube.com/@theplatformteam" target="_blank" rel="noopener noreferrer" aria-label="Watch tutorials on YouTube (opens in a new tab)" className="group">
              <div className="relative">
                <Play className="w-4 h-4 mr-2 text-red-400 transition-all duration-300" fill="none" stroke="currentColor" />
                <Play className="w-4 h-4 mr-2 text-red-400 transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100" fill="currentColor" stroke="none" />
              </div>
              <span className="font-semibold">Tutorials</span>
            </a>
          </Button>

          {/* GitHub Stars */}
          <Button
            variant="ghost"
            className="group text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-900/20 via-blue-900/10 to-green-900/20 hover:from-cyan-800/40 hover:via-blue-800/30 hover:to-green-800/40 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-cyan-400/20 px-4 h-10 w-full sm:w-auto sm:min-w-[120px]"
            onClick={openGitHubRepo}
          >
            <div className="relative">
              <Star className="w-4 h-4 mr-2 text-yellow-300 hover:text-yellow-200 transition-all duration-300" fill="none" stroke="currentColor" />
              <Star className="w-4 h-4 mr-2 text-yellow-300 hover:text-yellow-200 transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100" fill="currentColor" stroke="none" />
            </div>
            <GitHubIcon className="w-4 h-4 mr-1 transition-all duration-300 hover:scale-110 hover:text-cyan-100" />
            <span className="font-semibold bg-gradient-to-r from-cyan-200 to-green-200 bg-clip-text text-transparent hover:from-cyan-100 hover:to-green-100 transition-all duration-300">{getGitHubStarsValue()}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
