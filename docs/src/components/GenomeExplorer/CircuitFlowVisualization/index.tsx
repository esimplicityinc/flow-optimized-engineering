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
import AIFactorSlider, { PRESETS } from './AIFactorSlider';
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

// Circuit computation functions (simplified from circuitModel.ts)
function computeSpineStrength(genes: GeneLevels): number {
  return (genes.constraints + genes.verification + genes.operability + genes.governance) / 4;
}

function computeAIMultiplier(aiFactor: number, genes: GeneLevels): number {
  const baseGain = 1 + (aiFactor * 4);
  const safetyFactor = Math.sqrt((genes.constraints * genes.verification));
  return baseGain * Math.max(0.2, safetyFactor);
}

function computeEvidenceYield(genes: GeneLevels, totalCapacity: number): number {
  const spineStrength = computeSpineStrength(genes);
  return totalCapacity * spineStrength * 100;
}

function computePermission(evidenceYield: number, risk: number, spineStrength: number): number {
  const base = evidenceYield * 0.5 + spineStrength * 30;
  const riskPenalty = risk * 0.3;
  return Math.max(0, Math.min(100, base - riskPenalty));
}

function computeRisk(aiFactor: number, spineStrength: number): number {
  const baseRisk = aiFactor * 50 * (1 - spineStrength);
  return Math.max(0, Math.min(100, baseRisk));
}

function computeOutcomes(permission: number, genes: GeneLevels): number {
  const productGeneAvg = (genes.discovery + genes.tradeoffs + genes.adoption + genes.strategy) / 4;
  return (permission / 100) * productGeneAvg * 100;
}

function computeThroughput(aiFactor: number, aiMultiplier: number, genes: GeneLevels): number {
  const educationAvg = (genes.mentalModels + genes.communication + genes.enablement + genes.cognitiveErgonomics) / 4;
  return Math.min(100, (aiMultiplier * 20) * educationAvg);
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
  initialAiFactor = 0.5,
  initialPreset,
  onGeneClick,
  onGeneRightClick,
}: CircuitFlowVisualizationProps): React.ReactElement {
  // State
  const [aiFactor, setAiFactor] = useState(initialAiFactor);
  const [geneLevels, setGeneLevels] = useState<GeneLevels>(
    initialPreset 
      ? PRESETS.find(p => p.id === initialPreset)?.genes || DEFAULT_GENES
      : DEFAULT_GENES
  );
  const [activePreset, setActivePreset] = useState<string | undefined>(initialPreset);
  
  // Computed circuit state
  const circuitState = useMemo(() => {
    const spineStrength = computeSpineStrength(geneLevels);
    const aiMultiplier = computeAIMultiplier(aiFactor, geneLevels);
    const totalCapacity = aiMultiplier * 0.5;
    const evidenceYield = computeEvidenceYield(geneLevels, totalCapacity);
    const risk = computeRisk(aiFactor, spineStrength);
    const permission = computePermission(evidenceYield, risk, spineStrength);
    const outcomes = computeOutcomes(permission, geneLevels);
    const throughput = computeThroughput(aiFactor, aiMultiplier, geneLevels);
    const bottleneck = findBottleneck(geneLevels, aiFactor);
    
    return {
      spineStrength,
      aiMultiplier,
      totalCapacity,
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
    
    setActivePreset(undefined); // Clear preset when manually adjusting
    onGeneClick?.(geneId);
  }, [interactive, onGeneClick]);
  
  const handleGeneRightClick = useCallback((geneId: string) => {
    onGeneRightClick?.(geneId);
  }, [onGeneRightClick]);
  
  const handleAIFactorChange = useCallback((value: number) => {
    setAiFactor(value);
    setActivePreset(undefined); // Clear preset when manually adjusting
  }, []);
  
  const handlePresetSelect = useCallback((presetId: string) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setAiFactor(preset.aiFactor);
      setGeneLevels(preset.genes);
      setActivePreset(presetId);
    }
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
        {/* Left: Voltage Sources */}
        <VoltagePanel aiFactor={aiFactor} animated={true} />
        
        {/* Flow Lines: Input */}
        <FlowLines 
          direction="in" 
          speed={inputFlowSpeed} 
          intensity={0.5 + aiFactor * 0.5}
          geneLevels={geneLevels}
          aiFactor={aiFactor}
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
          geneLevels={geneLevels}
          aiFactor={aiFactor}
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
      
      {/* AI Factor Slider */}
      {interactive && (
        <AIFactorSlider
          value={aiFactor}
          onChange={handleAIFactorChange}
          onPresetSelect={handlePresetSelect}
          activePreset={activePreset}
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
