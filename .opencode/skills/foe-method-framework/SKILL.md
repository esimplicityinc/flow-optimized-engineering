---
name: foe-method-framework
description: |
  Framework for creating and managing Flow Optimized Engineering methods. Use when creating 
  new methods, updating method maturity levels, linking observations to methods, adopting
  methods from external frameworks, or understanding the method structure. Methods are 
  practices backed by observations within Field Guides.
---

# FOE Method Framework

This skill provides the structure and principles for creating and managing methods in the Flow Optimized Engineering Field Guides system.

## What is a Method?

A method is a documented practice or approach that solves a specific engineering challenge. Methods are:
- **Actionable** - They describe something you can do
- **Evidence-backed** - They link to observations that support them
- **Maturity-tracked** - They have a maturity level indicating how well-tested they are

## Method Locations

Methods live within their parent Field Guide:

```
docs/docs/field-guides/
└── [guide-name]/
    └── methods/
        ├── established/    # Validated or Proven methods
        │   └── method-name.md
        └── emerging/       # Hypothesized or Observing methods
            └── method-name.md
```

## Maturity Levels

| Level | Value | Folder | Description |
|-------|-------|--------|-------------|
| Hypothesized | 1 | `emerging/` | Proposed, not yet tested |
| Observing | 2 | `emerging/` | Active observations underway |
| Validated | 3 | `established/` | Supporting evidence exists |
| Proven | 4 | `established/` | Multiple confirming observations |

## File Structure

See `references/method-template.md` for the complete template.

Key sections:
1. **Frontmatter** - Metadata including maturity and linked observations
2. **Overview** - What the method is and why it matters
3. **When to Use / When NOT to Use** - Applicability guidance
4. **How It Works** - Step-by-step instructions
5. **Supporting Evidence** - Link to observations

## Creating a New Method

1. Determine the maturity level (usually starts at `observing` with first observation)
2. Choose the correct folder (`emerging/` or `established/`)
3. Create the markdown file with proper frontmatter
4. Link any supporting observations
5. Include the `<RelatedObservations />` component

## Maturity Transitions

### Emerging → Established
When a method advances from Observing to Validated:
1. Move the file from `emerging/` to `established/`
2. Update the `maturity` frontmatter
3. Update the guide overview to reflect the change

### Method Graduation Criteria

| Transition | Criteria |
|------------|----------|
| Hypothesized → Observing | First observation created |
| Observing → Validated | Completed observation(s) with positive results |
| Validated → Proven | Multiple observations across different contexts |

## External Frameworks

External Frameworks are established industry methodologies (e.g., DORA, SPACE, Accelerate) that contain well-defined methods. Field Guides can **adopt** methods from these frameworks.

### Framework Location

```
docs/docs/external-frameworks/
├── overview.md
└── [framework-slug]/
    ├── overview.md         # Framework metadata and description
    └── methods/
        └── method-name.md  # Canonical method definitions
```

### Framework Status Levels

| Status | Description |
|--------|-------------|
| Emerging Standard | Gaining traction, early adoption |
| Well-Established | Widely recognized, significant adoption |
| Industry Standard | De facto standard in the industry |

### Adopting Framework Methods

To adopt an external method into a field guide:

1. Add to the guide's `overview.md` frontmatter:
   ```yaml
   adopted_methods:
     - framework: dora
       method: deployment-frequency
       foe_maturity: hypothesized
       observations: []
   ```

2. Update the MethodList component in the guide's overview:
   ```jsx
   <MethodList 
     guideId="your-guide"
     methods={[...]}
     adoptedMethods={[
       {
         framework: 'dora',
         method: 'deployment-frequency',
         foe_maturity: 'hypothesized',
         title: 'Deployment Frequency',
         description: 'How often code is deployed to production',
         frameworkTitle: 'DORA',
       },
     ]}
   />
   ```

### Key Principles

- **Reference, don't duplicate** - Canonical method lives in `/external-frameworks/`
- **Independent FOE maturity** - Track your own maturity separate from framework status
- **Add your evidence** - Link FOE observations to validate in your context
- **Cherry-pick** - Adopt individual methods, not entire frameworks

### Creating a New External Framework

See `references/external-frameworks.md` for the full template.

## References

- `references/method-template.md` - Full template with examples
- `references/maturity-levels.md` - Detailed maturity criteria
- `references/external-frameworks.md` - External framework template

## Assets

- `assets/method-scaffold.md` - Minimal copy-paste scaffold
