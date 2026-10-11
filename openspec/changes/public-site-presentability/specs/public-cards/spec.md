## ADDED Requirements

### Requirement: One card language
The system SHALL render public cards with one treatment: `rounded-xl border bg-surface p-5/6`, single primary action, one eyebrow line + title + meta — no stuffed four-line cards.

#### Scenario: Class card
- **WHEN** a visitor scans `/s` class cards
- **THEN** each card shows eyebrow (short code + framework), title, and one meta line with air between them

### Requirement: One data-strip pattern
Data strips SHALL use the hairline `gap-px` grid with number-over-label order and valid `dt`/`dd` semantics on every page.

#### Scenario: Stats consistency
- **WHEN** a visitor compares `/s` stats with `/s/team` stats
- **THEN** both show big number above small label in the same order and style

### Requirement: Unified badges
Status/kind pills SHALL come from one `Badge` variant map (standardized border/fill/text treatment); hardcoded translucent color strings in pages SHALL be removed.

#### Scenario: Competency levels
- **WHEN** levels Introduced/Reinforced/Mastered render
- **THEN** they use Badge variants with consistent weight, radius, and contrast
