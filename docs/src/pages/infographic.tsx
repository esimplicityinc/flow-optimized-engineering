import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './infographic.module.css';

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
      </div>
      <div className={styles.heroContent}>
        <span className={styles.badge}>The Delivery Doctrine</span>
        <h1 className={styles.heroTitle}>
          Flow Optimized<br />Engineering
        </h1>
        <p className={styles.heroSubtitle}>
          Speed with coherence in the agentic era
        </p>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

function ThesisBanner(): ReactNode {
  return (
    <section className={styles.thesis}>
      <div className={styles.thesisContent}>
        <div className={styles.thesisIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <blockquote>
          FOE preserves <strong>human judgment</strong> under increasing complexity and rate of change.
        </blockquote>
        <p>
          As systems accelerate, human cognition becomes the limiting factor. 
          The three optimizations are cognitive load management strategies.
        </p>
      </div>
    </section>
  );
}

function ThreePrinciples(): ReactNode {
  const principles = [
    {
      id: 'understanding',
      title: 'Optimize for Understanding',
      subtitle: 'Before you can move fast, you must see clearly',
      description: 'Make the system legible. Reduce time to comprehension. Enable anyone to understand what exists, why it exists, and how it behaves.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      ),
      color: '#8B5CF6',
      practices: ['Architecture as Code', 'Visual Discovery', 'Consistent Conventions'],
    },
    {
      id: 'feedback',
      title: 'Optimize for Fast Feedback',
      subtitle: 'Learn before the damage compounds',
      description: 'Shorten the loop between action and consequence. Catch problems when context is fresh and fixes are cheap.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      color: '#F59E0B',
      practices: ['Continuous Integration', 'Automated Testing', 'Real-time Observability'],
    },
    {
      id: 'confidence',
      title: 'Optimize for Confidence',
      subtitle: 'Act decisively because the system has your back',
      description: 'Build guardrails that catch mistakes. Create safety nets that enable bold action without reckless risk.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      color: '#10B981',
      practices: ['GitOps Deployment', 'Automatic Rollback', 'Policy as Code'],
    },
  ];

  return (
    <section className={styles.principles}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>01</span>
        <h2>The Three Optimizations</h2>
        <p>Every FOE practice serves at least one of these cognitive goals</p>
      </div>
      <div className={styles.principlesGrid}>
        {principles.map((principle) => (
          <div
            key={principle.id}
            className={styles.principleCard}
            style={{ '--accent-color': principle.color } as React.CSSProperties}
          >
            <div className={styles.principleIcon}>{principle.icon}</div>
            <h3>{principle.title}</h3>
            <p className={styles.principleSubtitle}>{principle.subtitle}</p>
            <p className={styles.principleDescription}>{principle.description}</p>
            <div className={styles.practices}>
              {principle.practices.map((practice) => (
                <span key={practice} className={styles.practiceTag}>{practice}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CognitiveTriangle(): ReactNode {
  return (
    <section className={styles.triangle}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>02</span>
        <h2>The Cognitive Triangle</h2>
        <p>A continuous cycle of sensemaking and action</p>
      </div>
      <div className={styles.triangleContainer}>
        <div className={styles.triangleVisual}>
          <svg viewBox="0 0 400 350" className={styles.triangleSvg}>
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="understandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
              <linearGradient id="actGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="confirmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Triangle edges with animation */}
            <path
              d="M200 50 L350 280"
              stroke="url(#understandGrad)"
              strokeWidth="3"
              fill="none"
              className={styles.triangleEdge}
              strokeDasharray="5,5"
            />
            <path
              d="M350 280 L50 280"
              stroke="url(#actGrad)"
              strokeWidth="3"
              fill="none"
              className={styles.triangleEdge}
              strokeDasharray="5,5"
            />
            <path
              d="M50 280 L200 50"
              stroke="url(#confirmGrad)"
              strokeWidth="3"
              fill="none"
              className={styles.triangleEdge}
              strokeDasharray="5,5"
            />

            {/* Center circle */}
            <circle cx="200" cy="200" r="40" fill="#1E293B" filter="url(#glow)" />
            <text x="200" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">LEARN</text>
            <text x="200" y="212" textAnchor="middle" fill="#94A3B8" fontSize="10">& Iterate</text>

            {/* Node: Understand */}
            <g className={styles.triangleNode}>
              <circle cx="200" cy="50" r="45" fill="url(#understandGrad)" filter="url(#glow)" />
              <text x="200" y="45" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">UNDERSTAND</text>
              <text x="200" y="60" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">See the system</text>
            </g>

            {/* Node: Act */}
            <g className={styles.triangleNode}>
              <circle cx="350" cy="280" r="45" fill="url(#actGrad)" filter="url(#glow)" />
              <text x="350" y="275" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">ACT</text>
              <text x="350" y="290" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Make changes</text>
            </g>

            {/* Node: Confirm */}
            <g className={styles.triangleNode}>
              <circle cx="50" cy="280" r="45" fill="url(#confirmGrad)" filter="url(#glow)" />
              <text x="50" y="275" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">CONFIRM</text>
              <text x="50" y="290" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Verify results</text>
            </g>

            {/* Arrows showing flow */}
            <path d="M240 80 L310 230" stroke="#8B5CF6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
            <path d="M310 290 L90 290" stroke="#F59E0B" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />
            <path d="M80 240 L170 90" stroke="#10B981" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.6" />

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className={styles.triangleExplanation}>
          <div className={styles.cycleStep}>
            <span className={styles.stepNumber} style={{ background: '#8B5CF6' }}>1</span>
            <div>
              <strong>Understand</strong>
              <p>Before acting, comprehend what exists and why. Taxonomy, visualization, and documentation reduce cognitive load.</p>
            </div>
          </div>
          <div className={styles.cycleStep}>
            <span className={styles.stepNumber} style={{ background: '#F59E0B' }}>2</span>
            <div>
              <strong>Act</strong>
              <p>Make changes with confidence. Fast feedback loops and automated tests catch problems immediately.</p>
            </div>
          </div>
          <div className={styles.cycleStep}>
            <span className={styles.stepNumber} style={{ background: '#10B981' }}>3</span>
            <div>
              <strong>Confirm</strong>
              <p>Verify the change worked. Observability and monitoring close the loop and enable learning.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlaybookSection(): ReactNode {
  const playbooks = [
    {
      title: 'How We Think About Speed',
      description: 'Speed is a byproduct, not a goal. We optimize for sustainable velocity.',
      icon: '⚡',
      link: '/docs/playbook/how-we-think-about-speed',
      color: '#3B82F6',
    },
    {
      title: 'How We Manage Risk',
      description: 'Make risk visible, bounded, and reversible. Small bets, fast feedback.',
      icon: '🛡️',
      link: '/docs/playbook/how-we-manage-risk',
      color: '#EF4444',
    },
    {
      title: 'How Work Moves',
      description: 'Work should flow, not queue. Reduce handoffs, increase ownership.',
      icon: '🔄',
      link: '/docs/playbook/how-work-moves',
      color: '#10B981',
    },
    {
      title: 'How We Learn',
      description: 'Every incident is a gift. Blameless postmortems, shared understanding.',
      icon: '📚',
      link: '/docs/playbook/how-we-learn',
      color: '#8B5CF6',
    },
    {
      title: 'How We Decide',
      description: 'Decisions should be documented, reversible, and delegated to the edge.',
      icon: '🎯',
      link: '/docs/playbook/how-we-decide',
      color: '#F59E0B',
    },
    {
      title: 'Expectations for Leaders',
      description: 'Create clarity, remove obstacles, build institutions that outlast you.',
      icon: '👥',
      link: '/docs/playbook/expectations-for-leaders',
      color: '#EC4899',
    },
    {
      title: 'Expectations for Engineers',
      description: 'Own your work end-to-end. Seek feedback early. Leave things better.',
      icon: '💻',
      link: '/docs/playbook/expectations-for-engineers',
      color: '#06B6D4',
    },
    {
      title: 'Talking to Government',
      description: 'Translate FOE practices into language that builds trust with stakeholders.',
      icon: '🏛️',
      link: '/docs/playbook/talking-to-government',
      color: '#6366F1',
    },
  ];

  return (
    <section className={styles.playbook}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>03</span>
        <h2>The FOE Playbook</h2>
        <p>A field manual, not a philosophy book. Each page answers one question.</p>
      </div>
      <div className={styles.playbookGrid}>
        {playbooks.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={styles.playbookCard}
            style={{ '--card-color': item.color } as React.CSSProperties}
          >
            <span className={styles.playbookIcon}>{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className={styles.playbookArrow}>
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FlowMetrics(): ReactNode {
  const metrics = [
    { label: 'Deployment Frequency', value: 'Daily+', description: 'Ship small changes often' },
    { label: 'Lead Time', value: '<1 day', description: 'Commit to production' },
    { label: 'Change Failure Rate', value: '<5%', description: 'Deployments needing rollback' },
    { label: 'Time to Restore', value: '<1 hour', description: 'Incident to resolution' },
  ];

  return (
    <section className={styles.metrics}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>04</span>
        <h2>DORA Metrics That Matter</h2>
        <p>What good looks like in a mature FOE organization</p>
      </div>
      <div className={styles.metricsGrid}>
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.metricCard}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
            <span className={styles.metricDescription}>{metric.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CallToAction(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2>Ready to optimize for flow?</h2>
        <p>Start with the principles. Assess your maturity. Build institutions that compound.</p>
        <div className={styles.ctaButtons}>
          <Link to="/docs/intro/what-is-foe" className={styles.ctaPrimary}>
            Get Started
          </Link>
          <Link to="/docs/maturity-model/self-assessment" className={styles.ctaSecondary}>
            Self-Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Infographic(): ReactNode {
  return (
    <Layout
      title="FOE Infographic"
      description="A visual guide to Flow Optimized Engineering principles and playbook"
    >
      <main className={styles.infographic}>
        <HeroSection />
        <ThesisBanner />
        <ThreePrinciples />
        <CognitiveTriangle />
        <PlaybookSection />
        <FlowMetrics />
        <CallToAction />
      </main>
    </Layout>
  );
}
