---
methodId: M162
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Worktree-Based Agent Isolation"
maturity: observing
observations:
  - O162
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';

# Worktree-Based Agent Isolation

<InternalMethodHeader />

Give each parallel agent its own git worktree to prevent file conflicts and enable true concurrent development on the same repository.

## Overview

When running multiple AI coding agents in parallel (whether Claude Code instances, Codex agents, or mixed tools), they inevitably conflict if they share a working directory. One agent's uncommitted changes collide with another's. File locks cause failures. Merge conflicts accumulate faster than they can be resolved.

**Worktree-Based Agent Isolation** uses git's built-in worktree feature to give each agent a completely separate working directory, all backed by the same repository. Each agent works in isolation, commits independently, and conflicts are resolved through normal git merging rather than runtime collisions.

This pattern has converged across multiple tools simultaneously:
- **OpenAI Codex App** (Feb 2026) ships with built-in worktree support
- **Claude Code parallel instances** tutorials recommend worktrees
- **Production workflows** increasingly rely on this for agent farms

The key insight: *Treat each agent like a developer on their own branch, not like multiple cursors in the same file.*

## When to Use

Use this method when:

- Running 2+ AI coding agents on the same repository simultaneously
- Agents are working on independent tasks that don't require real-time coordination
- You want to maximize parallel throughput without agent-to-agent blocking
- Tasks are naturally decomposable (e.g., "fix these 5 bugs" = 5 worktrees)

## When NOT to Use

Avoid this method when:

- Agents need to see each other's uncommitted changes in real-time
- Tasks are tightly coupled and require sequential handoffs
- Your repository is too large for multiple worktrees (disk space)
- You only run one agent at a time anyway

## How It Works

### Prerequisites

Before starting:
- Understand basic git worktree commands
- Have sufficient disk space (each worktree is a full checkout)
- Know how your project handles dependencies across worktrees (node_modules, venv, etc.)

### Step 1: Create Worktrees for Parallel Tasks

For each parallel agent, create a dedicated worktree:

```bash
# Create worktrees for parallel work
git worktree add ../project-agent-1 -b feature/task-1
git worktree add ../project-agent-2 -b feature/task-2
git worktree add ../project-agent-3 -b feature/task-3
```

Each worktree gets:
- Its own directory with full file checkout
- Its own branch for isolated commits
- Shared git history with the main repo

### Step 2: Assign Agents to Worktrees

Launch each agent instance pointing to its dedicated worktree:

```bash
# Terminal 1
cd ../project-agent-1
claude-code "Implement the user authentication feature"

# Terminal 2
cd ../project-agent-2
claude-code "Add the payment processing module"

# Terminal 3
cd ../project-agent-3
claude-code "Create the admin dashboard"
```

Each agent now operates in complete isolation.

### Step 3: Handle Dependencies

Most projects need per-worktree dependencies:

```bash
# For Node.js projects - each worktree needs its own node_modules
cd ../project-agent-1 && npm install
cd ../project-agent-2 && npm install
cd ../project-agent-3 && npm install

# For Python projects - use separate venvs or let each agent manage its own
cd ../project-agent-1 && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
```

**Tip:** Add dependency installation to your agent's startup instructions.

### Step 4: Merge Completed Work

As agents complete their tasks:

```bash
# Return to main repo
cd ../project

# Merge completed work
git merge feature/task-1  # Agent 1's work
git merge feature/task-2  # Agent 2's work
git merge feature/task-3  # Agent 3's work

# Clean up worktrees
git worktree remove ../project-agent-1
git worktree remove ../project-agent-2
git worktree remove ../project-agent-3
```

Conflicts are resolved through normal git merging, not runtime file collisions.

## Example

**Scenario:** Parallelize fixing 3 independent bugs

```bash
# Setup
git worktree add ../fix-login-bug -b fix/login-validation
git worktree add ../fix-search-bug -b fix/search-pagination  
git worktree add ../fix-export-bug -b fix/csv-export-encoding

# Launch agents (in separate terminals)
cd ../fix-login-bug && claude-code "Fix the login validation bug in auth.ts - see issue #234"
cd ../fix-search-bug && claude-code "Fix pagination in search results - see issue #235"
cd ../fix-export-bug && claude-code "Fix CSV export encoding issue - see issue #236"

# All three agents work simultaneously without conflicts
# Each commits to their own branch
# Merge when complete
```

**Result:** 3 bugs fixed in parallel in ~1x time instead of 3x time.

## Common Pitfalls

1. **Forgetting dependency installation** - Each worktree needs its own node_modules, venv, etc. Agents will fail mysteriously without them.

2. **Worktree sprawl** - Clean up worktrees after merging. Use `git worktree list` to track them.

3. **Shared state outside git** - Databases, caches, or external services may still conflict. Consider per-worktree environment variables.

4. **Branch naming collisions** - Use a naming convention like `agent-1/task-name` to avoid conflicts.

5. **Merging too late** - Don't let worktrees diverge too far from main. Merge frequently to reduce conflict size.

## FOE Alignment

This method supports multiple FOE principles:

**Build Confidence Through Evidence:**
- Each agent's work is isolated and testable before merging
- Conflicts surface at merge time, not runtime
- You can verify each agent's branch independently

**Optimize for Fast Feedback:**
- Parallel execution dramatically reduces total time
- No blocking on file locks or uncommitted changes
- Each agent gets immediate feedback in its own context

**Optimize for Understanding:**
- Clean separation makes it easier to understand what each agent did
- Git history shows exactly which changes came from which task
- No tangled commits mixing multiple features

## External Evidence

- **OpenAI Codex App** (Feb 2026): Ships with built-in worktree support for parallel agents
- **YouTube tutorials** (multiple, Jan-Feb 2026): Claude Code parallel workflows increasingly recommend worktrees
- **Production practice**: Multiple teams reporting 2-4x throughput with worktree-isolated agent pools
- **Git documentation**: Worktrees designed for exactly this use case (parallel development)

## How You Can Help

If you're testing this method:

1. Set up 2-3 parallel agents using worktrees
2. Track time-to-completion vs sequential execution
3. Note any friction points (dependency management, merge conflicts)
4. Document your experience as an observation

## Supporting Evidence

