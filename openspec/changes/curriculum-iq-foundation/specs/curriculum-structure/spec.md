## ADDED Requirements

### Requirement: Canonical subject taxonomy
The system SHALL resolve subjects through a canonical table with aliases and level views, flagging academic vs vocational.

#### Scenario: Typo resolves
- **WHEN** user enters Mathemathics for Primary
- **THEN** system resolves to canonical Mathematics and does not create a duplicate subject

### Requirement: Four-level ordered tree
The system SHALL enforce Module → Unit → Topic → Sub-topic with explicit sibling order and no deeper nesting.

#### Scenario: Depth guard
- **WHEN** builder attempts a fifth level under Sub-topic
- **THEN** system rejects with depth-limit error

### Requirement: Objectives versus measurable LOs
The system SHALL store narrative objectives at Module/Unit and 1..N measurable LOs (Bloom-tagged) at Topic/Sub-topic only; analytics SHALL read leaves only.

#### Scenario: Leaf-only analytics
- **WHEN** inspector records mastery for a Sub-topic LO
- **THEN** Module rollup aggregates leaf mastery and Module objective itself carries no mastery score

### Requirement: Prerequisite DAG
The system SHALL allow cross-level prerequisite links and reject cycles.

#### Scenario: Cycle rejected
- **WHEN** builder links A requires B where B transitively requires A
- **THEN** system blocks the link with a cycle explanation

### Requirement: Delivery matrix
The system SHALL allow multi-select delivery formats constrained per level band.

#### Scenario: ECCDE constraint
- **WHEN** ECCDE Sub-topic selects Practical (Clinical)
- **THEN** system rejects as disallowed for that band while JSS allows it
