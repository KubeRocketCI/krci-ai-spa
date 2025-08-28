'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';
import { useConsent } from '@/lib/consent-context';

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useConsent();

  useEffect(() => {
    if (consent?.analytics && pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams, consent?.analytics]);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}

export function GAScript() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isProduction =
    process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production';

  // Only load GA script in production environment
  if (!GA_MEASUREMENT_ID || !isProduction) {
    return null;
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Additional production domain verification
            const isVercelProduction = location.hostname === 'krci-ai.kuberocketci.io' ||
                                     location.hostname.includes('vercel.app');
            
            if (isVercelProduction) {
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                send_page_view: false
              });
              console.log('Google Analytics loaded for production');
            } else {
              console.log('Google Analytics blocked - not on production domain');
            }
          `,
        }}
      />
    </>
  );
}
