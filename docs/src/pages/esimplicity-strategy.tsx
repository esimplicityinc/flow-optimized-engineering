import type { ReactNode } from 'react';
import { useEffect } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import AccordionSection from '../components/AccordionSection';
import StrategySidebar from '../components/StrategySidebar';
import styles from './esimplicity-strategy.module.css';

// ============================================
// SECTION DATA
// ============================================

const sections = [
  { id: 'strategic-reframe', number: 1, title: 'Strategic Reframe', owner: 'ric' as const },
  { id: 'foe-doctrine', number: 2, title: 'FOE as Doctrine', owner: 'shared' as const },
  { id: 'org-ownership', number: 3, title: 'Organizational Ownership', owner: 'shared' as const },
  { id: 'people-culture', number: 4, title: 'People & Culture', owner: 'ric' as const },
  { id: 'ai-trilemma', number: 5, title: 'The AI People Trilemma', owner: 'prima' as const },
  { id: 'local-first', number: 6, title: 'Local-First Infrastructure', owner: 'prima' as const },
  { id: 'agent-convention', number: 7, title: 'The .agent/ Convention', owner: 'prima' as const },
  { id: 'compliance', number: 8, title: 'Compliance Without Theater', owner: 'shared' as const },
  { id: 'field-guide', number: 9, title: 'Field Guide as Living System', owner: 'shared' as const },
  { id: 'foe-repos', number: 10, title: 'FOE in Every Repo', owner: 'ric' as const },
  { id: 'katalyst', number: 11, title: 'The Katalyst Foundation', owner: 'ric' as const },
  { id: 'macro-goal', number: 12, title: 'The Macro Goal', owner: 'shared' as const },
];

// ============================================
// HERO SECTION
// ============================================

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroOrb3} />
      </div>
      <div className={styles.heroContent}>
        <img
          src="/flow-optimized-engineering/img/foe-white-square-trans.png"
          alt="FOE Logo"
          className={styles.heroLogo}
        />
        <span className={styles.heroBadge}>Implementation Strategy v1.0</span>
        <h1 className={styles.heroTitle}>
          Flow Optimized Engineering
          <br />
          at eSimplicity
        </h1>
        <p className={styles.heroSubtitle}>
          A Strategy for Safe Agentic Software in Government
        </p>
        <div className={styles.heroMeta}>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            January 2025
          </span>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            12 Sections
          </span>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ============================================
// SECTION CONTENT
// ============================================

function Section1(): ReactNode {
  return (
    <AccordionSection
      id="strategic-reframe"
      number={1}
      title="Strategic Reframe"
      owner="ric"
      executiveSummary={
        <>
          <p>
            This document establishes the strategic direction for AI-augmented engineering at eSimplicity.
            Rather than chasing tools or reacting to market pressure, we are choosing a deliberate path.
          </p>
          <blockquote>
            <p>
              eSimplicity will not pursue an "agentic coding strategy" in isolation. Instead, we will
              implement Flow Optimized Engineering (FOE) as the governing doctrine—with agentic tooling
              as one powerful capability within that structure.
            </p>
          </blockquote>
        </>
      }
    >
      <h3>Why Isolated AI Adoption Fails</h3>
      <p>
        Organizations rushing to adopt AI coding tools without a governing framework consistently
        fall into predictable failure modes:
      </p>
      <ul>
        <li>
          <strong>Tool Worship:</strong> Believing the tool itself is the strategy. Teams acquire
          Copilot licenses, declare victory, and wonder why outcomes don't improve.
        </li>
        <li>
          <strong>Velocity Theater:</strong> Celebrating increased output (more PRs, more lines of
          code) while ignoring whether that output creates value or technical debt.
        </li>
        <li>
          <strong>Compliance Panic:</strong> Legal and security teams react to AI adoption with
          blanket restrictions, creating shadow IT and adversarial dynamics.
        </li>
        <li>
          <strong>Cultural Backlash:</strong> Engineers feel surveilled, deskilled, or replaced—leading
          to quiet resistance, attrition, and loss of institutional knowledge.
        </li>
      </ul>

      <h3>What AI Changes vs. What It Doesn't</h3>
      <table>
        <thead>
          <tr>
            <th>AI Changes This</th>
            <th>AI Does Not Change This</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Economics of code production (tokens are cheap)</td>
            <td>The epistemic problem (understanding what to build)</td>
          </tr>
          <tr>
            <td>Speed of generating candidate solutions</td>
            <td>Organizational risk from deploying wrong solutions</td>
          </tr>
          <tr>
            <td>Availability of 24/7 coding assistance</td>
            <td>Compliance requirements and audit obligations</td>
          </tr>
          <tr>
            <td>Barrier to entry for writing code</td>
            <td>Cultural need for autonomy, mastery, and purpose</td>
          </tr>
        </tbody>
      </table>
      <p>
        The fundamental challenge of software engineering has never been "writing code is too slow."
        It has always been "we build the wrong thing, or we build the right thing badly, and we
        don't know which until it's expensive."
      </p>

      <h3>FOE as the Structure That Makes Agentic Coding Safe</h3>
      <p>
        Flow Optimized Engineering provides the scaffolding that transforms agentic coding from a
        risk into an advantage:
      </p>
      <ul>
        <li>
          <strong>Safe:</strong> Every AI-generated change flows through the same validation gates
          as human-authored code. The system doesn't trust the source—it trusts the evidence.
        </li>
        <li>
          <strong>Legible:</strong> All work—human or machine—produces artifacts that can be
          reviewed, understood, and audited. Speed without traceability is just faster failure.
        </li>
        <li>
          <strong>Compounding:</strong> Each experiment, each validated pattern, each documented
          decision becomes organizational knowledge that improves future work.
        </li>
      </ul>
    </AccordionSection>
  );
}

function Section2(): ReactNode {
  return (
    <AccordionSection
      id="foe-doctrine"
      number={2}
      title="FOE as Doctrine"
      owner="shared"
      executiveSummary={
        <p>
          FOE is built on three foundational truths about engineering that hold regardless of whether
          the work is performed by humans, AI agents, or some combination. These truths become more
          critical—not less—as we introduce faster, more autonomous tooling.
        </p>
      }
    >
      <h3>Truth 1: Flow is the Unit of Progress</h3>
      <p>
        Not output. Not activity. Not utilization. <em>Flow</em>—the uninterrupted movement of
        value from concept to customer.
      </p>
      <p>
        Most organizations measure the wrong things: lines of code, story points completed, hours
        logged. These metrics optimize for <em>busyness</em>, not outcomes. Flow-based measurement
        asks: "How quickly and reliably can we move a validated idea into production?"
      </p>

      <h3>Truth 2: Speed Without Legibility is Indistinguishable from Recklessness</h3>
      <p>
        Moving fast only creates value when you can understand what you're moving, why, and
        what the consequences might be. Illegible speed is just well-intentioned chaos.
      </p>
      <p>
        Legibility means every change carries its rationale, every decision is traceable, and
        every outcome can be attributed to its causes. This isn't bureaucracy—it's the
        prerequisite for learning.
      </p>

      <h3>Truth 3: Engineering is an Empirical Discipline</h3>
      <p>
        Every change is a hypothesis. Every deployment is an experiment. Every outcome is data.
        Engineering organizations that treat their work as empirical practice outperform those
        that treat it as craft or manufacturing.
      </p>

      <h3>The Gauges Metaphor</h3>
      <div className={styles.highlightBox}>
        <p>
          Race cars and fighter jets go faster because they have MORE instrumentation, not less.
        </p>
      </div>
      <p>
        A Formula 1 car has hundreds of sensors precisely because it operates at the edge of control.
        An F-35 pilot has more information displays than a Cessna pilot, not fewer.
        FOE is the instrumentation that makes high-velocity engineering safe.
      </p>
    </AccordionSection>
  );
}

function Section3(): ReactNode {
  return (
    <AccordionSection
      id="org-ownership"
      number={3}
      title="Organizational Ownership"
      owner="shared"
      executiveSummary={
        <p>
          Clear ownership enables coordinated action without bottlenecks. RIC serves as the custodian
          of FOE doctrine—the environment and standards. Prima operates as the agentic enablement
          team—building tools and running experiments. The distinction: RIC creates the conditions
          where agentic tooling can thrive; Prima builds the sensory organs that let us see and respond.
        </p>
      }
    >
      <div className={styles.orgDiagram}>
        <div className={styles.orgBox}>
          <div className={styles.orgBoxTitle}>RIC</div>
          <div className={styles.orgBoxSubtitle}>Custodian of FOE</div>
        </div>
        <div className={styles.orgConnector}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className={styles.orgConnectorLabel}>Enables</span>
        </div>
        <div className={styles.orgBox}>
          <div className={styles.orgBoxTitle}>Prima</div>
          <div className={styles.orgBoxSubtitle}>Agentic Enablement</div>
        </div>
      </div>

      <h3>RIC: Custodian of FOE Doctrine</h3>
      <p>
        RIC treats FOE as <em>infrastructure</em>—foundational systems that other capabilities depend upon:
      </p>
      <ul>
        <li><strong>Establishing norms and patterns:</strong> Defining what "good" looks like for AI-augmented engineering</li>
        <li><strong>Phase-3 maturity focus:</strong> Ensuring methods reach production-grade stability before broad adoption</li>
        <li><strong>Validation frameworks:</strong> Building the gates through which all code must pass</li>
        <li><strong>Organizational learning:</strong> Synthesizing experiments into institutional knowledge</li>
      </ul>

      <h3>Prima: Agentic Enablement Team</h3>
      <p>Prima functions as the internal product team for developer experience:</p>
      <ul>
        <li><strong>Building agentic tools:</strong> Creating and integrating AI coding assistants within FOE constraints</li>
        <li><strong>Enabling local-first workflows:</strong> Ensuring engineers can work effectively without centralized dependencies</li>
        <li><strong>Running experiments:</strong> Testing new approaches and contributing validated learnings</li>
        <li><strong>Serving as the sensory organ:</strong> Maintaining close contact with engineering teams</li>
      </ul>

      <h3>The Critical Distinction</h3>
      <table>
        <thead>
          <tr>
            <th>RIC (Environment)</th>
            <th>Prima (Enablement)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Creates conditions for success</td>
            <td>Builds tools for execution</td>
          </tr>
          <tr>
            <td>Focuses on sustainability</td>
            <td>Focuses on capability</td>
          </tr>
          <tr>
            <td>Ensures agentic tooling is survivable</td>
            <td>Makes agentic tooling effective</td>
          </tr>
        </tbody>
      </table>
    </AccordionSection>
  );
}

function Section4(): ReactNode {
  return (
    <AccordionSection
      id="people-culture"
      number={4}
      title="People & Culture Transformation"
      owner="ric"
      executiveSummary={
        <p>
          FOE is fundamentally about people, not tools. The deepest changes happen in how teams communicate,
          how leaders respond to uncertainty, and how organizations treat the humans who build their systems.
          Psychological safety becomes operational safety—the freedom to surface problems early without fear
          determines whether issues are caught in development or discovered in production.
        </p>
      }
    >
      <h3>Psychological Safety as Operational Safety</h3>
      <p>
        We often treat psychological safety as an HR concern. FOE recognizes that psychological safety
        <em> is</em> operational safety. When engineers fear blame, they hide problems. When they hide
        problems, systems fail. The freedom to say "I don't know" isn't a nice-to-have—it's the mechanism
        by which organizations detect risk before it becomes incident.
      </p>

      <h3>The Heroic Engineering Anti-Pattern</h3>
      <p>
        Every organization has them: the engineer who works through the night, the architect who
        single-handedly saves the release. They're celebrated in all-hands meetings. They're also
        symptoms of system failure.
      </p>
      <p><strong>Why heroism is harmful:</strong></p>
      <ul>
        <li>It masks systemic problems that compound over time</li>
        <li>It burns out your best people while training everyone else to depend on them</li>
        <li>It makes the organization fragile—success depends on specific individuals</li>
        <li>It prevents learning: if heroes always save the day, you never discover what's broken</li>
      </ul>

      <h3>What Leaders Must Do</h3>
      <table>
        <thead>
          <tr>
            <th>Instead of...</th>
            <th>Try...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Asking "will we make it?" and accepting "yes"</td>
            <td>Asking "what evidence do we have?"</td>
          </tr>
          <tr>
            <td>Celebrating last-minute saves</td>
            <td>Celebrating early risk identification</td>
          </tr>
          <tr>
            <td>Rewarding confidence and certainty</td>
            <td>Rewarding clarity about uncertainty</td>
          </tr>
          <tr>
            <td>Asking who's accountable when things fail</td>
            <td>Asking what system allowed this failure</td>
          </tr>
        </tbody>
      </table>

      <h3>The J-Curve of Transformation</h3>
      <p>Organizations should expect:</p>
      <ol>
        <li><strong>Initial dip:</strong> Velocity appears to slow as teams invest in legibility</li>
        <li><strong>The valley:</strong> Hidden problems surface. This phase feels like things are getting worse</li>
        <li><strong>The climb:</strong> Compounding benefits emerge. Fewer surprises. More accurate planning</li>
        <li><strong>New normal:</strong> Sustainable pace with predictable delivery</li>
      </ol>
      <p>
        Leadership must protect teams through the valley. The temptation to abandon FOE practices
        is strongest precisely when they're about to pay off.
      </p>
    </AccordionSection>
  );
}

function Section5(): ReactNode {
  return (
    <AccordionSection
      id="ai-trilemma"
      number={5}
      title="The AI People Trilemma"
      owner="prima"
      executiveSummary={
        <p>
          AI creates a dangerous paradox: it makes junior developers productive without making them wise,
          while senior developers—the ones who provide judgment—are retiring faster than they're being replaced.
          Organizations face a trilemma where AI accelerates output while simultaneously punishing weak
          foundations and depleting the expertise needed to build strong ones.
        </p>
      }
    >
      <h3>The Imbalance</h3>
      <p>Three trends are colliding:</p>
      <ul>
        <li><strong>Senior developers are leaving:</strong> Their knowledge walks out the door with them</li>
        <li><strong>Junior developers can produce without understanding:</strong> AI lets them generate working code without comprehending implications</li>
        <li><strong>Organizations are unprepared:</strong> They see junior productivity and assume the pipeline is working</li>
      </ul>

      <h3>Why "Just Hire More" Fails</h3>
      <p>
        AI doesn't just change the quantity of work; it changes the nature of valuable work.
        The bottleneck shifts to judgment. You cannot hire your way out of a judgment shortage
        by hiring more people who lack judgment.
      </p>

      <h3>The Mentor-Over-Hero Model</h3>
      <table>
        <thead>
          <tr>
            <th>Hero Model</th>
            <th>Mentor Model</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Seniors write the critical code</td>
            <td>Seniors review and guide; juniors write</td>
          </tr>
          <tr>
            <td>Seniors are the bottleneck</td>
            <td>Seniors are the multiplier</td>
          </tr>
          <tr>
            <td>Knowledge stays in senior heads</td>
            <td>Knowledge flows into systems and people</td>
          </tr>
        </tbody>
      </table>

      <h3>The Small Craft Guild Approach</h3>
      <p><strong>The ratio:</strong> 1 senior + 2 juniors, equipped with AI tooling and FOE practices.</p>
      <ul>
        <li><strong>The senior provides:</strong> Judgment, risk identification, quality standards, knowledge transfer</li>
        <li><strong>The juniors provide:</strong> Implementation capacity and opportunity for seniors to teach</li>
        <li><strong>The tooling provides:</strong> Leverage—AI handles mechanical work, freeing humans for judgment</li>
      </ul>

      <div className={styles.highlightBox}>
        <p>
          "AI gives developers superhuman output but subhuman guardrails. The organizations that
          thrive will pair AI leverage with human judgment."
        </p>
      </div>
    </AccordionSection>
  );
}

function Section6(): ReactNode {
  return (
    <AccordionSection
      id="local-first"
      number={6}
      title="Local-First Agentic Infrastructure"
      owner="prima"
      executiveSummary={
        <p>
          Prima will fork the OpenCode framework to create the Prima Local Agent—a local-first,
          offline-capable, audit-friendly foundation for agentic coding. This isn't about choosing
          a vendor; it's about architectural philosophy. If an agent cannot explain what it did locally,
          it cannot be trusted globally.
        </p>
      }
    >
      <h3>Why Local-First</h3>
      <div className={styles.highlightBox}>
        <p>"If the agent cannot explain what it did locally, it cannot be trusted globally."</p>
      </div>
      <p>When the agent runs locally:</p>
      <ul>
        <li>You can audit every action without trusting a vendor's logs</li>
        <li>You can work offline, on airgapped systems, in secure environments</li>
        <li>You own the data, the history, and the ability to reproduce any state</li>
        <li>Compliance and security reviews become tractable</li>
      </ul>

      <h3>Core Characteristics</h3>
      <table>
        <thead>
          <tr>
            <th>Characteristic</th>
            <th>What It Means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Local execution</strong></td>
            <td>The agent runs on your machine, with your permissions</td>
          </tr>
          <tr>
            <td><strong>No SaaS dependency</strong></td>
            <td>Core functionality works without internet</td>
          </tr>
          <tr>
            <td><strong>Git history preserved</strong></td>
            <td>Every action is a commit; you can diff and revert</td>
          </tr>
          <tr>
            <td><strong>Tool-agnostic</strong></td>
            <td>Works with any LLM backend</td>
          </tr>
        </tbody>
      </table>

      <h3>Wizard-Style Agents for Non-Technical Users</h3>
      <ul>
        <li><strong>Hide complexity without removing capability:</strong> No CLI required, but everything is still versioned</li>
        <li><strong>Guide users through structured workflows:</strong> Step-by-step processes with guardrails</li>
        <li><strong>Maintain the audit trail:</strong> Just because the user doesn't see Git doesn't mean it's not there</li>
      </ul>

      <h3>A Legibility Surface, Not a Productivity Hack</h3>
      <p>
        The goal isn't primarily speed or cost savings. It's <em>legibility</em>—the ability to understand,
        verify, and trust what automated systems are doing on your behalf. This is FOE applied to AI tooling
        itself: optimize for understanding, fast feedback, and confidence.
      </p>
    </AccordionSection>
  );
}

function Section7(): ReactNode {
  return (
    <AccordionSection
      id="agent-convention"
      number={7}
      title="The .agent/ Convention"
      owner="prima"
      executiveSummary={
        <p>
          The <code>.agent/</code> directory convention provides a tool-agnostic home for agent
          definitions—markdown files, simple metadata, and human-readable instructions that work
          across any AI coding assistant. As the agent ecosystem converges on simple patterns,
          this convention ensures eSimplicity can adopt new tools without rewriting institutional knowledge.
        </p>
      }
    >
      <h3>Why Tool Agnosticism is Strategic</h3>
      <p>
        The AI agent landscape is consolidating around surprisingly simple patterns: markdown instructions,
        convention-based discovery, and declarative constraints. By expressing agents in the simplest
        viable form, eSimplicity can ride tool churn rather than fight it.
      </p>

      <h3>Directory Structure</h3>
      <div className={styles.directoryTree}>
        <code>{`.agent/
├── definitions/     # Core agent personas
├── skills/          # Reusable capabilities
├── sub-agents/      # Specialized delegates
├── instructions/    # Project conventions
└── constraints/     # Guardrails and policies`}</code>
      </div>

      <h3>Markdown as the Universal Format</h3>
      <ul>
        <li><strong>Human-readable:</strong> Engineers can review and modify agent behavior without special tooling</li>
        <li><strong>Version-controlled:</strong> Agent evolution is tracked alongside code changes</li>
        <li><strong>Diffable:</strong> Changes show up in pull requests for review</li>
        <li><strong>Tool-portable:</strong> Any framework that reads markdown can consume these definitions</li>
      </ul>

      <h3>GitHub as Distribution Fabric</h3>
      <p>
        Skills can be shared across repositories. Definitions can be forked and customized.
        When the next generation of AI tools arrives, eSimplicity's accumulated agent knowledge
        moves with a git clone, not a migration project.
      </p>
    </AccordionSection>
  );
}

function Section8(): ReactNode {
  return (
    <AccordionSection
      id="compliance"
      number={8}
      title="Compliance Without Theater"
      owner="shared"
      executiveSummary={
        <p>
          FOE reframes compliance as an evidence production problem rather than a paperwork problem.
          By generating compliance artifacts as automatic byproducts of normal work—configuration
          managed by agents, changes that produce receipts, deployment modes that fit agency
          constraints—we collapse ATO friction without pretending regulatory requirements don't exist.
        </p>
      }
    >
      <h3>The Evidence Production Model</h3>
      <p>
        Traditional compliance treats documentation as a separate activity. FOE inverts this:
        every engineering action automatically generates evidence. Compliance becomes a view into
        work that's already happening, not additional work.
      </p>

      <h3>Two Deployment Modes</h3>
      <table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>Description</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>eSimplicity-Managed</strong></td>
            <td>Full Prima Engine in eSimplicity infrastructure</td>
            <td>Agencies comfortable with contractor-managed AI</td>
          </tr>
          <tr>
            <td><strong>Agency-Hosted Minimal</strong></td>
            <td>Single container as proxy/execution boundary</td>
            <td>Agencies requiring on-premise deployment</td>
          </tr>
        </tbody>
      </table>

      <h3>Agent-Generated Configuration</h3>
      <p>
        Configuration files are not hand-authored. Agents generate them based on declared intent.
        This eliminates tribal knowledge and ensures configuration is always reproducible and auditable.
      </p>

      <h3>Automatic Receipt Generation</h3>
      <p>Every change produces receipts automatically:</p>
      <ul>
        <li><strong>Who:</strong> Identity of the human or agent that initiated the change</li>
        <li><strong>What:</strong> Precise diff linked to relevant artifacts</li>
        <li><strong>Why:</strong> Traced back to requirements or decisions</li>
        <li><strong>When:</strong> Timestamped and cryptographically attested</li>
      </ul>
      <p>
        When auditors ask "show me evidence that X," the answer is a query, not a document hunt.
      </p>
    </AccordionSection>
  );
}

function Section9(): ReactNode {
  return (
    <AccordionSection
      id="field-guide"
      number={9}
      title="Field Guide as Living System"
      owner="shared"
      executiveSummary={
        <p>
          The Field Guide is not documentation—it's institutional memory expressed as hypotheses
          with experiments attached. Every method starts as a guess, graduates through maturity
          levels as evidence accumulates, and can be downgraded when new evidence contradicts
          prior beliefs. Agents help maintain this living system.
        </p>
      }
    >
      <h3>The Core Pattern</h3>
      <ol>
        <li><strong>Guidance:</strong> A method captures current best understanding</li>
        <li><strong>Experiments:</strong> Teams apply the method and document what happens</li>
        <li><strong>Evidence:</strong> Results accumulate, revealing patterns and edge cases</li>
        <li><strong>Updated Guidance:</strong> Methods evolve based on evidence, not opinion</li>
      </ol>

      <h3>Method Maturity Levels</h3>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Hypothesized</strong></td>
            <td>We think this might work based on theory</td>
          </tr>
          <tr>
            <td><strong>Experimenting</strong></td>
            <td>Teams are actively testing this approach</td>
          </tr>
          <tr>
            <td><strong>Validated</strong></td>
            <td>Evidence suggests this works in our context</td>
          </tr>
          <tr>
            <td><strong>Proven</strong></td>
            <td>Strong evidence across diverse conditions</td>
          </tr>
        </tbody>
      </table>
      <p>
        Critically, methods can move backwards. A "Proven" method that starts failing gets downgraded.
        The system has no ego—only evidence.
      </p>

      <h3>Agent-Assisted Maintenance</h3>
      <ul>
        <li><strong>Evidence Linker:</strong> Connects code changes to relevant methods</li>
        <li><strong>Staleness Detector:</strong> Flags methods that haven't been validated recently</li>
        <li><strong>Edit Proposer:</strong> Suggests updates based on observed patterns</li>
      </ul>
      <p>
        This is meta-engineering: using agents to reduce the cost of maintaining truth.
      </p>
    </AccordionSection>
  );
}

function Section10(): ReactNode {
  return (
    <AccordionSection
      id="foe-repos"
      number={10}
      title="FOE in Every Repo"
      owner="ric"
      executiveSummary={
        <p>
          FOE is not optional or a sidecar—it is embedded in every repository we touch. Every change
          is treated as a claim about reality that must earn its keep through evidence. This scaffolding
          ensures that learning is captured where work happens, not reconstructed after the fact.
        </p>
      }
    >
      <h3>What Gets Embedded</h3>
      <ul>
        <li><strong>Experiment hooks:</strong> Standardized entry points for capturing hypotheses and outcomes</li>
        <li><strong>Change → Hypothesis → Evidence mapping:</strong> Every meaningful change links to a testable claim</li>
        <li><strong>Field Guide integration:</strong> Learnings flow automatically into organizational memory</li>
      </ul>

      <h3>Why Scaffolding Is Non-Negotiable</h3>
      <table>
        <thead>
          <tr>
            <th>Discipline</th>
            <th>Without Scaffolding</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Domain-Driven Design</strong></td>
            <td>Models drift from meaning</td>
          </tr>
          <tr>
            <td><strong>Behavior-Driven Development</strong></td>
            <td>Specs become stale documentation</td>
          </tr>
          <tr>
            <td><strong>Architecture as Code</strong></td>
            <td>Architecture exists only in heads</td>
          </tr>
        </tbody>
      </table>

      <h3>Agents Enforce Discipline</h3>
      <p>
        A critical mental shift: agents are not here to bypass rigor—they enforce it.
        Agents generate tests before code, link changes to hypotheses, and flag gaps in evidence.
      </p>

      <h3>The Question That Changes Everything</h3>
      <div className={styles.highlightBox}>
        <p>
          The shift is from "Did we ship?" to "What did we learn, and what evidence do we have?"
        </p>
      </div>
    </AccordionSection>
  );
}

function Section11(): ReactNode {
  return (
    <AccordionSection
      id="katalyst"
      number={11}
      title="The Katalyst Foundation"
      owner="ric"
      executiveSummary={
        <p>
          Katalyst is the platform that makes agentic coding survivable. It serves as the DevEx layer,
          testing substrate, and BDD backbone—the critical Phase 3 enabler. Without this foundation,
          Phase 4 aspirations collapse into Phase 2 chaos at higher velocity.
        </p>
      }
    >
      <h3>Why Phase 3 Is the Organizational Bottleneck</h3>
      <p>
        Most organizations assume Phase 4 (Agentic Coding) is the hard part. They are wrong.
        Phase 3—establishing disciplined, evidence-based practices—is where organizations stall.
        Phase 4 without Phase 3 is just faster chaos.
      </p>

      <h3>The Discipline Gap</h3>
      <div className={styles.warningBox}>
        <p><strong>Tools don't create disciplines—they enable or amplify existing ones.</strong></p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Without Katalyst</th>
            <th>With Katalyst</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BDD is aspirational documentation</td>
            <td>BDD is executable specification</td>
          </tr>
          <tr>
            <td>Testing is afterthought</td>
            <td>Testing is substrate</td>
          </tr>
          <tr>
            <td>Architecture drifts invisibly</td>
            <td>Architecture is code, enforced</td>
          </tr>
        </tbody>
      </table>

      <h3>What Katalyst Provides</h3>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Platform as Product</div>
          <p className={styles.cardDescription}>Internal DevEx treated with same rigor as customer-facing products</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Testing Substrate</div>
          <p className={styles.cardDescription}>Infrastructure making comprehensive testing the default</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Taxonomy Framework</div>
          <p className={styles.cardDescription}>Shared vocabulary enabling meaningful measurement</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>BDD Backbone</div>
          <p className={styles.cardDescription}>Tooling making BDD executable and maintainable</p>
        </div>
      </div>

      <h3>Key Metrics Katalyst Enables</h3>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>Daily+</span>
          <span className={styles.metricLabel}>Deployment Frequency</span>
          <span className={styles.metricTarget}>Target: Multiple per day</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>&lt;1 day</span>
          <span className={styles.metricLabel}>Lead Time</span>
          <span className={styles.metricTarget}>Commit to production</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>&lt;5%</span>
          <span className={styles.metricLabel}>Change Failure Rate</span>
          <span className={styles.metricTarget}>Deployments needing rollback</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>&lt;1 hr</span>
          <span className={styles.metricLabel}>MTTR</span>
          <span className={styles.metricTarget}>Incident to resolution</span>
        </div>
      </div>
    </AccordionSection>
  );
}

function Section12(): ReactNode {
  return (
    <AccordionSection
      id="macro-goal"
      number={12}
      title="The Macro Goal"
      owner="shared"
      executiveSummary={
        <p>
          This is not an AI strategy. This is not a tooling initiative. This is an attempt to make
          software development behave like a mature engineering discipline—one where claims require
          evidence, learning compounds, and truth becomes cheaper than assumption. The altered economics
          of AI make this both possible and necessary.
        </p>
      }
    >
      <h3>The Virtuous Cycle</h3>
      <ol>
        <li><strong>More empirical work</strong> → validates what actually works</li>
        <li><strong>More automation</strong> → captures validated patterns</li>
        <li><strong>More agents</strong> → executes patterns at scale</li>
        <li><strong>More pressure on rigor</strong> → demands better evidence</li>
        <li><strong>FOE absorbs pressure</strong> → provides the rigor framework</li>
        <li><em>Cycle repeats at higher capability</em></li>
      </ol>

      <h3>The Final Architecture</h3>
      <div className={styles.architectureDiagram}>
        <div className={styles.architectureTitle}>System Architecture</div>
        <div className={styles.architectureGrid}>
          <div className={styles.architectureItem}>
            <span className={styles.architectureItemLabel}>Spine</span>
            <span className={styles.architectureItemValue}>FOE</span>
          </div>
          <div className={styles.architectureItem}>
            <span className={styles.architectureItemLabel}>Muscle</span>
            <span className={styles.architectureItemValue}>Agentic Coding</span>
          </div>
          <div className={styles.architectureItem}>
            <span className={styles.architectureItemLabel}>Skeleton</span>
            <span className={styles.architectureItemValue}>Katalyst</span>
          </div>
          <div className={styles.architectureItem}>
            <span className={styles.architectureItemLabel}>Nervous System</span>
            <span className={styles.architectureItemValue}>Prima</span>
          </div>
          <div className={styles.architectureItem}>
            <span className={styles.architectureItemLabel}>Memory</span>
            <span className={styles.architectureItemValue}>Field Guide</span>
          </div>
        </div>
      </div>

      <h3>Why Clients Feel Safer</h3>
      <p><strong>Receipts by default, not promises:</strong></p>
      <ul>
        <li>Every claim comes with evidence</li>
        <li>Progress is demonstrable, not asserted</li>
        <li>Risk is visible and managed, not hidden</li>
        <li>Trust builds because verification is built-in</li>
      </ul>

      <h3>The Final Frame</h3>
      <div className={styles.highlightBox}>
        <p>
          "An attempt to make software development behave like a mature engineering discipline
          under radically altered economics."
        </p>
      </div>
      <p>
        Civil engineers don't ship bridges and hope they work. Software has avoided this because
        the cost of failure was absorbable and the cost of rigor was prohibitive.
        <strong> AI changes both sides:</strong> the cost of failure increases (AI amplifies mistakes),
        and the cost of rigor decreases (AI makes evidence generation cheap).
      </p>
      <p>
        <strong>The point is not speed. The point is truth at scale.</strong>
      </p>
    </AccordionSection>
  );
}

// ============================================
// CALL TO ACTION
// ============================================

function CTASection(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to implement FOE?</h2>
        <p className={styles.ctaDescription}>
          Explore the full documentation to understand the principles, practices, and patterns
          that make this strategy possible.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/docs/intro/what-is-foe" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
            Read the Documentation
          </Link>
          <Link to="/docs/maturity-model/self-assessment" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            Self-Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function ESimplicityStrategy(): ReactNode {
  useEffect(() => {
    document.documentElement.classList.add('hide-navbar');
    return () => {
      document.documentElement.classList.remove('hide-navbar');
    };
  }, []);

  return (
    <Layout
      title="eSimplicity FOE Strategy"
      description="Flow Optimized Engineering implementation strategy for safe agentic software at eSimplicity"
    >
      <Head>
        <style>{`
          .navbar { display: none !important; }
          .main-wrapper { padding-top: 0 !important; }
        `}</style>
      </Head>
      <main className={styles.strategyPage}>
        <HeroSection />
        <div className={styles.pageWrapper}>
          <StrategySidebar sections={sections} />
          <div className={styles.mainContent}>
            <div className={styles.sectionsContainer}>
              <Section1 />
              <Section2 />
              <Section3 />
              <Section4 />
              <Section5 />
              <Section6 />
              <Section7 />
              <Section8 />
              <Section9 />
              <Section10 />
              <Section11 />
              <Section12 />
            </div>
          </div>
        </div>
        <CTASection />
      </main>
    </Layout>
  );
}
