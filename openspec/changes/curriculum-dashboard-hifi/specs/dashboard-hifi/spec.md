## ADDED Requirements

### Requirement: App shell grid
The system SHALL render sidebar 248px (64px collapsed), topbar 56px sticky, content max 1440px with 24px padding, keyboard navigable with active route highlight and count badges.

#### Scenario: Collapse and navigate
- **WHEN** user activates Hide and arrows through nav with Enter
- **THEN** sidebar becomes 64px icon rail with tooltips and route opens with highlight

### Requirement: KPI cards link to filtered lists
The system SHALL show Draft Courses 10, In Progress Courses 17, Draft Programs 2, In Progress Programs 3 as links with trend delta and tabular numbers.

#### Scenario: KPI navigation
- **WHEN** user activates Draft Courses card
- **THEN** system navigates to courses filtered status Draft

### Requirement: Donut cards with accessible segments
The system SHALL render Courses 65 and Programs 43 donuts with Complete/InProgress/Draft(+Error) splits, hatched Draft/Error, center Submissions label, hover tooltip, click-to-filter, legend toggle, and table alternative.

#### Scenario: Segment filter
- **WHEN** user activates Complete segment on Courses donut
- **THEN** system navigates to courses filtered Complete and legend toggle hides that segment

### Requirement: Oldest table sorted strictly
The system SHALL list oldest in-progress courses sorted strictly descending by duration with overdue dot past threshold and row-to-drawer navigation.

#### Scenario: Strict sort
- **WHEN** data holds 9,9,9,13 days and 2 months
- **THEN** order is 2 months, 13 days, then 9-day rows and overdue rows show red dot
