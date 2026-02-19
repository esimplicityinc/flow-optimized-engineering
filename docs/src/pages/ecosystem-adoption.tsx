import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import AccordionSection from '../components/AccordionSection';
import StrategySidebar from '../components/StrategySidebar';
import styles from './ecosystem-adoption.module.css';

// ============================================
// SECTION DATA
// ============================================

const sections = [
  { id: 'the-problem', number: 1, title: 'The Problem', owner: 'shared' as const },
  { id: 'three-layers', number: 2, title: 'Three Layers, One System', owner: 'shared' as const },
  { id: 'ai-compatible', number: 3, title: 'The AI-Compatible Framework', owner: 'shared' as const },
  { id: 'prima-agents', number: 4, title: 'How Prima Activates Katalyst', owner: 'prima' as const },
  { id: 'adoption-paths', number: 5, title: 'Adoption Paths', owner: 'shared' as const },
  { id: 'your-program', number: 6, title: 'What This Means for You', owner: 'shared' as const },
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
        <span className={styles.heroBadge}>Ecosystem Guide</span>
        <h1 className={styles.heroTitle}>
          FOE + Katalyst + Prima
        </h1>
        <p className={styles.heroSubtitle}>
          Three layers. Any combination. Each amplifies the others.
        </p>
        <div className={styles.heroMeta}>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            3 Systems
          </span>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            6 Sections
          </span>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Flexible Adoption
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
// SECTION 1: THE PROBLEM
// ============================================

function Section1(): ReactNode {
  return (
    <AccordionSection
      id="the-problem"
      number={1}
      title="The Problem"
      owner="shared"
      executiveSummary={
        <>
          <p>
            Organizations adopt tools in isolation and wonder why outcomes don't improve.
            A testing framework without architecture discipline produces tests nobody trusts.
            A deployment platform without verification produces faster failures.
            An AI copilot without guardrails produces faster technical debt.
          </p>
          <blockquote>
            <p>
              Tools alone don't produce outcomes. Alignment produces outcomes. Tools accelerate them.
            </p>
          </blockquote>
        </>
      }
    >
      <h3>The Isolated Adoption Pattern</h3>
      <p>
        Delivery programs routinely invest in individual tools expecting transformation.
        They buy a platform, adopt a testing framework, or deploy an AI coding assistant.
        Each investment has merit. But without a governing framework connecting them,
        each underperforms or actively conflicts with the others.
      </p>
      <table>
        <thead>
          <tr>
            <th>What Gets Adopted</th>
            <th>What Happens Without Alignment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cloud platform</strong></td>
            <td>Teams deploy faster but break things faster. No shared patterns. Configuration drift across services.</td>
          </tr>
          <tr>
            <td><strong>Testing framework</strong></td>
            <td>Tests exist but don't trace to requirements. Coverage numbers go up; confidence doesn't.</td>
          </tr>
          <tr>
            <td><strong>AI coding tools</strong></td>
            <td>Code output increases. So does technical debt. Review becomes the bottleneck. Nobody trusts what the agent wrote.</td>
          </tr>
          <tr>
            <td><strong>Architecture documentation</strong></td>
            <td>Diagrams go stale within weeks. New engineers still ask "how does this work?" because the docs don't match reality.</td>
          </tr>
        </tbody>
      </table>

      <h3>The GovCon Dimension</h3>
      <p>
        In government contracting, the stakes are higher. Auditors don't want to hear about your tooling.
        They want evidence chains: from contract requirements, through implementation, to verified outcomes.
        Isolated tools can't produce that chain. They produce fragments that someone has to manually assemble
        under audit pressure.
      </p>

      <div className={styles.highlightBox}>
        <p>
          The question is not "which tool should we buy?" The question is
          "what system connects our tools into a coherent delivery capability?"
        </p>
      </div>

      <h3>What's Actually Missing</h3>
      <p>Three things, each at a different level:</p>
      <ol>
        <li><strong>Alignment</strong> -- A shared understanding of what "good" looks like and how to measure it. Without this, teams optimize locally while the program drifts.</li>
        <li><strong>Enablement</strong> -- Infrastructure that makes the aligned practices executable and, critically, AI-compatible. Without this, practices remain aspirational.</li>
        <li><strong>Acceleration</strong> -- AI capabilities that operate safely on top of that enabled infrastructure. Without the first two layers, acceleration is just faster chaos.</li>
      </ol>
      <p>
        These three layers correspond to three systems: FOE, Katalyst, and Prima.
      </p>
    </AccordionSection>
  );
}

// ============================================
// SECTION 2: THREE LAYERS, ONE SYSTEM
// ============================================

function Section2(): ReactNode {
  return (
    <AccordionSection
      id="three-layers"
      number={2}
      title="Three Layers, One System"
      owner="shared"
      executiveSummary={
        <p>
          FOE provides the alignment doctrine -- what to optimize and why.
          Katalyst provides the enablement platform -- making those optimizations concrete and AI-compatible.
          Prima provides the acceleration engine -- AI agents that operate safely on Katalyst infrastructure,
          governed by FOE principles. Each layer amplifies the ones below it.
        </p>
      }
    >
      {/* Stack diagram */}
      <div className={styles.stackDiagram}>
        <div className={`${styles.stackLayer} ${styles.stackLayerPrima}`}>
          <span className={styles.stackLayerRole}>Acceleration</span>
          <span className={styles.stackLayerName}>Prima</span>
          <span className={styles.stackLayerDesc}>AI-powered delivery</span>
        </div>
        <div className={styles.stackArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14" />
          </svg>
          runs on
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14" />
          </svg>
        </div>
        <div className={`${styles.stackLayer} ${styles.stackLayerKatalyst}`}>
          <span className={styles.stackLayerRole}>Enablement</span>
          <span className={styles.stackLayerName}>Katalyst</span>
          <span className={styles.stackLayerDesc}>AI-compatible delivery framework</span>
        </div>
        <div className={styles.stackArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14" />
          </svg>
          aligned to
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14" />
          </svg>
        </div>
        <div className={`${styles.stackLayer} ${styles.stackLayerFoe}`}>
          <span className={styles.stackLayerRole}>Alignment</span>
          <span className={styles.stackLayerName}>FOE</span>
          <span className={styles.stackLayerDesc}>Delivery doctrine</span>
        </div>
      </div>

      {/* Layer descriptions */}
      <div className={`${styles.layerCard} ${styles.layerCardFoe}`}>
        <span className={`${styles.layerCardLabel} ${styles.labelFoe}`}>Alignment Layer</span>
        <h4 className={styles.layerCardTitle}>FOE: Flow Optimized Engineering</h4>
        <div className={styles.layerCardBody}>
          <p>
            The governing doctrine. FOE defines three optimizations that hold whether work is done
            by humans, AI agents, or both:
          </p>
          <ul>
            <li><strong>Optimize for Understanding</strong> -- Can the team form accurate mental models of the system?</li>
            <li><strong>Optimize for Fast Feedback</strong> -- How quickly do we discover whether a decision was right?</li>
            <li><strong>Optimize for Confidence</strong> -- Are we willing to act because risk is bounded, visible, and reversible?</li>
          </ul>
          <p>
            FOE also provides the <strong>Maturity Model</strong> for honest self-assessment,
            the <strong>Field Guide</strong> as institutional memory (evidence-backed methods, not opinions),
            and <strong>stakeholder-specific guidance</strong> for executives, engineers, and government customers.
          </p>
        </div>
      </div>

      <div className={`${styles.layerCard} ${styles.layerCardKatalyst}`}>
        <span className={`${styles.layerCardLabel} ${styles.labelKatalyst}`}>Enablement Layer</span>
        <h4 className={styles.layerCardTitle}>Katalyst: The AI-Compatible Delivery Framework</h4>
        <div className={styles.layerCardBody}>
          <p>
            Three interconnected components that make FOE principles executable. Together, they create
            a delivery framework with every precondition for safe AI operation built in -- whether or not
            you use AI agents today.
          </p>
          <ul>
            <li>
              <strong>Katalyst Taxonomy</strong> (Understanding) -- Architecture-as-code.
              Define your system hierarchy as YAML. Navigate with <code>kata tree</code> and <code>kata tui</code>.
              Agents and humans discover the same architecture through the same queryable interface.
            </li>
            <li>
              <strong>Katalyst BDD Test</strong> (Fast Feedback) -- Multi-layer BDD testing with ports and adapters.
              Gherkin scenarios serve as both executable tests and living documentation.
              The verification layer that gives both humans and agents proof of correctness.
            </li>
            <li>
              <strong>Katalyst Platform</strong> (Confidence) -- Cloud-native infrastructure with
              ArgoCD GitOps, full observability (Grafana/Prometheus/Loki/Tempo), service mesh, and secrets management.
              Every change goes through Git. Every failure triggers automatic rollback.
            </li>
          </ul>
          <p>
            The critical insight: <strong>full Katalyst adoption creates an AI-compatible delivery framework</strong>.
            The hooks exist for AI agents to consume, even if you haven't activated Prima yet.
            Your BDD tests, your taxonomy, your GitOps pipeline -- they're already agent-ready.
          </p>
        </div>
      </div>

      <div className={`${styles.layerCard} ${styles.layerCardPrima}`}>
        <span className={`${styles.layerCardLabel} ${styles.labelPrima}`}>Acceleration Layer</span>
        <h4 className={styles.layerCardTitle}>Prima: The AI Engine</h4>
        <div className={styles.layerCardBody}>
          <p>
            The AI-powered product platform that government delivery teams interact with.
            Prima runs on Katalyst infrastructure, governed by FOE principles, amplifying
            both human and machine productivity.
          </p>
          <ul>
            <li><strong>Control Tower</strong> -- Operational visibility: configuration, policies, RBAC, audit trails</li>
            <li><strong>Engine</strong> -- AI/ML execution: agent orchestration, MCP protocol, model integration</li>
            <li><strong>Web</strong> -- User-facing application for government teams</li>
            <li><strong>Platform</strong> -- Infrastructure automation via Terraform and Helm</li>
          </ul>
          <p>
            Prima agents consume every hook Katalyst provides. They query the taxonomy to understand
            what exists. They commit changes through Git. They run BDD tests to verify correctness.
            They check Prometheus to confirm changes worked. They don't need special infrastructure --
            they use the same interfaces humans and CI/CD use.
          </p>
        </div>
      </div>

      <div className={styles.highlightBox}>
        <p>
          Each additional layer is a force multiplier, not a dependency.
          FOE alone improves decision-making.
          Add Katalyst and those decisions become executable and AI-compatible.
          Add Prima and execution accelerates under safe governance.
        </p>
      </div>
    </AccordionSection>
  );
}

// ============================================
// SECTION 3: AI-COMPATIBLE FRAMEWORK
// ============================================

function Section3(): ReactNode {
  return (
    <AccordionSection
      id="ai-compatible"
      number={3}
      title="The AI-Compatible Framework"
      owner="shared"
      executiveSummary={
        <p>
          Full Katalyst adoption doesn't just help human developers ship better software.
          It creates the complete surface area that AI agents need to operate safely.
          Every Katalyst component produces a hook that agents can consume:
          queryable state, safe change paths, automated verification, and feedback signals.
          This is what makes a delivery framework AI-compatible -- not the AI itself,
          but the infrastructure it operates on.
        </p>
      }
    >
      <h3>Why "AI-Compatible" Matters</h3>
      <p>
        Human developers compensate for infrastructure gaps with intuition, experience, and asking colleagues.
        AI agents cannot. An agent asked to deploy a service needs to:
      </p>
      <ol>
        <li><strong>Discover</strong> what services already exist (without guessing)</li>
        <li><strong>Follow</strong> defined patterns (without hallucinating them)</li>
        <li><strong>Execute</strong> changes safely (through reviewable, revertible paths)</li>
        <li><strong>Verify</strong> that changes worked (with automated tests, not assumptions)</li>
        <li><strong>Recover</strong> if something went wrong (without human intervention)</li>
      </ol>
      <p>
        Without infrastructure that provides these capabilities programmatically, agents amplify
        chaos at machine speed. The infrastructure that was "nice to have" for human developers
        becomes non-negotiable for AI agents.
      </p>

      <h3>The Seven Hooks</h3>
      <p>
        Full Katalyst creates seven concrete hooks that any AI agent system -- Prima or otherwise -- can consume:
      </p>

      <table className={styles.hooksTable}>
        <thead>
          <tr>
            <th>Agent Need</th>
            <th>Katalyst Hook</th>
            <th>What It Provides</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className={styles.hookName}>Discover</span></td>
            <td>
              <span className={`${styles.hookIcon} ${styles.hookIconKatalyst}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h18v18H3z" /><path d="M9 3v18M3 9h18" />
                </svg>
              </span>
              Taxonomy API <span className={styles.hookCode}>kata tree --json</span>
            </td>
            <td>Agents query architecture structure, not guess. Every system, subsystem, stack, and layer is discoverable programmatically.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Standardize</span></td>
            <td>
              <span className={`${styles.hookIcon} ${styles.hookIconKatalyst}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Layer type schemas
            </td>
            <td>Agents follow defined patterns via scaffolding. <span className={styles.hookCode}>kata create</span> enforces consistent structure, CI/CD configuration, and observability integration.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Execute</span></td>
            <td>
              <span className={`${styles.hookIcon} ${styles.hookIconKatalyst}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </span>
              GitOps / ArgoCD
            </td>
            <td>All changes go through Git -- reviewable, attributable, revertible. No direct cluster manipulation. The "chokepoint" that makes agent changes auditable.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Verify</span></td>
            <td>
              <span className={`${styles.hookIcon} ${styles.hookIconKatalyst}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              BDD Test <span className={styles.hookCode}>npx playwright test</span>
            </td>
            <td>Agents run Gherkin scenarios to prove correctness. Human-readable specifications that are also machine-executable verification.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Monitor</span></td>
            <td>
              <span className={`${styles.hookIcon} ${styles.hookIconKatalyst}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Observability stack
            </td>
            <td>Agents query Prometheus metrics, Loki logs, and Tempo traces to confirm changes worked. Objective success signals, not assumptions.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Recover</span></td>
            <td>
              <span className={`${styles.hookIcon} ${styles.hookIconKatalyst}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </span>
              Auto-rollback
            </td>
            <td>Failed deployments revert automatically via ArgoCD self-heal. Agent mistakes are corrected in seconds, not hours.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Comply</span></td>
            <td>
              <span className={`${styles.hookIcon} ${styles.hookIconKatalyst}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              Policy as Code (OPA)
            </td>
            <td>Governance at machine speed. OPA/Gatekeeper validates agent output before it merges. No "the agent bypassed the review process."</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.highlightBox}>
        <p>
          These hooks exist whether you use AI agents today or not.
          Full Katalyst adoption makes your delivery framework AI-compatible.
          When you're ready for agents, the surface area is already there.
        </p>
      </div>

      <h3>Without These Hooks, Agents Fail</h3>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Without Katalyst</th>
            <th>With Katalyst</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agent deploys bad config</td>
            <td>Manual discovery hours later, manual fix</td>
            <td>Auto-rollback in seconds</td>
          </tr>
          <tr>
            <td>Agent can't find a service</td>
            <td>Guesses, creates duplicates</td>
            <td>Queries Taxonomy, finds existing</td>
          </tr>
          <tr>
            <td>Agent needs to verify a change</td>
            <td>Assumes success, moves on</td>
            <td>Runs BDD tests, checks Prometheus</td>
          </tr>
          <tr>
            <td>Agent creates non-standard code</td>
            <td>Merged as tech debt</td>
            <td>Blocked by schema validation</td>
          </tr>
          <tr>
            <td>Agent causes an incident</td>
            <td>Humans scramble at 3am</td>
            <td>Self-healing + alert to agent</td>
          </tr>
        </tbody>
      </table>
    </AccordionSection>
  );
}

// ============================================
// SECTION 4: PRIMA AGENTS
// ============================================

function Section4(): ReactNode {
  return (
    <AccordionSection
      id="prima-agents"
      number={4}
      title="How Prima Activates Katalyst"
      owner="prima"
      executiveSummary={
        <p>
          Prima agents turn Katalyst's AI-compatible framework into an AI-powered one.
          They consume every hook Katalyst provides using the same interfaces humans and CI/CD use.
          The BDD tests that give developers confidence are the same tests agents run to verify their work.
          The taxonomy that helps engineers navigate the system is the same API agents query to understand it.
        </p>
      }
    >
      <h3>The Agent Cognitive Loop</h3>
      <p>
        AI agents need the same cognitive cycle humans do: <strong>Understand, Act, Confirm, Learn</strong>.
        The difference is that agents can't compensate for missing infrastructure with intuition.
        Every step must have a programmatic, reliable answer.
      </p>

      <div className={styles.loopDiagram}>
        <div className={`${styles.loopStep} ${styles.loopStep1}`}>
          <span className={styles.loopStepNumber}>1</span>
          <span className={styles.loopStepLabel}>Understand</span>
          <span className={styles.loopStepDetail}>Query Taxonomy<br/>Query K8s API<br/>Query Prometheus</span>
        </div>
        <div className={styles.loopArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div className={`${styles.loopStep} ${styles.loopStep2}`}>
          <span className={styles.loopStepNumber}>2</span>
          <span className={styles.loopStepLabel}>Act</span>
          <span className={styles.loopStepDetail}>Commit to Git<br/>ArgoCD syncs<br/>K8s reconciles</span>
        </div>
        <div className={styles.loopArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div className={`${styles.loopStep} ${styles.loopStep3}`}>
          <span className={styles.loopStepNumber}>3</span>
          <span className={styles.loopStepLabel}>Confirm</span>
          <span className={styles.loopStepDetail}>Run BDD tests<br/>Check health<br/>Verify metrics</span>
        </div>
        <div className={styles.loopArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div className={`${styles.loopStep} ${styles.loopStep4}`}>
          <span className={styles.loopStepNumber}>4</span>
          <span className={styles.loopStepLabel}>Learn</span>
          <span className={styles.loopStepDetail}>Process feedback<br/>Adjust approach<br/>Update Field Guide</span>
        </div>
      </div>
      <span className={styles.loopReturn}>
        Learning feeds back to Understanding -- the cycle repeats at higher capability
      </span>

      <h3>What Prima Agents Do on Katalyst</h3>
      <p>
        Prima agents don't need special infrastructure. They use the same interfaces that human
        developers and CI/CD pipelines use. That's the point -- Katalyst creates a uniform surface
        area for all actors in the system.
      </p>

      <table>
        <thead>
          <tr>
            <th>Agent Action</th>
            <th>Katalyst Interface Used</th>
            <th>Same as Humans?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discover existing services</td>
            <td><code>kata tree --json</code> + <code>kubectl get</code></td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Scaffold a new service</td>
            <td><code>kata create --layer-type app-docker</code></td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Deploy a change</td>
            <td><code>git commit</code> + ArgoCD reconciliation</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Verify correctness</td>
            <td>Gherkin scenarios via <code>npx playwright test</code></td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Check system health</td>
            <td>Prometheus API + Grafana dashboards</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Investigate an incident</td>
            <td>Loki log queries + Tempo traces</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Roll back a failure</td>
            <td><code>git revert</code> + ArgoCD auto-heal</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.evidenceBox}>
        <p>
          <strong>Evidence from Prima's own adoption (Observation O100):</strong> Prima's BDD testing
          across Control Tower and Engine services grew to 56 feature files over 7 months.
          Repositories with BDD tests showed <strong>6-7x higher refactoring rates</strong> (10.8% vs 1.6%),
          quantitative evidence that executable specifications enable confident code restructuring --
          by humans and agents alike.
        </p>
      </div>

      <h3>The Compound Effect</h3>
      <p>
        When Prima agents run on Katalyst infrastructure governed by FOE principles, each
        system amplifies the others:
      </p>
      <ul>
        <li>
          <strong>FOE Field Guides</strong> capture what the team learns. Agent-generated changes that
          work become documented methods. Failures become documented anti-patterns. The organization
          gets smarter over time, not just faster.
        </li>
        <li>
          <strong>Katalyst BDD tests</strong> written for human confidence become agent guardrails.
          The same Gherkin scenario that helps a developer understand a requirement also constrains
          what an agent can ship without passing verification.
        </li>
        <li>
          <strong>Prima agents</strong> generate evidence that feeds back into the FOE system.
          Deployment frequency, change failure rate, test coverage -- all measurable, all
          flowing back into the Field Guide as data, not opinion.
        </li>
      </ul>

      <div className={styles.archDiagram}>
        <div className={styles.archTitle}>The Virtuous Cycle</div>
        <div className={styles.archGrid}>
          <div className={styles.archItem}>
            <span className={styles.archItemLabel}>Spine</span>
            <span className={styles.archItemValue}>FOE</span>
          </div>
          <div className={styles.archItem}>
            <span className={styles.archItemLabel}>Skeleton</span>
            <span className={styles.archItemValue}>Katalyst</span>
          </div>
          <div className={styles.archItem}>
            <span className={styles.archItemLabel}>Nervous System</span>
            <span className={styles.archItemValue}>Prima</span>
          </div>
          <div className={styles.archItem}>
            <span className={styles.archItemLabel}>Memory</span>
            <span className={styles.archItemValue}>Field Guide</span>
          </div>
          <div className={styles.archItem}>
            <span className={styles.archItemLabel}>Evidence</span>
            <span className={styles.archItemValue}>Observations</span>
          </div>
        </div>
      </div>
    </AccordionSection>
  );
}

// ============================================
// SECTION 5: ADOPTION PATHS
// ============================================

function Section5(): ReactNode {
  return (
    <AccordionSection
      id="adoption-paths"
      number={5}
      title="Adoption Paths"
      owner="shared"
      executiveSummary={
        <p>
          You don't need all three systems. You don't need them all at once.
          FOE, Katalyst (and any of its modules), and Prima can each be adopted independently.
          But each additional layer multiplies the value of what's below it.
          The order matters: alignment before enablement before acceleration.
        </p>
      }
    >
      <h3>The Adoption Matrix</h3>
      <p>
        Every combination delivers value. The question is how much, and whether you're
        ready for the next layer.
      </p>

      <table className={styles.adoptionMatrix}>
        <thead>
          <tr>
            <th>You Adopt</th>
            <th>What You Get</th>
            <th>FOE Alignment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>FOE only</strong></td>
            <td>Delivery doctrine, maturity model, measurement framework. Improves decision-making and risk visibility regardless of tooling.</td>
            <td><span className={`${styles.adoptionBadge} ${styles.badgeFull}`}>Full</span></td>
          </tr>
          <tr>
            <td><strong>FOE + Katalyst Taxonomy</strong></td>
            <td>Architecture-as-code on top of doctrine. Systems become discoverable and documented. New engineers onboard in days, not months.</td>
            <td><span className={`${styles.adoptionBadge} ${styles.badgePartial}`}>Understanding</span></td>
          </tr>
          <tr>
            <td><strong>FOE + Katalyst BDD Test</strong></td>
            <td>Executable specifications as verification layer. Requirements trace from contract to test to evidence. Audit-ready by default.</td>
            <td><span className={`${styles.adoptionBadge} ${styles.badgePartial}`}>Fast Feedback</span></td>
          </tr>
          <tr>
            <td><strong>FOE + Katalyst Platform</strong></td>
            <td>Cloud-native infrastructure with GitOps, observability, auto-rollback. Deployments go from monthly and risky to daily and safe.</td>
            <td><span className={`${styles.adoptionBadge} ${styles.badgePartial}`}>Confidence</span></td>
          </tr>
          <tr className={styles.adoptionHighlight}>
            <td><strong>FOE + Full Katalyst</strong></td>
            <td>Complete AI-compatible delivery framework. All three FOE principles are enabled. All seven agent hooks exist. Your program is AI-ready even before activating agents.</td>
            <td><span className={`${styles.adoptionBadge} ${styles.badgeFull}`}>Full</span></td>
          </tr>
          <tr className={styles.adoptionFull}>
            <td><strong>FOE + Katalyst + Prima</strong></td>
            <td>Full ecosystem: alignment + enablement + AI acceleration. Agents operate safely on proven infrastructure, governed by doctrine, generating evidence that compounds.</td>
            <td><span className={`${styles.adoptionBadge} ${styles.badgeMaximum}`}>Maximum</span></td>
          </tr>
          <tr>
            <td><strong>Katalyst modules only</strong></td>
            <td>Platform benefits without the doctrine. Still valuable -- better infrastructure, better testing, better architecture documentation. But missing the "why" that prevents tool worship.</td>
            <td><span className={`${styles.adoptionBadge} ${styles.badgePartial}`}>Partial</span></td>
          </tr>
          <tr>
            <td><strong>Prima without Katalyst</strong></td>
            <td>AI capabilities without the guardrails. Agents can't discover, can't verify, can't roll back safely. Fast but dangerous.</td>
            <td><span className={`${styles.adoptionBadge} ${styles.badgeMinimal}`}>Minimal</span></td>
          </tr>
        </tbody>
      </table>

      <div className={styles.warningBox}>
        <p>
          The most common mistake is jumping to acceleration (AI agents) without establishing
          enablement (infrastructure) first. Phase 4 without Phase 3 is just faster chaos.
          The order matters: alignment, then enablement, then acceleration.
        </p>
      </div>

      <h3>Start Where You Are</h3>
      <p>
        Adoption isn't all-or-nothing. Start with the layer that addresses your most pressing pain:
      </p>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>"We don't know what good looks like"</div>
          <p className={styles.cardDescription}>
            Start with <strong>FOE</strong>. Run the maturity self-assessment.
            Identify your transformation phase. Build shared language for engineering quality.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>"Nobody understands our architecture"</div>
          <p className={styles.cardDescription}>
            Start with <strong>Katalyst Taxonomy</strong>. Model your system hierarchy.
            Make architecture discoverable. Cut onboarding time from months to weeks.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>"We can't prove our software works"</div>
          <p className={styles.cardDescription}>
            Start with <strong>Katalyst BDD Test</strong>. Write Gherkin scenarios for critical paths.
            Build the requirements-to-evidence chain auditors demand.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>"Deployments are risky and slow"</div>
          <p className={styles.cardDescription}>
            Start with <strong>Katalyst Platform</strong>. GitOps deployment, auto-rollback,
            full observability. Go from monthly releases to daily.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>"We want to use AI safely"</div>
          <p className={styles.cardDescription}>
            Start with <strong>FOE + Full Katalyst</strong> to build the AI-compatible foundation,
            then activate <strong>Prima</strong> agents on infrastructure that already has
            every guardrail in place.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>"We want everything"</div>
          <p className={styles.cardDescription}>
            Adopt all three in order: FOE first (establish alignment), Katalyst next
            (build enablement), Prima last (activate acceleration). Prove value at each layer.
          </p>
        </div>
      </div>
    </AccordionSection>
  );
}

// ============================================
// SECTION 6: WHAT THIS MEANS FOR YOUR PROGRAM
// ============================================

function Section6(): ReactNode {
  return (
    <AccordionSection
      id="your-program"
      number={6}
      title="What This Means for You"
      owner="shared"
      executiveSummary={
        <p>
          The ecosystem delivers different value to different stakeholders.
          Executives get investment protection and competitive differentiation.
          Delivery managers get predictability and compliance by default.
          Engineers get productive tooling and agent-assisted development.
          Government customers get auditability and honest risk visibility.
        </p>
      }
    >
      <div className={styles.stakeholderGrid}>
        <div className={styles.stakeholderCard}>
          <div className={`${styles.stakeholderCardIcon} ${styles.iconExecutive}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h4 className={styles.stakeholderCardTitle}>For Executives</h4>
          <ul className={styles.stakeholderCardList}>
            <li><strong>Investment protection:</strong> FOE doctrine survives tool changes. Katalyst survives vendor changes. Prima survives AI model changes. No single dependency can strand your investment.</li>
            <li><strong>Competitive differentiation:</strong> Concrete platform evidence in proposals -- architecture-as-code, automated BDD reports, live observability dashboards. Discriminators that competitors can't match with slide decks.</li>
            <li><strong>CPARS protection:</strong> Evidence chains from contract requirements through executable tests to deployment verification. When auditors ask "show me evidence," the answer is a query, not a document hunt.</li>
            <li><strong>AI governance:</strong> A framework for adopting AI coding agents responsibly. Not "we bought Copilot licenses." Instead: "Our agents operate on governed infrastructure with automated verification."</li>
          </ul>
        </div>

        <div className={styles.stakeholderCard}>
          <div className={`${styles.stakeholderCardIcon} ${styles.iconDelivery}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h4 className={styles.stakeholderCardTitle}>For Delivery Managers</h4>
          <ul className={styles.stakeholderCardList}>
            <li><strong>Predictable velocity:</strong> Katalyst BDD tests catch regressions before deployment. ArgoCD auto-rollback contains failures. Deployments shift from "risky event" to "routine operation."</li>
            <li><strong>Onboarding speed:</strong> Taxonomy makes architecture discoverable. New engineers run <code>kata tree</code> on day one and contribute meaningfully within weeks, not months.</li>
            <li><strong>Compliance by default:</strong> BDD scenarios generate audit-ready evidence automatically. Requirements traceability is built into the testing framework, not assembled manually before reviews.</li>
            <li><strong>AI readiness:</strong> Full Katalyst adoption means your program is AI-compatible today. When leadership says "use AI," you already have the guardrails in place.</li>
          </ul>
        </div>

        <div className={styles.stakeholderCard}>
          <div className={`${styles.stakeholderCardIcon} ${styles.iconEngineer}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h4 className={styles.stakeholderCardTitle}>For Engineers</h4>
          <ul className={styles.stakeholderCardList}>
            <li><strong>Productive on day one:</strong> <code>kata tree</code> to understand the system. BDD tests to verify your changes. GitOps to deploy safely. No three-month ramp-up period.</li>
            <li><strong>Agent-assisted development:</strong> Prima agents use the same interfaces you do -- same taxonomy, same tests, same deployment pipeline. They amplify your work; they don't replace your judgment.</li>
            <li><strong>Refactoring confidence:</strong> 6-7x higher refactoring rates in BDD-enabled repos. Executable specifications give you the confidence to improve code, not just ship it.</li>
            <li><strong>Learning compounds:</strong> The Field Guide captures what the team learns. Knowledge stays when people leave. Your work contributes to institutional memory.</li>
          </ul>
        </div>

        <div className={styles.stakeholderCard}>
          <div className={`${styles.stakeholderCardIcon} ${styles.iconGovernment}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
            </svg>
          </div>
          <h4 className={styles.stakeholderCardTitle}>For Government Customers</h4>
          <ul className={styles.stakeholderCardList}>
            <li><strong>Auditability:</strong> Every change has who, what, why, and when. Git history provides the complete audit trail. ArgoCD provides deployment records. BDD reports provide verification evidence.</li>
            <li><strong>Honest risk visibility:</strong> The FOE Maturity Model shows where the program is -- honestly. No inflated self-assessments. The model is diagnostic, not aspirational.</li>
            <li><strong>AI governance:</strong> When contractors use AI agents, you can verify that those agents operate within governed infrastructure. Automated policy enforcement, not trust-based assertions.</li>
            <li><strong>Receipts, not promises:</strong> Every claim comes with evidence. Progress is demonstrable, not asserted. BDD scenarios are executable proof that the system does what the contract requires.</li>
          </ul>
        </div>
      </div>

      <h3>Getting Started</h3>
      <div className={styles.stepsGrid}>
        <div className={styles.stepCard}>
          <span className={`${styles.stepNumber} ${styles.stepNumberFoe}`}>1</span>
          <h4 className={styles.stepTitle}>Start with FOE</h4>
          <p className={styles.stepBody}>
            Read the principles. Run the self-assessment. Identify your maturity level
            and transformation phase. Build the shared language.
          </p>
          <Link to="/docs/intro/what-is-foe" className={styles.stepLink}>
            Read the Docs
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className={styles.stepCard}>
          <span className={`${styles.stepNumber} ${styles.stepNumberKatalyst}`}>2</span>
          <h4 className={styles.stepTitle}>Add Katalyst</h4>
          <p className={styles.stepBody}>
            Install Taxonomy. Set up BDD Test. Deploy to Platform.
            Build the AI-compatible delivery framework, one component at a time.
          </p>
          <Link to="/docs/katalyst/getting-started" className={styles.stepLink}>
            Getting Started
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className={styles.stepCard}>
          <span className={`${styles.stepNumber} ${styles.stepNumberPrima}`}>3</span>
          <h4 className={styles.stepTitle}>Activate Prima</h4>
          <p className={styles.stepBody}>
            Layer AI agents on top of Katalyst infrastructure.
            Governed by FOE practices. Consuming every hook Katalyst provides.
          </p>
          <Link to="/esimplicity-strategy" className={styles.stepLink}>
            Learn More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </AccordionSection>
  );
}

// ============================================
// CTA SECTION
// ============================================

function CTASection(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to adopt?</h2>
        <p className={styles.ctaDescription}>
          Start with the layer that addresses your most pressing need,
          or explore the full ecosystem.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/docs/intro/what-is-foe" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
            Explore FOE
          </Link>
          <Link to="/docs/katalyst/overview" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            Katalyst Ecosystem
          </Link>
          <Link to="/esimplicity-strategy" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            Full Strategy
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function EcosystemAdoption(): ReactNode {
  return (
    <Layout
      title="Ecosystem Adoption"
      description="FOE + Katalyst + Prima: Three layers, any combination, each amplifies the others."
    >
      <main className={styles.page}>
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
            </div>
          </div>
        </div>
        <CTASection />
      </main>
    </Layout>
  );
}
