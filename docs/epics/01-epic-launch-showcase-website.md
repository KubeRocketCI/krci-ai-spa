# Epic 01: Launch Showcase Website

## Status

| Field                | Value                    |
|----------------------|--------------------------|
| Status               | Planning                 |
| Priority             | Critical                 |
| Epic Owner           | Product Owner            |
| Timeline             | Sprint 1–2 (2 weeks)     |

## Overview

### Problem Statement

Developers and AI adopters lack a fast, visual way to understand KubeRocketAI’s value without reading through code-heavy GitHub docs. This creates friction in discovery, evaluation, and stakeholder buy-in, slowing adoption and community growth. Evidence and context are detailed in PRD (BR/NFR references): limited discoverability and no dedicated landing/education experience for non-maintainers lead to longer time-to-value for evaluating developers. (PRD §1, §3)

### Goal

Enable a sub-5-minute evaluation journey (value comprehension + demo interaction) for 90% of evaluating developers within 2 weeks of launch.

### Target Users

- Primary (60%): Developers, DevOps engineers, AI practitioners evaluating agent frameworks (PRD §2)
- Secondary (30%): Senior developers/tech leads exploring team adoption (PRD §2)
- Tertiary (10%): Decision-makers reviewing shareable landing materials (PRD §4, §5)

## Scope

### What's Included

1. Landing hero with clear value proposition and primary CTAs ("Explore Demos", "View on GitHub") — BR1, BR10; NFR1, NFR5
2. Demos: embedded YouTube videos and/or interactive client-side demo stubs — BR2, BR5; NFR1, NFR4
3. SDLC integration section with simple visual and links to docs — BR3; NFR4, NFR5
4. Feature showcase tiles highlighting practical capabilities — BR4
5. Feedback and insights: links to GitHub Discussions/Issues or mailto — BR6; NFR8
6. Lightweight analytics stub to gauge traffic and CTAs — BR7; NFR8
7. Optional "What’s next" section aligned to epics — BR8

### What's Not Included

1. Authenticated user accounts or complex content management — Out of Scope (PRD §13)
2. Backend data storage or dynamic server-rendered pages — Out of Scope (PRD §13)
3. Deep technical API documentation (remains in GitHub repo) — Out of Scope (PRD §13)
4. Dark mode toggle may be deferred if needed (BR9 is P2)

### Dependencies

Epic Dependencies:

- None (first Epic; requires approved PRD and aligns to MVP Epic in PRD §6)

System Dependencies:

- Static hosting on free tier (GitHub Pages/Netlify/Vercel) — NFR2
- Modern browsers (Chrome 123+, Firefox 115+, Safari 16+, Edge 115+) — NFR4
- Lighthouse tooling for performance/accessibility validation (v10+)

External Dependencies:

- YouTube availability for embedded demos (public or unlisted videos)
- Design assets (logos/illustrations) suitable for web and dark/light backgrounds
- Links to GitHub repository and documentation

## Solution Approach

Implementation Strategy:

1. Week 1: Build site skeleton (hero, value props, CTAs), set baseline styling and metadata; add demo stubs and docs navigation; initial accessibility/performance pass
2. Week 2: Add feedback links and analytics stub; visual refinements; optional dark mode if time; cross-browser QA; publish to free hosting

Technical Approach:

- Static, zero-cost hosting; lean dependencies and optimized assets (NFR1, NFR2)
- Accessible, responsive layout meeting WCAG 2.1 AA basics (NFR3)
- Cross-browser compatible components for modern browsers (NFR4)
- Lighthouse targets ≥90 Performance and ≥90 Accessibility on landing (NFR5)

## Acceptance Criteria

1. Value proposition and CTAs are clearly visible on the landing hero (BR1, BR10)
   - Validation: UX review confirms clarity and prominence on first viewport
   - Command: `echo "Validate hero content and CTAs on first viewport"`

2. At least two demos are available via embedded YouTube and/or client-side stubs (BR2, BR5)
   - Validation: Demos load and are interactable without backend services
   - Command: `grep -R "youtube.com/embed" src/ | wc -l`

3. SDLC mapping section links to docs and explains Brief → PRD → Epics → Stories (BR3)
   - Validation: Links navigate to documentation; section presents diagram/summary
   - Command: `grep -R "docs/prd/prd.md\|Project Brief" src/ | cat`

4. Feature showcase presents practical capabilities as visual tiles (BR4)
   - Validation: Tiles visible on landing and map to capabilities listed in PRD
   - Command: `grep -R "Feature Showcase" src/ | cat`

5. Feedback path exists via Discussions/Issues or mailto link (BR6; NFR8)
   - Validation: Links function and open the correct destinations
   - Command: `grep -R "github.com/.\*\(discussions\|issues\)\|mailto:" src/ -n`

6. Lightweight analytics stub records page views and CTA clicks (BR7; NFR8)
   - Validation: Events log locally or to a privacy-friendly stub without PII
   - Command: `grep -R "analytics\|track\|cta" src/ -n`

7. Performance and accessibility meet targets on landing (NFR1, NFR5)
   - Validation: Lighthouse run shows ≥90 Performance and ≥90 Accessibility
   - Command: `lighthouse http://localhost:3000 --preset=desktop --only-categories=performance,accessibility`

8. Cross-browser checks pass on latest Chrome/Firefox/Safari/Edge (NFR4)
   - Validation: Manual smoke tests across modern browsers; no critical issues
   - Command: `echo "Verify cross-browser smoke tests: Chrome, Firefox, Safari, Edge"`

## User Stories

Planned Stories for Implementation:

**Phase 1: Foundation (Sprint 1)**

- Story 01.01: Landing Hero and Structure
  - As a developer evaluating frameworks, I want a clear value proposition and CTAs so I can quickly decide to explore demos or GitHub
  - Acceptance: Hero headline and CTAs render on first viewport; links function (BR1, BR10)
  - Dependencies: Epic 01 approved

- Story 01.02: SDLC Mapping and Docs Navigation
  - As a tech lead, I want a quick overview of how PRD/Epics/Stories relate so I can assess fit and navigate to docs
  - Acceptance: Section displays mapping and links to docs (BR3)
  - Dependencies: Story 01.01 completion

- Story 01.03: Feature Showcase Tiles
  - As a developer, I want concise capability tiles so I can understand practical benefits
  - Acceptance: Tiles list capabilities aligned to PRD (BR4)
  - Dependencies: Story 01.01 completion

**Phase 2: Demos (Sprint 1)**

- Story 01.04: YouTube Demo Embeds
  - As a developer, I want to watch short demos without setup so I can understand how agents behave
  - Acceptance: Two embedded videos load and play (BR2, BR5)
  - Dependencies: Story 01.01 completion

**Phase 3: Feedback & Insights (Sprint 2)**

- Story 01.05: Feedback Links (Discussions/Issues/Mailto)
  - As a developer, I want to leave feedback or use cases easily so I can share ideas without friction
  - Acceptance: Links available and functional (BR6)
  - Dependencies: Story 01.01 completion

- Story 01.06: Analytics Stub for Traffic and CTA Tracking
  - As a project maintainer, I want privacy-friendly analytics so I can gauge engagement
  - Acceptance: Page views and CTA click events recorded without PII (BR7, NFR8)
  - Dependencies: Story 01.05 completion

**Phase 4: QA & Launch (Sprint 2)**

- Story 01.07: Performance and Accessibility Tuning
  - As a developer, I want a fast and accessible site so I can have a good evaluation experience
  - Acceptance: Lighthouse ≥90 Performance and ≥90 Accessibility (NFR1, NFR5)
  - Dependencies: Stories 01.01–01.06 completion

- Story 01.08: Cross-browser QA and Publish
  - As a maintainer, I want to verify the site across modern browsers and publish to a free host
  - Acceptance: Smoke tests pass on Chrome/Firefox/Safari/Edge and site is live (NFR2, NFR4)
  - Dependencies: Story 01.07 completion
