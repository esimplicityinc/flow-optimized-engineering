---
methodId: M121
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: "Executable Specifications"
sidebar_label: "Executable Specifications"
description: "How living documentation supports AI-assisted development"
external_method:
  framework: bdd
  method: executable-specifications
  id: M121
foe_maturity: proven
observations:
  - internal/O100-prima-bdd-api-testing-adoption
  - internal/O157-agentx-deterministic-frameworks
  - external/O104-bdd-adoption-github-study-2020
  - external/O105-bdd-industrial-study-2018
  - external/O106-bdd-maintenance-challenges-2018
  - external/O107-bdd-systematic-review-2023
  - external/O120-tdd-defect-reduction-study
  - external/O124-accelerate-test-automation
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Executable Specifications

<ExternalMethodHeader />

## Why This Matters for Agentic Coding

Executable specifications serve as both documentation and verification. For AI-assisted development, they provide a crucial advantage: **specifications that verify themselves**.

**The AI Verification Problem:**
- AI generates code quickly, but correctness is uncertain
- Comments and documentation can't verify themselves
- Executable specs run automatically to prove behavior

**Living Context for AI:**
- Executable specs show AI what the system currently does
- New AI-generated code must pass existing specs
- Specs that pass serve as reliable context for future prompts

## Adaptations for Agentic Coding

### Specs as AI Guard Rails

Use executable specifications as constraints on AI changes:

```
Before AI modifies any code:
1. Run existing specs (all should pass)
2. Have AI make changes
3. Run specs again (all should still pass)
4. Add new specs for new behavior
```

This ensures AI doesn't break existing functionality.

### AI-Assisted Spec Writing

AI can help write executable specifications:
- Provide examples of existing specs as context
- Describe the behavior you want to specify
- Ask AI to generate the spec, then review for accuracy

### Specification-Driven Prompting

Use existing specs as part of your prompt context:

```
Here are the current specifications for the User module:
[paste relevant specs]

Add a new feature: users should be able to reset their password.
Write the specification first, then implement it.
```

## The Feedback Loop

Executable specifications create a tight feedback loop:

1. **Write spec** - Human or AI writes the expected behavior
2. **AI implements** - AI generates code to satisfy spec
3. **Spec verifies** - Automated run confirms correctness
4. **Spec documents** - Passing specs become trusted documentation

This loop runs continuously, catching AI errors immediately.

## Questions We're Exploring

- How comprehensive should specs be before trusting AI to modify code?
- Can AI maintain spec quality as it adds new ones?
- What's the right balance between spec coverage and development speed?

## Supporting Evidence

