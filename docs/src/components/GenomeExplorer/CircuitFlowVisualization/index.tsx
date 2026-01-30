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
 * Risk = baseline operational risk + chaos-driven risk
 * Baseline: 10% (inherent risk of doing anything)
 * High AI + weak spine = high risk
 * High AI + strong spine = drops below baseline (systems reduce risk)
 */
function computeRisk(aiFactor: number, spineStrength: number): number {
  const chaos = computeChaos(aiFactor, spineStrength);
  const control = computeControl(aiFactor, spineStrength);
  
  // Baseline operational risk
  const baseRisk = 10;
  
  // Chaos adds risk (accelerating)
  const chaosRisk = Math.pow(chaos, 1.2) * 100;
  
  // Control reduces risk (strong spine + AI = safer than no AI)
  const controlReduction = Math.pow(control, 0.8) * 12;
  
  const risk = baseRisk + chaosRisk - controlReduction;
  return Math.max(0, Math.min(100, risk));
}

/**
 * Evidence = what the spine produces from AI capacity
 * No spine = evidence collapses at high AI (can't document chaos)
 * Strong spine = evidence multiplies with AI
 * 
 * Key insight: At high AI + weak spine, you're moving too fast to capture evidence.
 * The system becomes illegible. At AI=1 with weak spine, evidence → near zero.
 */
function computeEvidenceYield(aiFactor: number, spineStrength: number): number {
  // Base evidence from spine (exists even without AI)
  const baseEvidence = spineStrength * 30;
  
  // AI-boosted evidence when spine can harness it
  const control = computeControl(aiFactor, spineStrength);
  const aiEvidence = control * 80;
  
  // Chaos penalty: high AI + weak spine = evidence collapses
  // At AI=1 with spineStrength=0.15, this should drive evidence near zero
  const chaos = aiFactor * (1 - spineStrength);
  const chaosPenalty = Math.pow(chaos, 1.3) * 120; // Aggressive penalty
  
  const total = baseEvidence + aiEvidence - chaosPenalty;
  return Math.max(0, Math.min(100, total));
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
 * 
 * Key insight: Past AI=0.3 without spine, throughput degrades.
 * You're "moving fast" but actually stuck in rework loops, 
 * context switching, and firefighting. Effective throughput drops.
 */
function computeThroughput(aiFactor: number, genes: GeneLevels): number {
  const educationAvg = (genes.mentalModels + genes.communication + genes.enablement + genes.cognitiveErgonomics) / 4;
  const spineStrength = (genes.constraints + genes.verification + genes.operability + genes.governance) / 4;
  
  // Base throughput from education genes
  const baseThroughput = educationAvg * 50;
  
  if (aiFactor <= 0.3) {
    // Up to 0.3 AI: linear boost regardless of spine
    const aiBoost = aiFactor * 3 * educationAvg * 50;
    return Math.max(0, Math.min(100, baseThroughput + aiBoost));
  } else {
    // Past 0.3 AI: throughput depends on spine
    // Weak spine = throughput drops (chaos, rework, firefighting)
    // Strong spine = throughput continues to grow
    
    // Calculate throughput at the 0.3 threshold
    const throughputAt03 = (1 + 0.3 * 3) * educationAvg * 50;
    
    // Excess AI beyond the threshold
    const excessAI = aiFactor - 0.3;
    
    // Spine effect: below 0.5 = negative, above 0.5 = positive
    // At spineStrength=0.15, this is strongly negative
    // At spineStrength=0.8, this is positive
    const spineEffect = (spineStrength - 0.5) * 2; // Range: -1 to +1
    
    // Change in throughput based on spine
    // At weak spine (0.15): spineEffect = -0.7, so throughput drops
    // At strong spine (0.8): spineEffect = +0.6, so throughput grows
    const change = excessAI * spineEffect * 100;
    
    return Math.max(0, Math.min(100, throughputAt03 + change));
  }
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
