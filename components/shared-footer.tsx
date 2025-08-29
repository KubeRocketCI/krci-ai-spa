'use client';

import { ThemedButton } from '@/components/ui/themed-button';
import { Terminal, Send, Heart, Globe } from 'lucide-react';
import { GitHubIcon } from '@/components/github-icon';
import { GITHUB_REPO_URL_EXPORT } from '@/lib/use-github-repo';
import { ThemedCookieSettingsButton } from '@/components/ui/themed-cookie-consent';
import {
  ThemedFooter,
  ThemedFooterSection,
  ThemedFooterLink,
  ThemedFooterButton,
  ThemedFooterBrand,
  ThemedFooterSeparator,
} from '@/components/ui/themed-footer';

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
    <ThemedFooter className={className}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Section */}
        <ThemedFooterBrand
          logo={<Terminal className="w-6 h-6 text-green-600 dark:text-green-400" />}
          title="KubeRocketAI"
          description="Pipeline-as-Code for AI Agent Management. Version-controlled, project-aware AI agents for development teams."
        />

        {/* Product Links */}
        <ThemedFooterSection title="Product">
          <ThemedFooterLink href="/quickstart">Quick Start</ThemedFooterLink>
          <ThemedFooterLink href="/architecture">Architecture</ThemedFooterLink>
          <ThemedFooterLink href="/roadmap">Roadmap</ThemedFooterLink>
          <ThemedFooterLink href="/faq">FAQ</ThemedFooterLink>
          <ThemedFooterLink href="https://www.youtube.com/@theplatformteam" external>
            Tutorials
          </ThemedFooterLink>
        </ThemedFooterSection>

        {/* Community & Support */}
        <ThemedFooterSection title="Community & Support">
          <ThemedFooterButton
            onClick={openTelegramFeedback}
            icon={<Send className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
          >
            Telegram Channel
          </ThemedFooterButton>
          <ThemedFooterButton
            onClick={openGitHubRepo}
            icon={<GitHubIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
          >
            GitHub Issues
          </ThemedFooterButton>
          <ThemedFooterLink
            href="https://docs.kuberocketci.io"
            external
            icon={<Globe className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
          >
            KubeRocketCI
          </ThemedFooterLink>
        </ThemedFooterSection>

        {/* Resources */}
        <ThemedFooterSection title="Resources">
          <ThemedFooterLink href={`${GITHUB_REPO_URL_EXPORT}/releases`} external>
            Releases
          </ThemedFooterLink>
          <ThemedFooterLink href={`${GITHUB_REPO_URL_EXPORT}/blob/main/README.md`} external>
            Documentation
          </ThemedFooterLink>
          <ThemedFooterLink href={`${GITHUB_REPO_URL_EXPORT}/blob/main/CONTRIBUTING.md`} external>
            Contributing
          </ThemedFooterLink>
          <ThemedFooterLink href={`${GITHUB_REPO_URL_EXPORT}/blob/main/LICENSE`} external>
            License
          </ThemedFooterLink>
        </ThemedFooterSection>
      </div>

      {/* Bottom Section */}
      <ThemedFooterSeparator />
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left space-y-2">
          <p className="text-slate-600/60 dark:text-green-300/60 text-sm">
            © 2025 KubeRocketCI. Open source project.
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-4 text-xs">
            <ThemedFooterLink
              href="/privacy"
              className="text-slate-600/60 hover:text-slate-600 dark:text-green-300/60 dark:hover:text-green-300 transition-colors"
            >
              Privacy Policy
            </ThemedFooterLink>
            <span className="text-slate-400 dark:text-green-800">•</span>
            <ThemedFooterLink
              href="/terms"
              className="text-slate-600/60 hover:text-slate-600 dark:text-green-300/60 dark:hover:text-green-300 transition-colors"
            >
              Terms
            </ThemedFooterLink>
            <span className="text-slate-400 dark:text-green-800">•</span>
            <ThemedCookieSettingsButton />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-slate-600/60 dark:text-green-300/60 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for developers</span>
          </div>

          {/* Quick Feedback CTA */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-slate-600/60 dark:text-green-300/60 text-sm">Questions?</span>
            <ThemedButton
              variant="ghost"
              size="sm"
              onClick={openTelegramFeedback}
              className="text-slate-600 hover:text-slate-500 dark:text-cyan-400 dark:hover:text-cyan-300 p-0 h-auto text-sm font-medium underline-offset-4"
            >
              Join our Telegram
            </ThemedButton>
          </div>
        </div>
      </div>
    </ThemedFooter>
  );
}
