'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { initGA, initGtagConsent, updateGtagConsent } from './analytics';

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}

interface ConsentContextType {
  consent: ConsentState | null;
  isLoading: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  updateConsent: (newConsent: Partial<ConsentState>) => void;
  showPreferences: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'krci-cookie-consent';

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  functionality: false,
};

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);

    if (stored) {
      try {
        const parsedConsent = JSON.parse(stored);
        setConsent(parsedConsent);
        setShowBanner(false);

        if (parsedConsent.analytics) {
          initGA();
        }

        updateGtagConsent({
          analytics: parsedConsent.analytics,
          marketing: parsedConsent.marketing,
          functionality: parsedConsent.functionality,
        });
      } catch (error) {
        console.error('Error parsing stored consent:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }

    initGtagConsent();
    setIsLoading(false);
  }, []);

  const saveConsent = (newConsent: ConsentState) => {
    setConsent(newConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    setShowBanner(false);

    if (newConsent.analytics && !consent?.analytics) {
      initGA();
    }

    updateGtagConsent({
      analytics: newConsent.analytics,
      marketing: newConsent.marketing,
      functionality: newConsent.functionality,
    });
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      functionality: true,
    });
  };

  const acceptNecessary = () => {
    saveConsent(defaultConsent);
  };

  const updateConsent = (newConsent: Partial<ConsentState>) => {
    const updatedConsent = { ...consent, ...newConsent } as ConsentState;
    saveConsent(updatedConsent);
  };

  const showPreferences = () => {
    setShowBanner(true);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        isLoading,
        showBanner,
        acceptAll,
        acceptNecessary,
        updateConsent,
        showPreferences,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};
