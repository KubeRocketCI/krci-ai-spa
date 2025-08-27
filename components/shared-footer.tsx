'use client';

import { Button } from '@/components/ui/button';
import { Terminal, Send, Heart, ExternalLink, Globe } from 'lucide-react';
import { GitHubIcon } from '@/components/github-icon';
import { GITHUB_REPO_URL_EXPORT } from '@/lib/use-github-repo';
import Link from 'next/link';

interface SharedFooterProps {
  className?: string;
}

export function SharedFooter({ className = '' }: SharedFooterProps) {
  const openTelegramFeedback = (): void => {
    window.open('https://t.me/kuberocketai', '_blank');
  };

  const openGitHubRepo = (): void => {
    window.open(GITHUB_REPO_URL_EXPORT, '_blank');
  };

  return (
    <footer className={`border-t border-green-900/30 py-12 px-4 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold text-green-400">KubeRocketAI</span>
            </div>
            <p className="text-green-300/60 text-sm leading-relaxed">
              Pipeline-as-Code for AI Agent Management. Version-controlled, project-aware AI agents
              for development teams.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-1">
            <h3 className="text-cyan-300 font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <Link
                href="/quickstart"
                className="block text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                Quick Start
              </Link>
              <Link
                href="/architecture"
                className="block text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                Architecture
              </Link>
              <Link
                href="/roadmap"
                className="block text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                Roadmap
              </Link>
              <a
                href="https://www.youtube.com/@theplatformteam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                Tutorials <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Community & Support */}
          <div className="md:col-span-1">
            <h3 className="text-cyan-300 font-semibold mb-4">Community & Support</h3>
            <div className="space-y-2">
              <button
                onClick={openTelegramFeedback}
                className="flex items-center text-green-300/80 hover:text-green-200 text-sm transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 mr-2 text-cyan-400" />
                Telegram Channel
              </button>
              <button
                onClick={openGitHubRepo}
                className="flex items-center text-green-300/80 hover:text-green-200 text-sm transition-colors cursor-pointer"
              >
                <GitHubIcon className="w-4 h-4 mr-2 text-slate-300" />
                GitHub Issues
              </button>
              <a
                href="https://docs.kuberocketci.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                <Globe className="w-4 h-4 mr-2 text-slate-300" />
                KubeRocketCI <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="text-cyan-300 font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <a
                href={`${GITHUB_REPO_URL_EXPORT}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                Releases <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
              </a>
              <a
                href={`${GITHUB_REPO_URL_EXPORT}/blob/main/README.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                Documentation <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
              </a>
              <a
                href={`${GITHUB_REPO_URL_EXPORT}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                Contributing <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
              </a>
              <a
                href={`${GITHUB_REPO_URL_EXPORT}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-300/80 hover:text-green-200 text-sm transition-colors"
              >
                License <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-800/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-green-300/60 text-sm">
                © 2025 KubeRocketCI. Open source project.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-green-300/60 text-sm">
                <span>Built with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>for developers</span>
              </div>

              {/* Quick Feedback CTA */}
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-green-300/60 text-sm">Questions?</span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={openTelegramFeedback}
                  className="text-cyan-400 hover:text-cyan-300 p-0 h-auto text-sm font-medium underline-offset-4"
                >
                  Join our Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
