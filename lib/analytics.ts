const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const isProduction = () => {
  // Server-side check
  if (typeof window === 'undefined') {
    return process.env.NODE_ENV === 'production';
  }

  // Client-side check - only allow production domains
  return (
    process.env.NODE_ENV === 'production' &&
    (window.location.hostname === 'krci-ai.kuberocketci.io' ||
      window.location.hostname.includes('vercel.app'))
  );
};

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    if (!isProduction()) {
      console.log('GA_MEASUREMENT_ID not defined - this is expected in development');
    } else {
      console.warn(
        'GA_MEASUREMENT_ID is not defined in production. Check NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel environment variables.',
      );
    }
    return;
  }

  const isProd = isProduction();
  const testMode = !isProd;

  if (testMode) {
    console.log('Google Analytics initialized in test mode (no data sent to GA)');
    return; // Don't initialize in non-production environments
  }

  // GA is already initialized by the GAScript component in layout
  console.log('Google Analytics tracking enabled');
};

export const trackPageView = (path: string, title?: string) => {
  if (!isProduction()) {
    console.log('PageView (test mode):', path);
    return; // Don't track in non-production
  }

  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    try {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title || document.title,
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const initGtagConsent = () => {
  if (!isProduction()) {
    console.log('Consent initialization (test mode) - no tracking enabled');
    return; // Don't initialize consent tracking in non-production
  }

  if (typeof window !== 'undefined') {
    try {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };

      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
      });
    } catch (error) {
      console.error('Failed to initialize consent:', error);
    }
  }
};

export const updateGtagConsent = (consentSettings: {
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}) => {
  if (!isProduction()) {
    console.log('Consent update (test mode):', consentSettings);
    return; // Don't update consent in non-production
  }

  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('consent', 'update', {
        ad_storage: consentSettings.marketing ? 'granted' : 'denied',
        ad_user_data: consentSettings.marketing ? 'granted' : 'denied',
        ad_personalization: consentSettings.marketing ? 'granted' : 'denied',
        analytics_storage: consentSettings.analytics ? 'granted' : 'denied',
        functionality_storage: consentSettings.functionality ? 'granted' : 'denied',
        personalization_storage: consentSettings.functionality ? 'granted' : 'denied',
        security_storage: 'granted',
      });
    } catch (error) {
      console.error('Failed to update consent:', error);
    }
  }
};
