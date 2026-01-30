import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Mermaid from '@theme/Mermaid';
import styles from './styles.module.css';

export default function BrandStrategyTrainingPlan(): ReactNode {
  return (
    <Layout
      title="FOE-AI Training Plan"
      description="Low-overhead FOE-AI training system for distributed teams"
    >
      <main className={styles.page}>
        <header className={`${styles.hero} ${styles.heroCompact}`}>
          <div className={styles.container}>
            <nav className={styles.nav}>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy">
                Landing Page
              </Link>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy/multi-year-plan">
                Multi-Year Plan
              </Link>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy/culture-distribution">
                Culture Distribution
              </Link>
            </nav>
            <span className={styles.badge}>eSimplicity - FOE-AI Training</span>
            <h1 className={styles.heroTitleCompact}>Low-overhead FOE-AI Training System</h1>
            <p className={styles.heroLead}>
              A micro-learning and applied-practice system designed for dispersed teams. The goal: build FOE
              capability without pulling people off mission work or inflating overhead.
            </p>
          </div>
        </header>

        <section className={styles.section} id="overview">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Training Principles (Built for Gov Contractor Reality)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Low Time Cost</h3>
                <p className={styles.muted}>~1 hour per person per month (micro-modules + quick artifacts).</p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Embedded in Delivery</h3>
                <p className={styles.muted}>Training outputs double as delivery artifacts.</p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Measured and Reportable</h3>
                <p className={styles.muted}>Completion + outcomes are easy to report to leadership.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="flow">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Training Flow</h2>
            <div className={styles.diagram}>
              <Mermaid
                value={`flowchart LR
A(10-15 min Module) --> B(Quick Quiz)
B --> C(Apply to Live Project)
C --> D(Artifact Submission)
D --> E(Recognition + Badge)`}
              />
            </div>
          </div>
        </section>

        <section className={styles.section} id="tracks">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Role-Based Tracks</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Executive Track</h3>
                <ul className={styles.list}>
                  <li>AI risk and governance overview</li>
                  <li>Oversight, compliance, and decision gates</li>
                  <li>Executive dashboard interpretation</li>
                </ul>
                <span className={styles.pill}>30-40 min total</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Program Track</h3>
                <ul className={styles.list}>
                  <li>Flow metrics + delivery rituals</li>
                  <li>QA gates and acceptance criteria</li>
                  <li>Risk logging + decision documentation</li>
                </ul>
                <span className={styles.pill}>60 min/month</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Engineer Track</h3>
                <ul className={styles.list}>
                  <li>AI evaluation harness</li>
                  <li>Prompt/agent testing</li>
                  <li>Monitoring + incident playbooks</li>
                </ul>
                <span className={styles.pill}>60-90 min/month</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Sales/BD Track</h3>
                <ul className={styles.list}>
                  <li>FOE narrative + compliant language</li>
                  <li>Evidence use and proof strategy</li>
                  <li>Proposal insertion points</li>
                </ul>
                <span className={styles.pill}>30-45 min/month</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="modules">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Core Module Catalog (Example)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Module 1: FOE Fundamentals</h3>
                <ul className={styles.list}>
                  <li>Flow metrics + bottleneck identification</li>
                  <li>Minimum viable FOE behaviors</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Module 2: AI Risk + Guardrails</h3>
                <ul className={styles.list}>
                  <li>Risk taxonomy + threat modeling</li>
                  <li>Human oversight + escalation paths</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Module 3: Testing Generative Systems</h3>
                <ul className={styles.list}>
                  <li>Evaluation harness design</li>
                  <li>Prompt/agent test coverage</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Module 4: Monitoring + Drift</h3>
                <ul className={styles.list}>
                  <li>Telemetry + alert thresholds</li>
                  <li>Incident response playbooks</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Module 5: Integration + Change</h3>
                <ul className={styles.list}>
                  <li>Legacy integration patterns</li>
                  <li>Change management checklist</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Module 6: Compliance Documentation</h3>
                <ul className={styles.list}>
                  <li>Decision logs + traceability</li>
                  <li>Audit-ready evidence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="certification">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Certification Ladder</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Foundations</h3>
                <ul className={styles.list}>
                  <li>6 modules + quiz</li>
                  <li>1 required artifact submission</li>
                  <li>Badge visible in internal directory</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Practitioner</h3>
                <ul className={styles.list}>
                  <li>Lead a pilot or sub-pilot</li>
                  <li>Pass peer review + metric improvements</li>
                  <li>Mentor 1-2 peers</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Lead</h3>
                <ul className={styles.list}>
                  <li>Train others + deliver workshop</li>
                  <li>Publish a case study</li>
                  <li>Contribute to playbook updates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="overhead">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>How We Keep Overhead Low</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Recorded Modules</h3>
                <p className={styles.muted}>Single recording used across contracts; updated quarterly.</p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Artifact-Based Proof</h3>
                <p className={styles.muted}>Training outputs become proposal proof and delivery documentation.</p>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>On-Demand Office Hours</h3>
                <p className={styles.muted}>Optional 30-minute drop-in, one per month.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="rollout">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Training Rollout (90 Days)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Days 0-30</h3>
                <ul className={styles.list}>
                  <li>Record Modules 1-2</li>
                  <li>Launch Foundations cohort</li>
                  <li>Publish training calendar</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Days 31-60</h3>
                <ul className={styles.list}>
                  <li>Record Modules 3-4</li>
                  <li>Begin artifact submissions</li>
                  <li>Start office hours</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Days 61-90</h3>
                <ul className={styles.list}>
                  <li>Record Modules 5-6</li>
                  <li>Issue first Foundations badges</li>
                  <li>Collect feedback + iterate</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="reporting">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Leadership Reporting Metrics</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Completion</h3>
                <ul className={styles.list}>
                  <li>% trained by role</li>
                  <li>Module completion rate</li>
                  <li>Certification attainment</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Delivery Impact</h3>
                <ul className={styles.list}>
                  <li>Cycle time improvement</li>
                  <li>QA escape reduction</li>
                  <li>Incidents avoided</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Bid Impact</h3>
                <ul className={styles.list}>
                  <li>FOE-trained teams on proposals</li>
                  <li>Evidence used in past performance</li>
                  <li>Win rate where FOE is cited</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <p>
              eSimplicity - FOE-AI Training Plan - <a href="https://esimplicity.com/">esimplicity.com</a>
            </p>
            <p className={styles.muted}>
              Training that scales across dispersed teams without heavy overhead.
            </p>
          </div>
        </footer>
      </main>
    </Layout>
  );
}
