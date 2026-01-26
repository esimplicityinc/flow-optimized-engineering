import React from 'react';

/**
 * Level 1: Executive Summary Slides (1-8)
 * 
 * These slides provide a high-level overview of Flow Optimized Engineering
 * for executives and stakeholders who need to understand the core value
 * proposition in 10-15 minutes.
 */

/**
 * Slide 1: Title Slide
 * Introduces FOE with the core tagline
 */
function TitleSlide() {
  return (
    <section 
      data-background="linear-gradient(135deg, #1e40af 0%, #0f172a 100%)"
      className="title-slide dark-bg"
    >
      <div style={{ marginBottom: '2em' }}>
        {/* FOE Logo placeholder - reference to actual logo */}
        <div 
          style={{ 
            width: '120px', 
            height: '120px', 
            margin: '0 auto 1em',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3em'
          }}
        >
          FOE
        </div>
      </div>
      <h1 style={{ color: 'white', marginBottom: '0.3em' }}>
        Flow Optimized Engineering
      </h1>
      <p className="subtitle" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.3em' }}>
        Go Faster by Knowing More, Not by Caring Less
      </p>
      <aside className="notes">
        Welcome everyone. Today I want to introduce you to Flow Optimized Engineering - 
        a delivery doctrine that challenges a fundamental assumption most organizations make: 
        that speed and quality are opposing forces. Our core thesis is simple but profound: 
        you can go faster by knowing more, not by caring less.
      </aside>
    </section>
  );
}

/**
 * Slide 2: The Challenge
 * Presents the false dichotomy most organizations face
 */
function ChallengeSlide() {
  return (
    <section>
      <h2>The Speed vs. Safety Tradeoff</h2>
      <p style={{ fontSize: '1.1em', marginBottom: '1.5em' }}>
        Most organizations believe they must choose...
      </p>
      <div className="two-columns" style={{ marginTop: '2em' }}>
        <div className="fragment" data-fragment-index={0}>
          <div 
            style={{ 
              padding: '2em', 
              background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
              borderRadius: '16px',
              border: '2px solid #d97706'
            }}
          >
            <h3 style={{ color: '#d97706', marginBottom: '0.5em' }}>Move Fast</h3>
            <p style={{ fontSize: '0.8em', color: '#64748b' }}>
              Skip reviews, reduce testing, push through technical debt
            </p>
          </div>
        </div>
        <div className="fragment" data-fragment-index={1}>
          <div 
            style={{ 
              padding: '2em', 
              background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.15) 0%, rgba(30, 64, 175, 0.05) 100%)',
              borderRadius: '16px',
              border: '2px solid #1e40af'
            }}
          >
            <h3 style={{ color: '#1e40af', marginBottom: '0.5em' }}>...Or Be Careful?</h3>
            <p style={{ fontSize: '0.8em', color: '#64748b' }}>
              Heavy processes, extensive approvals, slow release cycles
            </p>
          </div>
        </div>
      </div>
      <div className="fragment" data-fragment-index={2} style={{ marginTop: '2em' }}>
        <p style={{ fontSize: '1.2em', fontWeight: '600', color: '#dc2626' }}>
          This is a false choice.
        </p>
      </div>
      <aside className="notes">
        Here's the challenge we see in most organizations. They believe they're facing 
        a fundamental tradeoff. On one side, you can move fast - but that means cutting 
        corners, skipping reviews, accumulating debt. On the other side, you can be careful - 
        but that means heavy processes, slow cycles, frustrated teams. But here's the thing: 
        this is a false dichotomy. The highest performing teams in the industry have proven 
        that speed and safety aren't opposing forces at all.
      </aside>
    </section>
  );
}

/**
 * Slide 3: The FOE Thesis
 * The core philosophical insight
 */
function ThesisSlide() {
  return (
    <section 
      data-background="linear-gradient(135deg, #1e40af 0%, #0f172a 100%)"
      className="dark-bg"
    >
      <blockquote 
        style={{ 
          background: 'rgba(255,255,255,0.1)', 
          borderLeft: '6px solid rgba(255,255,255,0.5)',
          fontSize: '1.4em',
          padding: '1.5em 2em'
        }}
      >
        <p style={{ color: 'white', fontStyle: 'italic', lineHeight: '1.5' }}>
          "Speed and safety are the same thing viewed from different angles."
        </p>
      </blockquote>
      <p className="fragment" style={{ marginTop: '2em', color: 'rgba(255,255,255,0.8)' }}>
        When you truly understand your system, you can move with both speed <em>and</em> confidence.
      </p>
      <aside className="notes">
        This is our core thesis: Speed and safety are the same thing viewed from 
        different angles. This isn't just philosophy - it's backed by data. When teams 
        have deep understanding of their systems, when they get fast feedback on their 
        changes, when they have genuine confidence in their deployments, they can move 
        quickly because they're not afraid. Fear is the real enemy of velocity.
      </aside>
    </section>
  );
}

/**
 * Slide 4: The Gauges Metaphor
 * Race car dashboard analogy for instrumentation
 */
function GaugesMetaphorSlide() {
  return (
    <section data-auto-animate>
      <h2>Instrumentation = Acceleration</h2>
      <div data-id="metaphor" style={{ marginTop: '2em' }}>
        <div className="two-columns" style={{ alignItems: 'center' }}>
          <div className="fragment" data-fragment-index={0}>
            <div 
              style={{ 
                padding: '2em', 
                background: '#fee2e2',
                borderRadius: '16px',
                border: '2px solid #dc2626'
              }}
            >
              <h4 style={{ color: '#dc2626', marginBottom: '0.8em' }}>
                Taped Dashboard
              </h4>
              <p style={{ fontSize: '0.75em', color: '#64748b', marginBottom: '0.5em' }}>
                No speedometer, no fuel gauge, no warning lights
              </p>
              <p style={{ fontSize: '0.85em', fontWeight: '600' }}>
                You drive <em>slowly</em> because you're afraid
              </p>
            </div>
          </div>
          <div className="fragment" data-fragment-index={1}>
            <div 
              style={{ 
                padding: '2em', 
                background: '#dcfce7',
                borderRadius: '16px',
                border: '2px solid #059669'
              }}
            >
              <h4 style={{ color: '#059669', marginBottom: '0.8em' }}>
                Full Instruments
              </h4>
              <p style={{ fontSize: '0.75em', color: '#64748b', marginBottom: '0.5em' }}>
                Real-time data on every system, instant feedback
              </p>
              <p style={{ fontSize: '0.85em', fontWeight: '600' }}>
                You drive <em>confidently</em> at full speed
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fragment" data-fragment-index={2} style={{ marginTop: '1.5em' }}>
        <p style={{ fontSize: '1.1em' }}>
          <strong>Race car drivers don't slow down for safety.</strong><br />
          <span style={{ color: '#64748b' }}>They instrument everything so they can go faster.</span>
        </p>
      </div>
      <aside className="notes">
        Think about a race car. Imagine taping over all the dashboard gauges - no speedometer, 
        no fuel gauge, no warning lights. How would you drive? Slowly, cautiously, afraid 
        of running out of fuel or overheating. Now imagine full instrumentation - real-time 
        data on every system. Race car drivers don't slow down for safety. They instrument 
        everything so they can push to the absolute limit while staying safe. That's what 
        FOE is about - giving your engineering team the instrumentation they need to go 
        full speed with confidence.
      </aside>
    </section>
  );
}

/**
 * Slide 5: What FOE Is
 * Clarifying the doctrine vs methodology distinction
 */
function WhatFOEIsSlide() {
  return (
    <section>
      <h2>A Delivery Doctrine</h2>
      <div className="two-columns" style={{ marginTop: '1.5em', gap: '3em' }}>
        <div>
          <h3 style={{ color: '#059669', marginBottom: '0.8em' }}>FOE IS</h3>
          <ul className="check-list">
            <li className="fragment" data-fragment-index={0}>
              <strong>Principles</strong> that guide decisions
            </li>
            <li className="fragment" data-fragment-index={1}>
              <strong>Evidence-based</strong> practices
            </li>
            <li className="fragment" data-fragment-index={2}>
              <strong>Adaptable</strong> to your context
            </li>
            <li className="fragment" data-fragment-index={3}>
              <strong>Measurable</strong> in outcomes
            </li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#dc2626', marginBottom: '0.8em' }}>FOE IS NOT</h3>
          <ul className="check-list cross-list">
            <li className="fragment" data-fragment-index={4}>
              A rigid methodology
            </li>
            <li className="fragment" data-fragment-index={5}>
              A checklist to follow
            </li>
            <li className="fragment" data-fragment-index={6}>
              A tool to purchase
            </li>
            <li className="fragment" data-fragment-index={7}>
              A certification program
            </li>
          </ul>
        </div>
      </div>
      <aside className="notes">
        So what exactly is FOE? It's important to be clear: FOE is a delivery doctrine - 
        a set of principles that guide how you make decisions. It's evidence-based, 
        meaning every practice is backed by research and real-world data. It's adaptable - 
        the principles apply whether you're a startup or an enterprise. And it's measurable - 
        we track real outcomes, not activity metrics. What FOE is NOT: it's not a rigid 
        methodology you have to follow step by step. It's not a checklist. It's not a tool 
        you buy. It's not a certification you earn. It's a way of thinking that transforms 
        how your teams deliver software.
      </aside>
    </section>
  );
}

/**
 * Slide 6: The Business Case
 * DORA metrics showing the performance gap
 */
function BusinessCaseSlide() {
  return (
    <section>
      <h2>The Performance Gap</h2>
      <p style={{ fontSize: '0.9em', color: '#64748b', marginBottom: '1.5em' }}>
        Elite performers vs. the rest (DORA State of DevOps Research)
      </p>
      <div className="card-grid cols-4" style={{ marginTop: '1em' }}>
        <div className="fragment stat-block" data-fragment-index={0}>
          <div className="stat-value" style={{ fontSize: '2.5em' }}>208<span style={{ fontSize: '0.4em' }}>x</span></div>
          <div className="stat-label">more frequent deploys</div>
        </div>
        <div className="fragment stat-block" data-fragment-index={1}>
          <div className="stat-value" style={{ fontSize: '2.5em' }}>106<span style={{ fontSize: '0.4em' }}>x</span></div>
          <div className="stat-label">faster lead time</div>
        </div>
        <div className="fragment stat-block" data-fragment-index={2}>
          <div className="stat-value" style={{ fontSize: '2.5em' }}>7<span style={{ fontSize: '0.4em' }}>x</span></div>
          <div className="stat-label">lower change failure</div>
        </div>
        <div className="fragment stat-block" data-fragment-index={3}>
          <div className="stat-value" style={{ fontSize: '2.5em' }}>2604<span style={{ fontSize: '0.4em' }}>x</span></div>
          <div className="stat-label">faster recovery</div>
        </div>
      </div>
      <div className="fragment" data-fragment-index={4} style={{ marginTop: '2em' }}>
        <div 
          className="highlight-box" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
            border: '2px solid #059669'
          }}
        >
          <p style={{ margin: 0, fontSize: '1.1em' }}>
            <strong>Elite teams deploy faster AND fail less.</strong><br />
            <span style={{ color: '#64748b', fontSize: '0.85em' }}>
              Speed and stability are correlated, not opposed.
            </span>
          </p>
        </div>
      </div>
      <aside className="notes">
        Let's look at the data. The DORA research, which has studied thousands of organizations 
        over nearly a decade, shows stark differences between elite performers and everyone else. 
        Elite teams deploy 208 times more frequently. Their lead time from commit to production 
        is 106 times faster. And here's the key insight - they have 7 times lower change failure 
        rate and recover 2604 times faster when things do go wrong. Speed and stability aren't 
        opposed - they're correlated. The teams that deploy most frequently also have the 
        lowest failure rates. That's not a coincidence - it's the principle FOE is built on.
      </aside>
    </section>
  );
}

/**
 * Slide 7: Flow vs Output
 * Why we optimize for flow, not output
 */
function FlowVsOutputSlide() {
  return (
    <section>
      <h2>Why We Optimize for Flow</h2>
      <div className="two-columns" style={{ marginTop: '1.5em' }}>
        <div>
          <div 
            className="fragment"
            data-fragment-index={0}
            style={{ 
              padding: '1.5em', 
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
              borderRadius: '16px',
              border: '2px solid #059669',
              marginBottom: '1em'
            }}
          >
            <h3 style={{ color: '#059669', marginBottom: '0.5em', fontSize: '1.2em' }}>Flow</h3>
            <p style={{ fontSize: '0.8em', margin: 0 }}>
              Repeatable, sustainable movement from idea to impact
            </p>
          </div>
          <div className="fragment" data-fragment-index={1} style={{ textAlign: 'left', paddingLeft: '1em' }}>
            <p style={{ fontSize: '0.75em', color: '#64748b', margin: '0.3em 0' }}>
              <strong>Idea</strong> &rarr; <strong>Change</strong> &rarr; <strong>Verify</strong> &rarr; <strong>Release</strong> &rarr; <strong>Learn</strong>
            </p>
            <p style={{ fontSize: '0.75em', color: '#64748b', margin: '0.5em 0' }}>
              Continuous, measurable, improvable
            </p>
          </div>
        </div>
        <div>
          <div 
            className="fragment"
            data-fragment-index={2}
            style={{ 
              padding: '1.5em', 
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.05) 100%)',
              borderRadius: '16px',
              border: '2px solid #dc2626',
              marginBottom: '1em'
            }}
          >
            <h3 style={{ color: '#dc2626', marginBottom: '0.5em', fontSize: '1.2em' }}>Output</h3>
            <p style={{ fontSize: '0.8em', margin: 0 }}>
              Activity metrics disconnected from outcomes
            </p>
          </div>
          <div className="fragment" data-fragment-index={3} style={{ textAlign: 'left', paddingLeft: '1em' }}>
            <p style={{ fontSize: '0.75em', color: '#64748b', margin: '0.3em 0' }}>
              Lines of code, story points, tickets closed
            </p>
            <p style={{ fontSize: '0.75em', color: '#64748b', margin: '0.5em 0' }}>
              Can be gamed, creates perverse incentives
            </p>
          </div>
        </div>
      </div>
      <div className="fragment" data-fragment-index={4} style={{ marginTop: '2em' }}>
        <table style={{ width: '100%', fontSize: '0.7em' }}>
          <thead>
            <tr>
              <th style={{ background: '#1e40af', color: 'white', padding: '0.6em' }}>Metric Type</th>
              <th style={{ background: '#1e40af', color: 'white', padding: '0.6em' }}>Example</th>
              <th style={{ background: '#1e40af', color: 'white', padding: '0.6em' }}>Problem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5em', borderBottom: '1px solid rgba(30,64,175,0.1)' }}>Output</td>
              <td style={{ padding: '0.5em', borderBottom: '1px solid rgba(30,64,175,0.1)' }}>Story points/sprint</td>
              <td style={{ padding: '0.5em', borderBottom: '1px solid rgba(30,64,175,0.1)' }}>Inflation over time</td>
            </tr>
            <tr style={{ background: 'rgba(30,64,175,0.05)' }}>
              <td style={{ padding: '0.5em', borderBottom: '1px solid rgba(30,64,175,0.1)' }}>Flow</td>
              <td style={{ padding: '0.5em', borderBottom: '1px solid rgba(30,64,175,0.1)' }}>Deploy frequency</td>
              <td style={{ padding: '0.5em', borderBottom: '1px solid rgba(30,64,175,0.1)' }}>Hard to fake</td>
            </tr>
          </tbody>
        </table>
      </div>
      <aside className="notes">
        Why do we focus on flow instead of output? Flow is the repeatable movement from 
        idea through to learning. It's a cycle: idea, change, verify, release, learn, 
        and back again. This cycle is continuous, measurable, and improvable. Output, 
        on the other hand, is activity metrics disconnected from outcomes - lines of code, 
        story points, tickets closed. These can be gamed and create perverse incentives. 
        Story points inflate over time. Lines of code can be padded. But deploy frequency? 
        Lead time? Recovery time? These are hard to fake. When you optimize for flow, 
        you're optimizing for the things that actually matter.
      </aside>
    </section>
  );
}

/**
 * Slide 8: Three Principles Preview
 * Teaser for the cognitive triangle
 */
function PrinciplesPreviewSlide() {
  return (
    <section data-auto-animate>
      <h2>The Cognitive Triangle</h2>
      <p style={{ fontSize: '0.9em', color: '#64748b', marginBottom: '1.5em' }}>
        Three interconnected principles that enable sustainable velocity
      </p>
      <div className="three-columns" style={{ marginTop: '2em' }}>
        <div className="fragment" data-fragment-index={0}>
          <div 
            className="principle-card understanding"
            style={{ 
              padding: '1.5em',
              background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.15) 0%, rgba(8, 145, 178, 0.05) 100%)',
              border: '2px solid #0891b2',
              borderRadius: '16px'
            }}
          >
            <div style={{ fontSize: '2em', marginBottom: '0.3em', color: '#0891b2' }}>
              1
            </div>
            <h3 style={{ color: '#0891b2', fontSize: '1em', marginBottom: '0.5em' }}>
              Understanding
            </h3>
            <p style={{ fontSize: '0.6em', color: '#64748b', margin: 0 }}>
              Optimize for comprehension
            </p>
          </div>
        </div>
        <div className="fragment" data-fragment-index={1}>
          <div 
            className="principle-card feedback"
            style={{ 
              padding: '1.5em',
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)',
              border: '2px solid #7c3aed',
              borderRadius: '16px'
            }}
          >
            <div style={{ fontSize: '2em', marginBottom: '0.3em', color: '#7c3aed' }}>
              2
            </div>
            <h3 style={{ color: '#7c3aed', fontSize: '1em', marginBottom: '0.5em' }}>
              Fast Feedback
            </h3>
            <p style={{ fontSize: '0.6em', color: '#64748b', margin: 0 }}>
              Minimize time to signal
            </p>
          </div>
        </div>
        <div className="fragment" data-fragment-index={2}>
          <div 
            className="principle-card confidence"
            style={{ 
              padding: '1.5em',
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
              border: '2px solid #059669',
              borderRadius: '16px'
            }}
          >
            <div style={{ fontSize: '2em', marginBottom: '0.3em', color: '#059669' }}>
              3
            </div>
            <h3 style={{ color: '#059669', fontSize: '1em', marginBottom: '0.5em' }}>
              Confidence
            </h3>
            <p style={{ fontSize: '0.6em', color: '#64748b', margin: 0 }}>
              Enable fearless change
            </p>
          </div>
        </div>
      </div>
      <div className="fragment" data-fragment-index={3} style={{ marginTop: '2em' }}>
        <p style={{ fontSize: '1em' }}>
          <em>Let's explore each principle in depth...</em>
        </p>
      </div>
      <aside className="notes">
        FOE is built on three interconnected principles - what we call the Cognitive Triangle. 
        First, Understanding: optimize for comprehension. When people understand the system, 
        they make better decisions faster. Second, Fast Feedback: minimize time to signal. 
        The faster you know if something is working, the faster you can adjust. Third, 
        Confidence: enable fearless change. When teams have confidence in their ability 
        to deploy and recover, they stop being afraid to ship. These three principles 
        reinforce each other - understanding builds confidence, fast feedback validates 
        understanding, and confidence enables the rapid iteration that generates feedback. 
        In the next section, we'll explore each principle in depth.
      </aside>
    </section>
  );
}

/**
 * Level1Slides - Complete export of all 8 executive summary slides
 * 
 * Usage:
 * ```tsx
 * import { Level1Slides } from './slides/Level1Slides';
 * 
 * <div className="reveal">
 *   <div className="slides">
 *     <Level1Slides />
 *   </div>
 * </div>
 * ```
 */
export function Level1Slides() {
  return (
    <>
      <TitleSlide />
      <ChallengeSlide />
      <ThesisSlide />
      <GaugesMetaphorSlide />
      <WhatFOEIsSlide />
      <BusinessCaseSlide />
      <FlowVsOutputSlide />
      <PrinciplesPreviewSlide />
    </>
  );
}

// Also export individual slides for flexibility
export {
  TitleSlide,
  ChallengeSlide,
  ThesisSlide,
  GaugesMetaphorSlide,
  WhatFOEIsSlide,
  BusinessCaseSlide,
  FlowVsOutputSlide,
  PrinciplesPreviewSlide,
};

export default Level1Slides;
