/**
 * AI-Era Engineering Genome Data
 * 
 * Shared data structures for all genome explorer page variants.
 * Based on the evolutionary framework from the AI personality shift conversation.
 */

// ============================================
// TYPES
// ============================================

export type Domain = 'product' | 'education' | 'systems';
export type Species = 'mission' | 'enablement';
export type Weight = 1 | 2 | 3; // Low, Medium, High

export interface Gene {
  id: string;
  name: string;
  domain: Domain;
  definition: string;
  thenExpression: string;  // Pre-AI era
  nowExpression: string;   // Post-AI era
  missionWeight: Weight;
  enablementWeight: Weight;
  strategySection: {
    id: string;
    number: number;
    title: string;
  };
  examples: string[];
  keyQuestion: string;
}

export interface SpeciesProfile {
  id: Species;
  name: string;
  subtitle: string;
  customer: string;
  workProduct: string;
  coreStance: string;
  requiredGenes: string[];  // Gene IDs with weight 3
  supportingGenes: string[]; // Gene IDs with weight 2
  failureMode: string;
  fitnessFunction: string;
  artifacts: string[];
}

export interface ExtinctionEvent {
  id: string;
  name: string;
  domain: Domain;
  description: string;
  whyItDies: string;
  signs: string[];
}

export interface EvolutionPhase {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  keyInsight?: string;
}

// ============================================
// DOMAIN METADATA
// ============================================

export const DOMAINS: Record<Domain, { name: string; color: string; description: string }> = {
  product: {
    name: 'Product',
    color: '#3B82F6', // Blue
    description: 'Capabilities for discovering value and making decisions',
  },
  education: {
    name: 'Education',
    color: '#10B981', // Green
    description: 'Capabilities for transferring knowledge and enabling others',
  },
  systems: {
    name: 'Systems',
    color: '#8B5CF6', // Purple
    description: 'Capabilities for building reliable, maintainable infrastructure',
  },
};

// ============================================
// THE 12 GENES
// ============================================

export const GENES: Gene[] = [
  // PRODUCT DOMAIN
  {
    id: 'discovery',
    name: 'Discovery',
    domain: 'product',
    definition: 'Find the real problem; validate demand before building solutions.',
    thenExpression: 'Translated stakeholder requests into backlog items. Discovery was a phase, not a continuous practice.',
    nowExpression: 'Continuous hypothesis generation. Every conversation surfaces potential experiments. Discovery is embedded in delivery.',
    missionWeight: 3,
    enablementWeight: 2,
    strategySection: { id: 'strategic-reframe', number: 1, title: 'Strategic Reframe' },
    examples: [
      'Running customer interviews before writing specs',
      'Using telemetry to validate assumptions',
      'Prototyping three options before committing',
    ],
    keyQuestion: 'What evidence do we have that this is the right problem to solve?',
  },
  {
    id: 'tradeoffs',
    name: 'Tradeoffs',
    domain: 'product',
    definition: 'Decide under constraints; establish kill criteria before starting.',
    thenExpression: 'Deferred hard decisions to later phases. Scope managed through sequencing and negotiation.',
    nowExpression: 'Upfront clarity on what we will NOT do. Kill criteria defined before experiments begin. Fast pivots when evidence contradicts assumptions.',
    missionWeight: 3,
    enablementWeight: 2,
    strategySection: { id: 'foe-doctrine', number: 2, title: 'FOE as Doctrine' },
    examples: [
      'Defining what would make us abandon this approach',
      'Explicitly choosing speed over comprehensiveness',
      'Saying no to good ideas that dilute focus',
    ],
    keyQuestion: 'What would make us stop or change direction?',
  },
  {
    id: 'adoption',
    name: 'Adoption',
    domain: 'product',
    definition: 'Drive behavior change; think in funnels from awareness to habitual use.',
    thenExpression: 'Built features and expected users to find them. Adoption was marketing\'s problem.',
    nowExpression: 'Every capability is a behavior change initiative. Onboarding, friction reduction, and habit formation are engineering concerns.',
    missionWeight: 2,
    enablementWeight: 3,
    strategySection: { id: 'people-culture', number: 4, title: 'People & Culture' },
    examples: [
      'Designing progressive disclosure for complex features',
      'Measuring time-to-value, not just feature completion',
      'Building feedback loops into the product itself',
    ],
    keyQuestion: 'How will users actually start using this?',
  },
  {
    id: 'strategy',
    name: 'Strategy',
    domain: 'product',
    definition: 'Set bets; sequence learning instead of features.',
    thenExpression: 'Roadmaps as feature lists with dates. Strategy was a leadership exercise separate from execution.',
    nowExpression: 'Probabilistic bets with explicit uncertainty. Strategy emerges from experiments. Everyone contributes to strategic learning.',
    missionWeight: 3,
    enablementWeight: 2,
    strategySection: { id: 'macro-goal', number: 12, title: 'The Macro Goal' },
    examples: [
      'Framing initiatives as hypotheses to test',
      'Allocating time for strategic exploration',
      'Reviewing what we learned, not just what we shipped',
    ],
    keyQuestion: 'What are we betting on, and how will we know if we\'re wrong?',
  },

  // EDUCATION DOMAIN
  {
    id: 'mental-models',
    name: 'Mental Models',
    domain: 'education',
    definition: 'Simplify complexity into 2-3 rules that guide decisions.',
    thenExpression: 'Expertise stayed in expert heads. Complexity was a moat that protected specialists.',
    nowExpression: 'Extracting patterns into teachable frameworks. The goal is to make expertise transferable, not hoarded.',
    missionWeight: 2,
    enablementWeight: 3,
    strategySection: { id: 'field-guide', number: 9, title: 'Field Guide as Living System' },
    examples: [
      'Creating decision trees for common scenarios',
      'Naming patterns so they can be discussed',
      'Building "when to use X" guidance into tools',
    ],
    keyQuestion: 'Can someone new understand why we do it this way?',
  },
  {
    id: 'communication',
    name: 'Communication',
    domain: 'education',
    definition: 'Cross-tribe alignment; narrative clarity across domains.',
    thenExpression: 'Each discipline had its own vocabulary. Translation happened in meetings, slowly.',
    nowExpression: 'Shared language enables parallel work. Engineers can talk to designers to security to product without losing fidelity.',
    missionWeight: 3,
    enablementWeight: 3,
    strategySection: { id: 'org-ownership', number: 3, title: 'Organizational Ownership' },
    examples: [
      'Writing RFCs that non-experts can follow',
      'Presenting technical decisions in business terms',
      'Facilitating conversations across team boundaries',
    ],
    keyQuestion: 'Would someone outside my discipline understand this?',
  },
  {
    id: 'enablement',
    name: 'Enablement',
    domain: 'education',
    definition: 'Teach by doing; build templates, playbooks, and reference paths.',
    thenExpression: 'Documentation as afterthought. Knowledge lived in wikis that no one read.',
    nowExpression: 'Learning embedded in workflows. Templates that teach, examples that guide, guardrails that prevent common mistakes.',
    missionWeight: 1,
    enablementWeight: 3,
    strategySection: { id: 'agent-convention', number: 7, title: 'The .agent/ Convention' },
    examples: [
      'Creating starter templates with best practices built in',
      'Building CLI tools that guide users through decisions',
      'Designing error messages that teach, not just report',
    ],
    keyQuestion: 'How can someone succeed without asking an expert?',
  },
  {
    id: 'cognitive-ergonomics',
    name: 'Cognitive Ergonomics',
    domain: 'education',
    definition: 'Reduce decision load; make the right choice obvious.',
    thenExpression: 'Assumed engineers would read docs and make good choices. Cognitive load was invisible.',
    nowExpression: 'Deliberately designed decision environments. Defaults are chosen, paths are paved, friction is intentional.',
    missionWeight: 2,
    enablementWeight: 3,
    strategySection: { id: 'local-first', number: 6, title: 'Local-First Infrastructure' },
    examples: [
      'Choosing sensible defaults for new projects',
      'Reducing configuration options to essential choices',
      'Automating routine decisions entirely',
    ],
    keyQuestion: 'How many decisions does someone have to make to do this right?',
  },

  // SYSTEMS DOMAIN
  {
    id: 'constraints',
    name: 'Constraints',
    domain: 'systems',
    definition: 'Define invariants, contracts, and boundaries that must hold.',
    thenExpression: 'Constraints as documentation. "Don\'t do X" lived in onboarding docs.',
    nowExpression: 'Constraints as code. What must be true is enforced automatically. Policy becomes machine-readable.',
    missionWeight: 2,
    enablementWeight: 3,
    strategySection: { id: 'compliance', number: 8, title: 'Compliance Without Theater' },
    examples: [
      'Schema validation that rejects invalid states',
      'Pre-commit hooks that enforce standards',
      'Architecture decision records with automated checks',
    ],
    keyQuestion: 'What must always be true, and how do we enforce it?',
  },
  {
    id: 'verification',
    name: 'Verification',
    domain: 'systems',
    definition: 'Generate evidence through tests, evals, and automated checks.',
    thenExpression: 'Testing as quality assurance phase. Evidence was manual, expensive, and often skipped.',
    nowExpression: 'Verification as continuous process. Every change produces evidence. Trust is built through receipts, not promises.',
    missionWeight: 2,
    enablementWeight: 3,
    strategySection: { id: 'foe-repos', number: 10, title: 'FOE in Every Repo' },
    examples: [
      'Automated test suites that run on every commit',
      'Property-based testing for edge cases',
      'Production monitoring that validates hypotheses',
    ],
    keyQuestion: 'What evidence proves this works?',
  },
  {
    id: 'operability',
    name: 'Operability',
    domain: 'systems',
    definition: 'Build for telemetry, incident readiness, and rollback capability.',
    thenExpression: 'Operations as separate team. "We build it, they run it."',
    nowExpression: 'Operability built in from day one. Every component is observable, every deployment reversible, every incident learnable.',
    missionWeight: 2,
    enablementWeight: 3,
    strategySection: { id: 'katalyst', number: 11, title: 'The Katalyst Foundation' },
    examples: [
      'Structured logging from the start',
      'Feature flags for gradual rollout',
      'Runbooks written before launch',
    ],
    keyQuestion: 'How will we know when this breaks, and how will we fix it?',
  },
  {
    id: 'governance',
    name: 'Governance',
    domain: 'systems',
    definition: 'Manage versioning, deprecation, and compatibility across systems.',
    thenExpression: 'Governance as gatekeeping meetings. Change review as approval theater.',
    nowExpression: 'Governance as automated flow. Compliance is a view into work already happening, not additional work.',
    missionWeight: 1,
    enablementWeight: 3,
    strategySection: { id: 'compliance', number: 8, title: 'Compliance Without Theater' },
    examples: [
      'Semantic versioning enforced by tooling',
      'Automated migration scripts for breaking changes',
      'Deprecation warnings that suggest alternatives',
    ],
    keyQuestion: 'How do we change this without breaking everyone else?',
  },
];

// ============================================
// SPECIES PROFILES
// ============================================

export const SPECIES_PROFILES: SpeciesProfile[] = [
  {
    id: 'mission',
    name: 'Mission Hybrids',
    subtitle: 'Intent Authors',
    customer: 'End users and stakeholders',
    workProduct: 'Behavior change in the world (features, workflows, outcomes)',
    coreStance: 'What should exist, and what proof will convince us it works?',
    requiredGenes: ['discovery', 'tradeoffs', 'strategy', 'communication'],
    supportingGenes: ['mental-models', 'adoption', 'constraints', 'verification'],
    failureMode: 'Local excellence that creates global incoherence. Fast shipping without systemic thinking.',
    fitnessFunction: 'Can you turn domain truth into executable intent and ship measurable outcomes?',
    artifacts: [
      'Hypotheses with falsification criteria',
      'Narratives that align stakeholders',
      'Specs with executable examples',
      'Acceptance criteria that are actually testable',
      'Decision records with evidence',
    ],
  },
  {
    id: 'enablement',
    name: 'Enablement Hybrids',
    subtitle: 'Intent Infrastructure',
    customer: 'Engineers, risk owners, and the organization itself',
    workProduct: 'Reduction in cost/risk of change (golden paths, guardrails, evidence, tooling)',
    coreStance: 'How do we make the right way the easy way?',
    requiredGenes: ['adoption', 'enablement', 'cognitive-ergonomics', 'constraints', 'verification', 'operability', 'governance'],
    supportingGenes: ['mental-models', 'communication', 'discovery'],
    failureMode: 'Platform priesthood. Building perfect tools nobody adopts. Becoming a ticket queue.',
    fitnessFunction: 'Can you make the right way the easy way for many teams and keep it stable?',
    artifacts: [
      'Golden paths and starter templates',
      'Paved roads that teach by doing',
      'Policy-as-code that enforces standards',
      'Evidence automation pipelines',
      'Docs that enable, not just describe',
    ],
  },
];

// ============================================
// EXTINCTION EVENTS
// ============================================

export const EXTINCTION_EVENTS: ExtinctionEvent[] = [
  {
    id: 'backlog-priesthood',
    name: 'Backlog Priesthood',
    domain: 'product',
    description: 'Treating ticket translation as the core skill. Roadmap theater as control mechanism.',
    whyItDies: 'AI makes shipping cheap. Managing the queue doesn\'t create truth. The bottleneck moves upstream to judgment.',
    signs: [
      'Success measured by tickets closed, not outcomes achieved',
      'Roadmaps as feature lists with dates, not hypotheses with evidence',
      'Stakeholder requests flow through without validation',
      'Scope control via sequencing instead of experimentation',
    ],
  },
  {
    id: 'role-purity',
    name: 'Role Purity',
    domain: 'education',
    description: '"I\'m not technical" / "That\'s not my job" as acceptable positions.',
    whyItDies: 'With AI, misalignment is the dominant failure mode. You can\'t afford slow translation or hidden context between roles.',
    signs: [
      'Strict handoffs between product, design, and engineering',
      'Certifications that enforce artificial boundaries',
      'Knowledge gated by specialization ("ask the expert")',
      'Docs written after decisions, not as decision instruments',
    ],
  },
  {
    id: 'syntax-heroism',
    name: 'Syntax Heroism',
    domain: 'systems',
    description: 'Framework wizardry as identity. Being the person who can "just code it."',
    whyItDies: 'When code is abundant, raw throughput stops differentiating you. Unconstrained throughput becomes entropy.',
    signs: [
      'Status from lines of code written',
      'Deep framework knowledge without systems thinking',
      'Local optimization without guardrails',
      'Ops as someone else\'s problem',
    ],
  },
];

// ============================================
// EVOLUTION NARRATIVE
// ============================================

export const EVOLUTION_PHASES: EvolutionPhase[] = [
  {
    id: 'old-world',
    title: 'The Old World',
    subtitle: 'What software selected for (~40 years)',
    content: [
      'Syntax tolerance: patience for rigid rules, delayed feedback, compiler-as-judge',
      'Solo throughput: deep work, minimal coordination, "leave me alone and I\'ll ship"',
      'Precision over persuasion: being right mattered more than getting aligned',
      'Optimization mindset: elegance, reduction, correctness',
    ],
    keyInsight: 'You won by being a high-trust compiler: hold large systems in your head, be careful and consistent, grind through ambiguity until it becomes implementation.',
  },
  {
    id: 'shock',
    title: 'The Environmental Shock',
    subtitle: 'AI flips the constraint',
    content: [
      'What becomes cheap: implementation volume, variants and rewrites, boilerplate and integration glue, "good-looking" output',
      'What becomes expensive: correctness under ambiguity, taste and judgment, specification clarity, proof and evidence, alignment speed',
    ],
    keyInsight: 'AI is a mutation amplifier: it increases both capability and risk. When "typing the code" gets cheap, the scarce resource becomes taste + judgment + direction + alignment.',
  },
  {
    id: 'pressures',
    title: 'Evolutionary Pressures',
    subtitle: 'Three forces reshaping the landscape',
    content: [
      'The Spec Gap: When output is easy, the main failure mode becomes "we built the wrong thing fast."',
      'Drift and Entropy: AI increases throughput, which increases architectural entropy unless constrained.',
      'Evidence as Currency: Risk owners, auditors, and engineers stop trusting fluent output. Receipts matter.',
    ],
    keyInsight: 'The bottleneck moved from production to selection to coordination to trust/evidence.',
  },
  {
    id: 'new-world',
    title: 'The New World',
    subtitle: 'What gets selected now',
    content: [
      'You win by being a high-trust editor-in-chief',
      'Form strong hypotheses: "what should exist?"',
      'Shape constraints: "what must be true?"',
      'Design experiments: "how do we learn fast without blowing up prod?"',
      'Communicate intent: so humans and agents converge',
      'Say no: and defend it socially',
    ],
    keyInsight: 'The dominant virtues shift from correctness to judgment. That\'s not "more soft skills" - it\'s a different center of gravity.',
  },
];

// ============================================
// KEY QUOTES
// ============================================

export const KEY_QUOTES = [
  {
    text: 'AI didn\'t just "make coding easier." It moved engineering upward. When syntax stops being the scarce skill, the pressure migrates into specification, intent, truth, and feedback.',
    context: 'The fundamental shift',
  },
  {
    text: 'The object of work becomes: executable intent + evidence.',
    context: 'The new unit of value',
  },
  {
    text: 'Stop treating roles as jurisdictions. Start treating them as lenses.',
    context: 'On organizational change',
  },
  {
    text: 'Mission teams own decisions that change business behavior. Enablement teams own decisions that change the cost/risk of change itself.',
    context: 'The clean boundary',
  },
  {
    text: 'AI gives developers superhuman output but subhuman guardrails. The organizations that thrive will pair AI leverage with human judgment.',
    context: 'The AI People Trilemma',
  },
  {
    text: 'Creative without discipline becomes chaos. Strong opinions, loosely held. Rapid iteration, with versioned decisions. Speed, with evidence. Autonomy, with guardrails.',
    context: 'The new archetype',
  },
];

// ============================================
// HISTORICAL ANALOGIES
// ============================================

export const HISTORICAL_ANALOGIES = [
  {
    name: 'Printing Press',
    oldScarcity: 'Scribes / manuscript production',
    newScarcity: 'Editing, credibility, distribution, interpretation',
    speciesSplit: 'Authors + pamphleteers (Mission) vs printers + publishers + editors (Enablement)',
  },
  {
    name: 'Digital Photography',
    oldScarcity: 'Film expertise, darkroom, shot discipline',
    newScarcity: 'Curation, narrative, trust, and distribution',
    speciesSplit: 'Creators who tell stories (Mission) vs platforms/tools (Enablement)',
  },
  {
    name: 'Container Shipping',
    oldScarcity: 'Manual cargo handling, port choreography',
    newScarcity: 'Coordination, customs, scheduling, supply chain optimization',
    speciesSplit: 'Specialized operators (Mission) vs logistics infrastructure (Enablement)',
  },
  {
    name: 'Cloud Computing',
    oldScarcity: 'Ops as gatekeepers, hardware procurement',
    newScarcity: 'Architecture, reliability, security, cost control, platform consistency',
    speciesSplit: 'Application teams (Mission) vs platform teams (Enablement)',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getGenesByDomain(domain: Domain): Gene[] {
  return GENES.filter((gene) => gene.domain === domain);
}

export function getGeneById(id: string): Gene | undefined {
  return GENES.find((gene) => gene.id === id);
}

export function getSpeciesById(id: Species): SpeciesProfile | undefined {
  return SPECIES_PROFILES.find((species) => species.id === id);
}

export function getGeneWeightForSpecies(geneId: string, speciesId: Species): Weight {
  const gene = getGeneById(geneId);
  if (!gene) return 1;
  return speciesId === 'mission' ? gene.missionWeight : gene.enablementWeight;
}

export function getTopGenesForSpecies(speciesId: Species, count: number = 6): Gene[] {
  return [...GENES]
    .sort((a, b) => {
      const weightA = speciesId === 'mission' ? a.missionWeight : a.enablementWeight;
      const weightB = speciesId === 'mission' ? b.missionWeight : b.enablementWeight;
      return weightB - weightA;
    })
    .slice(0, count);
}

// ============================================
// GOVCON ECONOMICS - PERMISSION ECONOMY
// ============================================

export interface PermissionEconomy {
  coreInsight: string;
  aiParadox: string;
  winningPlay: string;
  investmentThesis: string;
}

export const PERMISSION_ECONOMY: PermissionEconomy = {
  coreInsight: "Government is a permission economy. We don't get rewarded for speed. We get rewarded for assurance.",
  aiParadox: "AI raises speed. That increases risk. So agencies will only accept AI-driven delivery if we can produce legibility and evidence by default.",
  winningPlay: "Build an enablement spine that turns AI capacity into auditable delivery.",
  investmentThesis: "Invest in the genes that are now scarce—proof and legibility—because that's how we turn AI into margin and competitive advantage instead of chaos.",
};

// ============================================
// THE SPINE + SKIN MODEL
// ============================================

export interface SpineSkin {
  spine: {
    description: string;
    elements: string[];
  };
  skinPreAI: {
    description: string;
    characteristics: string[];
  };
  skinPostAI: {
    description: string;
    characteristics: string[];
  };
  transition: string;
}

export const SPINE_SKIN: SpineSkin = {
  spine: {
    description: 'What government consistently pays for (stable across eras)',
    elements: [
      'Assurance / accountability',
      'Operational continuity',
      'Governance / compliance',
      'Standardization at scale',
    ],
  },
  skinPreAI: {
    description: 'Services skin: humans do the assurance work',
    characteristics: [
      'Human-intensive delivery',
      'Relationship-driven trust',
      'Scales linearly with headcount',
      'Knowledge in expert heads',
    ],
  },
  skinPostAI: {
    description: 'Products skin: systems do the assurance work',
    characteristics: [
      'Evidence-by-default',
      'Scales non-linearly',
      'Creates compounding capability',
      'Knowledge in executable systems',
    ],
  },
  transition: 'AI makes the services skin too slow and expensive, so the skin flips from "people-based assurance" to "machine-based assurance."',
};

// ============================================
// GOVERNMENT PERSONAS (DEMAND SIDE)
// ============================================

export type PersonaSide = 'demand' | 'supply';

export interface GovPersona {
  id: string;
  name: string;
  side: PersonaSide;
  description: string;
  consumes?: string[];
  emits?: string[];
  produces?: string[];
  icon: string;
}

export const GOV_PERSONAS: GovPersona[] = [
  // Demand side (Government)
  {
    id: 'risk-owner',
    name: 'Risk Owner',
    side: 'demand',
    description: 'Accountable for organizational risk. Needs proof before granting permission.',
    consumes: ['proof', 'evidence', 'audit trails'],
    emits: ['permission', 'authority to proceed'],
    icon: 'shield',
  },
  {
    id: 'mission-owner',
    name: 'Mission Owner',
    side: 'demand',
    description: 'Accountable for delivering mission outcomes. Needs capability to achieve goals.',
    consumes: ['outcomes', 'capabilities', 'features'],
    emits: ['urgency', 'requirements', 'feedback'],
    icon: 'target',
  },
  {
    id: 'contracting-officer',
    name: 'Contracting Officer',
    side: 'demand',
    description: 'Manages procurement and vendor relationships. Guards the acquisition process.',
    consumes: ['compliance artifacts', 'contract deliverables'],
    emits: ['procurement impedance', 'contract constraints'],
    icon: 'file-contract',
  },
  {
    id: 'program-manager',
    name: 'Program Manager',
    side: 'demand',
    description: 'Coordinates across initiatives. Needs predictability and visibility.',
    consumes: ['predictability', 'status visibility', 'risk information'],
    emits: ['scheduling constraints', 'resource allocation'],
    icon: 'calendar',
  },
  {
    id: 'security-authority',
    name: 'Security Authority',
    side: 'demand',
    description: 'Ensures security posture. Requires evidence of controls.',
    consumes: ['security evidence', 'control documentation'],
    emits: ['security constraints', 'ATO decisions'],
    icon: 'lock',
  },
  // Supply side (Vendor)
  {
    id: 'mission-hybrid',
    name: 'Mission Hybrid',
    side: 'supply',
    description: 'Engineers who author intent and ship outcomes. Product-minded builders.',
    produces: ['intent', 'outcomes', 'specifications', 'hypotheses'],
    icon: 'rocket',
  },
  {
    id: 'enablement-hybrid',
    name: 'Enablement Hybrid',
    side: 'supply',
    description: 'Engineers who build the infrastructure for safe, fast delivery.',
    produces: ['guardrails', 'evidence pipelines', 'golden paths', 'tooling'],
    icon: 'cog',
  },
  {
    id: 'service-pmo',
    name: 'Service Delivery PMO',
    side: 'supply',
    description: 'Traditional project management. Produces ceremony and artifacts.',
    produces: ['ceremony', 'status reports', 'compliance artifacts'],
    icon: 'clipboard',
  },
];

// ============================================
// GENE CONVERSIONS (CIRCUIT MODEL)
// ============================================

export interface GeneConversion {
  geneId: string;
  converts: {
    from: string;
    to: string;
  };
  circuitRole: string;
}

export const GENE_CONVERSIONS: GeneConversion[] = [
  { geneId: 'discovery', converts: { from: 'demand', to: 'correct intent' }, circuitRole: 'Signal filter - removes noise from demand' },
  { geneId: 'tradeoffs', converts: { from: 'constraints', to: 'decisions' }, circuitRole: 'Decision amplifier - clarity under pressure' },
  { geneId: 'adoption', converts: { from: 'features', to: 'usage' }, circuitRole: 'Behavior transformer - capability to value' },
  { geneId: 'strategy', converts: { from: 'options', to: 'sequence' }, circuitRole: 'Priority router - allocates attention' },
  { geneId: 'mental-models', converts: { from: 'complexity', to: 'shared understanding' }, circuitRole: 'Complexity reducer - simplifies signals' },
  { geneId: 'communication', converts: { from: 'intent', to: 'alignment' }, circuitRole: 'Synchronization bus - aligns actors' },
  { geneId: 'enablement', converts: { from: 'capability', to: 'adoption' }, circuitRole: 'Adoption accelerator - reduces friction' },
  { geneId: 'cognitive-ergonomics', converts: { from: 'load', to: 'clarity' }, circuitRole: 'Load balancer - manages cognitive burden' },
  { geneId: 'constraints', converts: { from: 'freedom', to: 'guardrails' }, circuitRole: 'Boundary enforcer - prevents drift' },
  { geneId: 'verification', converts: { from: 'output', to: 'evidence' }, circuitRole: 'Proof generator - creates receipts' },
  { geneId: 'operability', converts: { from: 'deployment', to: 'observability' }, circuitRole: 'Visibility layer - makes state legible' },
  { geneId: 'governance', converts: { from: 'change', to: 'controlled change' }, circuitRole: 'Change controller - safe evolution' },
];

// ============================================
// CIRCUIT MODEL
// ============================================

export interface VoltageSource {
  id: string;
  name: string;
  description: string;
  baseLevel: number;
  aiMultiplier: number;
  color: string;
}

export interface ImpedanceFactor {
  id: string;
  name: string;
  description: string;
  baseLevel: number;
  reducedBy: string[];
}

export const VOLTAGE_SOURCES: VoltageSource[] = [
  {
    id: 'gov-accountability',
    name: 'Accountability Demand',
    description: "Government's baseline need for assurance and accountability. Steady, always-on.",
    baseLevel: 1.0,
    aiMultiplier: 1.0,
    color: '#3B82F6',
  },
  {
    id: 'gov-safety',
    name: 'Safety Demand',
    description: "Government's need for operational continuity and safety. High impedance path.",
    baseLevel: 1.0,
    aiMultiplier: 1.2,
    color: '#10B981',
  },
  {
    id: 'prestige',
    name: 'Prestige Signal',
    description: 'Personal prestige and career advancement. Attaches to whatever is scarce.',
    baseLevel: 0.5,
    aiMultiplier: 0.6,
    color: '#F59E0B',
  },
  {
    id: 'ai-shock',
    name: 'AI Shock',
    description: 'The new external pressure. Dramatically increases available voltage.',
    baseLevel: 0.0,
    aiMultiplier: 2.0,
    color: '#EF4444',
  },
];

export const IMPEDANCE_FACTORS: ImpedanceFactor[] = [
  {
    id: 'procurement',
    name: 'Procurement Rigidity',
    description: 'How hard it is to buy new things.',
    baseLevel: 0.7,
    reducedBy: ['governance', 'communication'],
  },
  {
    id: 'risk-aversion',
    name: 'Risk Aversion',
    description: 'Organizational fear of failure.',
    baseLevel: 0.6,
    reducedBy: ['verification', 'constraints', 'operability'],
  },
  {
    id: 'legacy',
    name: 'Legacy Architecture',
    description: 'Technical debt as impedance.',
    baseLevel: 0.5,
    reducedBy: ['governance', 'operability'],
  },
  {
    id: 'skill-gaps',
    name: 'Skill Gaps',
    description: 'Missing genes = higher impedance.',
    baseLevel: 0.4,
    reducedBy: ['enablement', 'mental-models', 'cognitive-ergonomics'],
  },
  {
    id: 'trust-deficit',
    name: 'Trust Deficit',
    description: 'Trust between government and vendors.',
    baseLevel: 0.3,
    reducedBy: ['verification', 'communication', 'governance'],
  },
];

// ============================================
// SCARCITY SHIFTS
// ============================================

export interface ScarcityShift {
  category: string;
  preAI: 'scarce' | 'balanced' | 'abundant';
  postAI: 'scarce' | 'balanced' | 'abundant';
  relatedGenes: string[];
}

export const SCARCITY_SHIFTS: ScarcityShift[] = [
  { category: 'Code output', preAI: 'scarce', postAI: 'abundant', relatedGenes: [] },
  { category: 'Syntax expertise', preAI: 'scarce', postAI: 'abundant', relatedGenes: [] },
  { category: 'Framework knowledge', preAI: 'scarce', postAI: 'abundant', relatedGenes: [] },
  { category: 'Implementation speed', preAI: 'scarce', postAI: 'abundant', relatedGenes: [] },
  { category: 'Executable specifications', preAI: 'balanced', postAI: 'scarce', relatedGenes: ['discovery', 'tradeoffs'] },
  { category: 'Verification capabilities', preAI: 'balanced', postAI: 'scarce', relatedGenes: ['verification', 'constraints'] },
  { category: 'Telemetry/observability', preAI: 'abundant', postAI: 'scarce', relatedGenes: ['operability'] },
  { category: 'Governance automation', preAI: 'abundant', postAI: 'scarce', relatedGenes: ['governance'] },
  { category: 'Cognitive enablement', preAI: 'abundant', postAI: 'scarce', relatedGenes: ['enablement', 'cognitive-ergonomics'] },
  { category: 'Decision-making capacity', preAI: 'balanced', postAI: 'scarce', relatedGenes: ['tradeoffs', 'strategy'] },
];

// ============================================
// THE THREE PILLARS (STRATEGIC ACTIONS)
// ============================================

export interface StrategicPillar {
  id: string;
  name: string;
  statement: string;
  description: string;
  actions: string[];
  relatedGenes: string[];
  icon: string;
}

export const THREE_PILLARS: StrategicPillar[] = [
  {
    id: 'genes',
    name: 'Genes',
    statement: 'Invest in genes that are now scarce: proof and legibility',
    description: "The Systems genes (Constraints, Verification, Operability, Governance) form the enablement spine that converts AI capacity into auditable delivery.",
    actions: [
      'Build verification into every workflow',
      'Make constraints executable, not documented',
      'Create evidence pipelines that scale with output',
      'Automate governance to match AI speed',
    ],
    relatedGenes: ['constraints', 'verification', 'operability', 'governance'],
    icon: 'dna',
  },
  {
    id: 'people',
    name: 'People',
    statement: 'Help people merge roles and reward those who do',
    description: "We teach and inspire the merge between traditional role silos. Mission Hybrids and Enablement Hybrids are the new species we're cultivating.",
    actions: [
      'Reward cross-functional fluency',
      'Create paths for role convergence',
      'Measure outcomes, not role compliance',
      'Celebrate the T-shaped and Pi-shaped contributors',
    ],
    relatedGenes: ['communication', 'mental-models', 'adoption'],
    icon: 'users',
  },
  {
    id: 'process',
    name: 'Process',
    statement: 'Adopt FOE and use the field guide as our epistemic visibility system',
    description: 'Flow Optimized Engineering provides the doctrine. The Field Guide provides the living system for organizational learning.',
    actions: [
      'Embed FOE principles in every repo',
      'Treat the Field Guide as institutional memory',
      'Make experiments and evidence the unit of progress',
      'Use methods with maturity levels, not best practices',
    ],
    relatedGenes: ['strategy', 'enablement', 'discovery'],
    icon: 'book',
  },
];

// ============================================
// GOVCON KEY QUOTES
// ============================================

export const GOVCON_QUOTES = [
  {
    text: "Government is a permission economy. We don't get rewarded for speed. We get rewarded for assurance.",
    context: 'The fundamental truth',
    emphasis: 'permission economy',
  },
  {
    text: 'AI expands delivery capacity; legibility expands permission. Enablement engineering converts capacity into permission.',
    context: 'The conversion formula',
    emphasis: 'converts capacity into permission',
  },
  {
    text: "The thing that felt like 'overhead' in the old world becomes the enabler in the new one.",
    context: 'On enablement investment',
    emphasis: 'enabler',
  },
  {
    text: 'Moving fast without visibility becomes objectively unsafe. The only way to scale is evidence-by-default.',
    context: 'On AI risk',
    emphasis: 'evidence-by-default',
  },
  {
    text: "AI creates an oversupply of code and a shortage of confidence.",
    context: 'The CEO pitch',
    emphasis: 'shortage of confidence',
  },
  {
    text: "Government didn't used to pay for these because demand wasn't binding. AI makes them binding.",
    context: 'On new demand',
    emphasis: 'AI makes them binding',
  },
];

// ============================================
// CIRCUIT EQUATIONS (for interactive viz)
// ============================================

export const CIRCUIT_EQUATIONS = {
  effectiveCapacity: {
    formula: 'h_eff = V_hum x (1 - burnout) x (1 - coord_resistance)',
    description: 'Human capacity after burnout and coordination overhead',
  },
  aiGain: {
    formula: 'G_ai = base_ai x sqrt(C1 x C2)',
    description: 'AI amplification requires Constraints and Verification',
  },
  assuranceYield: {
    formula: 'assurance = code_output x avg(C2, C3, C4)',
    description: 'Evidence generation from Systems genes',
  },
  permissionDelta: {
    formula: 'delta_permission = k1 x assurance - k2 x risk - k3 x incidents',
    description: 'Permission grows with assurance, shrinks with risk',
  },
  missionOutcomes: {
    formula: 'outcomes = permission x throughput x mission_genes',
    description: 'Delivery requires permission and capability',
  },
};

// ============================================
// HELPER: Get spine genes (Systems domain with high enablement weight)
// ============================================

export function getSpineGenes(): Gene[] {
  return GENES.filter(
    (gene) => gene.domain === 'systems' && gene.enablementWeight === 3
  );
}

// ============================================
// HELPER: Calculate permission from gene levels
// ============================================

export function calculatePermission(geneLevels: Record<string, number>, aiFactor: number): number {
  const systemsGenes = ['constraints', 'verification', 'operability', 'governance'];
  const systemsAvg = systemsGenes.reduce((sum, id) => sum + (geneLevels[id] || 0.5), 0) / 4;
  
  // Higher AI factor increases risk unless systems genes are strong
  const riskFromAI = aiFactor * (1 - systemsAvg);
  const assuranceYield = systemsAvg * (1 + aiFactor * 0.5);
  
  // Permission is assurance minus risk
  return Math.max(0, Math.min(1, assuranceYield - riskFromAI * 0.5));
}

// ============================================
// HELPER: Get personas by side
// ============================================

export function getPersonasBySide(side: PersonaSide): GovPersona[] {
  return GOV_PERSONAS.filter((p) => p.side === side);
}
