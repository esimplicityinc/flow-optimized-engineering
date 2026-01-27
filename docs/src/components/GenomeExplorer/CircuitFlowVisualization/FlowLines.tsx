/**
 * FlowLines - Fan-out SVG flow connections with delivery-mode-colored paths
 * 
 * Input side: Single entry fans out to 12 gene positions
 * Output side: 12 gene positions converge to 2 points (Evidence + Permission)
 * 
 * Colors dynamically change based on each gene's delivery mode
 * (human=orange, hybrid=amber, system=green)
 */

import React from 'react';
import type { FlowLinesProps, GeneLevels, DeliveryMode } from './types';
import { DELIVERY_MODE_COLORS } from './types';
import styles from './styles.module.css';

// Gene metadata for path generation (matches GenomeHoneycomb)
interface GenePathInfo {
  id: string;
  isSpine: boolean;
  row: number;
  indexInRow: number;
  // Delivery mode config
  baseSystemRatio: number;
  scalabilityFactor: number;
}

// All 12 genes with their positions and delivery config (3 rows by domain)
const GENE_PATHS: GenePathInfo[] = [
  // Row 0: Product genes (4)
  { id: 'discovery', isSpine: false, row: 0, indexInRow: 0, baseSystemRatio: 0.25, scalabilityFactor: 0.4 },
  { id: 'tradeoffs', isSpine: false, row: 0, indexInRow: 1, baseSystemRatio: 0.20, scalabilityFactor: 0.3 },
  { id: 'adoption', isSpine: false, row: 0, indexInRow: 2, baseSystemRatio: 0.35, scalabilityFactor: 0.6 },
  { id: 'strategy', isSpine: false, row: 0, indexInRow: 3, baseSystemRatio: 0.25, scalabilityFactor: 0.35 },
  // Row 1: Education genes (4)
  { id: 'mentalModels', isSpine: false, row: 1, indexInRow: 0, baseSystemRatio: 0.30, scalabilityFactor: 0.5 },
  { id: 'communication', isSpine: false, row: 1, indexInRow: 1, baseSystemRatio: 0.25, scalabilityFactor: 0.4 },
  { id: 'enablement', isSpine: false, row: 1, indexInRow: 2, baseSystemRatio: 0.45, scalabilityFactor: 0.8 },
  { id: 'cognitiveErgonomics', isSpine: false, row: 1, indexInRow: 3, baseSystemRatio: 0.50, scalabilityFactor: 0.9 },
  // Row 2: Systems/Spine genes (4)
  { id: 'constraints', isSpine: true, row: 2, indexInRow: 0, baseSystemRatio: 0.55, scalabilityFactor: 0.95 },
  { id: 'verification', isSpine: true, row: 2, indexInRow: 1, baseSystemRatio: 0.55, scalabilityFactor: 0.95 },
  { id: 'operability', isSpine: true, row: 2, indexInRow: 2, baseSystemRatio: 0.55, scalabilityFactor: 0.9 },
  { id: 'governance', isSpine: true, row: 2, indexInRow: 3, baseSystemRatio: 0.45, scalabilityFactor: 0.75 },
];

// Honeycomb layout: 3 rows of 4 genes each
const GENES_PER_ROW = [4, 4, 4];

// SVG dimensions (adjusted for 3 rows)
const SVG_WIDTH = 80;
const SVG_HEIGHT = 300;
const ROW_HEIGHT = 90;
const PADDING_TOP = 60;

/**
 * Calculate delivery mode color for a gene
 */
function calculateDeliveryModeColor(
  gene: GenePathInfo,
  geneLevels: GeneLevels,
  aiFactor: number
): string {
  const currentLevel = geneLevels[gene.id as keyof GeneLevels] || 0.5;
  
  // Calculate required level
  const requiredLevel = gene.isSpine
    ? 0.3 + (aiFactor * 0.55)
    : 0.4 + (aiFactor * 0.2);
  
  // Calculate demand pressure
  const demandGap = Math.max(0, requiredLevel - currentLevel);
  const demandPressure = demandGap * aiFactor * 2;
  
  // Calculate system ratio
  let systemRatio = gene.baseSystemRatio + (demandPressure * gene.scalabilityFactor);
  systemRatio += aiFactor * 0.15; // AI tooling helps everything
  systemRatio = Math.min(0.95, Math.max(0.15, systemRatio));
  
  // Return color based on thresholds
  if (systemRatio < 0.4) {
    return DELIVERY_MODE_COLORS.human;  // Orange
  } else if (systemRatio < 0.6) {
    return DELIVERY_MODE_COLORS.hybrid; // Amber
  } else {
    return DELIVERY_MODE_COLORS.system; // Green
  }
}

/**
 * Calculate the Y position for a gene based on its row and position within row
 */
function calculateGeneY(row: number, indexInRow: number, genesInRow: number): number {
  const rowY = PADDING_TOP + (row * ROW_HEIGHT);
  const rowSpread = 40;
  const centerOffset = (genesInRow - 1) / 2;
  const withinRowOffset = (indexInRow - centerOffset) * (rowSpread / Math.max(genesInRow - 1, 1));
  return rowY + withinRowOffset;
}

/**
 * Generate a bezier curve path for input direction (entry → gene)
 */
function generateInputPath(gene: GenePathInfo): string {
  const entryY = SVG_HEIGHT / 2;
  const exitY = calculateGeneY(gene.row, gene.indexInRow, GENES_PER_ROW[gene.row]);
  const cp1x = SVG_WIDTH * 0.4;
  const cp1y = entryY;
  const cp2x = SVG_WIDTH * 0.6;
  const cp2y = exitY;
  return `M 0 ${entryY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${SVG_WIDTH} ${exitY}`;
}

/**
 * Generate a bezier curve path for output direction (gene → convergence point)
 */
function generateOutputPath(gene: GenePathInfo): string {
  const entryY = calculateGeneY(gene.row, gene.indexInRow, GENES_PER_ROW[gene.row]);
  const exitY = gene.isSpine ? SVG_HEIGHT * 0.35 : SVG_HEIGHT * 0.65;
  const cp1x = SVG_WIDTH * 0.4;
  const cp1y = entryY;
  const cp2x = SVG_WIDTH * 0.6;
  const cp2y = exitY;
  return `M 0 ${entryY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${SVG_WIDTH} ${exitY}`;
}

function FlowLines({ 
  direction, 
  speed, 
  intensity,
  geneLevels,
  aiFactor,
}: FlowLinesProps): React.ReactElement {
  // Calculate animation durations based on speed
  const flowDuration = Math.max(0.5, 3 / speed);
  const particleDuration = Math.max(1.5, 5 / speed);
  
  // Particles per path based on intensity (1-3 per path)
  const particlesPerPath = Math.max(1, Math.ceil(intensity * 2.5));
  
  return (
    <div className={styles.flowLinesContainer}>
      <svg 
        className={styles.flowLinesSvg}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glow filters for delivery modes */}
          <filter id={`glow-human-${direction}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor={DELIVERY_MODE_COLORS.human} floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`glow-hybrid-${direction}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor={DELIVERY_MODE_COLORS.hybrid} floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`glow-system-${direction}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor={DELIVERY_MODE_COLORS.system} floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Render path for each gene */}
        {GENE_PATHS.map((gene, geneIndex) => {
          const pathD = direction === 'in' 
            ? generateInputPath(gene) 
            : generateOutputPath(gene);
          
          // Calculate color based on delivery mode
          const color = calculateDeliveryModeColor(gene, geneLevels, aiFactor);
          
          // Determine filter based on color
          let filterId: string;
          if (color === DELIVERY_MODE_COLORS.human) {
            filterId = `glow-human-${direction}`;
          } else if (color === DELIVERY_MODE_COLORS.hybrid) {
            filterId = `glow-hybrid-${direction}`;
          } else {
            filterId = `glow-system-${direction}`;
          }
          
          // Stagger animation delays
          const pathDelay = (geneIndex / GENE_PATHS.length) * 0.5;
          
          return (
            <g key={`${gene.id}-${direction}`}>
              {/* Background glow path */}
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeOpacity="0.15"
                filter={`url(#${filterId})`}
              />
              
              {/* Main animated path */}
              <path
                d={pathD}
                className={styles.flowPath}
                style={{
                  stroke: color,
                  '--flow-duration': `${flowDuration}s`,
                  animationDelay: `${pathDelay}s`,
                  opacity: 0.4 + (intensity * 0.5),
                } as React.CSSProperties}
              />
              
              {/* Particles along this path */}
              {Array.from({ length: particlesPerPath }).map((_, pIndex) => {
                const particleDelay = pathDelay + (pIndex / particlesPerPath) * particleDuration;
                
                return (
                  <circle
                    key={`particle-${gene.id}-${pIndex}`}
                    r="3"
                    fill={color}
                    className={styles.flowParticle}
                    style={{
                      '--particle-duration': `${particleDuration}s`,
                      animationDelay: `${particleDelay}s`,
                      offsetPath: `path('${pathD}')`,
                      offsetRotate: '0deg',
                      filter: `drop-shadow(0 0 4px ${color})`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </g>
          );
        })}
        
        {/* Entry/Exit point indicators */}
        {direction === 'in' ? (
          // Single entry point (left side) - mixed color
          <circle
            cx="0"
            cy={SVG_HEIGHT / 2}
            r="5"
            fill={DELIVERY_MODE_COLORS.hybrid}
            className={styles.flowEndpoint}
          />
        ) : (
          // Two convergence points (right side)
          <>
            {/* Evidence point (spine genes) - tends toward system */}
            <circle
              cx={SVG_WIDTH}
              cy={SVG_HEIGHT * 0.35}
              r="5"
              fill={DELIVERY_MODE_COLORS.system}
              className={styles.flowEndpoint}
            />
            {/* Permission point (non-spine genes) - tends toward hybrid */}
            <circle
              cx={SVG_WIDTH}
              cy={SVG_HEIGHT * 0.65}
              r="5"
              fill={DELIVERY_MODE_COLORS.hybrid}
              className={styles.flowEndpoint}
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default FlowLines;
