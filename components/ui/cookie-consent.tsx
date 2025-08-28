'use client';

import { useState, useEffect } from 'react';
import { X, Shield, BarChart3, Target, Settings } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { useConsent } from '@/lib/consent-context';
import { cn } from '@/lib/utils';

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}

export function CookieConsent() {
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
    <>
      {/* Main Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[50] px-4">
        <div className="container mx-auto max-w-6xl pb-4">
          <Card className="bg-slate-950/98 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 backdrop-blur-md">
            <CardContent className="px-6 py-4">
              {!showPreferences ? (
                // Consent Banner
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-base font-mono font-semibold text-cyan-400 mb-1">
                        🍪 Cookie Consent Required
                      </h2>
                      <p className="text-sm text-gray-300 leading-snug">
                        We use cookies to enhance your experience on our KubeRocketAI platform.
                        Analytics cookies help us understand how you interact with our site.
                      </p>
                    </div>

                    <div className="flex flex-row gap-2 sm:gap-3 flex-shrink-0">
                      <Button
                        onClick={acceptAll}
                        size="sm"
                        className="bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-black font-mono"
                      >
                        Accept All
                      </Button>
                      <Button
                        onClick={acceptNecessary}
                        variant="outline"
                        size="sm"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400/50 font-mono"
                      >
                        Only Necessary
                      </Button>
                      <Button
                        onClick={() => setShowPreferences(true)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 font-mono"
                      >
                        Customize
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // Preferences Modal
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-mono font-semibold text-cyan-400">
                      Cookie Preferences
                    </h2>
                    <Button
                      onClick={() => setShowPreferences(false)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-cyan-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {categories.map(category => {
                      const Icon = category.icon;
                      const isEnabled = tempConsent[category.id];

                      return (
                        <div
                          key={category.id}
                          className="flex items-start justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800"
                        >
                          <div className="flex gap-3 flex-1">
                            <Icon className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-mono font-medium text-white">
                                {category.title}
                                {category.required && (
                                  <span className="ml-2 text-xs text-green-400">[Required]</span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-400 mt-1">{category.description}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (!category.required) {
                                setTempConsent(prev => ({
                                  ...prev,
                                  [category.id]: !isEnabled,
                                }));
                              }
                            }}
                            disabled={category.required}
                            className={cn(
                              'flex-shrink-0 w-12 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50',
                              isEnabled
                                ? 'bg-gradient-to-r from-cyan-600 to-green-600'
                                : 'bg-gray-600',
                              category.required && 'cursor-not-allowed opacity-75',
                            )}
                          >
                            <div
                              className={cn(
                                'w-5 h-5 bg-white rounded-full transition-transform duration-200 mt-0.5',
                                isEnabled ? 'translate-x-6' : 'translate-x-0.5',
                              )}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                    <Button
                      onClick={handleSavePreferences}
                      className="bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-black font-mono"
                    >
                      Save Preferences
                    </Button>
                    <Button
                      onClick={acceptAll}
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400/50 font-mono"
                    >
                      Accept All
                    </Button>
                    <Button
                      onClick={acceptNecessary}
                      variant="ghost"
                      className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 font-mono"
                    >
                      Only Necessary
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 pt-2 border-t border-slate-800">
                    <p>
                      We respect your privacy. You can change your preferences at any time. For more
                      information, see our{' '}
                      <a href="/privacy" className="text-cyan-400 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export function CookieSettingsButton({ className = '' }: { className?: string }) {
  const { showPreferences } = useConsent();

  return (
    <button
      onClick={showPreferences}
      className={`text-green-300/80 hover:text-green-200 text-sm transition-colors ${className}`}
    >
      🍪 Cookie Settings
    </button>
  );
}
