# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development & Build

- `npm run dev` - Start development server with Turbopack (fastest)
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Testing

No explicit test commands found in package.json. Search the codebase for testing frameworks if needed.

## Project Architecture

This is a **Next.js 15.2.4** showcase website for KubeRocketAI built with the **App Router** architecture. The project demonstrates the KubeRocketAI SDLC methodology from idea to production.

### Technology Stack

- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: Radix UI components with Tailwind CSS 4.1.12
- **Styling**: Tailwind CSS with custom utility classes via `tailwind-merge` and `clsx`
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono (monospace) and Inter (sans-serif) from Google Fonts
- **Build Tool**: Turbopack (enabled by default in dev mode)

### Key Directory Structure

```
app/                    # Next.js App Router pages
├── layout.tsx         # Root layout with fonts and metadata
├── page.tsx           # Homepage with GitHub API integration
└── globals.css        # Global Tailwind styles

components/
└── ui/                # Reusable UI components (shadcn/ui style)
    ├── button.tsx     # Button component with variants
    ├── card.tsx       # Card components
    └── badge.tsx      # Badge component

lib/
└── utils.ts           # Utility functions (cn helper for class merging)

docs/                  # Project documentation
├── epics/             # Epic definitions
└── prd/               # Product requirements and briefs
```

### Component Architecture

- Uses **shadcn/ui** component patterns with Radix UI primitives
- Components use `class-variance-authority` (cva) for variant-based styling
- Consistent use of `cn()` utility for conditional class merging
- Dark theme enabled by default (`className="dark"` on html element)

### Styling Conventions

- **Tailwind CSS 4.x** with custom configuration
- Terminal/hacker aesthetic with green/black color scheme
- Responsive design patterns (mobile-first approach)
- Custom CSS variables defined in globals.css
- Font variables: `--font-mono` (JetBrains Mono), `--font-sans` (Inter)

### Special Features

- **GitHub API Integration**: Real-time fetching of repository stars with caching
- **Typing Animation**: Custom typewriter effect for command demonstration
- **Responsive Design**: Mobile-first approach with grid layouts
- **Performance Optimized**: Uses Next.js font optimization and static generation

### Development Patterns

- TypeScript strict mode enabled
- ESLint with Next.js and TypeScript configurations
- Client components marked with `"use client"` directive
- Custom hooks for API data fetching with error handling and caching
- Absolute imports configured with `@/*` path mapping

### AI Agent Integration

The project includes Cursor AI agent definitions in `.cursor/rules/`:

- `architect.mdc` - Software Architecture agent
- `dev.mdc` - Software Developer agent
- `ba.mdc`, `pm.mdc`, `po.mdc`, `qa.mdc` - Business analysis, PM, PO, and QA agents

These agents follow a structured YAML-based definition format with specific commands and activation prompts for different development roles.

### Content Strategy

The homepage (`app/page.tsx`) demonstrates:

- Hero section with animated terminal command
- Problem/solution messaging for KubeRocketAI framework
- Feature grid showcasing key capabilities
- Installation instructions for multiple platforms
- Architecture workflow visualization
- Real-time GitHub statistics integration

When working on this project, maintain the terminal/developer aesthetic, follow the established component patterns, and ensure all new features align with the KubeRocketAI showcase objectives.
