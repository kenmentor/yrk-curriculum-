## Why

Schools need one calm place to see curriculum health and act on it. Reference dashboard (KPIs, donuts, oldest-in-progress, AI panel) plus live Tree/Graph/Table views turn the current intake/builder into a best-in-class national CMS for ~300 schools.

## What Changes

- App shell to spec: 248px graphite sidebar (collapsible to 64px), 56px topbar (breadcrumb, Cmd+K search, school switcher, bell, AI toggle, avatar), content max 1440px with 24px padding.
- Dashboard: 4 KPI cards (10, 17, 2, 3), 2 donut cards (65 courses, 43 programs with hatched Draft/Error), oldest-in-progress table (5 seeded rows, strict duration sort, overdue dot).
- Floating AI panel (380px, dock/float/minimize) with 3 seeded conversations, composer with context chip, confirmation-before-change + audit.
- Curriculum-map: Tree (virtualized outline + progress), Graph (layered, pan/zoom, focus, critical path, PNG/SVG export), Matrix (I/R/M dots, gap highlight), Table (shared DataTable standard).
- Tokens + StatusPill single source of truth; light baseline + dark theme day one.

## Capabilities

### New Capabilities

- `dashboard-hifi`: Shell grid, sidebar/topbar, KPI/donut/table sections per sections 1-5.
- `assistant-panel`: Floating panel, seeded threads, composer, confirm + audit per section 6.
- `curriculum-visuals`: Tree/Graph/Matrix/Table shared filters + selection per section 8.

### Modified Capabilities

## Impact

- New `src/lib/tokens.css`, `AppShell`, `Sidebar`, `TopBar`, `StatCard`, `DonutChart`, `StatusPill`, `DataTable`, `AssistantPanel`, `CurriculumTree`, `CurriculumGraph`, `OutcomeMatrix` (shadcn-svelte + Bits UI + Lucide).
- New routes `/(app)/[school]/dashboard`, `/curriculum-map`; seed data JSON with reference numbers.
- Adds `@xyflow/svelte` (graph), ECharts or LayerChart later for bars (donut custom SVG in v1).
