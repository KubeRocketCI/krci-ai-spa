'use client';

import { useState, useEffect } from 'react';
import { X, Shield, BarChart3, Target, Settings } from 'lucide-react';
import { ThemedButton } from './themed-button';
import { ThemedCard, ThemedCardContent } from './themed-card';
import { useConsent } from '@/lib/consent-context';
import { cn } from '@/lib/utils';

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}

// Themed Cookie Banner Container
function ThemedCookieBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[50] px-4">
      <div className="container mx-auto max-w-6xl pb-4">
        <ThemedCard
          variant="terminal"
          className="shadow-2xl backdrop-blur-md bg-white/95 border-slate-300/60 shadow-slate-400/20 dark:bg-slate-950/98 dark:border-cyan-500/30 dark:shadow-cyan-500/20"
        >
          <ThemedCardContent className="px-6 py-4">{children}</ThemedCardContent>
        </ThemedCard>
      </div>
    </div>
  );
}

// Themed Cookie Banner Title
function ThemedCookieBannerTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-mono font-semibold mb-1 text-cyan-700 dark:text-cyan-400">
      {children}
    </h2>
  );
}

// Themed Cookie Banner Description
function ThemedCookieBannerDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-snug text-slate-700 dark:text-slate-300">{children}</p>;
}

// Themed Cookie Accept Button
function ThemedCookieAcceptButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ThemedButton
      onClick={onClick}
      size="sm"
      className="font-mono bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white dark:text-black"
    >
      {children}
    </ThemedButton>
  );
}

// Themed Cookie Necessary Button
function ThemedCookieNecessaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ThemedButton
      onClick={onClick}
      variant="outline"
      size="sm"
      className="font-mono border-cyan-600/40 text-cyan-700 hover:bg-cyan-200/20 hover:text-cyan-600 hover:border-cyan-500/60 dark:border-cyan-500/30 dark:text-cyan-400 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-300 dark:hover:border-cyan-400/50"
    >
      {children}
    </ThemedButton>
  );
}

// Themed Cookie Customize Button
function ThemedCookieCustomizeButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ThemedButton
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="font-mono text-slate-600 hover:text-cyan-700 hover:bg-cyan-200/20 dark:text-slate-400 dark:hover:text-cyan-400 dark:hover:bg-cyan-500/10"
    >
      {children}
    </ThemedButton>
  );
}

// Themed Preferences Modal Title
function ThemedPreferencesTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-mono font-semibold text-cyan-700 dark:text-cyan-400">{children}</h2>
  );
}

// Themed Close Button
function ThemedCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <ThemedButton
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400"
    >
      <X className="w-4 h-4" />
    </ThemedButton>
  );
}

// Themed Category Item Container
function ThemedCategoryItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between p-3 rounded-lg bg-slate-100/80 border border-slate-300/60 dark:bg-slate-900/50 dark:border-slate-800">
      {children}
    </div>
  );
}

// Themed Category Icon
function ThemedCategoryIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-700 dark:text-cyan-400" />;
}

// Themed Category Title
function ThemedCategoryTitle({ title, required }: { title: string; required?: boolean }) {
  return (
    <h3 className="font-mono font-medium text-slate-900 dark:text-white">
      {title}
      {required && (
        <span className="ml-2 text-xs text-emerald-700 dark:text-green-400">[Required]</span>
      )}
    </h3>
  );
}

// Themed Category Description
function ThemedCategoryDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm mt-1 ${THEME_COLORS.text.muted}">{children}</p>;
}

// Themed Toggle Switch
function ThemedToggleSwitch({
  isEnabled,
  onClick,
  disabled,
}: {
  isEnabled: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex-shrink-0 w-12 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50',
        isEnabled
          ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-600 dark:to-green-600'
          : 'bg-slate-400 dark:bg-gray-600',
        disabled && 'cursor-not-allowed opacity-75',
      )}
    >
      <div
        className={cn(
          'w-5 h-5 bg-white rounded-full transition-transform duration-200 mt-0.5',
          isEnabled ? 'translate-x-6' : 'translate-x-0.5',
        )}
      />
    </button>
  );
}

// Themed Save Button
function ThemedSaveButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ThemedButton
      onClick={onClick}
      className="font-mono bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white dark:text-black"
    >
      {children}
    </ThemedButton>
  );
}

// Themed Outline Accept Button (for preferences modal)
function ThemedOutlineAcceptButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ThemedButton
      onClick={onClick}
      variant="outline"
      className="font-mono border-cyan-600/40 text-cyan-700 hover:bg-cyan-200/20 hover:text-cyan-600 hover:border-cyan-500/60 dark:border-cyan-500/30 dark:text-cyan-400 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-300 dark:hover:border-cyan-400/50"
    >
      {children}
    </ThemedButton>
  );
}

// Themed Ghost Necessary Button (for preferences modal)
function ThemedGhostNecessaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ThemedButton
      onClick={onClick}
      variant="ghost"
      className="font-mono text-slate-600 hover:text-cyan-700 hover:bg-cyan-200/20 dark:text-slate-400 dark:hover:text-cyan-400 dark:hover:bg-cyan-500/10"
    >
      {children}
    </ThemedButton>
  );
}

// Themed Border Separator
function ThemedBorderSeparator() {
  return <div className="border-t border-slate-300/60 dark:border-slate-800" />;
}

// Themed Footer Text
function ThemedFooterText({ children }: { children: React.ReactNode }) {
  return <div className="text-xs pt-2 text-slate-600 dark:text-slate-500">{children}</div>;
}

// Themed Footer Link
function ThemedFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-cyan-700 hover:underline dark:text-cyan-400">
      {children}
    </a>
  );
}

export function ThemedCookieConsent() {
  const { consent, isLoading, showBanner, acceptAll, acceptNecessary, updateConsent } =
    useConsent();

  const [showPreferences, setShowPreferences] = useState(false);
  const [tempConsent, setTempConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
    functionality: false,
  });

  useEffect(() => {
    if (consent) {
      setTempConsent(consent);
    }
  }, [consent]);

  if (isLoading || !showBanner) return null;

  const handleSavePreferences = () => {
    updateConsent(tempConsent);
    setShowPreferences(false);
  };

  const categories = [
    {
      id: 'necessary' as const,
      title: 'Strictly Necessary',
      description: 'Essential cookies for website functionality and security',
      icon: Shield,
      required: true,
    },
    {
      id: 'analytics' as const,
      title: 'Analytics',
      description: 'Help us understand site usage to improve performance',
      icon: BarChart3,
      required: false,
    },
    {
      id: 'marketing' as const,
      title: 'Marketing',
      description: 'Used to deliver relevant ads and track campaigns',
      icon: Target,
      required: false,
    },
    {
      id: 'functionality' as const,
      title: 'Functionality',
      description: 'Enable enhanced features and personalization',
      icon: Settings,
      required: false,
    },
  ];

  return (
    <ThemedCookieBanner>
      {!showPreferences ? (
        // Consent Banner
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <ThemedCookieBannerTitle>🍪 Cookie Consent Required</ThemedCookieBannerTitle>
              <ThemedCookieBannerDescription>
                We use cookies to enhance your experience on our KubeRocketAI platform. Analytics
                cookies help us understand how you interact with our site.
              </ThemedCookieBannerDescription>
            </div>

            <div className="flex flex-row gap-2 sm:gap-3 flex-shrink-0">
              <ThemedCookieAcceptButton onClick={acceptAll}>Accept All</ThemedCookieAcceptButton>
              <ThemedCookieNecessaryButton onClick={acceptNecessary}>
                Only Necessary
              </ThemedCookieNecessaryButton>
              <ThemedCookieCustomizeButton onClick={() => setShowPreferences(true)}>
                Customize
              </ThemedCookieCustomizeButton>
            </div>
          </div>
        </div>
      ) : (
        // Preferences Modal
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <ThemedPreferencesTitle>Cookie Preferences</ThemedPreferencesTitle>
            <ThemedCloseButton onClick={() => setShowPreferences(false)} />
          </div>

          <div className="grid gap-4">
            {categories.map(category => {
              const isEnabled = tempConsent[category.id];

              return (
                <ThemedCategoryItem key={category.id}>
                  <div className="flex gap-3 flex-1">
                    <ThemedCategoryIcon icon={category.icon} />
                    <div>
                      <ThemedCategoryTitle title={category.title} required={category.required} />
                      <ThemedCategoryDescription>{category.description}</ThemedCategoryDescription>
                    </div>
                  </div>

                  <ThemedToggleSwitch
                    isEnabled={isEnabled}
                    disabled={category.required}
                    onClick={() => {
                      if (!category.required) {
                        setTempConsent(prev => ({
                          ...prev,
                          [category.id]: !isEnabled,
                        }));
                      }
                    }}
                  />
                </ThemedCategoryItem>
              );
            })}
          </div>

          <ThemedBorderSeparator />

          <div className="flex flex-col sm:flex-row gap-3">
            <ThemedSaveButton onClick={handleSavePreferences}>Save Preferences</ThemedSaveButton>
            <ThemedOutlineAcceptButton onClick={acceptAll}>Accept All</ThemedOutlineAcceptButton>
            <ThemedGhostNecessaryButton onClick={acceptNecessary}>
              Only Necessary
            </ThemedGhostNecessaryButton>
          </div>

          <ThemedBorderSeparator />

          <ThemedFooterText>
            <p>
              We respect your privacy. You can change your preferences at any time. For more
              information, see our{' '}
              <ThemedFooterLink href="/privacy">Privacy Policy</ThemedFooterLink>.
            </p>
          </ThemedFooterText>
        </div>
      )}
    </ThemedCookieBanner>
  );
}

// Themed Cookie Settings Button for Footer
export function ThemedCookieSettingsButton({ className = '' }: { className?: string }) {
  const { showPreferences } = useConsent();

  return (
    <button
      onClick={showPreferences}
      className={cn(
        'text-sm transition-colors',
        'text-emerald-700/90 hover:text-emerald-600 dark:text-green-300/80 dark:hover:text-green-200',
        className,
      )}
    >
      🍪 Cookie Settings
    </button>
  );
}
