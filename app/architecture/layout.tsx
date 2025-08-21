import type { Metadata } from "next"
import { TechArticleSchema, BreadcrumbSchema } from "../components/StructuredData"

export const metadata: Metadata = {
  title: "SDLC Framework Architecture - System Design",
  description: "Explore KubeRocketAI's SDLC framework architecture. Understand how AI-as-Code principles, agent management layers, and version-controlled configurations work together for scalable development.",
  keywords: [
    "SDLC framework architecture", "AI-as-Code architecture", "system design",
    "software architecture", "agent management", "development lifecycle",
    "framework design", "technical documentation", "system components",
    "enterprise architecture", "scalable AI systems"
  ],
  openGraph: {
    title: "KubeRocketAI SDLC Framework Architecture",
    description: "Deep dive into the system architecture of KubeRocketAI's SDLC framework. Learn how AI-as-Code principles enable scalable agent management.",
    url: "https://krci-ai.kuberocketci.io/architecture",
    type: "article",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "KubeRocketAI SDLC Framework Architecture Diagram"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "KubeRocketAI SDLC Framework Architecture",
    description: "Deep dive into the system architecture and design principles of KubeRocketAI's AI-as-Code framework.",
    images: ["/social.png"]
  },
  alternates: {
    canonical: "https://krci-ai.kuberocketci.io/architecture"
  }
}

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TechArticleSchema
        title="KubeRocketAI SDLC Framework Architecture"
        description="Deep dive into the system architecture of KubeRocketAI's SDLC framework. Learn how AI-as-Code principles enable scalable agent management."
        url="https://krci-ai.kuberocketci.io/architecture"
        keywords={["architecture", "SDLC", "system design", "AI-as-Code", "framework"]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://krci-ai.kuberocketci.io" },
          { name: "Architecture", url: "https://krci-ai.kuberocketci.io/architecture" }
        ]}
      />
      {children}
    </>
  )
}
