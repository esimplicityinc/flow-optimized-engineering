import type { ReactNode } from 'react';
import { useEffect } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './infographic.module.css';

// ============================================
// DATA: The 8 FOE Plays
// ============================================

interface Play {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  keyPoints: string[];
  checklist: string[];
  keyQuestions: string[];
  icon: ReactNode;
  color: string;
}

const plays: Play[] = [
  {
    id: 'speed',
    number: 1,
    title: 'Optimize for Observable Progress',
    subtitle: 'Speed is not the enemy. Surprise is.',
    quote: 'We don\'t optimize for output. We optimize for observable progress.',
    description: 'Work should become clearer as it moves forward, not more mysterious. If something is moving fast but nobody can explain what\'s happening, that\'s not speed. That\'s chaos with velocity. We remove fear by increasing legibility.',
    keyPoints: [
      'Changes are small enough to understand',
      'Progress is visible without asking',
      'When something goes wrong, you find out in hours, not weeks',
    ],
    checklist: [
      'Our work-in-progress is visible to stakeholders without meetings',
      'Each deployment represents a single, understandable change',
      'We can explain what changed and why within 60 seconds',
      'Progress metrics are automated, not manually compiled',
      'Surprises are treated as system failures, not individual failures',
    ],
    keyQuestions: [
      'Can a new team member understand what\'s happening in the next sprint by looking at our board?',
      'When was the last time leadership learned about a problem after it was expensive to fix?',
      'Do we celebrate "fast" or do we celebrate "clear"?',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: '#3B82F6',
  },
  {
    id: 'risk',
    number: 2,
    title: 'Make Risk Visible and Bounded',
    subtitle: 'Risk doesn\'t disappear when you slow down. It just hides longer.',
    quote: 'Slowing down feels safe. But slow cycles mean feedback arrives late and problems compound before detection.',
    description: 'Detect risk early through small changes, fast feedback, and visible work. Contain it locally so failures are bounded, not cascading. Make it explainable so every risk decision has a rationale that can be audited.',
    keyPoints: [
      'Small changes = contained mistakes, clear lessons',
      'Early signals = know before customers do',
      'Clear rollback paths = every change can be undone',
    ],
    checklist: [
      'Every deployment has a documented rollback plan',
      'Changes are small enough that rollback is straightforward',
      'Risk decisions are documented with their rationale',
      'We can demonstrate compliance without archaeology',
      'Near-misses are reported and analyzed, not ignored',
    ],
    keyQuestions: [
      'How do we currently detect problems: before or after users do?',
      'When something goes wrong, do we ask "who?" or "what did we learn?"',
      'Could we roll back today\'s deployment in under 10 minutes?',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    color: '#EF4444',
  },
  {
    id: 'traceability',
    number: 3,
    title: 'Make Work Traceable',
    subtitle: 'If work can\'t be traced, it can\'t be trusted.',
    quote: 'Each link in the chain (Intent → Change → Evidence → Outcome) should be followable by someone who wasn\'t there.',
    description: 'Every change has intent (we know why it exists), produces evidence (we can show what happened), and can be explained after the fact (auditable without archaeology). Traceability isn\'t overhead. It\'s how distributed teams stay coherent.',
    keyPoints: [
      'Commits reference intent (ticket, RFC, decision record)',
      'Changes are small enough to review meaningfully',
      'When someone asks "why is it like this?", there\'s an answer',
    ],
    checklist: [
      'Every commit links to a ticket or decision record',
      'Deployments are recorded with context and rationale',
      'We can trace any line of code to the decision that created it',
      'Onboarding doesn\'t require tribal knowledge',
      'Audits are boring because evidence already exists',
    ],
    keyQuestions: [
      'Can a new engineer understand why the code is structured this way?',
      'If asked to explain a change from 6 months ago, how long would it take?',
      'Do we treat documentation as overhead or as the cost of working at scale?',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    color: '#10B981',
  },
  {
    id: 'learning',
    number: 4,
    title: 'Learn Without Blame',
    subtitle: 'Learning requires feedback before damage becomes irreversible.',
    quote: 'Blame feels like accountability. It\'s actually the opposite.',
    description: 'When failure triggers punishment, people hide problems, risk goes underground, near-misses go unreported, and the same mistakes repeat. We analyze incidents, we don\'t prosecute them. "What did we learn?" is a real question, not a ritual.',
    keyPoints: [
      'Incidents are analyzed, not prosecuted',
      'Near-misses are reported and valued',
      'Improvements are implemented, not just documented',
    ],
    checklist: [
      'We conduct blameless postmortems after incidents',
      'Near-misses are reported voluntarily',
      'Postmortem action items are tracked to completion',
      'We ask "what happened?" not "who screwed up?"',
      'People feel safe saying "I don\'t know" or "I made a mistake"',
    ],
    keyQuestions: [
      'When was the last time someone was blamed for surfacing a problem early?',
      'Do people hide uncertainty or share it?',
      'Are our postmortems learning exercises or blame-assignment rituals?',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    color: '#8B5CF6',
  },
  {
    id: 'decisions',
    number: 5,
    title: 'Decide with Reversibility in Mind',
    subtitle: 'Confidence comes from knowing what will happen if we\'re wrong.',
    quote: 'Most decisions are two-way doors. We treat them that way.',
    description: 'Prefer reversible decisions. Know what failure looks like before it happens. Limit blast radius by design. Before committing: Can we reverse this? What\'s the worst case? How will we know if we\'re wrong? Who needs to know?',
    keyPoints: [
      'Reversible decisions move fast',
      'Irreversible decisions get more input',
      'Uncertainty is acknowledged, not hidden',
    ],
    checklist: [
      'We classify decisions as reversible or irreversible before making them',
      'Engineers make technical decisions without waiting for approval',
      'Decisions are documented with their rationale',
      'We define success/failure signals before acting',
      '"What\'s the rollback plan?" is a standard question',
    ],
    keyQuestions: [
      'Are we treating reversible decisions like irreversible ones (analysis paralysis)?',
      'Do engineers feel empowered to make decisions, or do they escalate by default?',
      'Can we articulate what would tell us we were wrong?',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    color: '#F59E0B',
  },
  {
    id: 'leaders',
    number: 6,
    title: 'Leaders Create Clarity',
    subtitle: 'Ask for evidence, not assurances.',
    quote: 'Your job is to set constraints and priorities, not to be a bottleneck.',
    description: 'Leaders ask for evidence, not assurances. "Show me" beats "trust me." They protect teams from surprise deadlines: commitments made without team input aren\'t commitments. They reward clarity over heroics, celebrating problems surfaced early and promoting people who make work legible.',
    keyPoints: [
      'Dashboards over status meetings',
      'Buffer time is risk management, not laziness',
      'Treat "I don\'t know yet" as valid status',
    ],
    checklist: [
      'Progress is visible without asking for status reports',
      'Deadlines involve team input before commitment',
      'We celebrate early problem detection, not heroic saves',
      'Leaders ask "what will tell us if it\'s not working?" not "is this going to work?"',
      'Routine decisions don\'t require leadership approval',
    ],
    keyQuestions: [
      'How often do leaders find out about problems after they\'re expensive to fix?',
      'Are we bottlenecking decisions that could be made locally?',
      'Do we reward people who surface problems or people who hide them until they\'re solved?',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: '#EC4899',
  },
  {
    id: 'engineers',
    number: 7,
    title: 'Engineers Own Their Work',
    subtitle: 'We show the receipts.',
    quote: 'Heroics mean the system failed. If you\'re regularly saving the day, we need to fix the day.',
    description: 'Engineers make their work legible: commits explain intent, decisions are documented. They surface risk early. "I\'m not sure about this" is valuable information. They prefer boring, repeatable solutions. Clever is expensive to maintain, conventional is easier to debug. Every claim has evidence. Every decision has a trail.',
    keyPoints: [
      'Write commits that explain intent',
      'Blockers reported today are cheaper than crises next week',
      'Every claim has receipts: evidence over assertion',
    ],
    checklist: [
      'Commits explain why, not just what',
      'Engineers speak up when something is risky or uncertain',
      'We prefer established patterns over clever solutions',
      'No system requires tribal knowledge to operate',
      'We can show evidence for any claim we make',
    ],
    keyQuestions: [
      'Can someone new understand our code without asking the person who wrote it?',
      'Do engineers hide uncertainty or share it?',
      'If asked to prove something works, can we show the receipts?',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
    color: '#06B6D4',
  },
  {
    id: 'government',
    number: 8,
    title: 'Build Trust Through Transparency',
    subtitle: 'Calm. Clear. Evidence-first.',
    quote: 'We\'re not asking you to trust us. We\'re showing you the system that makes trust unnecessary.',
    description: 'Government partners have been burned by hype. We show how change is controlled (small, traceable, reversible), how risk is detected (automated testing, monitoring, measurement), and how learning happens continuously (weekly improvement, not contract-cycle improvement).',
    keyPoints: [
      'Plain language over jargon',
      'Demonstrations over claims',
      '"Here\'s how you can verify" over "trust us"',
    ],
    checklist: [
      'We can demonstrate compliance without preparation',
      'Evidence of improvement is available on request',
      'We explain practices in government-friendly language',
      'Every claim has receipts',
      'We show working software, not slide decks',
    ],
    keyQuestions: [
      'Could we pass an audit today without scrambling?',
      'Do we explain our practices in terms stakeholders understand?',
      'Are we asking partners to trust us, or showing them evidence?',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-8h6v8" />
        <path d="M10 9h4" />
        <path d="M12 5v4" />
      </svg>
    ),
    color: '#6366F1',
  },
];

// ============================================
// COMPONENTS
// ============================================

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
      </div>
      <div className={styles.heroContent}>
        <img 
          src="/flow-optimized-engineering/img/foe-white-square-trans.png" 
          alt="FOE Logo" 
          className={styles.heroLogo}
        />
        <span className={styles.badge}>The FOE Playbook</span>
        <h1 className={styles.heroTitle}>
          Flow Optimized<br />Engineering
        </h1>
        <p className={styles.heroSubtitle}>
          8 plays for speed with coherence in the agentic era
        </p>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore the plays</span>
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
        <p className={styles.thesisQuote}>
          FOE preserves <strong>human judgment</strong> under increasing complexity and rate of change.
        </p>
        <p className={styles.thesisDescription}>
          As systems accelerate, human cognition becomes the limiting factor. 
          These 8 plays are cognitive load management strategies: practical behaviors 
          that create speed through clarity, not chaos.
        </p>
      </div>
    </section>
  );
}

function ThreeOptimizations(): ReactNode {
  const optimizations = [
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
    },
  ];

  return (
    <section className={styles.optimizations}>
      <div className={styles.optimizationsHeader}>
        <h2>The Three Optimizations</h2>
        <p>Every FOE practice serves at least one of these cognitive goals</p>
      </div>
      <div className={styles.optimizationsGrid}>
        {optimizations.map((opt) => (
          <div
            key={opt.id}
            className={styles.optimizationCard}
            style={{ '--opt-color': opt.color } as React.CSSProperties}
          >
            <div className={styles.optimizationIcon}>{opt.icon}</div>
            <h3>{opt.title}</h3>
            <p className={styles.optimizationSubtitle}>{opt.subtitle}</p>
            <p className={styles.optimizationDescription}>{opt.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlaylistNav(): ReactNode {
  return (
    <section className={styles.playlist} id="playlist">
      <div className={styles.playlistHeader}>
        <h2>The Plays</h2>
        <p>Each play answers one question. Click to jump to the full details.</p>
      </div>
      <div className={styles.playlistGrid}>
        {plays.map((play) => (
          <a
            key={play.id}
            href={`#play-${play.number}`}
            className={styles.playlistCard}
            style={{ '--play-color': play.color } as React.CSSProperties}
          >
            <div className={styles.playlistNumber}>Play {play.number}</div>
            <h3>{play.title}</h3>
            <div className={styles.playlistIcon}>{play.icon}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function PlaySection({ play }: { play: Play }): ReactNode {
  return (
    <section 
      className={styles.playSection} 
      id={`play-${play.number}`}
      style={{ '--play-color': play.color } as React.CSSProperties}
    >
      <div className={styles.playHeader}>
        <div className={styles.playIcon}>{play.icon}</div>
        <div className={styles.playMeta}>
          <span className={styles.playNumber}>Play {play.number}</span>
          <h2 className={styles.playTitle}>{play.title}</h2>
        </div>
      </div>

      <div className={styles.playContent}>
        <div className={styles.playIntro}>
          <div className={styles.playQuote}>
            <p><strong>{play.subtitle}</strong></p>
          </div>
          <p className={styles.playDescription}>{play.description}</p>
          
          <div className={styles.keyPoints}>
            <h4>What this looks like:</h4>
            <ul>
              {play.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.playDetails}>
          <div className={styles.checklist}>
            <h3>Play {play.number} Checklist</h3>
            <ul>
              {play.checklist.map((item, i) => (
                <li key={i}>
                  <span className={styles.checkIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.keyQuestions}>
            <h3>Play {play.number} Key Questions</h3>
            <ul>
              {play.keyQuestions.map((question, i) => (
                <li key={i}>{question}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.playNav}>
          <a href="#playlist" className={styles.playNavLink}>
            Return to playlist
          </a>
          <a href="#top" className={styles.playNavLink}>
            Return to top
          </a>
        </div>
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
        <h2>What Good Looks Like</h2>
        <p>DORA metrics for a mature FOE organization</p>
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
        <h2>Put this playbook into practice.</h2>
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

// ============================================
// MAIN COMPONENT
// ============================================

export default function Infographic(): ReactNode {
  useEffect(() => {
    document.documentElement.classList.add('hide-navbar');
    return () => {
      document.documentElement.classList.remove('hide-navbar');
    };
  }, []);

  return (
    <Layout
      title="FOE Playbook"
      description="The Flow Optimized Engineering Playbook: 8 plays for speed with coherence"
    >
      <Head>
        <style>{`
          .navbar { display: none !important; }
          .main-wrapper { padding-top: 0 !important; }
        `}</style>
      </Head>
      <main className={styles.infographic} id="top">
        <HeroSection />
        <ThesisBanner />
        <ThreeOptimizations />
        <PlaylistNav />
        {plays.map((play) => (
          <PlaySection key={play.id} play={play} />
        ))}
        <FlowMetrics />
        <CallToAction />
      </main>
    </Layout>
  );
}
