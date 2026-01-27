/**
 * Game Engine Hook
 * Manages game state and runs the simulation loop
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { computeCircuit, CircuitState, GeneLevel, TeamComposition, CircuitInputs } from './circuitModel';

export interface GameState {
  // Configuration
  genes: GeneLevel;
  aiFactor: number;
  team: TeamComposition;
  genePoints: number;
  maxGenePoints: number;
  
  // Circuit state
  circuit: CircuitState;
  
  // Scoring
  score: number;
  sessionTime: number;
  highScore: number;
  
  // Meta
  isRunning: boolean;
  presetName: string | null;
}

const DEFAULT_GENES: GeneLevel = {
  discovery: 5,
  tradeoffs: 5,
  adoption: 5,
  strategy: 5,
  mentalModels: 5,
  communication: 5,
  enablement: 5,
  cognitiveErgonomics: 5,
  constraints: 5,
  verification: 5,
  operability: 5,
  governance: 5,
};

const INITIAL_CIRCUIT: CircuitState = {
  humanCapacity: 0,
  burnoutFactor: 1,
  coordResistance: 0,
  effectiveHumanCapacity: 0,
  baseAIGain: 1,
  safetyFactor: 0.5,
  aiMultiplier: 1,
  demandFactor: 1,
  totalCapacity: 0,
  spineStrength: 0.5,
  evidenceYield: 0,
  permission: 50,
  risk: 20,
  burnout: 0,
  govSatisfaction: 50,
  stakeholderBreakdown: {
    riskOwner: 50,
    missionOwner: 50,
    securityAuthority: 50,
    programManager: 50,
    contractingOfficer: 50,
  },
  outcomesPerTick: 0,
  permissionDelta: 0,
  riskDelta: 0,
  bottleneck: 'None',
  bottleneckSeverity: 0,
};

function calculateUsedPoints(genes: GeneLevel): number {
  return Object.values(genes).reduce((sum, val) => sum + val, 0);
}

export function useGameEngine() {
  const [genes, setGenes] = useState<GeneLevel>(DEFAULT_GENES);
  const [aiFactor, setAiFactor] = useState(0.5);
  const [team, setTeam] = useState<TeamComposition>({ mission: 6, enablement: 6 });
  const [circuit, setCircuit] = useState<CircuitState>(INITIAL_CIRCUIT);
  const [score, setScore] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [presetName, setPresetName] = useState<string | null>(null);
  const [highScore, setHighScore] = useState(0);
  
  const maxGenePoints = 60;
  const genePoints = maxGenePoints - calculateUsedPoints(genes);
  
  const frameRef = useRef<number>();
  const lastTickRef = useRef<number>(Date.now());
  const stateRef = useRef({ permission: 50, risk: 20, burnout: 0 });
  
  // Update gene
  const updateGene = useCallback((geneId: keyof GeneLevel, level: number) => {
    setGenes(prev => {
      const currentUsed = calculateUsedPoints(prev);
      const diff = level - prev[geneId];
      
      // Check if we have enough points
      if (diff > 0 && currentUsed + diff > maxGenePoints) {
        // Not enough points, cap at max possible
        const maxLevel = prev[geneId] + (maxGenePoints - currentUsed);
        return { ...prev, [geneId]: Math.max(0, Math.min(10, maxLevel)) };
      }
      
      return { ...prev, [geneId]: Math.max(0, Math.min(10, level)) };
    });
    setPresetName(null);
  }, [maxGenePoints]);
  
  // Update AI factor
  const updateAI = useCallback((factor: number) => {
    setAiFactor(Math.max(0, Math.min(1, factor)));
    setPresetName(null);
  }, []);
  
  // Update team
  const updateTeam = useCallback((newTeam: TeamComposition) => {
    setTeam({
      mission: Math.max(1, newTeam.mission),
      enablement: Math.max(1, newTeam.enablement),
    });
    setPresetName(null);
  }, []);
  
  // Load preset
  const loadPreset = useCallback((preset: { genes: GeneLevel; aiFactor: number; team: TeamComposition; name: string }) => {
    setGenes(preset.genes);
    setAiFactor(preset.aiFactor);
    setTeam(preset.team);
    setPresetName(preset.name);
    // Reset dynamic state
    stateRef.current = { permission: 50, risk: 20, burnout: 0 };
  }, []);
  
  // Reset game
  const reset = useCallback(() => {
    setGenes(DEFAULT_GENES);
    setAiFactor(0.5);
    setTeam({ mission: 6, enablement: 6 });
    setScore(0);
    setSessionTime(0);
    setPresetName(null);
    stateRef.current = { permission: 50, risk: 20, burnout: 0 };
  }, []);
  
  // Toggle pause
  const togglePause = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);
  
  // Simulation loop
  useEffect(() => {
    if (!isRunning) return;
    
    const tick = () => {
      const now = Date.now();
      const deltaMs = now - lastTickRef.current;
      
      if (deltaMs >= 100) { // 10 ticks per second
        lastTickRef.current = now;
        const deltaSec = deltaMs / 1000;
        
        // Compute circuit
        const inputs: CircuitInputs = { genes, aiFactor, team };
        const newCircuit = computeCircuit(inputs, stateRef.current);
        
        // Update persistent state
        stateRef.current = {
          permission: newCircuit.permission,
          risk: newCircuit.risk,
          burnout: newCircuit.burnout,
        };
        
        setCircuit(newCircuit);
        setScore(prev => {
          const newScore = prev + newCircuit.outcomesPerTick * deltaSec;
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });
        setSessionTime(prev => prev + deltaSec);
      }
      
      frameRef.current = requestAnimationFrame(tick);
    };
    
    lastTickRef.current = Date.now();
    frameRef.current = requestAnimationFrame(tick);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isRunning, genes, aiFactor, team, highScore]);
  
  return {
    // State
    genes,
    aiFactor,
    team,
    circuit,
    score,
    sessionTime,
    isRunning,
    genePoints,
    maxGenePoints,
    presetName,
    highScore,
    
    // Actions
    updateGene,
    updateAI,
    updateTeam,
    loadPreset,
    reset,
    togglePause,
  };
}

export type GameEngine = ReturnType<typeof useGameEngine>;
