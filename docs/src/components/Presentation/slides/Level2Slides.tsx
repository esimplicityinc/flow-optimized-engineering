import React from 'react';
import { Slide, FragmentBlock } from '../Slide';
import { 
  Brain, 
  RefreshCw, 
  Shield, 
  BookOpen, 
  Megaphone, 
  Dice5, 
  Frown, 
  AlertTriangle, 
  Loader2 
} from 'lucide-react';

// Icon styling constants
const principleIconSize = 48;
const diagramIconSize = 32;
const failureModeIconSize = 36;
const checklistIconSize = 20;

/**
 * Level 2 Slides: Core Principles (Slides 9-18)
 * Deep dive into the three FOE principles and their interactions
 */
export function Level2Slides() {
  return (
    <>
      {/* Section Divider - Core Principles */}
      <Slide backgroundGradient darkBg>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}>
          <div style={{
            fontSize: '0.9em',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '1em'
          }}>
            Part 2
          </div>
          <h2 style={{ 
            color: 'white', 
            fontSize: '2em',
            margin: 0,
            fontWeight: 700
          }}>
            Core Principles
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1em',
            marginTop: '1em'
          }}>
            The Cognitive Triangle
          </p>
        </div>
        <aside className="notes">
          Section transition. We've established WHY speed and safety aren't tradeoffs.
          Now we'll explore the three principles that make this possible.
        </aside>
      </Slide>

      {/* Slide 9 - The Cognitive Triangle (Expanded) */}
      <Slide>
        <h2>Three Optimizations, One System</h2>
        <p style={{ fontSize: '0.9em', color: 'var(--foe-text-light)', marginBottom: '1em' }}>
          Each enables the others. Each can destroy the others.
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: '1em'
        }}>
          <img 
            src="/flow-optimized-engineering/img/illustrations/cognitive-triangle.png" 
            alt="Cognitive Triangle: Understanding, Fast Feedback, Confidence"
            style={{ 
              maxHeight: '450px',
              maxWidth: '90%',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
          />
        </div>
        
        <aside className="notes">
          The three principles form a system, not a checklist. When you optimize one,
          you enable the others. When you neglect one, it drags down the others.
          This is why FOE requires balance—you cannot just maximize one dimension.
        </aside>
      </Slide>

      {/* Slide 10 - Principle 1: Understanding */}
      <Slide>
        <div style={{ borderLeft: '8px solid #3EC5BB', paddingLeft: '1.5em' }}>
          <div style={{ marginBottom: '0.5em' }}>
            <Brain size={principleIconSize} color="#3EC5BB" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h2 style={{ color: '#3EC5BB', margin: '0 0 0.5em 0' }}>
            Optimize for Understanding
          </h2>
          <p style={{ 
            fontSize: '1.1em', 
            fontStyle: 'italic',
            color: 'var(--foe-text)',
            maxWidth: '80%'
          }}>
            "Form accurate mental models—predict how systems behave before changing them"
          </p>
        </div>
        
        <FragmentBlock animation="fade-up">
          <div style={{ 
            marginTop: '2em',
            padding: '1em 1.5em',
            background: 'rgba(62, 197, 187, 0.1)',
            borderRadius: '12px',
            fontSize: '0.8em'
          }}>
            <strong>The goal:</strong> When you read code, you should be able to predict what it does.
            When you write code, others should be able to understand your intent.
          </div>
        </FragmentBlock>
        
        <aside className="notes">
          Understanding is about mental models. Can you predict what will happen
          when you make a change? If not, you're operating blind. Understanding
          reduces the cognitive load of making changes and enables confident action.
        </aside>
      </Slide>

      {/* Slide 11 - Understanding in Practice */}
      <Slide>
        <h2 style={{ color: '#3EC5BB' }}>What Understanding Looks Like</h2>
        
        <div className="card-grid">
          <FragmentBlock animation="fade-up" index={0}>
            <div className="card" style={{ borderTop: '4px solid #3EC5BB' }}>
              <h4>Traceable Change</h4>
              <p>Commits explain "why" not just "what"—you can follow the reasoning</p>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={1}>
            <div className="card" style={{ borderTop: '4px solid #3EC5BB' }}>
              <h4>Explicit Invariants</h4>
              <p>Assertions document assumptions—the code tells you what must be true</p>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={2}>
            <div className="card" style={{ borderTop: '4px solid #3EC5BB' }}>
              <h4>Visible Policies</h4>
              <p>Configuration over magic—behavior is explicit, not hidden</p>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={3}>
            <div className="card" style={{ borderTop: '4px solid #3EC5BB' }}>
              <h4>Coherent Mental Models</h4>
              <p>Domain-Driven Design—code reflects how the business thinks</p>
            </div>
          </FragmentBlock>
        </div>
        
        <aside className="notes">
          Each of these practices serves understanding. Traceable change means
          you can learn from history. Explicit invariants mean the code teaches
          you its constraints. Visible policies mean no hidden surprises.
          Coherent mental models mean the code matches how you think about the domain.
        </aside>
      </Slide>

      {/* Slide 12 - Principle 2: Fast Feedback */}
      <Slide>
        <div style={{ borderLeft: '8px solid #CC8BFA', paddingLeft: '1.5em' }}>
          <div style={{ marginBottom: '0.5em' }}>
            <RefreshCw size={principleIconSize} color="#CC8BFA" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h2 style={{ color: '#CC8BFA', margin: '0 0 0.5em 0' }}>
            Optimize for Fast Feedback
          </h2>
          <p style={{ 
            fontSize: '1.1em', 
            fontStyle: 'italic',
            color: 'var(--foe-text)',
            maxWidth: '80%'
          }}>
            "Close the gap between making a decision and discovering if it was right"
          </p>
        </div>
        
        <FragmentBlock animation="fade-up">
          <div style={{ 
            marginTop: '2em',
            padding: '1em 1.5em',
            background: 'rgba(204, 139, 250, 0.1)',
            borderRadius: '12px',
            fontSize: '0.8em'
          }}>
            <strong>The goal:</strong> Learn you're wrong before you've gone too far.
          </div>
        </FragmentBlock>
        
        <aside className="notes">
          Fast feedback is about reducing the time between action and learning.
          The faster you learn, the faster you can correct course. Slow feedback
          means you accumulate errors. Fast feedback keeps you on track.
        </aside>
      </Slide>

      {/* Slide 13 - Fast Feedback in Practice */}
      <Slide>
        <h2 style={{ color: '#CC8BFA' }}>Three Focus Areas</h2>
        
        <div className="three-columns" style={{ marginTop: '1.5em' }}>
          <FragmentBlock animation="fade-up" index={0}>
            <div className="principle-card feedback" style={{ padding: '1.5em' }}>
              <h3 style={{ fontSize: '1em', color: '#CC8BFA' }}>Time-to-Disconfirmation</h3>
              <p style={{ fontSize: '0.7em', marginTop: '0.5em' }}>
                How quickly can you discover you're <em>wrong</em>?
              </p>
              <div style={{ fontSize: '0.65em', color: 'var(--foe-text-light)', marginTop: '0.5em' }}>
                Tests, type checks, linters, previews
              </div>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={1}>
            <div className="principle-card feedback" style={{ padding: '1.5em' }}>
              <h3 style={{ fontSize: '1em', color: '#CC8BFA' }}>Visibility of Consequences</h3>
              <p style={{ fontSize: '0.7em', marginTop: '0.5em' }}>
                Can you <em>see</em> the impact of your changes?
              </p>
              <div style={{ fontSize: '0.65em', color: 'var(--foe-text-light)', marginTop: '0.5em' }}>
                Observability, logging, metrics, staging
              </div>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={2}>
            <div className="principle-card feedback" style={{ padding: '1.5em' }}>
              <h3 style={{ fontSize: '1em', color: '#CC8BFA' }}>Selection Pressure</h3>
              <p style={{ fontSize: '0.7em', marginTop: '0.5em' }}>
                Does feedback drive better decisions?
              </p>
              <div style={{ fontSize: '0.65em', color: 'var(--foe-text-light)', marginTop: '0.5em' }}>
                Retros, post-mortems, A/B tests, user research
              </div>
            </div>
          </FragmentBlock>
        </div>
        
        <aside className="notes">
          Three dimensions of fast feedback: How fast do you learn you're wrong?
          Can you actually see what happened? And does that learning change behavior?
          All three must be present for feedback to actually improve your work.
        </aside>
      </Slide>

      {/* Slide 14 - Principle 3: Confidence */}
      <Slide>
        <div style={{ borderLeft: '8px solid #3B82F6', paddingLeft: '1.5em' }}>
          <div style={{ marginBottom: '0.5em' }}>
            <Shield size={principleIconSize} color="#3B82F6" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h2 style={{ color: '#3B82F6', margin: '0 0 0.5em 0' }}>
            Optimize for Confidence
          </h2>
          <p style={{ 
            fontSize: '1.1em', 
            fontStyle: 'italic',
            color: 'var(--foe-text)',
            maxWidth: '80%'
          }}>
            "Act when you don't know the outcome, because risk is bounded and reversible"
          </p>
        </div>
        
        <FragmentBlock animation="fade-up">
          <div style={{ 
            marginTop: '2em',
            padding: '1em 1.5em',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '12px',
            fontSize: '0.8em'
          }}>
            <strong>The goal:</strong> Make acting under uncertainty safe.
          </div>
        </FragmentBlock>
        
        <aside className="notes">
          Confidence is not about certainty—it's about bounded risk. You can
          act confidently when you know the blast radius is limited and you
          can recover from mistakes. This enables speed without recklessness.
        </aside>
      </Slide>

      {/* Slide 15 - The Three Confidence Statements */}
      <Slide>
        <h2 style={{ color: '#3B82F6' }}>The Confidence Test</h2>
        <p style={{ fontSize: '0.8em', color: 'var(--foe-text-light)', marginBottom: '1.5em' }}>
          Before taking action, can you honestly say...
        </p>
        
        <ul className="check-list" style={{ fontSize: '1.1em', maxWidth: '80%', margin: '0 auto' }}>
          <FragmentBlock animation="fade-up" index={0}>
            <li style={{ marginBottom: '1em' }}>
              <strong>"I know what happens if this fails"</strong>
              <div style={{ fontSize: '0.7em', color: 'var(--foe-text-light)', marginTop: '0.3em' }}>
                You've thought through failure modes and their impacts
              </div>
            </li>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={1}>
            <li style={{ marginBottom: '1em' }}>
              <strong>"I can undo this"</strong>
              <div style={{ fontSize: '0.7em', color: 'var(--foe-text-light)', marginTop: '0.3em' }}>
                You have a rollback plan or the change is reversible
              </div>
            </li>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={2}>
            <li style={{ marginBottom: '1em' }}>
              <strong>"I'm inside the envelope"</strong>
              <div style={{ fontSize: '0.7em', color: 'var(--foe-text-light)', marginTop: '0.3em' }}>
                This is within your team's operational boundaries
              </div>
            </li>
          </FragmentBlock>
        </ul>
        
        <aside className="notes">
          These three statements form the confidence test. If you can say all three
          honestly, you can act with confidence even under uncertainty. If you can't
          say one of them, that's where you need to invest before proceeding.
        </aside>
      </Slide>

      {/* Slide 16 - How Principles Interact */}
      <Slide>
        <h2>The Virtuous Cycle</h2>
        
        <div style={{ position: 'relative', height: '400px', margin: '1em auto', maxWidth: '700px' }}>
          <svg 
            viewBox="0 0 700 400" 
            style={{ width: '100%', height: '100%' }}
            role="img"
            aria-labelledby="virtuous-cycle-title virtuous-cycle-desc"
          >
            <title id="virtuous-cycle-title">The Virtuous Cycle of Flow Optimized Engineering</title>
            <desc id="virtuous-cycle-desc">
              A triangular diagram showing how Understanding, Fast Feedback, and Confidence 
              reinforce each other: Understanding enables confident action, Confidence enables 
              experimentation, and Feedback improves understanding.
            </desc>
            {/* Curved bidirectional arrows */}
            {/* Understanding to Feedback */}
            <path d="M 200 100 Q 350 50 500 100" fill="none" stroke="#3EC5BB" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
            <path d="M 500 120 Q 350 70 200 120" fill="none" stroke="#CC8BFA" strokeWidth="3" markerEnd="url(#arrow-purple)" />
            
            {/* Feedback to Confidence */}
            <path d="M 550 150 Q 620 250 550 350" fill="none" stroke="#CC8BFA" strokeWidth="3" markerEnd="url(#arrow-purple)" />
            <path d="M 520 350 Q 590 250 520 150" fill="none" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrow-green)" />
            
            {/* Confidence to Understanding */}
            <path d="M 450 380 Q 350 420 200 350" fill="none" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrow-green)" />
            <path d="M 200 320 Q 350 390 450 350" fill="none" stroke="#3EC5BB" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
            
            {/* Arrow markers */}
            <defs>
              <marker id="arrow-cyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#3EC5BB" />
              </marker>
              <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#CC8BFA" />
              </marker>
              <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#3B82F6" />
              </marker>
            </defs>
          </svg>
          
          {/* Node boxes */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '50px',
            background: 'linear-gradient(135deg, rgba(62, 197, 187, 0.2) 0%, rgba(62, 197, 187, 0.1) 100%)',
            border: '2px solid #3EC5BB',
            borderRadius: '12px',
            padding: '0.8em 1.2em',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3em'
          }}>
            <Brain size={diagramIconSize} color="#3EC5BB" strokeWidth={1.5} aria-hidden="true" />
            <div style={{ fontWeight: 600, color: '#3EC5BB' }}>Understanding</div>
          </div>
          
          <div style={{
            position: 'absolute',
            top: '80px',
            right: '50px',
            background: 'linear-gradient(135deg, rgba(204, 139, 250, 0.2) 0%, rgba(204, 139, 250, 0.1) 100%)',
            border: '2px solid #CC8BFA',
            borderRadius: '12px',
            padding: '0.8em 1.2em',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3em'
          }}>
            <RefreshCw size={diagramIconSize} color="#CC8BFA" strokeWidth={1.5} aria-hidden="true" />
            <div style={{ fontWeight: 600, color: '#CC8BFA' }}>Fast Feedback</div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
            border: '2px solid #3B82F6',
            borderRadius: '12px',
            padding: '0.8em 1.2em',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3em'
          }}>
            <Shield size={diagramIconSize} color="#3B82F6" strokeWidth={1.5} aria-hidden="true" />
            <div style={{ fontWeight: 600, color: '#3B82F6' }}>Confidence</div>
          </div>
        </div>
        
        <p style={{ fontSize: '0.75em', color: 'var(--foe-text-light)', textAlign: 'center' }}>
          Understanding enables confident action → Confidence enables experimentation → 
          Feedback improves understanding
        </p>
        
        <aside className="notes">
          The principles reinforce each other. Better understanding means you can act
          with more confidence. More confidence means you'll experiment. More experiments
          mean more feedback. More feedback means better understanding. This is the
          virtuous cycle of flow.
        </aside>
      </Slide>

      {/* Slide 17 - Isolated Principle Failures */}
      <Slide>
        <h2>Failure Modes: Isolated Principles</h2>
        <p style={{ fontSize: '0.75em', color: 'var(--foe-text-light)', marginBottom: '1em' }}>
          What happens when you have only one principle
        </p>
        
        <div className="card-grid cols-3" style={{ fontSize: '0.8em' }}>
          <FragmentBlock animation="fade-up" index={0}>
            <div className="card" style={{ background: 'rgba(62, 197, 187, 0.1)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#3EC5BB' }}>Understanding alone</div>
              <div style={{ margin: '0.5em 0', display: 'flex', justifyContent: 'center' }}>
                <BookOpen size={failureModeIconSize} color="#3EC5BB" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div style={{ fontWeight: 600 }}>Theoretical</div>
              <div style={{ fontSize: '0.8em', color: 'var(--foe-text-light)' }}>Analysis paralysis</div>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={1}>
            <div className="card" style={{ background: 'rgba(204, 139, 250, 0.1)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#CC8BFA' }}>Fast Feedback alone</div>
              <div style={{ margin: '0.5em 0', display: 'flex', justifyContent: 'center' }}>
                <Megaphone size={failureModeIconSize} color="#CC8BFA" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div style={{ fontWeight: 600 }}>Noise</div>
              <div style={{ fontSize: '0.8em', color: 'var(--foe-text-light)' }}>Data without insight</div>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={2}>
            <div className="card" style={{ background: 'rgba(59, 130, 246, 0.1)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#3B82F6' }}>Confidence alone</div>
              <div style={{ margin: '0.5em 0', display: 'flex', justifyContent: 'center' }}>
                <Dice5 size={failureModeIconSize} color="#3B82F6" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div style={{ fontWeight: 600 }}>Reckless</div>
              <div style={{ fontSize: '0.8em', color: 'var(--foe-text-light)' }}>Move fast, break things</div>
            </div>
          </FragmentBlock>
        </div>
        
        <aside className="notes">
          When a single principle operates in isolation, it becomes a liability.
          Theoretical teams study but don't ship - endless design docs, no code.
          Noisy teams have dashboards everywhere but no insight - data without meaning.
          Reckless teams move fast and break things - confidence without basis.
        </aside>
      </Slide>

      {/* Slide 17b - Missing One Principle Failures */}
      <Slide>
        <h2>Failure Modes: Missing One</h2>
        <p style={{ fontSize: '0.75em', color: 'var(--foe-text-light)', marginBottom: '1em' }}>
          What happens when two principles work without the third
        </p>
        
        <div className="card-grid cols-3" style={{ fontSize: '0.8em' }}>
          <FragmentBlock animation="fade-up" index={0}>
            <div className="card" style={{ background: 'rgba(245, 158, 11, 0.1)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: 'var(--foe-warning)' }}>Missing Confidence</div>
              <div style={{ margin: '0.5em 0', display: 'flex', justifyContent: 'center' }}>
                <Frown size={failureModeIconSize} color="#F59E0B" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div style={{ fontWeight: 600 }}>Paralyzed</div>
              <div style={{ fontSize: '0.8em', color: 'var(--foe-text-light)' }}>Know what's wrong, afraid to act</div>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={1}>
            <div className="card" style={{ background: 'rgba(245, 158, 11, 0.1)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: 'var(--foe-warning)' }}>Missing Feedback</div>
              <div style={{ margin: '0.5em 0', display: 'flex', justifyContent: 'center' }}>
                <AlertTriangle size={failureModeIconSize} color="#F59E0B" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div style={{ fontWeight: 600 }}>Arrogant</div>
              <div style={{ fontSize: '0.8em', color: 'var(--foe-text-light)' }}>Confident but unchecked</div>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={2}>
            <div className="card" style={{ background: 'rgba(245, 158, 11, 0.1)', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: 'var(--foe-warning)' }}>Missing Understanding</div>
              <div style={{ margin: '0.5em 0', display: 'flex', justifyContent: 'center' }}>
                <Loader2 size={failureModeIconSize} color="#F59E0B" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div style={{ fontWeight: 600 }}>Chaotic</div>
              <div style={{ fontSize: '0.8em', color: 'var(--foe-text-light)' }}>Rapid iteration, no direction</div>
            </div>
          </FragmentBlock>
        </div>
        
        <div className="fragment" style={{ marginTop: '1.5em' }}>
          <p style={{ fontSize: '0.85em', textAlign: 'center', fontStyle: 'italic' }}>
            All three principles are needed for sustainable flow.
          </p>
        </div>
        
        <aside className="notes">
          Two out of three isn't enough either.
          Paralyzed teams know the problems and see the data, but can't act on it.
          Arrogant teams understand and feel confident, but never verify they're right.
          Chaotic teams iterate fast with confidence, but have no direction.
          The lesson: balance all three or the system degrades.
        </aside>
      </Slide>

      {/* Slide 18 - Balance Mechanism */}
      <Slide>
        <h2>When In Doubt, Ask...</h2>
        
        <blockquote style={{ marginTop: '1em', marginBottom: '1.5em' }}>
          <p style={{ fontSize: '1.1em', margin: 0 }}>
            "Which principle is weakest right now?<br />
            That's where to invest."
          </p>
        </blockquote>
        
        <div className="three-columns" style={{ fontSize: '0.75em', marginTop: '1.5em' }}>
          <FragmentBlock animation="fade-up" index={0}>
            <div style={{ textAlign: 'left', padding: '1em', background: 'rgba(62, 197, 187, 0.08)', borderRadius: '12px' }}>
              <h4 style={{ color: '#3EC5BB', margin: '0 0 0.5em 0', display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                <Brain size={checklistIconSize} color="#3EC5BB" strokeWidth={2} aria-hidden="true" />
                Check Understanding
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2em', lineHeight: 1.6 }}>
                <li>Can I explain what this code does?</li>
                <li>Do I know why it was built this way?</li>
                <li>Can I predict the impact of changes?</li>
              </ul>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={1}>
            <div style={{ textAlign: 'left', padding: '1em', background: 'rgba(204, 139, 250, 0.08)', borderRadius: '12px' }}>
              <h4 style={{ color: '#CC8BFA', margin: '0 0 0.5em 0', display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                <RefreshCw size={checklistIconSize} color="#CC8BFA" strokeWidth={2} aria-hidden="true" />
                Check Feedback
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2em', lineHeight: 1.6 }}>
                <li>How long until I know if this works?</li>
                <li>Can I see the effects of my changes?</li>
                <li>Am I learning from what I observe?</li>
              </ul>
            </div>
          </FragmentBlock>
          
          <FragmentBlock animation="fade-up" index={2}>
            <div style={{ textAlign: 'left', padding: '1em', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '12px' }}>
              <h4 style={{ color: '#3B82F6', margin: '0 0 0.5em 0', display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                <Shield size={checklistIconSize} color="#3B82F6" strokeWidth={2} aria-hidden="true" />
                Check Confidence
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2em', lineHeight: 1.6 }}>
                <li>Do I know what failure looks like?</li>
                <li>Can I roll back if needed?</li>
                <li>Is this within safe boundaries?</li>
              </ul>
            </div>
          </FragmentBlock>
        </div>
        
        <aside className="notes">
          Use this diagnostic when you feel stuck. The weakest principle is usually
          the bottleneck. If you can't understand the system, invest in understanding.
          If feedback is slow, speed it up. If you lack confidence, reduce risk.
          Balance is the key to sustainable flow.
        </aside>
      </Slide>
    </>
  );
}

export default Level2Slides;
