## ADDED Requirements

### Requirement: Section rhythm
The system SHALL space `/s` pages with one rhythm: sections `py-12 sm:py-16`, internal stacks `gap-4/6`, article gaps matching the policies model — no ad-hoc `mt-6/10/12` mixes on the same scroll.

#### Scenario: Home scroll breathes
- **WHEN** a visitor scrolls `/s` from hero to classes to why to policy/people
- **THEN** gaps are uniform section rhythm with a single container (`max-w-5xl`, `px-4 sm:px-6`)

### Requirement: Single container discipline
Content SHALL live in one container width; full-bleed treatments (hero) SHALL be inner-rounded, never edge-to-edge text.

#### Scenario: Narrow and wide viewports
- **WHEN** viewed at 390px and 1440px
- **THEN** no horizontal scroll occurs and text never touches viewport edges
