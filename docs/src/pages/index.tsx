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
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p style={{fontSize: '1.1rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto 2rem'}}>
          A delivery doctrine that optimizes engineering organizations for flow—the repeatable 
          movement from idea to change to verification to release to learning—without sacrificing 
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
            style={{marginLeft: '1rem', color: 'white', borderColor: 'white'}}
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
      icon: "📊",
    },
    {
      title: "I'm an Engineering Leader",
      description: "Learn how to build institutions, scale practices, and implement FOE across your organization.",
      link: "/docs/stakeholder-guides/for-engineering-leaders",
      icon: "🏗️",
    },
    {
      title: "I'm an Engineer",
      description: "Discover the paved paths, feedback loops, and guardrails that let you ship with confidence.",
      link: "/docs/stakeholder-guides/for-engineers",
      icon: "💻",
    },
    {
      title: "I'm Evaluating Vendors",
      description: "Understand what to look for in engineering maturity and how FOE principles create reliable delivery.",
      link: "/docs/stakeholder-guides/for-government-customers",
      icon: "🔍",
    },
  ];

  return (
    <section className={styles.pathways}>
      <div className="container">
        <Heading as="h2" className="text--center" style={{marginBottom: '2rem'}}>
          Find Your Path
        </Heading>
        <div className="row">
          {pathways.map((pathway, idx) => (
            <div key={idx} className="col col--3">
              <Link to={pathway.link} className={styles.pathwayCard}>
                <span className={styles.pathwayIcon}>{pathway.icon}</span>
                <Heading as="h3">{pathway.title}</Heading>
                <p>{pathway.description}</p>
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
        <Heading as="h2" className="text--center" style={{marginBottom: '1rem'}}>
          The Transformation Model
        </Heading>
        <p className="text--center" style={{maxWidth: '700px', margin: '0 auto 2rem'}}>
          Organizations evolve through distinct phases. Understanding where you are—and what's 
          required to progress—is the key to sustainable modernization.
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
            <span>The existential shift—where most get stuck</span>
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
        <div className="text--center" style={{marginTop: '2rem'}}>
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
      <div className="container">
        <blockquote>
          <p style={{fontSize: '1.5rem', fontWeight: 500}}>
            "FOE is not about speed. FOE is about <strong>preserving human judgment 
            under increasing complexity and rate of change</strong>."
          </p>
          <p style={{fontSize: '1rem', opacity: 0.8}}>
            As systems accelerate, human cognition becomes the limiting factor—not compute or tooling.
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
