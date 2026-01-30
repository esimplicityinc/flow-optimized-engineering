import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Mermaid from '@theme/Mermaid';
import styles from './styles.module.css';

export default function BrandStrategyMultiYearPlan(): ReactNode {
  return (
    <Layout
      title="FOE-AI Multi-Year Plan"
      description="Multi-year brand strategy for FOE-AI delivery in government"
    >
      <main className={styles.page}>
        <header className={`${styles.hero} ${styles.heroCompact}`}>
          <div className={styles.container}>
            <nav className={styles.nav}>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy">
                Landing Page
              </Link>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy/culture-distribution">
                Culture Distribution
              </Link>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy/training-plan">
                Training Plan
              </Link>
            </nav>
            <span className={styles.badge}>eSimplicity - FOE-AI Strategy</span>
            <h1 className={styles.heroTitleCompact}>Multi-Year Plan: Building the FOE-AI Flywheel</h1>
            <p className={styles.heroLead}>
              This roadmap builds external authority, wins more bids, and reinforces internal delivery
              excellence using Flow-Optimized Engineering (FOE) for AI in government.
            </p>
          </div>
        </header>

        <section className={styles.section} id="overview">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Strategy Overview</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Positioning</h3>
                <p className={styles.muted}>
                  FOE is the system that delivers AI safely, quickly, and compliantly in government.
                </p>
                <span className={styles.pill}>Flow</span>
                <span className={styles.pill}>Safety</span>
                <span className={styles.pill}>Oversight</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Flywheel</h3>
                <p className={styles.muted}>
                  Authority -> Wins -> Proof -> Authority. Each cycle compounds credibility and pipeline.
                </p>
                <span className={styles.pill}>Authority</span>
                <span className={styles.pill}>Proof</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Primary Buyers</h3>
                <p className={styles.muted}>
                  CIO/CTO, innovation leads, contracting officers, and program managers.
                </p>
                <span className={styles.pill}>CIO/CTO</span>
                <span className={styles.pill}>PMs</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="flywheel">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>FOE-AI Flywheel</h2>
            <div className={styles.diagram}>
              <Mermaid
                value={`flowchart LR
A(FOE Authority) --> B(Wins More Bids)
B --> C(Projects Delivered Safely)
C --> D(New Proof + Case Studies)
D --> A`}
              />
            </div>
          </div>
        </section>

        <section className={styles.section} id="timeline">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Three-Year Timeline</h2>
            <div className={styles.timeline}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Year 0-1: Foundation + Proof</h3>
                <ul className={styles.list}>
                  <li>Publish FOE-AI playbook + delivery templates (risk checklists, test gates, oversight logs)</li>
                  <li>Launch FOE-AI Foundations training + internal certification</li>
                  <li>Stand up pilot factory (2-3 pilots with baselines + ROI metrics)</li>
                  <li>Build proposal language + evidence library for bids</li>
                  <li>Run monthly webinar series + 2-3 conference talks</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Year 1-2: Expansion + Credibility</h3>
                <ul className={styles.list}>
                  <li>Expand case study library (5-7 proof points, measurable outcomes)</li>
                  <li>FOE-AI Practitioner certification + coaching program</li>
                  <li>Embed FOE language into 60%+ of AI-related bids</li>
                  <li>Offer FOE-AI workshops to agencies + primes</li>
                  <li>Formalize partner ecosystem (model risk, privacy, MLOps)</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Year 2-3: Scale + Thought Leadership</h3>
                <ul className={styles.list}>
                  <li>Publish FOE-AI book + companion course</li>
                  <li>Release annual FOE benchmark report (industry + agency insights)</li>
                  <li>FOE-AI Lead certification + internal trainer program</li>
                  <li>Host FOE symposium + community network</li>
                  <li>Integrate FOE into all AI delivery programs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="training">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Training + Enablement System (Detailed)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Tracks by Role</h3>
                <ul className={styles.list}>
                  <li><strong>Executive Track:</strong> governance, risk, procurement optics</li>
                  <li><strong>Program Track:</strong> delivery controls, QA gates, reporting</li>
                  <li><strong>Engineer Track:</strong> testing, evaluation, agent safety patterns</li>
                  <li><strong>Sales/BD Track:</strong> compliant FOE language + evidence use</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Core Modules (Sample)</h3>
                <ul className={styles.list}>
                  <li>FOE principles + flow metrics</li>
                  <li>AI risk taxonomy + guardrails</li>
                  <li>Test strategy for generative systems</li>
                  <li>Model monitoring + drift detection</li>
                  <li>Governance + auditability</li>
                  <li>Legacy integration + change management</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Certification Levels</h3>
                <ul className={styles.list}>
                  <li><strong>Foundations:</strong> course + quiz</li>
                  <li><strong>Practitioner:</strong> applied pilot + review</li>
                  <li><strong>Lead:</strong> mentored delivery + teaching others</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Cadence + Format</h3>
                <ul className={styles.list}>
                  <li>Monthly cohort (2-3 hours/week)</li>
                  <li>Quarterly capstone demo</li>
                  <li>Annual recertification</li>
                  <li>Office hours + FOE clinic</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="operating-system">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Internal Operating System (Delivery Guardrails)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Rituals + Governance</h3>
                <ul className={styles.list}>
                  <li>Weekly flow review (cycle time, blockages)</li>
                  <li>AI risk review before deployment</li>
                  <li>Release readiness checklist + sign-off</li>
                  <li>Post-pilot retrospectives with metrics</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Quality Gates</h3>
                <ul className={styles.list}>
                  <li>Test coverage requirements for AI components</li>
                  <li>Evaluation harness for prompts/agents</li>
                  <li>Monitoring + incident playbooks</li>
                  <li>Human-in-the-loop escalation path</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Artifacts</h3>
                <ul className={styles.list}>
                  <li>FOE-AI delivery checklist</li>
                  <li>Model risk register</li>
                  <li>Change impact assessment template</li>
                  <li>Compliance-ready documentation pack</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Metrics</h3>
                <ul className={styles.list}>
                  <li>Cycle time, rework rate, QA escapes</li>
                  <li>Agent evaluation pass rate</li>
                  <li>Production incidents + MTTR</li>
                  <li>Adoption + certification completion</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="bid-integration">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Bid + Proposal Integration</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Bid Kit Assets</h3>
                <ul className={styles.list}>
                  <li>FOE-AI one-pager (compliance-friendly)</li>
                  <li>Past performance narrative inserts</li>
                  <li>Risk mitigation boilerplate</li>
                  <li>AI testing + oversight appendix</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Where FOE Shows Up</h3>
                <ul className={styles.list}>
                  <li>Technical approach + QA sections</li>
                  <li>Risk management + governance sections</li>
                  <li>Staffing plans + training plans</li>
                  <li>Past performance + case study attachments</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Compliance Optics</h3>
                <ul className={styles.list}>
                  <li>Claims grounded in documented outcomes</li>
                  <li>Clear human oversight + escalation</li>
                  <li>Audit-ready documentation structure</li>
                  <li>Security + privacy alignment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="pilot-factory">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Pilot + Case Study Factory</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Selection Criteria</h3>
                <ul className={styles.list}>
                  <li>High pain, low mission risk</li>
                  <li>Measurable before/after outcomes</li>
                  <li>Clear data availability</li>
                  <li>Stakeholder sponsor in agency</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Measurement Plan</h3>
                <ul className={styles.list}>
                  <li>Baseline cycle time + error rate</li>
                  <li>Define success thresholds</li>
                  <li>Track QA escapes + incidents</li>
                  <li>Capture qualitative stakeholder feedback</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Output Template</h3>
                <ul className={styles.list}>
                  <li>Problem -> FOE approach -> Results</li>
                  <li>Guardrails used + tests performed</li>
                  <li>Risk reductions + ROI</li>
                  <li>Lessons learned + next step</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="thought-leadership">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Thought Leadership Engine</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Quarterly Themes</h3>
                <ul className={styles.list}>
                  <li>Q1: AI Safety + Oversight</li>
                  <li>Q2: Flow + Delivery Velocity</li>
                  <li>Q3: Legacy Integration</li>
                  <li>Q4: Governance + Compliance</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Monthly Outputs</h3>
                <ul className={styles.list}>
                  <li>1 webinar / panel</li>
                  <li>1 case study or brief</li>
                  <li>1 blog / LinkedIn article</li>
                  <li>1 conference or podcast pitch</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Yearly Milestones</h3>
                <ul className={styles.list}>
                  <li>Annual FOE benchmark report</li>
                  <li>FOE symposium (Year 2+)</li>
                  <li>Book launch (Year 3)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="compliance">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Risk + Compliance Alignment</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>AI Risk Controls</h3>
                <ul className={styles.list}>
                  <li>Model risk register + approval gates</li>
                  <li>Prompt/agent evaluation harness</li>
                  <li>Human oversight + escalation paths</li>
                  <li>Data handling and retention policies</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Documentation Pack</h3>
                <ul className={styles.list}>
                  <li>Design decisions + assumptions</li>
                  <li>Testing evidence + acceptance criteria</li>
                  <li>Monitoring plan + incident response</li>
                  <li>Audit trail + change log</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Governance Forums</h3>
                <ul className={styles.list}>
                  <li>Quarterly AI governance review</li>
                  <li>Risk exceptions workflow</li>
                  <li>Security and privacy reviews</li>
                  <li>Compliance sign-off checkpoints</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="resourcing">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Resourcing + Ownership (Lean Team)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Core Roles</h3>
                <ul className={styles.list}>
                  <li><strong>FOE Lead:</strong> framework owner + enablement</li>
                  <li><strong>AI Delivery Lead:</strong> pilot execution + proof</li>
                  <li><strong>BD/Sales Enablement:</strong> bid kit + messaging</li>
                  <li><strong>Ops Analyst:</strong> metrics + reporting</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Operating Cadence</h3>
                <ul className={styles.list}>
                  <li>Monthly FOE steering meeting</li>
                  <li>Quarterly roadmap review</li>
                  <li>Annual asset refresh</li>
                  <li>Quarterly case study release</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Time Allocation (Low-Lift)</h3>
                <ul className={styles.list}>
                  <li>1-2 hrs/week per team lead</li>
                  <li>Quarterly workshop prep sprint</li>
                  <li>Pilot time embedded in delivery</li>
                  <li>BD kit updates per bid cycle</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="short-term">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>30/60/90 Day Execution</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>0-30 Days</h3>
                <ul className={styles.list}>
                  <li>Finalize FOE-AI positioning statement + proof plan</li>
                  <li>Select 2-3 pilot projects and define metrics</li>
                  <li>Form FOE working group + charter</li>
                  <li>Publish FOE-AI one-pager + bid language draft</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>31-60 Days</h3>
                <ul className={styles.list}>
                  <li>Draft FOE-AI playbook outline + template set</li>
                  <li>Build webinar deck + 60-minute workshop</li>
                  <li>Begin Foundations training cohort (executive + delivery)</li>
                  <li>Baseline delivery metrics + reporting cadence</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>61-90 Days</h3>
                <ul className={styles.list}>
                  <li>Run first public webinar + collect leads</li>
                  <li>Capture pilot data + build proof narrative</li>
                  <li>Draft case study #1 + compliance review</li>
                  <li>Define FOE certification criteria + rubric</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="assets">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Core Assets (Pre-Book)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>FOE-AI Playbook</h3>
                <p className={styles.muted}>
                  Executive + technical guide with templates, risk taxonomy, and test gates.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>FOE-AI Certification</h3>
                <p className={styles.muted}>
                  Foundations -> Practitioner -> Lead with applied project reviews.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Case Studies</h3>
                <p className={styles.muted}>
                  Measured outcomes with guardrails, tests, and risk reductions documented.
                </p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Workshops + Talks</h3>
                <p className={styles.muted}>
                  Monthly workshops + annual themes aligned to buyer pain.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="kpis">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Measurement System</h2>
            <div className={styles.kpis}>
              <div className={styles.kpi}>
                <div className={styles.kpiValue}>North Star</div>
                <div className={styles.muted}>% of AI-related bids won where FOE is cited</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.kpiValue}>Pipeline</div>
                <div className={styles.muted}># of AI opportunities influenced by FOE assets</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.kpiValue}>Delivery</div>
                <div className={styles.muted}>Cycle time reduction and fewer QA issues</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.kpiValue}>Safety</div>
                <div className={styles.muted}>Agent evaluation pass rate + incidents avoided</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.kpiValue}>Authority</div>
                <div className={styles.muted}>Content reach + workshop attendance</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.kpiValue}>Adoption</div>
                <div className={styles.muted}>FOE certification completion rate</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.kpiValue}>Proof</div>
                <div className={styles.muted}># of publishable case studies per year</div>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <p>
              eSimplicity - FOE-AI Strategy - <a href="https://esimplicity.com/">esimplicity.com</a>
            </p>
            <p className={styles.muted}>
              Flow-Optimized Engineering is the system for safe, fast AI delivery in government.
            </p>
          </div>
        </footer>
      </main>
    </Layout>
  );
}
