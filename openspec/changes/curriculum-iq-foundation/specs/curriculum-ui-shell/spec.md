## ADDED Requirements

### Requirement: Reused SvelteKit shell
The system SHALL deliver curriculum routes under `/curriculum/*` reusing the one-school-chat shell, theme, and navigation patterns.

#### Scenario: Shell parity
- **WHEN** user opens curriculum list and chat home side by side
- **THEN** sidebar, header, and theme match and Curriculum appears as a nav item

### Requirement: Reused component kit
The system SHALL reuse Modal, Field, Stepper, Breadcrumb, Tabs, Pagination, and RichTextEditor for tree and LO editing.

#### Scenario: Edit LO rich text
- **WHEN** builder edits a Topic LO
- **THEN** RichTextEditor opens with Bloom tag picker and saves formatted LO text

### Requirement: Reused phone identity
The system SHALL reuse persons/institutions services and libphonenumber-js validation for team invites.

#### Scenario: Invalid phone blocked
- **WHEN** owner enters a phone with fewer than 7 digits
- **THEN** UI blocks invite with the shared validation message
