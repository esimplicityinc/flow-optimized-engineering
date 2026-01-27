/**
 * Genome Explorer - Version C: Interactive Dashboard
 * 
 * A data-rich, analytical dashboard with multiple panels,
 * radar charts, weight matrix heatmap, and filter controls.
 */

import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import styles from './genome-explorer-c.module.css';
import {
  GENES,
  DOMAINS,
  SPECIES_PROFILES,
  EXTINCTION_EVENTS,
  SCARCITY_SHIFTS,
  getGenesByDomain,
  getGeneById,
  getTopGenesForSpecies,
  calculatePermission,
  type Gene,
  type Domain,
  type Species,
  type Weight,
  type ScarcityShift,
} from '../components/GenomeExplorer/genomeData';
import { PermissionEconomy } from '../components/GenomeExplorer/PermissionEconomy';
import CircuitVisualization from '../components/GenomeExplorer/CircuitVisualization';
import { ThreePillars } from '../components/GenomeExplorer/ThreePillars';
import { GovPersonas } from '../components/GenomeExplorer/GovPersonas';

// ============================================
// STAT CARD COMPONENT
// ============================================

interface StatCardProps {
  icon: string;
  value: number | string;
  label: string;
  color?: string;
}

function StatCard({ icon, value, label, color }: StatCardProps) {
  return (
    <div className={styles.statCard} style={{ '--stat-color': color } as React.CSSProperties}>
      <span className={styles.statIcon}>{icon}</span>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

// ============================================
// DOMAIN PANEL COMPONENT
// ============================================

interface DomainPanelProps {
  domain: Domain;
  genes: Gene[];
  selectedGeneId: string | null;
  onSelectGene: (geneId: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

function DomainPanel({ domain, genes, selectedGeneId, onSelectGene, isExpanded, onToggle }: DomainPanelProps) {
  const domainInfo = DOMAINS[domain];
  
  return (
    <div className={styles.domainPanel} style={{ '--domain-color': domainInfo.color } as React.CSSProperties}>
      <button className={styles.domainHeader} onClick={onToggle}>
        <div className={styles.domainTitleRow}>
          <span className={styles.domainIndicator} />
          <span className={styles.domainName}>{domainInfo.name}</span>
          <span className={styles.domainCount}>{genes.length}</span>
        </div>
        <span className={`${styles.domainChevron} ${isExpanded ? styles.expanded : ''}`}>
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      
      {isExpanded && (
        <div className={styles.domainContent}>
          <p className={styles.domainDescription}>{domainInfo.description}</p>
          <div className={styles.geneChips}>
            {genes.map((gene) => (
              <button
                key={gene.id}
                className={`${styles.geneChip} ${selectedGeneId === gene.id ? styles.selected : ''}`}
                onClick={() => onSelectGene(gene.id)}
              >
                {gene.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// GENE DETAIL CARD COMPONENT
// ============================================

interface GeneDetailCardProps {
  gene: Gene;
}

function GeneDetailCard({ gene }: GeneDetailCardProps) {
  const domainInfo = DOMAINS[gene.domain];
  
  return (
    <div className={styles.geneDetailCard}>
      <div className={styles.geneDetailHeader}>
        <div className={styles.geneDetailTitleRow}>
          <span className={styles.geneDomainBadge} style={{ background: domainInfo.color }}>
            {domainInfo.name}
          </span>
          <h3 className={styles.geneDetailTitle}>{gene.name}</h3>
        </div>
        <span className={styles.geneStrategyLink}>
          #{gene.strategySection.number} {gene.strategySection.title}
        </span>
      </div>
      
      <p className={styles.geneDefinition}>{gene.definition}</p>
      
      <div className={styles.thenNowComparison}>
        <div className={styles.comparisonColumn}>
          <span className={styles.comparisonLabel}>Then</span>
          <p className={styles.comparisonText}>{gene.thenExpression}</p>
        </div>
        <div className={styles.comparisonArrow}>→</div>
        <div className={styles.comparisonColumn}>
          <span className={styles.comparisonLabel}>Now</span>
          <p className={styles.comparisonText}>{gene.nowExpression}</p>
        </div>
      </div>
      
      <div className={styles.weightBars}>
        <div className={styles.weightBarRow}>
          <span className={styles.weightBarLabel}>Mission</span>
          <div className={styles.weightBarTrack}>
            <div 
              className={styles.weightBarFill} 
              style={{ 
                width: `${(gene.missionWeight / 3) * 100}%`,
                background: '#3B82F6'
              }} 
            />
          </div>
          <span className={styles.weightValue}>{gene.missionWeight}</span>
        </div>
        <div className={styles.weightBarRow}>
          <span className={styles.weightBarLabel}>Enablement</span>
          <div className={styles.weightBarTrack}>
            <div 
              className={styles.weightBarFill} 
              style={{ 
                width: `${(gene.enablementWeight / 3) * 100}%`,
                background: '#10B981'
              }} 
            />
          </div>
          <span className={styles.weightValue}>{gene.enablementWeight}</span>
        </div>
      </div>
      
      <div className={styles.geneExamples}>
        <span className={styles.examplesLabel}>Examples</span>
        <ul className={styles.examplesList}>
          {gene.examples.map((example, idx) => (
            <li key={idx}>{example}</li>
          ))}
        </ul>
      </div>
      
      <div className={styles.keyQuestion}>
        <span className={styles.keyQuestionLabel}>Key Question</span>
        <p className={styles.keyQuestionText}>"{gene.keyQuestion}"</p>
      </div>
    </div>
  );
}

// ============================================
// RADAR CHART COMPONENT (Pure CSS)
// ============================================

interface RadarChartProps {
  species: Species;
  genes: Gene[];
}

function RadarChart({ species, genes }: RadarChartProps) {
  const topGenes = getTopGenesForSpecies(species, 6);
  const speciesProfile = SPECIES_PROFILES.find(s => s.id === species);
  
  // Calculate points for hexagonal radar
  const centerX = 100;
  const centerY = 100;
  const maxRadius = 80;
  
  const points = topGenes.map((gene, idx) => {
    const weight = species === 'mission' ? gene.missionWeight : gene.enablementWeight;
    const angle = (idx * 60 - 90) * (Math.PI / 180); // Start from top
    const radius = (weight / 3) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      labelX: centerX + (maxRadius + 25) * Math.cos(angle),
      labelY: centerY + (maxRadius + 25) * Math.sin(angle),
      gene,
      weight,
    };
  });
  
  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  
  // Axis lines
  const axisLines = Array.from({ length: 6 }, (_, idx) => {
    const angle = (idx * 60 - 90) * (Math.PI / 180);
    return {
      x2: centerX + maxRadius * Math.cos(angle),
      y2: centerY + maxRadius * Math.sin(angle),
    };
  });
  
  // Grid circles
  const gridLevels = [1, 2, 3];
  
  return (
    <div className={styles.radarContainer}>
      <div className={styles.radarHeader}>
        <h4 className={styles.radarTitle}>{speciesProfile?.name}</h4>
        <span className={styles.radarSubtitle}>{speciesProfile?.subtitle}</span>
      </div>
      <svg viewBox="0 0 200 200" className={styles.radarSvg}>
        {/* Grid */}
        {gridLevels.map(level => (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={(level / 3) * maxRadius}
            className={styles.radarGrid}
          />
        ))}
        
        {/* Axis lines */}
        {axisLines.map((line, idx) => (
          <line
            key={idx}
            x1={centerX}
            y1={centerY}
            x2={line.x2}
            y2={line.y2}
            className={styles.radarAxis}
          />
        ))}
        
        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          className={`${styles.radarPolygon} ${species === 'mission' ? styles.missionPolygon : styles.enablementPolygon}`}
        />
        
        {/* Data points */}
        {points.map((point, idx) => (
          <circle
            key={idx}
            cx={point.x}
            cy={point.y}
            r="4"
            className={`${styles.radarPoint} ${species === 'mission' ? styles.missionPoint : styles.enablementPoint}`}
          />
        ))}
      </svg>
      
      {/* Labels */}
      <div className={styles.radarLabels}>
        {points.map((point, idx) => (
          <span
            key={idx}
            className={styles.radarLabel}
            style={{
              '--label-x': `${point.labelX}%`,
              '--label-y': `${point.labelY}%`,
            } as React.CSSProperties}
            data-position={idx}
          >
            {point.gene.name.slice(0, 8)}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================
// WEIGHT MATRIX (HEATMAP) COMPONENT
// ============================================

interface WeightMatrixProps {
  genes: Gene[];
  selectedGeneId: string | null;
  onSelectGene: (geneId: string) => void;
  filterDomain: Domain | 'all';
}

function WeightMatrix({ genes, selectedGeneId, onSelectGene, filterDomain }: WeightMatrixProps) {
  const filteredGenes = filterDomain === 'all' 
    ? genes 
    : genes.filter(g => g.domain === filterDomain);
  
  const getWeightColor = (weight: Weight, type: 'mission' | 'enablement') => {
    const baseColor = type === 'mission' ? [59, 130, 246] : [16, 185, 129]; // Blue / Green
    const opacity = weight === 1 ? 0.25 : weight === 2 ? 0.55 : 0.9;
    return `rgba(${baseColor.join(',')}, ${opacity})`;
  };
  
  return (
    <div className={styles.matrixContainer}>
      <div className={styles.matrixHeader}>
        <h4 className={styles.matrixTitle}>Gene Weight Matrix</h4>
        <div className={styles.matrixLegend}>
          <span className={styles.legendItem}>
            <span className={styles.legendBox} style={{ opacity: 0.25 }} /> 1 (Low)
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendBox} style={{ opacity: 0.55 }} /> 2 (Med)
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendBox} style={{ opacity: 0.9 }} /> 3 (High)
          </span>
        </div>
      </div>
      
      <div className={styles.matrixTable}>
        <div className={styles.matrixHeaderRow}>
          <div className={styles.matrixCorner}>Gene</div>
          <div className={styles.matrixColHeader}>Mission</div>
          <div className={styles.matrixColHeader}>Enablement</div>
          <div className={styles.matrixColHeader}>Domain</div>
        </div>
        
        {filteredGenes.map((gene) => (
          <button
            key={gene.id}
            className={`${styles.matrixRow} ${selectedGeneId === gene.id ? styles.selected : ''}`}
            onClick={() => onSelectGene(gene.id)}
          >
            <div className={styles.matrixGeneName}>{gene.name}</div>
            <div 
              className={styles.matrixCell}
              style={{ background: getWeightColor(gene.missionWeight, 'mission') }}
            >
              {gene.missionWeight}
            </div>
            <div 
              className={styles.matrixCell}
              style={{ background: getWeightColor(gene.enablementWeight, 'enablement') }}
            >
              {gene.enablementWeight}
            </div>
            <div className={styles.matrixDomainCell}>
              <span 
                className={styles.matrixDomainDot}
                style={{ background: DOMAINS[gene.domain].color }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// EXTINCTION ALERTS COMPONENT
// ============================================

interface ExtinctionAlertsProps {
  expandedId: string | null;
  onToggle: (id: string) => void;
}

// ============================================
// SCARCITY HEATMAP COMPONENT
// ============================================

interface ScarcityHeatmapProps {
  shifts: ScarcityShift[];
}

function ScarcityHeatmap({ shifts }: ScarcityHeatmapProps) {
  return (
    <table className={styles.scarcityTable}>
      <thead>
        <tr>
          <th>Capability</th>
          <th>Pre-AI</th>
          <th>Post-AI</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift) => (
          <tr key={shift.category}>
            <td>{shift.category}</td>
            <td className={styles[shift.preAI]}>{shift.preAI}</td>
            <td className={styles[shift.postAI]}>{shift.postAI}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================
// EXTINCTION ALERTS COMPONENT
// ============================================

function ExtinctionAlerts({ expandedId, onToggle }: ExtinctionAlertsProps) {
  return (
    <div className={styles.extinctionContainer}>
      <div className={styles.extinctionHeader}>
        <span className={styles.extinctionIcon}>⚠</span>
        <h4 className={styles.extinctionTitle}>Extinction Events</h4>
        <span className={styles.extinctionSubtitle}>Anti-patterns that won't survive AI pressure</span>
      </div>
      
      <div className={styles.extinctionGrid}>
        {EXTINCTION_EVENTS.map((event) => (
          <button
            key={event.id}
            className={`${styles.extinctionCard} ${expandedId === event.id ? styles.expanded : ''}`}
            onClick={() => onToggle(event.id)}
          >
            <div className={styles.extinctionCardHeader}>
              <span 
                className={styles.extinctionDomainIndicator}
                style={{ background: DOMAINS[event.domain].color }}
              />
              <span className={styles.extinctionName}>{event.name}</span>
              <span className={styles.extinctionChevron}>
                {expandedId === event.id ? '−' : '+'}
              </span>
            </div>
            
            {expandedId === event.id && (
              <div className={styles.extinctionDetails}>
                <p className={styles.extinctionDescription}>{event.description}</p>
                <div className={styles.extinctionWhyDies}>
                  <span className={styles.whyDiesLabel}>Why It Dies:</span>
                  <p>{event.whyItDies}</p>
                </div>
                <div className={styles.extinctionSigns}>
                  <span className={styles.signsLabel}>Warning Signs:</span>
                  <ul>
                    {event.signs.map((sign, idx) => (
                      <li key={idx}>{sign}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SPECIES SCORECARD COMPONENT
// ============================================

interface SpeciesScorecardProps {
  speciesId: Species;
}

function SpeciesScorecard({ speciesId }: SpeciesScorecardProps) {
  const species = SPECIES_PROFILES.find(s => s.id === speciesId);
  if (!species) return null;
  
  const color = speciesId === 'mission' ? '#3B82F6' : '#10B981';
  
  return (
    <div className={styles.scorecard} style={{ '--species-color': color } as React.CSSProperties}>
      <div className={styles.scorecardHeader}>
        <h4 className={styles.scorecardTitle}>{species.name}</h4>
        <span className={styles.scorecardSubtitle}>{species.subtitle}</span>
      </div>
      
      <div className={styles.scorecardMetrics}>
        <div className={styles.scorecardMetric}>
          <span className={styles.metricLabel}>Customer</span>
          <span className={styles.metricValue}>{species.customer}</span>
        </div>
        <div className={styles.scorecardMetric}>
          <span className={styles.metricLabel}>Work Product</span>
          <span className={styles.metricValue}>{species.workProduct}</span>
        </div>
        <div className={styles.scorecardMetric}>
          <span className={styles.metricLabel}>Core Stance</span>
          <span className={styles.metricValue}>{species.coreStance}</span>
        </div>
      </div>
      
      <div className={styles.scorecardGenes}>
        <div className={styles.geneCategory}>
          <span className={styles.geneCategoryLabel}>Required Genes ({species.requiredGenes.length})</span>
          <div className={styles.geneCategoryChips}>
            {species.requiredGenes.map((geneId) => {
              const gene = getGeneById(geneId);
              return gene ? (
                <span key={geneId} className={styles.requiredGene}>
                  {gene.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
        <div className={styles.geneCategory}>
          <span className={styles.geneCategoryLabel}>Supporting Genes ({species.supportingGenes.length})</span>
          <div className={styles.geneCategoryChips}>
            {species.supportingGenes.map((geneId) => {
              const gene = getGeneById(geneId);
              return gene ? (
                <span key={geneId} className={styles.supportingGene}>
                  {gene.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>
      
      <div className={styles.scorecardFailure}>
        <span className={styles.failureLabel}>Failure Mode</span>
        <p className={styles.failureText}>{species.failureMode}</p>
      </div>
    </div>
  );
}

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

export default function GenomeExplorerDashboard(): JSX.Element {
  // State
  const [selectedGeneId, setSelectedGeneId] = useState<string | null>('discovery');
  const [expandedDomains, setExpandedDomains] = useState<Record<Domain, boolean>>({
    product: true,
    education: true,
    systems: true,
  });
  const [filterDomain, setFilterDomain] = useState<Domain | 'all'>('all');
  const [expandedExtinction, setExpandedExtinction] = useState<string | null>(null);
  const [activeSpeciesTab, setActiveSpeciesTab] = useState<Species>('mission');
  const [geneLevels, setGeneLevels] = useState<Record<string, number>>({});
  const [aiFactor, setAiFactor] = useState(0.5);
  
  // Computed values
  const selectedGene = useMemo(() => 
    selectedGeneId ? getGeneById(selectedGeneId) : null,
    [selectedGeneId]
  );
  
  const genesByDomain = useMemo(() => ({
    product: getGenesByDomain('product'),
    education: getGenesByDomain('education'),
    systems: getGenesByDomain('systems'),
  }), []);
  
  const permissionLevel = useMemo(() => 
    Math.round(calculatePermission(geneLevels, aiFactor) * 100), 
    [geneLevels, aiFactor]
  );
  
  // Handlers
  const toggleDomain = (domain: Domain) => {
    setExpandedDomains(prev => ({
      ...prev,
      [domain]: !prev[domain],
    }));
  };
  
  const toggleExtinction = (id: string) => {
    setExpandedExtinction(prev => prev === id ? null : id);
  };
  
  const handleGeneSelect = (geneId: string) => {
    setSelectedGeneId(geneId);
  };
  
  return (
    <Layout
      title="Engineering Genome Dashboard"
      description="Interactive dashboard for exploring the AI-Era Engineering Genome"
    >
      {/* Header Bar */}
      <header className={styles.headerBar}>
        <div className={styles.headerLeft}>
          <span className={styles.headerLogo}>🧬</span>
          <div className={styles.headerTitles}>
            <h1 className={styles.headerTitle}>Engineering Genome Dashboard</h1>
            <span className={styles.headerSubtitle}>AI-Era Capability Analysis</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filter by Domain</label>
            <select 
              className={styles.filterSelect}
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value as Domain | 'all')}
            >
              <option value="all">All Domains</option>
              <option value="product">Product</option>
              <option value="education">Education</option>
              <option value="systems">Systems</option>
            </select>
          </div>
        </div>
      </header>
      
      {/* Permission Economy Summary */}
      <section className={styles.economySummary}>
        <PermissionEconomy variant="compact" />
      </section>
      
      {/* Stats Row */}
      <section className={styles.statsRow}>
        <StatCard icon="🧬" value={GENES.length} label="Genes" color="#3B82F6" />
        <StatCard icon="📦" value={Object.keys(DOMAINS).length} label="Domains" color="#10B981" />
        <StatCard icon="🦎" value={SPECIES_PROFILES.length} label="Species" color="#8B5CF6" />
        <StatCard icon="⚠" value={EXTINCTION_EVENTS.length} label="Extinction Events" color="#F59E0B" />
        <StatCard icon="🔑" value={`${permissionLevel}%`} label="Permission Level" color="#EF4444" />
      </section>
      
      {/* Main Dashboard Grid */}
      <main className={styles.dashboardMain}>
        {/* Left Column: Domain Panels */}
        <aside className={styles.leftColumn}>
          <div className={styles.panelSection}>
            <h3 className={styles.panelSectionTitle}>Capability Domains</h3>
            {(Object.keys(genesByDomain) as Domain[]).map((domain) => (
              <DomainPanel
                key={domain}
                domain={domain}
                genes={genesByDomain[domain]}
                selectedGeneId={selectedGeneId}
                onSelectGene={setSelectedGeneId}
                isExpanded={expandedDomains[domain]}
                onToggle={() => toggleDomain(domain)}
              />
            ))}
          </div>
        </aside>
        
        {/* Right Column: Detail and Comparison */}
        <section className={styles.rightColumn}>
          {/* Gene Detail Card */}
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>
              {selectedGene ? 'Gene Details' : 'Select a Gene'}
            </h3>
            {selectedGene ? (
              <GeneDetailCard gene={selectedGene} />
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🧬</span>
                <p>Click on a gene to view details</p>
              </div>
            )}
          </div>
          
          {/* Species Comparison */}
          <div className={styles.comparisonSection}>
            <h3 className={styles.sectionTitle}>Species Comparison</h3>
            
            <div className={styles.speciesTabs}>
              <button 
                className={`${styles.speciesTab} ${activeSpeciesTab === 'mission' ? styles.active : ''}`}
                onClick={() => setActiveSpeciesTab('mission')}
              >
                Mission Hybrids
              </button>
              <button 
                className={`${styles.speciesTab} ${activeSpeciesTab === 'enablement' ? styles.active : ''}`}
                onClick={() => setActiveSpeciesTab('enablement')}
              >
                Enablement Hybrids
              </button>
            </div>
            
            <div className={styles.comparisonContent}>
              <div className={styles.radarSection}>
                <RadarChart species={activeSpeciesTab} genes={GENES} />
              </div>
              <div className={styles.scorecardSection}>
                <SpeciesScorecard speciesId={activeSpeciesTab} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Weight Matrix */}
      <section className={styles.matrixSection}>
        <WeightMatrix 
          genes={GENES}
          selectedGeneId={selectedGeneId}
          onSelectGene={setSelectedGeneId}
          filterDomain={filterDomain}
        />
      </section>
      
      {/* Extinction Alerts */}
      <section className={styles.alertsSection}>
        <ExtinctionAlerts 
          expandedId={expandedExtinction}
          onToggle={toggleExtinction}
        />
      </section>
      
      {/* New GovCon Panels Row */}
      <section className={styles.govConPanelsRow}>
        {/* Circuit Simulator Panel */}
        <div className={styles.dashboardPanel}>
          <div className={styles.panelHeader}>
            <h3>Capacity → Permission Converter</h3>
            <span className={styles.panelBadge}>Interactive</span>
          </div>
          <CircuitVisualization 
            variant="full" 
            interactive={true}
            onGeneClick={handleGeneSelect}
          />
        </div>
        
        {/* Scarcity Heatmap Panel */}
        <div className={styles.dashboardPanel}>
          <div className={styles.panelHeader}>
            <h3>Scarcity Shifts</h3>
          </div>
          <ScarcityHeatmap shifts={SCARCITY_SHIFTS} />
        </div>
      </section>
      
      {/* Personas Panel */}
      <section className={styles.personasSection}>
        <div className={styles.dashboardPanel}>
          <div className={styles.panelHeader}>
            <h3>Ecosystem Personas</h3>
          </div>
          <GovPersonas variant="cards" side="both" />
        </div>
      </section>
      
      {/* Footer with Three Pillars */}
      <footer className={styles.dashboardFooter}>
        <ThreePillars variant="horizontal" linkToStrategy={true} />
      </footer>
    </Layout>
  );
}
