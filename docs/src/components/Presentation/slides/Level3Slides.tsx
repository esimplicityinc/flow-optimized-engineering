import React from 'react';
import { Slide, FragmentBlock } from '../Slide';

/**
 * Level 3: Evidence & Research slides (19-28)
 * Research-backed evidence supporting FOE principles
 */
export function Level3Slides() {
  return (
    <>
      {/* Slide 19 - Evidence-Based Engineering */}
      <Slide backgroundGradient darkBg>
        <h2>FOE Isn't Opinion</h2>
        <p style={{ fontSize: '1.3em', marginTop: '1.5em' }}>
          These principles are backed by rigorous research
        </p>
        <div style={{ marginTop: '3em', fontSize: '4em', opacity: 0.3 }}>
          🔬
        </div>
        <aside className="notes">
          Transition to evidence section. FOE isn't a philosophy pulled from thin air - 
          it's grounded in substantial research spanning decades of software engineering 
          and organizational psychology studies.
        </aside>
      </Slide>

      {/* Slide 20 - DORA Research Overview */}
      <Slide>
        <h2>The Landmark Study</h2>
        <div className="highlight-box" style={{ marginTop: '1.5em' }}>
          <h3 style={{ color: 'var(--foe-primary)', marginBottom: '0.5em' }}>
            DORA State of DevOps Research
          </h3>
          <div className="three-columns" style={{ marginTop: '1.5em' }}>
            <div className="stat-block">
              <div className="stat-value" style={{ fontSize: '2.5em' }}>39,000+</div>
              <div className="stat-label">technology professionals</div>
            </div>
            <div className="stat-block">
              <div className="stat-value" style={{ fontSize: '2.5em' }}>11+</div>
              <div className="stat-label">years of data</div>
            </div>
            <div className="stat-block">
              <div className="stat-value" style={{ fontSize: '2.5em' }}>2018</div>
              <div className="stat-label">Published as "Accelerate"</div>
            </div>
          </div>
        </div>
        <aside className="notes">
          DORA (DevOps Research and Assessment) conducted the largest study of software 
          delivery performance ever undertaken. Dr. Nicole Forsgren, Jez Humble, and Gene Kim 
          synthesized this research in "Accelerate" - a landmark book that transformed how 
          we think about software delivery.
        </aside>
      </Slide>

      {/* Slide 21 - Elite vs. Low Performers */}
      <Slide>
        <h2>The Performance Gap</h2>
        <p style={{ fontSize: '0.8em', color: 'var(--foe-text-light)', marginBottom: '1em' }}>
          Elite performers vs. low performers
        </p>
        <div className="card-grid cols-2" style={{ fontSize: '0.9em' }}>
          <FragmentBlock index={0}>
            <div className="stat-block">
              <div className="big-number" style={{ fontSize: '3.5em' }}>208×</div>
              <div className="stat-label">deployment frequency</div>
            </div>
          </FragmentBlock>
          <FragmentBlock index={1}>
            <div className="stat-block">
              <div className="big-number" style={{ fontSize: '3.5em' }}>106×</div>
              <div className="stat-label">faster lead time</div>
            </div>
          </FragmentBlock>
          <FragmentBlock index={2}>
            <div className="stat-block">
              <div className="big-number" style={{ fontSize: '3.5em' }}>7×</div>
              <div className="stat-label">lower change failure rate</div>
            </div>
          </FragmentBlock>
          <FragmentBlock index={3}>
            <div className="stat-block">
              <div className="big-number" style={{ fontSize: '3.5em' }}>2604×</div>
              <div className="stat-label">faster recovery</div>
            </div>
          </FragmentBlock>
        </div>
        <aside className="notes">
          These numbers are staggering. Elite performers aren't just marginally better - 
          they're orders of magnitude better. This isn't about working harder; it's about 
          working fundamentally differently. Note that stability (change failure rate, MTTR) 
          improves alongside speed.
        </aside>
      </Slide>

      {/* Slide 22 - DORA's Core Finding */}
      <Slide>
        <h2>The Paradigm Shift</h2>
        <blockquote style={{ 
          fontSize: '1.4em', 
          marginTop: '1.5em',
          borderLeftColor: 'var(--foe-feedback)',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(124, 58, 237, 0.03) 100%)'
        }}>
          "Speed and stability are NOT tradeoffs"
        </blockquote>
        <FragmentBlock>
          <div className="highlight-box" style={{ marginTop: '1.5em', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.9em' }}>
              This <strong>contradicts</strong> decades of conventional wisdom.<br />
              Fast teams are <em>also</em> the most stable teams.
            </p>
          </div>
        </FragmentBlock>
        <aside className="notes">
          This is perhaps the most important finding. For years, we believed there was an 
          inherent tradeoff - go fast and break things, or go slow and be stable. DORA proved 
          this is a false dichotomy. The practices that enable speed (automation, small batches, 
          fast feedback) are the same practices that enable stability.
        </aside>
      </Slide>

      {/* Slide 23 - Google Project Aristotle */}
      <Slide>
        <h2>What Makes Teams Effective?</h2>
        <p style={{ fontSize: '0.85em', color: 'var(--foe-text-light)' }}>
          Google Project Aristotle (2012-2016)
        </p>
        <div className="two-columns" style={{ marginTop: '1.5em', alignItems: 'center' }}>
          <div>
            <div className="stat-block">
              <div className="big-number" style={{ fontSize: '4em', color: 'var(--foe-understanding)' }}>180</div>
              <div className="stat-label">teams studied at Google</div>
            </div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <FragmentBlock>
              <div className="highlight-box" style={{ 
                borderColor: 'var(--foe-understanding)',
                background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.1) 0%, rgba(8, 145, 178, 0.05) 100%)'
              }}>
                <h4 style={{ color: 'var(--foe-understanding)', margin: '0 0 0.5em 0' }}>#1 Predictor</h4>
                <p style={{ fontSize: '1.1em', margin: 0, fontWeight: 600 }}>Psychological Safety</p>
              </div>
            </FragmentBlock>
            <FragmentBlock>
              <p style={{ fontSize: '0.85em', marginTop: '1em' }}>
                Teams with high PS are <strong style={{ color: 'var(--foe-understanding)' }}>2× more likely</strong><br />
                to be rated effective by executives
              </p>
            </FragmentBlock>
          </div>
        </div>
        <aside className="notes">
          Google studied 180 of their own teams trying to find what makes teams effective. 
          They expected technical skills or experience to be the top factors. Instead, 
          psychological safety - the belief that you won't be punished for mistakes - 
          was far and away the most important predictor of team success.
        </aside>
      </Slide>

      {/* Slide 24 - What Didn't Matter */}
      <Slide>
        <h2>Myth Busting</h2>
        <p style={{ fontSize: '0.85em', color: 'var(--foe-text-light)', marginBottom: '1em' }}>
          What Project Aristotle found <span style={{ color: 'var(--foe-danger)' }}>didn't matter</span>
        </p>
        <ul className="check-list cross-list" style={{ fontSize: '1.1em', maxWidth: '600px', margin: '0 auto' }}>
          <FragmentBlock animation="fade-up">
            <li>Colocation</li>
          </FragmentBlock>
          <FragmentBlock animation="fade-up">
            <li>Seniority / experience level</li>
          </FragmentBlock>
          <FragmentBlock animation="fade-up">
            <li>Team size</li>
          </FragmentBlock>
          <FragmentBlock animation="fade-up">
            <li>Individual performance of team members</li>
          </FragmentBlock>
        </ul>
        <FragmentBlock>
          <p style={{ marginTop: '1.5em', fontSize: '0.9em', fontStyle: 'italic', color: 'var(--foe-text-light)' }}>
            "Who is on a team matters less than how team members interact"
          </p>
        </FragmentBlock>
        <aside className="notes">
          This challenges so many hiring and team-building assumptions. All-star teams 
          can fail while "average" teams succeed. The key isn't assembling the best 
          individuals - it's creating an environment where any team can do their best work.
        </aside>
      </Slide>

      {/* Slide 25 - NUMMI Transformation */}
      <Slide>
        <h2>System &gt; Individuals</h2>
        <p style={{ fontSize: '0.85em', color: 'var(--foe-text-light)' }}>
          The NUMMI Transformation (1984)
        </p>
        <div className="comparison" style={{ marginTop: '1.5em' }}>
          <FragmentBlock>
            <div style={{ 
              padding: '1.5em', 
              background: 'rgba(220, 38, 38, 0.1)', 
              borderRadius: '12px',
              border: '2px solid var(--foe-danger)'
            }}>
              <h4 style={{ color: 'var(--foe-danger)', margin: '0 0 0.5em 0' }}>Before: GM Fremont</h4>
              <p style={{ fontSize: '0.8em', margin: 0 }}>
                GM's <strong>worst plant</strong> in America<br />
                High absenteeism, poor quality, labor strife
              </p>
            </div>
          </FragmentBlock>
          <FragmentBlock>
            <div style={{ 
              padding: '1.5em', 
              background: 'rgba(5, 150, 105, 0.1)', 
              borderRadius: '12px',
              border: '2px solid var(--foe-confidence)'
            }}>
              <h4 style={{ color: 'var(--foe-confidence)', margin: '0 0 0.5em 0' }}>After: NUMMI</h4>
              <p style={{ fontSize: '0.8em', margin: 0 }}>
                One of <strong>America's best</strong> auto plants<br />
                Top quality, high morale, world-class efficiency
              </p>
            </div>
          </FragmentBlock>
        </div>
        <FragmentBlock>
          <div className="highlight-box" style={{ marginTop: '1.5em', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '1.1em' }}>
              <strong style={{ color: 'var(--foe-primary)' }}>85%+ same employees</strong><br />
              <span style={{ fontSize: '0.85em' }}>Different system = Different outcomes</span>
            </p>
          </div>
        </FragmentBlock>
        <aside className="notes">
          NUMMI (New United Motor Manufacturing Inc.) was a joint venture between GM and Toyota. 
          Toyota took GM's worst plant with the same "problem" workers and transformed it using 
          their production system. This proved definitively that the system, not the people, 
          was the problem. This has profound implications for how we think about engineering teams.
        </aside>
      </Slide>

      {/* Slide 26 - TDD Defect Study */}
      <Slide>
        <h2>Fast Feedback Pays Off</h2>
        <p style={{ fontSize: '0.85em', color: 'var(--foe-text-light)' }}>
          TDD Defect Density Studies (IBM, Microsoft, et al.)
        </p>
        <div className="three-columns" style={{ marginTop: '1.5em' }}>
          <FragmentBlock>
            <div className="stat-block" style={{ 
              background: 'rgba(5, 150, 105, 0.1)', 
              borderRadius: '12px', 
              padding: '1.5em' 
            }}>
              <div className="big-number" style={{ 
                fontSize: '2.5em', 
                color: 'var(--foe-confidence)' 
              }}>40-90%</div>
              <div className="stat-label">reduction in<br />defect density</div>
            </div>
          </FragmentBlock>
          <FragmentBlock>
            <div className="stat-block" style={{ 
              background: 'rgba(217, 119, 6, 0.1)', 
              borderRadius: '12px', 
              padding: '1.5em' 
            }}>
              <div className="big-number" style={{ 
                fontSize: '2.5em', 
                color: 'var(--foe-warning)' 
              }}>15-35%</div>
              <div className="stat-label">more initial<br />development time</div>
            </div>
          </FragmentBlock>
          <FragmentBlock>
            <div className="stat-block" style={{ 
              background: 'rgba(124, 58, 237, 0.1)', 
              borderRadius: '12px', 
              padding: '1.5em' 
            }}>
              <div className="big-number" style={{ 
                fontSize: '2.5em', 
                color: 'var(--foe-feedback)' 
              }}>10-100×</div>
              <div className="stat-label">cost of defects<br />found later</div>
            </div>
          </FragmentBlock>
        </div>
        <FragmentBlock>
          <p style={{ marginTop: '1.5em', fontSize: '0.9em', textAlign: 'center' }}>
            The math is clear: <strong>invest in fast feedback loops</strong>
          </p>
        </FragmentBlock>
        <aside className="notes">
          Multiple studies from IBM, Microsoft, and academia show consistent results. 
          Yes, TDD takes more time upfront - but the defect reduction is dramatic, and 
          finding bugs in production costs orders of magnitude more than finding them 
          during development. This is the economic case for fast feedback.
        </aside>
      </Slide>

      {/* Slide 27 - Internal Evidence */}
      <Slide>
        <h2>Prima BDD Adoption</h2>
        <p style={{ fontSize: '0.85em', color: 'var(--foe-text-light)' }}>
          Our own validation of the research
        </p>
        <div className="two-columns" style={{ marginTop: '1.5em', alignItems: 'center' }}>
          <div>
            <div className="highlight-box" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8em', color: 'var(--foe-text-light)' }}>Study period</div>
              <div style={{ fontSize: '1.5em', fontWeight: 700, color: 'var(--foe-primary)' }}>7+ months</div>
              <div style={{ marginTop: '1em', fontSize: '0.8em', color: 'var(--foe-text-light)' }}>Feature files analyzed</div>
              <div style={{ fontSize: '1.5em', fontWeight: 700, color: 'var(--foe-primary)' }}>56</div>
            </div>
          </div>
          <div>
            <FragmentBlock>
              <div className="stat-block" style={{ 
                background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)', 
                borderRadius: '16px',
                border: '2px solid var(--foe-confidence)',
                padding: '1.5em'
              }}>
                <div className="big-number" style={{ 
                  fontSize: '3em', 
                  color: 'var(--foe-confidence)' 
                }}>6-7×</div>
                <div className="stat-label">higher refactoring rate with BDD</div>
                <div style={{ 
                  marginTop: '1em', 
                  fontSize: '0.7em', 
                  color: 'var(--foe-text-light)' 
                }}>
                  10.8% vs 1.6% for non-BDD code
                </div>
              </div>
            </FragmentBlock>
          </div>
        </div>
        <aside className="notes">
          We don't just cite external research - we measure our own practices. Our Prima 
          experiment showed that BDD-covered code was refactored 6-7 times more often than 
          code without BDD coverage. This directly validates the confidence-to-change principle: 
          when developers have confidence (from BDD tests), they're dramatically more willing 
          to improve the code.
        </aside>
      </Slide>

      {/* Slide 28 - Evidence Summary */}
      <Slide>
        <h2>Convergent Evidence</h2>
        <table className="matrix" style={{ marginTop: '1em', fontSize: '0.65em' }}>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Research</th>
              <th style={{ width: '35%' }}>Key Finding</th>
              <th style={{ width: '40%' }}>FOE Principle Supported</th>
            </tr>
          </thead>
          <tbody>
            <FragmentBlock>
              <tr>
                <td style={{ fontWeight: 600 }}>DORA</td>
                <td>Speed & Stability are correlated</td>
                <td style={{ color: 'var(--foe-feedback)' }}>Fast Feedback Loops</td>
              </tr>
            </FragmentBlock>
            <FragmentBlock>
              <tr>
                <td style={{ fontWeight: 600 }}>Project Aristotle</td>
                <td>Psychological Safety is #1</td>
                <td style={{ color: 'var(--foe-confidence)' }}>Confidence to Change</td>
              </tr>
            </FragmentBlock>
            <FragmentBlock>
              <tr>
                <td style={{ fontWeight: 600 }}>NUMMI</td>
                <td>System design determines outcomes</td>
                <td style={{ color: 'var(--foe-understanding)' }}>Optimize for Understanding</td>
              </tr>
            </FragmentBlock>
            <FragmentBlock>
              <tr>
                <td style={{ fontWeight: 600 }}>TDD Studies</td>
                <td>Early defect detection ROI</td>
                <td style={{ color: 'var(--foe-feedback)' }}>Fast Feedback Loops</td>
              </tr>
            </FragmentBlock>
            <FragmentBlock>
              <tr>
                <td style={{ fontWeight: 600 }}>Prima BDD</td>
                <td>Confidence enables refactoring</td>
                <td style={{ color: 'var(--foe-confidence)' }}>Confidence to Change</td>
              </tr>
            </FragmentBlock>
          </tbody>
        </table>
        <FragmentBlock>
          <p style={{ marginTop: '1.5em', fontSize: '0.9em', textAlign: 'center', fontStyle: 'italic' }}>
            Multiple independent sources, convergent conclusions
          </p>
        </FragmentBlock>
        <aside className="notes">
          When multiple independent research efforts reach similar conclusions, we can be 
          confident in the findings. DORA, Aristotle, NUMMI, TDD studies, and our own Prima 
          experiment all point to the same core truths that FOE is built upon. This isn't 
          cherry-picking - it's convergent evidence from rigorous research.
        </aside>
      </Slide>
    </>
  );
}

export default Level3Slides;
