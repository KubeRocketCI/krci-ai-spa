import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "KubeRocketAI - AI-as-Code for Development Teams",
  description:
    "Apply Pipeline-as-Code principles to AI agent management. Version-controlled, project-aware AI agents that understand your codebase.",
  generator: "v0.app",
  keywords: ["AI", "Infrastructure as Code", "CLI", "Developer Tools", "AI Agents", "DevOps"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
