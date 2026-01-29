---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: External Frameworks
---

# External Frameworks

External Frameworks are established industry methodologies that contain well-defined methods. Field Guides can **adopt** individual methods from these frameworks, integrating them with native methods while tracking independent FOE maturity.

## How It Works

```
External Framework (e.g., DORA, SPACE)
    └── Methods (canonical definitions)
            └── Adopted by Field Guides
                    └── Experiments (FOE evidence for your context)
```

When you adopt a method from an external framework:

1. **Reference, don't duplicate** - The canonical method definition lives here
2. **Independent maturity** - Track your own FOE maturity level for each adopted method
3. **Add your evidence** - Link experiments to validate the method in your context
4. **Visual distinction** - Adopted methods appear alongside native methods with a framework badge

## Framework Maturity Levels

Frameworks themselves have an establishment status:

| Status | Meaning |
|--------|---------|
| **Emerging Standard** | Gaining traction, early adoption phase |
| **Well-Established** | Widely recognized, significant adoption |
| **Industry Standard** | De facto standard in the industry |

## Available Frameworks

import FrameworkList from '@site/src/components/FrameworkList';

<FrameworkList frameworks={[
  {
    slug: 'dora',
    title: 'DORA Metrics',
    description: 'Research-backed metrics for measuring software delivery and operational performance.',
    status: 'industry-standard',
    methodCount: 4,
  },
]} />

---

## Adopting Framework Methods

To adopt a method from an external framework into your field guide, add it to the guide's `overview.md` frontmatter:

```yaml
---
title: "Your Field Guide"
adopted_methods:
  - framework: dora
    method: deployment-frequency
    foe_maturity: experimenting
    experiments:
      - internal/your-experiment-slug
---
```

The adopted method will appear in your guide's Emerging or Established sections based on its `foe_maturity` level, with a badge indicating its source framework.

---

## Contributing Frameworks

To add a new external framework:

1. Create a directory under `/external-frameworks/[framework-slug]/`
2. Add an `overview.md` with framework metadata
3. Add method definitions under `methods/`

See the existing frameworks for examples of the required structure.
