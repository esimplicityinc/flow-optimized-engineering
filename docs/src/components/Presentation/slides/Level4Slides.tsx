import React from 'react';

/**
 * Level 4 Implementation Slides (29-36)
 * Covers: Field Guides, Methods, Experiments, Maturity Model,
 * Transformation Model, FOE Triad, and Katalyst Platform
 */
export function Level4Slides() {
  return (
    <>
      {/* Slide 29 - From Theory to Practice */}
      <section>
        <h2>Field Guides, Methods, and Experiments</h2>
        <p style={{ color: 'var(--foe-text-light)', marginBottom: '1.5em' }}>
          How FOE organizes knowledge
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '0.5em',
          marginTop: '1em'
        }}>
          {/* Field Guide Level */}
          <div className="fragment" style={{
            background: 'linear-gradient(135deg, var(--foe-primary) 0%, var(--foe-primary-dark) 100%)',
            color: 'white',
            padding: '1em 3em',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '1.1em',
            minWidth: '400px',
            textAlign: 'center'
          }}>
            Field Guide
            <div style={{ fontSize: '0.6em', fontWeight: 400, opacity: 0.9 }}>Domain of Practice</div>
          </div>
          
          <div className="fragment" style={{ fontSize: '1.5em', color: 'var(--foe-primary)' }}>
            &#8595;
          </div>
          
          {/* Methods Level */}
          <div className="fragment" style={{
            display: 'flex',
            gap: '1em',
            justifyContent: 'center'
          }}>
            {['Method 1', 'Method 2', 'Method 3'].map((method, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.15) 0%, rgba(8, 145, 178, 0.05) 100%)',
                border: '2px solid var(--foe-understanding)',
                padding: '0.8em 1.5em',
                borderRadius: '10px',
                fontWeight: 500,
                fontSize: '0.85em'
              }}>
                {method}
                <div style={{ fontSize: '0.65em', color: 'var(--foe-text-light)' }}>Practice</div>
              </div>
            ))}
          </div>
          
          <div className="fragment" style={{ fontSize: '1.5em', color: 'var(--foe-understanding)' }}>
            &#8595;
          </div>
          
          {/* Experiments Level */}
          <div className="fragment" style={{
            display: 'flex',
            gap: '0.6em',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '600px'
          }}>
            {['Exp A', 'Exp B', 'Exp C', 'Exp D', 'Exp E'].map((exp, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
                border: '2px solid var(--foe-confidence)',
                padding: '0.5em 1em',
                borderRadius: '8px',
                fontSize: '0.7em',
                fontWeight: 500
              }}>
                {exp}
                <div style={{ fontSize: '0.7em', color: 'var(--foe-text-light)' }}>Evidence</div>
              </div>
            ))}
          </div>
        </div>
        
        <aside className="notes">
          FOE organizes knowledge in three layers. Field Guides are domains like "Agentic Coding" or "Architecture". 
          Methods are specific practices within those domains. Experiments are the evidence that validates methods work.
          This structure ensures every practice is backed by real evidence.
        </aside>
      </section>

      {/* Slide 30 - The Maturity Model */}
      <section>
        <h2>Five Levels of Maturity</h2>
        <p style={{ color: 'var(--foe-text-light)', marginBottom: '1em' }}>
          Where is your organization on the journey?
        </p>
        
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '0.3em',
          marginTop: '1.5em',
          height: '350px'
        }}>
          {[
            { level: 0, name: 'Fragile', desc: 'We find out late', height: '80px', color: '#dc2626' },
            { level: 1, name: 'Visible', desc: 'We can see what\'s happening', height: '130px', color: '#d97706' },
            { level: 2, name: 'Repeatable', desc: 'We can change safely', height: '180px', color: '#ca8a04' },
            { level: 3, name: 'Flowing', desc: 'System teaches us', height: '230px', color: 'var(--foe-understanding)' },
            { level: 4, name: 'Adaptive', desc: 'We absorb change', height: '280px', color: 'var(--foe-confidence)' }
          ].map((item, i) => (
            <div 
              key={i} 
              className="fragment"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '140px'
              }}
            >
              <div style={{
                background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}cc 100%)`,
                height: item.height,
                width: '100%',
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '0.8em 0.3em',
                color: 'white'
              }}>
                <div style={{ fontWeight: 700, fontSize: '1.2em' }}>L{item.level}</div>
                <div style={{ fontWeight: 600, fontSize: '0.6em', textAlign: 'center' }}>{item.name}</div>
              </div>
              <div style={{
                fontSize: '0.45em',
                color: 'var(--foe-text-light)',
                textAlign: 'center',
                marginTop: '0.5em',
                lineHeight: 1.3
              }}>
                "{item.desc}"
              </div>
            </div>
          ))}
        </div>
        
        <aside className="notes">
          The maturity model isn't about being "better" - it's about knowing where you are and what comes next.
          Level 0 teams learn about problems in production. Level 4 teams embrace change as competitive advantage.
          Most organizations plateau at Level 2. The jump to Level 3 requires systematic practices, not just tools.
        </aside>
      </section>

      {/* Slide 31 - The Transformation Model */}
      <section>
        <h2>Six Phases of Transformation</h2>
        <p style={{ color: 'var(--foe-text-light)', marginBottom: '1.5em' }}>
          The journey to cloud-native
        </p>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1em',
          position: 'relative'
        }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '10%',
            right: '10%',
            height: '4px',
            background: 'linear-gradient(90deg, var(--foe-danger) 0%, var(--foe-warning) 33%, var(--foe-understanding) 66%, var(--foe-confidence) 100%)',
            borderRadius: '2px'
          }} />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.3em',
            width: '100%',
            position: 'relative'
          }}>
            {[
              { phase: 0, name: 'On-Prem', color: '#dc2626' },
              { phase: 1, name: 'Lift & Shift', color: '#d97706' },
              { phase: 2, name: 'Awkward Middle', color: '#ca8a04' },
              { phase: 3, name: 'Cloud Native Infra', color: 'var(--foe-understanding)' },
              { phase: 4, name: 'Agentic Coding', color: 'var(--foe-feedback)' },
              { phase: 5, name: 'Cloud Native Code', color: 'var(--foe-confidence)' }
            ].map((item, i) => (
              <div 
                key={i}
                className="fragment"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: item.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.2em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  border: '4px solid white',
                  zIndex: 1
                }}>
                  {item.phase}
                </div>
                <div style={{
                  marginTop: '1em',
                  fontSize: '0.55em',
                  fontWeight: 600,
                  textAlign: 'center',
                  color: item.color
                }}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="fragment highlight-box" style={{ marginTop: '1.5em', fontSize: '0.7em' }}>
          <strong>Key Insight:</strong> Each phase requires different skills, tools, and mindsets. 
          Skipping phases creates technical debt.
        </div>
        
        <aside className="notes">
          This is the cloud transformation journey. Phase 0 is traditional on-prem. Phase 1 is basic cloud migration.
          Phase 2 is the "awkward middle" where you have cloud but not cloud-native practices.
          Phase 3 achieves cloud-native infrastructure. Phase 4 introduces agentic coding.
          Phase 5 is full cloud-native code where the system is designed for change from the start.
        </aside>
      </section>

      {/* Slide 32 - Phase 3 Bottleneck */}
      <section>
        <h2>Where Organizations Stall</h2>
        
        <blockquote style={{ marginTop: '1.5em' }}>
          <p>"Most organizations stall because they lack <strong>disciplines</strong>, not tools"</p>
        </blockquote>
        
        <div className="two-columns" style={{ marginTop: '1.5em', fontSize: '0.75em' }}>
          <div className="fragment">
            <h4 style={{ color: 'var(--foe-danger)' }}>What They Have</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '0.5em 0', borderBottom: '1px solid rgba(220, 38, 38, 0.2)' }}>
                Terraform scripts
              </li>
              <li style={{ padding: '0.5em 0', borderBottom: '1px solid rgba(220, 38, 38, 0.2)' }}>
                CI/CD pipelines
              </li>
              <li style={{ padding: '0.5em 0', borderBottom: '1px solid rgba(220, 38, 38, 0.2)' }}>
                Container orchestration
              </li>
              <li style={{ padding: '0.5em 0' }}>
                Cloud accounts
              </li>
            </ul>
          </div>
          
          <div className="fragment">
            <h4 style={{ color: 'var(--foe-confidence)' }}>What They Need</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '0.5em 0', borderBottom: '1px solid rgba(5, 150, 105, 0.2)' }}>
                IaC as a <em>discipline</em>
              </li>
              <li style={{ padding: '0.5em 0', borderBottom: '1px solid rgba(5, 150, 105, 0.2)' }}>
                Continuous Delivery <em>culture</em>
              </li>
              <li style={{ padding: '0.5em 0', borderBottom: '1px solid rgba(5, 150, 105, 0.2)' }}>
                Observable systems <em>practice</em>
              </li>
              <li style={{ padding: '0.5em 0' }}>
                Learning organization <em>mindset</em>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="fragment" style={{
          marginTop: '1.5em',
          padding: '1em',
          background: 'rgba(220, 38, 38, 0.1)',
          borderLeft: '4px solid var(--foe-danger)',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.8em'
        }}>
          <strong>The Bottleneck:</strong> Tools without discipline = expensive complexity
        </div>
        
        <aside className="notes">
          This is the most important slide for leadership. Having Terraform doesn't mean you have Infrastructure as Code.
          Having Jenkins doesn't mean you have Continuous Delivery. The difference is discipline - treating these as
          first-class engineering practices, not just tools you happen to use. Organizations stall at Phase 3 because
          they buy tools but don't invest in the disciplines to use them effectively.
        </aside>
      </section>

      {/* Slide 33 - The FOE Triad */}
      <section>
        <h2>People, Process, Technology</h2>
        <p style={{ color: 'var(--foe-text-light)', marginBottom: '1em' }}>
          All three must change together
        </p>
        
        <div className="three-columns" style={{ marginTop: '1.5em' }}>
          <div className="fragment principle-card" style={{
            background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.15) 0%, rgba(30, 64, 175, 0.05) 100%)',
            border: '2px solid var(--foe-primary)',
            padding: '1.5em'
          }}>
            <div style={{ fontSize: '2.5em', marginBottom: '0.2em' }}>&#128101;</div>
            <h3 style={{ color: 'var(--foe-primary)', fontSize: '0.9em', margin: '0.5em 0' }}>People</h3>
            <p style={{ fontSize: '0.6em', color: 'var(--foe-text-light)', margin: 0 }}>
              Engineers with new skills: IaC, observability, testing mindset
            </p>
          </div>
          
          <div className="fragment principle-card" style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)',
            border: '2px solid var(--foe-feedback)',
            padding: '1.5em'
          }}>
            <div style={{ fontSize: '2.5em', marginBottom: '0.2em' }}>&#128260;</div>
            <h3 style={{ color: 'var(--foe-feedback)', fontSize: '0.9em', margin: '0.5em 0' }}>Process</h3>
            <p style={{ fontSize: '0.6em', color: 'var(--foe-text-light)', margin: 0 }}>
              Continuous Delivery, BDD, trunk-based development
            </p>
          </div>
          
          <div className="fragment principle-card" style={{
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
            border: '2px solid var(--foe-confidence)',
            padding: '1.5em'
          }}>
            <div style={{ fontSize: '2.5em', marginBottom: '0.2em' }}>&#9881;</div>
            <h3 style={{ color: 'var(--foe-confidence)', fontSize: '0.9em', margin: '0.5em 0' }}>Technology</h3>
            <p style={{ fontSize: '0.6em', color: 'var(--foe-text-light)', margin: 0 }}>
              Cloud-native platforms, modern toolchains, AI assistance
            </p>
          </div>
        </div>
        
        <div className="fragment" style={{
          marginTop: '1.5em',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.8em 2em',
            background: 'var(--foe-primary)',
            color: 'white',
            borderRadius: '30px',
            fontWeight: 600,
            fontSize: '0.8em'
          }}>
            Change one without the others = frustration
          </div>
        </div>
        
        <aside className="notes">
          This is the classic triad, but it's especially true for FOE. You can't give people new tools without new skills.
          You can't expect new processes without supporting technology. And new technology without process changes
          just creates more chaos. FOE addresses all three: Methods change Process, Experiments build People skills,
          and Field Guides guide Technology choices.
        </aside>
      </section>

      {/* Slide 34 - Field Guides Overview */}
      <section>
        <h2>What We've Documented</h2>
        <p style={{ color: 'var(--foe-text-light)', marginBottom: '1.5em' }}>
          Living documentation that grows with practice
        </p>
        
        <div className="card-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="fragment card" style={{ borderTop: '4px solid var(--foe-feedback)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <span style={{ fontSize: '1.2em' }}>&#129302;</span>
              Agentic Coding Guide
            </h4>
            <div style={{ 
              display: 'flex', 
              gap: '1em', 
              marginTop: '0.8em',
              fontSize: '0.7em'
            }}>
              <div style={{
                background: 'rgba(124, 58, 237, 0.1)',
                padding: '0.5em 1em',
                borderRadius: '20px',
                color: 'var(--foe-feedback)'
              }}>
                <strong>3</strong> native methods
              </div>
              <div style={{
                background: 'rgba(30, 64, 175, 0.1)',
                padding: '0.5em 1em',
                borderRadius: '20px',
                color: 'var(--foe-primary)'
              }}>
                <strong>5</strong> adopted
              </div>
            </div>
            <p style={{ marginTop: '0.8em' }}>
              Practices for effective AI-assisted development
            </p>
          </div>
          
          <div className="fragment card" style={{ borderTop: '4px solid var(--foe-understanding)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <span style={{ fontSize: '1.2em' }}>&#127959;</span>
              Architecture Guide
            </h4>
            <div style={{ 
              display: 'flex', 
              gap: '1em', 
              marginTop: '0.8em',
              fontSize: '0.7em'
            }}>
              <div style={{
                background: 'rgba(8, 145, 178, 0.1)',
                padding: '0.5em 1em',
                borderRadius: '20px',
                color: 'var(--foe-understanding)'
              }}>
                <strong>1</strong> native method
              </div>
              <div style={{
                background: 'rgba(30, 64, 175, 0.1)',
                padding: '0.5em 1em',
                borderRadius: '20px',
                color: 'var(--foe-primary)'
              }}>
                <strong>4</strong> adopted
              </div>
            </div>
            <p style={{ marginTop: '0.8em' }}>
              Structural patterns for maintainable systems
            </p>
          </div>
        </div>
        
        <div className="fragment" style={{
          marginTop: '1.5em',
          fontSize: '0.7em',
          color: 'var(--foe-text-light)',
          textAlign: 'center'
        }}>
          <em>"Native" methods are discovered through our experiments. "Adopted" methods come from established frameworks.</em>
        </div>
        
        <aside className="notes">
          Field Guides are our primary documentation artifacts. Native methods are things we've discovered and validated
          through our own experiments. Adopted methods are established practices from frameworks like DORA or BDD that
          we've incorporated. The distinction matters because native methods are where we contribute new knowledge to
          the industry, while adopted methods show we stand on the shoulders of giants.
        </aside>
      </section>

      {/* Slide 35 - External Frameworks */}
      <section>
        <h2>Standing on Shoulders</h2>
        <p style={{ color: 'var(--foe-text-light)', marginBottom: '1.5em' }}>
          Frameworks we adopt and extend
        </p>
        
        <div className="two-columns" style={{ gap: '2em' }}>
          <div className="fragment card" style={{ 
            borderTop: '4px solid var(--foe-feedback)',
            textAlign: 'left'
          }}>
            <h4 style={{ color: 'var(--foe-feedback)', marginBottom: '0.8em' }}>
              DORA Metrics
            </h4>
            <ul className="check-list" style={{ fontSize: '0.7em' }}>
              <li>Deployment Frequency</li>
              <li>Lead Time for Changes</li>
              <li>Change Failure Rate</li>
              <li>Mean Time to Recovery</li>
            </ul>
            <p style={{ 
              marginTop: '1em', 
              fontSize: '0.6em', 
              color: 'var(--foe-text-light)',
              fontStyle: 'italic'
            }}>
              Research-backed metrics for high-performing teams
            </p>
          </div>
          
          <div className="fragment card" style={{ 
            borderTop: '4px solid var(--foe-understanding)',
            textAlign: 'left'
          }}>
            <h4 style={{ color: 'var(--foe-understanding)', marginBottom: '0.8em' }}>
              BDD (Behavior-Driven Development)
            </h4>
            <ul className="check-list" style={{ fontSize: '0.7em' }}>
              <li>Given-When-Then syntax</li>
              <li>Three Amigos sessions</li>
              <li>Discovery Workshops</li>
              <li>Living Documentation</li>
            </ul>
            <p style={{ 
              marginTop: '1em', 
              fontSize: '0.6em', 
              color: 'var(--foe-text-light)',
              fontStyle: 'italic'
            }}>
              Shared understanding through executable specifications
            </p>
          </div>
        </div>
        
        <div className="fragment highlight-box" style={{ marginTop: '1.5em', fontSize: '0.7em' }}>
          <strong>FOE Contribution:</strong> We adopt these frameworks, run experiments to validate them in our context, 
          and document what works for agentic coding environments.
        </div>
        
        <aside className="notes">
          We don't reinvent the wheel. DORA gives us proven metrics for measuring delivery performance.
          BDD gives us practices for shared understanding. FOE's contribution is adapting these to the agentic coding
          context and validating through experiments. When we adopt a method, we're not just copying - we're
          validating it works in our specific context and documenting how to apply it.
        </aside>
      </section>

      {/* Slide 36 - Katalyst Platform */}
      <section>
        <h2>FOE in Practice</h2>
        <p style={{ color: 'var(--foe-text-light)', marginBottom: '1.5em' }}>
          The Katalyst Platform: Our concrete implementation
        </p>
        
        <div className="three-columns" style={{ marginTop: '1.5em' }}>
          <div className="fragment" style={{
            background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.15) 0%, rgba(8, 145, 178, 0.05) 100%)',
            border: '2px solid var(--foe-understanding)',
            borderRadius: '16px',
            padding: '1.5em 1em',
            textAlign: 'center'
          }}>
            <div style={{ 
              color: 'var(--foe-understanding)', 
              fontWeight: 700, 
              fontSize: '0.9em',
              marginBottom: '0.5em'
            }}>
              Katalyst Taxonomy
            </div>
            <div style={{ fontSize: '2em', margin: '0.3em 0' }}>&#128218;</div>
            <div style={{
              background: 'var(--foe-understanding)',
              color: 'white',
              padding: '0.4em 0.8em',
              borderRadius: '20px',
              fontSize: '0.6em',
              fontWeight: 600,
              marginTop: '0.5em',
              display: 'inline-block'
            }}>
              Understanding
            </div>
            <p style={{ fontSize: '0.55em', color: 'var(--foe-text-light)', marginTop: '0.8em' }}>
              Shared vocabulary and mental models
            </p>
          </div>
          
          <div className="fragment" style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)',
            border: '2px solid var(--foe-feedback)',
            borderRadius: '16px',
            padding: '1.5em 1em',
            textAlign: 'center'
          }}>
            <div style={{ 
              color: 'var(--foe-feedback)', 
              fontWeight: 700, 
              fontSize: '0.9em',
              marginBottom: '0.5em'
            }}>
              Katalyst BDD Test
            </div>
            <div style={{ fontSize: '2em', margin: '0.3em 0' }}>&#9889;</div>
            <div style={{
              background: 'var(--foe-feedback)',
              color: 'white',
              padding: '0.4em 0.8em',
              borderRadius: '20px',
              fontSize: '0.6em',
              fontWeight: 600,
              marginTop: '0.5em',
              display: 'inline-block'
            }}>
              Fast Feedback
            </div>
            <p style={{ fontSize: '0.55em', color: 'var(--foe-text-light)', marginTop: '0.8em' }}>
              Immediate validation of behavior
            </p>
          </div>
          
          <div className="fragment" style={{
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
            border: '2px solid var(--foe-confidence)',
            borderRadius: '16px',
            padding: '1.5em 1em',
            textAlign: 'center'
          }}>
            <div style={{ 
              color: 'var(--foe-confidence)', 
              fontWeight: 700, 
              fontSize: '0.9em',
              marginBottom: '0.5em'
            }}>
              Katalyst Platform
            </div>
            <div style={{ fontSize: '2em', margin: '0.3em 0' }}>&#128640;</div>
            <div style={{
              background: 'var(--foe-confidence)',
              color: 'white',
              padding: '0.4em 0.8em',
              borderRadius: '20px',
              fontSize: '0.6em',
              fontWeight: 600,
              marginTop: '0.5em',
              display: 'inline-block'
            }}>
              Confidence
            </div>
            <p style={{ fontSize: '0.55em', color: 'var(--foe-text-light)', marginTop: '0.8em' }}>
              Safe deployment and rollback
            </p>
          </div>
        </div>
        
        <div className="fragment" style={{
          marginTop: '1.5em',
          padding: '1em 2em',
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(30, 64, 175, 0.05) 100%)',
          borderRadius: '12px',
          textAlign: 'center',
          fontSize: '0.75em'
        }}>
          <strong style={{ color: 'var(--foe-primary)' }}>
            Theory meets reality: Each Katalyst component embodies an FOE principle
          </strong>
        </div>
        
        <aside className="notes">
          This is where FOE becomes tangible. Katalyst Taxonomy provides the shared language and mental models - 
          that's Understanding. Katalyst BDD Test gives us immediate feedback on whether our code matches intent - 
          that's Fast Feedback. And the Katalyst Platform provides safe deployment with confidence through 
          automated rollback and progressive delivery. Each component was designed with these principles in mind,
          making Katalyst a concrete implementation of FOE philosophy.
        </aside>
      </section>
    </>
  );
}

export default Level4Slides;
