---
dependencies:
  data:
    - engineering-principles.md
    - principles-core.md
---

# Code Review Task

## Task Definition

Perform a comprehensive code review for frontend changes in the KubeRocketAI showcase website.

## Overview

<instructions>
Perform comprehensive code review for frontend changes in the KubeRocketAI showcase website. Review can target specific git commits, file changes, or folder modifications. Focus on Next.js 15, React, TypeScript, and shadcn/ui best practices.
</instructions>

## Prerequisites

<requirements>
- Access to git repository and commit history
- Understanding of Next.js 15 App Router patterns
- Knowledge of shadcn/ui component architecture
- TypeScript and React best practices
- Tailwind CSS and theming standards
</requirements>

## Review Scope Options

### 1. Git Commit Review

<commit_review>

- Analyze specific git commit hash
- Review all files changed in the commit
- Check commit message quality and conventions
- Validate changes against project standards
- Identify potential breaking changes
- Review for security implications
</commit_review>

### 2. File/Folder Review

<file_review>

- Review specific files or directories
- Analyze component architecture and patterns
- Check TypeScript type safety
- Validate styling and theme integration
- Review accessibility compliance
- Check performance implications
</file_review>

### 3. Change Comparison Review

<change_review>

- Compare before/after states
- Identify regression risks
- Validate improvement claims
- Check for unintended side effects
- Review testing implications
- Analyze impact on existing functionality
</change_review>

## Review Criteria

### 1. Code Quality Standards

<code_quality>

- TypeScript strict mode compliance
- Proper type definitions and interfaces
- Clean, readable code structure
- Consistent naming conventions
- Appropriate use of React patterns
- Proper error handling implementation
- Code reusability and maintainability
</code_quality>

### 2. Architecture Compliance

<architecture_review>

- Next.js 15 App Router usage
- Proper Server/Client Component separation
- shadcn/ui component patterns
- Radix UI primitive integration
- Theme system integration
- Proper file organization and structure
- Import/export conventions
</architecture_review>

### 3. Performance Considerations

<performance_review>

- Bundle size impact analysis
- Component rendering optimization
- Image and asset optimization
- Cache strategy implementation
- Loading state handling
- Memory leak prevention
- Core Web Vitals impact
</performance_review>

### 4. Accessibility Compliance

<accessibility_review>

- WCAG 2.1 AA standard compliance
- Proper ARIA attributes usage
- Keyboard navigation support
- Screen reader compatibility
- Color contrast validation
- Focus management
- Semantic HTML structure
</accessibility_review>

### 5. Security Assessment

<security_review>

- Input validation and sanitization
- XSS prevention measures
- Secure data handling
- Third-party dependency security
- Environment variable usage
- API endpoint security
- Content Security Policy compliance
</security_review>

## Implementation Steps

### 1. Pre-Review Research (REQUIRED)

<research_requirements>

- ALWAYS search/explore codebase before reviewing changes
- Read all files being modified to understand current state
- Search for related components/patterns that might be affected
- Understand project architecture and existing conventions
- Review recent commits for context and change patterns
- NEVER review code without first understanding the broader context
</research_requirements>

### 2. Change Analysis

<analysis_steps>

- Identify scope of changes (files, components, features)
- Understand the purpose and context of changes
- Map dependencies and affected areas
- Review related documentation updates
- Check for breaking changes
- Assess testing coverage impact
</analysis_steps>

### 3. Code Review Process

<review_process>

- Examine code structure and organization
- Validate TypeScript types and interfaces
- Check React component patterns
- Review styling and theme integration
- Analyze performance implications
- Verify accessibility compliance
- Check security considerations
</review_process>

### 4. Standards Validation

<standards_validation>

- Next.js 15 best practices adherence
- shadcn/ui pattern compliance
- Tailwind CSS usage standards
- Component architecture guidelines
- File naming conventions (kebab-case required)
- Mobile-first design implementation
- Color system constraints (3-5 colors maximum)
- Typography limits (maximum 2 font families)
- Change comment usage for code modifications
- Testing strategy alignment
- Documentation requirements
- Build and deployment considerations
</standards_validation>

### 5. Issue Identification

<issue_identification>

- Code quality concerns
- Performance bottlenecks
- Accessibility violations
- Security vulnerabilities
- Breaking change risks
- Maintainability issues
- Integration problems
</issue_identification>

## Review Output Format

### 1. Summary Assessment

<summary_format>

- Overall code quality rating
- Major findings summary
- Risk assessment level
- Recommendation priority
- Approval status
- Next steps required
</summary_format>

### 2. Detailed Findings

<findings_format>

- Issue category and severity
- Specific file and line references
- Problem description
- Recommended solution
- Code examples when helpful
- Impact assessment
- Priority level
</findings_format>

### 3. Positive Highlights

<positive_highlights>

- Well-implemented patterns
- Performance improvements
- Good accessibility practices
- Clean code examples
- Innovative solutions
- Best practice adherence
</positive_highlights>

## Quality Assurance

<qa_requirements>

- Run linting and type checking
- Verify build success
- Test functionality in both themes
- Check responsive behavior
- Validate accessibility tools
- Performance impact measurement
- Security scan completion
</qa_requirements>

## Expected Deliverables

<deliverables>
1. Comprehensive review report
2. Issue categorization with priorities
3. Specific improvement recommendations
4. Code quality assessment
5. Security and accessibility findings
6. Performance impact analysis
7. Action items with clear next steps
</deliverables>

## Success Criteria

<success_metrics>

- All critical issues identified
- Clear, actionable feedback provided
- Standards compliance validated
- Risk assessment completed
- Improvement suggestions documented
- Approval/rejection decision made
- Follow-up actions defined
</success_metrics>

## Design System Review Criteria

<design_review_criteria>

**Color System Validation:**

- Count total colors used (must be 3-5 maximum)
- Verify WCAG AA contrast compliance (4.5:1 for text)
- Check color consistency across light/dark themes
- Validate accessibility with color blindness simulation

**Typography Review:**

- Confirm maximum 2 font families are used
- Check font weight distribution (headings vs body)
- Validate responsive typography scaling
- Ensure proper line-height and spacing

**Mobile-First Assessment:**

- Verify mobile (320px) design comes first
- Check tablet (768px) and desktop (1024px+) enhancements
- Validate touch targets are minimum 44px
- Test responsive breakpoint behavior

**Code Quality Standards:**

- File naming follows kebab-case convention
- Change comments used for modifications
- Existing code patterns preserved with `// ... existing code ...`
- Search-first methodology followed before changes
</design_review_criteria>

## Review Templates

<review_templates>

- High priority issues requiring immediate attention
- Medium priority improvements for next iteration
- Low priority enhancements for future consideration
- Code examples demonstrating correct patterns
- Resource links for learning and improvement
- Testing recommendations for validation
- Design system compliance checklist
- Mobile-first implementation verification
</review_templates>
