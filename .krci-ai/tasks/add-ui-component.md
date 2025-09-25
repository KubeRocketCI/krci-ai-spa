---
dependencies:
  data:
    - engineering-principles.md
---

# Add UI Component Task

## Task Definition

Create a new UI component for the KubeRocketAI showcase website.

## Overview

<instructions>
Create new UI component following Next.js 15, shadcn/ui, and project-specific patterns for the KubeRocketAI showcase website. Ensure components maintain the terminal/hacker aesthetic with proper theming support.
</instructions>

## Prerequisites

<requirements>
- Next.js 15.4.7 with App Router
- TypeScript strict mode enabled
- shadcn/ui component library setup
- Tailwind CSS 4.x with terminal theme
- next-themes for dark/light mode support
</requirements>

## Implementation Steps

### 1. Pre-Implementation Research (REQUIRED)

<research_requirements>

- ALWAYS search codebase first before creating any component
- Read existing similar components to understand patterns
- Search for theme integration patterns via `lib/theme-colors.ts`
- Review component architecture in `components/ui/` directory
- Understand existing TypeScript interfaces and prop patterns
- NEVER create components without first understanding existing patterns
</research_requirements>

### 2. Component Architecture Analysis

<validation_criteria>

- Review existing component patterns in `components/ui/`
- Analyze theme integration via `lib/theme-colors.ts`
- Check existing themed components for consistency
- Verify proper TypeScript interfaces usage
</validation_criteria>

### 3. Component Creation Standards

<coding_standards>

- ALWAYS use kebab-case for file names (e.g., `login-form.tsx`, `user-avatar.tsx`)
- Use `'use client'` directive for interactive components
- Import utilities via `@/lib/utils` with `cn()` helper
- Follow shadcn/ui patterns with Radix UI primitives
- Implement proper TypeScript interfaces with BaseThemedProps
- Use class-variance-authority (cva) for variant-based styling
- Maintain terminal/hacker aesthetic (blue-to-green gradients)
- Support both dark and light themes via next-themes
- When editing existing files, use change comments: `// <CHANGE> description of what you're changing`
- For partial edits, use `// ... existing code ...` to indicate unchanged sections
</coding_standards>

### 4. Performance Optimization

<performance_requirements>

- Use React.forwardRef for proper ref forwarding
- Implement proper memoization for expensive calculations
- Optimize bundle size with tree-shaking friendly exports
- Use CSS-in-JS sparingly, prefer Tailwind classes
- ALWAYS design mobile-first, then enhance for larger screens
- Every layout decision must prioritize mobile usability (320px+)
- Follow Core Web Vitals best practices
</performance_requirements>

### 5. Accessibility Standards

<accessibility_requirements>

- Follow WCAG 2.1 AA compliance
- Implement proper ARIA attributes
- Ensure keyboard navigation support
- Provide proper focus indicators
- Test with screen readers
- Maintain color contrast ratios (4.5:1 minimum)
</accessibility_requirements>

### 6. Component Integration

<integration_steps>

- Export component from main component file
- Add to component index if applicable
- Create component demo/example usage
- Ensure proper prop validation
- Test with existing theme system
- Verify responsive behavior across breakpoints
</integration_steps>

### 7. Quality Assurance

<testing_requirements>

- Run `npm run format` for code formatting
- Run `npm run lint` for ESLint validation
- Execute `npm run build` to verify production compatibility
- Test component in both dark and light themes
- Validate responsive design on multiple screen sizes
- Check component props with TypeScript strict mode
- Verify no console errors or warnings
</testing_requirements>

## Expected Deliverables

<deliverables>
1. New component file in `components/ui/` directory
2. Proper TypeScript interfaces and prop definitions
3. Integration with project's theme system
4. Responsive design implementation
5. Accessibility compliance validation
6. Performance optimization measures
7. Clean build without errors or warnings
</deliverables>

## Success Criteria

<success_metrics>

- Component integrates seamlessly with existing design system
- Passes all ESLint and TypeScript checks
- Builds successfully for production
- Maintains performance benchmarks
- Supports both theme modes properly
- Follows established coding conventions
- No accessibility violations detected
</success_metrics>

## Design System Constraints

<design_constraints>

**Color System (REQUIRED):**

- Use EXACTLY 3-5 colors total (count them explicitly)
- 1 primary brand color + 2-3 neutrals + 1-2 accent colors maximum
- Maintain WCAG AA contrast ratios (4.5:1 for text, 3:1 for large text)
- Test colors in both light and dark modes

**Typography (REQUIRED):**

- Maximum 2 font families total
- 1 font for headings (multiple weights: 400, 600, 700)
- 1 font for body text (typically 400 and 500 weights)
- NEVER use more than 2 different font families

**Mobile-First Requirements:**

- Start with mobile (320px) design first
- Add tablet breakpoints (768px) second
- Add desktop (1024px+) enhancements last
- NEVER design desktop-first and scale down
</design_constraints>

## Common Patterns Reference

<reference_patterns>

- Use `THEME_COLORS` from `@/lib/theme-colors` for consistent styling
- Follow `ThemedButton` pattern for complex themed components
- Use `BaseThemedProps` interface for themed component props
- Implement `SizeVariant` type for size-based variations
- Follow existing `cn()` utility pattern for class merging
- Use Radix UI primitives as component foundation
- Maintain glass morphism effects with backdrop-filter
- Use kebab-case for all component file names
- Always search/read existing components before creating new ones
</reference_patterns>

```
