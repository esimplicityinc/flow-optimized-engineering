import type { ReactNode } from 'react';
import { useEffect } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import AccordionSection from '../components/AccordionSection';
import StrategySidebar from '../components/StrategySidebar';
import EcosystemDiagram from '../components/EcosystemDiagram';
import styles from './esimplicity-strategy.module.css';

// ============================================
// SECTION DATA
// ============================================

const sections = [
  { id: 'the-stakes', number: 1, title: 'The Stakes', owner: 'shared' as const },
  { id: 'the-doctrine', number: 2, title: 'The Doctrine', owner: 'shared' as const },
  { id: 'the-ecosystem', number: 3, title: 'The Ecosystem', owner: 'shared' as const },
  { id: 'the-mechanisms', number: 4, title: 'The Mechanisms', owner: 'shared' as const },
  { id: 'the-destination', number: 5, title: 'The Destination', owner: 'shared' as const },
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
            5 Acts
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

function Act1(): ReactNode {
  return (
    <AccordionSection
      id="the-stakes"
      number={1}
      title="The Stakes"
      owner="shared"
      executiveSummary={
        <>
          <p>
            AI is changing the economics of software development. But without a governing framework,
            faster production just means faster failure. eSimplicity will implement Flow Optimized 
            Engineering as the doctrine that makes agentic coding safe.
          </p>
          <blockquote>
            <p>
              The fundamental challenge of software engineering has never been "writing code is too slow."
              It has always been "we build the wrong thing, or we build the right thing badly, and we
              don't know which until it's expensive."
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
          <strong>Cultural Backlash:</strong> Engineers feel surveilled, deskilled, or replaced, leading
          to quiet resistance, attrition, and loss of institutional knowledge.
        </li>
      </ul>

      <h3>The AI People Trilemma</h3>
      <p>Three trends are colliding to create a dangerous imbalance:</p>
      <ul>
        <li><strong>Senior developers are leaving:</strong> Their knowledge walks out the door with them</li>
        <li><strong>Junior developers can produce without understanding:</strong> AI lets them generate working code without comprehending implications</li>
        <li><strong>Organizations are unprepared:</strong> They see junior productivity and assume the pipeline is working</li>
      </ul>
      <p>
        AI doesn't just change the quantity of work; it changes the nature of valuable work.
        The bottleneck shifts to <em>judgment</em>. You cannot hire your way out of a judgment shortage
        by hiring more people who lack judgment.
      </p>

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

      <h3>The Mentor-Over-Hero Model</h3>
      <p>The solution isn't to avoid AI—it's to pair AI leverage with human judgment:</p>
      <table>
        <thead>
          <tr>
            <th>Hero Model (Failing)</th>
            <th>Mentor Model (FOE)</th>
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
      <div className={styles.highlightBox}>
        <p>
          <strong>The Small Craft Guild:</strong> 1 senior + 2 juniors, equipped with AI tooling and FOE practices.
          The senior provides judgment; the juniors provide capacity; the tooling provides leverage.
        </p>
      </div>
    </AccordionSection>
  );
}

function Act2(): ReactNode {
  return (
    <AccordionSection
      id="the-doctrine"
      number={2}
      title="The Doctrine"
      owner="shared"
      executiveSummary={
        <p>
          FOE is built on three foundational truths about engineering that hold regardless of whether
          the work is performed by humans, AI agents, or some combination. These truths become more
          critical, not less, as we introduce faster, more autonomous tooling.
        </p>
      }
    >
      <h3>Truth 1: Flow is the Unit of Progress</h3>
      <p>
        Not output. Not activity. Not utilization. <em>Flow</em>: the uninterrupted movement of
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
        every outcome can be attributed to its causes. This isn't bureaucracy; it's the
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

      <h3>FOE Makes Agentic Coding Safe</h3>
      <p>
        Flow Optimized Engineering provides the scaffolding that transforms agentic coding from a
        risk into an advantage:
      </p>
      <ul>
        <li>
          <strong>Safe:</strong> Every AI-generated change flows through the same validation gates
          as human-authored code. The system doesn't trust the source; it trusts the evidence.
        </li>
        <li>
          <strong>Legible:</strong> All work, human or machine, produces artifacts that can be
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

function Act3(): ReactNode {
  return (
    <AccordionSection
      id="the-ecosystem"
      number={3}
      title="The Ecosystem"
      owner="shared"
      executiveSummary={
        <p>
          Everything at eSimplicity connects through a deliberate architecture. KATALYST is the gravitational 
          center—the platform everything runs on. FOE is the governing ontology that everything aligns to. 
          PRIMA is the productized surface that government teams interact with.
        </p>
      }
    >
      <div className={styles.ecosystemDiagramWrapper}>
        <EcosystemDiagram />
      </div>

      <h3>KATALYST: The Gravitational Center</h3>
      <p>Everything ultimately runs on or connects to <strong>KATALYST</strong>. It provides:</p>
      <ul>
        <li>The infrastructure platform (Kubernetes, ArgoCD, observability)</li>
        <li>The taxonomy framework (architecture-as-code)</li>
        <li>The foundation that PRIMA and other systems build upon</li>
      </ul>

      <h3>FOE: The Governing Ontology</h3>
      <p><strong>Flow Optimized Engineering</strong> provides the conceptual framework everything aligns to:</p>
      <ul>
        <li>The <strong>Technical Review Board</strong> ensures alignment to FOE principles</li>
        <li>The <strong>Maturity Model</strong> assesses organizational capability</li>
        <li>The <strong>Engineering Field Guides</strong> provide evidence-backed practices</li>
      </ul>

      <h3>PRIMA: The Productized Surface</h3>
      <p><strong>PRIMA</strong> is what government delivery teams interact with directly:</p>
      <ul>
        <li><strong>Control Tower</strong> — Operational visibility</li>
        <li><strong>Web</strong> — User interfaces</li>
        <li><strong>Code</strong> — Application logic</li>
        <li><strong>Engine</strong> — Processing capabilities</li>
      </ul>
      <p>PRIMA runs on KATALYST, inheriting its infrastructure capabilities while providing a focused experience for government programs.</p>

      <h3>Teams Bridge Strategy and Execution</h3>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Gov Delivery Teams</strong></td>
            <td>Use PRIMA through Shine, assessed by TRB</td>
          </tr>
          <tr>
            <td><strong>Technical Review Board</strong></td>
            <td>Ensures alignment to FOE principles</td>
          </tr>
          <tr>
            <td><strong>RIC Team 1 (Prima)</strong></td>
            <td>Builds and maintains PRIMA</td>
          </tr>
          <tr>
            <td><strong>RIC Team 2 (Katalyst)</strong></td>
            <td>Develops KATALYST platform</td>
          </tr>
          <tr>
            <td><strong>RIC Team 3 (Aaron)</strong></td>
            <td>Bridges BD needs with platform reality</td>
          </tr>
        </tbody>
      </table>

      <h3>How This Maps to FOE Principles</h3>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Optimize for Understanding</div>
          <p className={styles.cardDescription}>KATALYST Taxonomy provides architecture-as-code. Shine surfaces practices in understandable form.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Optimize for Fast Feedback</div>
          <p className={styles.cardDescription}>KATALYST BDD Test enables multi-layer testing. TRB provides governance feedback loops.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Optimize for Confidence</div>
          <p className={styles.cardDescription}>KATALYST Platform provides GitOps deployment. Maturity Model tracks organizational progress.</p>
        </div>
      </div>
    </AccordionSection>
  );
}

function Act4(): ReactNode {
  return (
    <AccordionSection
      id="the-mechanisms"
      number={4}
      title="The Mechanisms"
      owner="shared"
      executiveSummary={
        <p>
          Strategy without execution is wishful thinking. This section covers the specific mechanisms 
          that make FOE operational: ownership models, technical enablers, compliance approaches, and 
          the living documentation system that captures organizational learning.
        </p>
      }
    >
      <h3>Ownership: RIC vs Prima</h3>
      <p>Clear ownership enables coordinated action without bottlenecks:</p>
      <table>
        <thead>
          <tr>
            <th>RIC (Environment)</th>
            <th>Prima (Enablement)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Custodian of FOE doctrine</td>
            <td>Agentic enablement team</td>
          </tr>
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

      <h3>Local-First Agentic Infrastructure</h3>
      <div className={styles.highlightBox}>
        <p>"If the agent cannot explain what it did locally, it cannot be trusted globally."</p>
      </div>
      <p>Prima will build local-first, offline-capable, audit-friendly foundation for agentic coding:</p>
      <ul>
        <li><strong>Local execution:</strong> The agent runs on your machine, with your permissions</li>
        <li><strong>No SaaS dependency:</strong> Core functionality works without internet</li>
        <li><strong>Git history preserved:</strong> Every action is a commit; you can diff and revert</li>
        <li><strong>Tool-agnostic:</strong> Works with any LLM backend</li>
      </ul>

      <h3>The .agent/ Convention</h3>
      <p>
        A tool-agnostic home for agent definitions—markdown files, simple metadata, and human-readable 
        instructions that work across any AI coding assistant:
      </p>
      <div className={styles.directoryTree}>
        <code>{`.agent/
├── definitions/     # Core agent personas
├── skills/          # Reusable capabilities
├── sub-agents/      # Specialized delegates
├── instructions/    # Project conventions
└── constraints/     # Guardrails and policies`}</code>
      </div>
      <p>
        When the next generation of AI tools arrives, eSimplicity's accumulated agent knowledge
        moves with a git clone, not a migration project.
      </p>

      <h3>Compliance Without Theater</h3>
      <p>
        FOE reframes compliance as an <em>evidence production problem</em> rather than a paperwork problem.
        Every engineering action automatically generates evidence:
      </p>
      <ul>
        <li><strong>Who:</strong> Identity of the human or agent that initiated the change</li>
        <li><strong>What:</strong> Precise diff linked to relevant artifacts</li>
        <li><strong>Why:</strong> Traced back to requirements or decisions</li>
        <li><strong>When:</strong> Timestamped and cryptographically attested</li>
      </ul>
      <p>When auditors ask "show me evidence that X," the answer is a query, not a document hunt.</p>

      <h3>Field Guide as Living System</h3>
      <p>The Field Guide is not documentation—it's institutional memory expressed as hypotheses with experiments attached:</p>
      <table>
        <thead>
          <tr>
            <th>Maturity Level</th>
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
        The system has no ego, only evidence.
      </p>

      <h3>FOE in Every Repo</h3>
      <p>
        FOE is not optional or a sidecar—it is embedded in every repository we touch:
      </p>
      <ul>
        <li><strong>Experiment hooks:</strong> Standardized entry points for capturing hypotheses and outcomes</li>
        <li><strong>Change → Hypothesis → Evidence mapping:</strong> Every meaningful change links to a testable claim</li>
        <li><strong>Field Guide integration:</strong> Learnings flow automatically into organizational memory</li>
      </ul>
      <div className={styles.highlightBox}>
        <p>
          The shift is from "Did we ship?" to "What did we learn, and what evidence do we have?"
        </p>
      </div>
    </AccordionSection>
  );
}

function Act5(): ReactNode {
  return (
    <AccordionSection
      id="the-destination"
      number={5}
      title="The Destination"
      owner="shared"
      executiveSummary={
        <p>
          This is not an AI strategy. This is not a tooling initiative. This is an attempt to make
          software development behave like a mature engineering discipline—one where claims require
          evidence, learning compounds, and truth becomes cheaper than assumption.
        </p>
      }
    >
      <h3>The J-Curve of Transformation</h3>
      <p>Organizations should expect a specific journey:</p>
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

      <h3>KATALYST: The Phase 3 Enabler</h3>
      <p>
        Most organizations assume Phase 4 (Agentic Coding) is the hard part. They are wrong.
        Phase 3—establishing disciplined, evidence-based practices—is where organizations stall.
        Phase 4 without Phase 3 is just faster chaos.
      </p>
      <div className={styles.warningBox}>
        <p><strong>Tools don't create disciplines; they enable or amplify existing ones.</strong></p>
      </div>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>Daily+</span>
          <span className={styles.metricLabel}>Deployment Frequency</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>&lt;1 day</span>
          <span className={styles.metricLabel}>Lead Time</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>&lt;5%</span>
          <span className={styles.metricLabel}>Change Failure Rate</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>&lt;1 hr</span>
          <span className={styles.metricLabel}>MTTR</span>
        </div>
      </div>

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
            <span className={styles.architectureItemValue}>KATALYST</span>
          </div>
          <div className={styles.architectureItem}>
            <span className={styles.architectureItemLabel}>Nervous System</span>
            <span className={styles.architectureItemValue}>PRIMA</span>
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

      <div className={styles.highlightBox}>
        <p>
          Civil engineers don't ship bridges and hope they work. AI changes both sides of the equation:
          the cost of failure increases (AI amplifies mistakes), and the cost of rigor decreases 
          (AI makes evidence generation cheap). <strong>The point is not speed. The point is truth at scale.</strong>
        </p>
      </div>
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
          See how we're turning this strategy into action, or explore the full documentation.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/esimplicity-plan" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
            View the Plan
          </Link>
          <Link to="/docs/intro/what-is-foe" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            Read the Docs
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
              <Act1 />
              <Act2 />
              <Act3 />
              <Act4 />
              <Act5 />
            </div>
          </div>
        </div>
        <CTASection />
      </main>
    </Layout>
  );
}
