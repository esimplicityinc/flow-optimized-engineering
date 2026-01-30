import React, { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './demand-shift.module.css';
import { SimpleAccordion, AccordionGroup, AccordionItem } from '../components/DemandShift/Accordion';
import {
  DEMAND_LEVELS,
  LEGACY_SKILLS,
  SECTION_CONTENT,
  GENE_SHIFT_DETAILS,
  COMPARISON_DATA,
  PERSONA_DETAILS,
  STRATEGIC_ACTIONS,
  DOMAIN_COLORS,
  ERA_COLORS,
  getDemandByDomain,
  getEvidenceEngineGenes,
} from '../components/DemandShift/demandShiftData';
import { GOVCON_QUOTES, GOV_PERSONAS } from '../components/GenomeExplorer/genomeData';

// ============================================
// INTERSECTION OBSERVER HOOK
// ============================================

function useInView(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.2, ...options });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection(): ReactNode {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPhaseLabel = () => {
    switch (animationPhase) {
      case 0: return 'Pre-AI Era';
      case 1: return 'Transition';
      case 2: return 'AI Era';
      default: return '';
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>The Demand Shift</h1>
        <p className={styles.heroSubtitle}>What government will need in the AI era</p>
        
        <div className={styles.genomeWheel}>
          <div className={styles.wheelContainer}>
            {/* Animated genome visualization */}
            <svg 
              viewBox="0 0 200 200" 
              className={styles.wheelSvg}
              role="img"
              aria-labelledby="genome-wheel-title genome-wheel-desc"
            >
              <title id="genome-wheel-title">AI Era Capability Demand Wheel</title>
              <desc id="genome-wheel-desc">
                An animated pie chart showing how demand shifts across four capability domains 
                (Product, Education, Systems/Evidence Engine, and Legacy Skills) as we move 
                from Pre-AI Era through Transition to AI Era. Currently showing: {getPhaseLabel()}.
              </desc>
              {/* Background circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="var(--ifm-color-emphasis-200)" strokeWidth="1" />
              
              {/* Product wedge */}
              <g className={`${styles.wedge} ${styles.productWedge}`} style={{ opacity: animationPhase === 0 ? 0.4 : animationPhase === 1 ? 0.6 : 0.7 }}>
                <path d="M100,100 L100,10 A90,90 0 0,1 177.9,55 Z" fill={DOMAIN_COLORS.product} />
              </g>
              
              {/* Education wedge */}
              <g className={`${styles.wedge} ${styles.educationWedge}`} style={{ opacity: animationPhase === 0 ? 0.3 : animationPhase === 1 ? 0.6 : 0.8 }}>
                <path d="M100,100 L177.9,55 A90,90 0 0,1 177.9,145 Z" fill={DOMAIN_COLORS.education} />
              </g>
              
              {/* Systems wedge - THE EVIDENCE ENGINE - grows most */}
              <g className={`${styles.wedge} ${styles.systemsWedge}`} style={{ opacity: animationPhase === 0 ? 0.25 : animationPhase === 1 ? 0.7 : 0.95 }}>
                <path d="M100,100 L177.9,145 A90,90 0 0,1 22.1,145 Z" fill={DOMAIN_COLORS.systems} />
              </g>
              
              {/* Remaining wedge (legacy skills - shrinks) */}
              <g className={styles.wedge} style={{ opacity: animationPhase === 0 ? 0.9 : animationPhase === 1 ? 0.5 : 0.2 }}>
                <path d="M100,100 L22.1,145 A90,90 0 0,1 100,10 Z" fill="var(--esim-legacy, #6B7280)" />
              </g>
              
              {/* Center label */}
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className={styles.wheelLabel}>
                {getPhaseLabel()}
              </text>
            </svg>
            
            {/* Screen reader announcement for phase changes */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              Current phase: {getPhaseLabel()}
            </div>
            
            {/* Legend */}
            <div className={styles.wheelLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: DOMAIN_COLORS.product }} />
                <span>Product</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: DOMAIN_COLORS.education }} />
                <span>Education</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: DOMAIN_COLORS.systems }} />
                <span>Systems (Evidence Engine)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: 'var(--esim-legacy, #6B7280)' }} />
                <span>Legacy Skills</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span>Scroll to explore</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ============================================
// THESIS SECTION
// ============================================

function ThesisSection(): ReactNode {
  const { ref, isInView } = useInView();
  const content = SECTION_CONTENT.thesis;

  return (
    <section ref={ref} className={`${styles.section} ${styles.thesisSection} ${isInView ? styles.visible : ''}`}>
      <div className={styles.sectionInner}>
        <blockquote className={styles.bigQuote}>
          "{content.headline}"
        </blockquote>
        
        <p className={styles.keyInsight}>{content.keyInsight}</p>
        
        {content.expandable && (
          <SimpleAccordion title={content.expandable.title}>
            {content.expandable.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </SimpleAccordion>
        )}
      </div>
    </section>
  );
}

// ============================================
// OLD EQUATION SECTION (Split Screen)
// ============================================

function OldEquationSection(): ReactNode {
  const { ref, isInView } = useInView();
  const content = SECTION_CONTENT.oldEquation;

  return (
    <section ref={ref} className={`${styles.section} ${styles.splitSection} ${isInView ? styles.visible : ''}`}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>{content.headline}</h2>
        <p className={styles.sectionSubtitle}>{content.subheadline}</p>
        
        <div className={styles.splitContainer}>
          {/* What was scarce */}
          <div className={styles.splitPanel}>
            <h3 className={styles.panelTitle}>What Was Scarce</h3>
            <p className={styles.panelSubtitle}>High value, high demand</p>
            <div className={styles.demandBars}>
              {LEGACY_SKILLS.map((skill) => (
                <div key={skill.geneId} className={styles.demandRow}>
                  <span className={styles.demandLabel}>{skill.geneName}</span>
                  <div className={styles.demandBarContainer}>
                    <div 
                      className={`${styles.demandBar} ${styles.scarce}`}
                      style={{ width: isInView ? `${skill.preAI * 100}%` : '0%' }}
                    />
                  </div>
                  <span className={styles.demandValue}>{Math.round(skill.preAI * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* What was abundant */}
          <div className={styles.splitPanel}>
            <h3 className={styles.panelTitle}>What Was Abundant</h3>
            <p className={styles.panelSubtitle}>Low value, low priority</p>
            <div className={styles.demandBars}>
              {getEvidenceEngineGenes().map((gene) => (
                <div key={gene.geneId} className={styles.demandRow}>
                  <span className={styles.demandLabel}>{gene.geneName}</span>
                  <div className={styles.demandBarContainer}>
                    <div 
                      className={`${styles.demandBar} ${styles.abundant}`}
                      style={{ width: isInView ? `${gene.preAI * 100}%` : '0%' }}
                    />
                  </div>
                  <span className={styles.demandValue}>{Math.round(gene.preAI * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {content.expandable && (
          <SimpleAccordion title={content.expandable.title}>
            <ul>
              {content.expandable.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </SimpleAccordion>
        )}
      </div>
    </section>
  );
}

// ============================================
// AI SHOCK SECTION
// ============================================

function AIShockSection(): ReactNode {
  const { ref, isInView } = useInView();
  const content = SECTION_CONTENT.aiShock;
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimationComplete(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section ref={ref} className={`${styles.section} ${styles.shockSection} ${isInView ? styles.visible : ''}`}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>{content.headline}</h2>
        <p className={styles.sectionSubtitle}>{content.subheadline}</p>
        
        <div className={styles.floodVisualization}>
          <div className={styles.floodChart}>
            <div className={styles.floodLabel}>Code Supply</div>
            
            <div className={styles.floodRow}>
              <span className={styles.floodEra}>Pre-AI</span>
              <div className={styles.floodBarContainer}>
                <div 
                  className={styles.floodBar}
                  style={{ 
                    width: isInView ? '20%' : '0%',
                    background: ERA_COLORS.preAI
                  }}
                />
              </div>
            </div>
            
            <div className={styles.floodRow}>
              <span className={styles.floodEra}>Post-AI</span>
              <div className={styles.floodBarContainer}>
                <div 
                  className={`${styles.floodBar} ${styles.flooding}`}
                  style={{ 
                    width: isInView ? '100%' : '0%',
                    background: ERA_COLORS.aiEra,
                    transitionDelay: '0.5s'
                  }}
                />
                {animationComplete && (
                  <span className={styles.multiplier}>5-10x</span>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.shockInsight}>
            <p className={styles.keyInsight}>{content.keyInsight}</p>
          </div>
        </div>
        
        {content.expandable && (
          <SimpleAccordion title={content.expandable.title}>
            <ul>
              {content.expandable.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </SimpleAccordion>
        )}
      </div>
    </section>
  );
}

// ============================================
// NEW SCARCITY SECTION (Heatmap)
// ============================================

function NewScarcitySection(): ReactNode {
  const { ref, isInView } = useInView();
  const content = SECTION_CONTENT.newScarcity;

  const getDemandColor = (value: number, isEvidenceEngine: boolean) => {
    if (isEvidenceEngine) {
      // eSimplicity Purple (#CC8BFA) for Evidence Engine
      return `rgba(204, 139, 250, ${value})`;
    }
    // eSimplicity Primary Blue (#3223BD) for others
    return `rgba(50, 35, 189, ${value})`;
  };

  return (
    <section ref={ref} className={`${styles.section} ${styles.scarcitySection} ${isInView ? styles.visible : ''}`}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>{content.headline}</h2>
        <p className={styles.sectionSubtitle}>{content.subheadline}</p>
        <p className={styles.sectionNarrative}>{content.narrative}</p>
        
        <div className={styles.heatmapContainer}>
          {/* Pre-AI Heatmap */}
          <div className={styles.heatmapPanel}>
            <h4 className={styles.heatmapTitle}>Pre-AI Demand</h4>
            <div className={styles.heatmapGrid}>
              {['product', 'education', 'systems'].map((domain) => (
                <div key={domain} className={styles.heatmapDomain}>
                  <span className={styles.domainLabel} style={{ color: DOMAIN_COLORS[domain as keyof typeof DOMAIN_COLORS] }}>
                    {domain.charAt(0).toUpperCase() + domain.slice(1)}
                  </span>
                  <div className={styles.geneRow} role="list">
                    {getDemandByDomain(domain as 'product' | 'education' | 'systems').map((gene) => (
                      <div
                        key={gene.geneId}
                        className={`${styles.geneCell} ${gene.isEvidenceEngine ? styles.engineCell : ''}`}
                        style={{ 
                          background: getDemandColor(gene.preAI, gene.isEvidenceEngine),
                          opacity: isInView ? 1 : 0,
                          transitionDelay: `${Math.random() * 0.5}s`
                        }}
                        role="listitem"
                        aria-label={`${gene.geneName}: ${Math.round(gene.preAI * 100)}% demand in pre-AI era${gene.isEvidenceEngine ? ' (Evidence Engine gene)' : ''}`}
                      >
                        <span className={styles.cellValue} aria-hidden="true">{Math.round(gene.preAI * 100)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Arrow */}
          <div className={styles.heatmapArrow} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* AI-Era Heatmap */}
          <div className={styles.heatmapPanel}>
            <h4 className={styles.heatmapTitle}>AI-Era Demand</h4>
            <div className={styles.heatmapGrid}>
              {['product', 'education', 'systems'].map((domain) => (
                <div key={domain} className={styles.heatmapDomain}>
                  <span className={styles.domainLabel} style={{ color: DOMAIN_COLORS[domain as keyof typeof DOMAIN_COLORS] }}>
                    {domain.charAt(0).toUpperCase() + domain.slice(1)}
                    {domain === 'systems' && <span className={styles.engineTag}>ENGINE</span>}
                  </span>
                  <div className={styles.geneRow} role="list">
                    {getDemandByDomain(domain as 'product' | 'education' | 'systems').map((gene) => (
                      <div
                        key={gene.geneId}
                        className={`${styles.geneCell} ${gene.isEvidenceEngine ? styles.engineCell : ''}`}
                        style={{ 
                          background: getDemandColor(gene.aiEra, gene.isEvidenceEngine),
                          opacity: isInView ? 1 : 0,
                          transitionDelay: `${0.5 + Math.random() * 0.5}s`
                        }}
                        role="listitem"
                        aria-label={`${gene.geneName}: ${Math.round(gene.aiEra * 100)}% demand in AI era${gene.isEvidenceEngine ? ' (Evidence Engine gene)' : ''}`}
                      >
                        <span className={styles.cellValue} aria-hidden="true">{Math.round(gene.aiEra * 100)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <p className={styles.keyInsight}>{content.keyInsight}</p>
        
        {/* Gene detail cards */}
        <div className={styles.geneCards}>
          <p className={styles.cardsPrompt}>Expand to see why demand changed for Evidence Engine genes:</p>
          <AccordionGroup>
            {getEvidenceEngineGenes().map((gene) => (
              <AccordionItem key={gene.geneId} id={gene.geneId} title={gene.geneName} isOpen={false} onToggle={() => {}}>
                {GENE_SHIFT_DETAILS[gene.geneId] && (
                  <div className={styles.geneDetail}>
                    <div className={styles.geneDetailRow}>
                      <strong>Pre-AI:</strong> {GENE_SHIFT_DETAILS[gene.geneId].preAI}
                    </div>
                    <div className={styles.geneDetailRow}>
                      <strong>Post-AI:</strong> {GENE_SHIFT_DETAILS[gene.geneId].postAI}
                    </div>
                    <div className={styles.geneDetailRow}>
                      <strong>Why:</strong> {GENE_SHIFT_DETAILS[gene.geneId].why}
                    </div>
                    <div className={styles.geneDetailRow}>
                      <strong>Vendor implication:</strong> {GENE_SHIFT_DETAILS[gene.geneId].vendorImplication}
                    </div>
                  </div>
                )}
              </AccordionItem>
            ))}
          </AccordionGroup>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PERMISSION BOTTLENECK SECTION
// ============================================

function PermissionSection(): ReactNode {
  const { ref, isInView } = useInView();
  const content = SECTION_CONTENT.permissionBottleneck;
  const [showStrong, setShowStrong] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  // Auto-switch once when section comes into view, then allow manual control
  useEffect(() => {
    if (isInView && !hasAutoPlayed) {
      const timer = setTimeout(() => {
        setShowStrong(true);
        setHasAutoPlayed(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAutoPlayed]);

  return (
    <section ref={ref} className={`${styles.section} ${styles.permissionSection} ${isInView ? styles.visible : ''}`}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>{content.headline}</h2>
        <p className={styles.sectionSubtitle}>{content.subheadline}</p>
        
        {/* Toggle buttons for pipeline view */}
        <div className={styles.pipelineToggle} role="tablist" aria-label="Pipeline comparison">
          <button
            role="tab"
            aria-selected={!showStrong}
            className={`${styles.toggleButton} ${!showStrong ? styles.toggleActive : ''}`}
            onClick={() => setShowStrong(false)}
          >
            Weak Evidence Engine
          </button>
          <button
            role="tab"
            aria-selected={showStrong}
            className={`${styles.toggleButton} ${showStrong ? styles.toggleActive : ''}`}
            onClick={() => setShowStrong(true)}
          >
            Strong Evidence Engine
          </button>
        </div>
        
        <div className={styles.pipelineContainer}>
          {/* Weak Evidence Engine Pipeline */}
          <div className={`${styles.pipeline} ${!showStrong ? styles.activePipeline : ''}`}>
            <h4 className={styles.pipelineLabel}>With Weak Evidence Engine</h4>
            <div className={styles.pipelineFlow}>
              <div className={styles.pipelineNode}>
                <div className={`${styles.nodeContent} ${styles.capacityNode}`}>
                  <span className={styles.nodeLabel}>Capacity</span>
                  <span className={styles.nodeValue}>HIGH</span>
                  <div className={styles.nodeBar} style={{ width: isInView ? '100%' : '0%' }} />
                </div>
              </div>
              
              <div className={styles.flowArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              
              <div className={styles.pipelineNode}>
                <div className={`${styles.nodeContent} ${styles.engineNode} ${styles.weakEngine}`}>
                  <span className={styles.nodeLabel}>Evidence Engine</span>
                  <span className={styles.nodeValue}>WEAK</span>
                  <div className={styles.nodeBar} style={{ width: isInView ? '20%' : '0%', background: 'var(--esim-danger, #EF4444)' }} />
                </div>
              </div>
              
              <div className={styles.flowArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              
              <div className={styles.pipelineNode}>
                <div className={`${styles.nodeContent} ${styles.permissionNode}`}>
                  <span className={styles.nodeLabel}>Permission</span>
                  <span className={styles.nodeValue}>LOW</span>
                  <div className={styles.nodeBar} style={{ width: isInView ? '15%' : '0%', background: 'var(--esim-warning, #F59E0B)' }} />
                </div>
              </div>
            </div>
            <p className={styles.pipelineResult}>
              <span className={styles.resultIcon}>&#9888;</span>
              Bottleneck: Capacity without evidence creates risk, not permission
            </p>
          </div>
          
          {/* Strong Evidence Engine Pipeline */}
          <div className={`${styles.pipeline} ${showStrong ? styles.activePipeline : ''}`}>
            <h4 className={styles.pipelineLabel}>With Strong Evidence Engine</h4>
            <div className={styles.pipelineFlow}>
              <div className={styles.pipelineNode}>
                <div className={`${styles.nodeContent} ${styles.capacityNode}`}>
                  <span className={styles.nodeLabel}>Capacity</span>
                  <span className={styles.nodeValue}>HIGH</span>
                  <div className={styles.nodeBar} style={{ width: showStrong ? '100%' : '0%' }} />
                </div>
              </div>
              
              <div className={styles.flowArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              
              <div className={styles.pipelineNode}>
                <div className={`${styles.nodeContent} ${styles.engineNode} ${styles.strongEngine}`}>
                  <span className={styles.nodeLabel}>Evidence Engine</span>
                  <span className={styles.nodeValue}>STRONG</span>
                  <div className={styles.nodeBar} style={{ width: showStrong ? '90%' : '0%', background: 'var(--esim-success, #10B981)' }} />
                </div>
              </div>
              
              <div className={styles.flowArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              
              <div className={styles.pipelineNode}>
                <div className={`${styles.nodeContent} ${styles.permissionNode}`}>
                  <span className={styles.nodeLabel}>Permission</span>
                  <span className={styles.nodeValue}>HIGH</span>
                  <div className={styles.nodeBar} style={{ width: showStrong ? '85%' : '0%', background: 'var(--esim-success, #10B981)' }} />
                </div>
              </div>
            </div>
            <p className={styles.pipelineResult}>
              <span className={styles.resultIcon}>&#10003;</span>
              Capacity flows into outcomes with evidence at every step
            </p>
          </div>
        </div>
        
        <blockquote className={styles.permissionQuote}>
          {content.keyInsight}
        </blockquote>
        
        {content.expandable && (
          <SimpleAccordion title={content.expandable.title}>
            <ul>
              {content.expandable.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </SimpleAccordion>
        )}
      </div>
    </section>
  );
}

// ============================================
// PERSONAS SECTION
// ============================================

function PersonasSection(): ReactNode {
  const { ref, isInView } = useInView();
  const content = SECTION_CONTENT.personas;

  // Simplified: 2 key personas per side that map directly to each other
  const keyRelationships = [
    {
      demand: {
        name: 'Risk Owner',
        need: 'Proof before permission',
        question: '"How do I know this is safe?"',
      },
      supply: {
        name: 'Enablement Hybrid',
        provides: 'Evidence pipelines & guardrails',
        answer: '"Here\'s the automated proof."',
      },
      exchange: 'Evidence',
    },
    {
      demand: {
        name: 'Mission Owner',
        need: 'Verified outcomes',
        question: '"How do I know this works?"',
      },
      supply: {
        name: 'Mission Hybrid',
        provides: 'Outcome measurement & iteration',
        answer: '"Here\'s what changed and why."',
      },
      exchange: 'Outcomes',
    },
  ];

  return (
    <section ref={ref} className={`${styles.section} ${styles.personasSection} ${isInView ? styles.visible : ''}`}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>{content.headline}</h2>
        <p className={styles.sectionSubtitle}>The new exchange between government and vendors</p>
        
        <div className={styles.relationshipContainer}>
          {keyRelationships.map((rel, index) => (
            <div key={index} className={styles.relationshipRow}>
              {/* Demand side */}
              <div className={styles.personaCard}>
                <div className={styles.personaHeader}>
                  <span className={styles.personaSide}>Government</span>
                  <h4 className={styles.personaName}>{rel.demand.name}</h4>
                </div>
                <p className={styles.personaNeed}><strong>Needs:</strong> {rel.demand.need}</p>
                <p className={styles.personaQuestion}>{rel.demand.question}</p>
              </div>
              
              {/* Exchange arrow */}
              <div className={styles.exchangeArrow}>
                <div className={styles.exchangeLabel}>{rel.exchange}</div>
                <svg viewBox="0 0 60 24" className={styles.arrowSvg} aria-hidden="true">
                  <defs>
                    <marker id={`arrowhead-${index}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                    </marker>
                  </defs>
                  <line x1="5" y1="12" x2="55" y2="12" stroke="currentColor" strokeWidth="2" markerEnd={`url(#arrowhead-${index})`} />
                </svg>
              </div>
              
              {/* Supply side */}
              <div className={styles.personaCard}>
                <div className={styles.personaHeader}>
                  <span className={styles.personaSide}>Vendor</span>
                  <h4 className={styles.personaName}>{rel.supply.name}</h4>
                </div>
                <p className={styles.personaNeed}><strong>Provides:</strong> {rel.supply.provides}</p>
                <p className={styles.personaAnswer}>{rel.supply.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className={styles.keyInsight}>
          In the AI era, the exchange shifts from "features for money" to "evidence for permission."
        </p>
      </div>
    </section>
  );
}

// ============================================
// WINNING PLAY SECTION
// ============================================

function WinningPlaySection(): ReactNode {
  const { ref, isInView } = useInView();
  const content = SECTION_CONTENT.winningPlay;

  return (
    <section ref={ref} className={`${styles.section} ${styles.winningSection} ${isInView ? styles.visible : ''}`}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>{content.headline}</h2>
        <p className={styles.sectionSubtitle}>{content.subheadline}</p>
        
        <div className={styles.pillarsContainer}>
          {STRATEGIC_ACTIONS.map((action, index) => (
            <div key={action.id} className={styles.pillar} style={{ transitionDelay: `${index * 0.2}s` }}>
              <div className={styles.pillarIcon}>
                {action.pillar === 'genes' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3c-1.5 0-2.5 1-2.5 2.5S10.5 8 12 8s2.5-1 2.5-2.5S13.5 3 12 3z" />
                    <path d="M12 8v8" />
                    <path d="M12 16c-1.5 0-2.5 1-2.5 2.5S10.5 21 12 21s2.5-1 2.5-2.5S13.5 16 12 16z" />
                    <path d="M9.5 5.5c-2 1-3.5 3-3.5 6.5s1.5 5.5 3.5 6.5" />
                    <path d="M14.5 5.5c2 1 3.5 3 3.5 6.5s-1.5 5.5-3.5 6.5" />
                  </svg>
                )}
                {action.pillar === 'people' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                )}
                {action.pillar === 'process' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    <path d="M8 7h8M8 11h8M8 15h4" />
                  </svg>
                )}
              </div>
              <h3 className={styles.pillarTitle}>{action.title}</h3>
              <p className={styles.pillarDesc}>{action.description}</p>
              
              <SimpleAccordion title="Action Items">
                <ul>
                  {action.actions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </SimpleAccordion>
            </div>
          ))}
        </div>
        
        <blockquote className={styles.finalQuote}>
          "{content.keyInsight}"
        </blockquote>
        
        <div className={styles.ctaContainer}>
          <p className={styles.ctaText}>Ready to explore this interactively?</p>
          <Link to="/genome-game" className={styles.ctaButton}>
            Play The Permission Game
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function DemandShiftPage(): ReactNode {
  return (
    <Layout
      title="The Demand Shift"
      description="Understanding the shift from code abundance to permission scarcity"
    >
      <main className={styles.main}>
        <HeroSection />
        <ThesisSection />
        <OldEquationSection />
        <AIShockSection />
        <NewScarcitySection />
        <PermissionSection />
        <PersonasSection />
        <WinningPlaySection />
      </main>
    </Layout>
  );
}
