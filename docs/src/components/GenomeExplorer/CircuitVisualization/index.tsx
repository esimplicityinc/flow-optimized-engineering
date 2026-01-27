/**
 * CircuitVisualization Component
 * 
 * An interactive visualization showing how the genome converts AI capacity into permission.
 * Based on the electrical circuit metaphor from the AI-era engineering evolution framework.
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  VOLTAGE_SOURCES,
  IMPEDANCE_FACTORS,
  GENES,
  GENE_CONVERSIONS,
  DOMAINS,
  calculatePermission,
  type Gene,
  type Domain,
} from '../genomeData';
import styles from './styles.module.css';

// ============================================
// TYPES
// ============================================

interface CircuitVisualizationProps {
  /** Display variant */
  variant?: 'full' | 'simplified' | 'mini';
  /** Enable interactivity */
  interactive?: boolean;
  /** Initial AI factor (0-1) */
  initialAiFactor?: number;
  /** Callback when a gene is clicked */
  onGeneClick?: (geneId: string) => void;
}

interface GeneNodeProps {
  gene: Gene;
  level: number;
  interactive: boolean;
  onClick: () => void;
  isSpine: boolean;
}

// ============================================
// CONSTANTS
// ============================================

const GENE_LEVELS = [0.3, 0.5, 0.7, 0.9];

const DOMAIN_ORDER: Domain[] = ['product', 'education', 'systems'];

const INITIAL_GENE_LEVELS: Record<string, number> = {
  // Product
  discovery: 0.5,
  tradeoffs: 0.5,
  adoption: 0.5,
  strategy: 0.5,
  // Education
  'mental-models': 0.5,
  communication: 0.5,
  enablement: 0.5,
  'cognitive-ergonomics': 0.5,
  // Systems (spine genes)
  constraints: 0.7,
  verification: 0.7,
  operability: 0.7,
  governance: 0.7,
};

const SPINE_GENES = ['constraints', 'verification', 'operability', 'governance'];

// ============================================
// HELPER FUNCTIONS
// ============================================

function getPermissionColor(permission: number): string {
  if (permission < 0.3) return 'var(--circuit-color-danger)';
  if (permission < 0.6) return 'var(--circuit-color-warning)';
  return 'var(--circuit-color-success)';
}

function generateInsight(geneLevels: Record<string, number>, aiFactor: number): string {
  const systemsAvg = SPINE_GENES.reduce((sum, id) => sum + (geneLevels[id] || 0.5), 0) / 4;
  const productAvg = ['discovery', 'tradeoffs', 'adoption', 'strategy'].reduce(
    (sum, id) => sum + (geneLevels[id] || 0.5), 0
  ) / 4;
  
  if (aiFactor > 0.7 && systemsAvg < 0.5) {
    return 'Warning: High AI capacity without evidence capability. Risk of uncontrolled entropy.';
  }
  if (systemsAvg > 0.7 && aiFactor > 0.5) {
    return 'Strong enablement spine active. Permission can scale with capacity.';
  }
  if (aiFactor < 0.3 && systemsAvg > 0.7) {
    return 'Pre-AI posture: Strong systems but capacity is limited. AI adoption would unlock leverage.';
  }
  if (productAvg > 0.7 && systemsAvg < 0.5) {
    return 'Mission genes strong, but without Systems genes, evidence becomes the bottleneck.';
  }
  if (aiFactor > 0.5 && systemsAvg > 0.5) {
    return 'Balanced configuration: Capacity and evidence capability are aligned.';
  }
  
  return 'Adjust genes and AI factor to explore different configurations.';
}

function findBottleneck(geneLevels: Record<string, number>): { geneId: string; level: number } | null {
  let minLevel = 1;
  let bottleneck: string | null = null;
  
  // Check spine genes first as they're most critical
  for (const geneId of SPINE_GENES) {
    const level = geneLevels[geneId] || 0.5;
    if (level < minLevel) {
      minLevel = level;
      bottleneck = geneId;
    }
  }
  
  if (bottleneck && minLevel < 0.6) {
    return { geneId: bottleneck, level: minLevel };
  }
  return null;
}

// ============================================
// SUB-COMPONENTS
// ============================================

function GeneNode({ gene, level, interactive, onClick, isSpine }: GeneNodeProps): React.ReactElement {
  const domainConfig = DOMAINS[gene.domain];
  const size = 16 + (level - 0.3) * 20; // Scale from 16px to ~28px
  
  return (
    <button
      className={`${styles.geneNode} ${interactive ? styles.geneNodeInteractive : ''} ${isSpine ? styles.geneNodeSpine : ''}`}
      onClick={interactive ? onClick : undefined}
      disabled={!interactive}
      style={{
        '--gene-color': domainConfig.color,
        '--gene-size': `${size}px`,
      } as React.CSSProperties}
      title={`${gene.name}: ${Math.round(level * 100)}%`}
      aria-label={`${gene.name} at ${Math.round(level * 100)}% capacity`}
    >
      <span className={styles.geneNodeInner} />
      <span className={styles.geneNodeLabel}>{gene.name.slice(0, 3)}</span>
    </button>
  );
}

function VoltageSource({ 
  source, 
  aiFactor 
}: { 
  source: typeof VOLTAGE_SOURCES[number]; 
  aiFactor: number;
}): React.ReactElement {
  const effectiveLevel = source.id === 'ai-shock' 
    ? source.baseLevel + (source.aiMultiplier * aiFactor)
    : source.baseLevel * (1 + (source.aiMultiplier - 1) * aiFactor);
  
  const normalizedLevel = Math.min(1, Math.max(0, effectiveLevel));
  
  return (
    <div className={styles.voltageSource}>
      <div className={styles.voltageIcon}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      <div className={styles.voltageInfo}>
        <span className={styles.voltageName}>{source.name.replace(' Demand', '').replace(' Signal', '')}</span>
        <div className={styles.voltageBar}>
          <div 
            className={styles.voltageBarFill}
            style={{ 
              width: `${normalizedLevel * 100}%`,
              backgroundColor: source.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PermissionGauge({ permission }: { permission: number }): React.ReactElement {
  const color = getPermissionColor(permission);
  const percentage = Math.round(permission * 100);
  
  return (
    <div className={styles.permissionGauge}>
      <div className={styles.permissionHeader}>
        <span className={styles.permissionLabel}>PERMISSION</span>
        <span className={styles.permissionValue} style={{ color }}>{percentage}%</span>
      </div>
      <div className={styles.permissionBar}>
        <div 
          className={styles.permissionBarFill}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

function FlowLine({ 
  animationSpeed 
}: { 
  animationSpeed: number;
}): React.ReactElement {
  return (
    <div className={styles.flowLine}>
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className={styles.flowLineSvg}>
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--circuit-color-flow-start)" />
            <stop offset="100%" stopColor="var(--circuit-color-flow-end)" />
          </linearGradient>
        </defs>
        <path 
          d="M 0 10 L 100 10" 
          stroke="url(#flowGradient)" 
          strokeWidth="2"
          strokeDasharray="8 4"
          className={styles.flowPath}
          style={{ 
            animationDuration: `${2 / animationSpeed}s` 
          }}
        />
      </svg>
      <div className={styles.flowArrow} />
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

function CircuitVisualization({
  variant = 'full',
  interactive = true,
  initialAiFactor = 0.5,
  onGeneClick,
}: CircuitVisualizationProps): React.ReactElement {
  // State
  const [aiFactor, setAiFactor] = useState(initialAiFactor);
  const [geneLevels, setGeneLevels] = useState<Record<string, number>>(INITIAL_GENE_LEVELS);
  
  // Derived values
  const permission = useMemo(
    () => calculatePermission(geneLevels, aiFactor),
    [geneLevels, aiFactor]
  );
  
  const insight = useMemo(
    () => generateInsight(geneLevels, aiFactor),
    [geneLevels, aiFactor]
  );
  
  const bottleneck = useMemo(
    () => findBottleneck(geneLevels),
    [geneLevels]
  );
  
  const flowSpeed = useMemo(
    () => 0.5 + aiFactor * 1.5, // Speed from 0.5x to 2x
    [aiFactor]
  );
  
  // Handlers
  const handleGeneClick = useCallback((geneId: string) => {
    setGeneLevels((prev) => {
      const currentLevel = prev[geneId] || 0.5;
      const currentIndex = GENE_LEVELS.indexOf(currentLevel);
      const nextIndex = (currentIndex + 1) % GENE_LEVELS.length;
      return { ...prev, [geneId]: GENE_LEVELS[nextIndex] };
    });
    onGeneClick?.(geneId);
  }, [onGeneClick]);
  
  const handleAiFactorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAiFactor(parseFloat(e.target.value));
  }, []);
  
  // Organize genes by domain
  const genesByDomain = useMemo(() => {
    const result: Record<Domain, Gene[]> = {
      product: [],
      education: [],
      systems: [],
    };
    GENES.forEach((gene) => {
      result[gene.domain].push(gene);
    });
    return result;
  }, []);
  
  // Mini variant - just the permission gauge
  if (variant === 'mini') {
    return (
      <div className={styles.mini}>
        <span className={styles.miniLabel}>Permission:</span>
        <div className={styles.miniBar}>
          <div 
            className={styles.miniBarFill}
            style={{ 
              width: `${permission * 100}%`,
              backgroundColor: getPermissionColor(permission),
            }}
          />
        </div>
        <span className={styles.miniValue}>{Math.round(permission * 100)}%</span>
      </div>
    );
  }
  
  // Simplified variant - gene grid and permission gauge only
  if (variant === 'simplified') {
    return (
      <div className={styles.simplified}>
        <div className={styles.simplifiedHeader}>
          <h4 className={styles.simplifiedTitle}>Gene Conductances</h4>
          {interactive && (
            <span className={styles.simplifiedHint}>Click genes to adjust</span>
          )}
        </div>
        
        <div className={styles.geneGrid}>
          {DOMAIN_ORDER.map((domain) => (
            <div key={domain} className={styles.geneDomainColumn}>
              <span 
                className={styles.geneDomainLabel}
                style={{ color: DOMAINS[domain].color }}
              >
                {DOMAINS[domain].name}
              </span>
              <div className={styles.geneDomainNodes}>
                {genesByDomain[domain].map((gene) => (
                  <GeneNode
                    key={gene.id}
                    gene={gene}
                    level={geneLevels[gene.id] || 0.5}
                    interactive={interactive}
                    onClick={() => handleGeneClick(gene.id)}
                    isSpine={SPINE_GENES.includes(gene.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <PermissionGauge permission={permission} />
      </div>
    );
  }
  
  // Full variant
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>CAPACITY → PERMISSION CONVERTER</h3>
      </div>
      
      {/* AI Factor Slider */}
      {interactive && (
        <div className={styles.sliderSection}>
          <label className={styles.sliderLabel} htmlFor="ai-factor-slider">
            <span>AI FACTOR</span>
            <span className={styles.sliderValue}>{aiFactor.toFixed(1)}</span>
          </label>
          <input
            id="ai-factor-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={aiFactor}
            onChange={handleAiFactorChange}
            className={styles.slider}
          />
          <div className={styles.sliderMarkers}>
            <span>Pre-AI</span>
            <span>Full AI</span>
          </div>
        </div>
      )}
      
      <div className={styles.circuitLayout}>
        {/* Demand Sources (Left) */}
        <div className={styles.voltageSources}>
          <h4 className={styles.sectionTitle}>DEMAND SOURCES</h4>
          {VOLTAGE_SOURCES.map((source) => (
            <VoltageSource key={source.id} source={source} aiFactor={aiFactor} />
          ))}
        </div>
        
        {/* Flow Line (Left to Center) */}
        <FlowLine animationSpeed={flowSpeed} />
        
        {/* Gene Grid (Center) */}
        <div className={styles.geneSection}>
          <h4 className={styles.sectionTitle}>GENE CONDUCTANCES</h4>
          {interactive && (
            <span className={styles.geneHint}>(click genes to adjust)</span>
          )}
          
          <div className={styles.geneGrid}>
            {DOMAIN_ORDER.map((domain) => (
              <div key={domain} className={styles.geneDomainColumn}>
                <span 
                  className={styles.geneDomainLabel}
                  style={{ color: DOMAINS[domain].color }}
                >
                  {DOMAINS[domain].name}
                </span>
                <div className={styles.geneDomainNodes}>
                  {genesByDomain[domain].map((gene) => (
                    <GeneNode
                      key={gene.id}
                      gene={gene}
                      level={geneLevels[gene.id] || 0.5}
                      interactive={interactive}
                      onClick={() => handleGeneClick(gene.id)}
                      isSpine={SPINE_GENES.includes(gene.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Flow Line (Center to Right) */}
        <FlowLine animationSpeed={flowSpeed * (permission + 0.3)} />
        
        {/* Permission Gauge (Right) */}
        <div className={styles.outputSection}>
          <PermissionGauge permission={permission} />
        </div>
      </div>
      
      {/* Insight Display */}
      <div className={styles.insightSection}>
        <div className={styles.insightFlow}>
          <span className={styles.insightFlowItem}>Capacity</span>
          <span className={styles.insightFlowArrow}>→</span>
          <span className={styles.insightFlowItem}>Evidence</span>
          <span className={styles.insightFlowArrow}>→</span>
          <span className={styles.insightFlowItem}>Permission</span>
        </div>
        
        {bottleneck && (
          <div className={styles.bottleneck}>
            <strong>Bottleneck:</strong> {GENES.find(g => g.id === bottleneck.geneId)?.name} 
            (gene at {Math.round(bottleneck.level * 100)}%)
          </div>
        )}
        
        <p className={styles.insight}>{insight}</p>
      </div>
    </div>
  );
}

export default CircuitVisualization;
export { CircuitVisualization };
export type { CircuitVisualizationProps };
