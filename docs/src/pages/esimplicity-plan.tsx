import type { ReactNode } from 'react';
import { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './esimplicity-plan.module.css';

// ============================================
// TYPES
// ============================================

type Status = 'active' | 'in-progress' | 'planned' | 'established';

interface Initiative {
  name: string;
  description: string;
  evidence: string;
}

interface TechComponent {
  name: string;
  purpose: string;
  status: Status;
}

// ============================================
// DATA
// ============================================

const peopleInitiatives: Initiative[] = [
  {
    name: 'Identify Merge Ambassadors',
    description: 'Find people already doing multi-role work; make them visible and celebrated',
    evidence: '5+ ambassadors identified per quarter',
  },
  {
    name: 'Role Convergence Training',
    description: 'Teach product thinking to devs, architecture to ops, design to everyone',
    evidence: 'Training modules created; completion tracked',
  },
  {
    name: 'Incentive Alignment',
    description: 'Review recognition and rewards; shift from depth-only to breadth+depth',
    evidence: 'Reward criteria updated to include cross-role contribution',
  },
  {
    name: 'Small Craft Guilds',
    description: 'Implement 1 senior + 2 juniors model with AI leverage',
    evidence: 'Guild formation rate; knowledge distribution metrics',
  },
  {
    name: 'Pairing & Rotation',
    description: 'Structured pairing across traditional role boundaries',
    evidence: 'Hours of cross-role pairing; skills spread',
  },
];

const processInitiatives: Initiative[] = [
  {
    name: 'Field Guide Adoption',
    description: 'Make the hypothesis → experiment → evidence cycle real and habitual',
    evidence: 'Active observations created per quarter',
  },
  {
    name: 'Method Maturity Tracking',
    description: 'Every practice claims a maturity level; evidence backs it or downgrades it',
    evidence: 'Methods at each maturity level; movement tracked',
  },
  {
    name: 'TRB as Learning Engine',
    description: 'Technical Review Board drives visibility and learning, not gatekeeping',
    evidence: 'Reviews that produce observations; learning artifacts',
  },
  {
    name: 'Definition of Done 2.0',
    description: 'Standards that make merged roles safe; cross-role checklist included',
    evidence: 'DoD includes evidence requirements',
  },
  {
    name: 'Retrospective → Evidence',
    description: 'Every retro produces Field Guide-worthy learnings, not just action items',
    evidence: 'Retros with observation output',
  },
];

const trackA: TechComponent[] = [
  { name: 'Agent Tooling', purpose: 'AI coding with built-in guardrails and receipts', status: 'active' },
  { name: 'Local-First Architecture', purpose: 'Audit-friendly, offline-capable agent infrastructure', status: 'in-progress' },
  { name: '.agent/ Convention', purpose: 'Tool-agnostic agent definitions in every repo', status: 'established' },
  { name: 'Wizard-Style Interfaces', purpose: 'Hide complexity for non-technical users, preserve capability', status: 'planned' },
];

const trackB: TechComponent[] = [
  { name: 'PRIMA', purpose: 'Productized surface for government delivery teams', status: 'active' },
  { name: 'Shine', purpose: 'Practice lens that surfaces work without complexity', status: 'active' },
  { name: 'Control Tower', purpose: 'Operational visibility for platform management', status: 'active' },
  { name: 'BD System Integration', purpose: 'Corporate systems running on KATALYST', status: 'in-progress' },
];

const trackC: TechComponent[] = [
  { name: 'KATALYST Platform', purpose: 'Cloud-native infrastructure (K8s, ArgoCD, observability)', status: 'active' },
  { name: 'KATALYST Taxonomy', purpose: 'Architecture as code with visual discovery', status: 'active' },
  { name: 'KATALYST BDD Test', purpose: 'Multi-layer verification (API, UI, TUI)', status: 'active' },
  { name: 'Observability Stack', purpose: 'Grafana, Prometheus, Loki, Tempo integration', status: 'active' },
];

// ============================================
// COMPONENTS
// ============================================

function StatusBadge({ status }: { status: Status }): ReactNode {
  const labels: Record<Status, string> = {
    active: 'Active',
    'in-progress': 'In Progress',
    planned: 'Planned',
    established: 'Established',
  };

  return <span className={`${styles.statusBadge} ${styles[status]}`}>{labels[status]}</span>;
}

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <Link to="/esimplicity-strategy" className={styles.backLink}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Strategy
        </Link>
        <span className={styles.heroBadge}>Implementation Roadmap v1.0</span>
        <h1 className={styles.heroTitle}>The Plan</h1>
        <p className={styles.heroSubtitle}>From Strategy to Action</p>
        <p className={styles.heroDescription}>
          How we execute Flow Optimized Engineering at eSimplicity through three lanes:
          helping people merge roles, building epistemic visibility, and deploying enabling technology.
        </p>
      </div>
    </section>
  );
}

function RoadmapVisualization(): ReactNode {
  return (
    <section className={styles.roadmapSection}>
      <div className={styles.roadmapContainer}>
        {/* Lane Labels */}
        <div className={styles.roadmapLabels}>
          <div className={styles.roadmapLabel}>
            <span className={styles.labelIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <span className={styles.labelText}>People</span>
          </div>
          <div className={styles.roadmapLabel}>
            <span className={styles.labelIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <span className={styles.labelText}>Process</span>
          </div>
          <div className={styles.roadmapLabel}>
            <span className={styles.labelIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
            <span className={styles.labelText}>Tech</span>
          </div>
        </div>

        {/* Swimlanes */}
        <div className={styles.swimlanes}>
          {/* People Lane */}
          <div className={styles.swimlane} data-lane="people">
            <div className={styles.swimlaneTrack}>
              <div className={styles.roadmapItem}>Merge Ambassadors</div>
              <div className={styles.roadmapItem}>Role Convergence Training</div>
              <div className={styles.roadmapItem}>Incentive Alignment</div>
              <div className={styles.roadmapItem}>Small Craft Guilds</div>
              <div className={styles.roadmapItem}>Pairing & Rotation</div>
            </div>
          </div>

          {/* Process Lane */}
          <div className={styles.swimlane} data-lane="process">
            <div className={styles.swimlaneTrack}>
              <div className={styles.roadmapItem}>Field Guide Adoption</div>
              <div className={styles.roadmapItem}>Method Maturity</div>
              <div className={styles.roadmapItem}>TRB as Learning</div>
              <div className={styles.roadmapItem}>DoD 2.0</div>
              <div className={styles.roadmapItem}>Retro → Evidence</div>
            </div>
          </div>

          {/* Tech Lane */}
          <div className={styles.swimlane} data-lane="tech">
            <div className={styles.swimlaneTrack}>
              <div className={styles.roadmapItemGroup}>
                <span className={styles.trackLabel}>Merge Enablers</span>
                <div className={styles.roadmapItem}>Agent Tooling</div>
                <div className={styles.roadmapItem}>.agent/ Convention</div>
              </div>
              <div className={styles.roadmapItemGroup}>
                <span className={styles.trackLabel}>Demand Systems</span>
                <div className={styles.roadmapItem}>PRIMA</div>
                <div className={styles.roadmapItem}>Shine</div>
              </div>
              <div className={styles.roadmapItemGroup}>
                <span className={styles.trackLabel}>Mission Systems</span>
                <div className={styles.roadmapItem}>KATALYST</div>
                <div className={styles.roadmapItem}>BDD Test</div>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Arrow */}
        <div className={styles.flowIndicator}>
          <span>Continuous Execution</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

interface LaneSectionProps {
  id: string;
  number: number;
  title: string;
  thesis: string;
  children: ReactNode;
  signals: string[];
}

function LaneSection({ id, number, title, thesis, children, signals }: LaneSectionProps): ReactNode {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section id={id} className={styles.laneSection}>
      <button
        className={styles.laneSectionHeader}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className={styles.laneSectionTitle}>
          <span className={styles.laneNumber}>Lane {number}</span>
          <h2>{title}</h2>
        </div>
        <svg
          className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isExpanded && (
        <div className={styles.laneSectionContent}>
          <blockquote className={styles.thesis}>{thesis}</blockquote>
          {children}
          <div className={styles.successSignals}>
            <h4>Success Signals</h4>
            <ul>
              {signals.map((signal, i) => (
                <li key={i}>{signal}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

function InitiativeTable({ initiatives }: { initiatives: Initiative[] }): ReactNode {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.initiativeTable}>
        <thead>
          <tr>
            <th>Initiative</th>
            <th>What We'll Do</th>
            <th>Evidence of Success</th>
          </tr>
        </thead>
        <tbody>
          {initiatives.map((init, i) => (
            <tr key={i}>
              <td className={styles.initiativeName}>{init.name}</td>
              <td>{init.description}</td>
              <td className={styles.evidence}>{init.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TechTrack({ title, description, components }: { title: string; description: string; components: TechComponent[] }): ReactNode {
  return (
    <div className={styles.techTrack}>
      <h4 className={styles.trackTitle}>{title}</h4>
      <p className={styles.trackDescription}>{description}</p>
      <div className={styles.tableWrapper}>
        <table className={styles.techTable}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Purpose</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {components.map((comp, i) => (
              <tr key={i}>
                <td className={styles.componentName}>{comp.name}</td>
                <td>{comp.purpose}</td>
                <td><StatusBadge status={comp.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExecutionRhythm(): ReactNode {
  return (
    <section className={styles.rhythmSection}>
      <h2 className={styles.sectionTitle}>Execution Rhythm</h2>
      <p className={styles.rhythmIntro}>
        This is a rolling plan, not a fixed roadmap. Every quarter, we execute, gather evidence, and adjust.
      </p>

      <div className={styles.rhythmVisual}>
        <div className={styles.rhythmPhase}>
          <div className={styles.phaseWeeks}>Week 1-4</div>
          <div className={styles.phaseTitle}>Execute</div>
          <div className={styles.phaseDesc}>Run initiatives across all three lanes</div>
        </div>
        <div className={styles.rhythmArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div className={styles.rhythmPhase}>
          <div className={styles.phaseWeeks}>Week 5-8</div>
          <div className={styles.phaseTitle}>Gather</div>
          <div className={styles.phaseDesc}>Collect evidence: what worked, what didn't</div>
        </div>
        <div className={styles.rhythmArrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div className={styles.rhythmPhase}>
          <div className={styles.phaseWeeks}>Week 9-12</div>
          <div className={styles.phaseTitle}>Adjust</div>
          <div className={styles.phaseDesc}>Retrospective, update plan, feed Field Guide</div>
        </div>
      </div>

      <div className={styles.loopBox}>
        <h4>The Loop</h4>
        <ol>
          <li><strong>Execute</strong> initiatives from all three lanes</li>
          <li><strong>Gather</strong> evidence (metrics, observations, feedback)</li>
          <li><strong>Document</strong> in Field Guide (observations, method updates)</li>
          <li><strong>Adjust</strong> plan based on evidence</li>
          <li><strong>Repeat</strong> at higher capability</li>
        </ol>
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to dive deeper?</h2>
        <div className={styles.ctaButtons}>
          <Link to="/esimplicity-strategy" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
            Read the Strategy
          </Link>
          <Link to="/docs/field-guides/contributing-observations" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            Explore the Field Guide
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function ESimplicityPlan(): ReactNode {
  return (
    <Layout
      title="eSimplicity FOE Plan"
      description="Implementation plan for Flow Optimized Engineering at eSimplicity"
    >
      <main className={styles.planPage}>
        <HeroSection />
        <RoadmapVisualization />

        <div className={styles.lanesContainer}>
          <LaneSection
            id="people"
            number={1}
            title="People — The Merge"
            thesis="AI is collapsing the boundaries between product, design, architecture, development, and operations. People who can work across these domains will thrive. Our job is to help everyone become multi-role capable and reward those who already are."
            signals={[
              '↑ People comfortable operating across 2+ traditional roles',
              '↓ "That\'s not my job" friction in cross-functional work',
              '↑ Issues resolved without handoffs between specialists',
              '↑ Knowledge distribution (fewer single points of failure)',
            ]}
          >
            <InitiativeTable initiatives={peopleInitiatives} />
          </LaneSection>

          <LaneSection
            id="process"
            number={2}
            title="Process — Epistemic Visibility"
            thesis="When roles merge, risk increases. The Field Guide system provides the epistemic visibility that makes speed safe: every practice is a hypothesis, every outcome is data, and truth compounds over time."
            signals={[
              '↑ Methods moving up maturity levels (validated → proven)',
              '↑ Observations documented per quarter',
              '↓ Decisions made without traceable evidence',
              '↑ Time from learning to documented knowledge',
            ]}
          >
            <InitiativeTable initiatives={processInitiatives} />
          </LaneSection>

          <LaneSection
            id="tech"
            number={3}
            title="Tech — Three Tracks"
            thesis="Technology alone doesn't create change, but the right technology makes change possible. We invest in three tracks: tools that help people merge roles, systems that create new patterns of demand, and infrastructure that delivers mission value."
            signals={[
              '↑ Teams actively using merge enablers (agent tooling)',
              '↑ Demand systems deployed and adopted',
              '↑ Mission systems delivering value on KATALYST',
              '↓ Time to deploy new capabilities',
            ]}
          >
            <TechTrack
              title="Track A: Merge Enablers"
              description="Tech that helps people work across traditional role boundaries"
              components={trackA}
            />
            <TechTrack
              title="Track B: Demand Systems"
              description="Tech that creates new ways of working and new patterns of demand"
              components={trackB}
            />
            <TechTrack
              title="Track C: Mission Systems"
              description="Tech that delivers mission value through disciplined infrastructure"
              components={trackC}
            />
          </LaneSection>
        </div>

        <ExecutionRhythm />
        <CTASection />
      </main>
    </Layout>
  );
}
