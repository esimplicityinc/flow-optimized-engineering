/**
 * GenomeHoneycomb - Hexagon grid with merged coloring:
 * - Border = demand gap status (red/orange/green/blue)
 * - Interior = delivery mode (orange=human, amber=hybrid, green=system)
 * 
 * Delivery mode shifts based on demand pressure and gene scalability.
 */

import React, { useCallback } from 'react';
import type { 
  GenomeHoneycombProps, 
  GeneLevels, 
  DemandGapResult, 
  DeliveryMode,
  DeliveryModeResult,
  GeneDeliveryConfig,
} from './types';
import { DELIVERY_MODE_COLORS } from './types';
import styles from './styles.module.css';

// Gene definitions with delivery config
interface GeneDefinition {
  id: string;
  name: string;
  shortName: string;
  domain: 'product' | 'education' | 'systems';
  // Delivery mode config
  baseSystemRatio: number;    // Inherent system component (0.2 - 0.55)
  scalabilityFactor: number;  // How much it shifts under pressure (0.3 - 0.95)
}

const GENES: GeneDefinition[] = [
  // Row 1: Product genes - lower scalability (need human judgment)
  { id: 'discovery', name: 'Discovery', shortName: 'Dis', domain: 'product', baseSystemRatio: 0.25, scalabilityFactor: 0.4 },
  { id: 'tradeoffs', name: 'Tradeoffs', shortName: 'Tra', domain: 'product', baseSystemRatio: 0.20, scalabilityFactor: 0.3 },
  { id: 'adoption', name: 'Adoption', shortName: 'Ado', domain: 'product', baseSystemRatio: 0.35, scalabilityFactor: 0.6 },
  // Row 2: Mixed - Strategy (product), Education genes
  { id: 'strategy', name: 'Strategy', shortName: 'Str', domain: 'product', baseSystemRatio: 0.25, scalabilityFactor: 0.35 },
  { id: 'mentalModels', name: 'Mental Models', shortName: 'Men', domain: 'education', baseSystemRatio: 0.30, scalabilityFactor: 0.5 },
  { id: 'communication', name: 'Comms', shortName: 'Com', domain: 'education', baseSystemRatio: 0.25, scalabilityFactor: 0.4 },
  { id: 'enablement', name: 'Enablement', shortName: 'Ena', domain: 'education', baseSystemRatio: 0.45, scalabilityFactor: 0.8 },
  // Row 3: Education + Systems (spine starts)
  { id: 'cognitiveErgonomics', name: 'Cog Ergo', shortName: 'Cog', domain: 'education', baseSystemRatio: 0.50, scalabilityFactor: 0.9 },
  { id: 'constraints', name: 'Constraints', shortName: 'Con', domain: 'systems', baseSystemRatio: 0.55, scalabilityFactor: 0.95 },
  { id: 'verification', name: 'Verification', shortName: 'Ver', domain: 'systems', baseSystemRatio: 0.55, scalabilityFactor: 0.95 },
  // Row 4: Systems (spine)
  { id: 'operability', name: 'Operability', shortName: 'Ope', domain: 'systems', baseSystemRatio: 0.55, scalabilityFactor: 0.9 },
  { id: 'governance', name: 'Governance', shortName: 'Gov', domain: 'systems', baseSystemRatio: 0.45, scalabilityFactor: 0.75 },
];

// Domain colors (for internal dot - shows gene category)
const DOMAIN_COLORS = {
  product: '#3B82F6',    // Blue
  education: '#10B981',  // Green
  systems: '#8B5CF6',    // Purple
};

// Spine genes (Systems domain) - critical for evidence conversion
const SPINE_GENES = ['constraints', 'verification', 'operability', 'governance'];

/**
 * Calculate demand gap for a gene (determines BORDER color)
 */
function calculateDemandGap(
  geneId: string,
  currentLevel: number,
  aiFactor: number
): DemandGapResult {
  const isSpineGene = SPINE_GENES.includes(geneId);
  
  // Required level scales with AI factor
  // Spine genes need much higher levels with AI
  let requiredLevel: number;
  if (isSpineGene) {
    // Spine: 0.3 at AI=0, up to 0.85 at AI=1
    requiredLevel = 0.3 + (aiFactor * 0.55);
  } else {
    // Others: 0.4 at AI=0, up to 0.6 at AI=1
    requiredLevel = 0.4 + (aiFactor * 0.2);
  }
  
  const gap = currentLevel - requiredLevel;
  
  // Determine status and color (for border)
  let status: DemandGapResult['status'];
  let color: string;
  
  if (gap < -0.25) {
    status = 'critical';
    color = '#EF4444'; // Red
  } else if (gap < -0.05) {
    status = 'warning';
    color = '#F59E0B'; // Orange
  } else if (gap < 0.15) {
    status = 'balanced';
    color = '#10B981'; // Green
  } else {
    status = 'surplus';
    color = '#3B82F6'; // Blue
  }
  
  return {
    geneId,
    currentLevel,
    requiredLevel,
    gap,
    status,
    color,
  };
}

/**
 * Interpolate between two hex colors
 */
function interpolateColor(color1: string, color2: string, ratio: number): string {
  // Parse hex colors
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  
  // Interpolate
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Calculate delivery mode for a gene (determines BORDER color)
 * 
 * FOE maturity is the primary driver of delivery mode.
 * As FOE maturity increases, genes shift from human-delivered (manual processes,
 * meetings, artifacts) to system-delivered (automated pipelines, CI evidence,
 * coded guardrails).
 * 
 * Each gene shifts at its own pace based on its scalabilityFactor:
 * - Systems genes (high scalability) shift to automated earliest
 * - Product genes (low scalability) retain human judgment longest
 * 
 * AI factor provides a small additional nudge (tooling helps everything),
 * but FOE maturity is what actually moves the needle.
 * 
 * Color smoothly transitions from warm orange (human/manual) to cool cyan (system/automated)
 */
function calculateDeliveryMode(
  gene: GeneDefinition,
  currentLevel: number,
  aiFactor: number
): DeliveryModeResult {
  // FOE maturity (represented by gene level) is the primary driver
  // Gene level ranges ~0.2 (low maturity) to ~0.9 (high maturity)
  // Normalize to 0-1 range for the shift calculation
  const maturitySignal = Math.max(0, Math.min(1, (currentLevel - 0.2) / 0.7));
  
  // At zero maturity, everything should be fully human-delivered (orange).
  // The baseSystemRatio only kicks in as maturity grows, blended by scalability.
  // Use a power curve so low maturity stays firmly orange, then accelerates.
  const maturityCurve = Math.pow(maturitySignal, 0.7);
  
  // System ratio starts at 0 (full human) and scales up with maturity
  // Gene's baseSystemRatio acts as a ceiling/target, not a floor
  const targetRatio = gene.baseSystemRatio + (gene.scalabilityFactor * 0.4);
  let systemRatio = maturityCurve * targetRatio;
  
  // AI provides a small additional nudge
  systemRatio += aiFactor * 0.05;
  
  // Clamp between 0.02 (fully human at zero) and 0.95
  systemRatio = Math.min(0.95, Math.max(0.02, systemRatio));
  
  // Smooth color interpolation from human (orange) to system (cyan)
  const color = interpolateColor(
    DELIVERY_MODE_COLORS.human,
    DELIVERY_MODE_COLORS.system,
    systemRatio
  );
  
  // Determine mode label based on thresholds (for display/accessibility)
  let mode: DeliveryMode;
  if (systemRatio < 0.4) {
    mode = 'human';
  } else if (systemRatio < 0.6) {
    mode = 'hybrid';
  } else {
    mode = 'system';
  }
  
  return {
    geneId: gene.id,
    systemRatio,
    mode,
    color,
  };
}

// Organize genes into 3 rows by domain
const HONEYCOMB_LAYOUT = [
  GENES.slice(0, 4),   // Row 1: Product (Discovery, Tradeoffs, Adoption, Strategy)
  GENES.slice(4, 8),   // Row 2: Education (Mental Models, Communication, Enablement, Cog Ergo)
  GENES.slice(8, 12),  // Row 3: Systems (Constraints, Verification, Operability, Governance)
];

function GenomeHoneycomb({
  geneLevels,
  aiFactor,
  onGeneClick,
  onGeneRightClick,
  interactive,
}: GenomeHoneycombProps): React.ReactElement {
  
  const handleClick = useCallback((geneId: string) => {
    if (interactive) {
      onGeneClick(geneId);
    }
  }, [interactive, onGeneClick]);
  
  const handleContextMenu = useCallback((e: React.MouseEvent, geneId: string) => {
    e.preventDefault();
    onGeneRightClick(geneId);
  }, [onGeneRightClick]);
  
  return (
    <div className={styles.genomePanel}>
      <div className={styles.genomePanelTitle}>Evidence Engine</div>
      
      <div className={styles.honeycomb}>
        {HONEYCOMB_LAYOUT.map((row, rowIndex) => {
          // Get domain for this row (all genes in a row share the same domain)
          const rowDomain = row[0].domain;
          const rowDomainLabel = rowDomain.charAt(0).toUpperCase() + rowDomain.slice(1);
          const rowDomainColor = DOMAIN_COLORS[rowDomain];
          
          return (
            <div key={rowIndex} className={styles.hexRowContainer}>
              <div 
                className={styles.rowLabel}
                style={{ color: rowDomainColor }}
              >
                {rowDomainLabel}
              </div>
              <div className={styles.hexRow}>
                {row.map((gene) => {
              const level = geneLevels[gene.id as keyof GeneLevels] || 0.5;
              const demandGap = calculateDemandGap(gene.id, level, aiFactor);
              const deliveryMode = calculateDeliveryMode(gene, level, aiFactor);
              const isSpine = SPINE_GENES.includes(gene.id);
              
              const domainColor = DOMAIN_COLORS[gene.domain];
              
              return (
                <button
                  key={gene.id}
                  className={`${styles.hexagon} ${demandGap.status === 'critical' ? styles.critical : ''}`}
                  onClick={() => handleClick(gene.id)}
                  onContextMenu={(e) => handleContextMenu(e, gene.id)}
                  style={{
                    '--hex-color': domainColor,         // Interior dot = domain
                    '--hex-border': deliveryMode.color, // Border = delivery mode
                  } as React.CSSProperties}
                  title={`${gene.name} (${gene.domain}): ${Math.round(level * 100)}%\nDelivery: ${deliveryMode.mode} (${Math.round(deliveryMode.systemRatio * 100)}% system)${isSpine ? '\n[SPINE GENE]' : ''}\n\nLeft-click: adjust level\nRight-click: details`}
                  aria-label={`${gene.name} at ${Math.round(level * 100)}% capacity, delivery ${deliveryMode.mode}`}
                >
                  <div className={styles.hexagonOuter} />
                  <div className={styles.hexagonInner}>
                    <div 
                      className={styles.hexagonDomainDot}
                      style={{ background: domainColor }}
                    />
                    <span className={styles.hexagonLabel}>{gene.name}</span>
                    <span className={styles.hexagonLevel}>{Math.round(level * 100)}%</span>
                  </div>
                </button>
              );
            })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Delivery mode legend (for border) - gradient from Manual to Automated */}
      <div className={styles.genomeLegend}>
        <span className={styles.legendLabel}>Delivery:</span>
        <span className={styles.legendEndLabel} style={{ color: DELIVERY_MODE_COLORS.human }}>Manual (slow)</span>
        <div 
          className={styles.legendGradient}
          style={{ 
            background: `linear-gradient(90deg, ${DELIVERY_MODE_COLORS.human}, ${DELIVERY_MODE_COLORS.system})` 
          }}
        />
        <span className={styles.legendEndLabel} style={{ color: DELIVERY_MODE_COLORS.system }}>Automated (fast)</span>
      </div>
    </div>
  );
}

export default GenomeHoneycomb;
export { calculateDemandGap, calculateDeliveryMode, GENES, SPINE_GENES };
