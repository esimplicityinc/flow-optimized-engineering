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
  { id: 'communication', name: 'Communication', shortName: 'Com', domain: 'education', baseSystemRatio: 0.25, scalabilityFactor: 0.4 },
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
 * Calculate delivery mode for a gene (determines INTERIOR color)
 * 
 * The delivery mode shifts from human → system based on:
 * - Demand pressure (gap between required and current level)
 * - Gene's scalability (how easily it can be productized)
 * - AI factor (higher AI = more pressure to scale)
 */
function calculateDeliveryMode(
  gene: GeneDefinition,
  currentLevel: number,
  aiFactor: number
): DeliveryModeResult {
  // Get required level for this gene
  const isSpineGene = SPINE_GENES.includes(gene.id);
  const requiredLevel = isSpineGene
    ? 0.3 + (aiFactor * 0.55)
    : 0.4 + (aiFactor * 0.2);
  
  // Calculate demand pressure (positive when under capacity)
  const demandGap = Math.max(0, requiredLevel - currentLevel);
  const demandPressure = demandGap * aiFactor * 2; // Scale factor for sensitivity
  
  // Calculate system ratio
  let systemRatio = gene.baseSystemRatio + (demandPressure * gene.scalabilityFactor);
  
  // Also increase system ratio with AI factor directly (tooling helps everything)
  systemRatio += aiFactor * 0.15;
  
  // Clamp between 0.15 (always some human) and 0.95 (always some system)
  systemRatio = Math.min(0.95, Math.max(0.15, systemRatio));
  
  // Determine mode based on thresholds
  let mode: DeliveryMode;
  let color: string;
  
  if (systemRatio < 0.4) {
    mode = 'human';
    color = DELIVERY_MODE_COLORS.human;
  } else if (systemRatio < 0.6) {
    mode = 'hybrid';
    color = DELIVERY_MODE_COLORS.hybrid;
  } else {
    mode = 'system';
    color = DELIVERY_MODE_COLORS.system;
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
      
      {/* Domain legend (for internal dot) */}
      <div className={styles.genomeLegend}>
        <span className={styles.legendLabel}>Dot:</span>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: DOMAIN_COLORS.product }} />
          <span>Product</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: DOMAIN_COLORS.education }} />
          <span>Education</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: DOMAIN_COLORS.systems }} />
          <span>Systems</span>
        </div>
      </div>
      
      {/* Delivery mode legend (for border) */}
      <div className={styles.genomeLegend}>
        <span className={styles.legendLabel}>Border:</span>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: DELIVERY_MODE_COLORS.human }} />
          <span>Human</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: DELIVERY_MODE_COLORS.hybrid }} />
          <span>Hybrid</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ background: DELIVERY_MODE_COLORS.system }} />
          <span>System</span>
        </div>
      </div>
    </div>
  );
}

export default GenomeHoneycomb;
export { calculateDemandGap, calculateDeliveryMode, GENES, SPINE_GENES };
