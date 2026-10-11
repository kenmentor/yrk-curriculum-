## ADDED Requirements

### Requirement: Shared PageHeader block
The system SHALL provide a `PageHeader` component (eyebrow → title → lede → controls slot) and every `/s` subpage SHALL open with it.

#### Scenario: Competencies header
- **WHEN** a visitor opens `/s/competencies`
- **THEN** they see eyebrow "Learning", Title "Competencies", a one-line lede, then the class select — in that order

#### Scenario: Controls placement
- **WHEN** a subpage has filters (class select, term tabs)
- **THEN** controls sit inside the header block's controls row, left-aligned, wrapping without layout jump
