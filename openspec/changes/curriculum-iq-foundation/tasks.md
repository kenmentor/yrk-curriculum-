## 1. Scaffolding & UI Shell

- [x] 1.1 Scaffold SvelteKit + Tailwind + PocketBase app with `/curriculum/*` routes reusing one-school-chat layout/theme/nav
- [x] 1.2 Copy in UI kit (Modal, Field, Stepper, Breadcrumb, Tabs, Pagination, RichTextEditor) and document versions
- [x] 1.3 Wire reused persons/institutions services + libphonenumber-js validation for invites

## 2. Governance & Taxonomy

- [x] 2.1 Create definitions, frameworks, subjects, subject_aliases collections; seed canonical subjects + aliases (incl. Mathemathics typo map)
- [x] 2.2 Implement definition create with ISO country, Category band, Title program, many frameworks; hide tertiary in v1
- [x] 2.3 Implement level views (Pre/Primary/JSS/SSS/Vocational) as filters over canonical subjects

## 3. Versioning & Alignment

- [x] 3.1 Create releases + alignments collections; enforce vMAJOR.MINOR rules and Year on Release
- [x] 3.2 Implement alignment matrix CRUD (path + guideline doc/ref/URL + status) per framework
- [x] 3.3 Implement instances (Session + Term pinned to Release) + Release diff v2.4→v2.5 view

## 4. Structure Tree & LOs

- [x] 4.1 Create nodes collection with fixed-depth Module/Unit/Topic/Sub + sibling order enforcement
- [x] 4.2 Implement objectives at Module/Unit and Bloom-tagged LOs at Topic/Sub; leaf-only rollup
- [x] 4.3 Implement prereqs DAG with BFS cycle guard (allow cross-level)
- [x] 4.4 Implement delivery-format multi-select with per-band allow matrix

## 5. Workflow & Teams

- [x] 5.1 Create teams, invites (phone, role, token, expiry), transitions log collections
- [x] 5.2 Implement Draft→Build→Review→Approve→Publish state machine with returns + Approver-only guard + self-approval block
- [x] 5.3 Implement phone invite flow (existing attach vs token join) + verification auto-join
- [x] 5.4 Implement inspector_reports per Instance per LO (masteryPct + note) without unpublish

## 6. Verification

- [x] 6.1 Seed JSS Mathematics v2.4 example (Cambridge-Full + NERDC-Domesticated, full tree, LOs, prereq, delivery)
- [x] 6.2 Verify cycle rejection, depth guard, ECCDE delivery guard, self-approval block, and instance pinning
