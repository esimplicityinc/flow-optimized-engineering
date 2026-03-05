import React from 'react';
import { 
  Brain, 
  RefreshCw, 
  Shield, 
  TrendingDown,
  Users,
  FileText,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Building2,
  Zap,
  Target,
  ArrowRight,
  BookOpen,
  Code2,
  Layers,
  MessageSquare,
  Clock,
  Eye,
  XCircle,
  Check,
  Bot,
  Database,
  FileSearch,
  Mic,
  Workflow,
  Sparkles,
  Cpu,
  TestTube2,
  Blocks,
  ArrowDown,
  Send,
  User,
  ChevronRight,
  Terminal,
  CircleDot,
  Network,
  ScrollText,
} from 'lucide-react';

/**
 * Government Mission Continuity Slides
 * 
 * Design: Swiss Modernism - Clean, bold, high contrast
 * Target: 15-20 minute presentation for government executives
 */

// =============================================================================
// DESIGN SYSTEM - Minimal, Bold, Professional
// =============================================================================

const colors = {
  // Core
  black: '#0A0A0A',
  white: '#FFFFFF',
  
  // Grays - full scale for flexibility
  gray900: '#111827',
  gray800: '#1F2937',
  gray700: '#374151',
  gray600: '#4B5563',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',
  
  // Accent - One bold color
  teal: '#0D9488',
  tealLight: '#CCFBF1',
  
  // Semantic - Used sparingly
  red: '#DC2626',
  redLight: '#FEE2E2',
  amber: '#D97706',
  amberLight: '#FEF3C7',
  blue: '#2563EB',
  blueLight: '#DBEAFE',
  green: '#059669',
  greenLight: '#D1FAE5',
  violet: '#7C3AED',
  violetLight: '#EDE9FE',
};

// Tight, purposeful spacing
const sp = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
};

// Bold typography - sized for projection readability
const font = {
  // Display - for big impact
  display: { fontSize: '2.2em', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' },
  // Headings
  h1: { fontSize: '1.5em', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' },
  h2: { fontSize: '1.1em', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em' },
  h3: { fontSize: '0.8em', fontWeight: 600, lineHeight: 1.2 },
  // Body
  body: { fontSize: '0.7em', lineHeight: 1.5 },
  small: { fontSize: '0.62em', lineHeight: 1.4 },
  tiny: { fontSize: '0.56em', lineHeight: 1.35 },
  // Special
  mono: { fontSize: '0.65em', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.4 },
};

/**
 * Slide 1: Title
 */
function TitleSlide() {
  return (
    <section 
      data-background={colors.black}
      className="title-slide dark-bg"
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <img 
          src="/flow-optimized-engineering/img/foe-white-square-trans.png" 
          alt="FOE"
          style={{ width: '120px', height: '120px', marginBottom: sp[6] }}
        />
        
        <h1 style={{ 
          ...font.display,
          color: colors.white, 
          marginBottom: sp[4],
        }}>
          Mission Continuity<br />
          <span style={{ color: colors.teal }}>Through Domain Encoding</span>
        </h1>
        
        <p style={{ 
          ...font.body,
          color: colors.gray500,
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          How Flow Optimized Engineering solves government's<br />
          knowledge loss problem and puts agencies<br />
          back in control of their mission
        </p>
        
        <div style={{
          width: '100px',
          height: '4px',
          background: colors.teal,
          margin: `${sp[8]} auto 0`,
          borderRadius: '2px',
        }} />
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: sp[6],
        right: sp[6],
        textAlign: 'center',
      }}>
        <img 
          src="/flow-optimized-engineering/img/qr-foe-docs.svg" 
          alt="QR"
          style={{ 
            width: '80px', 
            height: '80px',
            background: colors.white,
            padding: '4px',
            borderRadius: '6px',
          }}
        />
        <div style={{ ...font.tiny, color: colors.gray400, marginTop: sp[1] }}>
          Scan for docs
        </div>
      </div>

      <aside className="notes">
        Welcome. Today: the domain knowledge loss problem and how to solve it.
      </aside>
    </section>
  );
}

/**
 * Slide 2: The Challenge - Two numbers
 */
function DomainCrisisSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[2] }}>
        The Government IT Challenge
      </h2>
      <p style={{ ...font.body, color: colors.gray600, marginBottom: sp[6] }}>
        Two numbers tell the story
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: sp[4], maxWidth: '750px', margin: '0 auto' }}>
        <div className="fragment" style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3.5em', 
            fontWeight: 800, 
            color: colors.red,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>$102B</div>
          <div style={{ ...font.small, color: colors.gray600, marginTop: sp[2] }}>
            Annual federal IT spend
          </div>
          <div style={{ 
            ...font.tiny, 
            color: colors.red, 
            marginTop: sp[1],
            fontWeight: 600,
          }}>
            ~80% goes to maintenance, not innovation
          </div>
        </div>
        
        <div style={{ width: '1px', background: colors.gray300, alignSelf: 'stretch', margin: `${sp[2]} 0` }} />
        
        <div className="fragment" style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3.5em', 
            fontWeight: 800, 
            color: colors.amber,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>50+</div>
          <div style={{ ...font.small, color: colors.gray600, marginTop: sp[2] }}>
            Years old — critical systems
          </div>
          <div style={{ 
            ...font.tiny, 
            color: colors.amber, 
            marginTop: sp[1],
            fontWeight: 600,
          }}>
            COBOL, Assembly — no one knows them
          </div>
        </div>
      </div>
      
      <div className="fragment" style={{ 
        marginTop: sp[8],
        padding: sp[4],
        background: colors.gray100,
        borderLeft: `4px solid ${colors.teal}`,
        borderRadius: '0 8px 8px 0',
        maxWidth: '700px',
        margin: `${sp[8]} auto 0`,
      }}>
        <p style={{ ...font.body, color: colors.gray700, margin: 0, textAlign: 'center' }}>
          <strong style={{ color: colors.gray900 }}>The root cause:</strong> Domain knowledge 
          lives in people's heads, not in systems that survive.
        </p>
      </div>

      <aside className="notes">
        $102B annual spend, 80% on maintenance. Systems 50+ years old still running critical functions.
        Root cause: domain knowledge lives in heads, not systems.
      </aside>
    </section>
  );
}

/**
 * Slide 3: The Cost
 */
function CostOfPoorEncodingSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[6] }}>
        The Cost of Lost Knowledge
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: sp[3], maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        {[
          { icon: DollarSign, label: 'Replacement', value: '$200M–$300M', desc: 'Systems rebuilt to do the same thing', color: colors.amber },
          { icon: Clock, label: 'Velocity', value: '18 months', desc: 'For a simple policy change — nobody knows where rules live', color: colors.red },
          { icon: Users, label: 'Onboarding', value: '2+ years', desc: 'For new team to re-learn what previous team knew', color: colors.blue },
        ].map((item, idx) => (
          <div key={idx} className="fragment" style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: sp[4],
            padding: sp[4],
            background: colors.white,
            borderLeft: `4px solid ${item.color}`,
            borderRadius: '0 8px 8px 0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: sp[3], minWidth: '220px' }}>
              <item.icon size={24} color={item.color} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ 
                  fontSize: '1.1em', 
                  fontWeight: 800, 
                  color: item.color,
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                }}>{item.value}</div>
                <div style={{ ...font.tiny, color: colors.gray500, marginTop: sp[1] }}>
                  {item.label}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ ...font.small, color: colors.gray700, margin: 0, textAlign: 'left' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="fragment" style={{
        marginTop: sp[6],
        padding: sp[4],
        background: colors.black,
        borderRadius: '8px',
        maxWidth: '800px',
        margin: `${sp[6]} auto 0`,
      }}>
        <p style={{ ...font.body, color: colors.white, margin: 0, textAlign: 'center' }}>
          The real cost: <span style={{ color: colors.teal }}>Mission capabilities never built</span> because 
          resources went to reconstruction.
        </p>
      </div>

      <aside className="notes">
        Three costs: replacement (rebuild same thing), velocity (18mo for policy change), 
        onboarding (2+ years to learn). Real cost: capabilities never built.
      </aside>
    </section>
  );
}

/**
 * Slide 4: Real Examples
 */
function RealExamplesSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[6] }}>
        When Knowledge Fails
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: sp[3], maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
        {[
          { 
            year: '2014', 
            name: 'VA Healthcare', 
            stat: '40+', 
            unit: 'veterans died',
            detail: 'Systems measured wait times, not clinical urgency. "Urgent" was never encoded.',
            color: colors.red,
          },
          { 
            year: '2013', 
            name: 'Healthcare.gov', 
            stat: '$2.1B', 
            unit: 'failed in 48hrs',
            detail: '55 contractors, no shared domain model. Nobody understood enrollment end-to-end.',
            color: colors.amber,
          },
          { 
            year: '2011-18', 
            name: 'IRS Drain', 
            stat: '$8.3B', 
            unit: 'expired uncollected',
            detail: 'Senior auditors retired, domain knowledge left. Can\'t replace 30 years with training.',
            color: colors.blue,
          },
        ].map((item, idx) => (
          <div key={idx} className="fragment" style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
            gap: `0 ${sp[5]}`,
            alignItems: 'center',
            padding: `${sp[3]} ${sp[4]}`,
            background: colors.white,
            borderLeft: `4px solid ${item.color}`,
            borderRadius: '0 8px 8px 0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <div style={{ minWidth: '140px' }}>
              <div style={{ ...font.tiny, color: colors.gray500, marginBottom: '2px' }}>{item.year}</div>
              <div style={{ ...font.h3, color: colors.gray900, margin: 0, whiteSpace: 'nowrap' }}>{item.name}</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontSize: '1.4em', fontWeight: 800, color: item.color, lineHeight: 1, whiteSpace: 'nowrap' }}>{item.stat}</div>
              <div style={{ ...font.tiny, color: item.color, fontWeight: 600, whiteSpace: 'nowrap' }}>{item.unit}</div>
            </div>
            <div>
              <p style={{ ...font.small, color: colors.gray700, margin: 0 }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="fragment" style={{
        marginTop: sp[5],
        padding: sp[3],
        background: colors.black,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sp[3],
        maxWidth: '1000px',
        margin: `${sp[5]} auto 0`,
      }}>
        <AlertTriangle size={18} color={colors.teal} />
        <p style={{ ...font.body, color: colors.white, margin: 0 }}>
          Same pattern: knowledge existed but wasn't <strong style={{ color: colors.teal }}>encoded in systems</strong>.
        </p>
      </div>

      <aside className="notes">
        VA: wait times vs urgency. Healthcare.gov: 55 contractors, no shared model. IRS: expertise left with retirees.
        Pattern: knowledge existed but wasn't encoded.
      </aside>
    </section>
  );
}

/**
 * Slide 5: What is Coherence
 */
function MissionContinuitySlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[2] }}>
        The Solution: Coherence
      </h2>
      <p style={{ ...font.body, color: colors.gray600, marginBottom: sp[6] }}>
        Trace mission intent through to system behavior
      </p>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: sp[2],
        maxWidth: '550px',
        margin: '0 auto',
      }}>
        {[
          { num: '1', from: 'Mission Intent', to: 'Policy Rules' },
          { num: '2', from: 'Policy Rules', to: 'Domain Model' },
          { num: '3', from: 'Domain Model', to: 'Code' },
          { num: '4', from: 'Code Behavior', to: 'Mission Outcomes', final: true },
        ].map((layer, idx) => (
          <div key={idx} className="fragment" style={{
            display: 'flex',
            alignItems: 'center',
            gap: sp[3],
            padding: sp[3],
            background: layer.final ? colors.greenLight : colors.gray50,
            borderRadius: '6px',
            border: `1px solid ${layer.final ? colors.green : colors.gray300}`,
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: layer.final ? colors.green : colors.teal,
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.7em',
              flexShrink: 0,
            }}>{layer.num}</div>
            <div style={{ ...font.body, color: colors.gray900 }}>
              <strong>{layer.from}</strong>
              <ArrowRight size={16} color={colors.gray400} style={{ margin: `0 ${sp[1]}`, verticalAlign: 'middle' }} />
              {layer.to}
            </div>
          </div>
        ))}
      </div>
      
      <div className="fragment" style={{
        marginTop: sp[6],
        textAlign: 'center',
      }}>
        <p style={{ 
          ...font.h2, 
          color: colors.teal, 
          margin: 0,
          maxWidth: '750px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          "Coherence = You can explain <em>why</em> the system does what it does"
        </p>
      </div>

      <aside className="notes">
        Four layers: Intent → Policy → Model → Code → Outcomes.
        Coherence means you can explain WHY.
      </aside>
    </section>
  );
}

/**
 * Slide 6: With vs Without
 */
function CoherenceGapSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[6] }}>
        The Coherence Gap
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[6], textAlign: 'left' }}>
        <div className="fragment" style={{
          padding: sp[4],
          background: colors.redLight,
          borderRadius: '8px',
          border: `2px solid ${colors.red}30`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: sp[2], marginBottom: sp[3] }}>
            <XCircle size={22} color={colors.red} />
            <h3 style={{ ...font.h2, color: colors.red, margin: 0 }}>Without</h3>
          </div>
          <ul style={{ ...font.small, margin: 0, paddingLeft: '1.2em', color: colors.gray800 }}>
            <li style={{ marginBottom: sp[2] }}><strong>Opaque systems</strong> — nobody knows how they work</li>
            <li style={{ marginBottom: sp[2] }}><strong>"Don't touch it"</strong> — fear constrains change</li>
            <li style={{ marginBottom: sp[2] }}><strong>Knowledge in heads</strong> — lost when people leave</li>
            <li><strong>Archaeology required</strong> — debugging by excavation</li>
          </ul>
        </div>
        
        <div className="fragment" style={{
          padding: sp[4],
          background: colors.greenLight,
          borderRadius: '8px',
          border: `2px solid ${colors.green}30`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: sp[2], marginBottom: sp[3] }}>
            <Check size={22} color={colors.green} />
            <h3 style={{ ...font.h2, color: colors.green, margin: 0 }}>With</h3>
          </div>
          <ul style={{ ...font.small, margin: 0, paddingLeft: '1.2em', color: colors.gray800 }}>
            <li style={{ marginBottom: sp[2] }}><strong>Traceable intent</strong> — mission to code</li>
            <li style={{ marginBottom: sp[2] }}><strong>Documented domain</strong> — explicit business rules</li>
            <li style={{ marginBottom: sp[2] }}><strong>Transferable</strong> — survives personnel changes</li>
            <li><strong>Confident changes</strong> — tests verify behavior</li>
          </ul>
        </div>
      </div>
      
      <div className="fragment" style={{ marginTop: sp[5] }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: sp[2],
        }}>
          {[
            'Cannot defend decisions',
            'Cannot adapt to change',
            'Cannot predict outcomes',
            'Cannot demonstrate diligence',
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: `${sp[2]} ${sp[3]}`,
              background: colors.amberLight,
              borderLeft: `3px solid ${colors.amber}`,
              borderRadius: '0 4px 4px 0',
            }}>
              <p style={{ ...font.small, color: colors.gray800, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>

      <aside className="notes">
        Without: opaque, fear, knowledge loss, archaeology. With: traceable, documented, transferable, confident.
      </aside>
    </section>
  );
}

/**
 * Slide 7: FOE Understanding Principle
 */
function UnderstandingPrincipleSlide() {
  return (
    <section>
      <div style={{ marginBottom: sp[5], textAlign: 'left' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: sp[3],
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: colors.tealLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Brain size={28} color={colors.teal} />
          </div>
          <h2 style={{ ...font.h1, color: colors.teal, margin: 0 }}>
            Optimize for Understanding
          </h2>
        </div>
        <p style={{ ...font.small, color: colors.gray500, margin: `${sp[1]} 0 0 0` }}>
          FOE Principle #1
        </p>
      </div>
      
      <p style={{ 
        ...font.body, 
        color: colors.gray700, 
        fontStyle: 'italic',
        borderLeft: `3px solid ${colors.teal}`,
        paddingLeft: sp[3],
        marginBottom: sp[5],
        maxWidth: '700px',
        textAlign: 'left',
      }}>
        "The ability to form accurate mental models — predict how systems behave before changing them"
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: sp[3], textAlign: 'left' }}>
        {[
          { icon: Brain, title: 'Mental Models', desc: 'Engineers reason about eligibility rules, benefit calculations, workflows' },
          { icon: FileText, title: 'Explicit Rules', desc: 'Policy encoded as testable rules, not hidden in implementation' },
          { icon: GitBranch, title: 'Traceable', desc: 'Every change linked to policy, regulation, or mission need' },
        ].map((item, idx) => (
          <div key={idx} className="fragment" style={{
            padding: sp[3],
            background: colors.gray50,
            borderRadius: '8px',
            borderTop: `3px solid ${colors.teal}`,
          }}>
            <item.icon size={22} color={colors.teal} style={{ marginBottom: sp[2] }} />
            <h3 style={{ ...font.h3, color: colors.gray900, margin: `0 0 ${sp[1]} 0` }}>{item.title}</h3>
            <p style={{ ...font.small, color: colors.gray700, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="fragment" style={{
        marginTop: sp[5],
        padding: sp[3],
        background: colors.tealLight,
        borderRadius: '6px',
        textAlign: 'left',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[4], ...font.small, color: colors.gray800 }}>
          <div>• New members contribute in weeks, not years</div>
          <div>• Policy changes evaluated before implementation</div>
          <div>• Modernization from shared understanding</div>
          <div>• Decisions explainable to auditors & successors</div>
        </div>
      </div>

      <aside className="notes">
        Understanding = mental models, explicit rules, traceable decisions.
        Enables: fast onboarding, policy evaluation, confident modernization.
      </aside>
    </section>
  );
}

/**
 * Slide 8: Domain Mapping
 */
function DomainMappingSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[2] }}>
        Domain Mapping in Practice
      </h2>
      <p style={{ ...font.body, color: colors.gray600, marginBottom: sp[5] }}>
        Four components to encode mission knowledge
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[3] }}>
        {[
          { icon: Target, title: 'Mission Areas', desc: 'Core vs supporting capabilities', ex: 'VA: Claims (core), Scheduling (supporting)' },
          { icon: FileText, title: 'Domain Language', desc: 'Shared vocabulary', ex: '"Service-connected disability" = same meaning everywhere' },
          { icon: GitBranch, title: 'Boundaries', desc: 'Clear ownership', ex: 'Claims owns eligibility, Scheduling owns availability' },
          { icon: Shield, title: 'Domain Rules', desc: 'Explicit, testable logic', ex: 'Disability rating = rules tested independently' },
        ].map((item, idx) => (
          <div key={idx} className="fragment" style={{
            padding: sp[3],
            background: colors.white,
            borderRadius: '8px',
            border: `1px solid ${colors.gray200}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            textAlign: 'left',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: sp[2], marginBottom: sp[2] }}>
              <item.icon size={18} color={colors.teal} />
              <h3 style={{ ...font.h3, color: colors.gray900, margin: 0 }}>{item.title}</h3>
            </div>
            <p style={{ ...font.small, color: colors.gray700, margin: `0 0 ${sp[2]} 0` }}>{item.desc}</p>
            <div style={{
              ...font.tiny,
              padding: sp[2],
              background: colors.tealLight,
              borderRadius: '4px',
              color: colors.gray800,
              textAlign: 'left',
            }}>
              <strong style={{ color: colors.teal }}>Ex:</strong> {item.ex}
            </div>
          </div>
        ))}
      </div>

      <aside className="notes">
        Four components: mission areas, domain language, boundaries, rules.
        Each with clear examples from government context.
      </aside>
    </section>
  );
}

/**
 * Slide 9: Before/After Transformation
 */
function HeadsToSystemsSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[5] }}>
        From Heads to Systems
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: sp[3], alignItems: 'center', marginBottom: sp[5] }}>
        <div className="fragment" style={{
          padding: sp[4],
          background: colors.redLight,
          borderRadius: '8px',
          textAlign: 'center',
          border: `2px solid ${colors.red}25`,
        }}>
          <Users size={36} color={colors.red} style={{ marginBottom: sp[2] }} />
          <h3 style={{ ...font.h2, color: colors.red, margin: `0 0 ${sp[1]} 0` }}>Before</h3>
          <p style={{ ...font.small, color: colors.gray700, margin: 0 }}>
            Knowledge in SME heads<br />
            <strong style={{ color: colors.red }}>Lost when people leave</strong>
          </p>
        </div>
        
        <div className="fragment" style={{ textAlign: 'center' }}>
          <ArrowRight size={48} color={colors.teal} strokeWidth={2} />
        </div>
        
        <div className="fragment" style={{
          padding: sp[4],
          background: colors.greenLight,
          borderRadius: '8px',
          textAlign: 'center',
          border: `2px solid ${colors.green}25`,
        }}>
          <FileText size={36} color={colors.green} style={{ marginBottom: sp[2] }} />
          <h3 style={{ ...font.h2, color: colors.green, margin: `0 0 ${sp[1]} 0` }}>After</h3>
          <p style={{ ...font.small, color: colors.gray700, margin: 0 }}>
            Knowledge in domain model<br />
            <strong style={{ color: colors.green }}>Survives personnel changes</strong>
          </p>
        </div>
      </div>
      
      <div className="fragment" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: sp[3],
        padding: sp[3],
        background: colors.gray50,
        borderRadius: '8px',
      }}>
        {[
          { num: '1', label: 'Capture', sub: 'Expert knowledge' },
          { num: '2', label: 'Model', sub: 'Domain creation' },
          { num: '3', label: 'Code', sub: 'Follows model' },
          { num: '4', label: 'Trace', sub: 'To mission', final: true },
        ].map((step, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ArrowRight size={24} color={colors.teal} strokeWidth={2.5} />}
            <div style={{
              padding: `${sp[2]} ${sp[4]}`,
              background: step.final ? colors.green : colors.teal,
              borderRadius: '6px',
              textAlign: 'center',
              color: colors.white,
              flex: 1,
            }}>
              <div style={{ ...font.small, fontWeight: 700 }}>{step.num}. {step.label}</div>
              <div style={{ ...font.tiny, opacity: 0.85 }}>{step.sub}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <aside className="notes">
        Before: knowledge in heads, lost on departure. After: in model, survives.
        Process: capture → model → code → trace.
      </aside>
    </section>
  );
}

/**
 * Slide 10: Fast Feedback Principle
 */
function FastFeedbackSlide() {
  return (
    <section>
      <div style={{ marginBottom: sp[4], textAlign: 'left' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: sp[3],
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: colors.violetLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <RefreshCw size={28} color={colors.violet} />
          </div>
          <h2 style={{ ...font.h1, color: colors.violet, margin: 0 }}>
            Optimize for Fast Feedback
          </h2>
        </div>
        <p style={{ ...font.small, color: colors.gray500, margin: `${sp[1]} 0 0 0` }}>
          FOE Principle #2
        </p>
      </div>
      
      <div className="fragment" style={{
        padding: sp[3],
        background: colors.amberLight,
        borderRadius: '6px',
        marginBottom: sp[4],
        display: 'flex',
        alignItems: 'center',
        gap: sp[3],
        textAlign: 'left',
      }}>
        <AlertTriangle size={20} color={colors.amber} />
        <p style={{ ...font.small, color: colors.gray800, margin: 0 }}>
          <strong>Problem:</strong> Domain models drift without validation. Reality changes. Regulations update.
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: sp[3], textAlign: 'left' }}>
        {[
          { icon: Shield, title: 'Domain Tests', desc: 'Verify mission rules work, independent of UI/database' },
          { icon: Zap, title: 'CI/CD Pipeline', desc: 'Every change proves domain logic works before deploy' },
          { icon: Target, title: 'Observability', desc: 'Monitor if behavior matches mission outcomes' },
        ].map((item, idx) => (
          <div key={idx} className="fragment" style={{
            padding: sp[3],
            background: colors.gray50,
            borderRadius: '8px',
            borderTop: `3px solid ${colors.violet}`,
          }}>
            <item.icon size={22} color={colors.violet} style={{ marginBottom: sp[2] }} />
            <h3 style={{ ...font.h3, color: colors.gray900, margin: `0 0 ${sp[1]} 0` }}>{item.title}</h3>
            <p style={{ ...font.small, color: colors.gray700, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="fragment" style={{
        marginTop: sp[4],
        padding: sp[3],
        background: colors.violetLight,
        borderRadius: '6px',
        textAlign: 'center',
      }}>
        <p style={{ ...font.body, color: colors.gray900, margin: 0 }}>
          <strong style={{ color: colors.violet }}>Understanding + Fast Feedback</strong> = Coherence that survives change
        </p>
      </div>

      <aside className="notes">
        Models drift without validation. Solution: domain tests, CI/CD, observability.
        Understanding + Feedback = coherence that survives.
      </aside>
    </section>
  );
}

/**
 * Slide 11: Confidence Principle
 */
function ConfidenceSlide() {
  return (
    <section>
      <div style={{ marginBottom: sp[4], textAlign: 'left' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: sp[3],
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: colors.blueLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Shield size={28} color={colors.blue} />
          </div>
          <h2 style={{ ...font.h1, color: colors.blue, margin: 0 }}>
            Optimize for Confidence
          </h2>
        </div>
        <p style={{ ...font.small, color: colors.gray500, margin: `${sp[1]} 0 0 0` }}>
          FOE Principle #3
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[3], marginBottom: sp[4], textAlign: 'left' }}>
        <div className="fragment" style={{
          padding: sp[3],
          background: colors.redLight,
          borderRadius: '8px',
          border: `2px solid ${colors.red}20`,
        }}>
          <h3 style={{ ...font.h3, color: colors.red, margin: `0 0 ${sp[2]} 0` }}>Why It Feels Risky</h3>
          <ul style={{ ...font.small, margin: 0, paddingLeft: '1em', color: colors.gray800 }}>
            <li>Mission-critical systems carry weight</li>
            <li>Replacement feels permanent</li>
            <li>Hidden dependencies multiply unknowns</li>
          </ul>
        </div>
        
        <div className="fragment" style={{
          padding: sp[3],
          background: colors.blueLight,
          borderRadius: '8px',
          border: `2px solid ${colors.blue}20`,
        }}>
          <h3 style={{ ...font.h3, color: colors.blue, margin: `0 0 ${sp[2]} 0` }}>How FOE Helps</h3>
          <ul style={{ ...font.small, margin: 0, paddingLeft: '1em', color: colors.gray800 }}>
            <li>Bounded blast radius by domain</li>
            <li>Feature flags enable rollback</li>
            <li>Domain tests prove behavior</li>
          </ul>
        </div>
      </div>
      
      <div className="fragment" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: sp[2],
        textAlign: 'left',
      }}>
        {[
          { title: 'Feature Flags', desc: 'Deploy dark, enable 1%, roll back instantly' },
          { title: 'Domain Tests', desc: 'Safety net for every change' },
          { title: 'Strangler Pattern', desc: 'Replace one domain at a time' },
        ].map((item, idx) => (
          <div key={idx} style={{
            padding: sp[3],
            background: colors.white,
            borderRadius: '6px',
            border: `1px solid ${colors.blue}40`,
          }}>
            <h4 style={{ ...font.small, fontWeight: 700, color: colors.blue, margin: `0 0 ${sp[1]} 0` }}>{item.title}</h4>
            <p style={{ ...font.tiny, color: colors.gray700, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="fragment" style={{
        marginTop: sp[4],
        padding: sp[3],
        background: colors.greenLight,
        borderRadius: '6px',
        textAlign: 'center',
        border: `2px solid ${colors.green}25`,
      }}>
        <p style={{ ...font.body, color: colors.gray900, margin: 0 }}>
          <strong>Modernize without fear</strong> when domain is explicit and testable
        </p>
      </div>

      <aside className="notes">
        Confidence = know what fails, can undo, inside envelope.
        Tools: feature flags, tests, strangler pattern.
      </aside>
    </section>
  );
}

/**
 * Slide 12: Getting Started
 */
function GettingStartedSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[5] }}>
        Getting Started
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: sp[3], textAlign: 'left' }}>
        {[
          { phase: '1', title: 'Domain Discovery', time: '2-4 weeks', color: colors.teal, items: ['Interview mission experts', 'Map existing systems', 'Identify core concepts', 'Document business rules'] },
          { phase: '2', title: 'Domain Encoding', time: '4-8 weeks', color: colors.violet, items: ['Create domain model', 'Define shared language', 'Establish boundaries', 'Encode rules as tests'] },
          { phase: '3', title: 'Domain Testing', time: 'Ongoing', color: colors.blue, items: ['Integrate into CI/CD', 'Monitor production', 'Evolve with mission', 'Maintain coherence'] },
        ].map((phase, idx) => (
          <div key={idx} className="fragment" style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr',
            gap: sp[3],
            alignItems: 'start',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: phase.color,
              color: colors.white,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ fontSize: '1.2em', fontWeight: 800, lineHeight: 1 }}>{phase.phase}</div>
            </div>
            <div style={{
              padding: sp[3],
              background: colors.gray50,
              borderRadius: '8px',
              borderLeft: `3px solid ${phase.color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: sp[2], marginBottom: sp[2] }}>
                <h3 style={{ ...font.h3, color: colors.gray900, margin: 0 }}>{phase.title}</h3>
                <span style={{ ...font.small, color: colors.gray500, fontWeight: 500 }}>{phase.time}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${sp[1]} ${sp[3]}`, ...font.small, color: colors.gray700 }}>
                {phase.items.map((item, i) => <div key={i}>• {item}</div>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="fragment" style={{
        marginTop: sp[4],
        padding: sp[3],
        background: colors.amberLight,
        borderRadius: '6px',
      }}>
        <h4 style={{ ...font.h3, color: colors.amber, margin: `0 0 ${sp[2]} 0` }}>Action Items</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: sp[2], ...font.small, color: colors.gray800 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: sp[1] }}><CheckCircle2 size={16} color={colors.amber} /> Pick one mission-critical system</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: sp[1] }}><CheckCircle2 size={16} color={colors.amber} /> Assemble cross-functional team</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: sp[1] }}><CheckCircle2 size={16} color={colors.amber} /> Start discovery workshop</div>
        </div>
      </div>

      <aside className="notes">
        Three phases: Discovery (2-4wk), Encoding (4-8wk), Testing (ongoing).
        Start: pick one system, assemble team, begin workshop.
      </aside>
    </section>
  );
}

/**
 * Slide: Katalyst Domain Mapper — Collaboration Tool (No AI)
 * Introduces Katalyst as a non-AI collaboration platform for teams to
 * input, visualize, and share their domain model. Uses a real government
 * example (VA Benefits) with an inline SVG bounded context map illustration.
 * Positioned before the AI-powered slide to establish the "start here" narrative.
 */
function KatalystCollaborationSlide() {
  const stakeholders = [
    { icon: ScrollText, role: 'Policy Experts', action: 'Define business rules in plain language', color: colors.teal },
    { icon: Code2, role: 'Engineers', action: 'Connect rules to system behavior', color: colors.violet },
    { icon: Target, role: 'Program Managers', action: 'See mission coverage at a glance', color: colors.blue },
  ];

  return (
    <section>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: sp[4], marginBottom: sp[3], textAlign: 'left' }}>
        <img 
          src="/flow-optimized-engineering/img/katalyst-logo.png" 
          alt="Katalyst"
          style={{ width: '72px', height: '72px', borderRadius: '14px' }}
        />
        <div>
          <h2 style={{ ...font.h1, color: colors.gray900, margin: 0 }}>
            What Does a Domain Model Actually Look Like?
          </h2>
          <p style={{ ...font.small, color: colors.gray600, margin: `${sp[1]} 0 0 0` }}>
            Katalyst Domain Mapper — your team's shared language, in one place
          </p>
        </div>
      </div>

      {/* Fragment 1: SVG Bounded Context Map illustration */}
      <div className="fragment" style={{
        background: colors.white,
        borderRadius: '12px',
        border: `1px solid ${colors.gray200}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        padding: `${sp[3]} ${sp[4]}`,
        marginBottom: sp[3],
        position: 'relative',
      }}>
        {/* Label */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: sp[2], 
          marginBottom: sp[2],
        }}>
          <Network size={16} color={colors.gray500} />
          <span style={{ ...font.tiny, fontWeight: 700, color: colors.gray500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Example: VA Benefits Domain Model
          </span>
        </div>

        {/* Inline SVG — Bounded Context Map */}
        <svg
          viewBox="0 0 1060 300"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle drop shadow for context boxes */}
            <filter id="ctx-shadow" x="-4%" y="-4%" width="108%" height="112%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* ──── Relationship lines (drawn first, behind boxes) ──── */}
          {/* Claims ←→ Enrollment */}
          <path d="M 300 155 C 320 155, 380 155, 400 155" stroke={colors.gray300} strokeWidth="2" fill="none" strokeDasharray="6 4" />
          {/* Enrollment ←→ Appeals */}
          <path d="M 680 155 C 700 155, 760 155, 780 155" stroke={colors.gray300} strokeWidth="2" fill="none" strokeDasharray="6 4" />
          {/* Claims → Appeals (curved bottom connection) */}
          <path d="M 160 265 C 160 295, 530 300, 900 265" stroke={colors.gray300} strokeWidth="2" fill="none" strokeDasharray="6 4" />

          {/* ──── Animated data dots traveling along connections ──── */}
          {/* Claims → Enrollment */}
          <circle r="4" fill={colors.teal} opacity="0">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 300 155 C 320 155, 380 155, 400 155" />
            <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0;0.85;0.85;0;0" keyTimes="0;0.1;0.7;0.9;1" />
          </circle>
          {/* Enrollment → Appeals */}
          <circle r="4" fill={colors.violet} opacity="0">
            <animateMotion dur="2.2s" begin="0.8s" repeatCount="indefinite" path="M 680 155 C 700 155, 760 155, 780 155" />
            <animate attributeName="opacity" dur="2.2s" begin="0.8s" repeatCount="indefinite" values="0;0.85;0.85;0;0" keyTimes="0;0.1;0.7;0.9;1" />
          </circle>
          {/* Claims → Appeals (bottom arc) */}
          <circle r="3.5" fill={colors.blue} opacity="0">
            <animateMotion dur="4s" begin="1.5s" repeatCount="indefinite" path="M 160 265 C 160 295, 530 300, 900 265" />
            <animate attributeName="opacity" dur="4s" begin="1.5s" repeatCount="indefinite" values="0;0.65;0.65;0;0" keyTimes="0;0.1;0.7;0.9;1" />
          </circle>

          {/* ──── Relationship labels on connection lines ──── */}
          {/* Claims ↔ Enrollment label */}
          <rect x="306" y="134" width="88" height="20" rx="10" fill={colors.tealLight} stroke={`${colors.teal}40`} strokeWidth="1" />
          <text x="350" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill={colors.teal} fontFamily="system-ui, sans-serif">
            Veteran Filed
          </text>
          {/* Enrollment ↔ Appeals label */}
          <rect x="695" y="134" width="70" height="20" rx="10" fill={colors.violetLight} stroke={`${colors.violet}40`} strokeWidth="1" />
          <text x="730" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill={colors.violet} fontFamily="system-ui, sans-serif">
            Disputed
          </text>
          {/* Bottom arc label */}
          <rect x="475" y="274" width="110" height="20" rx="10" fill={colors.blueLight} stroke={`${colors.blue}40`} strokeWidth="1" />
          <text x="530" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill={colors.blue} fontFamily="system-ui, sans-serif">
            Appeal Resolved
          </text>

          {/* ──── Context Box 1: Claims Processing ──── */}
          <g filter="url(#ctx-shadow)">
            <rect x="20" y="40" width="280" height="225" rx="12" fill={colors.white} stroke={colors.teal} strokeWidth="2.5" />
            {/* Header bar */}
            <rect x="20" y="40" width="280" height="42" rx="12" fill={colors.teal} />
            <rect x="20" y="70" width="280" height="12" fill={colors.teal} />
            {/* Icon */}
            <circle cx="46" cy="61" r="12" fill="rgba(255,255,255,0.2)" />
            <text x="46" y="66" textAnchor="middle" fontSize="14" fill={colors.white}>&#x1F4CB;</text>
            {/* Title */}
            <text x="66" y="66" fontSize="15" fontWeight="700" fill={colors.white} fontFamily="system-ui, sans-serif">
              Claims Processing
            </text>
            {/* Vocabulary section */}
            <text x="36" y="104" fontSize="9" fontWeight="700" fill={colors.gray500} fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
              SHARED VOCABULARY
            </text>
            <rect x="36" y="112" width="118" height="20" rx="10" fill={colors.tealLight} stroke={`${colors.teal}30`} strokeWidth="1" />
            <text x="95" y="126" textAnchor="middle" fontSize="10" fill={colors.gray800} fontFamily="system-ui, sans-serif">Service-Connected</text>
            <rect x="162" y="112" width="115" height="20" rx="10" fill={colors.tealLight} stroke={`${colors.teal}30`} strokeWidth="1" />
            <text x="219" y="126" textAnchor="middle" fontSize="10" fill={colors.gray800} fontFamily="system-ui, sans-serif">Rating Decision</text>
            {/* Rules section */}
            <text x="36" y="155" fontSize="9" fontWeight="700" fill={colors.gray500} fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
              BUSINESS RULES
            </text>
            <circle cx="43" cy="172" r="5" fill={`${colors.teal}20`} />
            <text x="43" y="175" textAnchor="middle" fontSize="8" fill={colors.teal}>&#x2713;</text>
            <text x="54" y="176" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Verify service connection</text>
            <circle cx="43" cy="194" r="5" fill={`${colors.teal}20`} />
            <text x="43" y="197" textAnchor="middle" fontSize="8" fill={colors.teal}>&#x2713;</text>
            <text x="54" y="198" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Calculate disability rating</text>
            <circle cx="43" cy="216" r="5" fill={`${colors.teal}20`} />
            <text x="43" y="219" textAnchor="middle" fontSize="8" fill={colors.teal}>&#x2713;</text>
            <text x="54" y="220" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Validate supporting evidence</text>
          </g>

          {/* ──── Context Box 2: Enrollment ──── */}
          <g filter="url(#ctx-shadow)">
            <rect x="400" y="40" width="280" height="225" rx="12" fill={colors.white} stroke={colors.violet} strokeWidth="2.5" />
            {/* Header bar */}
            <rect x="400" y="40" width="280" height="42" rx="12" fill={colors.violet} />
            <rect x="400" y="70" width="280" height="12" fill={colors.violet} />
            {/* Icon */}
            <circle cx="426" cy="61" r="12" fill="rgba(255,255,255,0.2)" />
            <text x="426" y="66" textAnchor="middle" fontSize="14" fill={colors.white}>&#x1F4DD;</text>
            {/* Title */}
            <text x="446" y="66" fontSize="15" fontWeight="700" fill={colors.white} fontFamily="system-ui, sans-serif">
              Enrollment
            </text>
            {/* Vocabulary section */}
            <text x="416" y="104" fontSize="9" fontWeight="700" fill={colors.gray500} fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
              SHARED VOCABULARY
            </text>
            <rect x="416" y="112" width="100" height="20" rx="10" fill={colors.violetLight} stroke={`${colors.violet}30`} strokeWidth="1" />
            <text x="466" y="126" textAnchor="middle" fontSize="10" fill={colors.gray800} fontFamily="system-ui, sans-serif">Effective Date</text>
            <rect x="524" y="112" width="105" height="20" rx="10" fill={colors.violetLight} stroke={`${colors.violet}30`} strokeWidth="1" />
            <text x="576" y="126" textAnchor="middle" fontSize="10" fill={colors.gray800} fontFamily="system-ui, sans-serif">Priority Group</text>
            {/* Rules section */}
            <text x="416" y="155" fontSize="9" fontWeight="700" fill={colors.gray500} fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
              BUSINESS RULES
            </text>
            <circle cx="423" cy="172" r="5" fill={`${colors.violet}20`} />
            <text x="423" y="175" textAnchor="middle" fontSize="8" fill={colors.violet}>&#x2713;</text>
            <text x="434" y="176" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Check eligibility period</text>
            <circle cx="423" cy="194" r="5" fill={`${colors.violet}20`} />
            <text x="423" y="197" textAnchor="middle" fontSize="8" fill={colors.violet}>&#x2713;</text>
            <text x="434" y="198" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Validate discharge status</text>
            <circle cx="423" cy="216" r="5" fill={`${colors.violet}20`} />
            <text x="423" y="219" textAnchor="middle" fontSize="8" fill={colors.violet}>&#x2713;</text>
            <text x="434" y="220" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Assign priority group</text>
          </g>

          {/* ──── Context Box 3: Appeals ──── */}
          <g filter="url(#ctx-shadow)">
            <rect x="780" y="40" width="260" height="225" rx="12" fill={colors.white} stroke={colors.blue} strokeWidth="2.5" />
            {/* Header bar */}
            <rect x="780" y="40" width="260" height="42" rx="12" fill={colors.blue} />
            <rect x="780" y="70" width="260" height="12" fill={colors.blue} />
            {/* Icon */}
            <circle cx="806" cy="61" r="12" fill="rgba(255,255,255,0.2)" />
            <text x="806" y="66" textAnchor="middle" fontSize="14" fill={colors.white}>&#x2696;</text>
            {/* Title */}
            <text x="826" y="66" fontSize="15" fontWeight="700" fill={colors.white} fontFamily="system-ui, sans-serif">
              Appeals
            </text>
            {/* Vocabulary section */}
            <text x="796" y="104" fontSize="9" fontWeight="700" fill={colors.gray500} fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
              SHARED VOCABULARY
            </text>
            <rect x="796" y="112" width="95" height="20" rx="10" fill={colors.blueLight} stroke={`${colors.blue}30`} strokeWidth="1" />
            <text x="843" y="126" textAnchor="middle" fontSize="10" fill={colors.gray800} fontFamily="system-ui, sans-serif">Disagreement</text>
            <rect x="899" y="112" width="110" height="20" rx="10" fill={colors.blueLight} stroke={`${colors.blue}30`} strokeWidth="1" />
            <text x="954" y="126" textAnchor="middle" fontSize="10" fill={colors.gray800} fontFamily="system-ui, sans-serif">Board Review</text>
            {/* Rules section */}
            <text x="796" y="155" fontSize="9" fontWeight="700" fill={colors.gray500} fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
              BUSINESS RULES
            </text>
            <circle cx="803" cy="172" r="5" fill={`${colors.blue}20`} />
            <text x="803" y="175" textAnchor="middle" fontSize="8" fill={colors.blue}>&#x2713;</text>
            <text x="814" y="176" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Track filing deadlines</text>
            <circle cx="803" cy="194" r="5" fill={`${colors.blue}20`} />
            <text x="803" y="197" textAnchor="middle" fontSize="8" fill={colors.blue}>&#x2713;</text>
            <text x="814" y="198" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Route by appeal type</text>
            <circle cx="803" cy="216" r="5" fill={`${colors.blue}20`} />
            <text x="803" y="219" textAnchor="middle" fontSize="8" fill={colors.blue}>&#x2713;</text>
            <text x="814" y="220" fontSize="10.5" fill={colors.gray700} fontFamily="system-ui, sans-serif">Enforce review timeline</text>
          </g>
        </svg>
      </div>

      {/* Fragment 2: Who contributes — stakeholder collaboration strip */}
      <div className="fragment" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: sp[3],
        marginBottom: sp[3],
        textAlign: 'left',
      }}>
        {stakeholders.map((s, idx) => (
          <div key={idx} style={{
            padding: sp[3],
            background: colors.white,
            borderRadius: '8px',
            border: `1px solid ${colors.gray200}`,
            borderLeft: `4px solid ${s.color}`,
            display: 'flex',
            alignItems: 'center',
            gap: sp[3],
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: `${s.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <s.icon size={20} color={s.color} />
            </div>
            <div>
              <div style={{ ...font.small, fontWeight: 700, color: colors.gray900 }}>{s.role}</div>
              <div style={{ ...font.tiny, color: colors.gray600 }}>{s.action}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Fragment 3: Transition hook to AI slide */}
      <div className="fragment" style={{
        padding: sp[3],
        background: colors.black,
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <p style={{ ...font.body, color: colors.white, margin: 0 }}>
          Start by mapping what your team already knows.{' '}
          <strong style={{ color: colors.teal }}>AI can accelerate this</strong> — but the collaboration is the foundation.
        </p>
      </div>

      <aside className="notes">
        Before we talk about AI, let's look at what a domain model actually is.
        It's not a technical artifact — it's a shared picture of how your mission works.
        Here we see a VA Benefits example: three mission areas — Claims, Enrollment, Appeals —
        each with shared vocabulary and business rules that everyone agrees on.
        The connecting lines show how work flows between areas — a veteran files, a claim is
        disputed, an appeal is resolved. Katalyst gives every stakeholder a single place to
        capture and view this. No AI required. The tool itself is valuable as a collaboration
        platform. The AI capabilities we'll see next build on this foundation.
      </aside>
    </section>
  );
}

/**
 * Slide: Katalyst Domain Mapper
 * Positioned after Coherence Gap — introduces the tool that makes coherence achievable
 */
function KatalystDomainMapperSlide() {
  const sources = [
    { icon: Layers, label: 'Confluence', color: colors.blue },
    { icon: CheckCircle2, label: 'Jira', color: colors.blue },
    { icon: Code2, label: 'Codebase', color: colors.gray700 },
    { icon: Mic, label: 'Transcripts', color: colors.violet },
    { icon: FileSearch, label: 'Documents', color: colors.amber },
  ];

  const outputs = [
    'Ubiquitous Language Glossary',
    'Subdomain Classification',
    'Bounded Context Map',
    'Aggregate Definitions',
    'Domain Event Catalog',
  ];

  return (
    <section>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: sp[4], marginBottom: sp[3], textAlign: 'left' }}>
        <img 
          src="/flow-optimized-engineering/img/katalyst-logo.png" 
          alt="Katalyst"
          style={{ width: '72px', height: '72px', borderRadius: '14px' }}
        />
        <div>
          <h2 style={{ ...font.h1, color: colors.gray900, margin: 0 }}>Katalyst Domain Mapper</h2>
          <p style={{ ...font.small, color: colors.gray600, margin: `${sp[1]} 0 0 0` }}>
            AI-powered domain knowledge extraction — from what you already have
          </p>
        </div>
      </div>

      {/* Main flow: Sources → Agent → Outputs */}
      <div className="fragment" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: sp[4],
        alignItems: 'center',
        marginBottom: sp[4],
      }}>
        {/* Left: Source Systems */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: sp[2],
          textAlign: 'left',
        }}>
          <div style={{ ...font.tiny, fontWeight: 700, color: colors.gray500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: sp[1] }}>
            Your Existing Systems
          </div>
          {sources.map((src, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: sp[2],
              padding: `${sp[1]} ${sp[3]}`,
              background: colors.gray50,
              borderRadius: '6px',
              border: `1px solid ${colors.gray200}`,
            }}>
              <src.icon size={16} color={src.color} />
              <span style={{ ...font.small, color: colors.gray800 }}>{src.label}</span>
            </div>
          ))}
        </div>

        {/* Center: Domain Mapper Agent */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: sp[2],
        }}>
          <ArrowRight size={24} color={colors.gray400} />
          <div style={{
            padding: `${sp[3]} ${sp[4]}`,
            background: colors.tealLight,
            borderRadius: '16px',
            border: `2px solid ${colors.teal}`,
            textAlign: 'center',
            position: 'relative',
          }}>
            <Sparkles size={20} color={colors.teal} style={{ marginBottom: sp[1] }} />
            <div style={{ ...font.h3, color: colors.teal, margin: 0 }}>Domain Mapper</div>
            <div style={{ ...font.tiny, color: colors.gray600, marginTop: sp[1] }}>AI Agent</div>
          </div>
          <ArrowRight size={24} color={colors.gray400} />
        </div>

        {/* Right: Outputs */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: sp[2],
          textAlign: 'left',
        }}>
          <div style={{ ...font.tiny, fontWeight: 700, color: colors.gray500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: sp[1] }}>
            Domain Documentation
          </div>
          {outputs.map((out, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: sp[2],
              padding: `${sp[1]} ${sp[3]}`,
              background: colors.tealLight,
              borderRadius: '6px',
              border: `1px solid ${colors.teal}30`,
            }}>
              <CheckCircle2 size={14} color={colors.teal} />
              <span style={{ ...font.small, color: colors.gray800 }}>{out}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works strip */}
      <div className="fragment" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: sp[3],
        textAlign: 'left',
      }}>
        {[
          { icon: Database, title: 'Ingest', desc: 'Connects to Confluence, Jira, repos, transcripts — your existing knowledge' },
          { icon: Bot, title: 'Analyze', desc: 'Specialized AI agent identifies domain concepts, rules, and boundaries' },
          { icon: Users, title: 'Validate', desc: 'Humans review and confirm — AI extracts, experts verify intent' },
        ].map((step, i) => (
          <div key={i} style={{
            padding: sp[3],
            background: colors.gray50,
            borderRadius: '8px',
            borderTop: `3px solid ${colors.teal}`,
          }}>
            <step.icon size={20} color={colors.teal} style={{ marginBottom: sp[1] }} />
            <h4 style={{ ...font.h3, color: colors.gray900, margin: `0 0 ${sp[1]} 0` }}>{step.title}</h4>
            <p style={{ ...font.tiny, color: colors.gray700, margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </div>

      <aside className="notes">
        Katalyst Domain Mapper: AI agent that ingests your existing systems — Confluence, Jira, 
        code, meeting transcripts, policy docs — and extracts structured domain knowledge.
        Humans validate, AI does the heavy lifting. Outputs: glossary, subdomains, context map, aggregates, events.
      </aside>
    </section>
  );
}

/**
 * Slide: Why Katalyst = Real Ownership
 * The sell — connects Katalyst back to mission coherence and agency ownership
 */
function KatalystOwnershipSlide() {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: sp[4], marginBottom: sp[2], textAlign: 'left' }}>
        <img 
          src="/flow-optimized-engineering/img/katalyst-logo.png" 
          alt="Katalyst"
          style={{ width: '64px', height: '64px', borderRadius: '12px' }}
        />
        <h2 style={{ ...font.h1, color: colors.gray900, margin: 0 }}>
          From Vendor Dependency to Mission Ownership
        </h2>
      </div>
      <p style={{ ...font.body, color: colors.gray600, marginBottom: sp[5] }}>
        What changes when your domain knowledge lives in systems, not people
      </p>

      <div className="fragment" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: sp[4],
        marginBottom: sp[4],
        textAlign: 'left',
      }}>
        {/* Without */}
        <div style={{
          padding: sp[4],
          background: colors.redLight,
          borderRadius: '8px',
          border: `2px solid ${colors.red}25`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: sp[2], marginBottom: sp[3] }}>
            <XCircle size={22} color={colors.red} />
            <h3 style={{ ...font.h2, color: colors.red, margin: 0 }}>Today</h3>
          </div>
          <ul style={{ ...font.small, margin: 0, paddingLeft: '1.2em', color: colors.gray800 }}>
            <li style={{ marginBottom: sp[2] }}>Knowledge locked in <strong>contractor heads</strong></li>
            <li style={{ marginBottom: sp[2] }}>New vendor = <strong>start over from scratch</strong></li>
            <li style={{ marginBottom: sp[2] }}>Agency can't evaluate what they're buying</li>
            <li>Recompete = <strong>12+ months of relearning</strong></li>
          </ul>
        </div>

        {/* With Katalyst */}
        <div style={{
          padding: sp[4],
          background: colors.greenLight,
          borderRadius: '8px',
          border: `2px solid ${colors.green}25`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: sp[2], marginBottom: sp[3] }}>
            <img 
              src="/flow-optimized-engineering/img/katalyst-logo.png" 
              alt="Katalyst"
              style={{ width: '28px', height: '28px', borderRadius: '6px' }}
            />
            <h3 style={{ ...font.h2, color: colors.green, margin: 0 }}>With Katalyst</h3>
          </div>
          <ul style={{ ...font.small, margin: 0, paddingLeft: '1.2em', color: colors.gray800 }}>
            <li style={{ marginBottom: sp[2] }}>Domain model is the <strong>agency's asset</strong></li>
            <li style={{ marginBottom: sp[2] }}>New vendor onboards from <strong>living documentation</strong></li>
            <li style={{ marginBottom: sp[2] }}>Agency evaluates with <strong>encoded domain rules</strong></li>
            <li>Recompete = <strong>weeks, not years</strong></li>
          </ul>
        </div>
      </div>

      {/* Three value props */}
      <div className="fragment" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: sp[3],
        textAlign: 'left',
        marginBottom: sp[4],
      }}>
        {[
          { icon: Shield, title: 'Survives Transition', desc: 'Domain knowledge persists across contract vehicles, staff turnover, and recompetes', color: colors.teal },
          { icon: Brain, title: 'AI Does the Heavy Lifting', desc: 'Extracts from what you already have — no months-long discovery workshops needed', color: colors.violet },
          { icon: Target, title: 'Agency Owns the Model', desc: 'The domain model belongs to the mission, not the vendor who built it', color: colors.blue },
        ].map((item, i) => (
          <div key={i} style={{
            padding: sp[3],
            background: colors.white,
            borderRadius: '8px',
            border: `1px solid ${colors.gray200}`,
            borderTop: `3px solid ${item.color}`,
          }}>
            <item.icon size={20} color={item.color} style={{ marginBottom: sp[1] }} />
            <h4 style={{ ...font.h3, color: colors.gray900, margin: `0 0 ${sp[1]} 0` }}>{item.title}</h4>
            <p style={{ ...font.tiny, color: colors.gray700, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Closing statement */}
      <div className="fragment" style={{
        padding: sp[3],
        background: colors.black,
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <p style={{ ...font.body, color: colors.white, margin: 0 }}>
          <strong style={{ color: colors.teal }}>Coherence isn't a document.</strong> It's a living model 
          that the agency owns and any team can build from.
        </p>
      </div>

      <aside className="notes">
        The pitch: Katalyst shifts ownership from vendor heads to agency-owned domain models.
        New vendors onboard from living docs. Recompetes take weeks, not years.
        The domain model is the agency's asset — it survives transitions.
      </aside>
    </section>
  );
}

/**
 * Slide: Domain Model as AI Development Foundation
 * Shows the built-in chat interface, agentic AI reference, and future development capabilities
 */
function DomainModelFutureSlide() {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: sp[4], marginBottom: sp[2], textAlign: 'left' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: `linear-gradient(135deg, ${colors.teal}, ${colors.violet})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Sparkles size={28} color={colors.white} />
        </div>
        <h2 style={{ ...font.h1, color: colors.gray900, margin: 0 }}>
          Your Domain Model — the Bedrock of the AI Age
        </h2>
      </div>
      <p style={{ ...font.body, color: colors.gray600, marginBottom: sp[4] }}>
        A living, queryable domain model that humans and AI agents both build from
      </p>

      {/* Three-column layout: Chat ← Domain Model → Terminal with flow lines */}
      <div className="fragment" style={{
        position: 'relative',
        marginBottom: sp[3],
        textAlign: 'left',
      }}>
        {/* SVG Flow Lines Overlay — bezier curves with glow connecting panels to center
             Container: ~1843 x 402. Left panel: 0-788, Center: 788-1055, Right: 1055-1843
             Using viewBox 0 0 1843 402 with preserveAspectRatio="none" to fill exactly */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 3,
            overflow: 'visible',
          }}
          viewBox="0 0 1843 402"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow-teal-flow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor={colors.teal} floodOpacity="0.6" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-violet-flow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor={colors.violet} floodOpacity="0.6" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left flow: Chat right edge (788) → Domain Model left edge (~858)
               Each dot gets randomized duration, size, delay, travel%, and peak opacity
               so they feel organic rather than mechanical */}
          {[
            { sy: 80, ey: 130, dur: 2.3, r: 5.5, delay: 0, travel: 0.58, peak: 0.85 },
            { sy: 183, ey: 200, dur: 1.8, r: 7, delay: 0.7, travel: 0.65, peak: 0.95 },
            { sy: 290, ey: 270, dur: 2.8, r: 5, delay: 1.3, travel: 0.52, peak: 0.8 },
          ].map((line, i) => {
            const d = `M 788 ${line.sy} C 810 ${line.sy}, 835 ${line.ey}, 858 ${line.ey}`;
            const dur = `${line.dur}s`;
            const t = line.travel; // fraction of duration spent traveling
            // fade-in ends at 5%, full opacity until travel%, fade-out by travel+10%, invisible rest
            const fadeOut = Math.min(t + 0.1, 0.95);
            return (
              <g key={`left-${i}`}>
                <path d={d} fill="none" stroke={colors.teal} strokeWidth="8" strokeOpacity="0.15" filter="url(#glow-teal-flow)" />
                <path d={d} fill="none" stroke={colors.teal} strokeWidth="3" strokeOpacity="0.6" strokeDasharray="10 6" />
                <circle r={line.r} fill={colors.teal} filter="url(#glow-teal-flow)">
                  <animateMotion
                    dur={dur}
                    begin={`${line.delay}s`}
                    repeatCount="indefinite"
                    path={d}
                    keyPoints={`0;1;1`}
                    keyTimes={`0;${t};1`}
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    dur={dur}
                    begin={`${line.delay}s`}
                    repeatCount="indefinite"
                    values={`0;${line.peak};${line.peak};0;0;0`}
                    keyTimes={`0;0.05;${t - 0.05};${fadeOut};0.95;1`}
                    calcMode="linear"
                  />
                </circle>
              </g>
            );
          })}

          {/* Right flow: Domain Model right edge (~985) → Terminal left edge (1055) */}
          {[
            { sy: 130, ey: 80, dur: 2.0, r: 6, delay: 0.4, travel: 0.6, peak: 0.9 },
            { sy: 200, ey: 183, dur: 2.6, r: 5, delay: 0, travel: 0.55, peak: 0.8 },
            { sy: 270, ey: 290, dur: 1.9, r: 6.5, delay: 1.1, travel: 0.63, peak: 0.92 },
          ].map((line, i) => {
            const d = `M 985 ${line.sy} C 1008 ${line.sy}, 1032 ${line.ey}, 1055 ${line.ey}`;
            const dur = `${line.dur}s`;
            const t = line.travel;
            const fadeOut = Math.min(t + 0.1, 0.95);
            return (
              <g key={`right-${i}`}>
                <path d={d} fill="none" stroke={colors.violet} strokeWidth="8" strokeOpacity="0.15" filter="url(#glow-violet-flow)" />
                <path d={d} fill="none" stroke={colors.violet} strokeWidth="3" strokeOpacity="0.6" strokeDasharray="10 6" />
                <circle r={line.r} fill={colors.violet} filter="url(#glow-violet-flow)">
                  <animateMotion
                    dur={dur}
                    begin={`${line.delay}s`}
                    repeatCount="indefinite"
                    path={d}
                    keyPoints={`0;1;1`}
                    keyTimes={`0;${t};1`}
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    dur={dur}
                    begin={`${line.delay}s`}
                    repeatCount="indefinite"
                    values={`0;${line.peak};${line.peak};0;0;0`}
                    keyTimes={`0;0.05;${t - 0.05};${fadeOut};0.95;1`}
                    calcMode="linear"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Three-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 0,
          alignItems: 'stretch',
        }}>
          {/* ---- Left: Chat Interface Mockup ---- */}
          <div style={{
            background: colors.white,
            borderRadius: '10px',
            border: `2px solid ${colors.teal}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            zIndex: 2,
          }}>
            {/* Title bar */}
            <div style={{
              padding: `${sp[2]} ${sp[3]}`,
              background: colors.teal,
              display: 'flex',
              alignItems: 'center',
              gap: sp[2],
            }}>
              <MessageSquare size={14} color={colors.white} />
              <span style={{ ...font.tiny, fontWeight: 600, color: colors.white }}>Katalyst Chat</span>
              <div style={{ marginLeft: 'auto', width: '7px', height: '7px', borderRadius: '50%', background: '#4ADE80' }} />
            </div>
            {/* Chat messages */}
            <div style={{
              padding: `${sp[2]} ${sp[3]}`,
              display: 'flex',
              flexDirection: 'column',
              gap: sp[2],
              flex: 1,
              background: colors.gray50,
            }}>
              {/* User message */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  ...font.tiny,
                  padding: `${sp[1]} ${sp[2]}`,
                  background: colors.teal,
                  color: colors.white,
                  borderRadius: '10px 10px 2px 10px',
                  maxWidth: '85%',
                  fontSize: '0.5em',
                }}>
                  What are the eligibility rules for disability claims?
                </div>
              </div>
              {/* Bot response */}
              <div style={{ display: 'flex', gap: sp[1], alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: colors.tealLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Sparkles size={11} color={colors.teal} />
                </div>
                <div style={{
                  fontSize: '0.5em',
                  padding: sp[2],
                  background: colors.white,
                  borderRadius: '2px 10px 10px 10px',
                  border: `1px solid ${colors.gray200}`,
                  color: colors.gray700,
                  lineHeight: 1.5,
                }}>
                  <strong style={{ color: colors.gray900 }}>Eligibility Rules</strong>
                  <div style={{ margin: '3px 0', height: '1px', background: colors.gray200 }} />
                  <div>• Service-connected condition verified</div>
                  <div>• Minimum 180 days active service</div>
                  <div>• Filed within 12 months of discharge</div>
                  <div style={{ marginTop: '4px', padding: '2px 6px', background: colors.tealLight, borderRadius: '3px', fontSize: '0.9em' }}>
                    <strong>Source:</strong> Claims / Eligibility Aggregate
                  </div>
                </div>
              </div>
              {/* Second user message */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  ...font.tiny,
                  padding: `${sp[1]} ${sp[2]}`,
                  background: colors.teal,
                  color: colors.white,
                  borderRadius: '10px 10px 2px 10px',
                  maxWidth: '85%',
                  fontSize: '0.5em',
                }}>
                  Which bounded context owns enrollment?
                </div>
              </div>
            </div>
            {/* Input bar */}
            <div style={{
              padding: `${sp[1]} ${sp[2]}`,
              borderTop: `1px solid ${colors.gray200}`,
              background: colors.white,
              display: 'flex',
              alignItems: 'center',
              gap: sp[1],
            }}>
              <div style={{
                flex: 1, padding: `3px ${sp[2]}`, background: colors.gray50,
                borderRadius: '16px', border: `1px solid ${colors.gray200}`,
                fontSize: '0.48em', color: colors.gray400,
              }}>
                Ask about your domain model...
              </div>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%', background: colors.teal,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Send size={10} color={colors.white} />
              </div>
            </div>
          </div>

          {/* ---- Center: Domain Model ---- */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${sp[4]} ${sp[8]}`,
            zIndex: 2,
          }}>
            <div style={{
              padding: `${sp[5]} ${sp[6]}`,
              background: `linear-gradient(135deg, ${colors.tealLight}, ${colors.violetLight})`,
              borderRadius: '20px',
              border: `2px solid ${colors.gray200}`,
              textAlign: 'center',
              boxShadow: `0 0 40px rgba(13, 148, 136, 0.15), 0 0 40px rgba(124, 58, 237, 0.15)`,
              position: 'relative',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.violet})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
                marginBottom: sp[2],
                boxShadow: `0 0 20px rgba(13, 148, 136, 0.3)`,
              }}>
                <Database size={22} color={colors.white} />
              </div>
              <div style={{ ...font.h3, color: colors.gray900, margin: 0, whiteSpace: 'nowrap' }}>Domain</div>
              <div style={{ ...font.h3, color: colors.gray900, margin: 0, whiteSpace: 'nowrap' }}>Model</div>
              <div style={{ margin: `${sp[2]} 0`, height: '1px', background: colors.gray300 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {['Glossary', 'Contexts', 'Aggregates', 'Events', 'Rules'].map((item, i) => (
                  <div key={i} style={{
                    fontSize: '0.48em',
                    color: colors.gray600,
                    padding: '2px 8px',
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: '4px',
                  }}>{item}</div>
                ))}
              </div>
            </div>
            <div style={{ ...font.tiny, color: colors.gray500, marginTop: sp[2], textAlign: 'center', fontWeight: 600 }}>
              Single Source of Truth
            </div>
          </div>

          {/* ---- Right: Agentic AI Terminal Mockup ---- */}
          <div style={{
            background: '#1E1E2E',
            borderRadius: '10px',
            border: `2px solid ${colors.violet}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            zIndex: 2,
          }}>
            {/* Terminal title bar */}
            <div style={{
              padding: `${sp[2]} ${sp[3]}`,
              background: '#14141F',
              display: 'flex',
              alignItems: 'center',
              gap: sp[2],
            }}>
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FEBC2E' }} />
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28C840' }} />
              </div>
              <span style={{ fontSize: '0.48em', fontFamily: 'JetBrains Mono, monospace', color: colors.gray400, marginLeft: sp[1] }}>
                agent: code-generator
              </span>
            </div>
            {/* Terminal output */}
            <div style={{
              padding: sp[3],
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.48em',
            }}>
              <div style={{ color: colors.gray400, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ChevronRight size={10} color={colors.violet} style={{ flexShrink: 0 }} />
                <span>Reading domain model...</span>
              </div>
              <div style={{ color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '3px', paddingLeft: '14px' }}>
                <CheckCircle2 size={9} color="#4ADE80" style={{ flexShrink: 0 }} />
                <span>Loaded: ClaimsProcessing context</span>
              </div>
              <div style={{ color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '3px', paddingLeft: '14px' }}>
                <CheckCircle2 size={9} color="#4ADE80" style={{ flexShrink: 0 }} />
                <span>Loaded: EligibilityCheck aggregate</span>
              </div>
              <div style={{ color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '3px', paddingLeft: '14px' }}>
                <CheckCircle2 size={9} color="#4ADE80" style={{ flexShrink: 0 }} />
                <span>Loaded: DisabilityClaim entity</span>
              </div>
              <div style={{ height: '4px' }} />
              <div style={{ color: colors.gray400, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ChevronRight size={10} color={colors.violet} style={{ flexShrink: 0 }} />
                <span>Generating eligibility.service.ts</span>
              </div>
              <div style={{ color: '#A5B4FC', paddingLeft: '14px' }}>
                enforcing: ServiceConnectionVerified
              </div>
              <div style={{ color: '#A5B4FC', paddingLeft: '14px' }}>
                enforcing: MinimumServiceDuration
              </div>
              <div style={{ color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '3px', paddingLeft: '14px' }}>
                <CheckCircle2 size={9} color="#4ADE80" style={{ flexShrink: 0 }} />
                <span>4 domain rules encoded</span>
              </div>
              <div style={{ height: '4px' }} />
              <div style={{ color: colors.gray400, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ChevronRight size={10} color={colors.violet} style={{ flexShrink: 0 }} />
                <span>Generating test scenarios...</span>
              </div>
              <div style={{ color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '3px', paddingLeft: '14px' }}>
                <CheckCircle2 size={9} color="#4ADE80" style={{ flexShrink: 0 }} />
                <span>12 tests · 4 invariants · 0 drift</span>
              </div>
              {/* Summary bar */}
              <div style={{
                marginTop: sp[2],
                padding: `${sp[1]} ${sp[2]}`,
                background: 'rgba(124, 58, 237, 0.15)',
                borderRadius: '5px',
                color: colors.violet,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(124, 58, 237, 0.25)',
              }}>
                <Shield size={11} color={colors.violet} style={{ flexShrink: 0 }} />
                <span>Code grounded in domain model</span>
              </div>
            </div>
          </div>
        </div>

        {/* Labels under panels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 0,
          marginTop: sp[2],
        }}>
          <div style={{ ...font.tiny, color: colors.teal, fontWeight: 700, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <MessageSquare size={12} color={colors.teal} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
            Human Interface
          </div>
          <div />
          <div style={{ ...font.tiny, color: colors.violet, fontWeight: 700, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Bot size={12} color={colors.violet} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
            Agent Interface
          </div>
        </div>
      </div>

      {/* Why this matters strip */}
      <div className="fragment" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: sp[3],
        textAlign: 'left',
        marginBottom: sp[3],
      }}>
        {[
          { icon: Shield, title: 'Keeps Systems Coherent', desc: 'Every AI-generated change is checked against the domain model — no drift', color: colors.teal },
          { icon: Brain, title: 'Onboards Any Agent', desc: 'New AI tools, new vendors, new teams — all start from the same shared understanding', color: colors.violet },
          { icon: Cpu, title: 'Future-Proof', desc: 'As AI capabilities evolve, the domain model ensures they serve your mission — not just generate code', color: colors.blue },
        ].map((item, i) => (
          <div key={i} style={{
            padding: sp[3],
            background: colors.gray50,
            borderRadius: '8px',
            borderTop: `3px solid ${item.color}`,
          }}>
            <item.icon size={18} color={item.color} style={{ marginBottom: sp[1] }} />
            <h4 style={{ ...font.h3, color: colors.gray900, margin: `0 0 ${sp[1]} 0` }}>{item.title}</h4>
            <p style={{ ...font.tiny, color: colors.gray700, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Closing */}
      <div className="fragment" style={{
        padding: sp[3],
        background: colors.black,
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <p style={{ ...font.body, color: colors.white, margin: 0 }}>
          In the agentic coding age, <strong style={{ color: colors.teal }}>the teams with encoded domain models</strong> will 
          build with confidence. Everyone else will generate plausible-looking chaos.
        </p>
      </div>

      <aside className="notes">
        Katalyst includes a built-in chat interface — anyone can query the domain model in plain language.
        But it also serves as ground truth for AI coding agents — code gen, test gen, architecture.
        This is the bedrock: in an uncertain agentic coding age, the domain model keeps everything coherent.
        Teams without one will generate plausible-looking chaos.
      </aside>
    </section>
  );
}

/**
 * Slide: Resources
 */
function ResourcesSlide() {
  return (
    <section>
      <h2 style={{ ...font.h1, color: colors.gray900, marginBottom: sp[5] }}>
        Resources & Next Steps
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[5], textAlign: 'left' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sp[2] }}>
            {[
              { icon: BookOpen, title: 'Documentation', desc: 'FOE principles & guides' },
              { icon: Layers, title: 'Templates', desc: 'Domain discovery tools' },
              { icon: Eye, title: 'Case Studies', desc: 'Government examples' },
              { icon: MessageSquare, title: 'Workshops', desc: 'Hands-on facilitation' },
            ].map((r, i) => (
              <div key={i} style={{
                padding: sp[3],
                background: colors.gray50,
                borderRadius: '6px',
                border: `1px solid ${colors.gray200}`,
              }}>
                <r.icon size={22} color={colors.teal} style={{ marginBottom: sp[1] }} />
                <h4 style={{ ...font.h3, color: colors.gray900, margin: `0 0 2px 0` }}>{r.title}</h4>
                <p style={{ ...font.small, color: colors.gray600, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            padding: sp[4],
            background: colors.gray50,
            borderRadius: '12px',
            border: `1px solid ${colors.gray200}`,
            display: 'inline-block',
          }}>
            <img 
              src="/flow-optimized-engineering/img/qr-foe-docs.svg" 
              alt="QR"
              style={{ width: '140px', height: '140px', marginBottom: sp[2] }}
            />
            <p style={{ ...font.small, fontWeight: 600, color: colors.gray900, margin: 0 }}>
              Scan for Docs
            </p>
          </div>
          
          <div style={{
            marginTop: sp[3],
            padding: sp[3],
            background: colors.gray900,
            borderRadius: '8px',
            width: '100%',
          }}>
            <p style={{ ...font.small, color: colors.white, margin: 0 }}>
              <strong style={{ color: colors.teal }}>Ready?</strong> Let's schedule your discovery workshop
            </p>
          </div>
        </div>
      </div>
      
      <div style={{
        marginTop: sp[5],
        padding: sp[4],
        background: colors.tealLight,
        borderRadius: '8px',
        textAlign: 'center',
        border: `2px solid ${colors.teal}30`,
      }}>
        <p style={{ ...font.body, color: colors.gray900, margin: 0 }}>
          <strong>Mission continuity starts with one system, one domain, one decision to encode.</strong>
        </p>
      </div>

      <aside className="notes">
        Resources: docs, templates, case studies, workshops.
        Start with one system, one domain, one decision.
      </aside>
    </section>
  );
}

/**
 * Export all slides
 */
export function GovMissionSlides() {
  return (
    <>
      <TitleSlide />
      <DomainCrisisSlide />
      <CostOfPoorEncodingSlide />
      <RealExamplesSlide />
      <MissionContinuitySlide />
      <CoherenceGapSlide />
      <KatalystCollaborationSlide />
      <KatalystDomainMapperSlide />
      <KatalystOwnershipSlide />
      <DomainModelFutureSlide />
      <UnderstandingPrincipleSlide />
      <DomainMappingSlide />
      <HeadsToSystemsSlide />
      <FastFeedbackSlide />
      <ConfidenceSlide />
      <GettingStartedSlide />
      <ResourcesSlide />
    </>
  );
}

export {
  TitleSlide,
  DomainCrisisSlide,
  CostOfPoorEncodingSlide,
  RealExamplesSlide,
  MissionContinuitySlide,
  CoherenceGapSlide,
  KatalystCollaborationSlide,
  KatalystDomainMapperSlide,
  KatalystOwnershipSlide,
  DomainModelFutureSlide,
  UnderstandingPrincipleSlide,
  DomainMappingSlide,
  HeadsToSystemsSlide,
  FastFeedbackSlide,
  ConfidenceSlide,
  GettingStartedSlide,
  ResourcesSlide,
};

export default GovMissionSlides;
