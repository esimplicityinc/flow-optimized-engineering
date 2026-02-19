import type { ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './genome-explorer-b.module.css';
import {
  GENES,
  DOMAINS,
  SPECIES_PROFILES,
  EXTINCTION_EVENTS,
  type Gene,
  type Domain,
} from '../components/GenomeExplorer/genomeData';

import CircuitFlowVisualization from '../components/GenomeExplorer/CircuitFlowVisualization';
import { ThreePillars } from '../components/GenomeExplorer/ThreePillars';
import { GovPersonas } from '../components/GenomeExplorer/GovPersonas';
import { DeliverySpectrum } from '../components/GenomeExplorer/DeliverySpectrum';

// ============================================
// HELPER FUNCTIONS
// ============================================

function getDomainColor(domain: Domain): string {
  return DOMAINS[domain].color;
}

// Map circuit gene IDs (camelCase) to genomeData gene IDs (kebab-case)
const CIRCUIT_TO_GENOME_ID: Record<string, string> = {
  mentalModels: 'mental-models',
  cognitiveErgonomics: 'cognitive-ergonomics',
  // Direct matches (same in both)
  discovery: 'discovery',
  tradeoffs: 'tradeoffs',
  adoption: 'adoption',
  strategy: 'strategy',
  communication: 'communication',
  enablement: 'enablement',
  constraints: 'constraints',
  verification: 'verification',
  operability: 'operability',
  governance: 'governance',
};

function mapCircuitGeneIdToGenome(circuitId: string): string {
  return CIRCUIT_TO_GENOME_ID[circuitId] || circuitId;
}

function getWeightLabel(weight: number): string {
  switch (weight) {
    case 3: return 'Critical';
    case 2: return 'Important';
    default: return 'Supporting';
  }
}

// ============================================
// COMPONENTS
// ============================================

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        {/* DNA Helix Background Animation */}
        <div className={styles.dnaBackground}>
          <div className={styles.dnaStrand} data-strand="left">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`left-${i}`}
                className={styles.dnaNode}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <div className={styles.dnaConnectors}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`conn-${i}`}
                className={styles.dnaConnector}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <div className={styles.dnaStrand} data-strand="right">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`right-${i}`}
                className={styles.dnaNode}
                style={{ animationDelay: `${i * 0.15 + 0.075}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.heroContent}>
        <div className={styles.badge}>The Enablement Spine</div>
        <h1 className={styles.heroTitle}>The Engineering Genome</h1>
        <p className={styles.heroSubtitle}>
          The genome that converts AI capacity into government permission
        </p>
        <p className={styles.heroQuoteSubtitle}>
          "Government is a permission economy. We don't get rewarded for speed.
          We get rewarded for <span className={styles.highlight}>assurance</span>."
        </p>
        <div className={styles.domainLegend}>
          {Object.entries(DOMAINS).map(([key, domain]) => (
            <div key={key} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: domain.color }}
              />
              <span>{domain.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore the genome</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// The "Spine Genes" - Systems domain genes critical for permission
const SPINE_GENE_IDS = ['constraints', 'verification', 'operability', 'governance'];

// ============================================
// GENOME OVERVIEW - Simple gene descriptions
// ============================================

function GenomeOverview({ onGeneSelect }: { onGeneSelect: (gene: Gene) => void }): ReactNode {
  const [expanded, setExpanded] = useState(false);
  
  const genesByDomain = {
    product: GENES.filter(g => g.domain === 'product'),
    education: GENES.filter(g => g.domain === 'education'),
    systems: GENES.filter(g => g.domain === 'systems'),
  };

  const domainDescriptions: Record<Domain, string> = {
    product: 'Finding the right problems and making smart decisions',
    education: 'Sharing knowledge and helping others succeed',
    systems: 'Building reliable infrastructure that earns trust',
  };

  return (
    <section className={styles.genomeOverview}>
      <div className={styles.overviewHeader}>
        <h2>The 12 Capability Genes</h2>
        <p>The delivery capabilities that produce the evidence assurance and governance require</p>
      </div>
      
      <div className={`${styles.domainCards} ${expanded ? styles.domainCardsExpanded : ''}`}>
        {(Object.keys(genesByDomain) as Domain[]).map((domain) => {
          const genes = genesByDomain[domain];
          
          return (
            <div 
              key={domain} 
              className={`${styles.domainCard} ${expanded ? styles.expanded : ''}`}
              style={{ '--domain-color': DOMAINS[domain].color } as React.CSSProperties}
            >
              <div className={styles.domainCardHeader}>
                <div className={styles.domainCardTitle}>
                  <span 
                    className={styles.domainDot} 
                    style={{ background: DOMAINS[domain].color }}
                  />
                  <h3>{DOMAINS[domain].name}</h3>
                </div>
                <p className={styles.domainDesc}>{domainDescriptions[domain]}</p>
              </div>
              
              <div className={styles.geneList}>
                {genes.map((gene) => (
                  <button
                    key={gene.id}
                    className={styles.geneCard}
                    onClick={() => onGeneSelect(gene)}
                  >
                    <div className={styles.geneCardHeader}>
                      <span className={styles.geneName}>{gene.name}</span>
                    </div>
                    <p className={styles.geneDefinition}>{gene.definition}</p>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button 
        className={styles.expandAllToggle}
        onClick={() => setExpanded(!expanded)}
      >
        <span>{expanded ? 'Hide genes' : 'Show all genes'}</span>
        <span className={`${styles.expandAllIcon} ${expanded ? styles.expandAllIconOpen : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </button>
      
    </section>
  );
}

// Supply side personas (vendors)
const SUPPLY_PERSONAS = [
  { id: 'mission-hybrid', name: 'Mission Hybrid', icon: '🎯', output: 'Intent' },
  { id: 'enablement-hybrid', name: 'Enablement Hybrid', icon: '⚙️', output: 'Evidence' },
  { id: 'service-pmo', name: 'Service Delivery', icon: '📋', output: 'Artifacts' },
];

// Demand side personas (government)
const DEMAND_PERSONAS = [
  { id: 'risk-owner', name: 'Risk Owner', icon: '🛡️', needs: 'Proof' },
  { id: 'mission-owner', name: 'Mission Owner', icon: '🎯', needs: 'Outcomes' },
  { id: 'contracting', name: 'Contracting Officer', icon: '📄', needs: 'Compliance' },
  { id: 'program-mgr', name: 'Program Manager', icon: '📊', needs: 'Visibility' },
  { id: 'security', name: 'Security Authority', icon: '🔒', needs: 'Assurance' },
];

// Flow types through the genome
const FLOW_TYPES = [
  { id: 'intent', label: 'Intent', color: '#F59E0B' },
  { id: 'evidence', label: 'Evidence', color: '#8B5CF6' },
  { id: 'guardrails', label: 'Guardrails', color: '#EF4444' },
  { id: 'artifacts', label: 'Artifacts', color: '#3B82F6' },
];

function GenomeFlowVisualization({ onGeneSelect }: { onGeneSelect: (gene: Gene) => void }): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Arrange 12 genes in a tighter honeycomb for the center
  const honeycombLayout = [
    { genes: GENES.slice(0, 3), offset: false },
    { genes: GENES.slice(3, 7), offset: true },
    { genes: GENES.slice(7, 10), offset: false },
    { genes: GENES.slice(10, 12), offset: true },
  ];

  return (
    <section className={styles.flowSection}>
      <div className={styles.flowHeader}>
        <h2>The Permission Engine</h2>
        <p>Vendor capabilities flow through the genome to meet government demands</p>
      </div>
      
      <div className={`${styles.flowContainer} ${isVisible ? styles.visible : ''}`} ref={containerRef}>
        {/* Supply Side (Vendors) */}
        <div className={styles.flowSide} data-side="supply">
          <div className={styles.sideLabel}>Supply (Vendors)</div>
          <div className={styles.personaList}>
            {SUPPLY_PERSONAS.map((persona, i) => (
              <div 
                key={persona.id} 
                className={styles.personaCard}
                style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
              >
                <span className={styles.personaIcon}>{persona.icon}</span>
                <span className={styles.personaName}>{persona.name}</span>
                <span className={styles.personaOutput}>→ {persona.output}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Lines - Supply to Genome */}
        <div className={styles.flowLines} data-direction="in">
          {FLOW_TYPES.slice(0, 3).map((flow, i) => (
            <svg key={flow.id} className={styles.flowLine} viewBox="0 0 100 60" preserveAspectRatio="none">
              <defs>
                <marker id={`arrow-in-${flow.id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill={flow.color} />
                </marker>
              </defs>
              <path 
                d={`M 5 ${15 + i * 15} Q 50 ${20 + i * 10}, 95 30`}
                stroke={flow.color}
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,3"
                markerEnd={`url(#arrow-in-${flow.id})`}
                className={styles.flowPath}
                style={{ '--delay': `${0.5 + i * 0.15}s` } as React.CSSProperties}
              />
              <text x="50" y={12 + i * 12} fill={flow.color} fontSize="8" textAnchor="middle" className={styles.flowLabel}>
                {flow.label}
              </text>
            </svg>
          ))}
        </div>

        {/* Central Genome Honeycomb */}
        <div className={styles.genomeCore}>
          <div className={styles.genomeLabel}>Evidence Engine</div>
          <div className={styles.honeycombMini}>
            {honeycombLayout.map((row, rowIndex) => (
              <div key={rowIndex} className={`${styles.hexRowMini} ${row.offset ? styles.offsetRow : ''}`}>
                {row.genes.map((gene, geneIndex) => {
                  const domainColor = getDomainColor(gene.domain);
                  const delay = 0.3 + rowIndex * 0.08 + geneIndex * 0.04;
                  
                  return (
                    <button
                      key={gene.id}
                      className={styles.hexMini}
                      onClick={() => onGeneSelect(gene)}
                      style={{
                        '--hex-color': domainColor,
                        '--delay': `${delay}s`,
                      } as React.CSSProperties}
                      aria-label={`View details for ${gene.name}`}
                      title={gene.name}
                    >
                      <span className={styles.hexMiniLabel}>{gene.name.slice(0, 3)}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className={styles.domainLegendMini}>
            {Object.entries(DOMAINS).map(([key, domain]) => (
              <div key={key} className={styles.legendDotMini} style={{ background: domain.color }} title={domain.name} />
            ))}
          </div>
        </div>

        {/* Flow Lines - Genome to Demand */}
        <div className={styles.flowLines} data-direction="out">
          {FLOW_TYPES.map((flow, i) => (
            <svg key={flow.id} className={styles.flowLine} viewBox="0 0 100 80" preserveAspectRatio="none">
              <defs>
                <marker id={`arrow-out-${flow.id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill={flow.color} />
                </marker>
              </defs>
              <path 
                d={`M 5 40 Q 50 ${20 + i * 12}, 95 ${10 + i * 15}`}
                stroke={flow.color}
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,3"
                markerEnd={`url(#arrow-out-${flow.id})`}
                className={styles.flowPath}
                style={{ '--delay': `${0.8 + i * 0.15}s` } as React.CSSProperties}
              />
              <text x="50" y={28 + i * 10} fill={flow.color} fontSize="8" textAnchor="middle" className={styles.flowLabel}>
                {flow.label}
              </text>
            </svg>
          ))}
        </div>

        {/* Demand Side (Government) */}
        <div className={styles.flowSide} data-side="demand">
          <div className={styles.sideLabel}>Demand (Government)</div>
          <div className={styles.personaList}>
            {DEMAND_PERSONAS.map((persona, i) => (
              <div 
                key={persona.id} 
                className={styles.personaCard}
                style={{ '--delay': `${0.6 + i * 0.1}s` } as React.CSSProperties}
              >
                <span className={styles.personaIcon}>{persona.icon}</span>
                <span className={styles.personaName}>{persona.name}</span>
                <span className={styles.personaNeeds}>← {persona.needs}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className={styles.flowInsight}>
        <span className={styles.insightLabel}>Key Insight</span>
        <p>
          The genome converts <strong>vendor capacity</strong> into <strong>government permission</strong>. 
          Without the Evidence Engine, capacity creates risk, not outcomes.
        </p>
      </div>
    </section>
  );
}

function HexagonGrid({ onGeneSelect }: { onGeneSelect: (gene: Gene) => void }): ReactNode {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const honeycombLayout = [
    { genes: GENES.slice(0, 3), offset: false },
    { genes: GENES.slice(3, 7), offset: true },
    { genes: GENES.slice(7, 10), offset: false },
    { genes: GENES.slice(10, 12), offset: true },
  ];

  return (
    <section className={styles.hexSection}>
      <div className={styles.hexHeader}>
        <h2>Explore the Genome</h2>
        <p>Click any gene to see how it evolved from pre-AI to AI era</p>
        <div className={styles.domainLegendInline}>
          {Object.entries(DOMAINS).map(([key, domain]) => (
            <div key={key} className={styles.legendChip}>
              <span className={styles.legendDot} style={{ background: domain.color }} />
              <span>{domain.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`${styles.honeycomb} ${isVisible ? styles.visible : ''}`} ref={gridRef}>
        {honeycombLayout.map((row, rowIndex) => (
          <div key={rowIndex} className={`${styles.hexRow} ${row.offset ? styles.offsetRow : ''}`}>
            {row.genes.map((gene, geneIndex) => {
              const domainColor = getDomainColor(gene.domain);
              const delay = rowIndex * 0.1 + geneIndex * 0.05;
              
              return (
                <button
                  key={gene.id}
                  className={styles.hexagon}
                  onClick={() => onGeneSelect(gene)}
                  style={{
                    '--hex-color': domainColor,
                    '--delay': `${delay}s`,
                  } as React.CSSProperties}
                  aria-label={`View details for ${gene.name}`}
                >
                  <div className={styles.hexInner}>
                    <span className={styles.hexName}>{gene.name}</span>
                    <span className={styles.hexDomain}>{DOMAINS[gene.domain].name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function GeneModal({ gene, onClose }: { gene: Gene; onClose: () => void }): ReactNode {
  const domainColor = getDomainColor(gene.domain);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ '--modal-color': domainColor } as React.CSSProperties}
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <div
            className={styles.modalBadge}
            style={{ background: domainColor }}
          >
            {DOMAINS[gene.domain].name}
          </div>
          <h2>{gene.name}</h2>
          <p className={styles.modalDefinition}>{gene.definition}</p>
        </div>

        <div className={styles.modalBody}>
          {/* Strand Affinity Visualization */}
          <div className={styles.affinitySection}>
            <h3>Strand Affinity</h3>
            <div className={styles.affinityBars}>
              <div className={styles.affinityBar}>
                <span className={styles.affinityLabel}>Mission</span>
                <div className={styles.affinityTrack}>
                  <div
                    className={styles.affinityFill}
                    style={{
                      width: `${(gene.missionWeight / 3) * 100}%`,
                      background: 'linear-gradient(90deg, #F59E0B, #EF4444)',
                    }}
                  />
                </div>
                <span className={styles.affinityValue}>{getWeightLabel(gene.missionWeight)}</span>
              </div>
              <div className={styles.affinityBar}>
                <span className={styles.affinityLabel}>Enablement</span>
                <div className={styles.affinityTrack}>
                  <div
                    className={styles.affinityFill}
                    style={{
                      width: `${(gene.enablementWeight / 3) * 100}%`,
                      background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                    }}
                  />
                </div>
                <span className={styles.affinityValue}>{getWeightLabel(gene.enablementWeight)}</span>
              </div>
            </div>
          </div>

          {/* Then vs Now */}
          <div className={styles.evolutionSection}>
            <div className={styles.evolutionCard} data-era="then">
              <div className={styles.eraLabel}>Pre-AI Era</div>
              <p>{gene.thenExpression}</p>
            </div>
            <div className={styles.evolutionArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className={styles.evolutionCard} data-era="now">
              <div className={styles.eraLabel}>AI Era</div>
              <p>{gene.nowExpression}</p>
            </div>
          </div>

          {/* Examples */}
          <div className={styles.examplesSection}>
            <h3>In Practice</h3>
            <ul>
              {gene.examples.map((example, i) => (
                <li key={i}>{example}</li>
              ))}
            </ul>
          </div>

          {/* Key Question */}
          <div className={styles.questionSection}>
            <div className={styles.questionIcon}>?</div>
            <p>{gene.keyQuestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Traditional pre-AI roles and their primary genes
const TRADITIONAL_ROLES: {
  id: string;
  name: string;
  genes: string[];
  mergesInto: 'mission' | 'enablement' | 'both';
}[] = [
  { id: 'product-manager', name: 'Product Manager', genes: ['discovery', 'strategy', 'tradeoffs'], mergesInto: 'mission' },
  { id: 'ux-designer', name: 'UX / HCD Designer', genes: ['discovery', 'adoption', 'cognitive-ergonomics'], mergesInto: 'mission' },
  { id: 'business-analyst', name: 'Business Analyst', genes: ['communication', 'tradeoffs', 'strategy'], mergesInto: 'mission' },
  { id: 'scrum-master', name: 'Scrum Master', genes: ['communication', 'mental-models', 'strategy'], mergesInto: 'mission' },
  { id: 'developer', name: 'Developer', genes: ['adoption', 'constraints', 'verification', 'enablement'], mergesInto: 'both' },
  { id: 'qa-tester', name: 'QA / Tester', genes: ['verification', 'constraints', 'governance'], mergesInto: 'enablement' },
  { id: 'devops-sre', name: 'DevOps / SRE', genes: ['operability', 'governance', 'constraints'], mergesInto: 'enablement' },
  { id: 'security-engineer', name: 'Security Engineer', genes: ['constraints', 'governance', 'verification'], mergesInto: 'enablement' },
];

function SpeciesSection(): ReactNode {
  // Permission Economy framing for species
  const speciesFraming: Record<string, { permissionRole: string }> = {
    mission: { permissionRole: 'Produces intent that earns permission' },
    enablement: { permissionRole: 'Builds the spine that converts capacity to permission' },
  };

  const missionRoles = TRADITIONAL_ROLES.filter(r => r.mergesInto === 'mission' || r.mergesInto === 'both');
  const enablementRoles = TRADITIONAL_ROLES.filter(r => r.mergesInto === 'enablement' || r.mergesInto === 'both');

  return (
    <section className={styles.speciesSection}>
      <div className={styles.sectionHeader}>
        <h2>The Species</h2>
        <p>How traditional roles evolve into two hybrid organisms</p>
      </div>

      {/* Phase 1: Traditional Landscape */}
      <div className={styles.traditionalLandscape}>
        <h3 className={styles.phaseTitle}>The Traditional Landscape</h3>
        <p className={styles.phaseDesc}>
          Before agentic development, capabilities were siloed into specialized roles. Each role exercised a narrow slice of the genome.
        </p>
        <div className={styles.rolesGrid}>
          {TRADITIONAL_ROLES.map((role) => {
            const mergeClass = role.mergesInto === 'mission'
              ? styles.roleMission
              : role.mergesInto === 'enablement'
                ? styles.roleEnablement
                : styles.roleBoth;
            return (
              <div key={role.id} className={`${styles.roleCard} ${mergeClass}`}>
                <span className={styles.roleName}>{role.name}</span>
                <div className={styles.roleGenes}>
                  {role.genes.map((geneId) => {
                    const gene = GENES.find((g) => g.id === geneId);
                    return gene ? (
                      <span
                        key={geneId}
                        className={styles.roleGeneTag}
                        style={{ '--tag-color': getDomainColor(gene.domain) } as React.CSSProperties}
                      >
                        {gene.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase 2: The Merge */}
      <div className={styles.mergeSection}>
        <div className={styles.mergeVisual}>
          {/* Left convergence: Mission Hybrid */}
          <div className={styles.mergeColumn}>
            <div className={styles.mergeRoleList}>
              {missionRoles.map((role) => (
                <span key={role.id} className={`${styles.mergeRoleTag} ${styles.mergeMission}`}>
                  {role.name}
                  {role.mergesInto === 'both' && <span className={styles.mergeShared}>*</span>}
                </span>
              ))}
            </div>
            <div className={styles.mergeArrows}>
              <svg viewBox="0 0 60 80" className={styles.mergeArrowSvg}>
                <path d="M10,0 C10,40 30,40 30,70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
                <path d="M25,0 C25,35 30,45 30,70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
                <path d="M40,0 C40,35 30,50 30,70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
                <path d="M55,0 C55,30 30,50 30,70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
                <circle cx="30" cy="73" r="4" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
            <span className={styles.mergeTarget}>Mission Hybrid</span>
          </div>

          {/* Center text */}
          <div className={styles.mergeCenter}>
            <div className={styles.mergeCenterLine} />
            <span className={styles.mergeCenterText}>Agentic delivery collapses silos</span>
            <div className={styles.mergeCenterLine} />
          </div>

          {/* Right convergence: Enablement Hybrid */}
          <div className={styles.mergeColumn}>
            <div className={styles.mergeRoleList}>
              {enablementRoles.map((role) => (
                <span key={role.id} className={`${styles.mergeRoleTag} ${styles.mergeEnablement}`}>
                  {role.name}
                  {role.mergesInto === 'both' && <span className={styles.mergeShared}>*</span>}
                </span>
              ))}
            </div>
            <div className={styles.mergeArrows}>
              <svg viewBox="0 0 60 80" className={styles.mergeArrowSvg}>
                <path d="M10,0 C10,40 30,40 30,70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
                <path d="M25,0 C25,35 30,45 30,70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
                <path d="M40,0 C40,35 30,50 30,70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
                <path d="M55,0 C55,30 30,50 30,70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
                <circle cx="30" cy="73" r="4" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
            <span className={styles.mergeTarget}>Enablement Hybrid</span>
          </div>
        </div>
        <p className={styles.mergeFootnote}>* Developer spans both species — the role splits based on whether the individual gravitates toward intent or infrastructure.</p>
      </div>

      {/* Phase 3: The Evolved Species (existing cards) */}
      <div className={styles.speciesGrid}>
        {SPECIES_PROFILES.map((species) => {
          const isMission = species.id === 'mission';
          const framing = speciesFraming[species.id];
          return (
            <div
              key={species.id}
              className={styles.organismCard}
              data-species={species.id}
            >
              {/* Organic cell-like background */}
              <div className={styles.cellBackground}>
                <div className={styles.cellMembrane} />
                <div className={styles.cellNucleus} />
                {species.requiredGenes.slice(0, 4).map((geneId, i) => {
                  const gene = GENES.find((g) => g.id === geneId);
                  return gene ? (
                    <div
                      key={geneId}
                      className={styles.cellOrganelle}
                      style={{
                        '--organelle-color': getDomainColor(gene.domain),
                        '--organelle-index': i,
                      } as React.CSSProperties}
                    />
                  ) : null;
                })}
              </div>

              <div className={styles.organismContent}>
                <div className={styles.organismHeader}>
                  <h3>{species.name}</h3>
                  <span className={styles.organismSubtitle}>{species.subtitle}</span>
                </div>

                <div className={styles.organismMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Permission Role</span>
                    <span style={{ fontStyle: 'italic' }}>{framing?.permissionRole}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Customer</span>
                    <span>{species.customer}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Work Product</span>
                    <span>{species.workProduct}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Core Stance</span>
                    <span className={styles.coreStance}>{species.coreStance}</span>
                  </div>
                </div>

                <div className={styles.dnaStrands}>
                  <h4>Required Genes</h4>
                  <div className={styles.geneList}>
                    {species.requiredGenes.map((geneId) => {
                      const gene = GENES.find((g) => g.id === geneId);
                      const isSpine = SPINE_GENE_IDS.includes(geneId);
                      return gene ? (
                        <span
                          key={geneId}
                          className={styles.geneTag}
                          style={{ '--tag-color': getDomainColor(gene.domain) } as React.CSSProperties}
                        >
                          {gene.name}{isSpine ? ' (Spine)' : ''}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className={styles.fitnessBox}>
                  <span className={styles.fitnessLabel}>Fitness Function</span>
                  <p>{species.fitnessFunction}</p>
                </div>

                <div className={styles.failureMode}>
                  <span className={styles.failureLabel}>Failure Mode</span>
                  <p>{species.failureMode}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FossilRecords(): ReactNode {
  return (
    <section className={styles.fossilSection}>
      <div className={styles.fossilBackground}>
        <div className={styles.sedimentLayer} data-layer="1" />
        <div className={styles.sedimentLayer} data-layer="2" />
        <div className={styles.sedimentLayer} data-layer="3" />
      </div>
      <div className={styles.sectionHeader}>
        <h2>Fossil Records</h2>
        <p>Behaviors that thrived in the old world but face extinction in the new</p>
      </div>
      <div className={styles.fossilGrid}>
        {EXTINCTION_EVENTS.map((event) => (
          <div key={event.id} className={styles.fossilCard}>
            <div className={styles.fossilFrame}>
              <div className={styles.fossilDate}>Pre-AI Era</div>
              <h3>{event.name}</h3>
              <p className={styles.fossilDescription}>{event.description}</p>
              <div className={styles.fossilDeath}>
                <span className={styles.deathLabel}>Why It Dies</span>
                <p>{event.whyItDies}</p>
              </div>
              <div className={styles.fossilSigns}>
                <span className={styles.signsLabel}>Warning Signs</span>
                <ul>
                  {event.signs.map((sign, i) => (
                    <li key={i}>{sign}</li>
                  ))}
                </ul>
              </div>
              <div
                className={styles.domainStamp}
                style={{ color: getDomainColor(event.domain) }}
              >
                {DOMAINS[event.domain].name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EpilogueSection(): ReactNode {
  return (
    <section className={styles.epilogueSection}>
      <h2>The Winning Play</h2>
      <ThreePillars variant="stacked" showActions={true} linkToStrategy={true} />
    </section>
  );
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function GenomeExplorerB(): ReactNode {
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null);

  return (
    <Layout
      title="Engineering Genome - Honeycomb"
      description="Explore the AI-Era Engineering Genome with a honeycomb layout"
    >
      <main className={styles.genomePage}>
        <HeroSection />
        
        {/* Genome Overview - Simple descriptions of each gene */}
        <GenomeOverview onGeneSelect={setSelectedGene} />
        
        {/* Permission Ecosystem - GovPersonas */}
        <section className={styles.ecosystemSection} data-theme="dark">
          <h2>The Permission Ecosystem</h2>
          <GovPersonas variant="flow" side="both" />
        </section>
        
        {/* Delivery Spectrum - bridges ecosystem to circuit */}
        <DeliverySpectrum />
        
        {/* Circuit Flow Visualization - the electrical model */}
        <section className={styles.circuitSection}>
          <CircuitFlowVisualization 
            interactive={true}
            initialAiFactor={0.5}
            onGeneRightClick={(circuitGeneId) => {
              const genomeGeneId = mapCircuitGeneIdToGenome(circuitGeneId);
              const gene = GENES.find(g => g.id === genomeGeneId);
              if (gene) setSelectedGene(gene);
            }}
          />
        </section>
        
        <SpeciesSection />
        <FossilRecords />
        <EpilogueSection />
        
        {selectedGene && (
          <GeneModal gene={selectedGene} onClose={() => setSelectedGene(null)} />
        )}
      </main>
    </Layout>
  );
}
