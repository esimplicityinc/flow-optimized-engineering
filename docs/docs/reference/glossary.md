---
sidebar_position: 1
title: "Glossary"
---

# Glossary

A comprehensive reference of Flow Optimized Engineering terminology. Terms are organized alphabetically for quick lookup.

---

## A

### Audit Trail
A chronological record of system activities that provides documentary evidence of the sequence of activities. In FOE, audit trails are automatic byproducts of disciplined processes, not manual documentation efforts. See also: [Receipts](#receipts).

### Automated Governance
The practice of encoding organizational policies into executable rules that are enforced automatically by the system, rather than through manual review or approval processes.

---

## B

### Blast Radius
The scope of potential impact when a change fails. FOE institutions are designed to minimize blast radius through progressive rollouts, feature flags, and isolation boundaries.

### Build Artifact
An immutable, versioned output of a build process. FOE requires artifacts to be reproducible, signed, and traceable to their source.

---

## C

### Cognitive Offloading
The practice of moving mental burden from human memory and attention to systems and processes. When developers don't have to remember security practices because the pipeline enforces them, that's cognitive offloading. Core to why FOE institutions work.

### Confidence
In FOE, confidence is not a feeling but a measurable state. It comes from evidence: passing tests, successful deployments, production metrics. Confidence without evidence is certainty theater.

### Continuous Delivery
The practice of keeping software in a deployable state at all times. FOE extends this to continuous *everything*: verification, compliance, learning.

---

## D

### Deployment Frequency
One of the four DORA metrics. How often code is deployed to production. FOE treats this as an outcome measure, not a goal to optimize directly.

### Disciplines
Consistent, enforced, repeatable, measurable operating practices. Unlike guidelines or best practices, disciplines are non-negotiable and systematically verified. The "how" of FOE operations. See: [Core Principles](/docs/principles/overview).

### DORA Metrics
The four key metrics identified by the DevOps Research and Assessment team: deployment frequency, lead time for changes, change failure rate, and time to restore service. FOE uses these as system health indicators, not performance targets.

---

## E

### Epistemic Hygiene
The practice of maintaining clear boundaries between what is known, what is believed, and what is assumed. FOE institutions create epistemic hygiene by generating evidence rather than requiring trust.

### Evidence
Observable, verifiable data that supports a claim. FOE systems generate evidence automatically: test results, deployment logs, metric dashboards. Evidence replaces opinion in FOE decision-making.

---

## F

### Feedback Loop
A cycle where outputs of a system are routed back as inputs. FOE emphasizes tightening feedback loops: the faster you learn whether a change worked, the faster you can improve.

### Flow
The repeatable movement from idea → change → verification → release → learning. The fundamental unit of value delivery in FOE. Not to be confused with "flow state" (though good flow enables that too).

### Flow Efficiency
The ratio of value-adding time to total elapsed time. A change that takes 5 days but only 4 hours of actual work has ~3% flow efficiency. FOE institutions exist to improve flow efficiency.

---

## G

### Gauge
A measurement instrument that provides real-time visibility into system state. FOE systems are heavily instrumented because you cannot optimize what you cannot measure. See: [Key Metaphors](/docs/reference/key-metaphors).

### GitOps
An operational framework that uses Git as the single source of truth for declarative infrastructure and applications. Changes are made via pull requests; the system reconciles actual state to desired state automatically.

### Golden Path
See: [Paved Path](#paved-path-golden-path).

### Guardrails
Automated constraints that prevent harmful actions while allowing safe operations. Unlike gates (which block all traffic), guardrails guide traffic while permitting movement.

---

## H

### Hermetic Build
A build that depends only on declared inputs and produces identical outputs regardless of when or where it runs. Essential for reproducibility and auditability.

---

## I

### Idempotency
The property where an operation produces the same result whether executed once or multiple times. Critical for reliable automation and recovery.

### Immutability
The property of being unchangeable after creation. FOE favors immutable artifacts, immutable infrastructure, and immutable audit logs.

### Institutions
Lightweight mechanisms that make desired behavior the default and undesired behavior difficult. Not bureaucracy—more like traffic engineering. The "what" of FOE infrastructure. See: [Building Institutions](/docs/implementation/building-institutions).

### Instrumentation
The practice of adding measurement capabilities to systems. FOE treats instrumentation as a first-class requirement, not an afterthought.

---

## L

### Lead Time for Changes
One of the four DORA metrics. The time from code commit to code running in production. FOE institutions are designed to minimize this without sacrificing safety.

### Left-Shift
Moving activities earlier in the development lifecycle. FOE left-shifts security, testing, and compliance verification to provide faster feedback.

---

## M

### Mean Time to Recovery (MTTR)
One of the four DORA metrics. How long it takes to restore service after an incident. FOE prioritizes MTTR over mean time between failures because failures are inevitable.

### Mutation Testing
A testing technique that modifies code to verify that tests detect the changes. Used to measure test effectiveness, not just coverage.

---

## O

### Observability
The ability to understand a system's internal state from its external outputs. Goes beyond monitoring: observable systems allow you to ask new questions without deploying new code.

### Operating Envelope
The defined boundaries within which a system can operate safely at speed. Borrowed from aviation. FOE institutions define and enforce operating envelopes. See: [Key Metaphors](/docs/reference/key-metaphors).

---

## P

### Paved Path (Golden Path)
A standardized, supported approach that makes the right thing easy and the wrong thing hard. Paved paths reduce cognitive load, improve consistency, and enable institutional support. Developers *can* go off-path, but they own the consequences.

### Phase 0: Current State Assessment
Understanding where you are. Honest inventory of existing capabilities, pain points, and organizational readiness. Cannot be skipped.

### Phase 1: Foundation
Building the basic infrastructure for flow. CI/CD pipelines, version control discipline, basic automation, team formation. The "crawl" phase.

### Phase 2: Automation & Standardization
Expanding automation coverage, establishing paved paths, implementing policy as code. The "walk" phase.

### Phase 3: Integration & Intelligence
Connecting systems, implementing advanced observability, enabling data-driven decisions. The "run" phase.

### Phase 4: Optimization & Scaling
Fine-tuning for performance, extending to the full organization, measuring outcomes. The "fly" phase.

### Phase 5: Continuous Evolution
Ongoing improvement, adaptation to changing conditions, maintaining competitive advantage. The "never stop" phase.

### Policy as Code
The practice of expressing organizational policies in executable, version-controlled code rather than documents. Enables automated enforcement and audit.

### Progressive Delivery
Deployment techniques that gradually expose changes to larger audiences. Includes canary deployments, blue-green deployments, and feature flags.

---

## R

### Receipts
Evidence and audit trails of decisions and changes. In FOE, receipts are automatic byproducts of the process, not manual documentation. "Trust, but verify" becomes "trust because we can verify."

### Reproducibility
The property of producing identical results from identical inputs. Essential for debugging, auditing, and compliance.

---

## S

### Selection Environment
A system where outcomes determine what survives, not opinions or politics. FOE creates selection environments through measurement and feedback: approaches that work get reinforced; approaches that fail get replaced.

### Shift-Left
See: [Left-Shift](#left-shift).

### Single Source of Truth
A system design principle where every data element is stored exactly once. In FOE, Git serves as the single source of truth for desired state; production systems serve as the single source of truth for actual state.

### Sociotechnical System
A system comprising both technical components and human/organizational components. FOE recognizes that engineering organizations are sociotechnical systems—you cannot optimize the technical without addressing the social.

---

## T

### Toil
Manual, repetitive work that scales linearly with system size and provides no enduring value. FOE institutions aim to eliminate toil through automation.

### Trunk-Based Development
A source control branching model where developers work in short-lived branches (or directly on trunk) and merge frequently. Enables continuous integration and reduces merge conflicts.

---

## V

### Value Stream
The sequence of activities required to deliver value to a customer. FOE optimizes the entire value stream, not just individual components.

### Verification
The process of confirming that something meets its specification. In FOE, verification is continuous and automated, not a phase that happens at the end.

### Via Negativa
A philosophical approach that defines something by what it is *not*. FOE uses Via Negativa to define anti-patterns—things to explicitly avoid. See: [Anti-Patterns](/docs/reference/anti-patterns).

---

## W

### Work in Progress (WIP)
The amount of work started but not yet finished. FOE institutions often include WIP limits because excessive WIP kills flow efficiency.

---

## Cross-Reference

| Concept | Related Terms | See Also |
|---------|---------------|----------|
| Flow | Value Stream, Lead Time, Feedback Loop | [What is FOE](/docs/intro/what-is-foe) |
| Institutions | Guardrails, Paved Paths, Policy as Code | [Building Institutions](/docs/implementation/building-institutions) |
| Disciplines | Verification, Evidence, Receipts | [Core Principles](/docs/principles/overview) |
| Measurement | DORA Metrics, Observability, Gauges | [Key Metaphors](/docs/reference/key-metaphors) |
| Anti-Patterns | Via Negativa, Toil | [Anti-Patterns](/docs/reference/anti-patterns) |
