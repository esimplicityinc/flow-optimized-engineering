import React from 'react';

/**
 * Level 5 Slides: Roadmap & Next Steps (Slides 37-40)
 * 
 * Self-assessment, getting started guide, core thesis reminder, and closing.
 */
export function Level5Slides() {
  return (
    <>
      {/* Slide 37 - Self-Assessment */}
      <section>
        <h2>Where Are You?</h2>
        <p style={{ fontSize: '0.7em', color: 'var(--foe-text-light)', marginBottom: '1em' }}>
          Assess your current state across key indicators
        </p>
        
        <table className="matrix">
          <thead>
            <tr>
              <th>Indicator</th>
              <th>Phase 0-1</th>
              <th>Phase 2</th>
              <th>Phase 3+</th>
            </tr>
          </thead>
          <tbody>
            <tr className="fragment">
              <td style={{ fontWeight: 600, textAlign: 'left' }}>Provisioning</td>
              <td className="level-low">Tickets/manual</td>
              <td className="level-mid">IaC exists, inconsistent</td>
              <td className="level-high">Declarative, reconciled</td>
            </tr>
            <tr className="fragment">
              <td style={{ fontWeight: 600, textAlign: 'left' }}>Environments</td>
              <td className="level-low">Unique snowflakes</td>
              <td className="level-mid">Templated, some drift</td>
              <td className="level-high">Identical, ephemeral</td>
            </tr>
            <tr className="fragment">
              <td style={{ fontWeight: 600, textAlign: 'left' }}>Change process</td>
              <td className="level-low">Heroic individuals</td>
              <td className="level-mid">Tools + heroes</td>
              <td className="level-high">Automated pipelines</td>
            </tr>
            <tr className="fragment">
              <td style={{ fontWeight: 600, textAlign: 'left' }}>Failure response</td>
              <td className="level-low">"Who can fix this?"</td>
              <td className="level-mid">"Check the runbook"</td>
              <td className="level-high">"System will reconcile"</td>
            </tr>
          </tbody>
        </table>

        <aside className="notes">
          This self-assessment helps teams identify where they currently stand.
          Most teams have a mix - strong in some areas, weak in others.
          The goal isn't to be Phase 3+ everywhere immediately, but to know where to focus.
          Red areas indicate highest risk and potential for improvement.
        </aside>
      </section>

      {/* Slide 38 - Getting Started */}
      <section>
        <h2>Three Steps to Begin</h2>
        <p style={{ fontSize: '0.8em', color: 'var(--foe-text-light)', marginBottom: '1.5em' }}>
          Start Monday morning
        </p>

        <ol className="steps" style={{ textAlign: 'left', maxWidth: '80%', margin: '0 auto' }}>
          <li className="fragment">
            <strong>Diagnose which principle is weakest</strong>
            <div style={{ fontSize: '0.7em', color: 'var(--foe-text-light)', marginTop: '0.3em' }}>
              Understanding, Fast Feedback, or Confidence?
            </div>
          </li>
          <li className="fragment">
            <strong>Pick one method from the relevant Field Guide</strong>
            <div style={{ fontSize: '0.7em', color: 'var(--foe-text-light)', marginTop: '0.3em' }}>
              Start small, focused, achievable
            </div>
          </li>
          <li className="fragment">
            <strong>Run an experiment and document what you learn</strong>
            <div style={{ fontSize: '0.7em', color: 'var(--foe-text-light)', marginTop: '0.3em' }}>
              Measure before and after. Share the results.
            </div>
          </li>
        </ol>

        <div className="fragment highlight-box" style={{ marginTop: '1.5em' }}>
          <p style={{ margin: 0, fontSize: '0.85em', textAlign: 'center' }}>
            <strong>The key:</strong> Don't try to transform everything at once.
            <br />
            Pick one thing. Learn. Iterate.
          </p>
        </div>

        <aside className="notes">
          This is the actionable takeaway. Three concrete steps they can start immediately.
          
          Step 1: Use the self-assessment from the previous slide. Which principle has the biggest gaps?
          
          Step 2: The Field Guides organize methods by principle. Pick the lowest-hanging fruit.
          
          Step 3: FOE is built on experiments. Document what you try, what worked, what didn't.
          Even failed experiments add value to the body of knowledge.
          
          Emphasize: Start small. One method. One experiment. Monday morning.
        </aside>
      </section>

      {/* Slide 39 - The FOE Promise (Core Thesis) */}
      <section 
        className="dark-bg"
        data-background="linear-gradient(135deg, #1e40af 0%, #0f172a 100%)"
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '60vh'
        }}>
          <img 
            src="/flow-optimized-engineering/img/foe-white-square-trans.png" 
            alt="FOE Logo"
            style={{ 
              width: '100px', 
              height: '100px', 
              marginBottom: '1.5em',
              opacity: 0.9
            }}
          />
          
          <blockquote style={{ 
            border: 'none', 
            background: 'none',
            fontSize: '1.8em',
            fontStyle: 'normal',
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: '85%',
            color: 'white'
          }}>
            "Go faster by knowing more,
            <br />
            not by caring less"
          </blockquote>

          <p className="fragment" style={{ 
            marginTop: '2em', 
            fontSize: '0.8em', 
            opacity: 0.8,
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Flow Optimized Engineering
          </p>
        </div>

        <aside className="notes">
          This is the full-circle moment. Return to the core thesis from slide 1.
          
          This quote encapsulates everything:
          - Speed comes from understanding, not shortcuts
          - Confidence comes from knowledge, not hope
          - Quality and velocity are not in tension
          
          Let this land. Pause here.
          
          The promise of FOE: You CAN go faster. But not by cutting corners.
          By building systems that give you confidence to move quickly.
        </aside>
      </section>

      {/* Slide 40 - Questions & Discussion */}
      <section>
        <img 
          src="/flow-optimized-engineering/img/foe-logo.svg" 
          alt="FOE Logo"
          style={{ 
            width: '80px', 
            height: '80px', 
            marginBottom: '1em'
          }}
        />
        
        <h2 style={{ marginBottom: '1em' }}>Thank You</h2>

        <div style={{ marginBottom: '2em' }}>
          <p style={{ fontSize: '0.85em', marginBottom: '0.5em' }}>
            <strong>FOE Documentation</strong>
          </p>
          <p style={{ fontSize: '0.75em', color: 'var(--foe-text-light)' }}>
            <a href="https://foe.esimplicity.dev" style={{ color: 'var(--foe-primary)' }}>
              foe.esimplicity.dev
            </a>
          </p>
        </div>

        <div className="fragment" style={{ 
          marginTop: '2em',
          padding: '1.5em',
          background: 'rgba(30, 64, 175, 0.05)',
          borderRadius: '12px',
          display: 'inline-block'
        }}>
          <p style={{ 
            fontSize: '1.2em', 
            margin: 0,
            color: 'var(--foe-primary)',
            fontWeight: 600
          }}>
            Questions?
          </p>
        </div>

        {/* QR Code */}
        <div className="fragment" style={{ 
          marginTop: '2em'
        }}>
          <img 
            src="/flow-optimized-engineering/img/qr-foe-docs.svg" 
            alt="QR Code for FOE Documentation"
            style={{ 
              width: '120px', 
              height: '120px',
              borderRadius: '8px',
              background: 'white',
              padding: '8px'
            }}
          />
          <p style={{ fontSize: '0.5em', color: 'var(--foe-text-light)', marginTop: '0.5em' }}>
            Scan for docs
          </p>
        </div>

        <aside className="notes">
          Clean closing slide. Keep it simple.
          
          Point them to the documentation for deeper exploration.
          
          Open the floor for questions and discussion.
          
          If time permits, ask:
          - What principle resonates most with your current challenges?
          - What's one thing you might try next week?
          - What barriers do you anticipate?
          
          Thank them for their time and attention.
        </aside>
      </section>
    </>
  );
}

export default Level5Slides;
