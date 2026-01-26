/**
 * Icon definitions for FOE Presentation
 * 
 * Uses Lucide React for professional, accessible SVG icons.
 * Replaces emoji usage for better cross-platform consistency
 * and accessibility compliance.
 */
import {
  Brain,
  RefreshCw,
  Shield,
  BookOpen,
  Megaphone,
  Dice5,
  Frown,
  AlertTriangle,
  Loader2,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';

/**
 * Core principle icons - the three pillars of FOE
 */
export const PrincipleIcons: Record<string, LucideIcon> = {
  understanding: Brain,
  feedback: RefreshCw,
  confidence: Shield,
};

/**
 * Colors associated with each principle
 */
export const PrincipleColors = {
  understanding: '#3EC5BB',
  feedback: '#CC8BFA',
  confidence: '#3B82F6',
} as const;

/**
 * Failure mode icons - what happens when principles are missing
 */
export const FailureModeIcons: Record<string, LucideIcon> = {
  theoretical: BookOpen,    // U alone: Analysis paralysis
  noise: Megaphone,         // FF alone: Data without insight
  reckless: Dice5,          // C alone: Move fast, break things
  paralyzed: Frown,         // U + FF without C: Know what's wrong, afraid to act
  arrogant: AlertTriangle,  // U + C without FF: Confident but unchecked
  chaotic: Loader2,         // FF + C without U: Rapid iteration, no direction
};

/**
 * Research/Evidence section icon
 */
export const ResearchIcon = FlaskConical;

/**
 * Default icon props for consistent styling
 */
export const defaultIconProps = {
  strokeWidth: 1.5,
  size: 48,
} as const;

/**
 * Large icon props for hero sections
 */
export const largeIconProps = {
  strokeWidth: 1.5,
  size: 64,
} as const;

/**
 * Small icon props for inline usage
 */
export const smallIconProps = {
  strokeWidth: 2,
  size: 24,
} as const;

export {
  Brain,
  RefreshCw,
  Shield,
  BookOpen,
  Megaphone,
  Dice5,
  Frown,
  AlertTriangle,
  Loader2,
  FlaskConical,
};
