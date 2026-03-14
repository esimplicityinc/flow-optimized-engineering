import React from 'react';
import {
  ArrowRight,
  Shield,
  User,
  RefreshCw,
  Target,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Layers,
  ChevronRight,
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle,
  Package,
  Users,
} from 'lucide-react';

/**
 * FOE Proof Strategy Slides
 * 
 * A 4-slide executive deck for Keith that reframes FOE from broad doctrine
 * into a practical, leadership-friendly proof strategy.
 * 
 * Thesis: We are not asking for enterprise approval of a hypothetical FOE
 * rollout; we are asking for permission to prove a practical FOE implementation
 * model in aligned programs, measure it, and return with evidence.
 * 
 * Design: Clean corporate. Muted professional palette. Minimal text.
 * Simple diagrams over dense bullets. One main visual per slide.
 */

// =============================================================================
// DESIGN SYSTEM — Muted, Professional, Leadership-Oriented
// =============================================================================

const colors = {
  // Core
  black: '#0F172A',
  white: '#FFFFFF',

  // Slate palette — muted, corporate
  slate900: '#0F172A',
  slate800: '#1E293B',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748B',
  slate400: '#94A3B8',
  slate300: '#CBD5E1',
  slate200: '#E2E8F0',
  slate100: '#F1F5F9',
  slate50: '#F8FAFC',

  // Primary — steel blue (trustworthy, corporate)
  blue700: '#1D4ED8',
  blue600: '#2563EB',
  blue500: '#3B82F6',
  blue400: '#60A5FA',
  blue100: '#DBEAFE',
  blue50: '#EFF6FF',

  // Secondary — muted teal (FOE echo, not dominant)
  teal700: '#0F766E',
  teal600: '#0D9488',
  teal100: '#CCFBF1',
  teal50: '#F0FDFA',

  // Semantic — used sparingly
  green600: '#059669',
  green100: '#D1FAE5',
  green50: '#ECFDF5',
  amber600: '#D97706',
  amber100: '#FEF3C7',
  amber50: '#FFFBEB',
};

const sp = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
};

const font = {
  display: { fontSize: '2.0em', fontWeight: 800 as const, lineHeight: 1.08, letterSpacing: '-0.03em' },
  h1: { fontSize: '1.4em', fontWeight: 700 as const, lineHeight: 1.15, letterSpacing: '-0.02em' },
  h2: { fontSize: '1.0em', fontWeight: 700 as const, lineHeight: 1.2, letterSpacing: '-0.01em' },
  h3: { fontSize: '0.78em', fontWeight: 600 as const, lineHeight: 1.25 },
  body: { fontSize: '0.68em', lineHeight: 1.55 },
  small: { fontSize: '0.6em', lineHeight: 1.45 },
  tiny: { fontSize: '0.52em', lineHeight: 1.35 },
};


// =============================================================================
// SLIDE 1: From FOE Doctrine to Program-Level Proof
// =============================================================================

function TitleSlide() {
  const flowNodes = [
    { label: 'FOE Doctrine', sub: 'Define what good looks like', icon: BookOpen, accent: colors.blue600 },
    { label: 'Aligned Pilots', sub: 'Prove in real programs', icon: Target, accent: colors.teal600 },
    { label: 'Real Evidence', sub: 'Measure before & after', icon: BarChart3, accent: colors.blue600 },
    { label: 'Broader Adoption', sub: 'Scale based on results', icon: TrendingUp, accent: colors.teal600 },
  ];

  return (
    <section data-background={colors.slate900} className="dark-bg">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Title block */}
        <div style={{ textAlign: 'center', marginBottom: sp[8] }}>
          <h1 style={{
            ...font.display,
            color: colors.white,
            marginBottom: sp[3],
          }}>
            From FOE Doctrine<br />
            <span style={{ color: colors.blue400 }}>to Program-Level Proof</span>
          </h1>

          <p style={{
            ...font.body,
            color: colors.slate400,
            maxWidth: '700px',
            margin: '0 auto',
            marginBottom: sp[5],
          }}>
            A practical strategy for proving engineering maturity improvements<br />
            in real delivery environments — then scaling based on evidence
          </p>

          {/* Audience / Outcome / Non-goal row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: sp[3],
            maxWidth: '900px',
            margin: '0 auto',
            marginBottom: sp[10],
          }}>
            {[
              { label: 'Audience', value: 'Program leaders, engineering leads, delivery leadership' },
              { label: 'Outcome', value: 'A repeatable model for proving FOE, then deciding on broader adoption' },
              { label: 'Non-goal', value: 'Immediate enterprise-wide rollout or top-down mandate' },
            ].map((item, idx) => (
              <div key={idx} className="fragment" style={{
                padding: `${sp[3]} ${sp[4]}`,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: `1px solid rgba(255,255,255,0.08)`,
                textAlign: 'left',
              }}>
                <div style={{
                  ...font.tiny,
                  color: idx === 2 ? colors.amber600 : colors.blue400,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  marginBottom: sp[1],
                }}>{item.label}</div>
                <div style={{ ...font.small, color: colors.slate300 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow diagram */}
        <div className="fragment" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0',
          maxWidth: '1050px',
          margin: '0 auto',
        }}>
          {flowNodes.map((node, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: `0 ${sp[2]}`,
                }}>
                  <ChevronRight size={28} color={colors.slate500} strokeWidth={2.5} />
                </div>
              )}
              <div style={{
                flex: 1,
                padding: `${sp[4]} ${sp[3]}`,
                background: idx === flowNodes.length - 1
                  ? `linear-gradient(135deg, ${colors.blue600}18, ${colors.teal600}18)`
                  : 'rgba(255,255,255,0.04)',
                borderRadius: '10px',
                border: idx === flowNodes.length - 1
                  ? `1.5px solid ${colors.blue400}40`
                  : `1px solid rgba(255,255,255,0.08)`,
                textAlign: 'center' as const,
              }}>
                <node.icon
                  size={24}
                  color={node.accent}
                  style={{ marginBottom: sp[2] }}
                />
                <div style={{
                  ...font.h3,
                  color: colors.white,
                  marginBottom: sp[1],
                }}>{node.label}</div>
                <div style={{
                  ...font.tiny,
                  color: colors.slate400,
                }}>{node.sub}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <aside className="notes">
        {`This is not a proposal for an immediate company-wide FOE rollout.

This is a proposal to prove FOE in practice — in a few aligned programs where leadership support already exists — generate real evidence, and then decide whether broader adoption is warranted.

FOE is a doctrine. It defines what good engineering looks like universally. But the specific "what" — the exact practices, tools, and priorities — should be derived by strong engineering leaders in local program context, not prescribed centrally.

The right move is pilot-first, evidence-first, then broader adoption if earned.`}
      </aside>
    </section>
  );
}


// =============================================================================
// SLIDE 2: Practical Implementation Model
// =============================================================================

function ImplementationModelSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.slate900, marginBottom: sp[2] }}>
        Prove It Where Leadership Is Aligned
      </h2>
      <p style={{ ...font.body, color: colors.slate500, marginBottom: sp[6] }}>
        Implementation starts in 1–2 programs with existing support — delivery continues while improvements layer in
      </p>

      {/* Swimlane diagram */}
      <div className="fragment" style={{
        maxWidth: '1050px',
        margin: '0 auto',
        marginBottom: sp[6],
      }}>
        {/* Timeline header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr 1fr 1fr 1fr',
          gap: sp[1],
          marginBottom: sp[2],
        }}>
          <div />
          {['Month 1–2', 'Month 3–4', 'Month 5–6', 'Month 7+'].map((label, idx) => (
            <div key={idx} style={{
              ...font.tiny,
              color: colors.slate400,
              fontWeight: 600,
              textAlign: 'center' as const,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.06em',
            }}>{label}</div>
          ))}
        </div>

        {/* Lane 1: Leadership Support */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr',
          gap: sp[1],
          marginBottom: sp[2],
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: sp[2],
            padding: `0 ${sp[2]}`,
          }}>
            <Shield size={16} color={colors.blue600} />
            <span style={{ ...font.small, fontWeight: 600, color: colors.slate700 }}>Leadership Support</span>
          </div>
          <div style={{
            background: colors.blue50,
            border: `1.5px solid ${colors.blue600}30`,
            borderRadius: '6px',
            padding: `${sp[2]} ${sp[4]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ ...font.small, color: colors.blue700, fontWeight: 600 }}>
              Sponsor protection + review cadence throughout
            </span>
          </div>
        </div>

        {/* Lane 2: Delivery Continues */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr',
          gap: sp[1],
          marginBottom: sp[2],
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: sp[2],
            padding: `0 ${sp[2]}`,
          }}>
            <Activity size={16} color={colors.teal600} />
            <span style={{ ...font.small, fontWeight: 600, color: colors.slate700 }}>Delivery Continues</span>
          </div>
          <div style={{
            background: colors.teal50,
            border: `1.5px solid ${colors.teal600}30`,
            borderRadius: '6px',
            padding: `${sp[2]} ${sp[4]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ ...font.small, color: colors.teal700, fontWeight: 600 }}>
              Real work, real constraints — sustainable pace, not paused delivery
            </span>
          </div>
        </div>

        {/* Lane 3: FOE Improvements (phased blocks) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr 1fr 1fr 1fr',
          gap: sp[1],
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: sp[2],
            padding: `0 ${sp[2]}`,
          }}>
            <Layers size={16} color={colors.slate600} />
            <span style={{ ...font.small, fontWeight: 600, color: colors.slate700 }}>FOE Improvements</span>
          </div>
          {[
            { label: 'Baseline', desc: 'Measure current state', color: colors.slate600, bg: colors.slate100, border: colors.slate300 },
            { label: 'Targeted Changes', desc: '1–2 friction reducers', color: colors.blue700, bg: colors.blue50, border: `${colors.blue600}40` },
            { label: 'Visible Wins', desc: 'Lightweight institutions', color: colors.teal700, bg: colors.teal50, border: `${colors.teal600}40` },
            { label: 'Measured Results', desc: 'Evidence package', color: colors.green600, bg: colors.green50, border: `${colors.green600}40` },
          ].map((phase, idx) => (
            <div key={idx} style={{
              background: phase.bg,
              border: `1.5px solid ${phase.border}`,
              borderRadius: '6px',
              padding: sp[2],
              textAlign: 'center' as const,
            }}>
              <div style={{ ...font.small, fontWeight: 700, color: phase.color, marginBottom: '2px' }}>
                {phase.label}
              </div>
              <div style={{ ...font.tiny, color: colors.slate500 }}>
                {phase.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key principles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: sp[3],
        maxWidth: '1050px',
        margin: '0 auto',
      }}>
        {[
          {
            icon: Target,
            title: 'Start where support exists',
            desc: '1–2 aligned civilian services programs with leadership already bought in',
            color: colors.blue600,
          },
          {
            icon: Users,
            title: 'Local leads derive the "what"',
            desc: 'FOE defines principles and guardrails — program engineering leads choose the implementation',
            color: colors.teal600,
          },
          {
            icon: Clock,
            title: 'Delivery never stops',
            desc: 'Improvements layer in alongside real work — sustainable rate, not a pause for transformation',
            color: colors.slate600,
          },
        ].map((item, idx) => (
          <div key={idx} className="fragment" style={{
            padding: sp[4],
            background: colors.slate50,
            borderRadius: '8px',
            borderTop: `3px solid ${item.color}`,
            textAlign: 'left' as const,
          }}>
            <item.icon size={20} color={item.color} style={{ marginBottom: sp[2] }} />
            <h3 style={{ ...font.h3, color: colors.slate900, margin: `0 0 ${sp[1]} 0` }}>
              {item.title}
            </h3>
            <p style={{ ...font.small, color: colors.slate600, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <aside className="notes">
        {`The implementation model is pragmatic: start in 1–2 programs where leadership alignment already exists in civilian services.

Delivery continues. This is not "stop everything and do FOE." It's "continue delivering at a sustainable rate while layering in targeted improvements."

The key insight: centrally prescribing the full implementation plan for every program is unrealistic and undesirable. The center defines principles, guardrails, and evidence expectations. Pilots determine practical implementation patterns.

The program engineering lead — not a central committee — derives the context-specific "what." This respects the reality that every program has different agencies, contracts, team compositions, and constraints.

Focus early work on: baseline metrics, 1–2 friction-reducing improvements, lightweight institutions (like a review cadence), and visible wins that build credibility.`}
      </aside>
    </section>
  );
}


// =============================================================================
// SLIDE 3: What We Need from Leadership
// =============================================================================

function LeadershipSupportSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.slate900, marginBottom: sp[2] }}>
        What We Need from Leadership
      </h2>
      <p style={{ ...font.body, color: colors.slate500, marginBottom: sp[6] }}>
        Not enterprise-wide transformation — limited pilots with clear structure
      </p>

      {/* Three-box support model */}
      <div className="fragment" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: sp[4],
        maxWidth: '1000px',
        margin: '0 auto',
        marginBottom: sp[6],
        position: 'relative' as const,
      }}>
        {/* Box 1: Sponsor / Air Cover */}
        <div style={{
          padding: sp[5],
          background: colors.blue50,
          borderRadius: '10px',
          border: `2px solid ${colors.blue600}25`,
          textAlign: 'center' as const,
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: colors.blue600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            marginBottom: sp[3],
          }}>
            <Shield size={26} color={colors.white} />
          </div>
          <h3 style={{ ...font.h2, color: colors.blue700, margin: `0 0 ${sp[2]} 0` }}>
            Sponsor &<br />Air Cover
          </h3>
          <p style={{ ...font.small, color: colors.slate600, margin: 0 }}>
            Protect pilot capacity from<br />
            competing priorities
          </p>
        </div>

        {/* Box 2: Program Lead Autonomy */}
        <div style={{
          padding: sp[5],
          background: colors.teal50,
          borderRadius: '10px',
          border: `2px solid ${colors.teal600}25`,
          textAlign: 'center' as const,
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: colors.teal600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            marginBottom: sp[3],
          }}>
            <User size={26} color={colors.white} />
          </div>
          <h3 style={{ ...font.h2, color: colors.teal700, margin: `0 0 ${sp[2]} 0` }}>
            Program Lead<br />Autonomy
          </h3>
          <p style={{ ...font.small, color: colors.slate600, margin: 0 }}>
            Local engineering leads<br />
            derive the implementation
          </p>
        </div>

        {/* Box 3: Review & Evidence Loop */}
        <div style={{
          padding: sp[5],
          background: colors.slate50,
          borderRadius: '10px',
          border: `2px solid ${colors.slate300}`,
          textAlign: 'center' as const,
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: colors.slate600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            marginBottom: sp[3],
          }}>
            <RefreshCw size={26} color={colors.white} />
          </div>
          <h3 style={{ ...font.h2, color: colors.slate700, margin: `0 0 ${sp[2]} 0` }}>
            Review &<br />Evidence Loop
          </h3>
          <p style={{ ...font.small, color: colors.slate600, margin: 0 }}>
            Technical review board for<br />
            alignment, not bottleneck
          </p>
        </div>

        {/* Connecting arrows between boxes */}
        <div style={{
          position: 'absolute' as const,
          top: '50%',
          left: 'calc(33.33% - 4px)',
          transform: 'translateY(-50%)',
        }}>
          <ArrowRight size={20} color={colors.slate300} />
        </div>
        <div style={{
          position: 'absolute' as const,
          top: '50%',
          left: 'calc(66.66% - 4px)',
          transform: 'translateY(-50%)',
        }}>
          <ArrowRight size={20} color={colors.slate300} />
        </div>
      </div>

      {/* Specific asks */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: sp[4],
        background: colors.white,
        borderRadius: '8px',
        border: `1px solid ${colors.slate200}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          ...font.tiny,
          color: colors.slate400,
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.08em',
          marginBottom: sp[3],
        }}>Specific asks</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: `${sp[2]} ${sp[6]}`,
        }}>
          {[
            'Approval for 1–2 limited pilot programs — not enterprise rollout',
            'Protected capacity and time for improvement work alongside delivery',
            'Permission to baseline and report metrics before and after',
            'Support for local adaptation — no single central template forced',
            'Technical review board used as alignment mechanism, not gate',
          ].map((ask, idx) => (
            <div key={idx} className="fragment" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: sp[2],
            }}>
              <CheckCircle2 size={16} color={colors.blue600} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ ...font.small, color: colors.slate700 }}>{ask}</span>
            </div>
          ))}
        </div>
      </div>

      <aside className="notes">
        {`Leadership is not being asked to approve a company-wide transformation. They are being asked to authorize limited pilots with clear structure.

Three parts to the support model:

1. Sponsor and air cover — someone at the leadership level protects the pilot's capacity from being raided by competing priorities. Without this, improvement work always loses to urgent delivery.

2. Program engineering lead autonomy — the people closest to the work decide what specific practices to implement. The center provides principles and guardrails, not a step-by-step playbook for every program.

3. Review and evidence loop — the central technical review board serves as an alignment mechanism and quality check, not a bottleneck or approval gate. It ensures pilots stay coherent without micromanaging them.

The asks are specific and bounded: limited programs, protected time, permission to measure, local adaptation, and a review board that helps rather than blocks.`}
      </aside>
    </section>
  );
}


// =============================================================================
// SLIDE 4: Success Criteria — Evidence First, Expansion Second
// =============================================================================

function SuccessCriteriaSlide() {
  // Flywheel node positions (5 nodes in a circle)
  const cx = 300;
  const cy = 200;
  const r = 145;
  const nodes = [
    { label: 'Pilot', sub: 'Real program', angle: -90 },
    { label: 'Metrics', sub: 'Before & after', angle: -18 },
    { label: 'Story', sub: 'Program narrative', angle: 54 },
    { label: 'Enabler', sub: 'Reusable pattern', angle: 126 },
    { label: 'Pull', sub: 'Other programs', angle: 198 },
  ];

  const getPos = (angleDeg: number) => ({
    x: cx + r * Math.cos((angleDeg * Math.PI) / 180),
    y: cy + r * Math.sin((angleDeg * Math.PI) / 180),
  });

  // Arrow path between two nodes along the circle arc
  const getArcArrow = (fromAngle: number, toAngle: number) => {
    const padDeg = 22; // degrees to pad away from node center
    const a1 = fromAngle + padDeg;
    const a2 = toAngle - padDeg;
    const p1 = getPos(a1);
    const p2 = getPos(a2);
    // Control point: pull toward center for a slight inward curve
    const midAngle = ((a1 + a2) / 2) * Math.PI / 180;
    const cpR = r * 0.82;
    const cpx = cx + cpR * Math.cos(midAngle);
    const cpy = cy + cpR * Math.sin(midAngle);
    return `M ${p1.x} ${p1.y} Q ${cpx} ${cpy} ${p2.x} ${p2.y}`;
  };

  const nodeColors = [colors.blue600, colors.teal600, colors.slate600, colors.blue600, colors.teal600];

  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.slate900, marginBottom: sp[2] }}>
        Evidence First, Expansion Second
      </h2>
      <p style={{ ...font.body, color: colors.slate500, marginBottom: sp[5] }}>
        Broader adoption grows through demonstrated results — not top-down decree
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '600px 1fr',
        gap: sp[6],
        maxWidth: '1100px',
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {/* Flywheel SVG */}
        <div className="fragment">
          <svg
            viewBox="0 0 600 400"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="proof-arrow"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill={colors.slate400} />
              </marker>
              <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* Arc arrows between nodes */}
            {nodes.map((_, idx) => {
              const nextIdx = (idx + 1) % nodes.length;
              return (
                <path
                  key={`arrow-${idx}`}
                  d={getArcArrow(nodes[idx].angle, nodes[nextIdx].angle)}
                  stroke={colors.slate300}
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#proof-arrow)"
                  strokeDasharray="6 3"
                />
              );
            })}

            {/* Animated dots traveling along arcs */}
            {nodes.map((_, idx) => {
              const nextIdx = (idx + 1) % nodes.length;
              const path = getArcArrow(nodes[idx].angle, nodes[nextIdx].angle);
              return (
                <circle key={`dot-${idx}`} r="3.5" fill={nodeColors[idx]} opacity="0">
                  <animateMotion
                    dur={`${2.5 + idx * 0.3}s`}
                    begin={`${idx * 0.5}s`}
                    repeatCount="indefinite"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    dur={`${2.5 + idx * 0.3}s`}
                    begin={`${idx * 0.5}s`}
                    repeatCount="indefinite"
                    values="0;0.8;0.8;0;0"
                    keyTimes="0;0.15;0.65;0.85;1"
                  />
                </circle>
              );
            })}

            {/* Nodes */}
            {nodes.map((node, idx) => {
              const pos = getPos(node.angle);
              const nodeW = 110;
              const nodeH = 56;
              return (
                <g key={`node-${idx}`} filter="url(#node-shadow)">
                  <rect
                    x={pos.x - nodeW / 2}
                    y={pos.y - nodeH / 2}
                    width={nodeW}
                    height={nodeH}
                    rx="10"
                    fill={colors.white}
                    stroke={nodeColors[idx]}
                    strokeWidth="2"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 6}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={nodeColors[idx]}
                    fontFamily="system-ui, sans-serif"
                  >
                    {node.label}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 12}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill={colors.slate500}
                    fontFamily="system-ui, sans-serif"
                  >
                    {node.sub}
                  </text>
                </g>
              );
            })}

            {/* Center label */}
            <text
              x={cx}
              y={cy - 8}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={colors.slate700}
              fontFamily="system-ui, sans-serif"
            >
              Proof
            </text>
            <text
              x={cx}
              y={cy + 10}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={colors.slate700}
              fontFamily="system-ui, sans-serif"
            >
              Flywheel
            </text>
          </svg>
        </div>

        {/* Measurement indicators */}
        <div style={{ textAlign: 'left' as const }}>
          <div style={{
            ...font.tiny,
            color: colors.slate400,
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            marginBottom: sp[3],
          }}>What we measure</div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: sp[2] }}>
            {[
              { icon: Activity, label: 'Deployment friction', desc: 'Time and pain to ship a change' },
              { icon: Clock, label: 'Lead time', desc: 'Idea to production' },
              { icon: AlertTriangle, label: 'Escaped defects', desc: 'Issues found after deploy' },
              { icon: Users, label: 'Onboarding friction', desc: 'Time for new members to contribute' },
              { icon: TrendingUp, label: 'Incident recovery', desc: 'Mean time to restore service' },
            ].map((metric, idx) => (
              <div key={idx} className="fragment" style={{
                display: 'flex',
                alignItems: 'center',
                gap: sp[3],
                padding: `${sp[2]} ${sp[3]}`,
                background: colors.slate50,
                borderRadius: '6px',
                borderLeft: `3px solid ${idx % 2 === 0 ? colors.blue600 : colors.teal600}`,
              }}>
                <metric.icon size={16} color={idx % 2 === 0 ? colors.blue600 : colors.teal600} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ ...font.small, fontWeight: 600, color: colors.slate800 }}>{metric.label}</div>
                  <div style={{ ...font.tiny, color: colors.slate500 }}>{metric.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Evidence package */}
          <div className="fragment" style={{
            marginTop: sp[4],
            padding: sp[3],
            background: colors.green50,
            borderRadius: '6px',
            border: `1.5px solid ${colors.green600}25`,
          }}>
            <div style={{
              ...font.tiny,
              color: colors.green600,
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.06em',
              marginBottom: sp[2],
            }}>Expansion criteria</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: sp[1] }}>
              {[
                'Real before/after metrics from pilot programs',
                'At least one implementation story from a live program',
                'Reusable enablers produced from what worked',
                'Pull from other programs — adoption earned, not mandated',
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: sp[2] }}>
                  <CheckCircle2 size={13} color={colors.green600} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ ...font.tiny, color: colors.slate700 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="notes">
        {`Success is judged by evidence from real programs, not hypothetical enterprise metrics.

What we measure: deployment friction, lead time, escaped defects, onboarding friction, incident recovery — practical engineering pain points that every program leader cares about.

The proof flywheel works like this: a pilot generates metrics. Metrics produce a story. The story produces reusable enablers — patterns, templates, tools that other programs can adopt. Those enablers create pull from other programs that want the same results. That pull feeds the next pilot.

Expansion happens only after: real before-and-after metrics exist, at least one program has a credible implementation story (like State), reusable enablers have been produced from RIC based on what actually worked, and other programs are asking for it — not being told to do it.

If we can't demonstrate results in aligned pilots, we shouldn't scale. If we can, the evidence speaks for itself.`}
      </aside>
    </section>
  );
}


// =============================================================================
// COMBINED EXPORT
// =============================================================================

export function FoeProofSlides() {
  return (
    <>
      <TitleSlide />
      <ImplementationModelSlide />
      <LeadershipSupportSlide />
      <SuccessCriteriaSlide />
    </>
  );
}

// Individual exports for flexibility
export {
  TitleSlide as ProofTitleSlide,
  ImplementationModelSlide as ProofImplementationSlide,
  LeadershipSupportSlide as ProofLeadershipSlide,
  SuccessCriteriaSlide as ProofSuccessSlide,
};
