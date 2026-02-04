---
methodId: M161
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Explicit MCP Version Control"
maturity: hypothesized
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';

# Explicit MCP Version Control

<InternalMethodHeader />

Pin MCP server versions explicitly to prevent unknown changes to agent behavior. If an agent starts behaving differently, you want to know it was *your* change, not a silent upstream update.

:::caution Early Stage
This method is proposed as a best practice but has not yet been validated through internal observations. It draws on established dependency management principles applied to the agentic coding context.
:::

## Overview

When working with AI coding agents, MCP (Model Context Protocol) servers extend agent capabilities—providing access to browsers, filesystems, GitHub, documentation, and more. These servers are dependencies, and like all dependencies, they can change unexpectedly.

Using "latest" or unpinned versions creates **unknown unknowns** in your agent environment:

- A server update might change how tools behave
- API contracts might shift, causing silent failures
- Security vulnerabilities could be introduced (supply chain attacks)
- Debugging becomes harder because you don't know what changed

**Explicit MCP Version Control** applies the same discipline we use for application dependencies to our agent tooling. By pinning exact versions and updating deliberately, you maintain:

1. **Reproducibility** — The same configuration produces the same agent behavior
2. **Debuggability** — When something changes, you know whether it was your code or a dependency
3. **Security** — You control when new code enters your environment

## When to Use

Use this method when:

- **Production agentic workflows** where reproducibility matters
- **Team environments** where multiple developers share agent configurations
- **Debugging agent behavior changes** — eliminates "did the MCP server change?" as a variable
- **Security-sensitive contexts** where supply chain risk must be minimized
- **CI/CD pipelines** that use agents for automation

## When NOT to Use

Avoid this method when:

- **Early experimentation** where you want the latest features and accept instability
- **Personal throwaway environments** where reproducibility doesn't matter
- **Evaluating new MCP servers** where you're intentionally testing latest capabilities

## How It Works

### Prerequisites

Before starting:
- Agent configuration files that specify MCP servers (e.g., `.claude.json`, `claude_desktop_config.json`, `mcp.json`)
- Understanding of which MCP servers your workflows depend on
- Version information for each MCP server you use

### Step 1: Audit Current MCP Servers

Identify all MCP servers in your configuration. For each one, document:

| Server | Current Version | Source |
|--------|-----------------|--------|
| @anthropic/mcp-playwright | 1.2.3 | npm |
| @anthropic/mcp-filesystem | 0.8.1 | npm |
| custom-internal-mcp | 2.0.0 | internal registry |

### Step 2: Pin Explicit Versions

Update your configuration to specify exact versions. Instead of:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

Use explicit versions:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright@1.2.3"]
    }
  }
}
```

### Step 3: Establish an Update Process

Create a deliberate update workflow:

1. **Monitor for updates** — Subscribe to release notifications for critical MCP servers
2. **Test before updating** — Run your agent workflows against new versions in a test environment
3. **Update via PR** — Version changes should be explicit commits with clear rationale
4. **Document breaking changes** — Note any behavior differences in the PR description

### Step 4: Document Version Decisions

Add comments or a companion document explaining version choices:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright@1.2.3"],
      "_comment": "Pinned 2024-01-15. v1.3.0 changes screenshot format, testing required."
    }
  }
}
```

## Example

**Scenario:** An agent workflow that uses Playwright MCP for browser automation suddenly starts failing.

**Without version pinning:**
1. Debug the agent prompts — no changes found
2. Debug the application code — no changes found
3. Check MCP server — "maybe it updated?" — unclear
4. Spend hours isolating whether the issue is agent, code, or MCP
5. Eventually discover Playwright MCP pushed a breaking change overnight

**With version pinning:**
1. Debug the agent prompts — no changes found
2. Debug the application code — no changes found
3. Check MCP server version — pinned to 1.2.3, hasn't changed
4. Confidently focus debugging on agent/code interaction
5. Issue found in 30 minutes instead of hours

The pinned version eliminates an entire category of uncertainty.

## Common Pitfalls

1. **Pinning without an update process** — Pinning is only half the solution. Without a deliberate update process, you'll accumulate technical debt and miss security patches.

2. **Forgetting transitive dependencies** — Some MCP servers have their own dependencies. Consider whether those also need version control.

3. **Over-pinning in development** — For local development, you might want slightly looser controls to discover improvements. Balance stability with staying current.

4. **Not testing updates** — Bumping a version in a PR without testing it defeats the purpose. Always validate behavior before merging version changes.

## FOE Alignment

This method supports multiple FOE principles:

- **Build Confidence** — Eliminates a class of unknown changes, increasing certainty that observed behavior comes from your code
- **Optimize for Understanding** — Makes the agent environment explicit and inspectable; you know exactly what's running
- **Fast Feedback** — When debugging, you can quickly rule out "did the MCP change?" as a variable

## How You Can Help

This is a **hypothesized** method based on established dependency management principles. If you're interested in adding evidence:

1. Implement version pinning in your MCP configurations
2. Track incidents where unpinned versions caused issues (before) or where pinning prevented confusion (after)
3. Document your experience as an observation
4. Note any edge cases or situations where pinning created problems

Observations from different team sizes, MCP server types, and workflow complexity will help validate this method.

## Supporting Evidence

