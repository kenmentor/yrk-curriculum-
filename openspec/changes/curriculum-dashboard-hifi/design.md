## Context

Current app is minimal shadcn shell (header + 4 links). Target is spec sections 1-8: graphite AppShell, dashboard with real numbers, AI panel, curriculum-map visuals. Svelte 5 runes, Tailwind v4, Bits UI available. No DB yet — seed JSON acts as source.

## Goals / Non-Goals

**Goals:**
- Tokens once (`tokens.css` → Tailwind theme), StatusPill single truth, light + dark day one.
- Dashboard matches reference relationships within 4px at 1440×900 (grid, spacing, colors).
- Tree/Graph/Table share filters + selection; graph via @xyflow/svelte layered layout.
- AI panel dock/float/minimize with seeded threads + confirm-before-change.

**Non-Goals:**
- Postgres/RLS, Yjs co-edit, form-builder drag-drop, SSO (phases 3-6).
- ECharts/Sankey/choropleth (donut custom SVG now; rest behind `charts/` stub).
- Visual-regression CI gating (provide data-testid hooks + baseline screenshots manually).

## Decisions

- **Custom SVG donut over ECharts for v1:** two donuts only, needs hatch patterns + center label + keyboard segments; ECharts adds 300kB for little gain. Revisit for bars/heatmaps.
- **@xyflow/svelte for graph:** pan/zoom/minimap/focus built-in vs hand-rolled SVG (would reimplement a11y + layout). Tree stays custom recursive component (virtualize >500 rows via TanStack Virtual if needed; simple slice first).
- **Seed JSON as store:** `src/lib/data/seed.ts` exports KPIs, donut splits, 5 courses, tree nodes, matrix cells. Later swapped for Drizzle queries behind same load functions.
- **Shell as CSS grid:** `grid-template-columns: var(--sidebar-w) 1fr; rows: var(--topbar-h) 1fr`; AI panel fixed layer z-40, resizable via inline width var.

## Risks / Trade-offs

- [Hatch contrast on fills] → Mitigation: 4.5:1 text pairs in tokens; axe check on pills.
- [Graph perf at 5k nodes] → Mitigation: default filter to program; virtualize tree; graph shows 2-hop focus.
- [Scope balloon] → Mitigation: Phase 1 gates on dashboard + tree/table only; matrix/graph minimal viable behind same route.
