## Context

Foundation change shipped DaisyUI + multi-framework + single-page forms. Feedback: cluttered, non-standard, framework-many causes decision fatigue. Svelte 5 + Tailwind 4 base is solid; UI layer needs shadcn-svelte standardisation. Users are institution owners/clerks with low tolerance for dense admin UI.

## Goals / Non-Goals

**Goals:**
- shadcn-svelte full UI: Button/Card Input Label Select Badge Separator Progress Dialog via Bits UI + cva + cn.
- Procedural intake (3 steps, one focus each, max-w-2xl, single primary action).
- Single framework in v1 with clear constraint copy.
- Iterative builder that can produce a complete tree + LOs + delivery + prereqs without leaving the workspace.

**Non-Goals:**
- Multi-framework matrix UI (deferred; schema kept).
- Rich-text LO editor (textarea + Bloom select in v1; Tiptap deferred).
- PocketBase live persistence (localStorage draft autosave in v1; server sync next change).
- Light theme (dark-first to match 1School).

## Decisions

- **shadcn-svelte hand-rolled minimal over CLI init:** CLI is interactive and pulls full registry; hand-rolled Button/Card/Input/Label/Select/Badge/Progress/Separator with Bits UI + tailwind-variants gives same API surface with reviewable diff. Alternative DaisyUI kept rejected — non-standard classnames, hard to match 1School design system.
- **Wizard state in Svelte runes + localStorage:** `step`, `draft`, per-step `validateStep()` pure functions testable in vitest. Alternative URL-param steps rejected — draft would leak PII in history.
- **Single framework enforced both UI and domain:** `release.framework: Framework` (singular) + `adoptionPath` + guideline triple. Multi-select removed. Migration: existing multi rows collapse to first approved row; documented in tasks.
- **Builder as single workspace with 4 collapsible sections:** Subject → Structure → Learning → Setup (delivery/prereq). Progressive disclosure: only current section expanded fully; others summarised. Alternative multi-page builder rejected — loses context, more navigation stress.
- **Anti-clutter tokens:** max-w-2xl intake, max-w-4xl builder, 16px base spacing, muted descriptions, single `Continue` primary per step, secondary `Back` ghost only.

## Risks / Trade-offs

- [shadcn API drift] → Mitigation: pin bits-ui, wrap primitives thinly so upgrades are localised to `ui/*`.
- [Single-framework backlash from intl schools] → Mitigation: copy explains v1 constraint + post-v1 multi; schema retains alignments table.
- [Builder complexity creep] → Mitigation: validation summary caps at 5 issues, autosave debounced, no rich text in v1.
