## ADDED Requirements

### Requirement: Three-step intake wizard
The system SHALL guide intake as Step 1 Governance → Step 2 Provenance → Step 3 Review with progress, Back/Continue, and per-step validation blocking advance.

#### Scenario: Blocked advance
- **WHEN** user is on Step 1 with empty title and clicks Continue
- **THEN** system stays on Step 1 and shows inline title-required error

#### Scenario: Review creates draft
- **WHEN** user completes Steps 1–2 valid and confirms on Step 3
- **THEN** system creates a local draft and navigates to the iterative builder

### Requirement: Minimal anti-clutter layout
The system SHALL constrain intake to max-w-2xl, show one primary action per step, and disclose help text progressively.

#### Scenario: Single primary
- **WHEN** user views any wizard step
- **THEN** only Continue (or Create curriculum on final step) is styled primary and Back is ghost
