## ADDED Requirements

### Requirement: Guaranteed hero legibility
The hero SHALL use a `HeroScrim` gradient overlay (no `brightness()` filter or `text-shadow` hacks) keeping headline at `white/95` and sub at `white/85` legible over any banner image.

#### Scenario: Bright photo upload
- **WHEN** staff set a bright banner image
- **THEN** headline and sub remain readable without author adjustments

### Requirement: Accessible carousel
Carousel controls SHALL have ≥44px hit targets, labelled dots, visible focus, arrow-key support, and SHALL pause rotation under `prefers-reduced-motion`.

#### Scenario: Keyboard user browses banners
- **WHEN** a keyboard user tabs to the carousel and presses ArrowRight
- **THEN** focus moves visibly and the next banner shows with its dot selected
