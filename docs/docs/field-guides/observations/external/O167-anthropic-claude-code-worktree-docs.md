---
observationId: O167
displayed_sidebar: fieldGuideSidebar
sidebar_position: 34
title: "Anthropic Claude Code Documentation: Git Worktrees for Parallel Sessions"
status: completed
source_type: external
source:
  authors: ["Anthropic"]
  organization: "Anthropic"
  year: 2025
  url: "https://docs.anthropic.com/en/docs/claude-code/common-workflows"
methods:
  - M162
---

# Anthropic Claude Code Documentation: Git Worktrees for Parallel Sessions

> **Source:** Anthropic (2025), Official Claude Code Documentation

Official vendor documentation from Anthropic explicitly recommending git worktrees as the solution for running parallel Claude Code sessions. This represents the highest level of industry validation—the tool's creators documenting worktrees as a first-class workflow pattern.

## Context

**Environment:**
- Organization: Anthropic (Claude AI developers)
- Document Type: Official product documentation
- Location: Common Workflows section of Claude Code docs
- Audience: Claude Code users seeking parallel execution patterns

**The Problem:**
Developers need to work on multiple tasks simultaneously with complete code isolation between Claude Code instances. Running multiple agents on the same codebase creates file conflicts and interference.

**Solution Documented:**
Git worktrees as the recommended approach for parallel Claude Code sessions.

## Key Evidence

### Official Documentation Quote

> "Git worktrees allow you to check out multiple branches from the same repository into separate directories. Each worktree has its own working directory with isolated files, while sharing the same Git history."

### Explicit Recommendation for Parallel Claude Sessions

> "Each worktree has its own independent file state, making it perfect for parallel Claude Code sessions. Changes made in one worktree won't affect others, preventing Claude instances from interfering with each other."

### Step-by-Step Workflow Provided

The documentation provides a complete workflow:

1. **Create worktrees:**
   ```bash
   git worktree add ../project-feature-a -b feature-a
   git worktree add ../project-bugfix bugfix-123
   ```

2. **Run Claude Code in each:**
   ```bash
   cd ../project-feature-a
   claude
   ```

3. **Manage worktrees:**
   ```bash
   git worktree list
   git worktree remove ../project-feature-a
   ```

### Use Case Guidance

The documentation specifies when to use this pattern:

> "For long-running tasks, you can have Claude working in one worktree while you continue development in another."

### Environment Setup Note

> "Remember to initialize your development environment in each new worktree according to your project's setup. Depending on your stack, this might include: JavaScript projects (npm install, yarn), Python projects (virtual environments), Other languages (standard setup process)."

## Analysis

### What This Establishes

1. **Vendor-endorsed pattern** - Anthropic officially documents worktrees as "perfect for parallel Claude Code sessions"
2. **First-class workflow** - Included in "Common workflows" documentation, not buried in advanced topics
3. **Complete guidance** - Step-by-step instructions with command examples
4. **Production-ready** - Includes practical considerations like environment initialization

### Why Official Documentation Matters

- **Authoritative source** - From the creators of Claude Code
- **Maintained and updated** - Official docs evolve with the product
- **Widely accessible** - Available to all Claude Code users
- **Validated approach** - Anthropic wouldn't document patterns that don't work

### FOE Insights

**Understanding:**
The documentation explicitly explains why worktrees work: "Each worktree has its own independent file state." This conceptual understanding helps developers reason about the isolation model.

**Feedback:**
Parallel execution enables faster iteration. The documentation notes you can "have Claude working in one worktree while you continue development in another"—enabling concurrent feedback loops.

**Confidence:**
Official vendor documentation provides high confidence in the pattern. When Anthropic says worktrees are "perfect for parallel Claude Code sessions," that's authoritative validation.

## Limitations

- **Product-specific** - Documentation is for Claude Code; pattern may vary for other tools
- **Assumes git knowledge** - Readers need basic git worktree understanding
- **Environment setup complexity** - Per-worktree dependencies noted but not fully solved

## Conclusion

### Verdict
**Strongly Supported** - Official vendor documentation explicitly recommending this pattern. The highest level of industry validation available for a tool-specific workflow.

### Key Learnings

1. **Worktrees are officially "perfect"** for parallel Claude Code sessions
2. **Isolation prevents interference** - Changes in one worktree won't affect others
3. **Long-running tasks benefit most** - Agent works while you continue elsewhere
4. **Environment setup required** - Each worktree needs its own dependencies

### Recommendation

**Apply this when:**
- Running multiple Claude Code instances on the same repository
- Working on independent features or bug fixes in parallel
- Long-running agent tasks that shouldn't block your local work

**Watch out for:**
- Forgetting to install dependencies in new worktrees
- Worktree sprawl (use `git worktree list` to track)
- Merge conflicts if worktrees diverge significantly

### FOE Application

| Finding | FOE Implication |
|---------|-----------------|
| "Perfect for parallel Claude Code sessions" | Direct validation for M162 method |
| "Preventing Claude instances from interfering" | Confidence through isolation |
| "Continue development in another" | Fast feedback via concurrent work |
| Environment initialization guidance | Understanding of setup requirements |

---

## References

- Anthropic. (2025). Common workflows - Claude Code Documentation. https://docs.anthropic.com/en/docs/claude-code/common-workflows

---
