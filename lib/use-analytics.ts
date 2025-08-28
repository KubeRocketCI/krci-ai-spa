'use client';

import { trackEvent as _trackEvent } from './analytics';
import { useConsent } from './consent-context';

export function useAnalytics() {
  const { consent } = useConsent();

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (consent?.analytics) {
      _trackEvent(action, category, label, value);
    }
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent('click', 'button', `${buttonName}${location ? ` - ${location}` : ''}`);
  };

  const trackDownload = (fileName: string, fileType?: string) => {
    const label = fileType ? `${fileName} (${fileType})` : fileName;
    trackEvent('download', 'file', label, undefined);
  };

  const trackExternalLink = (url: string, linkText?: string) => {
    trackEvent('click', 'external_link', linkText || url);
  };

  const trackFeatureUsage = (featureName: string, details?: string) => {
    trackEvent('usage', 'feature', `${featureName}${details ? ` - ${details}` : ''}`);
  };

  return {
    isEnabled: !!consent?.analytics,
    trackEvent,
    trackButtonClick,
    trackDownload,
    trackExternalLink,
    trackFeatureUsage,
  };
}
