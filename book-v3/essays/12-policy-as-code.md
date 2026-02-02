# Policy as Code

If a policy matters, encode it.

Policies written in documents are wishes. Policies encoded in systems are constraints.

The difference: wishes can be ignored, circumvented, forgotten. Constraints cannot. Wishes depend on human compliance. Constraints operate automatically.

## The Document Problem

Most organizations have policy documents. Security policies. Architecture standards. Coding guidelines. Deployment procedures.

These documents share common characteristics:

**They're outdated.** Written at some point in the past, they describe what someone thought should be true. The world has moved. The documents haven't.

**They're ambiguous.** Human language is imprecise. "Applications should be secure" means different things to different people. "Use appropriate encryption" doesn't specify what's appropriate.

**They're unenforceable.** Documents exist on wikis. Code exists in repositories. The two are disconnected. No mechanism ensures the code follows the documents.

**They're ignored.** Engineers learn which policies matter (the ones with actual enforcement) and which don't (the ones that exist only on paper). Paper policies become background noise.

The result: policies that exist but don't function. The organization has standards it doesn't follow, guidelines it doesn't enforce, procedures it doesn't execute.

## What Code Provides

Code is precise. It does exactly what it says. No ambiguity, no interpretation, no wiggle room.

Code is current. It runs now, on the system that exists now. It doesn't describe what should be true. It enforces what must be true.

Code is automatic. It doesn't require human attention to execute. It runs on every commit, every deployment, every change. Consistently, reliably, without exception.

Code is auditable. You can see exactly what it checks. You can verify it works. You can trace its execution. You can prove compliance rather than assert it.

When policy becomes code, policy becomes real.

## What Policy as Code Looks Like

**Architecture rules as linting.** "Services must not directly access other services' databases." This can be a document someone might read. Or it can be an automated check that fails builds violating the rule.

**Security requirements as scans.** "Applications must not have known vulnerabilities in dependencies." This can be a policy requiring manual review. Or it can be an automated scan blocking deployment when vulnerabilities are found.

**Deployment standards as pipeline gates.** "All deployments must have rollback capability." This can be a checklist item. Or it can be a pipeline stage that validates rollback readiness before proceeding.

**Configuration rules as validation.** "Production databases must have encryption enabled." This can be a guideline in a document. Or it can be a policy engine that prevents unencrypted database creation.

Each example transforms a document into a mechanism. The policy still exists. Now it also works.

## The Enforcement Spectrum

Not all policies can be fully automated. The spectrum runs from documentation to full automation:

**Documentation only.** Policy exists in documents. No enforcement. Compliance depends entirely on human awareness and discipline.

**Human-verified checklist.** Policy exists as a checklist humans must complete. Some enforcement through process. Compliance depends on human diligence and checklist quality.

**Automated check with human override.** Policy enforced automatically, but humans can bypass. Violations are logged but allowed. Compliance depends on override culture.

**Automated check with required approval.** Policy enforced automatically. Violations require explicit approval from specific roles. Compliance is high but flexibility exists.

**Automated hard block.** Policy enforced automatically. Violations are impossible. No override, no exception. Compliance is perfect by construction.

The right level depends on the policy. Some policies must be absolute: no human override possible. Others need flexibility: unusual situations require unusual responses.

But the direction is clear: move policies toward automation. Every policy that can be automated should be. Human attention should focus on policies that genuinely require judgment.

## The Test Suite as Policy

Your test suite is policy in code.

Every test encodes an expectation. "This function returns positive numbers." "This API responds within 100ms." "This workflow produces valid output." Each test is a policy: this behavior must be true.

When tests run on every change, they enforce these policies continuously. Code that violates the policy fails the tests. The policy is enforced without requiring human verification.

This framing changes how you think about testing. Tests aren't just verification. They're encoded policy. When you write a test, you're declaring what must remain true. When you delete a test, you're abandoning a policy.

Organizations with extensive test suites have extensive policy enforcement. Not through documents. Through running code that verifies expectations continuously.

## The Infrastructure Definition as Policy

Infrastructure as code brings the same benefits to operations.

A Terraform configuration doesn't just create infrastructure. It defines what infrastructure must be. The load balancer must have these health checks. The database must have this backup configuration. The network must have these security groups.

When infrastructure is defined in code, infrastructure policy is encoded in code. You can't create non-compliant infrastructure without changing the code. And changing the code goes through review, testing, and approval.

Contrast with manual infrastructure: someone logs into a console and makes changes. The changes might comply with policy. They might not. No mechanism enforces compliance. No record shows what was done. Policy is wishful thinking.

## Getting There

Converting document policies to code policies requires work:

**Identify enforceable policies.** Not all policies can be automated. Start with the ones that can be. Clear, specific policies about technical properties: security configurations, architectural patterns, deployment requirements.

**Build the checks.** Create the automated verification. Linters. Scanners. Validators. Pipeline gates. Each check enforces one policy.

**Integrate into workflow.** Checks that run separately from work are easily ignored. Checks that run as part of every commit, every build, every deployment are unavoidable.

**Handle violations.** What happens when a check fails? Blocked? Warned? Escalated? Define the response and implement it.

**Iterate.** Start with critical policies. Add more over time. Each policy encoded is one less depending on human vigilance.

The investment is real. The return is a system where policy is enforced by design, not by hope.

If a policy matters, encode it. If it can't be encoded, question whether it matters.
