/**
 * GenomeHoneycomb - Hexagon grid with demand-gap coloring
 * Click to cycle levels, right-click for modal
 */

import React, { useCallback } from 'react';
import type { GenomeHoneycombProps, GeneLevels, DemandGapResult } from './types';
import styles from './styles.module.css';

// Gene definitions with domain info
const GENES = [
  // Row 1: 3 genes
  { id: 'discovery', name: 'Discovery', shortName: 'Dis', domain: 'product' as const },
  { id: 'tradeoffs', name: 'Tradeoffs', shortName: 'Tra', domain: 'product' as const },
  { id: 'adoption', name: 'Adoption', shortName: 'Ado', domain: 'product' as const },
  // Row 2: 4 genes  
  { id: 'strategy', name: 'Strategy', shortName: 'Str', domain: 'product' as const },
  { id: 'mentalModels', name: 'Mental Models', shortName: 'Men', domain: 'education' as const },
  { id: 'communication', name: 'Communication', shortName: 'Com', domain: 'education' as const },
  { id: 'enablement', name: 'Enablement', shortName: 'Ena', domain: 'education' as const },
  // Row 3: 3 genes
  { id: 'cognitiveErgonomics', name: 'Cog Ergo', shortName: 'Cog', domain: 'education' as const },
  { id: 'constraints', name: 'Constraints', shortName: 'Con', domain: 'systems' as const },
  { id: 'verification', name: 'Verification', shortName: 'Ver', domain: 'systems' as const },
  // Row 4: 2 genes
  { id: 'operability', name: 'Operability', shortName: 'Ope', domain: 'systems' as const },
  { id: 'governance', name: 'Governance', shortName: 'Gov', domain: 'systems' as const },
];

const DOMAIN_COLORS = {
  product: '#3B82F6',
  education: '#10B981',
  systems: '#8B5CF6',
};

// Spine genes (Systems domain) - critical for evidence conversion
const SPINE_GENES = ['constraints', 'verification', 'operability', 'governance'];

// Calculate demand gap for a gene
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
  
  // Determine status and color
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

// Organize genes into honeycomb rows
const HONEYCOMB_LAYOUT = [
  GENES.slice(0, 3),   // Row 1: 3 genes
  GENES.slice(3, 7),   // Row 2: 4 genes
  GENES.slice(7, 10),  // Row 3: 3 genes
  GENES.slice(10, 12), // Row 4: 2 genes
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
        {HONEYCOMB_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.hexRow}>
            {row.map((gene) => {
              const level = geneLevels[gene.id as keyof GeneLevels] || 0.5;
              const demandGap = calculateDemandGap(gene.id, level, aiFactor);
              const domainColor = DOMAIN_COLORS[gene.domain];
              const isSpine = SPINE_GENES.includes(gene.id);
              
              return (
                <button
                  key={gene.id}
                  className={`${styles.hexagon} ${demandGap.status === 'critical' ? styles.critical : ''}`}
                  onClick={() => handleClick(gene.id)}
                  onContextMenu={(e) => handleContextMenu(e, gene.id)}
                  style={{
                    '--hex-color': domainColor,
                    '--hex-border': demandGap.color,
                  } as React.CSSProperties}
                  title={`${gene.name}: ${Math.round(level * 100)}% (${demandGap.status})${isSpine ? ' [SPINE]' : ''}\nLeft-click: adjust level\nRight-click: details`}
                  aria-label={`${gene.name} at ${Math.round(level * 100)}% capacity, status: ${demandGap.status}`}
                >
                  <div className={styles.hexagonOuter} />
                  <div className={styles.hexagonInner}>
                    <div 
                      className={styles.hexagonDomainDot}
                      style={{ background: domainColor }}
                    />
                    <span className={styles.hexagonLabel}>{gene.shortName}</span>
                    <span className={styles.hexagonLevel}>{Math.round(level * 100)}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Domain legend */}
      <div className={styles.genomeLegend}>
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
    </div>
  );
}

export default GenomeHoneycomb;
export { calculateDemandGap, GENES, SPINE_GENES };
