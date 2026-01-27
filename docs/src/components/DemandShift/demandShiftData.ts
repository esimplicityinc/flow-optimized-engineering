/**
 * Demand Shift Data
 * 
 * Data specific to the "Demand Shift" visualization page.
 * Complements genomeData.ts with demand levels, narrative content, and personas.
 */

// ============================================
// DEMAND LEVELS BY ERA
// ============================================

export type Era = 'preAI' | 'transition' | 'aiEra';

export interface DemandLevel {
  geneId: string;
  geneName: string;
  domain: 'product' | 'education' | 'systems';
  preAI: number;      // 0-1 scale
  transition: number; // 0-1 scale
  aiEra: number;      // 0-1 scale
  isEvidenceEngine: boolean;   // Part of the Evidence Engine (Systems genes)?
}

export const DEMAND_LEVELS: DemandLevel[] = [
  // Product Domain
  { geneId: 'discovery', geneName: 'Discovery', domain: 'product', preAI: 0.4, transition: 0.6, aiEra: 0.7, isEvidenceEngine: false },
  { geneId: 'tradeoffs', geneName: 'Tradeoffs', domain: 'product', preAI: 0.3, transition: 0.7, aiEra: 0.9, isEvidenceEngine: false },
  { geneId: 'adoption', geneName: 'Adoption', domain: 'product', preAI: 0.3, transition: 0.5, aiEra: 0.6, isEvidenceEngine: false },
  { geneId: 'strategy', geneName: 'Strategy', domain: 'product', preAI: 0.2, transition: 0.6, aiEra: 0.8, isEvidenceEngine: false },
  
  // Education Domain
  { geneId: 'mental-models', geneName: 'Mental Models', domain: 'education', preAI: 0.3, transition: 0.5, aiEra: 0.7, isEvidenceEngine: false },
  { geneId: 'communication', geneName: 'Communication', domain: 'education', preAI: 0.4, transition: 0.5, aiEra: 0.6, isEvidenceEngine: false },
  { geneId: 'enablement', geneName: 'Enablement', domain: 'education', preAI: 0.2, transition: 0.6, aiEra: 0.9, isEvidenceEngine: false },
  { geneId: 'cognitive-ergonomics', geneName: 'Cog. Ergonomics', domain: 'education', preAI: 0.1, transition: 0.5, aiEra: 0.9, isEvidenceEngine: false },
  
  // Systems Domain (THE EVIDENCE ENGINE)
  { geneId: 'constraints', geneName: 'Constraints', domain: 'systems', preAI: 0.2, transition: 0.6, aiEra: 0.95, isEvidenceEngine: true },
  { geneId: 'verification', geneName: 'Verification', domain: 'systems', preAI: 0.3, transition: 0.7, aiEra: 0.95, isEvidenceEngine: true },
  { geneId: 'operability', geneName: 'Operability', domain: 'systems', preAI: 0.2, transition: 0.5, aiEra: 0.9, isEvidenceEngine: true },
  { geneId: 'governance', geneName: 'Governance', domain: 'systems', preAI: 0.3, transition: 0.6, aiEra: 0.9, isEvidenceEngine: true },
];

// Legacy skills that were scarce but are now abundant
export const LEGACY_SKILLS: DemandLevel[] = [
  { geneId: 'code-output', geneName: 'Code Output', domain: 'systems', preAI: 0.9, transition: 0.5, aiEra: 0.2, isEvidenceEngine: false },
  { geneId: 'syntax-expertise', geneName: 'Syntax Expertise', domain: 'systems', preAI: 0.8, transition: 0.4, aiEra: 0.1, isEvidenceEngine: false },
  { geneId: 'framework-knowledge', geneName: 'Framework Knowledge', domain: 'systems', preAI: 0.7, transition: 0.4, aiEra: 0.15, isEvidenceEngine: false },
  { geneId: 'implementation-speed', geneName: 'Implementation Speed', domain: 'systems', preAI: 0.85, transition: 0.5, aiEra: 0.2, isEvidenceEngine: false },
];

// ============================================
// GENE SHIFT DETAILS (for expandable cards)
// ============================================

export interface GeneShiftDetail {
  geneId: string;
  preAI: string;
  postAI: string;
  why: string;
  vendorImplication: string;
}

export const GENE_SHIFT_DETAILS: Record<string, GeneShiftDetail> = {
  'constraints': {
    preAI: "Nice to have. Constraints lived in documentation that nobody read.",
    postAI: "Essential. AI generates faster than humans can review - guardrails must be automated.",
    why: "When output is abundant, the bottleneck moves to preventing bad output from escaping.",
    vendorImplication: "Invest in policy-as-code, schema validation, and automated enforcement."
  },
  'verification': {
    preAI: "QA was a phase, not a practice. Manual testing was acceptable.",
    postAI: "Critical. Every change must produce evidence. Trust is built through receipts.",
    why: "AI fluency creates confidence without correctness. Evidence becomes the currency of trust.",
    vendorImplication: "Build verification pipelines that scale with AI output volume."
  },
  'operability': {
    preAI: "Ops was a separate team. 'We build it, they run it.'",
    postAI: "Built-in from day one. Observability is how you know AI is working correctly.",
    why: "You can't trust what you can't see. AI opacity requires compensating visibility.",
    vendorImplication: "Instrument everything. Make state legible by default."
  },
  'governance': {
    preAI: "Gatekeeping meetings and approval theater.",
    postAI: "Automated flow. Compliance is a view into work, not additional work.",
    why: "Manual governance can't keep up with AI velocity. Automation is the only path.",
    vendorImplication: "Make governance automatic, not bureaucratic."
  },
  'enablement': {
    preAI: "Documentation as afterthought. Knowledge lived in expert heads.",
    postAI: "Learning embedded in workflows. Templates that teach, guardrails that guide.",
    why: "AI amplifies whatever developers do - make the right path the obvious path.",
    vendorImplication: "Build golden paths and paved roads, not documentation sites."
  },
  'cognitive-ergonomics': {
    preAI: "Assumed engineers would read docs and make good choices.",
    postAI: "Deliberately designed decision environments. Defaults matter enormously.",
    why: "When developers can generate anything instantly, choosing correctly becomes the hard part.",
    vendorImplication: "Reduce choices. Make defaults excellent. Hide complexity."
  },
  'tradeoffs': {
    preAI: "Deferred hard decisions. Scope managed through negotiation.",
    postAI: "Upfront clarity. Kill criteria before experiments. Fast pivots on evidence.",
    why: "AI lets you build the wrong thing faster than ever. Decision speed is the new bottleneck.",
    vendorImplication: "Train decision muscles. Reward choosing over deferring."
  },
  'strategy': {
    preAI: "Roadmaps as feature lists. Strategy was a leadership exercise.",
    postAI: "Probabilistic bets. Strategy emerges from experiments. Everyone contributes.",
    why: "When shipping is cheap, knowing what to ship becomes the differentiator.",
    vendorImplication: "Treat initiatives as hypotheses. Measure learning, not just delivery."
  },
  'discovery': {
    preAI: "Translated stakeholder requests into backlog items.",
    postAI: "Continuous hypothesis generation. Discovery embedded in delivery.",
    why: "Building fast without understanding is worse than building slow with understanding.",
    vendorImplication: "Validate before building. Evidence before code."
  },
  'adoption': {
    preAI: "Built features, expected users to find them.",
    postAI: "Every capability is a behavior change initiative. Adoption is an engineering concern.",
    why: "Generating features is easy. Getting them used is the hard part.",
    vendorImplication: "Measure time-to-value, not feature completion."
  },
  'mental-models': {
    preAI: "Expertise stayed in expert heads. Complexity was a moat.",
    postAI: "Extracting patterns into teachable frameworks. Expertise must be transferable.",
    why: "AI can't share tacit knowledge. Explicit models become more valuable.",
    vendorImplication: "Name your patterns. Document your decision frameworks."
  },
  'communication': {
    preAI: "Each discipline had its own vocabulary. Translation happened slowly.",
    postAI: "Shared language enables parallel work. Fidelity across boundaries.",
    why: "AI speed requires human alignment speed. Communication is a multiplier.",
    vendorImplication: "Invest in cross-functional fluency. Reward translation."
  },
};

// ============================================
// SECTION CONTENT
// ============================================

export interface SectionContent {
  id: string;
  headline: string;
  subheadline?: string;
  narrative?: string;
  keyInsight?: string;
  expandable?: {
    title: string;
    content: string[];
  };
}

export const SECTION_CONTENT: Record<string, SectionContent> = {
  hero: {
    id: 'hero',
    headline: 'The Demand Shift',
    subheadline: 'What government will need in the AI era',
    narrative: 'A visual guide to the capabilities that become critical when AI transforms software delivery.',
  },
  thesis: {
    id: 'thesis',
    headline: 'AI creates an oversupply of code and a shortage of confidence.',
    keyInsight: 'For 40 years, code was scarce. Now it floods. The bottleneck has moved.',
    expandable: {
      title: 'The Economic Logic',
      content: [
        'For decades, software rewarded a specific combination: syntax tolerance, solo throughput, precision over persuasion.',
        'We\'ve been self-selecting for the opposite of what we need now.',
        'When implementation becomes abundant, the scarce resource shifts to: specification, judgment, evidence, and alignment.',
        'Government agencies face this shift acutely because they operate in a permission economy - speed without proof creates risk, not value.',
      ],
    },
  },
  oldEquation: {
    id: 'old-equation',
    headline: 'The Old Equation',
    subheadline: 'What was valuable before AI',
    narrative: 'In the pre-AI world, code production was the bottleneck. Organizations paid premium for people who could "just write it."',
    expandable: {
      title: 'Historical Context',
      content: [
        'The three historical tiers: Coders → Software Developers → Engineers',
        'You won by being a high-trust compiler: hold large systems in your head, be careful and consistent.',
        'Certifications enforced artificial role boundaries. Expertise was a moat.',
        'Governance was gatekeeping. Ops was a separate team. Documentation was an afterthought.',
      ],
    },
  },
  aiShock: {
    id: 'ai-shock',
    headline: 'Then AI arrived...',
    subheadline: 'The supply shock that changes everything',
    narrative: 'AI doesn\'t just "make coding easier." It fundamentally changes what is scarce and what is abundant.',
    keyInsight: 'The problem isn\'t generation speed. The problem is: who reviews? who verifies? who decides?',
    expandable: {
      title: 'What AI Actually Changes',
      content: [
        'Implementation volume: 5-10x increase in raw output',
        'Variants and rewrites: instant alternative approaches',
        'Boilerplate and integration glue: automated',
        '"Good-looking" output: fluent but not necessarily correct',
        'The catch: AI is a mutation amplifier - it increases both capability and risk',
      ],
    },
  },
  newScarcity: {
    id: 'new-scarcity',
    headline: 'The New Scarcity',
    subheadline: 'Where demand migrates',
    narrative: 'When code floods the system, the bottleneck moves to capabilities that government always needed but rarely prioritized.',
    keyInsight: 'Government didn\'t used to pay for these because demand wasn\'t binding. AI makes them binding.',
  },
  permissionBottleneck: {
    id: 'permission-bottleneck',
    headline: 'The Permission Bottleneck',
    subheadline: 'Why capacity without evidence creates risk, not value',
    narrative: 'Government is a permission economy. AI expands capacity - but permission doesn\'t automatically follow.',
    keyInsight: 'AI expands delivery capacity. Legibility expands permission. Enablement engineering converts capacity into permission.',
    expandable: {
      title: 'The Circuit Model',
      content: [
        'Voltage Sources (Demand): Accountability, Safety, Prestige, AI Shock',
        'Impedance (Resistance): Procurement rigidity, Risk aversion, Legacy architecture, Skill gaps, Trust deficit',
        'The Evidence Engine: Systems genes (C1-C4) that convert capacity into proof',
        'Without a strong Evidence Engine, increased voltage (AI) just increases heat (risk), not current (outcomes)',
      ],
    },
  },
  personas: {
    id: 'personas',
    headline: 'The Ecosystem',
    subheadline: 'Who needs what',
    narrative: 'Understanding the demand side (government) and supply side (vendors) reveals where value flows.',
  },
  winningPlay: {
    id: 'winning-play',
    headline: 'The Winning Play',
    subheadline: 'Build the Evidence Engine first',
    narrative: 'The strategic response is clear: invest in the genes that convert AI capacity into government permission.',
    keyInsight: 'The thing that felt like "overhead" in the old world becomes the enabler in the new one.',
  },
};

// ============================================
// PRE-AI VS POST-AI COMPARISON DATA
// ============================================

export interface ComparisonItem {
  label: string;
  preAI: 'scarce' | 'balanced' | 'abundant';
  postAI: 'scarce' | 'balanced' | 'abundant';
  category: 'collapses' | 'rises' | 'transforms';
}

export const COMPARISON_DATA: ComparisonItem[] = [
  // What collapses (was scarce, now abundant)
  { label: 'Code Output', preAI: 'scarce', postAI: 'abundant', category: 'collapses' },
  { label: 'Syntax Expertise', preAI: 'scarce', postAI: 'abundant', category: 'collapses' },
  { label: 'Framework Knowledge', preAI: 'scarce', postAI: 'abundant', category: 'collapses' },
  { label: 'Implementation Speed', preAI: 'scarce', postAI: 'abundant', category: 'collapses' },
  
  // What rises (was abundant, now scarce)
  { label: 'Verification / Evidence', preAI: 'abundant', postAI: 'scarce', category: 'rises' },
  { label: 'Constraints / Guardrails', preAI: 'abundant', postAI: 'scarce', category: 'rises' },
  { label: 'Observability / Telemetry', preAI: 'abundant', postAI: 'scarce', category: 'rises' },
  { label: 'Governance Automation', preAI: 'abundant', postAI: 'scarce', category: 'rises' },
  { label: 'Cognitive Enablement', preAI: 'abundant', postAI: 'scarce', category: 'rises' },
  
  // What transforms
  { label: 'Decision-Making Capacity', preAI: 'balanced', postAI: 'scarce', category: 'transforms' },
  { label: 'Specification Clarity', preAI: 'balanced', postAI: 'scarce', category: 'transforms' },
  { label: 'Adoption / Behavior Change', preAI: 'balanced', postAI: 'scarce', category: 'transforms' },
];

// ============================================
// PERSONA DETAILS (Extended from genomeData)
// ============================================

export interface PersonaDetail {
  id: string;
  name: string;
  side: 'demand' | 'supply';
  role: string;
  preAIPriority: string;
  postAIPriority: string;
  whatTheyNeed: string[];
  howAIChanges: string;
}

export const PERSONA_DETAILS: PersonaDetail[] = [
  // Demand side
  {
    id: 'risk-owner',
    name: 'Risk Owner',
    side: 'demand',
    role: 'Accountable for organizational risk',
    preAIPriority: 'Compliance artifacts, audit trails',
    postAIPriority: 'Automated evidence, continuous verification',
    whatTheyNeed: ['Proof before permission', 'Evidence at AI speed', 'Automated compliance'],
    howAIChanges: 'Volume of change requires automated evidence. Manual review can\'t keep up.',
  },
  {
    id: 'mission-owner',
    name: 'Mission Owner',
    side: 'demand',
    role: 'Accountable for mission outcomes',
    preAIPriority: 'Features delivered, capabilities shipped',
    postAIPriority: 'Verified outcomes, adoption evidence',
    whatTheyNeed: ['Outcomes not output', 'Evidence of impact', 'Fast feedback loops'],
    howAIChanges: 'More features faster, but proving they work becomes the bottleneck.',
  },
  {
    id: 'security-authority',
    name: 'Security Authority',
    side: 'demand',
    role: 'Ensures security posture',
    preAIPriority: 'Control documentation, security reviews',
    postAIPriority: 'Continuous security evidence, automated controls',
    whatTheyNeed: ['Security-as-code', 'Continuous verification', 'Automated ATO evidence'],
    howAIChanges: 'AI-generated code introduces new attack surfaces. Manual review impossible.',
  },
  {
    id: 'program-manager',
    name: 'Program Manager',
    side: 'demand',
    role: 'Coordinates across initiatives',
    preAIPriority: 'Predictable schedules, status reports',
    postAIPriority: 'Real-time visibility, automated status',
    whatTheyNeed: ['Automated reporting', 'Real-time dashboards', 'Predictability at speed'],
    howAIChanges: 'AI velocity breaks traditional planning cycles. Need continuous visibility.',
  },
  {
    id: 'contracting-officer',
    name: 'Contracting Officer',
    side: 'demand',
    role: 'Manages vendor relationships',
    preAIPriority: 'Contract compliance, deliverable tracking',
    postAIPriority: 'Outcome-based contracts, automated verification',
    whatTheyNeed: ['Measurable outcomes', 'Automated deliverable verification', 'Flexible contracts'],
    howAIChanges: 'Traditional deliverable-based contracts don\'t capture AI value. Need new models.',
  },
  // Supply side
  {
    id: 'mission-hybrid',
    name: 'Mission Hybrid',
    side: 'supply',
    role: 'Authors intent and ships outcomes',
    preAIPriority: 'Feature delivery, technical excellence',
    postAIPriority: 'Specification clarity, evidence of impact',
    whatTheyNeed: ['Clear problem statements', 'Fast feedback', 'Evidence pipelines'],
    howAIChanges: 'Shifts from coding to specifying. AI handles implementation, humans handle intent.',
  },
  {
    id: 'enablement-hybrid',
    name: 'Enablement Hybrid',
    side: 'supply',
    role: 'Builds infrastructure for safe delivery',
    preAIPriority: 'Platform stability, developer tooling',
    postAIPriority: 'Evidence automation, guardrails at scale',
    whatTheyNeed: ['Verification pipelines', 'Golden paths', 'Governance automation'],
    howAIChanges: 'Becomes the critical path. Without the Evidence Engine, AI capacity creates chaos.',
  },
];

// ============================================
// STRATEGIC PILLARS (for Winning Play section)
// ============================================

export interface StrategicAction {
  id: string;
  pillar: 'genes' | 'people' | 'process';
  title: string;
  description: string;
  actions: string[];
}

export const STRATEGIC_ACTIONS: StrategicAction[] = [
  {
    id: 'invest-evidence-engine',
    pillar: 'genes',
    title: 'Build the Evidence Engine',
    description: 'The Systems genes (C1-C4) convert AI capacity into auditable delivery.',
    actions: [
      'Build verification into every workflow',
      'Make constraints executable, not documented',
      'Create evidence pipelines that scale with output',
      'Automate governance to match AI speed',
    ],
  },
  {
    id: 'evolve-people',
    pillar: 'people',
    title: 'Evolve Your People',
    description: 'Help engineers merge roles. Reward Mission and Enablement Hybrids.',
    actions: [
      'Train decision-making muscles',
      'Reward cross-functional fluency',
      'Create paths from specialist to hybrid',
      'Measure outcomes, not role compliance',
    ],
  },
  {
    id: 'adopt-foe',
    pillar: 'process',
    title: 'Adopt FOE Principles',
    description: 'Use the Field Guide as your epistemic visibility system.',
    actions: [
      'Embed FOE principles in every repo',
      'Treat experiments as the unit of progress',
      'Make evidence the currency of trust',
      'Use methods with maturity levels, not best practices',
    ],
  },
];

// ============================================
// DOMAIN COLORS (matching genomeData)
// ============================================

// eSimplicity Brand Colors
export const DOMAIN_COLORS = {
  product: '#3223BD',   // eSimplicity Primary Blue
  education: '#3EC5BB', // eSimplicity Teal/Green
  systems: '#CC8BFA',   // eSimplicity Purple (Evidence Engine)
};

export const ERA_COLORS = {
  preAI: '#F59E0B',     // Amber (warning - keep)
  transition: '#EF4444', // Red (danger - keep)
  aiEra: '#3223BD',     // eSimplicity Primary Blue
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getDemandByDomain(domain: 'product' | 'education' | 'systems'): DemandLevel[] {
  return DEMAND_LEVELS.filter(d => d.domain === domain);
}

export function getEvidenceEngineGenes(): DemandLevel[] {
  return DEMAND_LEVELS.filter(d => d.isEvidenceEngine);
}

export function getDemandChange(geneId: string): number {
  const gene = DEMAND_LEVELS.find(d => d.geneId === geneId);
  if (!gene) return 0;
  return gene.aiEra - gene.preAI;
}

export function getTopRisers(count: number = 5): DemandLevel[] {
  return [...DEMAND_LEVELS]
    .sort((a, b) => (b.aiEra - b.preAI) - (a.aiEra - a.preAI))
    .slice(0, count);
}

export function getTopFallers(count: number = 4): DemandLevel[] {
  return [...LEGACY_SKILLS]
    .sort((a, b) => (a.aiEra - a.preAI) - (b.aiEra - b.preAI))
    .slice(0, count);
}
