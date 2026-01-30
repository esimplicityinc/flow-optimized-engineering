import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Mermaid from '@theme/Mermaid';
import styles from './styles.module.css';

export default function BrandStrategyLanding(): ReactNode {
  return (
    <Layout
      title="FOE Brand Strategy"
      description="Flow-Optimized Engineering brand strategy for government AI delivery"
    >
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.container}>
            <nav className={styles.nav}>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy/multi-year-plan">
                Multi-Year Plan
              </Link>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy/culture-distribution">
                Culture Distribution
              </Link>
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy/training-plan">
                Training Plan
              </Link>
            </nav>
            <span className={styles.badge}>eSimplicity - Government Software + AI Delivery</span>
            <h1 className={styles.heroTitle}>
              Flow-Optimized Engineering: the safe, fast way to deliver AI in government.
            </h1>
            <p className={styles.heroLead}>
              AI expertise is more than tools. It is the system that makes AI work inside real
              processes, legacy systems, and compliance environments. Flow-Optimized Engineering (FOE)
              is our framework for speed, safety, and accountability in AI delivery.
            </p>
            <div className={styles.ctaRow}>
              <a className={`${styles.button} ${styles.buttonPrimary} ${styles.focusVisible}`} href="mailto:info@esimplicity.com">
                Request a briefing
              </a>
              <a className={`${styles.button} ${styles.focusVisible}`} href="#playbook">
                Download the FOE-AI playbook
              </a>
            </div>
            <p className={styles.note}>
              We help agencies modernize with AI while reducing delivery risk, rework, and compliance exposure.
            </p>
          </div>
        </header>

        <section className={styles.section} id="problem">
          <div className={`${styles.container} ${styles.split}`}>
            <div>
              <h2 className={styles.sectionTitle}>The problem with "AI experts" in government delivery</h2>
              <p className={styles.muted}>
                AI projects fail when they skip the system: testing, oversight, change management, and integration.
                Government environments demand trust, auditability, and mission reliability.
              </p>
              <div className={styles.card}>
                <h3 className={styles.sectionSubtitle}>FOE addresses three failure points</h3>
                <ul className={styles.list}>
                  <li><strong>Speed without safety</strong> - Guardrails + testing protocols</li>
                  <li><strong>AI in isolation</strong> - Integration into legacy systems + culture</li>
                  <li><strong>Proof gaps</strong> - Measurable outcomes + case studies</li>
                </ul>
              </div>
            </div>
            <div className={styles.diagram}>
              <Mermaid
                value={`flowchart TD
A(AI Hype) --> B(Fragile Delivery)
B --> C(Compliance Risk)
C --> D(Program Risk)
A --> E(FOE System)
E --> F(Guardrails + Testing)
E --> G(Integration + Culture)
E --> H(Proof + Metrics)`}
              />
            </div>
          </div>
        </section>

        <section className={styles.section} id="solution">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our solution: Flow-Optimized Engineering for AI</h2>
            <p className={styles.muted}>
              FOE is a repeatable delivery system that makes AI safe, fast, and accountable in government.
            </p>

            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>1) Flow-Optimized Engineering</h3>
                <p className={styles.muted}>A structured system that removes friction and improves delivery speed.</p>
                <span className={styles.tag}>Playbook</span>
                <span className={styles.tag}>Templates</span>
                <span className={styles.tag}>Rituals</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>2) AI in Real Systems</h3>
                <p className={styles.muted}>Designed for legacy tech, existing processes, and cultural realities.</p>
                <span className={styles.tag}>Integration</span>
                <span className={styles.tag}>Change Mgmt</span>
                <span className={styles.tag}>Governance</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>3) Guardrails + Oversight</h3>
                <p className={styles.muted}>Testing, monitoring, and model risk controls embedded in delivery.</p>
                <span className={styles.tag}>Safety</span>
                <span className={styles.tag}>QA</span>
                <span className={styles.tag}>Auditability</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="diagrams">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>How the FOE flywheel works</h2>
            <div className={styles.diagram}>
              <Mermaid
                value={`flowchart LR
A(FOE Authority) --> B(Wins More Bids)
B --> C(Projects Delivered Safely)
C --> D(New Proof + Case Studies)
D --> A`}
              />
            </div>

            <h3 className={styles.sectionSubtitle} style={{ marginTop: '24px' }}>
              Messaging hierarchy
            </h3>
            <div className={styles.diagram}>
              <Mermaid
                value={`graph TD
P(Core Promise: AI Delivered Safely & Fast)
P --> F1(Flow-Optimized Engineering)
P --> F2(AI in Legacy Systems)
P --> F3(Guardrails + Oversight)
F1 --> R1(Playbook + Templates)
F2 --> R2(Integration + Culture)
F3 --> R3(Testing + Monitoring)`}
              />
            </div>

            <h3 className={styles.sectionSubtitle} style={{ marginTop: '24px' }}>
              GTM system map
            </h3>
            <div className={styles.diagram}>
              <Mermaid
                value={`flowchart LR
G(FOE Narrative) --> C(Content & Talks)
C --> L(Leads & Relationships)
L --> B(Bids/Proposals)
B --> D(Delivery)
D --> P(Proof & Case Studies)
P --> G`}
              />
            </div>
          </div>
        </section>

        <section className={styles.section} id="playbook">
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.proof}>
              <h2 className={styles.sectionTitle}>Proof-building assets (before the book)</h2>
              <ul className={styles.list}>
                <li>FOE-AI Playbook (executive + technical)</li>
                <li>Internal FOE-AI Certification</li>
                <li>Client + internal case studies</li>
                <li>Public workshops & conference talks</li>
              </ul>
            </div>
            <div>
              <h3 className={styles.sectionSubtitle}>Compliance-ready by design</h3>
              <p className={styles.muted}>
                FOE is designed for government oversight: traceability, testing rigor, monitoring, and
                controlled deployment practices.
              </p>
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>Lower rework</div>
                  <div className={styles.muted}>Fewer QA issues through guardrails</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>Higher velocity</div>
                  <div className={styles.muted}>Reduced cycle time with flow practices</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>Higher trust</div>
                  <div className={styles.muted}>Audit-ready AI delivery system</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="offer">
          <div className={`${styles.container} ${styles.split}`}>
            <div>
              <h2 className={styles.sectionTitle}>FOE-AI Offer</h2>
              <p className={styles.muted}>Choose the engagement that matches your mission and risk profile.</p>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Discovery + Readiness</h3>
                  <p className={styles.muted}>Assessment of AI fit, risk controls, and delivery flow.</p>
                </div>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>FOE-AI Pilot</h3>
                  <p className={styles.muted}>Low-risk pilot with guardrails, testing, and oversight.</p>
                </div>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>FOE-AI Program</h3>
                  <p className={styles.muted}>Scaled AI delivery with repeatable system + metrics.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className={styles.sectionSubtitle}>Who this is for</h3>
              <ul className={styles.list}>
                <li>CIO/CTO leaders modernizing safely</li>
                <li>Innovation leads scaling AI responsibly</li>
                <li>PMs and contracting officers managing delivery risk</li>
              </ul>
              <p className={styles.note}>
                We translate AI into reliable delivery systems that reduce risk and increase mission impact.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} id="cta">
          <div className={styles.container}>
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Let us build your AI delivery system</h2>
              <p className={styles.muted}>
                Get a briefing on FOE-AI and learn how we reduce risk while accelerating delivery.
              </p>
              <div className={styles.ctaRow}>
                <a className={`${styles.button} ${styles.buttonPrimary} ${styles.focusVisible}`} href="mailto:info@esimplicity.com">
                  Request briefing
                </a>
                <a
                  className={`${styles.button} ${styles.focusVisible}`}
                  href="https://esimplicityinc.github.io/flow-optimized-engineering/infographic"
                >
                  View FOE infographic
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faq}`} id="faq">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>FAQ</h2>
            <details>
              <summary>Is FOE a methodology or a compliance framework?</summary>
              <p className={styles.muted}>
                FOE is a delivery system that embeds testing, oversight, and guardrails into AI development. It
                aligns with government compliance needs and reduces delivery risk.
              </p>
            </details>
            <details>
              <summary>How does FOE help with legacy systems?</summary>
              <p className={styles.muted}>
                FOE is designed for integration into existing systems and workflows. It focuses on flow, safety,
                and phased deployment rather than rip and replace.
              </p>
            </details>
            <details>
              <summary>Can we use FOE without deploying AI?</summary>
              <p className={styles.muted}>
                Yes. FOE improves delivery flow across software efforts. The AI extension adds guardrails and
                oversight for safe AI adoption.
              </p>
            </details>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <p>
              eSimplicity - Government Software Services + AI Delivery -{' '}
              <a href="https://esimplicity.com/">esimplicity.com</a>
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
