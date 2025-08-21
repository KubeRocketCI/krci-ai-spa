import type { Metadata } from "next"
import { TechArticleSchema, HowToSchema, BreadcrumbSchema } from "../components/StructuredData"

export const metadata: Metadata = {
  title: "Quick Start Guide - Install in 3 Minutes",
  description: "Get started with KubeRocketAI in just 3 minutes. Complete installation guide, CLI commands, and step-by-step instructions for macOS, Linux, and Windows developers.",
  keywords: [
    "KubeRocketAI quickstart", "installation guide", "CLI installation",
    "developer setup", "AI agent setup", "macOS install", "Linux install",
    "brew install", "developer tools", "getting started", "tutorial"
  ],
  openGraph: {
    title: "KubeRocketAI Quick Start Guide - Install in 3 Minutes",
    description: "Complete installation guide for KubeRocketAI. Get your AI-as-Code framework running in 3 minutes with step-by-step instructions.",
    url: "https://krci-ai.kuberocketci.io/quickstart",
    type: "article",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "KubeRocketAI Quick Start Guide"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "KubeRocketAI Quick Start - Install in 3 Minutes",
    description: "Complete installation guide for KubeRocketAI. Get your AI-as-Code framework running quickly.",
    images: ["/social.png"]
  },
  alternates: {
    canonical: "https://krci-ai.kuberocketci.io/quickstart"
  }
}

export default function QuickstartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TechArticleSchema
        title="KubeRocketAI Quick Start Guide - Install in 3 Minutes"
        description="Complete installation guide for KubeRocketAI. Get your AI-as-Code framework running in 3 minutes with step-by-step instructions."
        url="https://krci-ai.kuberocketci.io/quickstart"
        keywords={["quickstart", "installation", "CLI", "tutorial", "AI-as-Code"]}
      />
      <HowToSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://krci-ai.kuberocketci.io" },
          { name: "Quick Start Guide", url: "https://krci-ai.kuberocketci.io/quickstart" }
        ]}
      />
      {children}
    </>
  )
}
