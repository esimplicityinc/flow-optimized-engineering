---
methodId: M159
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Use Governed AI Coding Agents"
maturity: observing
observations:
  - O158
  - O210
  - O213
  - O215
  - O218
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';

# Use Governed AI Coding Agents

<InternalMethodHeader />

Deploy AI coding tools through governed architectures that provide centralized control over LLM access, policy management, audit logging, and content exclusion rather than allowing ungoverned individual tool adoption.

:::caution Early Stage
This method is based on external research and risk analysis. Internal observations of governed vs. ungoverned tool outcomes are pending.
:::

## Overview

AI coding assistants introduce systematic security and compliance risks. Research shows approximately 40% of AI-generated code contains security vulnerabilities (Pearce et al., 2021), and ungoverned tools expose organizations to 15 categories of risk across confidentiality, integrity, availability, governance, and legal domains.

**Governed AI coding agents** are enterprise deployments that provide organizational control over:
- **LLM access** - Which models developers can use and how
- **Policy management** - Centralized rules for tool behavior
- **Audit logging** - Comprehensive tracking of AI interactions
- **Content exclusion** - Preventing sensitive code from being used as context
- **Secret scanning** - Automated detection of exposed credentials
- **MCP server governance** - Control over external tool/data access

The core insight: ungoverned AI coding tools optimize for developer convenience at the cost of organizational confidence. Governed tools accept some friction to maintain the confidence necessary for production use.

This method is distinct from technical scaffolding within repositories (see [AgentX: Constrained Autonomy](/docs/field-guides/agentic-coding/methods/established/M158-agentx-constrained-autonomy)). Governance operates at the organizational level, controlling which tools are available and how they're configured, while technical scaffolding operates at the repository level, constraining what agents can do within a codebase.

## When to Use

Use this method when:

- **Deploying AI coding tools at enterprise scale** - Multiple teams, shared codebases, compliance requirements
- **Handling sensitive data or code** - Credentials, PII, proprietary algorithms, regulated industries
- **Compliance requirements exist** - SOC 2, HIPAA, PCI-DSS, or internal security policies
- **Auditability is required** - Need to track who used AI tools, when, and for what
- **Shadow IT is a concern** - Developers may adopt ungoverned tools without approval
- **Supply chain security matters** - Need to control what dependencies AI tools can introduce

## When NOT to Use

Avoid this method when:

- **Individual experimentation** - Personal projects or learning where risk is contained
- **Governance overhead exceeds risk** - Small teams with low-sensitivity codebases
- **No governed options exist** - For your specific tooling needs (though this is increasingly rare)
- **Speed is the only priority** - Governance adds friction; if you're optimizing purely for velocity with acceptable risk, ungoverned may be appropriate

## How It Works

### Prerequisites

Before starting:
- Understanding of your organization's risk tolerance and compliance requirements
- Inventory of AI coding tools currently in use (governed and ungoverned)
- Stakeholder alignment on the need for governance

### Step 1: Assess Current Risk Exposure

Audit your organization's current AI coding tool usage:

| Question | Risk Indicator |
|----------|---------------|
| Are developers using personal AI tool accounts? | Shadow IT risk |
| Is AI-generated code reviewed differently than human code? | Quality risk |
| Can AI tools access sensitive repositories? | Confidentiality risk |
| Do you have audit trails for AI interactions? | Compliance risk |
| Are there policies for AI tool usage? | Governance risk |

Map findings to the 15 risk categories (confidentiality, integrity, availability, governance, legal).

### Step 2: Select Governed Tool Architecture

Evaluate governed AI coding platforms against your requirements:

| Capability | Why It Matters |
|------------|---------------|
| **Policy management** | Centralized control of feature availability, model access |
| **Content exclusion** | Sensitive code never used as context |
| **Audit logging** | All AI interactions tracked for compliance |
| **Secret scanning** | Automated detection of exposed credentials |
| **Network controls** | AI tool usage restricted to approved networks |
| **SSO/Identity integration** | Tie usage to corporate identity |

Examples: GitHub Copilot Enterprise, Prima Code (governed deployment), Azure OpenAI Service with enterprise controls.

### Step 3: Define Governance Policies

Create explicit policies for AI coding tool usage:

```markdown
## AI Coding Tool Policy

### Approved Tools
- [List of governed tools with links to configuration]

### Prohibited Tools
- Personal ChatGPT/Claude accounts for code generation
- Ungoverned IDE extensions
- [Other tools that bypass governance]

### Usage Requirements
- All AI-generated code must go through standard code review
- Sensitive repositories require content exclusion configuration
- Audit logs must be retained for [X] days
```

### Step 4: Configure Governance Controls

Implement technical controls that enforce policy:

1. **Content exclusion** - Configure which repositories/paths are excluded from AI context
2. **Secret scanning** - Enable automated detection in CI/CD and IDE
3. **Audit logging** - Ensure all AI interactions are logged with user identity
4. **Network controls** - Block ungoverned AI tool endpoints if necessary
5. **Policy enforcement** - Use MDM or endpoint management to control tool installation

### Step 5: Monitor and Iterate

Establish ongoing governance:

- Review audit logs for policy violations
- Track shadow IT adoption of ungoverned tools
- Measure security incidents related to AI-generated code
- Update policies as tools and risks evolve

## Example

**Scenario:** Enterprise deploying AI coding tools across 500 developers.

**Ungoverned Approach (Risk Exposure):**
- Developers use personal Copilot/Claude accounts
- No visibility into what code is sent to AI providers
- Credentials occasionally appear in AI-generated code
- No audit trail for compliance
- Inconsistent security posture across teams

**Governed Approach (Risk Prevention):**
- GitHub Copilot Enterprise deployed with SSO
- Content exclusion configured for sensitive repositories
- Secret scanning enabled with blocking on detection
- Audit logs retained for compliance review
- Centralized policy management for all teams

**Result:** Same developer productivity benefits with organizational confidence that risks are managed.

## Common Pitfalls

1. **Treating governance as checkbox compliance** - Governance should actively manage risk, not just satisfy auditors. Review audit logs, investigate anomalies, update policies.

2. **Over-restricting to the point of shadow IT** - If governed tools are too limited, developers will find ungoverned alternatives. Balance security with usability.

3. **Ignoring the productivity cost** - Governance adds friction. Measure and optimize the developer experience within governed tools.

4. **Assuming governance eliminates all risk** - Governance reduces risk; it doesn't eliminate it. AI-generated code still needs review, testing, and security scanning.

5. **Forgetting to govern MCP/tool access** - AI agents increasingly use external tools (MCP servers, APIs). Govern these access points, not just the LLM itself.

## FOE Alignment

This method supports all three FOE principles:

| FOE Principle | How Governance Enables It |
|---------------|--------------------------|
| **Understanding** | Risk analysis reveals systematic patterns; teams understand what they're protecting against |
| **Fast Feedback** | Secret scanning, audit logging, policy alerts create rapid detection loops |
| **Confidence** | Governance controls reduce uncertainty; organizations can deploy AI tools with justified confidence |

## How You Can Help

This method needs more evidence, particularly:

1. **Internal incident reports** - Document cases where ungoverned tools caused security/compliance issues
2. **Comparative studies** - Same team using governed vs. ungoverned tools
3. **Governance effectiveness metrics** - How often do controls catch issues?
4. **Developer experience data** - Does governance friction impact productivity?

If you have experience with governed AI coding deployments, [document your observation](/docs/field-guides/contributing-observations).

## Supporting Evidence

