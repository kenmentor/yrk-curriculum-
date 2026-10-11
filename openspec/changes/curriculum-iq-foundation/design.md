## Context

Greenfield CaaS in empty `curriculum-yrk` repo, reusing `one-school-chat` (SvelteKit 2 + Svelte 5 + Tailwind 4 + PocketBase, `libphonenumber-js`, phone-first `persons` identity). Google Form fidelity defines Sections A/B/C; collaborative workflow was truncated. Stakeholders: institutions, builders, reviewers, approvers (senate/principal), inspectors, regulators (NERDC/WAEC/NECO/NUC + Cambridge/IB/AP).

## Goals / Non-Goals

**Goals:**
- Governed curriculum identity with many-frameworks support and audit-grade provenance.
- Versioned releases decoupled from taught instances; diffable v2.4 → v2.5.
- Measurable 4-level structure with canonical subjects and cycle-safe prerequisites.
- Role-separated workflow with phone invites and full transition log.
- SvelteKit `/curriculum/*` reusing existing shell, theme, and UI kit.

**Non-Goals:**
- Tertiary/professional tracks (model reserves slots, no UI/data seeding).
- Assessment engine and learning analytics dashboards (inspector reports only store raw mastery flags for later).
- SMS gateway integration (invite links generated; delivery out of scope).
- Content migration of legacy PDFs.

## Decisions

- **SvelteKit reuse over fresh scaffold:** one-shell layout (`+layout.svelte` left nav + center + right panel), `identity/` services, `Modal/Field/Stepper/Breadcrumb/RichTextEditor` reused. Alternative fresh app rejected — duplicates auth/theme. Risk: coupling to chat repo; mitigate by treating `one-school-chat` as UI kit source, copy dont import across repos in v1.
- **PocketBase collections:** `definitions, releases, alignments, subjects, subject_aliases, nodes, los, prereqs, teams, invites, instances, transitions, inspector_reports`. Alternative Postgres rejected for v1 — PocketBase already powers identity and fits offline-first school use.
- **3-layer time (Definition→Release→Instance) over Version=Session:** enables mid-session edits without corrupting history; Instance pins `releaseId`. Semantic `vMAJOR.MINOR`; MAJOR on subject/LO add/remove, MINOR on wording/delivery fixes.
- **Alignment matrix over single adoption path:** `releases 1—N alignments {framework, path, guidelineDoc, guidelineRef, guidelineUrl, status}`. Proves per-regulator compliance; single value could not represent Cambridge-Full + NERDC-Domesticated simultaneously.
- **Canonical taxonomy + aliases over 5 lists:** `subjects {id, name, type: academic|vocational, tracks[], deptHint}` + `subject_aliases {alias → subjectId}` with normalisation (lowercase, typo map e.g. Mathemathics→Mathematics). Level lists become filtered views.
- **Fixed depth 4 + LOs at leaves:** Module/Unit hold `objective` (narrative); Topic/Sub hold 1..N `los {text, bloom, assessmentHint}`. Analytics reads leaves only. Alternative free-depth rejected — breaks scheme-of-work and gap rollups.
- **Prereq DAG with guard:** `prereqs {fromNode, toNode}` validated server-side (BFS cycle check); cross-level links allowed (JSS→P5). Rejected tree-only prereqs — real curricula reference prior levels.
- **Workflow state machine:** `Draft→Build→Review→Approve→Publish`, returns allowed one step back with comment; `Published→Inspected` is parallel (reports dont unpublish). Approver-only `Approve/Publish`; Builder cannot approve own work (separation of duties). Phone invite: `validateIdentifier` + lookup `persons` → `teams` attach or `invites {phone, role, token, expiry}` → verify joins.

## Risks / Trade-offs

- [Taxonomy seeding errors] → Mitigation: seed from form lists + alias map, reviewer sign-off before v1 lock.
- [Prereq cycles via concurrent edits] → Mitigation: transactional check on write + nightly DAG validator.
- [Role confusion (Builder≈Reviewer)] → Mitigation: one person one primary role per Release; secondary role requires owner override logged.
- [Scope creep into assessments] → Mitigation: inspector report stores only `{loId, instanceId, masteryPct, note}`; no quiz engine.
- [Cross-repo UI drift] → Mitigation: document copied components + versions in design appendix at implementation.
