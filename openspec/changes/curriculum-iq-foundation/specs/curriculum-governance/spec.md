## ADDED Requirements

### Requirement: Governed curriculum identity
The system SHALL model Category as level band and Title as program, with Country as ISO code and Frameworks as many-to-many.

#### Scenario: Create Lower Basic definition
- **WHEN** owner creates definition with country NG, category Basic Education, title Lower Basic P1-3, frameworks [NERDC, WAEC]
- **THEN** system stores one definition linked to two frameworks and rejects free-text country variants

### Requirement: Tertiary deferred
The system SHALL reserve tertiary/professional category slots without exposing creation UI in v1.

#### Scenario: Tertiary hidden
- **WHEN** user lists creatable categories in v1
- **THEN** system shows ECCDE through STME/ABEC only and documents tertiary as reserved
