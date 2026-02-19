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
  { id: 'ai-compatible', number: 3, title: 'What Agentic Coding Requires', owner: 'shared' as const },
  { id: 'prima-agents', number: 4, title: 'Agentic Operation on Governed Infrastructure', owner: 'prima' as const },
  { id: 'adoption-paths', number: 5, title: 'Adoption Decision Framework', owner: 'shared' as const },
  { id: 'your-program', number: 6, title: 'Implications by Role', owner: 'shared' as const },
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
        <div className={styles.heroLogos}>
          <div className={styles.heroLogoItem}>
            <img
              src="/flow-optimized-engineering/img/foe-white-square-trans.png"
              alt="FOE Logo"
              className={styles.heroLogoImg}
            />
            <span className={styles.heroLogoLabel}>FOE</span>
          </div>
          <div className={styles.heroLogoDivider} />
          <div className={styles.heroLogoItem}>
            <img
              src="/flow-optimized-engineering/img/katalyst-logo.png"
              alt="Katalyst Logo"
              className={styles.heroLogoImg}
            />
            <span className={styles.heroLogoLabel}>Katalyst</span>
          </div>
          <div className={styles.heroLogoDivider} />
          <div className={styles.heroLogoItem}>
            <img
              src="/flow-optimized-engineering/img/prima-icon.png"
              alt="Prima Logo"
              className={styles.heroLogoImg}
            />
            <span className={styles.heroLogoLabel}>Prima</span>
          </div>
        </div>
        <span className={styles.heroBadge}>Executive Briefing</span>
        <h1 className={styles.heroTitle}>
          FOE + Katalyst + Prima
        </h1>
        <p className={styles.heroSubtitle}>
          How alignment, enablement, and acceleration relate in a delivery program
        </p>
        <div className={styles.heroMeta}>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            For Executives &amp; Delivery Leadership
          </span>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            February 2026
          </span>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            6 Sections
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
        <p>
          Delivery programs adopt tools in isolation -- a platform here, a testing framework there,
          an AI copilot on top -- and expect transformation. Each investment has merit individually.
          But without a governing framework connecting them, each underperforms, and the gaps
          between them become the actual source of delivery risk.
        </p>
      }
    >
      <h3>The Isolated Adoption Pattern</h3>
      <p>
        This pattern repeats across programs. A tool is adopted to solve a specific pain.
        It solves that pain partially but creates new coordination problems, because it was
        never connected to the tools around it or the practices underneath it.
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
        In government contracting, the stakes are higher. Auditors don't accept tool
        descriptions as evidence of delivery capability. They want evidence chains: from contract
        requirements, through implementation, to verified outcomes. Isolated tools produce
        fragments that someone has to manually assemble under audit pressure.
      </p>

      <h3>What's Actually Missing</h3>
      <p>Three capabilities, each at a different level:</p>
      <ol>
        <li><strong>Alignment</strong> -- A shared understanding of what "good" looks like and how to measure it. Without this, teams optimize locally while the program drifts.</li>
        <li><strong>Enablement</strong> -- Infrastructure that makes aligned practices executable and, critically, AI-compatible. Without this, practices remain aspirational.</li>
        <li><strong>Acceleration</strong> -- AI capabilities that operate safely on top of that infrastructure. Without the first two layers, acceleration amplifies existing problems.</li>
      </ol>
      <p>
        These three layers correspond to three systems -- FOE, Katalyst, and Prima -- and the
        structural relationship between them matters more than any individual system's features.
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
          Delivery programs need three capabilities that are often confused or conflated:
          a shared framework for engineering judgment (alignment), infrastructure that makes
          good practices executable (enablement), and AI capabilities that can operate safely
          on that infrastructure (acceleration). These correspond to FOE, Katalyst, and Prima.
          The structural logic matters: acceleration without enablement is unsafe, and
          enablement without alignment is directionless.
        </p>
      }
    >
      {/* Stack diagram with Mission Outcomes */}
      <div className={styles.stackWithOutcomes}>
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
            builds on
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

        {/* Connector lines SVG */}
        <svg className={styles.stackConnectorSvg} viewBox="0 0 120 400" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradPrima" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6B5CB8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
            <linearGradient id="lineGradKatalyst" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3DB8E5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
            <linearGradient id="lineGradFoe" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7DDBD0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
          </defs>
          {/* Prima -> outcomes */}
          <path d="M0,60 C40,60 80,130 120,160" stroke="url(#lineGradPrima)" strokeWidth="2" />
          <path d="M0,80 C50,80 70,150 120,180" stroke="url(#lineGradPrima)" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Katalyst -> outcomes */}
          <path d="M0,190 C40,190 80,195 120,200" stroke="url(#lineGradKatalyst)" strokeWidth="2" />
          <path d="M0,210 C50,210 70,205 120,210" stroke="url(#lineGradKatalyst)" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* FOE -> outcomes */}
          <path d="M0,320 C40,320 80,270 120,240" stroke="url(#lineGradFoe)" strokeWidth="2" />
          <path d="M0,340 C50,340 70,260 120,230" stroke="url(#lineGradFoe)" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>

        {/* Mission Outcomes box */}
        <div className={styles.outcomesBox}>
          <span className={styles.outcomesLabel}>Converge on</span>
          <span className={styles.outcomesTitle}>Mission Outcomes</span>
          <ul className={styles.outcomesList}>
            <li>Auditable delivery</li>
            <li>Governed AI adoption</li>
            <li>Compounding team capability</li>
            <li>Contract-aligned evidence</li>
          </ul>
        </div>
      </div>

      {/* Layer descriptions */}
      <div className={`${styles.layerCard} ${styles.layerCardFoe}`}>
        <span className={`${styles.layerCardLabel} ${styles.labelFoe}`}>Alignment Layer</span>
        <h4 className={styles.layerCardTitle}>FOE: Flow Optimized Engineering</h4>
        <div className={styles.layerCardBody}>
          <p>
            FOE is the governing doctrine. It defines three optimizations that hold
            whether work is performed by humans, AI agents, or both:
          </p>
          <ul>
            <li><strong>Optimize for Understanding</strong> -- Can the team form accurate mental models of the system?</li>
            <li><strong>Optimize for Fast Feedback</strong> -- How quickly does the team discover whether a decision was right?</li>
            <li><strong>Optimize for Confidence</strong> -- Is the team willing to act because risk is bounded, visible, and reversible?</li>
          </ul>
          <p>
            FOE also provides a <strong>Maturity Model</strong> for honest self-assessment,
            a <strong>Field Guide</strong> that functions as institutional memory (evidence-backed
            methods, not opinions), and role-specific guidance for executives, engineers, and
            government customers.
          </p>
        </div>
      </div>

      <div className={`${styles.layerCard} ${styles.layerCardKatalyst}`}>
        <span className={`${styles.layerCardLabel} ${styles.labelKatalyst}`}>Enablement Layer</span>
        <h4 className={styles.layerCardTitle}>Katalyst: The Delivery Framework</h4>
        <div className={styles.layerCardBody}>
          <p>
            Three interconnected components that make FOE principles executable:
          </p>
          <ul>
            <li>
              <strong>Katalyst Taxonomy</strong> (Understanding) -- Architecture-as-code.
              The system hierarchy is defined in YAML and navigable
              with <code>kata tree</code> and <code>kata tui</code>.
              Humans and agents discover architecture through the same queryable interface.
            </li>
            <li>
              <strong>Katalyst BDD Test</strong> (Fast Feedback) -- Multi-layer BDD testing with
              ports and adapters. Gherkin scenarios serve as both executable tests and living
              documentation. This is the verification layer.
            </li>
            <li>
              <strong>Katalyst Platform</strong> (Confidence) -- Cloud-native infrastructure with
              ArgoCD GitOps, full observability (Grafana/Prometheus/Loki/Tempo), service mesh,
              and secrets management. Every change goes through Git. Failed deployments
              trigger automatic rollback.
            </li>
          </ul>
          <p>
            When all three Katalyst components are in place, the delivery framework has
            every precondition for safe AI operation: queryable state, safe change paths,
            automated verification, and feedback signals. This is what makes a
            framework AI-compatible -- the infrastructure, not the AI itself.
          </p>
        </div>
      </div>

      <div className={`${styles.layerCard} ${styles.layerCardPrima}`}>
        <span className={`${styles.layerCardLabel} ${styles.labelPrima}`}>Acceleration Layer</span>
        <h4 className={styles.layerCardTitle}>Prima: The AI Engine</h4>
        <div className={styles.layerCardBody}>
          <p>
            Prima is the AI-powered product platform that government delivery teams
            interact with. It runs on Katalyst infrastructure, governed by FOE principles.
          </p>
          <ul>
            <li><strong>Control Tower</strong> -- Operational visibility: configuration, policies, RBAC, audit trails</li>
            <li><strong>Engine</strong> -- AI/ML execution: agent orchestration, MCP protocol, model integration</li>
            <li><strong>Web</strong> -- User-facing application for government teams</li>
            <li><strong>Platform</strong> -- Infrastructure automation via Terraform and Helm</li>
          </ul>
          <p>
            Prima agents consume Katalyst infrastructure through the same interfaces
            human developers and CI/CD pipelines use. They query the taxonomy, commit
            through Git, run BDD tests, and check Prometheus. No special agent
            infrastructure is required because the delivery framework is already
            agent-compatible.
          </p>
        </div>
      </div>
    </AccordionSection>
  );
}

// ============================================
// SECTION 3: WHAT AGENTIC CODING REQUIRES
// ============================================

function Section3(): ReactNode {
  return (
    <AccordionSection
      id="ai-compatible"
      number={3}
      title="What Agentic Coding Requires"
      owner="shared"
      executiveSummary={
        <p>
          AI coding agents place specific demands on infrastructure that human developers
          do not. Humans compensate for gaps with intuition, experience, and asking colleagues.
          Agents cannot. This section maps the infrastructure requirements of agentic coding
          to Katalyst capabilities.
        </p>
      }
    >
      <h3>Why Infrastructure Requirements Change</h3>
      <p>
        When an AI agent is asked to deploy a service, it needs to:
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
        problems at machine speed. Infrastructure that was adequate for human developers
        becomes insufficient for agents.
      </p>

      <h3>Infrastructure Requirements and How Katalyst Addresses Them</h3>

      <table className={styles.hooksTable}>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>How Katalyst Addresses This</th>
            <th>What It Provides</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className={styles.hookName}>Discovery</span></td>
            <td>
              Taxonomy API <span className={styles.hookCode}>kata tree --json</span>
            </td>
            <td>Every system, subsystem, stack, and layer is discoverable programmatically. Agents query architecture structure rather than inferring it from file paths.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Standardization</span></td>
            <td>
              Layer type schemas via <span className={styles.hookCode}>kata create</span>
            </td>
            <td>Defined patterns enforce consistent structure, CI/CD configuration, and observability integration. Agents follow scaffolding rather than generating ad hoc structure.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Safe Execution</span></td>
            <td>
              GitOps / ArgoCD
            </td>
            <td>All changes go through Git -- reviewable, attributable, revertible. No direct cluster manipulation. This is the chokepoint that makes agent changes auditable.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Verification</span></td>
            <td>
              BDD Test via <span className={styles.hookCode}>npx playwright test</span>
            </td>
            <td>Gherkin scenarios provide machine-executable verification that is also human-readable. Requirements traceability is structural, not aspirational.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Monitoring</span></td>
            <td>
              Observability stack (Prometheus, Loki, Tempo)
            </td>
            <td>Agents query metrics, logs, and traces to confirm changes worked. Objective success signals replace assumptions.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Recovery</span></td>
            <td>
              ArgoCD self-heal and auto-rollback
            </td>
            <td>Failed deployments revert automatically. The blast radius of an agent mistake is contained in seconds rather than discovered hours later.</td>
          </tr>
          <tr>
            <td><span className={styles.hookName}>Compliance</span></td>
            <td>
              Policy as Code (OPA/Gatekeeper)
            </td>
            <td>Governance happens at machine speed. Policy validation occurs before changes merge, regardless of whether the author is human or agent.</td>
          </tr>
        </tbody>
      </table>

      <h3>Risk Scenarios in Agentic Delivery</h3>
      <p>
        Without governed infrastructure, common agent failure modes become delivery risks:
      </p>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Without Governed Infrastructure</th>
            <th>With Governed Infrastructure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agent deploys bad configuration</td>
            <td>Manual discovery hours later, manual fix</td>
            <td>Automatic rollback in seconds</td>
          </tr>
          <tr>
            <td>Agent cannot find an existing service</td>
            <td>Infers incorrectly, creates duplicates</td>
            <td>Queries taxonomy, locates existing service</td>
          </tr>
          <tr>
            <td>Agent needs to verify a change</td>
            <td>Assumes success, moves on</td>
            <td>Runs BDD tests, checks health metrics</td>
          </tr>
          <tr>
            <td>Agent produces non-standard code</td>
            <td>Merged as technical debt</td>
            <td>Blocked by schema validation before merge</td>
          </tr>
          <tr>
            <td>Agent causes a production incident</td>
            <td>Human escalation at unpredictable hours</td>
            <td>Self-healing reconciliation plus structured alerting</td>
          </tr>
        </tbody>
      </table>
    </AccordionSection>
  );
}

// ============================================
// SECTION 4: AGENTIC OPERATION
// ============================================

function Section4(): ReactNode {
  return (
    <AccordionSection
      id="prima-agents"
      number={4}
      title="Agentic Operation on Governed Infrastructure"
      owner="prima"
      executiveSummary={
        <p>
          When AI agents operate on Katalyst infrastructure, they follow the same interfaces
          human developers use: the same taxonomy, the same tests, the same deployment pipeline.
          This section describes how the agent cognitive loop maps to Katalyst's
          infrastructure and what the evidence shows about the approach.
        </p>
      }
    >
      <h3>The Agent Cognitive Loop</h3>
      <p>
        AI agents need the same cognitive cycle humans do: <strong>Understand, Act, Confirm, Learn</strong>.
        The difference is that agents cannot compensate for missing infrastructure with intuition.
        Each step requires a programmatic, reliable answer.
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

      <h3>Uniform Interfaces: Agents and Humans Use the Same Paths</h3>
      <p>
        A key architectural principle: Prima agents do not require special infrastructure.
        They use the same interfaces human developers and CI/CD pipelines use. This means
        governance, auditability, and rollback work identically regardless of who authored
        the change.
      </p>

      <table>
        <thead>
          <tr>
            <th>Agent Action</th>
            <th>Katalyst Interface</th>
            <th>Why This Matters for Governance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discover existing services</td>
            <td><code>kata tree --json</code> + <code>kubectl get</code></td>
            <td>Agent decisions are based on the same source of truth humans see, reducing divergence</td>
          </tr>
          <tr>
            <td>Scaffold a new service</td>
            <td><code>kata create --layer-type app-docker</code></td>
            <td>All new services follow the same patterns regardless of author, maintaining consistency</td>
          </tr>
          <tr>
            <td>Deploy a change</td>
            <td><code>git commit</code> + ArgoCD reconciliation</td>
            <td>Every agent change has a Git author, a diff, and a revert path -- auditable by default</td>
          </tr>
          <tr>
            <td>Verify correctness</td>
            <td>Gherkin scenarios via <code>npx playwright test</code></td>
            <td>The same tests that validate human work validate agent work; no separate quality bar</td>
          </tr>
          <tr>
            <td>Check system health</td>
            <td>Prometheus API + Grafana dashboards</td>
            <td>Agent confidence is based on the same metrics leadership reviews, creating shared visibility</td>
          </tr>
          <tr>
            <td>Investigate an incident</td>
            <td>Loki log queries + Tempo traces</td>
            <td>Agent-caused issues are diagnosable through the same observability stack as any other issue</td>
          </tr>
          <tr>
            <td>Roll back a failure</td>
            <td><code>git revert</code> + ArgoCD auto-heal</td>
            <td>Recovery path is identical whether the failed change was human-authored or agent-authored</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.evidenceBox}>
        <p>
          <strong>Internal evidence (Observation O100):</strong> Prima's BDD testing
          across Control Tower and Engine services grew to 56 feature files over 7 months.
          Repositories with BDD tests showed <strong>6-7x higher refactoring rates</strong> (10.8%
          vs 1.6%), providing quantitative evidence that executable specifications enable
          confident code restructuring -- by humans and agents operating on the same
          verification layer.
        </p>
      </div>

      <h3>Connected Dynamics</h3>
      <p>
        When these systems are connected, three dynamics emerge that do not exist when
        the systems operate independently:
      </p>
      <ol>
        <li>
          <strong>Institutional learning accumulates:</strong> FOE Field Guides capture what the team
          learns from both human and agent-generated changes. Patterns that succeed become documented
          methods. Patterns that fail become documented anti-patterns. The organization's knowledge
          base grows structurally, not just through individual memory.
        </li>
        <li>
          <strong>Human verification becomes agent governance:</strong> BDD scenarios written to give
          human developers confidence about API behavior become the same gate that constrains what
          agents can ship. A single verification investment serves both purposes.
        </li>
        <li>
          <strong>Measurement flows back into doctrine:</strong> Agent activity generates measurable
          signals -- deployment frequency, change failure rate, test coverage. These flow back into
          the FOE system as data, enabling evidence-based decisions about practices rather than
          opinion-based ones.
        </li>
      </ol>

      <div className={styles.archDiagram}>
        <div className={styles.archTitle}>System Architecture</div>
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
// SECTION 5: ADOPTION DECISION FRAMEWORK
// ============================================

function Section5(): ReactNode {
  return (
    <AccordionSection
      id="adoption-paths"
      number={5}
      title="Adoption Decision Framework"
      owner="shared"
      executiveSummary={
        <p>
          These systems can be adopted independently or together. The right path depends on
          a program's current maturity, most pressing delivery risks, and timeline.
          This section provides a decision framework for sequencing adoption.
        </p>
      }
    >
      <h3>Adoption Combinations and Their Implications</h3>
      <p>
        The table below maps each adoption combination to its structural effect on
        the delivery program. The order reflects a recommended sequence: alignment
        before enablement, enablement before acceleration.
      </p>

      <table className={styles.adoptionMatrix}>
        <thead>
          <tr>
            <th>Configuration</th>
            <th>What Changes Structurally</th>
            <th>Principle Coverage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>FOE only</strong></td>
            <td>The program gains a shared framework for engineering judgment: maturity model, measurement framework, and decision vocabulary. Improves alignment regardless of tooling.</td>
            <td>All three principles (conceptually)</td>
          </tr>
          <tr>
            <td><strong>FOE + Katalyst Taxonomy</strong></td>
            <td>Architecture becomes discoverable and version-controlled. New engineers form accurate mental models in days rather than months. Architecture drift becomes visible.</td>
            <td>Understanding</td>
          </tr>
          <tr>
            <td><strong>FOE + Katalyst BDD Test</strong></td>
            <td>Requirements trace from contract to executable test to evidence. Audit preparation shifts from document assembly to query execution.</td>
            <td>Fast Feedback</td>
          </tr>
          <tr>
            <td><strong>FOE + Katalyst Platform</strong></td>
            <td>Deployment moves from gated event to routine operation. Failed changes revert automatically. System health is continuously observable.</td>
            <td>Confidence</td>
          </tr>
          <tr>
            <td><strong>FOE + Full Katalyst</strong></td>
            <td>All three FOE principles are concretely enabled. The delivery framework is AI-compatible -- all seven infrastructure requirements for safe agent operation are addressed -- whether or not agents are in use.</td>
            <td>All three principles (concretely)</td>
          </tr>
          <tr>
            <td><strong>FOE + Katalyst + Prima</strong></td>
            <td>AI agents operate on governed infrastructure. Human verification and agent verification use the same gates. Organizational learning compounds from both human and agent activity.</td>
            <td>All three principles + acceleration</td>
          </tr>
          <tr>
            <td><strong>Katalyst modules only</strong></td>
            <td>Infrastructure improves without a governing doctrine. Useful, but teams lack shared criteria for what to optimize and why. Risk of local optimization without program-level coherence.</td>
            <td>Partial</td>
          </tr>
          <tr>
            <td><strong>Prima without Katalyst</strong></td>
            <td>AI agents operate without queryable state, safe change paths, or automated verification. Agent output cannot be reliably governed. Not recommended.</td>
            <td>Minimal</td>
          </tr>
        </tbody>
      </table>

      <h3>Sequencing by Primary Risk</h3>
      <p>
        The right starting point depends on the program's most pressing delivery risk.
        Each row below identifies a risk, the highest-leverage first investment, and the
        reasoning behind the recommendation.
      </p>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Risk: No shared quality standard</div>
          <p className={styles.cardDescription}>
            Prioritize <strong>FOE</strong>. Without shared criteria for "good," teams optimize
            for local metrics (velocity, coverage) that may not serve the program. The maturity
            model provides a diagnostic starting point.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Risk: Architecture is opaque</div>
          <p className={styles.cardDescription}>
            Prioritize <strong>Katalyst Taxonomy</strong>. When new engineers cannot form accurate
            mental models of the system, onboarding is slow, changes are risky, and key-person
            dependency increases.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Risk: Cannot demonstrate compliance</div>
          <p className={styles.cardDescription}>
            Prioritize <strong>Katalyst BDD Test</strong>. When requirements traceability depends
            on manual assembly, audits are expensive and evidence chains are fragile.
            Executable specifications make compliance structural.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Risk: Deployments are high-risk events</div>
          <p className={styles.cardDescription}>
            Prioritize <strong>Katalyst Platform</strong>. When deployment requires manual
            coordination and failure recovery is ad hoc, deployment frequency stays low
            and change failure rate stays high.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Risk: AI adoption without governance</div>
          <p className={styles.cardDescription}>
            Prioritize <strong>FOE + full Katalyst</strong> before activating agents. The
            AI-compatible delivery framework must exist before agents operate on it.
            Phase 4 without Phase 3 accelerates existing problems.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Risk: Multiple compounding risks</div>
          <p className={styles.cardDescription}>
            Adopt in order: FOE first (establish alignment), Katalyst next (build enablement),
            Prima last (activate acceleration). Each layer addresses a different class of risk
            and provides the foundation the next layer depends on.
          </p>
        </div>
      </div>
    </AccordionSection>
  );
}

// ============================================
// SECTION 6: IMPLICATIONS BY ROLE
// ============================================

function Section6(): ReactNode {
  return (
    <AccordionSection
      id="your-program"
      number={6}
      title="Implications by Role"
      owner="shared"
      executiveSummary={
        <p>
          Different roles experience these systems differently. This section describes
          what concretely changes for each role when the ecosystem is in place -- not
          aspirational benefits, but structural consequences of the architecture.
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
            <li><strong>Tool-independence:</strong> The engineering framework is not coupled to any vendor or AI model. A change in AI tooling does not require retraining, migration, or abandoning accumulated knowledge. The doctrine and infrastructure persist across tool generations.</li>
            <li><strong>Evidence-based delivery:</strong> Claims about delivery performance are backed by automated evidence chains from requirements through tests to deployment verification. When auditors ask for evidence, the answer is a query, not a document assembly exercise.</li>
            <li><strong>Audit readiness:</strong> Every change carries who, what, why, and when. Git history provides the audit trail. ArgoCD provides deployment records. BDD reports provide verification evidence. This is structural, not procedural -- it happens by default.</li>
            <li><strong>Responsible AI adoption:</strong> Agents operate on the same governed infrastructure as human developers. The same policy gates, the same verification tests, the same rollback mechanisms. This is a demonstrable governance posture, not an assertion.</li>
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
            <li><strong>Deployment risk changes character:</strong> BDD tests catch regressions before deployment. ArgoCD auto-rollback contains failures that escape. Deployments shift from coordinated events requiring change boards to routine operations.</li>
            <li><strong>Onboarding time compresses:</strong> Taxonomy makes architecture discoverable from day one. New engineers run <code>kata tree</code> and form accurate mental models of the system in days. The three-month ramp-up period for complex systems compresses significantly.</li>
            <li><strong>Compliance becomes structural:</strong> BDD scenarios generate audit-ready evidence automatically. Requirements traceability is built into the testing framework. Evidence is not assembled manually before reviews; it exists as a byproduct of normal engineering work.</li>
            <li><strong>AI readiness is a side effect:</strong> Full Katalyst adoption means the program's infrastructure is AI-compatible today. When the organization decides to use AI agents, the governed infrastructure already exists. There is no scramble to add guardrails after the fact.</li>
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
            <li><strong>Discovery replaces guesswork:</strong> <code>kata tree</code> shows the system architecture. BDD tests document expected behavior. GitOps shows what's deployed. The information needed to work confidently on unfamiliar code is queryable, not tribal.</li>
            <li><strong>Agents use the same tools:</strong> Prima agents operate through the same taxonomy, tests, and deployment pipeline. The interfaces are uniform. Agent-assisted work fits into existing workflows rather than requiring separate processes.</li>
            <li><strong>Refactoring becomes less risky:</strong> Internal evidence shows 6-7x higher refactoring rates in BDD-enabled repos (10.8% vs 1.6%). Executable specifications provide the safety net that makes improvement work tractable rather than avoided.</li>
            <li><strong>Knowledge persists beyond individuals:</strong> The Field Guide captures what the team learns through documented observations and methods. When engineers leave, their insights remain as institutional memory rather than disappearing with them.</li>
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
            <li><strong>Auditability is automatic:</strong> Every change has who, what, why, and when. Git history provides the complete audit trail. ArgoCD provides deployment records. BDD reports provide verification evidence. This is not a compliance process; it is a byproduct of how the engineering works.</li>
            <li><strong>Program health is visible:</strong> The FOE Maturity Model provides an honest diagnostic of where the program is. It is designed to surface problems early, not to produce optimistic self-assessments. The model measures capability, not intent.</li>
            <li><strong>AI use is governed:</strong> When contractors use AI agents, those agents operate within the same governed infrastructure as human developers. Policy enforcement is automated. Verification is the same. The governance posture is demonstrable and inspectable.</li>
            <li><strong>Claims have evidence:</strong> BDD scenarios are executable proof that the system does what the contract requires. Deployment metrics show delivery performance over time. Progress is measured, not asserted.</li>
          </ul>
        </div>
      </div>

      <p>
        For deeper guidance specific to your role, see
        the <Link to="/docs/stakeholder-guides/for-executives">Executive Guide</Link>,
        the <Link to="/docs/stakeholder-guides/for-engineering-leaders">Engineering Leadership Guide</Link>,
        or the <Link to="/docs/stakeholder-guides/for-government-customers">Government Customer Guide</Link>.
        For implementation details, see the <Link to="/docs/katalyst/getting-started">Katalyst Getting Started</Link> guide.
      </p>
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
        <h2 className={styles.ctaTitle}>Further Reading</h2>
        <p className={styles.ctaDescription}>
          Explore the underlying principles, the implementation details,
          or the broader strategy.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/docs/principles/overview" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
            FOE Principles
          </Link>
          <Link to="/docs/katalyst/overview" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            Katalyst Documentation
          </Link>
          <Link to="/esimplicity-strategy" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            Implementation Strategy
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
      title="Ecosystem Briefing"
      description="How FOE, Katalyst, and Prima relate: alignment, enablement, and acceleration in a delivery program."
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
