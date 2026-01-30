import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Mermaid from '@theme/Mermaid';
import styles from './styles.module.css';

export default function BrandStrategyCultureDistribution(): ReactNode {
  return (
    <Layout
      title="FOE Culture Distribution"
      description="Distribute FOE culture across dispersed government sites"
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
              <Link className={styles.navLink} to="/esimplicity-strategy/brand-strategy/training-plan">
                Training Plan
              </Link>
            </nav>
            <span className={styles.badge}>eSimplicity - FOE Culture Distribution</span>
            <h1 className={styles.heroTitleCompact}>Distribute FOE culture across dispersed government sites</h1>
            <p className={styles.heroLead}>
              eSimplicity is the hub. Teams operate across many government environments with different cultures.
              This plan creates a portable, low-overhead FOE culture that travels with our people and survives
              local constraints.
            </p>
          </div>
        </header>

        <section className={styles.section} id="model">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Hub-and-Spoke Culture Model</h2>
            <div className={styles.diagram}>
              <Mermaid
                value={`flowchart TD
H(FOE Hub: eSimplicity) --> S1(Site A)
H --> S2(Site B)
H --> S3(Site C)
H --> S4(Site D)
H --> C(Champions Network)
C --> S1
C --> S2
C --> S3
C --> S4`}
              />
            </div>
            <p className={styles.muted}>
              We scale culture through a champions network and a minimum viable behavior set.
            </p>
          </div>
        </section>

        <section className={styles.section} id="mvb">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Minimum Viable FOE Behaviors (Portable Culture)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>1) Make Flow Visible</h3>
                <p className={styles.muted}>Simple kanban + weekly blockers review.</p>
                <span className={styles.pill}>15-min ritual</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>2) Test Before You Trust</h3>
                <p className={styles.muted}>AI evaluation or test plan is required for every AI component.</p>
                <span className={styles.pill}>QA gate</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>3) Document Decisions</h3>
                <p className={styles.muted}>1-page decision log for high-risk changes.</p>
                <span className={styles.pill}>Audit-ready</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>4) Ship in Safe Slices</h3>
                <p className={styles.muted}>Incremental releases reduce risk and rework.</p>
                <span className={styles.pill}>Risk control</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>5) Learn Fast</h3>
                <p className={styles.muted}>Mini-retro with metrics each sprint/month.</p>
                <span className={styles.pill}>Continuous improvement</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="actions">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Actions by Level (Concrete)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Executives</h3>
                <ul className={styles.list}>
                  <li>30-min executive brief on FOE as delivery risk reduction</li>
                  <li>Monthly 1-page dashboard (flow, QA escapes, adoption)</li>
                  <li>FOE language for proposals + compliance optics</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Program Managers</h3>
                <ul className={styles.list}>
                  <li>FOE Ready Kit (checklists + templates)</li>
                  <li>15-minute weekly flow review</li>
                  <li>Monthly QA / AI risk review</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Engineers</h3>
                <ul className={styles.list}>
                  <li>Micro-training modules (10-15 min)</li>
                  <li>FOE skill badges and recognition</li>
                  <li>Peer shared wins in Teams/Slack</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="champions">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Champions Network (Bottom-Up Engine)</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Selection</h3>
                <ul className={styles.list}>
                  <li>1 champion per contract or site</li>
                  <li>Respected by peers, not just managers</li>
                  <li>Given 1-2 hours/month to lead</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Monthly Champion Kit</h3>
                <ul className={styles.list}>
                  <li>1 FOE tip + 1 template + 1 win story</li>
                  <li>Short what to say to customer guide</li>
                  <li>5-minute update for team stand-ups</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Recognition</h3>
                <ul className={styles.list}>
                  <li>Monthly FOE Signal award</li>
                  <li>Public recognition in all-hands</li>
                  <li>Case study co-authorship credit</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="overhead">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Low-Overhead Implementation</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Use Existing Tools</h3>
                <ul className={styles.list}>
                  <li>SharePoint/Teams for FOE kits</li>
                  <li>Recorded micro-trainings</li>
                  <li>Templates embedded in sprint rituals</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Make It Default</h3>
                <ul className={styles.list}>
                  <li>FOE checklist becomes part of standard delivery</li>
                  <li>Decision logs required for high-risk changes</li>
                  <li>QA gates added to definitions of done</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Small Wins, Often</h3>
                <ul className={styles.list}>
                  <li>Share 1 win/month (saved hours, reduced rework)</li>
                  <li>Internal newsletter or Teams post</li>
                  <li>Map wins to contract outcomes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="phases">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>90-Day Rollout Plan</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Days 0-30</h3>
                <ul className={styles.list}>
                  <li>Identify pilot sites + champions</li>
                  <li>Publish MV-FOE behaviors one-pager</li>
                  <li>Distribute FOE Ready Kit v1</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Days 31-60</h3>
                <ul className={styles.list}>
                  <li>Run first champion call</li>
                  <li>Launch micro-training module 1-2</li>
                  <li>Start weekly flow reviews at pilot sites</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Days 61-90</h3>
                <ul className={styles.list}>
                  <li>Release first FOE win story</li>
                  <li>Require one FOE artifact per pilot site</li>
                  <li>Baseline metrics dashboard for leadership</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="metrics">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Culture Adoption Metrics</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Behavior Adoption</h3>
                <ul className={styles.list}>
                  <li>% of sites using flow reviews</li>
                  <li>% of projects with decision logs</li>
                  <li>% of AI components with evaluation plans</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Impact</h3>
                <ul className={styles.list}>
                  <li>Cycle time reduction</li>
                  <li>QA escape rate decrease</li>
                  <li>Production incidents + MTTR</li>
                </ul>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Engagement</h3>
                <ul className={styles.list}>
                  <li>Champion participation rate</li>
                  <li>Micro-training completion rate</li>
                  <li>Win story submissions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <p>
              eSimplicity - FOE Culture Distribution - <a href="https://esimplicity.com/">esimplicity.com</a>
            </p>
            <p className={styles.muted}>
              A portable FOE culture that improves delivery in any government environment.
            </p>
          </div>
        </footer>
      </main>
    </Layout>
  );
}
