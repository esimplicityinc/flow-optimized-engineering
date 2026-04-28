---
methodId: M159
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Use Governed AI Coding Agents"
maturity: proven
priority: essential
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

Deploy AI agents through governed architectures that provide centralized control over LLM access, tool execution, policy management, audit logging, and content exclusion rather than allowing ungoverned individual tool adoption.

## The Risk Landscape

AI coding agents are the most overprivileged tools most organizations have ever deployed. A typical agent — Claude Code, Cursor, Copilot, Windsurf, Devin — operates with:

- **Full filesystem access** — Read and write to any file in the repository, including `.env` files, credential stores, SSH keys, and configuration
- **Shell execution** — Run arbitrary commands with the developer's permissions: `curl`, `npm install`, `git push`, `rm -rf`, and anything else
- **Network access** — Make HTTP requests to any endpoint, including internal APIs, cloud provider metadata services, and external servers
- **MCP server access** — Connect to external tool servers that may themselves have access to databases, Slack workspaces, cloud infrastructure, or third-party services
- **Context window ingestion** — Silently read thousands of files to build context, with no visibility into what was sent to the LLM provider

No other category of developer tooling combines all five capabilities with zero audit logging. A CI/CD pipeline runs in a controlled environment with defined permissions. A coding agent runs on the developer's machine with the developer's credentials and the developer's network access.

And increasingly, it is not just developers running them. Non-technical staff — operations teams, marketing, HR, analysts — are adopting coding agents as general-purpose automation tools. They use them to organize files, process data, query databases, and manage systems. The "coding agent" label masks what these tools actually are: unrestricted shell execution environments. Someone's marketing team is running Claude Code to "help organize spreadsheets" with full `rm -rf` access on a machine connected to the corporate network, and no one in IT knows about it.

In 2025, every major coding agent was found to have exploitable security vulnerabilities. What follows is what the research uncovered.

### Prompt Injection: Attackers Control Your Agent Through Files It Reads

Coding agents read files, fetch documentation, pull dependencies, and process issue tracker content. Every one of these inputs is an injection surface. In 2025, researchers demonstrated that this is not a theoretical risk — it produced CVEs with assigned severity ratings against every major agent platform.

**Claude Code (CVE-2025-55284):** Claude Code's auto-approved command allowlist included `ping`, `nslookup`, and `dig`. A prompt injection payload hidden in a source file could hijack the agent to read `.env` files and exfiltrate API keys via DNS subdomain queries — all without user approval. Anthropic patched this as CVSS 7.1 High in Claude Code v1.0.4. ([Embrace The Red](https://embracethered.com/blog/posts/2025/claude-code-exfiltration-via-dns-requests/))

**GitHub Copilot (CVE-2025-53773):** Copilot could write to `.vscode/settings.json` without approval, including setting `"chat.tools.autoApprove": true` — entering YOLO mode with all safety confirmations disabled. A prompt injection in a source file could trigger this, then run arbitrary shell commands, download malware, or join the machine to a botnet. Microsoft patched this in the August 2025 Patch Tuesday. ([Embrace The Red](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/))

**Cursor (CVE-2025-54132):** Cursor rendered Mermaid diagrams in chat responses that could include `<img>` tags issuing external HTTP requests. A prompt injection could hijack Cursor into rendering a diagram whose image URL contained exfiltrated data — API keys, user memories — as query parameters sent to an attacker's server. Fixed in Cursor v1.3. ([Embrace The Red](https://embracethered.com/blog/posts/2025/cursor-data-exfiltration-with-mermaid/))

**Devin:** A researcher spent $500 on a Devin subscription and demonstrated that a prompt injection payload on a GitHub issue could trick Devin into navigating to an attacker-controlled website, downloading a Sliver C2 binary, `chmod +x`-ing it, and executing it — giving the attacker full remote shell access to the DevBox. All secrets (AWS keys, SSH keys) were accessible. Cognition did not respond to fix timelines after 120+ days of disclosure. ([Embrace The Red](https://embracethered.com/blog/posts/2025/devin-i-spent-usd500-to-hack-devin/))

**The Month of AI Bugs (July–August 2025):** Security researcher Johann Rehberger published daily vulnerability disclosures for 30 straight days covering every major coding agent: Amazon Q Developer (RCE via `find -exec`), AWS Kiro (arbitrary code execution), Google Jules (data exfiltration, zombie agent persistence), OpenHands (token leaks, RCE), Amp Code (command execution), Windsurf (persistent SpAIware), ChatGPT Codex (ZombAI). This is the most comprehensive systematic security audit of coding agents ever published, and every single agent had exploitable vulnerabilities. ([Embrace The Red](https://embracethered.com/blog/posts/2025/announcement-the-month-of-ai-bugs/))

The core finding: **command allowlists do not work.** Trail of Bits (2025) demonstrated that "safe" pre-approved commands contain flags that enable arbitrary code execution. `go test -exec` runs any binary. `git show --format --output` writes arbitrary files. `rg --pre bash` executes shell scripts. The entire approach of maintaining a list of approved commands is fundamentally flawed, because the attack surface is in the flags, not the command names. ([Trail of Bits](https://blog.trailofbits.com/2025/10/22/prompt-injection-to-rce-in-ai-agents/))

For a non-technical user running a coding agent to "help with tasks," none of this is visible. They see a friendly chat interface. They do not see the agent executing shell commands influenced by attacker-controlled content in files it read.

### Cross-Agent Escalation: Agents That Free Each Other

Developers and non-developers increasingly use multiple AI agents on the same machine. In 2025, researchers discovered a novel attack class: one compromised agent poisons another agent's configuration.

Copilot writes to Claude Code's `.mcp.json` to add a malicious MCP server. It updates `CLAUDE.md` with attacker instructions. When the user switches to Claude Code, the poisoned config is picked up. The attack compounds — each agent "frees" the next from its sandbox. ([Embrace The Red](https://embracethered.com/blog/posts/2025/cross-agent-privilege-escalation-agents-that-free-each-other/))

This escalation path produced **AgentHopper**, a proof-of-concept self-propagating AI virus. AgentHopper uses conditional prompt injection that adapts per agent. It scans for local Git repositories, injects universal prompt injection payloads into source files, commits, and pushes to GitHub. When another developer's agent processes the infected code, the cycle repeats. It worked across Copilot, Amp Code, Amazon Q, and AWS Kiro simultaneously because all four had concurrent RCE vulnerabilities. ([Embrace The Red](https://embracethered.com/blog/posts/2025/agenthopper-a-poc-ai-virus/))

Without governance, organizations have no visibility into which agents are installed, which config files they share, or whether one agent's compromise has cascaded to others.

### MCP Servers: The Ungoverned Extension Point

The Model Context Protocol (MCP) lets agents connect to external tools — databases, Slack, GitHub, file systems, cloud services. In 2025, every layer of MCP security failed.

**Tool poisoning:** Invariant Labs discovered that malicious instructions hidden in MCP tool descriptions — invisible to users but visible to the LLM — can exfiltrate SSH keys and credentials. They demonstrated on Cursor that a malicious `add` tool's hidden `<IMPORTANT>` block caused the agent to read `~/.cursor/mcp.json` and `~/.ssh/id_rsa` and transmit them to the attacker. They also demonstrated "rug pulls" (changing tool descriptions post-approval) and cross-server "shadowing" where a malicious server redirects all emails sent via a trusted server to the attacker. ([Invariant Labs](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks))

**Conversation history theft:** Trail of Bits showed that malicious MCP servers can inject trigger phrases (like "thank you") into tool descriptions. When the trigger appears in conversation, the LLM forwards the entire conversation history to the attacker. This can persist for weeks, passively harvesting API keys, intellectual property, and protected data. Custom triggers can target specific data patterns like AWS secret keys. ([Trail of Bits](https://blog.trailofbits.com/2025/04/23/how-mcp-servers-can-steal-your-conversation-history/))

**Plaintext credential storage:** Many MCP servers — including official ones for GitLab, Postgres, and Google Maps — store API keys in plaintext with world-readable permissions. Claude Desktop's `claude_desktop_config.json` was `-rw-r--r--` (readable by any process). Cursor and Windsurf store conversation logs containing pasted credentials with world-readable permissions. ([Trail of Bits](https://blog.trailofbits.com/2025/04/30/insecure-credential-storage-plagues-mcp/))

**Anthropic's own Slack MCP server:** Anthropic's widely-used Slack MCP server (14k+ weekly npm downloads) was vulnerable to data exfiltration via Slack's link unfurling feature. A prompt injection could make the agent post a crafted URL containing stolen data to a Slack channel; Slack's automatic link expansion would send the data to the attacker's server. Anthropic archived the server without patching it, leaving thousands of installations vulnerable with no fix and no CVE. ([Embrace The Red](https://embracethered.com/blog/posts/2025/security-advisory-anthropic-slack-mcp-server-data-leakage/))

**WhatsApp MCP exploit:** A malicious MCP server hijacked an agent connected to WhatsApp MCP, exfiltrating entire chat histories by redirecting `send_message` calls to an attacker's phone number. The attack used a "sleeper" design that activated only on the second launch, bypassing initial approval. In a separate experiment, simply sending a prompt injection as a WhatsApp message was sufficient to compromise the agent — no malicious server needed. ([Invariant Labs](https://invariantlabs.ai/blog/whatsapp-mcp-exploited))

**Windsurf's total YOLO mode:** Windsurf's default MCP integration ran all tool invocations automatically without human-in-the-loop confirmation, with no option in the UI to require per-tool approval. A prompt injection in a source code comment caused the Slack MCP server to read messages from a private channel and post them to a public channel — zero-click, zero confirmation. ([Embrace The Red](https://embracethered.com/blog/posts/2025/windsurf-dangers-lack-of-security-controls-for-mcp-server-tool-invocation/))

**Filesystem server bypass:** The official Anthropic filesystem MCP server had improper path validation that allowed directory traversal, letting agents read files outside configured allowed directories — undermining the core security boundary. ([Embrace The Red](https://embracethered.com/blog/posts/2025/anthropic-filesystem-mcp-server-bypass/))

For non-technical users, MCP servers appear as simple "integrations" — connect your Slack, connect your files. The attack surface they create is invisible from the UI.

### Supply Chain: AI Agents as Attack Amplifiers

AI agents do not just consume packages — they install them with shell execution privileges, making them ideal amplifiers for supply chain attacks.

**The Nx compromise (August 2025):** The Nx build system package (4 million weekly npm downloads) was compromised via a stolen npm token. The malicious payload is the first documented case of malware weaponizing AI CLI tools. It invoked `claude --dangerously-skip-permissions`, `gemini --yolo`, and `q --trust-all-tools` to scan for cryptocurrency wallets, SSH keys, and credentials. A second wave used stolen GitHub tokens to make thousands of private repositories public. ([StepSecurity](https://www.stepsecurity.io/blog/supply-chain-security-alert-popular-nx-build-system-package-compromised-with-data-stealing-malware))

Attackers now specifically target AI agents because they know agents have broad file access, network access, and shell execution — and because "YOLO mode" flags exist on every major tool. The Nx malware did not need to find its own privilege escalation path. The AI tools provided one out of the box.

**GitHub Actions chain attack (March 2025):** Wiz Research discovered that `reviewdog/action-setup@v1` was compromised with a base64-encoded payload dumping CI runner memory containing workflow secrets. This cascaded into the compromise of `tj-actions/changed-files` (used by thousands of repositories), ultimately targeting Coinbase's `agentkit` repository. The attacker force-pushed to the old commit to cover their tracks. ([Wiz](https://www.wiz.io/blog/new-github-action-supply-chain-attack-reviewdog-action-setup))

**Image-based prompt injection (August 2025):** Trail of Bits released "Anamorpher," demonstrating that specially crafted images exploit how AI systems resize images, hiding adversarial prompts that become visible only at the target resolution. The attacks worked against Gemini CLI, Vertex AI Studio, Google Assistant, and other production systems. ([Trail of Bits](https://blog.trailofbits.com/2025/08/21/weaponizing-image-scaling-against-production-ai-systems/))

Trail of Bits published a comprehensive analysis of the 2025 supply chain landscape documenting the shift from simple typosquatting to sophisticated multi-stage campaigns: self-propagating npm malware (ctrl/tinycolor, 40+ packages, 2M+ weekly downloads), AI CLI weaponization (Nx), and malicious releases with no source code changes (rand-user-agent). ([Trail of Bits](https://blog.trailofbits.com/2025/09/24/supply-chain-attacks-are-exploiting-our-assumptions/))

### The Correctness Problem

Even without adversarial attacks, AI agents produce code that is plausible but wrong.

Trail of Bits (2025) argued that LLMs fundamentally differ from compilers because they lack determinism and semantic guarantees. An agent generates code that looks correct, passes a casual review, and may even pass tests — but contains vulnerabilities that formal verification would catch. Without governance controls enforcing review, testing, and security scanning, these vulnerabilities ship to production at the speed and volume that AI enables. ([Trail of Bits](https://blog.trailofbits.com/2025/12/19/can-chatbots-craft-correct-code/))

Earlier research quantified this. Perry et al. (2022) ran the first large-scale user study and found that developers with AI assistant access wrote significantly less secure code than those without. Worse: those developers were more likely to *believe* their code was secure — a false confidence effect. Participants who trusted the AI less produced fewer vulnerabilities. ([arXiv](https://arxiv.org/abs/2211.03622))

For non-technical users generating scripts and automation through coding agents, the correctness problem is compounded. They lack the expertise to review what the agent produced and the false confidence effect is amplified — they assume the AI knows what it is doing because they do not.

### The Normalization of Deviance

In 2025, Rehberger coined the term "Normalization of Deviance in AI" to describe how users progressively approve more dangerous agent actions, enable auto-approve modes, run agents in YOLO mode, and stop reading confirmation dialogs. The pattern mirrors the sociological concept from the Challenger disaster: small acceptable deviations compound until catastrophic failure. ([Embrace The Red](https://embracethered.com/blog/posts/2025/the-normalization-of-deviance-in-ai/))

This is the shadow agent problem. Employees deploy agents with escalating permissions. IT has no visibility. The friction of approval dialogs trains users to click through them, undermining the primary safety mechanism the industry relies on. Non-technical users are especially susceptible — they cannot evaluate whether a proposed shell command is dangerous, so they approve everything.

The earlier pattern from 2023 is instructive. Samsung semiconductor engineers pasted proprietary source code into ChatGPT on three separate occasions. The data entered OpenAI's training corpus and was irrecoverable. Samsung banned ChatGPT company-wide. ([TechRadar](https://www.techradar.com/news/samsung-workers-leaked-company-secrets-by-using-chatgpt)) That was a chat tool — copy and paste. Today's agents autonomously read, execute, and transmit. The exposure surface is orders of magnitude larger, and the user may not even know what data the agent accessed.

## The Alternative: Governed Deployment

**Governed AI agent deployment** provides organizational control over:

- **LLM access** — Which models users can access and how
- **Policy management** — Centralized rules for tool behavior, enforced across all agents
- **Audit logging** — Comprehensive tracking of AI interactions, commands executed, and data accessed
- **Content exclusion** — Preventing sensitive code and data from being used as context
- **Secret scanning** — Automated detection of exposed credentials in agent-generated output
- **MCP server governance** — Allowlisting approved servers, blocking unapproved connections, monitoring tool invocations
- **Execution policies** — Constraints on shell commands, flag restrictions, sandboxed environments
- **Cross-agent isolation** — Preventing one agent's configuration from being modified by another
- **Auto-approve policy management** — Organizational controls preventing YOLO mode and unrestricted auto-approval

The core trade-off: ungoverned agents optimize for user convenience at the cost of organizational confidence. Governed agents accept some friction to maintain the confidence necessary for production use.

This method is distinct from technical scaffolding within repositories (see [AgentX: Constrained Autonomy](/docs/field-guides/agentic-coding/methods/established/M158-agentx-constrained-autonomy)). Governance operates at the organizational level, controlling which tools are available and how they are configured. Technical scaffolding operates at the repository level, constraining what agents can do within a codebase. You need both.

## When to Use

- **Deploying AI agents at enterprise scale** — Multiple teams, shared codebases, compliance requirements
- **Handling sensitive data or code** — Credentials, PII, proprietary algorithms, regulated industries
- **Non-technical staff using coding agents** — Operations, marketing, HR, or analysts using agents for file management, data processing, or system tasks without understanding execution risk
- **Compliance requirements exist** — SOC 2, HIPAA, PCI-DSS, or internal security policies
- **Auditability is required** — Need to track who used AI tools, when, and for what
- **Shadow IT is a concern** — Employees adopting agents without approval, running YOLO mode, connecting unapproved MCP servers
- **Supply chain security matters** — Need to control what dependencies AI tools can introduce
- **Multiple agents are in use** — Cross-agent escalation requires cross-agent governance

## When NOT to Use

- **Individual experimentation** — Personal projects or learning where risk is contained
- **Governance overhead exceeds risk** — Small teams with low-sensitivity codebases
- **No governed options exist** — For your specific tooling needs (though this is increasingly rare)
- **Speed is the only priority** — Governance adds friction; if you are optimizing purely for velocity with acceptable risk, ungoverned may be appropriate

## How It Works

### Prerequisites

Before starting:
- Understanding of your organization's risk tolerance and compliance requirements
- Inventory of AI agents currently in use — by developers and non-developers — including which MCP servers are connected
- Stakeholder alignment on the need for governance

### Step 1: Assess Current Risk Exposure

Audit your organization's current AI agent usage:

| Question | Risk Indicator |
|----------|---------------|
| Are employees using personal AI tool accounts? | Shadow IT risk |
| Are non-technical staff running coding agents? | Overprivilege risk |
| Can AI agents execute shell commands without restrictions? | Execution risk |
| Which MCP servers are connected across your agents? | Supply chain risk |
| Are any agents running in YOLO / auto-approve mode? | Normalization of deviance |
| Do multiple agents share config files on the same machine? | Cross-agent escalation risk |
| Can AI agents access sensitive repositories or data stores? | Confidentiality risk |
| Do you have audit trails for AI interactions? | Compliance risk |
| Is AI-generated code reviewed differently than human code? | Quality risk |

### Step 2: Select Governed Tool Architecture

Evaluate governed AI agent platforms against your requirements:

| Capability | Why It Matters |
|------------|---------------|
| **Policy management** | Centralized control of feature availability, model access |
| **Content exclusion** | Sensitive code and data never used as context |
| **Audit logging** | All AI interactions tracked for compliance |
| **Secret scanning** | Automated detection of exposed credentials |
| **Network controls** | AI tool usage restricted to approved networks |
| **SSO/Identity integration** | Tie usage to corporate identity |
| **Execution sandboxing** | Agent shell commands run in constrained environments with flag restrictions |
| **MCP server allowlisting** | Only approved external tools available to agents |
| **Auto-approve controls** | Organizational policy preventing unrestricted auto-approval modes |
| **Cross-agent config protection** | Prevent one agent from modifying another's configuration |

### Step 3: Define Governance Policies

Create explicit policies for AI agent usage:

```markdown
## AI Agent Usage Policy

### Approved Tools
- [List of governed tools with links to configuration]

### Prohibited Tools
- Personal ChatGPT/Claude accounts for code generation
- Ungoverned IDE extensions
- Any agent in YOLO / full auto-approve mode on corporate machines
- [Other tools that bypass governance]

### Approved MCP Servers
- [List of vetted, approved MCP server connections]
- All other MCP server connections require security review

### Usage Requirements
- All AI-generated code must go through standard code review
- Sensitive repositories require content exclusion configuration
- Audit logs must be retained for [X] days
- Agent shell execution restricted to project-scoped commands
- Non-technical users require role-appropriate agent configurations with restricted permissions
- Auto-approve limited to read-only operations; write/execute requires human confirmation
```

### Step 4: Configure Governance Controls

Implement technical controls that enforce policy:

1. **Content exclusion** — Configure which repositories/paths are excluded from AI context
2. **Secret scanning** — Enable automated detection in CI/CD and IDE
3. **Audit logging** — Ensure all AI interactions are logged with user identity
4. **Network controls** — Block ungoverned AI tool endpoints if necessary
5. **Policy enforcement** — Use MDM or endpoint management to control tool installation
6. **Execution policies** — Constrain shell commands; restrict dangerous flags (`--exec`, `--pre`, `--output`); require confirmation for destructive operations
7. **MCP governance** — Maintain an allowlist of approved MCP servers; block unapproved connections; monitor tool invocation patterns
8. **Cross-agent isolation** — Protect agent config files (`.mcp.json`, `CLAUDE.md`, `.vscode/settings.json`) from modification by other agents
9. **Auto-approve policies** — Enforce organizational limits on auto-approve scope; prevent YOLO mode on corporate machines
10. **Role-based agent access** — Configure restricted agent profiles for non-technical users with limited filesystem scope and no shell execution

### Step 5: Monitor and Iterate

Establish ongoing governance:

- Review audit logs for policy violations and anomalous command execution
- Track shadow IT adoption of ungoverned agents, especially by non-technical teams
- Monitor for prompt injection attempts in agent-processed content
- Watch for cross-agent config file modifications
- Measure security incidents related to AI-generated code
- Audit MCP server connections periodically; remove unused or deprecated servers
- Update policies as tools and attack techniques evolve

## Example

**Scenario:** Enterprise deploying AI agents across 500 employees — developers, QA, operations, and business analysts.

**Ungoverned Approach (Risk Exposure):**
- Developers use personal Copilot/Claude accounts
- Operations team uses Claude Code to "help with scripts" with full shell access
- No visibility into what code or data is sent to AI providers
- Agents execute shell commands with full user permissions
- MCP servers connected ad hoc — Slack, GitHub, databases — with no organizational visibility
- Multiple agents installed on the same machines with shared config files
- Some developers running in YOLO mode "to go faster"
- No audit trail for compliance

**Governed Approach (Risk Prevention):**
- Enterprise-managed agent deployment with SSO
- Content exclusion configured for sensitive repositories and data stores
- Secret scanning enabled with blocking on detection
- Audit logs retained for compliance review
- Centralized policy management for all teams
- Execution policies enforced; destructive commands and dangerous flags require approval
- MCP server allowlist maintained by security team
- Cross-agent config files protected from modification
- Auto-approve restricted to read-only operations
- Non-technical users given restricted agent profiles with limited scope

**Result:** Same productivity benefits with organizational confidence that risks are managed.

## Common Pitfalls

1. **Treating governance as checkbox compliance** — Governance should actively manage risk, not satisfy auditors. Review audit logs, investigate anomalies, update policies.

2. **Over-restricting to the point of shadow IT** — If governed tools are too limited, people will find ungoverned alternatives. Balance security with usability.

3. **Trusting command allowlists** — Trail of Bits proved in 2025 that "safe command" allowlists are bypassable via flags (`--exec`, `--pre`, `--output`). Allowlists are a starting point, not a solution.

4. **Ignoring the productivity cost** — Governance adds friction. Measure and optimize the user experience within governed tools.

5. **Assuming governance eliminates all risk** — Governance reduces risk; it does not eliminate it. AI-generated code still needs review, testing, and security scanning.

6. **Forgetting to govern MCP servers** — AI agents increasingly use external tools via MCP. Govern these access points — tool descriptions can contain hidden instructions, servers can steal conversation history, and credential storage is often insecure.

7. **Governing the LLM but not the execution environment** — An agent that can run `curl | bash` with the user's credentials is dangerous regardless of how well you have governed the model selection. Execution policies matter as much as content policies.

8. **Ignoring non-technical users** — When business analysts, operations staff, or marketing teams adopt coding agents, they get the same shell execution access as senior developers — but without the expertise to evaluate what the agent is doing. Provide restricted agent profiles with appropriate permission boundaries.

9. **Allowing YOLO mode on corporate machines** — Auto-approve modes disable the primary safety mechanism. Organizational policy should restrict auto-approve scope, especially for write and execute operations.

10. **Ignoring cross-agent config contamination** — Developers use multiple agents. If one is compromised, it can poison the configuration files of every other agent on the machine. Protect config files and monitor for unexpected modifications.

## FOE Alignment

| FOE Principle | How Governance Enables It |
|---------------|--------------------------|
| **Understanding** | Risk analysis reveals systematic patterns; teams understand what they are protecting against |
| **Fast Feedback** | Secret scanning, audit logging, policy alerts create rapid detection loops |
| **Confidence** | Governance controls reduce uncertainty; organizations can deploy AI agents with justified confidence |

## How You Can Help

This method has strong evidence from multiple observations. To continue strengthening it:

1. **Governance effectiveness metrics** — Quantitative data on how often controls catch issues
2. **Developer experience data** — Does governance friction measurably impact productivity?
3. **Non-technical user incidents** — Document cases where non-developers using coding agents caused damage or data exposure
4. **New governance patterns** — Document approaches to MCP server governance, cross-agent isolation, auto-approve policy management
5. **Prompt injection incidents** — Cases where agents acted on injected instructions from external content
6. **Scale observations** — Experiences deploying governed agents across large organizations (500+ employees, not just developers)

If you have experience with governed AI agent deployments, [document your observation](/docs/field-guides/contributing-observations).

## Supporting Evidence
