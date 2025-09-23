import type { Metadata } from 'next';
import { TechArticleSchema, HowToSchema, BreadcrumbSchema } from '../components/StructuredData';
import { BASE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Quick Start Guide - Install in 3 Minutes',
  description:
    'Step-by-step guide to install and use KubeRocketAI. Get started in 3 minutes with our AI-as-Code framework for enhanced development workflows.',
  keywords: [
    'KubeRocketAI quickstart',
    'installation guide',
    'CLI installation',
    'developer setup',
    'AI agent setup',
    'macOS install',
    'Linux install',
    'brew install',
    'developer tools',
    'getting started',
    'tutorial',
  ],
  openGraph: {
    title: 'KubeRocketAI Quick Start Guide - Install in 3 Minutes',
    description:
      'Step-by-step guide to install and use KubeRocketAI. Get started in 3 minutes with our AI-as-Code framework.',
    url: `${BASE_URL}/quickstart`,
    type: 'website',
    images: [
      {
        url: '/social.png',
        width: 1200,
        height: 630,
        alt: 'KubeRocketAI Quick Start Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KubeRocketAI Quick Start - Install in 3 Minutes',
    description:
      'Step-by-step guide to install and use KubeRocketAI. Get started in 3 minutes with our AI-as-Code framework.',
    images: ['/social.png'],
  },
  alternates: {
    canonical: `${BASE_URL}/quickstart`,
  },
};

export default function QuickstartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TechArticleSchema
        title="KubeRocketAI Quick Start Guide"
        description="Step-by-step guide to install and use KubeRocketAI in 3 minutes. Your journey to AI-as-Code starts here."
        url={`${BASE_URL}/quickstart`}
        keywords={['KubeRocketAI', 'quick start', 'installation', 'AI-as-Code', 'development']}
      />
      <HowToSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Quick Start Guide', url: `${BASE_URL}/quickstart` },
        ]}
      />
      {children}
    </>
  );
}
