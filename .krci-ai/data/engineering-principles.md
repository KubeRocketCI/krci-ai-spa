# Frontend Engineering Principles (Extended Reference)

This document complements `./.krci-ai/data/principles-core.md` (the enforced concise rules). When conflicts arise, the concise enforced file wins for automated agent behavior.

<goals>

## Goals

1. Sustain long-term maintainability with minimal abstraction debt.
2. Optimize for change velocity over speculative future-proofing.
3. Keep cognitive load low for new contributors.

</goals>

<core_principles>

## Core Principles (Pragmatic Interpretation)

| Principle | Interpretation in This Repo | Common Failure Mode | Correction |
|-----------|-----------------------------|----------------------|------------|
| DRY | Extract only when duplication is meaningful (same intent & likely to evolve) | Extracting helpers after 2 copy/pastes that never change | Keep inline; revisit on third occurrence |
| KISS | Prefer plain components + functions | Introducing factories or providers with one variant | Collapse to direct usage |
| YAGNI | Build only for active requirements | Adding config/flags for “future toggle” | Remove; add when ticket exists |
| SOLID (SRP) | One reason to change per file | Mixed data-fetch + UI composition | Split hook & component |
| SOLID (DIP) | UI depends on stable shapes | Deep import chains & circular deps | Introduce boundary modules |

</core_principles>

<heuristics>

## Heuristics Cheat Sheet

| Situation | Action | Rationale |
|----------|--------|-----------|
| 3rd repetition of logic | Extract helper/hook | DRY trigger |
| Component >150 LOC & multi concern | Split view/state/transform | SRP/KISS |
| Single hook doing fetch + heavy map/format | Split into `useData` + pure fn/secondary hook | Separation improves testability |
| Introduced abstraction has 1 implementation | Inline it | YAGNI |
| Added generic type param not constrained | Remove generic | KISS |

</heuristics>

<examples>

## Examples

### Before: Premature Factory

```tsx
// button-factory.ts (single variant only)
export function createButton(kind: string) {
  if (kind === 'primary') return <PrimaryButton />;
  return <PrimaryButton/>; // same
}
```

### After: Direct Export

```tsx
export { PrimaryButton } from './primary-button';
```

### Before: Overloaded Hook

```tsx
export function useAgents() {
  const [data, setData] = useState<Agent[]>();
  useEffect(()=>{ fetch('/api/agents').then(r=>r.json()).then(d=>setData(d.map(a=>({...a, label: a.name.toUpperCase()})))); },[]);
  return data;
}
```

### After: Split Fetch + Transform

```tsx
export function useRawAgents() { /* fetch only */ }
export function enrichAgents(raw: Agent[]) { /* pure transform */ }
```

</examples>

<anti_patterns>

## Anti-Patterns & Replacements

| Anti-Pattern | Why Harmful | Preferred Replacement |
|--------------|-------------|-----------------------|
| Single-implementation factory | Adds indirection | Direct component/function |
| Registry of components for static imports | Unnecessary complexity, bundling overhead | Explicit imports |
| Generic wrapper with `any` or unconstrained `<T>` | Hides type correctness | Narrow specific type |
| Large utils dumping-ground | Encourages unrelated coupling | Domain-sliced modules |
| Hook that triggers unrelated side effects | Harder to test, unpredictable | Isolate effects in dedicated hook |

</anti_patterns>

<refactor_flow>

## Refactor Decision Flow

1. Is duplication semantic (intent) vs coincidental (syntax)?
2. Will change likely happen in one place only? If yes → keep inline.
3. Is the abstraction name clearer than duplicated code? If no → inline.
4. Does extraction reduce test complexity? If yes → proceed.

</refactor_flow>

<naming_guidance>

## Naming Guidance

Prefer explicit names: `useAgentSearch`, `AgentCard`, `formatAgentCategory`. Avoid ambiguous: `processData`, `helper`, `manager`.

</naming_guidance>

<performance_measurement>

## Measuring Before Optimizing

Performance refactors require:

1. Identified bottleneck (React DevTools profiler / Web Vitals).
2. Expected measurable improvement.
3. Post-change verification.

</performance_measurement>

<state_management>

## When to Add State Management Beyond React

Only if ALL are true:

1. Cross-tree state appears in 4+ distant branches.
2. Prop drilling mitigation via context creates performance or readability issues.
3. State shape is stable and broadly consumed.
4. Profiling shows re-render inefficiency not solvable with memoization/context segmentation.

</state_management>

<deletion_policy>

## Deletion Policy

Remove unused exports, commented-out legacy code, stale types. Favor git history over commented retention.

</deletion_policy>

<escalation_rules>

## Escalation Rules (When to Ask / Reconsider)

Ask for clarification if a requested abstraction violates YAGNI but product requirement ambiguous.

</escalation_rules>

<glossary>

## Glossary (Repo-Specific)

Boundary Module: Module that converts external/raw data to internal stable shapes consumed by UI.

Semantic Duplication: Repetition of logic serving same conceptual purpose (not just similar syntax).

</glossary>

---
If uncertain, default to simplest working solution; create TODO only with owner + intended trigger condition.
