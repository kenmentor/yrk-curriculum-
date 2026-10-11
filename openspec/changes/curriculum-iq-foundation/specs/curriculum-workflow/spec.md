## ADDED Requirements

### Requirement: Lifecycle state machine
The system SHALL enforce Draft → Build → Review → Approve → Publish with one-step returns plus parallel Inspect on Published.

#### Scenario: Happy path with return
- **WHEN** reviewer returns Build to builder with comment and builder resubmits through Review to Approve and Publish
- **THEN** every transition is logged with actor, timestamp, and comment and Publish is blocked unless state is Approved

### Requirement: Role separation
The system SHALL restrict Approve/Publish to Approver role and block a Builder from approving their own Release without owner override.

#### Scenario: Self-approval blocked
- **WHEN** builder with no approver role attempts Approve
- **THEN** system denies with separation-of-duties error and logs the attempt

### Requirement: Phone invite and join
The system SHALL invite by phone using existing identifier validation, attach existing persons to teams or issue expiring invite tokens for new persons.

#### Scenario: Existing and new invite
- **WHEN** owner invites an existing phone and a new phone as Reviewer
- **THEN** existing person is attached immediately and new phone receives a token link that auto-joins as Reviewer after verification

### Requirement: Inspector reports per Instance
The system SHALL record inspector mastery per LO per Instance without unpublishing the Release.

#### Scenario: Inspect live instance
- **WHEN** inspector submits 31% mastery for a Sub-topic LO in 2026/2027-1st
- **THEN** report is stored against that Instance and Release v2.4 remains Published
