'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Terminal, Star, Clock, Menu, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useGitHubRepo, formatStarCount, GITHUB_REPO_URL_EXPORT } from '@/lib/use-github-repo';
import type { JSX } from 'react';

interface SharedHeaderProps {
  currentPage?: 'home' | 'quickstart' | 'architecture' | 'roadmap' | 'use-cases';
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
      return <Clock className="w-4 h-4 animate-pulse text-cyan-400" />;
    }
    return formatStarCount(repoData.stargazers_count);
  };

  const openGitHubRepo = (): void => {
    window.open(GITHUB_REPO_URL_EXPORT, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 flex justify-center py-4">
      <div className="w-11/12 max-w-7xl border border-cyan-500/40 bg-gradient-to-r from-blue-950/80 via-slate-950/70 to-green-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-blue-950/40 supports-[backdrop-filter]:via-slate-950/30 supports-[backdrop-filter]:to-green-950/40 shadow-lg shadow-cyan-400/10 rounded-2xl px-8 py-3">
        {/* Desktop Layout (Large screens) */}
        <div className="hidden lg:flex lg:items-center lg:justify-between w-full">
          <div className="flex items-center space-x-3 group">
            <Terminal
              className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-200"
              aria-label="KubeRocketAI logo terminal icon"
            />
            {currentPage === 'home' ? (
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-300 hover:to-blue-300 transition-all duration-300">
                KubeRocketAI
              </span>
            ) : (
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-300 hover:to-blue-300 transition-all duration-300"
              >
                KubeRocketAI
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-8">
            {/* Clean Text Navigation */}
            <nav className="flex items-center space-x-8">
              <Link
                href="/quickstart"
                className={`text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium relative group flex items-center ${
                  currentPage === 'quickstart' ? 'text-blue-300' : ''
                }`}
              >
                <span
                  className={`mr-1 font-sans font-bold transition-opacity duration-200 ${
                    currentPage === 'quickstart' ? 'text-blue-300 opacity-100' : 'opacity-0'
                  }`}
                >
                  {'>'}
                </span>
                /quickstart
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    currentPage === 'quickstart'
                      ? 'w-full bg-blue-300'
                      : 'w-0 bg-blue-400 group-hover:w-full'
                  }`}
                ></span>
              </Link>

              <Link
                href="/architecture"
                className={`text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium relative group flex items-center ${
                  currentPage === 'architecture' ? 'text-blue-300' : ''
                }`}
              >
                <span
                  className={`mr-1 font-sans font-bold transition-opacity duration-200 ${
                    currentPage === 'architecture' ? 'text-blue-300 opacity-100' : 'opacity-0'
                  }`}
                >
                  {'>'}
                </span>
                /architecture
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    currentPage === 'architecture'
                      ? 'w-full bg-blue-300'
                      : 'w-0 bg-blue-400 group-hover:w-full'
                  }`}
                ></span>
              </Link>

              <Link
                href="/use-cases"
                className={`text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium relative group flex items-center ${
                  currentPage === 'use-cases' ? 'text-blue-300' : ''
                }`}
              >
                <span
                  className={`mr-1 font-sans font-bold transition-opacity duration-200 ${
                    currentPage === 'use-cases' ? 'text-blue-300 opacity-100' : 'opacity-0'
                  }`}
                >
                  {'>'}
                </span>
                /use-cases
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    currentPage === 'use-cases'
                      ? 'w-full bg-blue-300'
                      : 'w-0 bg-blue-400 group-hover:w-full'
                  }`}
                ></span>
              </Link>

              <Link
                href="/roadmap"
                className={`text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium relative group flex items-center ${
                  currentPage === 'roadmap' ? 'text-blue-300' : ''
                }`}
              >
                <span
                  className={`mr-1 font-sans font-bold transition-opacity duration-200 ${
                    currentPage === 'roadmap' ? 'text-blue-300 opacity-100' : 'opacity-0'
                  }`}
                >
                  {'>'}
                </span>
                /roadmap
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    currentPage === 'roadmap'
                      ? 'w-full bg-blue-300'
                      : 'w-0 bg-blue-400 group-hover:w-full'
                  }`}
                ></span>
              </Link>

              <a
                href="https://www.youtube.com/@theplatformteam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium relative group flex items-center"
                aria-label="Watch tutorials on YouTube (opens in a new tab)"
              >
                /tutorials
                <ExternalLink className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* GitHub Starred Button */}
            <div
              className="flex items-center bg-white/10 border border-gray-400/30 rounded-lg px-3 py-1.5 backdrop-blur-sm hover:bg-white/15 hover:border-gray-300/50 transition-all duration-200 cursor-pointer"
              onClick={openGitHubRepo}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') openGitHubRepo();
              }}
              aria-label="View GitHub repository and star count"
            >
              <Star className="w-4 h-4 text-amber-400 mr-2 fill-current" />
              <span className="text-gray-200 font-medium text-sm mr-3">Starred</span>
              <span className="bg-gray-500/40 text-gray-200 font-medium text-sm px-2 py-0.5 rounded">
                {getGitHubStarsValue()}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout (Collapsible) */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3 group">
              <Terminal
                className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-200"
                aria-label="KubeRocketAI logo terminal icon"
              />
              {currentPage === 'home' ? (
                <span className="text-xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-300 hover:to-blue-300 transition-all duration-300">
                  KubeRocketAI
                </span>
              ) : (
                <Link
                  href="/"
                  className="text-xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-300 hover:to-blue-300 transition-all duration-300"
                >
                  KubeRocketAI
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="text-cyan-300 hover:text-cyan-200 bg-gradient-to-r from-cyan-900/30 to-green-900/30 hover:from-cyan-800/50 hover:to-green-800/50 border border-cyan-500/40 hover:border-cyan-400/60 transition-all duration-300 px-3 py-2 h-9"
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
            </Button>
          </div>

          {/* Collapsible Mobile Navigation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col space-y-3 py-2">
              <Link
                href="/quickstart"
                className={`text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium py-2 px-1 border-b border-cyan-500/20 hover:border-blue-400/40 flex items-center ${
                  currentPage === 'quickstart' ? 'text-blue-300 border-blue-300/60' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className={`mr-2 font-mono transition-opacity duration-200 ${
                    currentPage === 'quickstart' ? 'text-blue-300 opacity-100' : 'opacity-0'
                  }`}
                >
                  {'>'}
                </span>
                /quickstart
              </Link>

              <Link
                href="/architecture"
                className={`text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium py-2 px-1 border-b border-cyan-500/20 hover:border-blue-400/40 flex items-center ${
                  currentPage === 'architecture' ? 'text-blue-300 border-blue-300/60' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className={`mr-2 font-mono transition-opacity duration-200 ${
                    currentPage === 'architecture' ? 'text-blue-300 opacity-100' : 'opacity-0'
                  }`}
                >
                  {'>'}
                </span>
                /architecture
              </Link>

              <Link
                href="/use-cases"
                className={`text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium py-2 px-1 border-b border-cyan-500/20 hover:border-blue-400/40 flex items-center ${
                  currentPage === 'use-cases' ? 'text-blue-300 border-blue-300/60' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className={`mr-2 font-mono transition-opacity duration-200 ${
                    currentPage === 'use-cases' ? 'text-blue-300 opacity-100' : 'opacity-0'
                  }`}
                >
                  {'>'}
                </span>
                /use-cases
              </Link>

              <Link
                href="/roadmap"
                className={`text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium py-2 px-1 border-b border-cyan-500/20 hover:border-blue-400/40 flex items-center ${
                  currentPage === 'roadmap' ? 'text-blue-300 border-blue-300/60' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className={`mr-2 font-mono transition-opacity duration-200 ${
                    currentPage === 'roadmap' ? 'text-blue-300 opacity-100' : 'opacity-0'
                  }`}
                >
                  {'>'}
                </span>
                /roadmap
              </Link>

              <a
                href="https://www.youtube.com/@theplatformteam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-blue-400 transition-colors duration-200 font-sans text-sm font-medium py-2 px-1 border-b border-cyan-500/20 hover:border-blue-400/40 flex items-center"
                aria-label="Watch tutorials on YouTube (opens in a new tab)"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-2 font-mono opacity-0">{'>'}</span>
                /tutorials
                <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
              </a>

              {/* Mobile GitHub Starred Button */}
              <div
                className="flex items-center justify-center bg-white/10 border border-gray-400/30 rounded-lg px-4 py-2.5 backdrop-blur-sm hover:bg-white/15 hover:border-gray-300/50 transition-all duration-200 cursor-pointer mt-2"
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
                <Star className="w-4 h-4 text-amber-400 mr-2 fill-current" />
                <span className="text-gray-200 font-medium text-sm mr-3">Starred</span>
                <span className="bg-gray-500/40 text-gray-200 font-medium text-sm px-2 py-1 rounded">
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
