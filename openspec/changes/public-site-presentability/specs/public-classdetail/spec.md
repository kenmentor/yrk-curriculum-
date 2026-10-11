## ADDED Requirements

### Requirement: Sticky sub-header with term tabs
The class-detail page SHALL dock its title and term tabs in a `sticky top-14 z-30` bar with shell-matching blur, so tabs never wrap-jump on scroll.

#### Scenario: Term switch mid-scroll
- **WHEN** a visitor scrolls weeks and switches from 1st to 2nd term
- **THEN** the tab bar stays visible and content updates without layout jump

### Requirement: Mobile-first subjects and weeks
Under `lg`, subjects SHALL render as horizontal scroll chips; under `sm`, week rows SHALL stack Topic / Content / Outcome vertically with no horizontal scroll.

#### Scenario: Phone parent reaches Week 1
- **WHEN** a parent on 390px opens `/s/c/basic-1`
- **THEN** Week 1 content is reachable within one viewport of scrolling past the header, with no sideways scroll
