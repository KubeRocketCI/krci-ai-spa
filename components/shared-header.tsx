'use client';

import { useState } from 'react';
import { ThemedButton } from '@/components/ui/themed-button';
import { Terminal, Star, Clock, Menu, X } from 'lucide-react';
import Link from 'next/link';
import {
  ThemedNavigation,
  ThemedNavLink,
  ThemedMobileNavLink,
} from '@/components/ui/themed-navigation';
import { useGitHubRepo, formatStarCount, GITHUB_REPO_URL_EXPORT } from '@/lib/use-github-repo';
import { ThemeToggle } from '@/components/theme';
import type { JSX } from 'react';

interface SharedHeaderProps {
  currentPage?: 'home' | 'quickstart' | 'architecture' | 'agents' | 'use-cases' | 'faq' | 'roadmap';
}

export function SharedHeader({ currentPage = 'home' }: SharedHeaderProps) {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch GitHub repository data
  const { data: repoData, loading: repoLoading, error: repoError } = useGitHubRepo();

  // Helper functions
  const getGitHubStarsValue = (): string | JSX.Element => {
    if (repoLoading) return '...';
    if (repoError || !repoData) {
      return <Clock className="w-4 h-4 animate-pulse text-slate-600 dark:text-cyan-400" />;
    }
    return formatStarCount(repoData.stargazers_count);
  };

  const openGitHubRepo = (): void => {
    window.open(GITHUB_REPO_URL_EXPORT, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 flex justify-center py-4">
      <div className="w-11/12 max-w-7xl border border-slate-200/30 dark:border-cyan-500/40 bg-gradient-to-r from-white/80 via-slate-50/70 to-blue-50/80 dark:from-blue-950/80 dark:via-slate-950/70 dark:to-green-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-white/40 supports-[backdrop-filter]:via-slate-50/30 supports-[backdrop-filter]:to-blue-50/40 supports-[backdrop-filter]:dark:from-blue-950/40 supports-[backdrop-filter]:dark:via-slate-950/30 supports-[backdrop-filter]:dark:to-green-950/40 shadow-lg shadow-slate-400/10 dark:shadow-cyan-400/10 rounded-2xl px-8 py-3">
        {/* Desktop Layout (Large screens) */}
        <div className="hidden lg:flex lg:items-center lg:justify-between w-full">
          <div className="flex items-center space-x-3 group">
            <Terminal
              className="w-6 h-6 text-green-700 group-hover:text-green-600 dark:text-green-400 dark:group-hover:text-green-300 transition-colors duration-200"
              aria-label="KubeRocketAI logo terminal icon"
            />
            {currentPage === 'home' ? (
              <span className="text-xl font-bold bg-gradient-to-r from-green-700 via-emerald-700 to-blue-700 dark:from-green-400 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent hover:from-green-600 hover:via-emerald-600 hover:to-blue-600 dark:hover:from-green-300 dark:hover:via-emerald-300 dark:hover:to-blue-300 transition-all duration-300">
                KubeRocketAI
              </span>
            ) : (
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-green-700 via-emerald-700 to-blue-700 dark:from-green-400 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent hover:from-green-600 hover:via-emerald-600 hover:to-blue-600 dark:hover:from-green-300 dark:hover:via-emerald-300 dark:hover:to-blue-300 transition-all duration-300"
              >
                KubeRocketAI
              </Link>
            )}
          </div>
          <div className="flex items-center justify-center flex-1">
            {/* Clean Text Navigation - Centered */}
            <ThemedNavigation>
              <ThemedNavLink href="/quickstart" isActive={currentPage === 'quickstart'}>
                /quickstart
              </ThemedNavLink>
              <ThemedNavLink href="/architecture" isActive={currentPage === 'architecture'}>
                /architecture
              </ThemedNavLink>
              <ThemedNavLink href="/agents" isActive={currentPage === 'agents'}>
                /agents
              </ThemedNavLink>
              <ThemedNavLink href="/use-cases" isActive={currentPage === 'use-cases'}>
                /use-cases
              </ThemedNavLink>
              <ThemedNavLink href="/faq" isActive={currentPage === 'faq'}>
                /faq
              </ThemedNavLink>
              <ThemedNavLink href="/roadmap" isActive={currentPage === 'roadmap'}>
                /roadmap
              </ThemedNavLink>
              <ThemedNavLink href="https://www.youtube.com/@theplatformteam" external>
                /tutorials
              </ThemedNavLink>
            </ThemedNavigation>
          </div>

          <div className="flex items-center space-x-8">
            {/* GitHub Starred Button */}
            <div
              className="flex items-center bg-slate-200/10 border border-slate-400/30 hover:bg-slate-200/15 hover:border-slate-300/50 dark:bg-white/10 dark:border-gray-400/30 rounded-lg px-3 py-1.5 backdrop-blur-sm dark:hover:bg-white/15 dark:hover:border-gray-300/50 transition-all duration-200 cursor-pointer"
              onClick={openGitHubRepo}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') openGitHubRepo();
              }}
              aria-label="View GitHub repository and star count"
            >
              <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 mr-2 fill-current" />
              <span className="text-slate-700 dark:text-gray-200 font-medium text-sm mr-3">
                Starred
              </span>
              <span className="bg-slate-500/40 text-slate-700 dark:bg-gray-500/40 dark:text-gray-200 font-medium text-sm px-2 py-0.5 rounded">
                {getGitHubStarsValue()}
              </span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile & Tablet Layout (Collapsible) */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3 group">
              <Terminal
                className="w-6 h-6 text-green-700 group-hover:text-green-600 dark:text-green-400 dark:group-hover:text-green-300 transition-colors duration-200"
                aria-label="KubeRocketAI logo terminal icon"
              />
              {currentPage === 'home' ? (
                <span className="text-xl font-bold bg-gradient-to-r from-green-700 via-emerald-700 to-blue-700 dark:from-green-400 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent hover:from-green-600 hover:via-emerald-600 hover:to-blue-600 dark:hover:from-green-300 dark:hover:via-emerald-300 dark:hover:to-blue-300 transition-all duration-300">
                  KubeRocketAI
                </span>
              ) : (
                <Link
                  href="/"
                  className="text-xl font-bold bg-gradient-to-r from-green-700 via-emerald-700 to-blue-700 dark:from-green-400 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent hover:from-green-600 hover:via-emerald-600 hover:to-blue-600 dark:hover:from-green-300 dark:hover:via-emerald-300 dark:hover:to-blue-300 transition-all duration-300"
                >
                  KubeRocketAI
                </Link>
              )}
            </div>

            {/* Mobile Actions: Theme Toggle + Menu Toggle */}
            <div className="flex items-center space-x-2">
              {/* Always Visible Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <ThemedButton
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-500 dark:text-cyan-300 dark:hover:text-cyan-200 bg-gradient-to-r from-slate-200/30 to-blue-200/30 hover:from-slate-300/50 hover:to-blue-300/50 dark:from-cyan-900/30 dark:to-green-900/30 dark:hover:from-cyan-800/50 dark:hover:to-green-800/50 border border-slate-400/40 hover:border-slate-300/60 dark:border-cyan-500/40 dark:hover:border-cyan-400/60 transition-all duration-300 px-3 py-2 h-9"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 mr-1" />
                ) : (
                  <Menu className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-semibold">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
              </ThemedButton>
            </div>
          </div>

          {/* Collapsible Mobile Navigation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col space-y-3 py-2">
              <ThemedMobileNavLink
                href="/quickstart"
                isActive={currentPage === 'quickstart'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                /quickstart
              </ThemedMobileNavLink>

              <ThemedMobileNavLink
                href="/architecture"
                isActive={currentPage === 'architecture'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                /architecture
              </ThemedMobileNavLink>

              <ThemedMobileNavLink
                href="/agents"
                isActive={currentPage === 'agents'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                /agents
              </ThemedMobileNavLink>

              <ThemedMobileNavLink
                href="/use-cases"
                isActive={currentPage === 'use-cases'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                /use-cases
              </ThemedMobileNavLink>

              <ThemedMobileNavLink
                href="/faq"
                isActive={currentPage === 'faq'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                /faq
              </ThemedMobileNavLink>

              <ThemedMobileNavLink
                href="/roadmap"
                isActive={currentPage === 'roadmap'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                /roadmap
              </ThemedMobileNavLink>

              <ThemedMobileNavLink
                href="https://www.youtube.com/@theplatformteam"
                external
                onClick={() => setIsMobileMenuOpen(false)}
              >
                /tutorials
              </ThemedMobileNavLink>

              {/* Mobile GitHub Starred Button */}
              <div
                className="flex items-center justify-center bg-slate-200/10 border border-slate-400/30 hover:bg-slate-200/15 hover:border-slate-300/50 dark:bg-white/10 dark:border-gray-400/30 rounded-lg px-4 py-2.5 backdrop-blur-sm dark:hover:bg-white/15 dark:hover:border-gray-300/50 transition-all duration-200 cursor-pointer mt-2"
                onClick={() => {
                  openGitHubRepo();
                  setIsMobileMenuOpen(false);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openGitHubRepo();
                    setIsMobileMenuOpen(false);
                  }
                }}
                aria-label="View GitHub repository and star count"
              >
                <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 mr-2 fill-current" />
                <span className="text-slate-700 dark:text-gray-200 font-medium text-sm mr-3">
                  Starred
                </span>
                <span className="bg-slate-500/40 text-slate-700 dark:bg-gray-500/40 dark:text-gray-200 font-medium text-sm px-2 py-1 rounded">
                  {getGitHubStarsValue()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
