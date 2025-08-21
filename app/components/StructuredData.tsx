import { JsonLd } from './JsonLd'

// Organization Schema
export const OrganizationSchema = () => (
  <JsonLd>
    {{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "KubeRocketCI",
      "legalName": "KubeRocketCI",
      "url": "https://krci-ai.kuberocketci.io",
      "logo": "https://krci-ai.kuberocketci.io/logo.svg",
      "description": "Open-source platform for AI-as-Code principles and AI agent management",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "technical support",
        "url": "https://github.com/KubeRocketCI/kuberocketai/issues"
      },
      "sameAs": [
        "https://github.com/KubeRocketCI",
        "https://github.com/KubeRocketCI/kuberocketai"
      ]
    }}
  </JsonLd>
)

// Software Application Schema
export const SoftwareApplicationSchema = () => (
  <JsonLd>
    {{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "KubeRocketAI",
      "applicationCategory": "DeveloperApplication",
      "applicationSubCategory": "CLI Tool",
      "operatingSystem": ["macOS", "Linux", "Windows"],
      "description": "AI-as-Code framework for development teams. Apply Pipeline-as-Code principles to AI agent management with version-controlled, project-aware AI agents.",
      "url": "https://krci-ai.kuberocketci.io",
      "downloadUrl": "https://github.com/KubeRocketCI/kuberocketai/releases",
      "releaseNotes": "https://github.com/KubeRocketCI/kuberocketai/releases",
      "softwareVersion": "latest",
      "programmingLanguage": "Go",
      "codeRepository": "https://github.com/KubeRocketCI/kuberocketai",
      "license": "https://github.com/KubeRocketCI/kuberocketai/blob/main/LICENSE",
      "author": {
        "@type": "Organization",
        "name": "KubeRocketCI"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Plugin-free IDE integration",
        "Version-controlled agent definitions",
        "Universal IDE compatibility",
        "CLI-based agent management",
        "Project-aware AI agents",
        "Built-in validation and consistency checks"
      ]
    }}
  </JsonLd>
)

// Website Schema
export const WebsiteSchema = () => (
  <JsonLd>
    {{
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "KubeRocketAI",
      "url": "https://krci-ai.kuberocketci.io",
      "description": "AI-as-Code for Development Teams - Apply Pipeline-as-Code principles to AI agent management",
      "publisher": {
        "@type": "Organization",
        "name": "KubeRocketCI"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://krci-ai.kuberocketci.io/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }}
  </JsonLd>
)

// Breadcrumb Schema (for navigation)
export const BreadcrumbSchema = ({ items }: {
  items: Array<{ name: string; url: string }>
}) => (
  <JsonLd>
    {{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    }}
  </JsonLd>
)

// Technical Article Schema (for documentation pages)
export const TechArticleSchema = ({
  title,
  description,
  url,
  dateModified = new Date().toISOString(),
  keywords = []
}: {
  title: string
  description: string
  url: string
  dateModified?: string
  keywords?: string[]
}) => (
  <JsonLd>
    {{
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": title,
      "description": description,
      "url": url,
      "dateModified": dateModified,
      "datePublished": "2024-12-19",
      "author": {
        "@type": "Organization",
        "name": "KubeRocketCI"
      },
      "publisher": {
        "@type": "Organization",
        "name": "KubeRocketCI",
        "logo": "https://krci-ai.kuberocketci.io/logo.svg"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "articleSection": "Documentation",
      "keywords": keywords,
      "about": {
        "@type": "Thing",
        "name": "AI-as-Code",
        "description": "Pipeline-as-Code principles for AI agent management"
      }
    }}
  </JsonLd>
)

// HowTo Schema (for quickstart guide)
export const HowToSchema = () => (
  <JsonLd>
    {{
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install KubeRocketAI in 3 Minutes",
      "description": "Complete step-by-step guide to install and set up KubeRocketAI CLI for AI-as-Code development",
      "totalTime": "PT3M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Terminal/Command Line"
        },
        {
          "@type": "HowToSupply",
          "name": "macOS, Linux, or Windows"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Homebrew (macOS)"
        },
        {
          "@type": "HowToTool",
          "name": "curl (Linux/Windows)"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Install Framework",
          "text": "Run the installation command for your operating system",
          "url": "https://krci-ai.kuberocketci.io/quickstart#install",
          "image": "https://krci-ai.kuberocketci.io/social.png"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Discover Agents",
          "text": "List available AI agents using krci-ai list agents",
          "url": "https://krci-ai.kuberocketci.io/quickstart#agents"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Start Using",
          "text": "Begin using agents in your IDE with the installed commands",
          "url": "https://krci-ai.kuberocketci.io/quickstart#usage"
        }
      ]
    }}
  </JsonLd>
)
