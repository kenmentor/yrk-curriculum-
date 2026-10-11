## ADDED Requirements

### Requirement: Floating panel with seeded threads
The system SHALL show a 380px floating/docked/minimized AI panel with the 3 reference conversations, action chips View Form and View Summary, and composer with context chip and suggestions.

#### Scenario: Seeded content present
- **WHEN** user opens dashboard
- **THEN** panel shows stalled-proposal, transfer-form, and catalog-summary threads with working action chips

### Requirement: Confirm before change plus audit
The system SHALL require explicit confirmation before any AI data change and write every AI action to the audit log with streaming + stop + citations.

#### Scenario: Guarded action
- **WHEN** AI proposes creating a form
- **THEN** nothing changes until user confirms and audit log records the action with source links
