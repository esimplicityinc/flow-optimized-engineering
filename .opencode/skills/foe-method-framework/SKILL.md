---
name: foe-method-framework
description: |
  Framework for creating and managing Flow Optimized Engineering methods. Use when creating 
  new methods, updating method maturity levels, linking experiments to methods, or 
  understanding the method structure. Methods are practices backed by experiments within 
  Field Guides.
---

# FOE Method Framework

This skill provides the structure and principles for creating and managing methods in the Flow Optimized Engineering Field Guides system.

## What is a Method?

A method is a documented practice or approach that solves a specific engineering challenge. Methods are:
- **Actionable** - They describe something you can do
- **Evidence-backed** - They link to experiments that support them
- **Maturity-tracked** - They have a maturity level indicating how well-tested they are

## Method Locations

Methods live within their parent Field Guide:

```
docs/docs/field-guides/
└── [guide-name]/
    └── methods/
        ├── established/    # Validated or Proven methods
        │   └── method-name.md
        └── emerging/       # Hypothesized or Experimenting methods
            └── method-name.md
```

## Maturity Levels

| Level | Value | Folder | Description |
|-------|-------|--------|-------------|
| Hypothesized | 1 | `emerging/` | Proposed, not yet tested |
| Experimenting | 2 | `emerging/` | Active experiments underway |
| Validated | 3 | `established/` | Supporting evidence exists |
| Proven | 4 | `established/` | Multiple confirming experiments |

## File Structure

See `references/method-template.md` for the complete template.

Key sections:
1. **Frontmatter** - Metadata including maturity and linked experiments
2. **Overview** - What the method is and why it matters
3. **When to Use / When NOT to Use** - Applicability guidance
4. **How It Works** - Step-by-step instructions
5. **Supporting Evidence** - Link to experiments

## Creating a New Method

1. Determine the maturity level (usually starts at `experimenting` with first experiment)
2. Choose the correct folder (`emerging/` or `established/`)
3. Create the markdown file with proper frontmatter
4. Link any supporting experiments
5. Include the `<RelatedExperiments />` component

## Maturity Transitions

### Emerging → Established
When a method advances from Experimenting to Validated:
1. Move the file from `emerging/` to `established/`
2. Update the `maturity` frontmatter
3. Update the guide overview to reflect the change

### Method Graduation Criteria

| Transition | Criteria |
|------------|----------|
| Hypothesized → Experimenting | First experiment created |
| Experimenting → Validated | Completed experiment(s) with positive results |
| Validated → Proven | Multiple experiments across different contexts |

## References

- `references/method-template.md` - Full template with examples
- `references/maturity-levels.md` - Detailed maturity criteria

## Assets

- `assets/method-scaffold.md` - Minimal copy-paste scaffold
