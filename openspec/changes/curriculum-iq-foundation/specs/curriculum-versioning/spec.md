## ADDED Requirements

### Requirement: Three-layer time model
The system SHALL separate Definition (timeless), Release (versioned, Year), and Instance (Session + Term pinned to a Release).

#### Scenario: Teach old release while drafting new
- **WHEN** v2.4 is published and v2.5 is drafted, and 2026/2027-1st instance pins v2.4
- **THEN** edits to v2.5 do not alter the 2026/2027-1st taught content and diff v2.4→v2.5 is viewable

### Requirement: Semantic versioning
The system SHALL require vMAJOR.MINOR where MAJOR increments on subject/LO add/remove and MINOR on wording/delivery fixes.

#### Scenario: Version bump rule
- **WHEN** builder removes a Topic LO
- **THEN** system requires MAJOR bump and blocks save as MINOR-only

### Requirement: Per-framework alignment matrix
The system SHALL store one alignment row per framework with path Full/Revised/Domesticated/Native plus guideline doc/ref/URL and approval status.

#### Scenario: Dual alignment
- **WHEN** JSS Mathematics release aligns Cambridge as Full and NERDC as Domesticated with NERDC guideline ref
- **THEN** auditor views both rows independently and updating Cambridge does not touch NERDC row
