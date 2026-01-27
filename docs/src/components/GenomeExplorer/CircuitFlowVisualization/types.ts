/**
 * Type definitions for CircuitFlowVisualization
 */

// Gene level record (0-1 scale)
export interface GeneLevels {
  discovery: number;
  tradeoffs: number;
  adoption: number;
  strategy: number;
  mentalModels: number;
  communication: number;
  enablement: number;
  cognitiveErgonomics: number;
  constraints: number;
  verification: number;
  operability: number;
  governance: number;
}

// Voltage source definition
export interface VoltageSource {
  id: string;
  name: string;
  description: string;
  baseLevel: number;
  aiMultiplier: number; // How AI factor affects this source
  color: string;
}

// Impedance factor definition
export interface ImpedanceFactor {
  id: string;
  name: string;
  description: string;
  level: number; // 0-1, higher = more resistance
}

// Output gauge definition
export interface OutputGauge {
  id: string;
  label: string;
  value: number;
  color: string;
  inverse?: boolean; // If true, high value = bad (like risk)
  primary?: boolean; // If true, render larger
}

// Demand gap result for a gene
export interface DemandGapResult {
  geneId: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number; // positive = surplus, negative = under capacity
  status: 'critical' | 'warning' | 'balanced' | 'surplus';
  color: string;
}

// Delivery mode types
export type DeliveryMode = 'human' | 'hybrid' | 'system';

// Gene delivery configuration - how easily a gene can be productized
export interface GeneDeliveryConfig {
  id: string;
  name: string;
  baseSystemRatio: number;    // Inherent system component (0.2 - 0.55)
  scalabilityFactor: number;  // How much it shifts under pressure (0.3 - 0.95)
}

// Delivery mode result for a gene
export interface DeliveryModeResult {
  geneId: string;
  systemRatio: number;        // 0-1, how much system vs human
  mode: DeliveryMode;         // Threshold-based category
  color: string;              // Color for this mode
}

// Delivery mode colors (exclusive - don't overlap with domain colors)
export const DELIVERY_MODE_COLORS = {
  human: '#F59E0B',   // Orange - primarily human service
  hybrid: '#FBBF24',  // Yellow - balanced human + system  
  system: '#06B6D4',  // Cyan - primarily system/product
} as const;

// Circuit state (computed values)
export interface CircuitState {
  // Voltage totals
  totalVoltage: number;
  effectiveVoltage: number;
  
  // Capacity
  humanCapacity: number;
  aiMultiplier: number;
  totalCapacity: number;
  
  // Spine/Evidence
  spineStrength: number;
  evidenceYield: number;
  
  // Outputs
  permission: number;
  risk: number;
  outcomes: number;
  throughput: number;
  
  // Analysis
  bottleneck: string;
  bottleneckSeverity: number;
}

// Preset configuration
export interface Preset {
  id: string;
  name: string;
  description: string;
  aiFactor: number;
  genes: GeneLevels;
}

// Component props
export interface CircuitFlowVisualizationProps {
  interactive?: boolean;
  initialAiFactor?: number;
  initialPreset?: string;
  onGeneClick?: (geneId: string) => void;
  onGeneRightClick?: (geneId: string) => void;
}

export interface VoltagePanelProps {
  aiFactor: number;
  animated?: boolean;
}

export interface GenomeHoneycombProps {
  geneLevels: GeneLevels;
  aiFactor: number;
  onGeneClick: (geneId: string) => void;
  onGeneRightClick: (geneId: string) => void;
  interactive: boolean;
}

export interface OutputGaugesProps {
  permission: number;
  risk: number;
  evidenceYield: number;
  outcomes: number;
  throughput: number;
  animated?: boolean;
}

export interface FlowLinesProps {
  direction: 'in' | 'out';
  speed: number;
  intensity: number; // 0-1, affects opacity/particle density
  geneLevels: GeneLevels;
  aiFactor: number;
}

export interface AIFactorSliderProps {
  value: number;
  onChange: (value: number) => void;
  onPresetSelect: (presetId: string) => void;
}

export interface InsightPanelProps {
  bottleneck: string;
  bottleneckSeverity: number;
  insight: string;
  aiFactor: number;
  spineStrength: number;
}
