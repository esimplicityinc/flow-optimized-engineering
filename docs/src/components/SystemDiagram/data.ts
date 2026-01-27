/**
 * SystemDiagram Data
 * 
 * Defines nodes, edges, and metadata for the FOE system architecture diagram.
 */

import { Node, Edge, MarkerType } from 'reactflow';

// FOE Brand Colors
export const COLORS = {
  primary: '#3223BD',       // Purple - orchestrator agents
  understanding: '#3EC5BB', // Teal - experiments
  feedback: '#CC8BFA',      // Light purple - methods
  confidence: '#3B82F6',    // Blue - field guides
  warning: '#F59E0B',       // Amber - external frameworks
  neutral: '#6B7280',       // Gray - inputs
  scout: '#10B981',         // Green - scout/trends
};

export interface DiagramNodeData {
  label: string;
  description: string;
  link: string;
  icon: string;
  category: 'agent' | 'content' | 'input';
}

// Node definitions
export const nodes: Node<DiagramNodeData>[] = [
  // === INPUT NODES (Sources) ===
  {
    id: 'human-experience',
    type: 'inputNode',
    position: { x: 50, y: 350 },
    data: {
      label: 'Human Experience',
      description: 'Engineering experiences, projects, lessons learned',
      link: '/docs/field-guides/contributing-experiments',
      icon: 'User',
      category: 'input',
    },
  },
  {
    id: 'repository',
    type: 'inputNode',
    position: { x: 250, y: 450 },
    data: {
      label: 'Repository',
      description: 'Git history, CI/CD, issues, PRs',
      link: '/docs/field-guides/using-ai-agents#prospector',
      icon: 'GitBranch',
      category: 'input',
    },
  },
  {
    id: 'external-source',
    type: 'inputNode',
    position: { x: 550, y: 450 },
    data: {
      label: 'External Framework',
      description: 'Industry frameworks like DORA, BDD, SPACE',
      link: '/docs/field-guides/using-ai-agents#framework-cartographer',
      icon: 'Library',
      category: 'input',
    },
  },
  {
    id: 'web-community',
    type: 'inputNode',
    position: { x: 750, y: 350 },
    data: {
      label: 'Web & Community',
      description: 'Reddit, YouTube, GitHub trends, skills.sh',
      link: '/docs/field-guides/using-ai-agents#scout',
      icon: 'Globe',
      category: 'input',
    },
  },

  // === AGENT NODES (Orchestrators) ===
  {
    id: 'alchemist',
    type: 'agentNode',
    position: { x: 100, y: 200 },
    data: {
      label: 'Alchemist',
      description: 'Transforms experiences into documented experiments',
      link: '/docs/field-guides/using-ai-agents#alchemist',
      icon: 'FlaskConical',
      category: 'agent',
    },
  },
  {
    id: 'prospector',
    type: 'agentNode',
    position: { x: 250, y: 300 },
    data: {
      label: 'Prospector',
      description: 'Mines repos for undocumented experiment opportunities',
      link: '/docs/field-guides/using-ai-agents#prospector',
      icon: 'Search',
      category: 'agent',
    },
  },
  {
    id: 'cartographer',
    type: 'agentNode',
    position: { x: 550, y: 300 },
    data: {
      label: 'Cartographer',
      description: 'Maps external frameworks into FOE structure',
      link: '/docs/field-guides/using-ai-agents#framework-cartographer',
      icon: 'Map',
      category: 'agent',
    },
  },
  {
    id: 'scout',
    type: 'agentNode',
    position: { x: 700, y: 200 },
    data: {
      label: 'Scout',
      description: 'Surveys agentic coding landscape for trends',
      link: '/docs/field-guides/using-ai-agents#scout',
      icon: 'Radar',
      category: 'agent',
    },
  },
  {
    id: 'synthesist',
    type: 'agentNode',
    position: { x: 400, y: 100 },
    data: {
      label: 'Synthesist',
      description: 'Weaves experiments into reusable methods',
      link: '/docs/field-guides/using-ai-agents#synthesist',
      icon: 'Sparkles',
      category: 'agent',
    },
  },

  // === CONTENT NODES (Outputs) ===
  {
    id: 'observations',
    type: 'contentNode',
    position: { x: 200, y: 50 },
    data: {
      label: 'Observations',
      description: 'Documented evidence from real-world application',
      link: '/docs/field-guides/contributing-observations',
      icon: 'TestTube',
      category: 'content',
    },
  },
  {
    id: 'methods',
    type: 'contentNode',
    position: { x: 400, y: -50 },
    data: {
      label: 'Methods',
      description: 'Practical approaches backed by experiments',
      link: '/docs/field-guides/overview',
      icon: 'BookOpen',
      category: 'content',
    },
  },
  {
    id: 'field-guides',
    type: 'contentNode',
    position: { x: 400, y: -150 },
    data: {
      label: 'Field Guides',
      description: 'Curated collections of methods by domain',
      link: '/docs/field-guides/overview',
      icon: 'Compass',
      category: 'content',
    },
  },
  {
    id: 'trend-reports',
    type: 'contentNode',
    position: { x: 700, y: 50 },
    data: {
      label: 'Trend Reports',
      description: 'Intelligence on agentic coding landscape',
      link: '/docs/field-guides/using-ai-agents#scout',
      icon: 'TrendingUp',
      category: 'content',
    },
  },
];

// Edge definitions
export const edges: Edge[] = [
  // Human Experience -> Alchemist -> Experiments
  {
    id: 'e-human-alchemist',
    source: 'human-experience',
    target: 'alchemist',
    animated: true,
    style: { stroke: COLORS.neutral },
  },
  {
    id: 'e-alchemist-observations',
    source: 'alchemist',
    target: 'observations',
    animated: true,
    style: { stroke: COLORS.primary },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.primary },
  },

  // Repository -> Prospector -> Alchemist
  {
    id: 'e-repo-prospector',
    source: 'repository',
    target: 'prospector',
    animated: true,
    style: { stroke: COLORS.neutral },
  },
  {
    id: 'e-prospector-alchemist',
    source: 'prospector',
    target: 'alchemist',
    animated: true,
    style: { stroke: COLORS.primary },
    label: 'opportunities',
    labelStyle: { fontSize: 10, fill: COLORS.neutral },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.primary },
  },

  // External Source -> Cartographer -> Methods
  {
    id: 'e-external-cartographer',
    source: 'external-source',
    target: 'cartographer',
    animated: true,
    style: { stroke: COLORS.neutral },
  },
  {
    id: 'e-cartographer-methods',
    source: 'cartographer',
    target: 'methods',
    animated: true,
    style: { stroke: COLORS.warning },
    label: 'adopted',
    labelStyle: { fontSize: 10, fill: COLORS.neutral },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.warning },
  },

  // Web -> Scout -> Trend Reports
  {
    id: 'e-web-scout',
    source: 'web-community',
    target: 'scout',
    animated: true,
    style: { stroke: COLORS.neutral },
  },
  {
    id: 'e-scout-trends',
    source: 'scout',
    target: 'trend-reports',
    animated: true,
    style: { stroke: COLORS.scout },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.scout },
  },

  // Observations -> Synthesist -> Methods
  {
    id: 'e-observations-synthesist',
    source: 'observations',
    target: 'synthesist',
    animated: true,
    style: { stroke: COLORS.understanding },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.understanding },
  },
  {
    id: 'e-synthesist-methods',
    source: 'synthesist',
    target: 'methods',
    animated: true,
    style: { stroke: COLORS.feedback },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.feedback },
  },

  // Methods <-> Observations (bidirectional link)
  {
    id: 'e-methods-observations',
    source: 'methods',
    target: 'observations',
    style: { stroke: COLORS.feedback, strokeDasharray: '5,5' },
    label: 'linked',
    labelStyle: { fontSize: 10, fill: COLORS.neutral },
  },

  // Methods -> Field Guides
  {
    id: 'e-methods-guides',
    source: 'methods',
    target: 'field-guides',
    animated: true,
    style: { stroke: COLORS.confidence },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.confidence },
  },

  // Trend Reports -> Methods (informs)
  {
    id: 'e-trends-methods',
    source: 'trend-reports',
    target: 'methods',
    style: { stroke: COLORS.scout, strokeDasharray: '5,5' },
    label: 'informs',
    labelStyle: { fontSize: 10, fill: COLORS.neutral },
  },
];

// Legend items
export const legendItems = [
  { color: COLORS.primary, label: 'Orchestrator Agents', shape: 'rounded' },
  { color: COLORS.understanding, label: 'Observations', shape: 'rounded' },
  { color: COLORS.feedback, label: 'Methods', shape: 'rounded' },
  { color: COLORS.confidence, label: 'Field Guides', shape: 'rounded' },
  { color: COLORS.scout, label: 'Trend Reports', shape: 'rounded' },
  { color: COLORS.neutral, label: 'Input Sources', shape: 'circle' },
];

// Simplified mobile nodes (fewer, larger)
export const mobileNodes: Node<DiagramNodeData>[] = [
  {
    id: 'inputs',
    type: 'mobileNode',
    position: { x: 50, y: 300 },
    data: {
      label: 'Sources',
      description: 'Experience, Repos, Frameworks, Web',
      link: '/docs/field-guides/using-ai-agents',
      icon: 'ArrowRight',
      category: 'input',
    },
  },
  {
    id: 'agents',
    type: 'mobileNode',
    position: { x: 50, y: 175 },
    data: {
      label: 'AI Agents',
      description: 'Alchemist, Synthesist, Prospector, Cartographer, Scout',
      link: '/docs/field-guides/using-ai-agents',
      icon: 'Bot',
      category: 'agent',
    },
  },
  {
    id: 'outputs',
    type: 'mobileNode',
    position: { x: 50, y: 50 },
    data: {
      label: 'Outputs',
      description: 'Experiments, Methods, Field Guides',
      link: '/docs/field-guides/overview',
      icon: 'FileText',
      category: 'content',
    },
  },
];

export const mobileEdges: Edge[] = [
  {
    id: 'e-mobile-1',
    source: 'inputs',
    target: 'agents',
    animated: true,
    style: { stroke: COLORS.neutral },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.neutral },
  },
  {
    id: 'e-mobile-2',
    source: 'agents',
    target: 'outputs',
    animated: true,
    style: { stroke: COLORS.primary },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.primary },
  },
];
