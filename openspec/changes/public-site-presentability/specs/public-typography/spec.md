## ADDED Requirements

### Requirement: Single public type scale
The system SHALL render all `/s` pages with one scale: Display 40/48 tight (hero only), Title 24/32, Body 16/26, Caption 13/20, and one eyebrow style (12px, semibold, 0.16em uppercase).

#### Scenario: Consistent heroes
- **WHEN** a visitor opens `/s`, `/s/team`, or `/s/policies`
- **THEN** each hero title uses Display and each eyebrow uses the identical eyebrow style

#### Scenario: Subpage headers share Title
- **WHEN** a visitor opens `/s/competencies`, `/s/experiences`, `/s/badges`, or `/s/c/[classId]`
- **THEN** the page title uses Title (not ad-hoc `text-xl`) with a lede in Body capped at ~60ch

### Requirement: Readable body copy
Body copy SHALL use `--text-strong` at 16px/1.65 max-60ch; muted text SHALL be reserved for meta/captions, and small accent text SHALL use `--brand-soft` for contrast.

#### Scenario: Parent reads week content
- **WHEN** a parent opens a class scheme week row
- **THEN** topic/content/outcome text meets 4.5:1 contrast at 14px or larger
