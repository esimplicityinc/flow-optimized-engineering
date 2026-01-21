import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContent)}>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          A delivery doctrine that optimizes engineering organizations for flow - the repeatable 
          movement from idea to change to verification to release to learning - without sacrificing 
          safety, coherence, or the ability to explain your systems.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro/what-is-foe">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            style={{color: 'white', borderColor: 'rgba(255,255,255,0.5)'}}
            to="/docs/principles/overview">
            Core Principles
          </Link>
        </div>
      </div>
    </header>
  );
}

function AudiencePathways(): ReactNode {
  const pathways = [
    {
      title: "I'm an Executive",
      description: "Understand how FOE protects margins, reduces risk, and creates competitive advantage in government contracting.",
      link: "/docs/stakeholder-guides/for-executives",
      icon: "chart",
      color: "#7c3aed", // Purple
    },
    {
      title: "I'm an Engineering Leader",
      description: "Learn how to build institutions, scale practices, and implement FOE across your organization.",
      link: "/docs/stakeholder-guides/for-engineering-leaders",
      icon: "building",
      color: "#0891b2", // Cyan
    },
    {
      title: "I'm an Engineer",
      description: "Discover the paved paths, feedback loops, and guardrails that let you ship with confidence.",
      link: "/docs/stakeholder-guides/for-engineers",
      icon: "code",
      color: "#059669", // Green
    },
    {
      title: "I'm Evaluating Vendors",
      description: "Understand what to look for in engineering maturity and how FOE principles create reliable delivery.",
      link: "/docs/stakeholder-guides/for-government-customers",
      icon: "search",
      color: "#d97706", // Amber
    },
  ];

  const getIcon = (icon: string) => {
    const icons: Record<string, ReactNode> = {
      chart: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      building: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
      ),
      code: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      search: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      ),
    };
    return icons[icon] || icons.chart;
  };

  return (
    <section className={styles.pathways}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Find Your Path
        </Heading>
        <p className={styles.sectionSubtitle}>
          FOE serves different stakeholders differently. Start with the guide that matches your role.
        </p>
        <div className="row">
          {pathways.map((pathway, idx) => (
            <div key={idx} className="col col--3">
              <Link to={pathway.link} className={styles.pathwayCard} style={{'--pathway-color': pathway.color} as React.CSSProperties}>
                <div className={styles.pathwayIconWrapper}>
                  {getIcon(pathway.icon)}
                </div>
                <Heading as="h3">{pathway.title}</Heading>
                <p>{pathway.description}</p>
                <span className={styles.pathwayArrow}>
                  Learn more →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformationPreview(): ReactNode {
  return (
    <section className={styles.transformation}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          The Transformation Model
        </Heading>
        <p className={styles.sectionSubtitle}>
          Organizations evolve through distinct phases. Understanding where you are - and what's 
          required to progress - is the key to sustainable modernization.
        </p>
        <div className={styles.phaseTimeline}>
          <div className={styles.phaseItem}>
            <span className={clsx(styles.phaseBadge, styles.phase0)}>Phase 0</span>
            <strong>On-Prem</strong>
            <span>Manual, ticket-driven, risk avoidance via delay</span>
          </div>
          <div className={styles.phaseItem}>
            <span className={clsx(styles.phaseBadge, styles.phase1)}>Phase 1</span>
            <strong>Lift & Shift</strong>
            <span>Cloud adoption without cloud-native</span>
          </div>
          <div className={styles.phaseItem}>
            <span className={clsx(styles.phaseBadge, styles.phase2)}>Phase 2</span>
            <strong>Awkward Middle</strong>
            <span>Tools changed, disciplines didn't</span>
          </div>
          <div className={clsx(styles.phaseItem, styles.phaseHighlight)}>
            <span className={clsx(styles.phaseBadge, styles.phase3)}>Phase 3</span>
            <strong>Cloud Native Infrastructure</strong>
            <span>The existential shift - where most get stuck</span>
          </div>
          <div className={styles.phaseItem}>
            <span className={clsx(styles.phaseBadge, styles.phase4)}>Phase 4</span>
            <strong>Agentic Coding</strong>
            <span>AI agents, code abundance, new economics</span>
          </div>
          <div className={styles.phaseItem}>
            <span className={clsx(styles.phaseBadge, styles.phase5)}>Phase 5</span>
            <strong>Cloud Native Code</strong>
            <span>Standardized, composable, policy-governed</span>
          </div>
        </div>
        <div className="text--center" style={{marginTop: '2.5rem'}}>
          <Link
            className="button button--primary button--lg"
            to="/docs/transformation-model/overview">
            Explore the Transformation Model
          </Link>
        </div>
      </div>
    </section>
  );
}

function KeyInsight(): ReactNode {
  return (
    <section className={styles.keyInsight}>
      <div className={clsx('container', styles.keyInsightContent)}>
        <blockquote>
          <p className={styles.quoteText}>
            FOE is not about speed. FOE is about <strong>preserving human judgment 
            under increasing complexity and rate of change</strong>.
          </p>
          <p className={styles.quoteDescription}>
            As systems accelerate, human cognition becomes the limiting factor - not compute or tooling.
            FOE's three optimizations are cognitive load management strategies that let smart people 
            stay smart when the system gets too fast to think about directly.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Flow Optimized Engineering"
      description="A delivery doctrine for the agentic era. Optimize for understanding, fast feedback, and confidence.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <AudiencePathways />
        <KeyInsight />
        <TransformationPreview />
      </main>
    </Layout>
  );
}
