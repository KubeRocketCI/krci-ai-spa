import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"
import { OrganizationSchema, SoftwareApplicationSchema, WebsiteSchema } from "./components/StructuredData"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: false, // Only preload when actually used
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true, // Preload since it's the main body font
})

export const metadata: Metadata = {
  metadataBase: new URL('https://krci-ai.kuberocketci.io'),
  title: {
    default: 'KubeRocketAI - AI-as-Code for Development Teams',
    template: '%s | KubeRocketAI'
  },
  description: "Apply Pipeline-as-Code principles to AI agent management. Version-controlled, project-aware AI agents that understand your codebase and team conventions.",
  keywords: [
    "AI", "Pipeline-as-Code", "CLI", "Developer Tools", "AI Agents", "DevOps",
    "Next.js", "KubeRocketAI", "TypeScript", "Pipeline as Code", "AI-as-Code", "SDLC",
    "Software Development", "Agent Management", "Version Control", "KubeRocketCI"
  ],
  alternates: {
    // Default canonical for the homepage; child routes override as needed
    canonical: '/'
  },
  authors: [{ name: 'KubeRocketCI Team', url: 'https://github.com/KubeRocketCI' }],
  creator: 'KubeRocketCI',
  publisher: 'KubeRocketCI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://krci-ai.kuberocketci.io',
    title: 'KubeRocketAI - AI-as-Code for Development Teams',
    description: 'Apply Pipeline-as-Code principles to AI agent management. Version-controlled, project-aware AI agents that understand your codebase.',
    siteName: 'KubeRocketAI',
    images: [
      {
        url: '/social.png',
        width: 1200,
        height: 630,
        alt: 'KubeRocketAI - AI-as-Code for Development Teams'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KubeRocketAI - AI-as-Code for Development Teams',
    description: 'Apply Pipeline-as-Code principles to AI agent management. Version-controlled, project-aware AI agents.',
    creator: '@KubeRocketCI',
    images: ['/social.png']
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      me: ['https://github.com/KubeRocketCI', 'https://krci-ai.kuberocketci.io']
    }
  },
  applicationName: 'KubeRocketAI',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#06b6d4' },
    { media: '(prefers-color-scheme: dark)', color: '#0891b2' }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <WebsiteSchema />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}>{children}</body>
    </html>
  )
}
