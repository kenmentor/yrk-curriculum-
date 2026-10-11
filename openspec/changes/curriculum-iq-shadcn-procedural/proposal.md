## Why

v1 DaisyUI pass works but feels cluttered and non-standard; users need a minimal, stress-free, procedural flow plus a dedicated iterative builder to complete a full curriculum without cognitive overload.

## What Changes

- **BREAKING**: Replace DaisyUI with shadcn-svelte full (Bits UI primitives, cva, cn utils, dark tokens) across all routes.
- Procedural 3-step wizard for intake: Step 1 Governance (Country, Category band, Title) → Step 2 Provenance (Single framework, Adoption path, Guideline, Version, Year) → Step 3 Review & Create. One focus per step, progress indicator, back/next, per-step validation.
- **BREAKING**: Framework single (exactly one per definition/release in v1); alignment matrix collapses to single alignment row. Multi-framework deferred post-v1.
- Iterative curriculum builder workspace after intake: subject picker (canonical + alias resolve) → Module/Unit/Topic/Sub tree editor (ordered, depth-guarded) → LO editor (Bloom-tagged, leaves only) → delivery picker (band-filtered) → prereq linker (cycle-guarded) with autosave draft + validation summary.
- Anti-clutter rules: max content width, single primary action per view, progressive disclosure, whitespace-first spacing.

## Capabilities

### New Capabilities

- `procedural-intake`: 3-step wizard behavior, per-step validation, draft persistence, review screen.
- `single-framework`: Single framework selection + adoption path + guideline model, v1 constraint messaging.
- `iterative-builder`: Tree CRUD with ordering, LO management, delivery filtering, prereq linking, builder validation summary and autosave.

### Modified Capabilities

## Impact

- Removes `daisyui` dependency and Daisy classes; adds `bits-ui`, `clsx`, `tailwind-merge`, `tailwind-variants`, `@lucide/svelte` (replaces `lucide-svelte` deprecated).
- Rewrites `src/routes/layout.css`, `+layout.svelte`, all `/curriculum/*` pages into shadcn `src/lib/components/ui/*`.
- Data model: `releases` gains single `framework` + `adoptionPath` + guideline fields; `alignments` collection deprecated in v1 UI (kept in schema for post-v1).
