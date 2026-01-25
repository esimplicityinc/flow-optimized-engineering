/**
 * Field Guides - Shared Types and Constants
 *
 * This module defines the maturity model for methods and guides,
 * as well as types for experiments and their relationships.
 */

// =============================================================================
// Maturity Levels
// =============================================================================

export type MaturityLevel = 'hypothesized' | 'experimenting' | 'validated' | 'proven';

export type ExperimentStatus = 'in-progress' | 'completed';

export interface MaturityConfig {
  level: MaturityLevel;
  value: number;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

export const MATURITY_LEVELS: Record<MaturityLevel, MaturityConfig> = {
  hypothesized: {
    level: 'hypothesized',
    value: 1,
    label: 'Hypothesized',
    description: 'Proposed method, no experiments yet',
    color: '#6b7280', // gray-500
    bgColor: '#f3f4f6', // gray-100
  },
  experimenting: {
    level: 'experimenting',
    value: 2,
    label: 'Experimenting',
    description: 'Active experiments in progress',
    color: '#ca8a04', // yellow-600
    bgColor: '#fef9c3', // yellow-100
  },
  validated: {
    level: 'validated',
    value: 3,
    label: 'Validated',
    description: 'Supporting evidence from experiments',
    color: '#2563eb', // blue-600
    bgColor: '#dbeafe', // blue-100
  },
  proven: {
    level: 'proven',
    value: 4,
    label: 'Proven',
    description: 'Multiple experiments, widely applicable',
    color: '#16a34a', // green-600
    bgColor: '#dcfce7', // green-100
  },
};

export const EXPERIMENT_STATUS: Record<ExperimentStatus, { label: string; color: string }> = {
  'in-progress': {
    label: 'In Progress',
    color: '#ca8a04', // yellow-600
  },
  completed: {
    label: 'Completed',
    color: '#16a34a', // green-600
  },
};

// =============================================================================
// Maturity Thresholds for Guide Calculations
// =============================================================================

export interface MaturityThreshold {
  min: number;
  max: number;
  level: MaturityLevel;
}

export const MATURITY_THRESHOLDS: MaturityThreshold[] = [
  { min: 0, max: 1.5, level: 'hypothesized' },
  { min: 1.5, max: 2.5, level: 'experimenting' },
  { min: 2.5, max: 3.5, level: 'validated' },
  { min: 3.5, max: 4, level: 'proven' },
];

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Calculate the average maturity value from an array of maturity levels
 */
export function calculateAverageMaturity(levels: MaturityLevel[]): number {
  if (levels.length === 0) return 0;

  const total = levels.reduce((sum, level) => sum + MATURITY_LEVELS[level].value, 0);
  return total / levels.length;
}

/**
 * Get the maturity level label from an average value
 */
export function getMaturityLevelFromAverage(average: number): MaturityLevel {
  for (const threshold of MATURITY_THRESHOLDS) {
    if (average >= threshold.min && average < threshold.max) {
      return threshold.level;
    }
  }
  // Edge case: exactly 4
  if (average >= 4) return 'proven';
  return 'hypothesized';
}

/**
 * Get maturity config from a level
 */
export function getMaturityConfig(level: MaturityLevel): MaturityConfig {
  return MATURITY_LEVELS[level];
}

/**
 * Format maturity score for display (e.g., "3.2/4")
 */
export function formatMaturityScore(average: number): string {
  return `${average.toFixed(1)}/4`;
}

/**
 * Calculate maturity percentage (0-100)
 */
export function calculateMaturityPercentage(average: number): number {
  return Math.round((average / 4) * 100);
}

// =============================================================================
// Frontmatter Types
// =============================================================================

export interface MethodFrontmatter {
  title: string;
  sidebar_position?: number;
  maturity: MaturityLevel;
  experiments?: string[];
}

export interface ExperimentFrontmatter {
  title: string;
  sidebar_position?: number;
  status: ExperimentStatus;
  methods?: string[];
}

export interface GuideFrontmatter {
  title: string;
  sidebar_position?: number;
}
