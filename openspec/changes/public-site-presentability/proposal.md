## Why

The public school site (`/s/*`) reads as several different designers: four hero sizes, random section gaps, two card languages, and duplicated dark tokens. Parents skim on phones; the current density and inconsistency hurt trust and readability.

## What Changes

- Single-source dark tokens (remove `layout.css` duplicate, everything reads `tokens.css`); promote body text, demote muted to meta only, add `--brand-soft` link tint.
- One public type scale (Display / Title / Body / Caption + single eyebrow style) and one 8pt spacing rhythm (`section` + `stack` utilities, `max-w-5xl` container discipline).
- Shared `PageHeader` block (eyebrow → title → lede → controls) retrofitted to competencies / experiences / badges / class-detail subpages.
- One card language + one data-strip pattern (number-over-label, consistent `dl` order); class cards gain air (`p-5`, `gap-4`).
- Class-detail de-clutter: sticky sub-header with term tabs, subject chips on mobile, Content/Outcome split for readability, no horizontal scroll under `sm`.
- Hero scrim component replacing `brightness()` + `text-shadow` hacks; carousel with proper hit targets, focus, keyboard support.

## Capabilities

### New Capabilities

- `public-typography`: Display/Title/Body/Caption + eyebrow contract for all `/s` pages.
- `public-rhythm`: Section/stack spacing contract and container discipline.
- `public-pageheader`: Shared header block contract (eyebrow, title, lede, controls).
- `public-cards`: Single card + data-strip visual contract.
- `public-classdetail`: Sticky sub-header, chips, readable week rows on mobile.
- `public-hero`: Scrim + carousel accessibility contract.

### Modified Capabilities

## Impact

- Touches `src/routes/layout.css`, `src/lib/tokens.css`, `src/routes/s/+layout.svelte`, all `src/routes/s/**/*` pages; adds `src/lib/components/public/*` (PageHeader, DataStrip, PublicCard, HeroScrim).
- No data-model or API changes; no new dependencies. Visual-only, dark-theme preserving.
