/**
 * EcosystemDiagram Data
 * 
 * Defines nodes, edges, and metadata for the eSimplicity ecosystem diagram.
 * Based on the organizational structure showing how FOE, KATALYST, PRIMA, 
 * and teams interconnect.
 */

import { Node, Edge, MarkerType } from 'reactflow';

// Ecosystem Colors
export const COLORS = {
  team: '#3223BD',           // Purple - teams/actors
  concept: '#3EC5BB',        // Teal - concepts/frameworks
  platform: '#3B82F6',       // Blue - KATALYST
  product: '#CC8BFA',        // Light purple - PRIMA
  subcomponent: '#6B7280',   // Gray - sub-components
  governance: '#F59E0B',     // Amber - governance alignment
};

export interface EcosystemNodeData {
  label: string;
  description: string;
  link?: string;
  icon: string;
  category: 'team' | 'concept' | 'platform' | 'subcomponent';
  subComponents?: string[];
}

// Node definitions
export const nodes: Node<EcosystemNodeData>[] = [
  // === TEAMS / ACTORS ===
  {
    id: 'gov-delivery-teams',
    type: 'teamNode',
    position: { x: 100, y: 50 },
    data: {
      label: 'Gov Delivery Teams',
      description: 'Government program delivery teams that use eSimplicity solutions',
      icon: 'Building2',
      category: 'team',
    },
  },
  {
    id: 'technical-review-board',
    type: 'teamNode',
    position: { x: 400, y: 50 },
    data: {
      label: 'Technical Review Board',
      description: 'Governance body that ensures alignment to engineering standards',
      icon: 'Shield',
      category: 'team',
    },
  },
  {
    id: 'ric-team-1',
    type: 'teamNode',
    position: { x: 100, y: 200 },
    data: {
      label: 'RIC Team 1 (Prima)',
      description: 'Team responsible for building and maintaining PRIMA',
      icon: 'Users',
      category: 'team',
    },
  },
  {
    id: 'ric-team-2',
    type: 'teamNode',
    position: { x: 400, y: 200 },
    data: {
      label: 'RIC Team 2 (Katalyst)',
      description: 'Team responsible for KATALYST platform development',
      icon: 'Users',
      category: 'team',
    },
  },
  {
    id: 'ric-team-3',
    type: 'teamNode',
    position: { x: 700, y: 200 },
    data: {
      label: 'RIC Team 3 (Aaron)',
      description: 'Bridge between business demand and platform reality',
      icon: 'UserCog',
      category: 'team',
    },
  },

  // === CONCEPTS / FRAMEWORKS ===
  {
    id: 'shine',
    type: 'conceptNode',
    position: { x: 100, y: 350 },
    data: {
      label: 'Shine',
      description: 'The lens through which Gov Delivery Teams see their work',
      icon: 'Sun',
      category: 'concept',
    },
  },
  {
    id: 'practices',
    type: 'conceptNode',
    position: { x: 100, y: 500 },
    data: {
      label: 'Practices',
      description: 'Operational practices surfaced through Shine',
      icon: 'ListChecks',
      category: 'concept',
    },
  },
  {
    id: 'foe',
    type: 'conceptNode',
    position: { x: 400, y: 350 },
    data: {
      label: 'Flow Optimized Engineering',
      description: 'The governing ontology that everything aligns to',
      link: '/docs/intro/what-is-foe',
      icon: 'Compass',
      category: 'concept',
    },
  },
  {
    id: 'maturity-model',
    type: 'conceptNode',
    position: { x: 300, y: 500 },
    data: {
      label: 'Maturity Model',
      description: 'Assessment framework for organizational capability',
      link: '/docs/maturity-model/overview',
      icon: 'TrendingUp',
      category: 'concept',
    },
  },
  {
    id: 'field-guides',
    type: 'conceptNode',
    position: { x: 500, y: 500 },
    data: {
      label: 'Engineering Field Guides',
      description: 'Practical guidance backed by evidence',
      link: '/docs/field-guides/overview',
      icon: 'BookOpen',
      category: 'concept',
    },
  },
  {
    id: 'bd-system-needs',
    type: 'conceptNode',
    position: { x: 700, y: 350 },
    data: {
      label: 'BD System Needs',
      description: 'Business development system requirements',
      icon: 'Target',
      category: 'concept',
    },
  },
  {
    id: 'corp-systems',
    type: 'conceptNode',
    position: { x: 700, y: 500 },
    data: {
      label: 'Corp Systems/Integrations',
      description: 'Needed corporate systems and integrations',
      icon: 'Network',
      category: 'concept',
    },
  },

  // === PLATFORMS (Compound Nodes with Sub-components) ===
  {
    id: 'prima',
    type: 'platformNode',
    position: { x: 50, y: 650 },
    data: {
      label: 'PRIMA',
      description: 'Productized surface that runs on and uses KATALYST',
      icon: 'Layers',
      category: 'platform',
      subComponents: ['Control Tower', 'Web', 'Code', 'Engine'],
    },
  },
  {
    id: 'katalyst',
    type: 'platformNode',
    position: { x: 450, y: 650 },
    data: {
      label: 'KATALYST',
      description: 'The gravitational center - complete platform ecosystem',
      link: '/docs/katalyst/overview',
      icon: 'Rocket',
      category: 'platform',
      subComponents: ['Taxonomy', 'Platform'],
    },
  },
];

// Edge definitions with relationship labels
export const edges: Edge[] = [
  // === GOV / PRACTICE FLOW ===
  {
    id: 'e-gov-shine',
    source: 'gov-delivery-teams',
    target: 'shine',
    label: 'Look at',
    animated: true,
    style: { stroke: COLORS.team },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.team },
  },
  {
    id: 'e-shine-practices',
    source: 'shine',
    target: 'practices',
    label: 'Surfaces',
    animated: true,
    style: { stroke: COLORS.concept },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.concept },
  },
  {
    id: 'e-shine-katalyst',
    source: 'shine',
    target: 'katalyst',
    label: 'Runs on',
    animated: true,
    style: { stroke: COLORS.platform },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.platform },
  },
  {
    id: 'e-gov-trb',
    source: 'gov-delivery-teams',
    target: 'technical-review-board',
    label: 'Assessed by',
    style: { stroke: COLORS.team, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.team },
  },
  {
    id: 'e-gov-ric1',
    source: 'gov-delivery-teams',
    target: 'ric-team-1',
    label: 'Uses',
    animated: true,
    style: { stroke: COLORS.team },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.team },
  },

  // === GOVERNANCE ALIGNMENT ===
  {
    id: 'e-trb-foe',
    source: 'technical-review-board',
    target: 'foe',
    label: 'Align to',
    animated: true,
    style: { stroke: COLORS.governance },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.governance },
  },
  {
    id: 'e-foe-maturity',
    source: 'foe',
    target: 'maturity-model',
    label: 'Contains',
    style: { stroke: COLORS.concept },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.concept },
  },
  {
    id: 'e-foe-guides',
    source: 'foe',
    target: 'field-guides',
    label: 'Contains',
    style: { stroke: COLORS.concept },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.concept },
  },

  // === RIC TEAMS ===
  {
    id: 'e-ric1-prima',
    source: 'ric-team-1',
    target: 'prima',
    label: 'Builds',
    animated: true,
    style: { stroke: COLORS.product },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.product },
  },
  {
    id: 'e-ric2-katalyst',
    source: 'ric-team-2',
    target: 'katalyst',
    label: 'Builds',
    animated: true,
    style: { stroke: COLORS.platform },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.platform },
  },
  {
    id: 'e-ric3-katalyst',
    source: 'ric-team-3',
    target: 'katalyst',
    label: 'Uses',
    animated: true,
    style: { stroke: COLORS.platform },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.platform },
  },

  // === PRIMA PLATFORM ===
  {
    id: 'e-prima-katalyst-runs',
    source: 'prima',
    target: 'katalyst',
    label: 'Runs on',
    animated: true,
    style: { stroke: COLORS.platform },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.platform },
  },

  // === BUSINESS / SYSTEMS FLOW ===
  {
    id: 'e-ric3-bd',
    source: 'ric-team-3',
    target: 'bd-system-needs',
    label: 'Builds',
    animated: true,
    style: { stroke: COLORS.team },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.team },
  },
  {
    id: 'e-ric3-corp',
    source: 'ric-team-3',
    target: 'corp-systems',
    label: 'Builds',
    animated: true,
    style: { stroke: COLORS.team },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.team },
  },
  {
    id: 'e-corp-katalyst',
    source: 'corp-systems',
    target: 'katalyst',
    label: 'Runs on',
    animated: true,
    style: { stroke: COLORS.platform },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.platform },
  },
  {
    id: 'e-bd-katalyst',
    source: 'bd-system-needs',
    target: 'katalyst',
    label: 'Informs',
    style: { stroke: COLORS.governance, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.governance },
  },

  // === STRATEGY ALIGNMENT ===
  {
    id: 'e-foe-katalyst',
    source: 'foe',
    target: 'katalyst',
    label: 'Enables',
    animated: true,
    style: { stroke: COLORS.governance },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.governance },
  },
];

// Legend items for the ecosystem diagram
export const legendItems = [
  { color: COLORS.team, label: 'Teams / Actors', shape: 'rounded' },
  { color: COLORS.concept, label: 'Concepts / Frameworks', shape: 'rounded' },
  { color: COLORS.platform, label: 'KATALYST (Platform)', shape: 'rounded' },
  { color: COLORS.product, label: 'PRIMA (Product)', shape: 'rounded' },
  { color: COLORS.governance, label: 'Governance Flow', shape: 'line' },
];

// Simplified mobile view
export const mobileNodes: Node<EcosystemNodeData>[] = [
  {
    id: 'teams',
    type: 'mobileNode',
    position: { x: 50, y: 50 },
    data: {
      label: 'Teams',
      description: 'Gov Delivery, TRB, RIC Teams 1-3',
      icon: 'Users',
      category: 'team',
    },
  },
  {
    id: 'concepts',
    type: 'mobileNode',
    position: { x: 50, y: 175 },
    data: {
      label: 'FOE Framework',
      description: 'Maturity Model, Field Guides, Shine',
      icon: 'Compass',
      category: 'concept',
    },
  },
  {
    id: 'platforms',
    type: 'mobileNode',
    position: { x: 50, y: 300 },
    data: {
      label: 'Platforms',
      description: 'PRIMA runs on KATALYST',
      icon: 'Rocket',
      category: 'platform',
    },
  },
];

export const mobileEdges: Edge[] = [
  {
    id: 'e-mobile-1',
    source: 'teams',
    target: 'concepts',
    label: 'Align to',
    animated: true,
    style: { stroke: COLORS.governance },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.governance },
  },
  {
    id: 'e-mobile-2',
    source: 'concepts',
    target: 'platforms',
    label: 'Enables',
    animated: true,
    style: { stroke: COLORS.platform },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.platform },
  },
];
