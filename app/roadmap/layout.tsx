import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Strategic Roadmap | KubeRocketAI',
  description: 'Discover the strategic evolution of KubeRocketAI from proven MVP framework to comprehensive AI-powered platform evolution.',
  keywords: [
    'roadmap', 'strategic vision', 'platform evolution', 'AI-as-Code', 'development framework',
    'KubeRocketAI', 'SDLC automation', 'enterprise AI', 'developer productivity'
  ],
  alternates: {
    canonical: '/roadmap'
  },
  openGraph: {
    title: 'Strategic Roadmap | KubeRocketAI',
    description: 'From proven framework to platform evolution - explore our strategic journey enabling AI-first development workflows.',
    url: '/roadmap',
  },
  twitter: {
    title: 'Strategic Roadmap | KubeRocketAI',
    description: 'From proven framework to platform evolution - explore our strategic journey enabling AI-first development workflows.',
  }
}

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
