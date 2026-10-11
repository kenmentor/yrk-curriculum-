## 1. shadcn-svelte Foundation

- [x] 1.1 Install bits-ui, clsx, tailwind-merge, tailwind-variants, @lucide/svelte; remove daisyui
- [x] 1.2 Create cn util + ui Button, Card, Input, Label, Select, Badge, Separator, Progress
- [x] 1.3 Rewrite layout.css tokens (dark-first) + +layout.svelte shell (minimal sidebar)

## 2. Procedural Intake (Single Framework)

- [x] 2.1 Build 3-step wizard (Governance → Provenance → Review) with progress + per-step validation
- [x] 2.2 Enforce single framework + adoption path + guideline triple; collapse multi to single
- [x] 2.3 Persist wizard draft to localStorage; Review creates builder draft and navigates

## 3. Iterative Builder

- [x] 3.1 Subject picker with canonical + alias resolve + band views
- [x] 3.2 Tree editor (Module/Unit/Topic/Sub, ordered, depth-guarded) with 4 collapsible sections
- [x] 3.3 LO editor (Bloom-tagged, leaves only) + delivery picker (band-filtered) + prereq linker (cycle-guarded)
- [x] 3.4 Autosave draft + validation summary (max 5) + seed carry-over from wizard

## 4. Verification

- [x] 4.1 Vitest for wizard validation, single-framework replace, builder guards
- [x] 4.2 svelte-check 0 errors + vite build pass
