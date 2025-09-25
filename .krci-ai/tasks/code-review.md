---
dependencies:
  data:
    - engineering-principles.md
    - principles-core.md
---

# Code Review Task

## Execution Workflow

### Step 0: User Clarification (MANDATORY)

<user_clarification>
EXECUTE: Ask user "What specific code should I review?" Accept: files, commits, directories, or PR numbers
EXECUTE: Ask user "What type of review?" Options: quick scan, standard review, deep audit
EXECUTE: Ask user "What is the context?" Options: pre-merge, bug investigation, performance, security, architecture

CONDITIONAL: IF user provides vague instructions THEN ask for specific scope using above questions
HALT: Do not proceed without explicit answers to all three questions
</user_clarification>

### Step 1: Pre-Review Research

<research_phase>
EXECUTE IN ORDER:

1. Use Read tool on all files being modified to understand current state
2. Use Grep/Glob tools to search for related components/patterns that might be affected
3. Use Read tool on package.json, tsconfig.json to understand project architecture
4. Use Bash tool to run "git log --oneline -10" for recent commits context
5. HALT if unable to complete context research - report blocker to user
</research_phase>

### Step 2: Code Analysis & Review

Execute review focusing on these areas:

- Next.js 15 App Router patterns and Server/Client Component separation
- TypeScript strict mode compliance and type safety
- React patterns: proper hooks usage, component structure, performance
- shadcn/ui and Radix UI component architecture and theming
- Tailwind CSS usage and responsive design implementation
- Accessibility: WCAG 2.1 AA compliance, ARIA attributes, keyboard navigation

### Step 3: Standards Validation

Verify compliance with project standards:

- File naming follows kebab-case convention
- Mobile-first responsive design (320px → 768px → 1024px+)
- Color system constraints (3-5 colors maximum)
- Typography limits (maximum 2 font families)
- Terminal/hacker aesthetic maintained
- Performance optimizations applied
- Security best practices followed
- Error handling implemented

### Step 4: Issue Documentation

Document each finding with:

- Severity: Critical, High, Medium, Low
- Category: Quality, Security, Performance, Accessibility, Architecture
- File: Specific file path and line numbers
- Issue: Clear description of the problem
- Solution: Actionable recommendation with code examples
- Impact: Risk assessment and affected areas

### Step 5: Final Report & QA

EXECUTE IN ORDER:

1. Use Bash tool to run validation commands from "Commands to Execute" section
2. Generate report using exact "Output Format" template below
3. CONDITIONAL: IF any validation commands fail THEN report failure details in summary
4. Mark task complete when all Success Criteria requirements met

## Commands to Execute

<commands>
Research phase:
git log --oneline -10
find . -name "*.tsx" -newer target_file.tsx
grep -r "import.*ComponentName" src/

Validation phase:
npm run lint
npm run type-check
npm run build
</commands>

Optional project-specific commands:

```
npm run test
npm run audit
```

## Review Validation Checklist

Code Quality requirements:

- TypeScript strict mode compliance
- Proper type definitions and interfaces
- Clean, readable code structure
- Consistent naming conventions
- Appropriate React patterns and hooks
- Error handling implementation
- Code reusability and maintainability

Architecture & Performance requirements:

- Next.js 15 best practices adherence
- Proper Server/Client Component usage
- Bundle size impact considered
- Loading states and caching implemented
- Memory leak prevention
- Core Web Vitals optimization

Security & Accessibility requirements:

- Input validation and sanitization
- XSS prevention measures
- WCAG 2.1 AA standard compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast validation (4.5:1 minimum)

Design System Compliance requirements:

- shadcn/ui component patterns followed
- Theme system integration correct
- Responsive breakpoints implemented
- Touch targets minimum 44px (mobile)
- Glass morphism and terminal aesthetics maintained

## Output Format

Generate summary assessment with:

- Overall Rating: Approved/Needs Changes/Rejected
- Critical Issues: Count and brief description
- Risk Level: Low/Medium/High
- Next Steps: Required actions before approval

<output_template>
[SEVERITY] Category: Issue Title
File: path/to/file.tsx:line
Problem: Description of the issue
Solution: Recommended fix with code example
Impact: Affected areas and risk assessment
</output_template>

Include positive highlights:

- Well-implemented patterns
- Performance improvements
- Good accessibility practices
- Clean code examples

## Success Criteria

Mark task complete when:

- All critical issues identified and documented
- Clear, actionable feedback provided with file:line references
- Standards compliance validated
- Build and lint commands executed successfully
- Approval/rejection decision made with reasoning
- Next steps clearly defined for the developer
