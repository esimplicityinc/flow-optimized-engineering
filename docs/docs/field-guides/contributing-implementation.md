---
sidebar_position: 4
title: Contributing to Implementation
---

# Contributing to Implementation

This guide covers the technical architecture of Field Guides for contributors who want to improve the system itself.

## Architecture Overview

```
Field Guides System
├── Content (Markdown + Frontmatter)
│   ├── /docs/field-guides/
│   │   ├── overview.md
│   │   ├── {guide-name}/
│   │   │   ├── overview.md
│   │   │   └── methods/
│   │   │       ├── established/
│   │   │       └── emerging/
│   │   └── observations/
│   └── Frontmatter Schema (see below)
├── Shared Types
│   └── /src/lib/fieldGuides.ts
└── Components
    └── /src/components/
        ├── MaturityBadge/
        ├── RelatedObservations/
        ├── RelatedMethods/
        ├── GuideMaturitySummary/
        └── MethodList/
```

## Frontmatter Schemas

### Method Frontmatter

```yaml
---
title: "Method Name"
sidebar_position: 1
maturity: validated           # hypothesized | observing | validated | proven
observations:
  - observation-slug           # relative to /docs/field-guides/observations/
---
```

### Observation Frontmatter

```yaml
---
title: "Observation Name"
sidebar_position: 1
status: completed             # in-progress | completed
methods:
  - guide-name/methods/established/method-slug   # relative to /docs/field-guides/
---
```

## Shared Types

All maturity-related types and utilities live in `/src/lib/fieldGuides.ts`:

```typescript
// Maturity levels
type MaturityLevel = 'hypothesized' | 'observing' | 'validated' | 'proven';

// Level configuration
interface MaturityConfig {
  level: MaturityLevel;
  value: number;        // 1-4 for calculations
  label: string;        // Display text
  description: string;
  color: string;        // Text color
  bgColor: string;      // Background color
}

// Utility functions
calculateAverageMaturity(levels: MaturityLevel[]): number
getMaturityLevelFromAverage(average: number): MaturityLevel
getMaturityConfig(level: MaturityLevel): MaturityConfig
formatMaturityScore(average: number): string
calculateMaturityPercentage(average: number): number
```

## Maturity Thresholds

Guide maturity is calculated as the average of its method maturity values:

| Average Range | Resulting Level |
|---------------|-----------------|
| < 1.5 | Hypothesized |
| 1.5 - 2.5 | Observing |
| 2.5 - 3.5 | Validated |
| > 3.5 | Proven |

## Components

### MaturityBadge

Displays a colored badge for a maturity level.

```tsx
import MaturityBadge from '@site/src/components/MaturityBadge';

<MaturityBadge maturity="validated" />
```

**Props:**
- `maturity: MaturityLevel` - The maturity level to display

### RelatedObservations

Renders linked observations from the current method's frontmatter.

```tsx
import RelatedObservations from '@site/src/components/RelatedObservations';

// In a method doc - reads `observations` from frontmatter
<RelatedObservations />
```

### RelatedMethods

Renders linked methods from the current observation's frontmatter.

```tsx
import RelatedMethods from '@site/src/components/RelatedMethods';

// In an observation doc - reads `methods` from frontmatter
<RelatedMethods />
```

### GuideMaturitySummary

Calculates and displays a guide's overall maturity based on its methods.

```tsx
import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';

<GuideMaturitySummary guideId="agentic-coding" />
```

**Props:**
- `guideId: string` - The guide folder name (e.g., "agentic-coding")

### MethodList

Renders methods grouped by maturity (Established vs Emerging).

```tsx
import MethodList from '@site/src/components/MethodList';

<MethodList guideId="agentic-coding" />
```

## Adding a New Guide

1. Create the folder structure:
   ```
   /docs/field-guides/{guide-name}/
   ├── overview.md
   └── methods/
       ├── established/
       │   └── _category_.json
       └── emerging/
           └── _category_.json
   ```

2. Add the guide to `sidebars.ts` under the Field Guides category

3. Create the overview with the GuideMaturitySummary component

## Adding a Component

1. Create folder in `/src/components/{ComponentName}/`
2. Add `index.tsx` and `styles.module.css`
3. Import types from `@site/src/lib/fieldGuides`
4. Use Docusaurus hooks for doc metadata:
   - `useDoc()` - current doc metadata
   - `useAllDocsData()` - all docs (for cross-referencing)

## Development Workflow

```bash
# Start dev server
cd docs
npm start

# Build for production
npm run build

# Type check
npm run typecheck
```

## Testing Changes

1. Verify components render correctly in method and observation pages
2. Check maturity calculations by adjusting method maturity values
3. Test cross-linking by adding/removing observation references
4. Verify sidebar navigation reflects the structure

## Pull Request Guidelines

- Follow existing code style
- Update types in `fieldGuides.ts` if adding new concepts
- Add JSDoc comments for public functions
- Test in both dev and production builds
