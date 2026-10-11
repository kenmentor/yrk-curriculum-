## ADDED Requirements

### Requirement: Single framework per release
The system SHALL allow exactly one framework per release with adoption path Full/Revised/Domesticated/Native plus guideline doc/ref/URL in v1.

#### Scenario: Single select enforced
- **WHEN** user picks NERDC then picks Cambridge
- **THEN** framework becomes Cambridge (replaces, not adds) and only one alignment row persists

#### Scenario: Invalid URL blocked
- **WHEN** guideline URL is not http(s)
- **THEN** Step 2 validation blocks Continue with URL error
