import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - KubeRocketAI',
  description:
    'Frequently asked questions about KubeRocketAI SDLC framework, installation, implementation, and business value.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
