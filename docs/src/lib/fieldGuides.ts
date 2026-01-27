/**
 * Field Guides - Shared Types and Constants
 *
 * This module defines the maturity model for methods and guides,
 * as well as types for observations and their relationships.
 */

// =============================================================================
// Maturity Levels
// =============================================================================

export type MaturityLevel = 'hypothesized' | 'observing' | 'validated' | 'proven';

export type ObservationStatus = 'in-progress' | 'completed';

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
    description: 'Proposed method, no observations yet',
    color: '#6b7280', // gray-500
    bgColor: '#f3f4f6', // gray-100
  },
  observing: {
    level: 'observing',
    value: 2,
    label: 'Observing',
    description: 'Active observations in progress',
    color: '#ca8a04', // yellow-600
    bgColor: '#fef9c3', // yellow-100
  },
  validated: {
    level: 'validated',
    value: 3,
    label: 'Validated',
    description: 'Supporting evidence from observations',
    color: '#2563eb', // blue-600
    bgColor: '#dbeafe', // blue-100
  },
  proven: {
    level: 'proven',
    value: 4,
    label: 'Proven',
    description: 'Multiple observations, widely applicable',
    color: '#16a34a', // green-600
    bgColor: '#dcfce7', // green-100
  },
};

export const OBSERVATION_STATUS: Record<ObservationStatus, { label: string; color: string }> = {
  'in-progress': {
    label: 'In Progress',
    color: '#ca8a04', // yellow-600
  },
  completed: {
    label: 'Completed',
    color: '#16a34a', // green-600
  },
};

// Legacy exports for backwards compatibility
export type ExperimentStatus = ObservationStatus;
export const EXPERIMENT_STATUS = OBSERVATION_STATUS;

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
  { min: 1.5, max: 2.5, level: 'observing' },
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
  observations?: string[];
}

export interface ObservationFrontmatter {
  title: string;
  sidebar_position?: number;
  status: ObservationStatus;
  methods?: string[];
}

// Legacy type alias
export type ExperimentFrontmatter = ObservationFrontmatter;

export interface GuideFrontmatter {
  title: string;
  sidebar_position?: number;
  adopted_methods?: AdoptedMethod[];
}

// =============================================================================
// External Frameworks
// =============================================================================

export type FrameworkStatus = 'emerging-standard' | 'well-established' | 'industry-standard';

export interface FrameworkStatusConfig {
  status: FrameworkStatus;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

export const FRAMEWORK_STATUS: Record<FrameworkStatus, FrameworkStatusConfig> = {
  'emerging-standard': {
    status: 'emerging-standard',
    label: 'Emerging Standard',
    description: 'Gaining traction, early adoption phase',
    color: '#ca8a04', // yellow-600
    bgColor: '#fef9c3', // yellow-100
  },
  'well-established': {
    status: 'well-established',
    label: 'Well-Established',
    description: 'Widely recognized, significant adoption',
    color: '#2563eb', // blue-600
    bgColor: '#dbeafe', // blue-100
  },
  'industry-standard': {
    status: 'industry-standard',
    label: 'Industry Standard',
    description: 'De facto standard in the industry',
    color: '#16a34a', // green-600
    bgColor: '#dcfce7', // green-100
  },
};

/**
 * External Framework source metadata
 */
export interface FrameworkSource {
  url: string;
  authors?: string[];
  publication_year?: number;
  organization?: string;
}

/**
 * External Framework frontmatter (overview.md)
 */
export interface FrameworkFrontmatter {
  title: string;
  slug: string;
  sidebar_position?: number;
  status: FrameworkStatus;
  source: FrameworkSource;
  version?: string;
  pillars?: string[];
  related_frameworks?: string[];
  description?: string;
}

/**
 * External Framework method frontmatter
 */
export interface FrameworkMethodFrontmatter {
  title: string;
  sidebar_position?: number;
  pillar?: string;
  description?: string;
}

/**
 * Adopted method reference in field guide frontmatter
 */
export interface AdoptedMethod {
  framework: string;
  method: string;
  foe_maturity: MaturityLevel;
  observations?: string[];
}

// =============================================================================
// Framework Utility Functions
// =============================================================================

/**
 * Get framework status config from a status level
 */
export function getFrameworkStatusConfig(status: FrameworkStatus): FrameworkStatusConfig {
  return FRAMEWORK_STATUS[status];
}

/**
 * Build the path to an external framework method
 */
export function buildFrameworkMethodPath(framework: string, method: string): string {
  return `/external-frameworks/${framework}/methods/${method}`;
}

/**
 * Parse an adopted method into its framework and method parts
 */
export function parseAdoptedMethodRef(ref: string): { framework: string; method: string } | null {
  const parts = ref.split('/');
  if (parts.length !== 2) return null;
  return { framework: parts[0], method: parts[1] };
}
