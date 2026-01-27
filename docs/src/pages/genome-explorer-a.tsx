/**
 * Genome Explorer - Version A: Classic Grid Layout
 *
 * A traditional, professional layout for exploring the AI-Era Engineering Genome.
 * Features a 3x4 gene grid with slide-in detail panel, species profile cards,
 * and extinction warnings.
 */

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  type Gene,
  type Domain,
  type Species,
  type SpeciesProfile,
  type ExtinctionEvent,
  GENES,
  DOMAINS,
  SPECIES_PROFILES,
  EXTINCTION_EVENTS,
  EVOLUTION_PHASES,
  getGenesByDomain,
  getGeneWeightForSpecies,
} from '../components/GenomeExplorer/genomeData';
import { PermissionEconomy } from '../components/GenomeExplorer/PermissionEconomy';
import CircuitVisualization from '../components/GenomeExplorer/CircuitVisualization';
import { ThreePillars } from '../components/GenomeExplorer/ThreePillars';
import { GovPersonas } from '../components/GenomeExplorer/GovPersonas';
import styles from './genome-explorer-a.module.css';

// ============================================
// TYPES
// ============================================

type DomainFilter = Domain | 'all';
type ExplorerTab = 'genes' | 'ecosystem';

// ============================================
// GENE CARD COMPONENT
// ============================================

interface GeneCardProps {
  gene: Gene;
  isSelected: boolean;
  onSelect: (gene: Gene) => void;
  highlightSpecies: Species | null;
}

function GeneCard({ gene, isSelected, onSelect, highlightSpecies }: GeneCardProps): ReactNode {
  const domainColor = DOMAINS[gene.domain].color;
  const missionWeight = gene.missionWeight;
  const enablementWeight = gene.enablementWeight;

  const renderWeightDots = (weight: number, species: Species) => {
    const isHighlighted = highlightSpecies === species;
    return (
      <div className={`${styles.weightDots} ${isHighlighted ? styles.highlighted : ''}`}>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`${styles.weightDot} ${i <= weight ? styles.active : ''}`}
            style={{ backgroundColor: i <= weight ? (species === 'mission' ? '#3B82F6' : '#10B981') : undefined }}
          />
        ))}
      </div>
    );
  };

  return (
    <button
      className={`${styles.geneCard} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(gene)}
      style={{ '--domain-color': domainColor } as React.CSSProperties}
    >
      <div className={styles.geneCardHeader}>
        <span className={styles.domainIndicator} style={{ backgroundColor: domainColor }} />
        <span className={styles.geneName}>{gene.name}</span>
      </div>
      <p className={styles.geneDefinition}>{gene.definition}</p>
      <div className={styles.geneWeights}>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>Mission</span>
          {renderWeightDots(missionWeight, 'mission')}
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>Enablement</span>
          {renderWeightDots(enablementWeight, 'enablement')}
        </div>
      </div>
    </button>
  );
}

// ============================================
// GENE DETAIL PANEL COMPONENT
// ============================================

interface GeneDetailPanelProps {
  gene: Gene | null;
  isOpen: boolean;
  onClose: () => void;
}

function GeneDetailPanel({ gene, isOpen, onClose }: GeneDetailPanelProps): ReactNode {
  if (!gene) return null;

  const domainColor = DOMAINS[gene.domain].color;
  const domainName = DOMAINS[gene.domain].name;

  return (
    <>
      <div
        className={`${styles.detailOverlay} ${isOpen ? styles.visible : ''}`}
        onClick={onClose}
      />
      <aside className={`${styles.detailPanel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.detailHeader}>
          <div className={styles.detailTitleRow}>
            <span
              className={styles.detailDomainBadge}
              style={{ backgroundColor: domainColor }}
            >
              {domainName}
            </span>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close panel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 className={styles.detailTitle}>{gene.name}</h2>
          <p className={styles.detailDefinition}>{gene.definition}</p>
        </div>

        <div className={styles.detailContent}>
          <div className={styles.thenNowComparison}>
            <div className={styles.comparisonItem}>
              <h4 className={styles.comparisonLabel}>
                <span className={styles.comparisonIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 8 14" />
                  </svg>
                </span>
                Then (Pre-AI Era)
              </h4>
              <p className={styles.comparisonText}>{gene.thenExpression}</p>
            </div>
            <div className={styles.comparisonItem}>
              <h4 className={styles.comparisonLabel}>
                <span className={styles.comparisonIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                Now (AI Era)
              </h4>
              <p className={styles.comparisonText}>{gene.nowExpression}</p>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h4 className={styles.detailSectionTitle}>Examples</h4>
            <ul className={styles.examplesList}>
              {gene.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>

          <div className={styles.keyQuestion}>
            <span className={styles.keyQuestionIcon}>?</span>
            <div>
              <h4 className={styles.keyQuestionLabel}>Key Question</h4>
              <p className={styles.keyQuestionText}>{gene.keyQuestion}</p>
            </div>
          </div>

          <div className={styles.speciesWeightsDetail}>
            <h4 className={styles.detailSectionTitle}>Species Weights</h4>
            <div className={styles.speciesWeightBars}>
              <div className={styles.speciesWeightBar}>
                <span className={styles.speciesWeightLabel}>Mission Hybrid</span>
                <div className={styles.weightBarTrack}>
                  <div
                    className={styles.weightBarFill}
                    style={{
                      width: `${(gene.missionWeight / 3) * 100}%`,
                      backgroundColor: '#3B82F6',
                    }}
                  />
                </div>
                <span className={styles.speciesWeightValue}>{gene.missionWeight}/3</span>
              </div>
              <div className={styles.speciesWeightBar}>
                <span className={styles.speciesWeightLabel}>Enablement Hybrid</span>
                <div className={styles.weightBarTrack}>
                  <div
                    className={styles.weightBarFill}
                    style={{
                      width: `${(gene.enablementWeight / 3) * 100}%`,
                      backgroundColor: '#10B981',
                    }}
                  />
                </div>
                <span className={styles.speciesWeightValue}>{gene.enablementWeight}/3</span>
              </div>
            </div>
          </div>

          <Link
            to={`/esimplicity-strategy#${gene.strategySection.id}`}
            className={styles.strategyLink}
          >
            <span>Related Strategy Section</span>
            <span className={styles.strategyLinkSection}>
              {gene.strategySection.number}. {gene.strategySection.title}
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </aside>
    </>
  );
}

// ============================================
// SPECIES CARD COMPONENT
// ============================================

interface SpeciesCardProps {
  species: SpeciesProfile;
  onGeneClick: (geneId: string) => void;
}

function SpeciesCard({ species, onGeneClick }: SpeciesCardProps): ReactNode {
  const isMission = species.id === 'mission';
  const accentColor = isMission ? '#3B82F6' : '#10B981';

  // Create gene weight visualization data
  const geneWeights = GENES.map((gene) => ({
    id: gene.id,
    name: gene.name,
    weight: getGeneWeightForSpecies(gene.id, species.id),
    domain: gene.domain,
  }));

  return (
    <div className={styles.speciesCard} style={{ '--species-color': accentColor } as React.CSSProperties}>
      <div className={styles.speciesHeader}>
        <div className={styles.speciesIcon} style={{ backgroundColor: accentColor }}>
          {isMission ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          )}
        </div>
        <div>
          <h3 className={styles.speciesName}>{species.name}</h3>
          <span className={styles.speciesSubtitle}>{species.subtitle}</span>
        </div>
      </div>

      <div className={styles.speciesInfo}>
        <div className={styles.speciesInfoItem}>
          <span className={styles.speciesInfoLabel}>Customer</span>
          <span className={styles.speciesInfoValue}>{species.customer}</span>
        </div>
        <div className={styles.speciesInfoItem}>
          <span className={styles.speciesInfoLabel}>Work Product</span>
          <span className={styles.speciesInfoValue}>{species.workProduct}</span>
        </div>
      </div>

      <div className={styles.speciesStance}>
        <span className={styles.speciesStanceLabel}>Core Stance</span>
        <p className={styles.speciesStanceText}>"{species.coreStance}"</p>
      </div>

      <div className={styles.geneHeatmap}>
        <h4 className={styles.heatmapTitle}>Gene Weights</h4>
        <div className={styles.heatmapGrid}>
          {geneWeights.map((gene) => (
            <button
              key={gene.id}
              className={styles.heatmapCell}
              onClick={() => onGeneClick(gene.id)}
              title={`${gene.name}: ${gene.weight}/3`}
              style={{
                backgroundColor: `color-mix(in srgb, ${DOMAINS[gene.domain].color} ${gene.weight * 33}%, transparent)`,
                borderColor: DOMAINS[gene.domain].color,
              }}
            >
              <span className={styles.heatmapCellName}>{gene.name.slice(0, 3)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.requiredGenes}>
        <h4 className={styles.requiredGenesTitle}>Required Genes</h4>
        <div className={styles.requiredGenesList}>
          {species.requiredGenes.map((geneId) => {
            const gene = GENES.find((g) => g.id === geneId);
            if (!gene) return null;
            return (
              <button
                key={geneId}
                className={styles.requiredGeneTag}
                onClick={() => onGeneClick(geneId)}
                style={{ borderColor: DOMAINS[gene.domain].color }}
              >
                {gene.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.failureMode}>
        <span className={styles.failureModeIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </span>
        <div>
          <h4 className={styles.failureModeLabel}>Failure Mode</h4>
          <p className={styles.failureModeText}>{species.failureMode}</p>
        </div>
      </div>

      <div className={styles.fitnessFunction}>
        <span className={styles.fitnessFunctionLabel}>Fitness Function</span>
        <p className={styles.fitnessFunctionText}>{species.fitnessFunction}</p>
      </div>
    </div>
  );
}

// ============================================
// EXTINCTION CARD COMPONENT
// ============================================

interface ExtinctionCardProps {
  event: ExtinctionEvent;
}

function ExtinctionCard({ event }: ExtinctionCardProps): ReactNode {
  const domainColor = DOMAINS[event.domain].color;

  return (
    <div className={styles.extinctionCard}>
      <div className={styles.extinctionHeader}>
        <span className={styles.extinctionIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </span>
        <div>
          <h4 className={styles.extinctionName}>{event.name}</h4>
          <span
            className={styles.extinctionDomainBadge}
            style={{ color: domainColor, borderColor: domainColor }}
          >
            {DOMAINS[event.domain].name}
          </span>
        </div>
      </div>
      <p className={styles.extinctionDescription}>{event.description}</p>
      <div className={styles.extinctionReason}>
        <strong>Why it dies:</strong> {event.whyItDies}
      </div>
      <div className={styles.extinctionSigns}>
        <strong>Warning signs:</strong>
        <ul>
          {event.signs.map((sign, index) => (
            <li key={index}>{sign}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ============================================
// EVOLUTION TIMELINE COMPONENT
// ============================================

function EvolutionTimeline(): ReactNode {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  return (
    <div className={styles.evolutionTimeline}>
      {EVOLUTION_PHASES.map((phase, index) => (
        <div
          key={phase.id}
          className={`${styles.evolutionPhase} ${expandedPhase === phase.id ? styles.expanded : ''}`}
        >
          <button
            className={styles.evolutionPhaseHeader}
            onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
          >
            <span className={styles.phaseNumber}>{index + 1}</span>
            <div className={styles.phaseTitles}>
              <h4 className={styles.phaseTitle}>{phase.title}</h4>
              <span className={styles.phaseSubtitle}>{phase.subtitle}</span>
            </div>
            <span className={styles.phaseExpandIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>
          <div className={styles.evolutionPhaseContent}>
            <ul className={styles.phaseContentList}>
              {phase.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            {phase.keyInsight && (
              <div className={styles.phaseKeyInsight}>
                <strong>Key Insight:</strong> {phase.keyInsight}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroOrb3} />
        <div className={styles.dnaHelix} />
      </div>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>Engineering Evolution</span>
        <h1 className={styles.heroTitle}>
          The AI-Era
          <br />
          Engineering Genome
        </h1>
        <p className={styles.heroSubtitle}>
          Understanding the capabilities that matter in the permission economy
        </p>
        <p className={styles.heroIntro}>
          Government doesn't reward speed. It rewards assurance. When AI makes code generation
          abundant, the scarce resource becomes auditable confidence. This explorer maps the 12
          capability "genes" that convert AI capacity into permission to deploy.
        </p>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Explore the genome</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ============================================
// DOMAIN FILTER TABS
// ============================================

interface DomainTabsProps {
  activeFilter: DomainFilter;
  onFilterChange: (filter: DomainFilter) => void;
}

function DomainTabs({ activeFilter, onFilterChange }: DomainTabsProps): ReactNode {
  return (
    <div className={styles.domainTabs}>
      <button
        className={`${styles.domainTab} ${activeFilter === 'all' ? styles.active : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All Domains
      </button>
      {(Object.keys(DOMAINS) as Domain[]).map((domain) => (
        <button
          key={domain}
          className={`${styles.domainTab} ${activeFilter === domain ? styles.active : ''}`}
          onClick={() => onFilterChange(domain)}
          style={{ '--tab-color': DOMAINS[domain].color } as React.CSSProperties}
        >
          <span
            className={styles.domainTabIndicator}
            style={{ backgroundColor: DOMAINS[domain].color }}
          />
          {DOMAINS[domain].name}
        </button>
      ))}
    </div>
  );
}

// ============================================
// SPECIES TOGGLE
// ============================================

interface SpeciesToggleProps {
  highlightSpecies: Species | null;
  onToggle: (species: Species | null) => void;
}

function SpeciesToggle({ highlightSpecies, onToggle }: SpeciesToggleProps): ReactNode {
  return (
    <div className={styles.speciesToggle}>
      <span className={styles.speciesToggleLabel}>Highlight weights for:</span>
      <div className={styles.speciesToggleButtons}>
        <button
          className={`${styles.speciesToggleBtn} ${highlightSpecies === null ? styles.active : ''}`}
          onClick={() => onToggle(null)}
        >
          None
        </button>
        <button
          className={`${styles.speciesToggleBtn} ${styles.mission} ${highlightSpecies === 'mission' ? styles.active : ''}`}
          onClick={() => onToggle(highlightSpecies === 'mission' ? null : 'mission')}
        >
          Mission Hybrid
        </button>
        <button
          className={`${styles.speciesToggleBtn} ${styles.enablement} ${highlightSpecies === 'enablement' ? styles.active : ''}`}
          onClick={() => onToggle(highlightSpecies === 'enablement' ? null : 'enablement')}
        >
          Enablement Hybrid
        </button>
      </div>
    </div>
  );
}

// ============================================
// CTA SECTION
// ============================================

function CTASection(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to evolve your engineering practice?</h2>
        <p className={styles.ctaDescription}>
          See how Flow Optimized Engineering addresses these evolutionary pressures and builds
          organizations fit for the AI era.
        </p>
        <div className={styles.ctaButtons}>
          <Link to="/esimplicity-strategy" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
            Explore FOE Strategy
          </Link>
          <Link to="/docs/intro/what-is-foe" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            Read the Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function GenomeExplorerA(): ReactNode {
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null);
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const [highlightSpecies, setHighlightSpecies] = useState<Species | null>(null);
  const [showEvolution, setShowEvolution] = useState(false);
  const [activeTab, setActiveTab] = useState<ExplorerTab>('genes');

  // Filter genes by domain
  const filteredGenes = domainFilter === 'all' ? GENES : getGenesByDomain(domainFilter);

  // Handle gene selection from species cards
  const handleGeneClick = useCallback((geneId: string) => {
    const gene = GENES.find((g) => g.id === geneId);
    if (gene) {
      setSelectedGene(gene);
    }
  }, []);

  // Close panel on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGene(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <Layout
      title="AI-Era Engineering Genome Explorer"
      description="Explore the 12 capability genes that determine engineering fitness in the AI era"
    >
      <main className={styles.genomePage}>
        <HeroSection />

        {/* Permission Economy Section */}
        <section className={styles.permissionEconomySection}>
          <PermissionEconomy variant="full" showSpineSkin={true} />
        </section>

        {/* Evolution Narrative Section */}
        <section className={styles.evolutionSection}>
          <div className={styles.sectionContainer}>
            <button
              className={styles.evolutionToggle}
              onClick={() => setShowEvolution(!showEvolution)}
            >
              <div className={styles.evolutionToggleContent}>
                <h2 className={styles.evolutionToggleTitle}>The Evolutionary Narrative</h2>
                <p className={styles.evolutionToggleSubtitle}>
                  How AI reshaped the engineering landscape
                </p>
              </div>
              <span className={`${styles.evolutionToggleIcon} ${showEvolution ? styles.expanded : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            {showEvolution && <EvolutionTimeline />}
          </div>
        </section>

        {/* Circuit Visualization Section */}
        <section className={styles.circuitSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>The Capacity → Permission Converter</h2>
            <p className={styles.sectionSubtitle}>
              See how the genome converts AI capacity into auditable delivery
            </p>
            <CircuitVisualization
              variant="full"
              interactive={true}
              onGeneClick={(geneId) => {
                const gene = GENES.find((g) => g.id === geneId);
                if (gene) setSelectedGene(gene);
              }}
            />
          </div>
        </section>

        {/* Gene Explorer Section */}
        <section className={styles.explorerSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.explorerHeader}>
              <div>
                <h2 className={styles.sectionTitle}>The 12 Capability Genes</h2>
                <p className={styles.sectionSubtitle}>
                  Click any gene to explore its evolution from pre-AI to AI era
                </p>
              </div>
            </div>

            <div className={styles.explorerTabs}>
              <button
                className={`${styles.tabButton} ${activeTab === 'genes' ? styles.active : ''}`}
                onClick={() => setActiveTab('genes')}
              >
                Genes
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'ecosystem' ? styles.active : ''}`}
                onClick={() => setActiveTab('ecosystem')}
              >
                Ecosystem
              </button>
            </div>

            {activeTab === 'genes' ? (
              <>
                <div className={styles.explorerControls}>
                  <DomainTabs activeFilter={domainFilter} onFilterChange={setDomainFilter} />
                  <SpeciesToggle highlightSpecies={highlightSpecies} onToggle={setHighlightSpecies} />
                </div>

                <div className={styles.explorerContent}>
                  <div className={styles.geneGrid}>
                    {filteredGenes.map((gene) => (
                      <GeneCard
                        key={gene.id}
                        gene={gene}
                        isSelected={selectedGene?.id === gene.id}
                        onSelect={setSelectedGene}
                        highlightSpecies={highlightSpecies}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.domainLegend}>
                  <span className={styles.legendLabel}>Domains:</span>
                  {(Object.keys(DOMAINS) as Domain[]).map((domain) => (
                    <span key={domain} className={styles.legendItem}>
                      <span
                        className={styles.legendDot}
                        style={{ backgroundColor: DOMAINS[domain].color }}
                      />
                      {DOMAINS[domain].name}: {DOMAINS[domain].description}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.ecosystemContent}>
                <GovPersonas variant="ecosystem" side="both" />
              </div>
            )}
          </div>
        </section>

        {/* Species Profiles Section */}
        <section className={styles.speciesSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>The Two Species</h2>
            <p className={styles.sectionSubtitle}>
              Engineering roles are diverging into two distinct species, each with different
              gene expressions and fitness functions
            </p>
            <div className={styles.speciesGrid}>
              {SPECIES_PROFILES.map((species) => (
                <SpeciesCard key={species.id} species={species} onGeneClick={handleGeneClick} />
              ))}
            </div>
          </div>
        </section>

        {/* Extinction Events Section */}
        <section className={styles.extinctionSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.extinctionHeader}>
              <span className={styles.extinctionWarningIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
              <div>
                <h2 className={styles.sectionTitle}>Extinction Events</h2>
                <p className={styles.sectionSubtitle}>
                  Traits being selected out of the engineering gene pool
                </p>
              </div>
            </div>
            <div className={styles.extinctionGrid}>
              {EXTINCTION_EVENTS.map((event) => (
                <ExtinctionCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Three Pillars */}
        <section className={styles.ctaSection}>
          <ThreePillars
            variant="cards"
            showActions={true}
            showGenes={true}
            linkToStrategy={true}
          />
        </section>

        {/* Gene Detail Panel */}
        <GeneDetailPanel
          gene={selectedGene}
          isOpen={selectedGene !== null}
          onClose={() => setSelectedGene(null)}
        />
      </main>
    </Layout>
  );
}
