/**
 * CircuitFlowVisualization
 * 
 * An accurate electrical circuit model visualization showing:
 * - Voltage sources (demand pressure)
 * - Impedance factors (resistance)
 * - Genome honeycomb (conductance with demand-gap coloring)
 * - Output gauges (Permission, Risk, Evidence, Outcomes, Throughput)
 * - Full interactivity with AI factor slider and presets
 */

import React, { useState, useMemo, useCallback } from 'react';
import type { CircuitFlowVisualizationProps, GeneLevels } from './types';
import VoltagePanel from './VoltagePanel';
import GenomeHoneycomb, { SPINE_GENES } from './GenomeHoneycomb';
import OutputGauges from './OutputGauges';
import FlowLines from './FlowLines';
import AIFactorSlider, { geneLevelsFromMaturity } from './AIFactorSlider';
import InsightPanel, { generateInsight } from './InsightPanel';
import styles from './styles.module.css';

// Default gene levels
const DEFAULT_GENES: GeneLevels = {
  discovery: 0.5,
  tradeoffs: 0.5,
  adoption: 0.5,
  strategy: 0.5,
  mentalModels: 0.5,
  communication: 0.5,
  enablement: 0.5,
  cognitiveErgonomics: 0.5,
  constraints: 0.5,
  verification: 0.5,
  operability: 0.5,
  governance: 0.5,
};

// Gene level cycle values
const GENE_LEVELS = [0.3, 0.5, 0.7, 0.9];

// ============================================
// UNIFIED CHAOS MODEL
// ============================================
// 
// Core insight: AI is an accelerant. It amplifies whatever state you're in.
// - Low FOE + High AI = CHAOS (velocity without control)
// - High FOE + High AI = FLOW (velocity with control)
//
// The spine genes convert AI capacity into evidence.
// Without spine, AI creates risk. With spine, AI creates permission.

/**
 * Compute spine strength (average of the 4 spine genes)
 */
function computeSpineStrength(genes: GeneLevels): number {
  return (genes.constraints + genes.verification + genes.operability + genes.governance) / 4;
}

/**
 * Compute chaos level - uncontrolled velocity
 * Chaos = AI pressure × lack of spine
 */
function computeChaos(aiFactor: number, spineStrength: number): number {
  return aiFactor * (1 - spineStrength);
}

/**
 * Compute control level - harnessed velocity  
 * Control = spine's ability to channel AI
 */
function computeControl(aiFactor: number, spineStrength: number): number {
  return spineStrength * aiFactor;
}

/**
 * Logarithmic curve for spine effects
 * Gradual change near the middle, accelerates at extremes
 * Returns -1 to +1 based on spine relative to 0.5 threshold
 */
function spineEffectCurve(spineStrength: number): number {
  const centered = spineStrength - 0.5; // -0.5 to +0.5
  // Power curve: gradual near center, steep at edges
  const sign = centered >= 0 ? 1 : -1;
  const magnitude = Math.pow(Math.abs(centered) * 2, 1.4); // 1.4 = curve steepness
  return sign * magnitude;
}

/**
 * Risk = chaos manifested
 * High AI + weak spine = high risk
 * High AI + strong spine = near zero risk
 */
function computeRisk(aiFactor: number, spineStrength: number): number {
  const chaos = computeChaos(aiFactor, spineStrength);
  // Steeper curve: risk drops fast as chaos decreases
  // At chaos 0.1 (full AI + full FOE): ~3%
  // At chaos 0.5 (full AI + mid FOE): ~35%
  // At chaos 0.7 (full AI + low FOE): ~55%
  const risk = Math.pow(chaos, 1.3) * 120;
  return Math.max(0, Math.min(100, risk));
}

/**
 * Evidence = what the spine produces from AI capacity
 * No spine = evidence doesn't scale with AI
 * Strong spine = evidence multiplies with AI
 */
function computeEvidenceYield(aiFactor: number, spineStrength: number): number {
  const control = computeControl(aiFactor, spineStrength);
  // Base evidence from spine + AI-boosted evidence
  const baseEvidence = spineStrength * 30; // Some evidence even without AI
  const aiEvidence = control * 80; // AI multiplies spine effectiveness
  return Math.max(0, Math.min(100, baseEvidence + aiEvidence));
}

/**
 * Permission = evidence - risk (the net outcome)
 * This is what you're actually allowed to ship/deploy
 * Target: ~100% at full AI + full FOE
 */
function computePermission(evidence: number, risk: number, spineStrength: number): number {
  // Permission = evidence minus risk penalty, with spine providing baseline
  const basePermission = spineStrength * 15;
  const netPermission = basePermission + evidence * 0.85 - risk * 0.4;
  return Math.max(0, Math.min(100, netPermission));
}

/**
 * Outcomes = permission gates product effectiveness
 * You can only deliver outcomes if you have permission to ship
 */
function computeOutcomes(permission: number, genes: GeneLevels, aiFactor: number): number {
  const productGeneAvg = (genes.discovery + genes.tradeoffs + genes.adoption + genes.strategy) / 4;
  // AI boosts potential outcomes, but permission gates actual delivery
  const potential = productGeneAvg * (1 + aiFactor * 0.5) * 100;
  const realized = potential * (permission / 100);
  return Math.max(0, Math.min(100, realized));
}

/**
 * Throughput = raw capacity (how fast you CAN move)
 * This is velocity - good or bad depending on control
 */
function computeThroughput(aiFactor: number, genes: GeneLevels): number {
  const educationAvg = (genes.mentalModels + genes.communication + genes.enablement + genes.cognitiveErgonomics) / 4;
  // AI dramatically boosts throughput, education genes help harness it
  const throughput = (1 + aiFactor * 3) * educationAvg * 50;
  return Math.max(0, Math.min(100, throughput));
}

function findBottleneck(genes: GeneLevels, aiFactor: number): { name: string; severity: number } {
  // Check spine genes at high AI
  if (aiFactor > 0.5) {
    const spineGeneValues = SPINE_GENES.map(id => ({ 
      id, 
      value: genes[id as keyof GeneLevels] 
    }));
    
    const weakest = spineGeneValues.reduce((min, curr) => 
      curr.value < min.value ? curr : min
    );
    
    if (weakest.value < 0.5) {
      const geneNames: Record<string, string> = {
        constraints: 'Constraints',
        verification: 'Verification',
        operability: 'Operability',
        governance: 'Governance',
      };
      return {
        name: `${geneNames[weakest.id]} at ${Math.round(weakest.value * 100)}%`,
        severity: (0.5 - weakest.value) * 150,
      };
    }
  }
  
  return { name: 'None detected', severity: 0 };
}

function CircuitFlowVisualization({
  interactive = true,
  initialAiFactor = 0,
  initialPreset,
  onGeneClick,
  onGeneRightClick,
}: CircuitFlowVisualizationProps): React.ReactElement {
  // State - start at low FOE maturity, no AI (the "toil" baseline)
  const [aiFactor, setAiFactor] = useState(0);
  const [foeMaturity, setFoeMaturity] = useState(0.15);
  const [geneLevels, setGeneLevels] = useState<GeneLevels>(
    geneLevelsFromMaturity(0.15)
  );
  
  // Computed circuit state using unified chaos model
  const circuitState = useMemo(() => {
    const spineStrength = computeSpineStrength(geneLevels);
    const chaos = computeChaos(aiFactor, spineStrength);
    const control = computeControl(aiFactor, spineStrength);
    
    // Core outputs
    const risk = computeRisk(aiFactor, spineStrength);
    const evidenceYield = computeEvidenceYield(aiFactor, spineStrength);
    const permission = computePermission(evidenceYield, risk, spineStrength);
    const outcomes = computeOutcomes(permission, geneLevels, aiFactor);
    const throughput = computeThroughput(aiFactor, geneLevels);
    const bottleneck = findBottleneck(geneLevels, aiFactor);
    
    return {
      spineStrength,
      chaos,
      control,
      evidenceYield,
      risk,
      permission,
      outcomes,
      throughput,
      bottleneck,
    };
  }, [geneLevels, aiFactor]);
  
  // Insight text
  const insight = useMemo(() => {
    return generateInsight(
      aiFactor,
      circuitState.spineStrength,
      circuitState.permission,
      circuitState.risk
    );
  }, [aiFactor, circuitState]);
  
  // Flow speeds
  const inputFlowSpeed = useMemo(() => 0.5 + aiFactor * 1.5, [aiFactor]);
  const outputFlowSpeed = useMemo(
    () => inputFlowSpeed * (circuitState.permission / 100),
    [inputFlowSpeed, circuitState.permission]
  );
  
  // Handlers
  const handleGeneClick = useCallback((geneId: string) => {
    if (!interactive) return;
    
    setGeneLevels(prev => {
      const currentLevel = prev[geneId as keyof GeneLevels];
      const currentIndex = GENE_LEVELS.findIndex(l => Math.abs(l - currentLevel) < 0.05);
      const nextIndex = (currentIndex + 1) % GENE_LEVELS.length;
      return { ...prev, [geneId]: GENE_LEVELS[nextIndex] };
    });
    
    onGeneClick?.(geneId);
  }, [interactive, onGeneClick]);
  
  const handleGeneRightClick = useCallback((geneId: string) => {
    onGeneRightClick?.(geneId);
  }, [onGeneRightClick]);
  
  const handleAIFactorChange = useCallback((value: number) => {
    setAiFactor(value);
  }, []);
  
  const handleFOEMaturityChange = useCallback((value: number) => {
    setFoeMaturity(value);
    setGeneLevels(geneLevelsFromMaturity(value));
  }, []);
  
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>The Permission Circuit</h2>
        <p className={styles.subtitle}>
          AI expands capacity (voltage). The genome converts it into permission (current).
        </p>
      </div>
      
      {/* Main Circuit Layout */}
      <div className={styles.circuitLayout}>
        {/* Left: Client Needs */}
        <VoltagePanel aiFactor={aiFactor} spineStrength={circuitState.spineStrength} animated={true} />
        
        {/* Flow Lines: Input */}
        <FlowLines 
          direction="in" 
          speed={inputFlowSpeed} 
          intensity={0.5 + aiFactor * 0.5}
        />
        
        {/* Center: Genome Honeycomb */}
        <GenomeHoneycomb
          geneLevels={geneLevels}
          aiFactor={aiFactor}
          onGeneClick={handleGeneClick}
          onGeneRightClick={handleGeneRightClick}
          interactive={interactive}
        />
        
        {/* Flow Lines: Output */}
        <FlowLines 
          direction="out" 
          speed={outputFlowSpeed} 
          intensity={circuitState.permission / 100}
        />
        
        {/* Right: Output Gauges */}
        <OutputGauges
          permission={circuitState.permission}
          risk={circuitState.risk}
          evidenceYield={Math.min(100, circuitState.evidenceYield)}
          outcomes={circuitState.outcomes}
          throughput={circuitState.throughput}
          animated={true}
        />
      </div>
      
      {/* Dual Sliders: AI Factor + FOE Maturity */}
      {interactive && (
        <AIFactorSlider
          aiFactor={aiFactor}
          foeMaturity={foeMaturity}
          onAIFactorChange={handleAIFactorChange}
          onFOEMaturityChange={handleFOEMaturityChange}
        />
      )}
      
      {/* Insight Panel */}
      <InsightPanel
        bottleneck={circuitState.bottleneck.name}
        bottleneckSeverity={circuitState.bottleneck.severity}
        insight={insight}
        aiFactor={aiFactor}
        spineStrength={circuitState.spineStrength}
      />
    </div>
  );
}

export default CircuitFlowVisualization;
export { CircuitFlowVisualization };
export type { CircuitFlowVisualizationProps };
