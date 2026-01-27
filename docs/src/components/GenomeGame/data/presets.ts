/**
 * Game Presets
 */

import { GeneLevel, TeamComposition } from '../engine/circuitModel';

export interface GamePreset {
  id: string;
  name: string;
  description: string;
  genes: GeneLevel;
  aiFactor: number;
  team: TeamComposition;
}

export const PRESETS: GamePreset[] = [
  {
    id: 'pre-ai-baseline',
    name: 'Pre-AI Baseline',
    description: 'Traditional software delivery without AI. Balanced genes, no AI amplification.',
    genes: {
      discovery: 5, tradeoffs: 5, adoption: 4, strategy: 4,
      mentalModels: 4, communication: 5, enablement: 4, cognitiveErgonomics: 4,
      constraints: 4, verification: 5, operability: 4, governance: 4,
    },
    aiFactor: 0,
    team: { mission: 8, enablement: 4 },
  },
  {
    id: 'ai-chaos',
    name: 'AI Chaos',
    description: 'High AI deployment with weak enablement spine. See what happens when capacity outpaces evidence.',
    genes: {
      discovery: 6, tradeoffs: 6, adoption: 5, strategy: 5,
      mentalModels: 4, communication: 5, enablement: 3, cognitiveErgonomics: 3,
      constraints: 2, verification: 2, operability: 2, governance: 2,
    },
    aiFactor: 0.9,
    team: { mission: 10, enablement: 2 },
  },
  {
    id: 'enablement-leader',
    name: 'Enablement Leader',
    description: 'Strong enablement spine enabling safe AI usage. This is the target state.',
    genes: {
      discovery: 4, tradeoffs: 4, adoption: 5, strategy: 3,
      mentalModels: 5, communication: 5, enablement: 6, cognitiveErgonomics: 5,
      constraints: 6, verification: 7, operability: 6, governance: 6,
    },
    aiFactor: 0.8,
    team: { mission: 4, enablement: 8 },
  },
  {
    id: 'mission-focus',
    name: 'Mission Focus',
    description: 'Product-heavy configuration for delivering features. Moderate AI, balanced spine.',
    genes: {
      discovery: 7, tradeoffs: 7, adoption: 6, strategy: 6,
      mentalModels: 4, communication: 5, enablement: 3, cognitiveErgonomics: 3,
      constraints: 4, verification: 5, operability: 4, governance: 4,
    },
    aiFactor: 0.5,
    team: { mission: 8, enablement: 4 },
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Even distribution across all genes. A good starting point for exploration.',
    genes: {
      discovery: 5, tradeoffs: 5, adoption: 5, strategy: 5,
      mentalModels: 5, communication: 5, enablement: 5, cognitiveErgonomics: 5,
      constraints: 5, verification: 5, operability: 5, governance: 5,
    },
    aiFactor: 0.5,
    team: { mission: 6, enablement: 6 },
  },
  {
    id: 'government-ready',
    name: 'Government Ready',
    description: 'Optimized for government stakeholder satisfaction. Strong governance and evidence.',
    genes: {
      discovery: 4, tradeoffs: 5, adoption: 4, strategy: 4,
      mentalModels: 5, communication: 6, enablement: 5, cognitiveErgonomics: 5,
      constraints: 6, verification: 7, operability: 6, governance: 7,
    },
    aiFactor: 0.6,
    team: { mission: 5, enablement: 7 },
  },
];

export function getPresetById(id: string): GamePreset | undefined {
  return PRESETS.find(p => p.id === id);
}
