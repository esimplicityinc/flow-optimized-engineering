/**
 * Full Circuit Model for the Permission Game
 * Implements all equations from the source material
 */

// Types
export interface GeneLevel {
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

export interface TeamComposition {
  mission: number;
  enablement: number;
}

export interface CircuitInputs {
  genes: GeneLevel;
  aiFactor: number;
  team: TeamComposition;
}

export interface CircuitState {
  // Stage outputs
  humanCapacity: number;
  burnoutFactor: number;
  coordResistance: number;
  effectiveHumanCapacity: number;
  
  baseAIGain: number;
  safetyFactor: number;
  aiMultiplier: number;
  
  demandFactor: number;
  totalCapacity: number;
  
  spineStrength: number;
  evidenceYield: number;
  
  // Dynamic state
  permission: number;
  risk: number;
  burnout: number;
  
  // Stakeholder satisfaction
  govSatisfaction: number;
  stakeholderBreakdown: {
    riskOwner: number;
    missionOwner: number;
    securityAuthority: number;
    programManager: number;
    contractingOfficer: number;
  };
  
  // Outputs
  outcomesPerTick: number;
  permissionDelta: number;
  riskDelta: number;
  
  // Bottleneck analysis
  bottleneck: string;
  bottleneckSeverity: number;
}

// Constants (tuning parameters)
export const CIRCUIT_CONSTANTS = {
  // AI amplification
  AI_BASE_MULTIPLIER: 4,
  
  // Permission dynamics
  EVIDENCE_TO_PERMISSION: 0.0015,
  RISK_TO_PERMISSION: 0.001,
  TRUST_TO_PERMISSION: 0.0005,
  
  // Risk dynamics
  AI_RISK_BASE: 50,
  SPINE_RISK_MITIGATION: 30,
  
  // Burnout
  BURNOUT_ACCUMULATION: 0.001,
  BURNOUT_RECOVERY: 0.0005,
  HIGH_LOAD_THRESHOLD: 0.7,
  
  // Coordination
  COORD_BASE_FACTOR: 0.02,
  
  // Stakeholder weights
  STAKEHOLDER_WEIGHTS: {
    riskOwner: 0.30,
    missionOwner: 0.25,
    securityAuthority: 0.20,
    programManager: 0.15,
    contractingOfficer: 0.10,
  },
};

// Stage 1: Human Capacity
export function computeHumanCapacity(
  team: TeamComposition,
  genes: GeneLevel,
  burnout: number
): { base: number; burnoutFactor: number; coordResistance: number; effective: number } {
  const teamSize = team.mission + team.enablement;
  
  // Average skill based on relevant genes
  const missionSkill = (genes.discovery + genes.tradeoffs + genes.adoption + genes.strategy) / 40;
  const enablementSkill = (genes.enablement + genes.cognitiveErgonomics + genes.constraints + genes.verification) / 40;
  const avgSkill = (team.mission * missionSkill + team.enablement * enablementSkill) / teamSize;
  
  const base = teamSize * avgSkill * 10; // Scale factor
  const burnoutFactor = 1 - (burnout / 100);
  
  // Coordination resistance based on team size and education genes
  const educationAvg = (genes.mentalModels + genes.communication + genes.enablement + genes.cognitiveErgonomics) / 40;
  const coordResistance = Math.min(0.5, CIRCUIT_CONSTANTS.COORD_BASE_FACTOR * Math.log(1 + teamSize) * (1 - educationAvg * 0.5));
  
  const effective = base * burnoutFactor * (1 - coordResistance);
  
  return { base, burnoutFactor, coordResistance, effective };
}

// Stage 2: AI Amplification
export function computeAIAmplification(
  aiFactor: number,
  genes: GeneLevel
): { baseGain: number; safetyFactor: number; multiplier: number } {
  const baseGain = 1 + (aiFactor * CIRCUIT_CONSTANTS.AI_BASE_MULTIPLIER);
  
  // Safety factor requires constraints and verification
  const constraintsNorm = genes.constraints / 10;
  const verificationNorm = genes.verification / 10;
  const safetyFactor = Math.sqrt(constraintsNorm * verificationNorm);
  
  const multiplier = baseGain * Math.max(0.2, safetyFactor); // Floor at 0.2 to prevent zero
  
  return { baseGain, safetyFactor, multiplier };
}

// Stage 3: Demand Factor
export function computeDemandFactor(aiFactor: number): number {
  // Government baseline demand + AI shock
  const govAccountability = 1.0;
  const govSafety = 1.0;
  const prestige = 0.5 * (1 - aiFactor * 0.4); // Prestige shifts away as AI rises
  const aiShock = aiFactor * 2.0;
  
  return govAccountability + govSafety * 0.8 + prestige * 0.3 + aiShock;
}

// Stage 4: Spine Strength & Evidence
export function computeSpineAndEvidence(
  genes: GeneLevel,
  totalCapacity: number
): { spineStrength: number; evidenceYield: number } {
  // Spine = Systems genes (C1-C4), but C1 (constraints) is more about safety than evidence
  const spineStrength = (genes.verification + genes.operability + genes.governance) / 30;
  const evidenceYield = totalCapacity * spineStrength;
  
  return { spineStrength, evidenceYield };
}

// Stage 5: Permission Dynamics
export function computePermissionDelta(
  evidenceYield: number,
  currentRisk: number,
  govSatisfaction: number
): number {
  const evidenceContribution = evidenceYield * CIRCUIT_CONSTANTS.EVIDENCE_TO_PERMISSION;
  const riskPenalty = currentRisk * CIRCUIT_CONSTANTS.RISK_TO_PERMISSION;
  const trustBonus = govSatisfaction * CIRCUIT_CONSTANTS.TRUST_TO_PERMISSION;
  
  return evidenceContribution - riskPenalty + trustBonus;
}

// Stage 6: Risk Dynamics
export function computeRisk(
  aiFactor: number,
  spineStrength: number,
  currentRisk: number
): { newRisk: number; delta: number } {
  const riskFromAI = aiFactor * (1 - spineStrength) * CIRCUIT_CONSTANTS.AI_RISK_BASE;
  const riskMitigation = spineStrength * CIRCUIT_CONSTANTS.SPINE_RISK_MITIGATION;
  const targetRisk = Math.max(0, riskFromAI - riskMitigation);
  
  // Smooth transition toward target
  const delta = (targetRisk - currentRisk) * 0.1;
  const newRisk = Math.max(0, Math.min(100, currentRisk + delta));
  
  return { newRisk, delta };
}

// Stage 7: Outcomes
export function computeOutcomes(
  permission: number,
  totalCapacity: number,
  genes: GeneLevel
): number {
  const missionGeneAvg = (genes.discovery + genes.tradeoffs + genes.adoption + genes.strategy) / 40;
  return (permission / 100) * totalCapacity * missionGeneAvg;
}

// Stage 8: Stakeholder Satisfaction
export function computeStakeholderSatisfaction(
  genes: GeneLevel,
  evidenceYield: number,
  risk: number,
  permission: number
): { aggregate: number; breakdown: CircuitState['stakeholderBreakdown'] } {
  // Risk Owner: cares about verification and low risk
  const riskOwner = Math.min(100, 
    (genes.verification / 10) * 50 + 
    (genes.governance / 10) * 30 + 
    (1 - risk / 100) * 20
  );
  
  // Mission Owner: cares about outcomes capability
  const missionOwner = Math.min(100,
    (genes.discovery / 10) * 30 +
    (genes.tradeoffs / 10) * 30 +
    (permission / 100) * 40
  );
  
  // Security Authority: cares about constraints and evidence
  const securityAuthority = Math.min(100,
    (genes.constraints / 10) * 40 +
    (genes.verification / 10) * 40 +
    (genes.operability / 10) * 20
  );
  
  // Program Manager: cares about predictability (governance, operability)
  const programManager = Math.min(100,
    (genes.governance / 10) * 40 +
    (genes.operability / 10) * 30 +
    (genes.communication / 10) * 30
  );
  
  // Contracting Officer: cares about compliance (governance)
  const contractingOfficer = Math.min(100,
    (genes.governance / 10) * 50 +
    (genes.constraints / 10) * 30 +
    (1 - risk / 100) * 20
  );
  
  const breakdown = { riskOwner, missionOwner, securityAuthority, programManager, contractingOfficer };
  
  const weights = CIRCUIT_CONSTANTS.STAKEHOLDER_WEIGHTS;
  const aggregate = 
    weights.riskOwner * riskOwner +
    weights.missionOwner * missionOwner +
    weights.securityAuthority * securityAuthority +
    weights.programManager * programManager +
    weights.contractingOfficer * contractingOfficer;
  
  return { aggregate, breakdown };
}

// Stage 9: Burnout
export function computeBurnout(
  currentBurnout: number,
  totalCapacity: number,
  aiFactor: number,
  team: TeamComposition
): number {
  const teamSize = team.mission + team.enablement;
  const loadPerPerson = totalCapacity / teamSize / (1 + aiFactor * 0.5); // AI reduces per-person load
  
  let delta: number;
  if (loadPerPerson > CIRCUIT_CONSTANTS.HIGH_LOAD_THRESHOLD * 100) {
    delta = CIRCUIT_CONSTANTS.BURNOUT_ACCUMULATION * (loadPerPerson - CIRCUIT_CONSTANTS.HIGH_LOAD_THRESHOLD * 100);
  } else {
    delta = -CIRCUIT_CONSTANTS.BURNOUT_RECOVERY * 100;
  }
  
  return Math.max(0, Math.min(100, currentBurnout + delta));
}

// Bottleneck Analysis
export function analyzeBottleneck(
  genes: GeneLevel,
  aiFactor: number,
  aiMultiplier: number
): { bottleneck: string; severity: number } {
  const issues: { name: string; severity: number }[] = [];
  
  // Check if AI is underutilized due to weak spine
  const potentialAI = 1 + aiFactor * CIRCUIT_CONSTANTS.AI_BASE_MULTIPLIER;
  const actualAI = aiMultiplier;
  if (potentialAI > actualAI * 1.5) {
    const severity = ((potentialAI - actualAI) / potentialAI) * 100;
    issues.push({ name: 'AI Safety Gap (need Constraints + Verification)', severity });
  }
  
  // Check individual spine genes
  const spineGenes = [
    { name: 'Verification', value: genes.verification },
    { name: 'Operability', value: genes.operability },
    { name: 'Governance', value: genes.governance },
  ];
  
  for (const gene of spineGenes) {
    if (gene.value < 5 && aiFactor > 0.3) {
      issues.push({ name: `${gene.name} too low for AI level`, severity: (5 - gene.value) * 15 });
    }
  }
  
  // Check for imbalance
  const productAvg = (genes.discovery + genes.tradeoffs + genes.adoption + genes.strategy) / 4;
  const systemsAvg = (genes.constraints + genes.verification + genes.operability + genes.governance) / 4;
  
  if (productAvg > systemsAvg * 1.5 && aiFactor > 0.5) {
    issues.push({ name: 'Systems genes lagging Product genes', severity: (productAvg - systemsAvg) * 10 });
  }
  
  if (issues.length === 0) {
    return { bottleneck: 'None detected', severity: 0 };
  }
  
  issues.sort((a, b) => b.severity - a.severity);
  return { bottleneck: issues[0].name, severity: Math.min(100, issues[0].severity) };
}

// Main computation function
export function computeCircuit(
  inputs: CircuitInputs,
  currentState: { permission: number; risk: number; burnout: number }
): CircuitState {
  const { genes, aiFactor, team } = inputs;
  
  // Stage 1
  const humanCap = computeHumanCapacity(team, genes, currentState.burnout);
  
  // Stage 2
  const aiAmp = computeAIAmplification(aiFactor, genes);
  
  // Stage 3
  const demandFactor = computeDemandFactor(aiFactor);
  const totalCapacity = humanCap.effective * aiAmp.multiplier * demandFactor;
  
  // Stage 4
  const spine = computeSpineAndEvidence(genes, totalCapacity);
  
  // Stage 5 & 6
  const stakeholders = computeStakeholderSatisfaction(genes, spine.evidenceYield, currentState.risk, currentState.permission);
  const permissionDelta = computePermissionDelta(spine.evidenceYield, currentState.risk, stakeholders.aggregate);
  const newPermission = Math.max(0, Math.min(100, currentState.permission + permissionDelta));
  
  const riskResult = computeRisk(aiFactor, spine.spineStrength, currentState.risk);
  
  // Stage 7
  const outcomesPerTick = computeOutcomes(newPermission, totalCapacity, genes);
  
  // Stage 8
  const newBurnout = computeBurnout(currentState.burnout, totalCapacity, aiFactor, team);
  
  // Bottleneck
  const bottleneckResult = analyzeBottleneck(genes, aiFactor, aiAmp.multiplier);
  
  return {
    humanCapacity: humanCap.base,
    burnoutFactor: humanCap.burnoutFactor,
    coordResistance: humanCap.coordResistance,
    effectiveHumanCapacity: humanCap.effective,
    
    baseAIGain: aiAmp.baseGain,
    safetyFactor: aiAmp.safetyFactor,
    aiMultiplier: aiAmp.multiplier,
    
    demandFactor,
    totalCapacity,
    
    spineStrength: spine.spineStrength,
    evidenceYield: spine.evidenceYield,
    
    permission: newPermission,
    risk: riskResult.newRisk,
    burnout: newBurnout,
    
    govSatisfaction: stakeholders.aggregate,
    stakeholderBreakdown: stakeholders.breakdown,
    
    outcomesPerTick,
    permissionDelta,
    riskDelta: riskResult.delta,
    
    bottleneck: bottleneckResult.bottleneck,
    bottleneckSeverity: bottleneckResult.severity,
  };
}
