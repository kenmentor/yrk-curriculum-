## 1. Tokens + type/space foundation

- [ ] 1.1 Single-source tokens: strip `layout.css` dark duplicate, add `--text-strong` + `--brand-soft`, keep admin intact
- [ ] 1.2 Add `.eyebrow/.display/.title/.lede/.section/.stack` utilities to `layout.css`
- [ ] 1.3 Retrofit `/s` home hero + team + policies heroes to Display/eyebrow/lede

## 2. Shared public components

- [ ] 2.1 Build `PageHeader` (eyebrow→title→lede→controls) + `DataStrip` (number-over-label, valid dl) in `src/lib/components/public/`
- [ ] 2.2 Build `HeroScrim` + accessible carousel (44px targets, dots, focus, arrow keys, reduced-motion pause)
- [ ] 2.3 Unify pills into one `Badge` variant map; remove hardcoded LEVEL/KIND_STYLE strings

## 3. Page retrofits

- [ ] 3.1 Retrofit competencies / experiences / badges headers to PageHeader + Badge
- [ ] 3.2 Home rhythm pass: uniform section gaps, class cards to one card language (`p-5`, `gap-4`)
- [ ] 3.3 Team rhythm pass: fix stray eyebrow spacing, stats to DataStrip, prose to Body/60ch
- [ ] 3.4 Class-detail de-clutter: sticky `top-14` sub-header, subject chips on mobile, stacked week rows under `sm`

## 4. Verify

- [ ] 4.1 `npm run check` 0 errors + `vite build` pass
- [ ] 4.2 Eyeball 390px + 1440px: no h-scroll, header order, strip order, carousel keyboard, contrast spot-check
