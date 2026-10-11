## ADDED Requirements

### Requirement: Iterative structure builder
The system SHALL let users iteratively add ordered Module/Unit/Topic/Sub nodes with depth guard and explicit ordering in one workspace.

#### Scenario: Depth blocked
- **WHEN** user adds a child under Sub-topic
- **THEN** system blocks with depth-limit message and no node is created

### Requirement: Leaf-only LOs with Bloom
The system SHALL attach 1..N Bloom-tagged LOs to Topic/Sub only and summarise count per node.

#### Scenario: LO count visible
- **WHEN** topic has 2 LOs
- **THEN** tree shows Topic badge with count 2

### Requirement: Band-filtered delivery and cycle-safe prereqs
The system SHALL filter delivery formats by band and reject cyclic prerequisite links with explanation.

#### Scenario: ECCDE clinical rejected
- **WHEN** band is ECCDE and user selects practical-clinical
- **THEN** system blocks selection with band message

#### Scenario: Cycle rejected in builder
- **WHEN** linking A→B would close a cycle
- **THEN** system blocks link and keeps existing graph unchanged

### Requirement: Autosave and validation summary
The system SHALL autosave builder draft to localStorage (debounced) and show at most 5 top validation issues.

#### Scenario: Reload restores draft
- **WHEN** user reloads builder with saved draft
- **THEN** subject, tree, LOs, and links restore intact
