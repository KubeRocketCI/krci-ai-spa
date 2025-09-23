import type { Metadata } from 'next';
import { TechArticleSchema, BreadcrumbSchema } from '../components/StructuredData';
import { BASE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'SDLC Framework Architecture - System Design',
  description:
    "Explore KubeRocketAI's SDLC framework architecture. Understand how AI-as-Code principles, agent management layers, and version-controlled configurations work together for scalable development.",
  keywords: [
    'SDLC framework architecture',
    'AI-as-Code architecture',
    'system design',
    'software architecture',
    'agent management',
    'development lifecycle',
    'framework design',
    'technical documentation',
    'system components',
    'enterprise architecture',
    'scalable AI systems',
  ],
  openGraph: {
    title: 'KubeRocketAI SDLC Framework Architecture',
    description:
      "Deep dive into the system architecture of KubeRocketAI's SDLC framework. Learn how AI-as-Code principles enable scalable agent management.",
    url: `${BASE_URL}/architecture`,
    type: 'article',
    images: [
      {
        url: '/social.png',
        width: 1200,
        height: 630,
        alt: 'KubeRocketAI SDLC Framework Architecture Diagram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KubeRocketAI SDLC Framework Architecture',
    description:
      "Deep dive into the system architecture and design principles of KubeRocketAI's AI-as-Code framework.",
    images: ['/social.png'],
  },
  alternates: {
    canonical: `${BASE_URL}/architecture`,
  },
};

export default function ArchitectureLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TechArticleSchema
        title="KubeRocketAI Technical Architecture"
        description="High-level overview of the KubeRocketAI framework, including our technology stack, data models, and component architecture."
        url={`${BASE_URL}/architecture`}
        keywords={['architecture', 'technology stack', 'data models', 'AI-as-Code']}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Architecture', url: `${BASE_URL}/architecture` },
        ]}
      />
      {children}
    </>
  );
}
