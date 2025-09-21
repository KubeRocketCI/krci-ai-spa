import type { Metadata } from 'next';
import { TechArticleSchema, BreadcrumbSchema } from '../components/StructuredData';

export const metadata: Metadata = {
  title: 'AI Agents Directory - Meet Your Development Team',
  description:
    'Discover the specialized AI agents that power the KubeRocketAI framework. Each agent brings unique expertise to accelerate your development workflow across different specializations.',
  keywords: [
    'AI agents',
    'AI team',
    'development agents',
    'specialized AI',
    'KubeRocketAI agents',
    'agent directory',
    'AI assistants',
    'development tools',
    'software agents',
    'agent management',
    'AI-as-Code agents',
    'development workflow',
    'DevOps agents',
    'quality assurance AI',
    'architecture agents',
  ],
  openGraph: {
    title: 'KubeRocketAI AI Agents Directory',
    description:
      'Meet the specialized AI agents that power the KubeRocketAI framework. Discover agents for development, architecture, quality assurance, and more.',
    url: 'https://krci-ai.kuberocketci.io/agents',
    type: 'website',
    images: [
      {
        url: '/social.png',
        width: 1200,
        height: 630,
        alt: 'KubeRocketAI AI Agents Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KubeRocketAI AI Agents Directory',
    description:
      'Discover specialized AI agents for development, architecture, QA, and more. Each agent brings unique expertise to your workflow.',
    images: ['/social.png'],
  },
  alternates: {
    canonical: 'https://krci-ai.kuberocketci.io/agents',
  },
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TechArticleSchema
        title="KubeRocketAI AI Agents Directory"
        description="Discover the specialized AI agents that power the KubeRocketAI framework. Each agent brings unique expertise to accelerate your development workflow."
        url="https://krci-ai.kuberocketci.io/agents"
        keywords={[
          'AI agents',
          'development team',
          'AI assistants',
          'KubeRocketAI',
          'agent directory',
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://krci-ai.kuberocketci.io' },
          { name: 'Agents', url: 'https://krci-ai.kuberocketci.io/agents' },
        ]}
      />
      {children}
    </>
  );
}
