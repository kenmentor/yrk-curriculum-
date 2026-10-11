## Context

`/s/*` public site is visually forked from the admin shell: own layout (`s/+layout.svelte`, `max-w-5xl`), own token reads, per-page header/stats/card idioms. `layout.css` re-declares dark `:root` (`#0e0e10`) while `tokens.css` declares a second dark (`#282829`); pages mix both plus inline `style="color: accent"` and hardcoded translucent pill colors. Type sizes span 12px–60px with no scale; section gaps span `mt-6`–`gap-16`. Policies page (`gap-16`, sticky contents, pull-quote) is the editorial model to converge on.

## Goals / Non-Goals

**Goals:**
- One token truth, one type scale, one spacing rhythm across all `/s` pages.
- Every public page opens with the same header contract; every data strip reads identically.
- Class detail usable on 390px with no horizontal scroll; hero legible over any banner image.
- Zero new dependencies; dark-theme preserving; `svelte-check` clean.

**Non-Goals:**
- No light theme, no font-family swap (system stack stays), no CMS/preview-settings schema change.
- No admin-shell redesign; no data-model/API changes.
- No photo/art direction beyond scrim legibility.

## Decisions

- **Tokens: `tokens.css` wins, `layout.css` shrinks to import + font + cursor.** Alternative (merge into layout.css) rejected — tokens file is already the documented single truth and admin reads it too. Add `--text-strong #ededee`, `--brand-soft #b9a5f0` (small-text-safe link tint), `--section-gap` rhythm vars. Keep hex palette, adjust usage not hues.
- **Type/space as CSS utilities, not per-page classes.** Add `.eyebrow`, `.display`, `.title`, `.lede`, `.section` (py-12 sm:py-16), `.stack` gaps to `layout.css`. Alternative (a Svelte theme component) rejected — utilities retrofit 8 pages with minimal diff and survive copy-paste.
- **New `src/lib/components/public/` islands: `PageHeader`, `DataStrip`, `HeroScrim`.** Small props-only components; pages keep content. Alternative (one mega PublicPage wrapper) rejected — class-detail needs sticky sub-header and sidebar variants a wrapper can't host cleanly.
- **Class detail: sticky sub-header + chips + stacked week rows.** Term tabs move into a `sticky top-14` bar; subject `<aside>` becomes horizontal scroll chips under `lg`; week table becomes definition rows (`Topic` / `Content` / `Outcome` stacked) under `sm`, table above. Alternative (keep table + horizontal scroll) rejected — parents on phones are the primary reader.
- **Pills converge on one `Badge` variant map in tokens/components.** Migrate `LEVEL_STYLE`/`KIND_STYLE` hardcoded translucents to shared classes. Keeps per-kind hue but standardizes border/fill/text treatment and contrast.
- **Carousel: keep 6s rotation, fix targets.** ≥44px prev/next, real dots with labels, `prefers-reduced-motion` pauses rotation, arrow-key support. No new carousel lib.

## Risks / Trade-offs

- [Risk] Inline `style={accent}` preview customizations clash with `--brand-soft` → Mitigation: components accept `accent` prop, fall back to token; never hardcode `#7853da` in new code.
- [Risk] `dl` reorder (number-over-label) touches semantics → Mitigation: keep `dt`/`dd` order valid; style visually with order utilities, verify with axe spot check.
- [Risk] Sticky sub-header overlaps `s/+layout` sticky header (`top-0 h-14`) → Mitigation: sub-header `top-14`, `z-30`, with background blur matching shell.
- [Trade-off] System font stack stays — less distinctive, but zero FOUT/bundle cost and consistent with admin.
