## Frontend Engineering Principles (Enforced)

These principles MUST be loaded before any code generation, refactor, or review. If this file is missing or unreadable: HALT and report the exact path.

<core_rules>

## 1. Core Pragmatic Rules

DRY: Extract only after the same intent/logic appears in ≥3 places OR proven instability. Avoid speculative abstraction.

KISS: Prefer a simple function/component over patterns (factories, registries, base classes) unless ≥2 real current variations.

YAGNI: No config flags, generics, adapters, caching, or state libraries until a present requirement demands them.

SOLID (Pragmatic):

- SRP: One reason to change per file/component. If handling data + rendering + formatting → split.
- Open/Closed: Extend via composition & props, not inheritance.
- LSP: Avoid inheritance entirely in React code; prefer composition & discriminated unions.
- Interface Segregation: Keep props & exported types minimal and purposeful.
- Dependency Inversion: UI depends on stable data-shapes; avoid cross-import cycles.

</core_rules>

<guardrails>

## 2. Frontend Guardrails

- Max component file: ~150 LOC (soft); if exceeding & multi-concern → refactor.
- Hooks do either data fetching OR transformation (unless trivial).
- No global state library (Redux/Zustand/etc.) unless documented local+context limitations.
- Avoid prop drilling beyond 3 levels → introduce a focused context.
- No generic <T, U, V> noise without constraints & real reuse.
- Avoid re-export barrels that inflate bundles unless measured win.
- Prefer explicit named exports over default unless a single primary item.

</guardrails>

<refactor_triggers>

## 3. Refactor Triggers

Trigger extraction when ANY of:

1. Logic duplicated (semantic intent) 3+ times.
2. Conditional rendering branches ≥3 with distinct responsibilities.
3. Re-render hotspot identified through profiling (then isolate/memo).
4. Type unions ≥4 variants causing repetitive switches → central mapping.
5. Complex async orchestration inside component → move to hook.

</refactor_triggers>

<prohibited>

## 4. Prohibited Without Justification

- Abstractions with a single implementation (e.g., Factory, Manager, Registry) “for future”.
- Adapter layers over internal modules you own directly.
- Premature caching/memo layers for unprofiled paths.
- Broad utility dumping grounds (avoid `utils.ts` fat growth—split by domain).
- Over-generic event buses; use direct props/callbacks first.

</prohibited>

<justification_format>

## 5. Justification Requirements

If introducing an abstraction / helper / hook:

Provide a short block in your response:

```text
Abstraction Justification:
- Trigger: (duplication | complexity | performance | API boundary)
- Benefit: (clarity | reuse | isolation | perf)
- Alternatives considered: (inline | variant prop | composition) → rejected because <reason>
```

If keeping logic inline while a potential abstraction exists, add inline comment:
`// kept inline (KISS/YAGNI)`.

</justification_format>

<review_checklist>

## 6. Review Checklist (AI MUST self-apply)

- Searched for existing similar component/hook first.
- Verified no simpler existing extension point.
- Confirmed real (not hypothetical) second variant before abstraction.
- Ensured types are minimal & accurately constrained.
- Ensured no dead exports or unreferenced props after change.

</review_checklist>

## 7. Conflict Resolution

If any other file conflicts with this one for React/Next.js frontend code, THIS FILE TAKES PRIORITY.

<output_summary>

## 8. Output Summary Requirement

Every significant code-producing response MUST end with a line:
`Principles applied: DRY(<yes/no>), KISS(<action>), YAGNI(<action>), SOLID(<notes>)`

</output_summary>

<non_abstractions>

## 9. When NOT to Abstract (Explicit Non-Actions)

- Single-use formatting logic.
- One-off data massaging for a specific component.
- A variant that may or may not appear “later”.
- Temporary experimental scaffolding—delete instead of abstracting if dropped.

</non_abstractions>

<deletion_policy>

## 10. Deletion over Preservation

Remove dead code, unused types, and obsolete props immediately—do not comment them out.

</deletion_policy>
