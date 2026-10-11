## Why

Schools treat curricula as static PDFs locked in silos, while Nigerian compliance (NERDC/WAEC/NECO/NUC) plus international frameworks (Cambridge/IB/AP) require localisation, versioning, and audit. CurriculumIQ as 1School CaaS turns curricula into dynamic, version-controlled, collaborative, measurable data streams from ECCDE to Senior Secondary/STME (tertiary deferred).

## What Changes

- Introduce Curriculum Definition → Release → Instance time model with semantic versioning (MAJOR breaking, MINOR fix), Year on Release, Session/Term on Instance.
- Introduce per-framework Alignment matrix (framework + adoption path Full/Revised/Domesticated/Native + guideline doc/ref/URL + status) instead of single dropdown.
- Introduce canonical Subject taxonomy with aliases and level views (Pre/Primary/JSS/SSS/Vocational) replacing 5 disjoint lists; flag `academic | vocational`.
- Introduce fixed-depth 4-level tree Module → Unit → Topic → Sub-topic with explicit ordering; Objectives at Module/Unit, measurable LOs at Topic/Sub only; prerequisite DAG with cycle guard; delivery-format matrix constrained per level.
- Introduce institution workflow Draft → Build → Review → Approve → Publish → Inspect with roles Owner/Builder/Reviewer/Approver/Inspector, separation of duties for Approver, phone-number invite reusing one-school-chat identity.
- Establish SvelteKit UI shell reusing one-school-chat layout, identity services, and component kit as `/curriculum/*` routes.

## Capabilities

### New Capabilities

- `curriculum-governance`: Country (ISO), Category=level band, Title=program, Frameworks many-to-many, tertiary slots reserved but out of scope.
- `curriculum-versioning`: 3-layer time model, alignment matrix, semantic version rules, Session/Term instances pinning a Release.
- `curriculum-structure`: Department/Domain free text, canonical subjects, 4-level tree, objectives vs LOs, prereq graph, delivery formats.
- `curriculum-workflow`: Lifecycle states, role permissions, phone invite/verify/join, transition audit log, inspector reports per Instance.
- `curriculum-ui-shell`: SvelteKit + Tailwind + PocketBase reuse, layout/nav, RichTextEditor for LOs, Stepper/Breadcrumb/Modal/Field for tree editing.

### Modified Capabilities

## Impact

- New PocketBase collections for definitions, releases, alignments, subjects/aliases, nodes, LOs, teams, invites, instances, inspector reports.
- New `/curriculum/*` SvelteKit routes reusing `one-school-chat` shell; no fork of theme.
- Depends on existing identity (`persons`, `institutions`, `libphonenumber-js` validation); extends `Role` with curriculum roles.
