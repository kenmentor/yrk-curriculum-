## ADDED Requirements

### Requirement: Shared map state
The system SHALL share filters (school, subject, level, status, year) and selection across Tree, Graph, Matrix, and Table on /curriculum-map.

#### Scenario: Cross-highlight
- **WHEN** user selects a course in Tree
- **THEN** Graph focuses it and Table scrolls to its row

### Requirement: Tree interactions
The system SHALL render Subject→…→Outcome tree with chevron, icon, status dot, credits, progress bar, expand-all, arrows, drag-drop with prereq-break confirm, multi-select, inline rename, and context menu.

#### Scenario: Break-guard move
- **WHEN** drag moves a course breaking a prerequisite
- **THEN** confirm dialog appears and cancel keeps the tree unchanged

### Requirement: Graph layered with focus
The system SHALL layer nodes left-to-right by term with swimlanes, solid/dashed/colored edges, red cycle flags, pan/zoom/minimap, 2-hop focus, critical path, search jump, and PNG/SVG export.

#### Scenario: Cycle flagged
- **WHEN** graph contains a prerequisite cycle
- **THEN** edges show red with inline warning listing the cycle

### Requirement: Matrix gaps and table density
The system SHALL show I/R/M dots with empty row/column gap highlight and editable cells, plus a dense table with sticky header, sort, density toggle, and CSV export.

#### Scenario: Gap visible
- **WHEN** an outcome has no mappings
- **THEN** its column highlights as a coverage gap
