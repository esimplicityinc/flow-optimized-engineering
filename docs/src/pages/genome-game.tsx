/**
 * The Permission Game
 * An interactive simulation for understanding the genome in government context
 */

import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { useGameEngine } from '../components/GenomeGame/engine/gameEngine';
import { PRESETS } from '../components/GenomeGame/data/presets';
import styles from './genome-game.module.css';

// Gene metadata for display
const GENE_META = {
  discovery: { name: 'Discovery', domain: 'product' as const },
  tradeoffs: { name: 'Tradeoffs', domain: 'product' as const },
  adoption: { name: 'Adoption', domain: 'product' as const },
  strategy: { name: 'Strategy', domain: 'product' as const },
  mentalModels: { name: 'Mental Models', domain: 'education' as const },
  communication: { name: 'Communication', domain: 'education' as const },
  enablement: { name: 'Enablement', domain: 'education' as const },
  cognitiveErgonomics: { name: 'Cog. Ergonomics', domain: 'education' as const },
  constraints: { name: 'Constraints', domain: 'systems' as const, isSpine: true },
  verification: { name: 'Verification', domain: 'systems' as const, isSpine: true },
  operability: { name: 'Operability', domain: 'systems' as const, isSpine: true },
  governance: { name: 'Governance', domain: 'systems' as const, isSpine: true },
};

// Format time as MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Format number with commas
function formatNumber(n: number): string {
  return Math.floor(n).toLocaleString();
}

// Get status class based on value
function getStatusClass(value: number, thresholds: { high: number; mid: number }, invert = false): string {
  if (invert) {
    if (value > thresholds.high) return 'low';
    if (value > thresholds.mid) return 'mid';
    return 'high';
  }
  if (value >= thresholds.high) return 'high';
  if (value >= thresholds.mid) return 'mid';
  return 'low';
}

// Progress bar component
function ProgressBar({ 
  value, 
  max = 100, 
  status = 'high',
  showLabel = true,
  large = false,
}: { 
  value: number; 
  max?: number; 
  status?: 'high' | 'mid' | 'low' | 'product' | 'education' | 'systems';
  showLabel?: boolean;
  large?: boolean;
}) {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <div className={`${styles.progressBar} ${large ? styles.large : ''}`}>
      <div 
        className={`${styles.progressFill} ${styles[status]}`}
        style={{ width: `${percent}%` }}
      />
      {showLabel && <span className={styles.progressLabel}>{Math.floor(value)}%</span>}
    </div>
  );
}

// Gene slider component
function GeneSlider({
  geneId,
  value,
  onChange,
}: {
  geneId: keyof typeof GENE_META;
  value: number;
  onChange: (value: number) => void;
}) {
  const meta = GENE_META[geneId];
  
  return (
    <div className={styles.geneSlider}>
      <div className={styles.geneInfo}>
        <span className={styles.geneName}>
          {meta.name}
        </span>
        {meta.isSpine && <span className={styles.spineBadge}>SPINE</span>}
      </div>
      <div className={styles.geneControl}>
        <input
          type="range"
          min={0}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`${styles.geneInput} ${styles[meta.domain]}`}
        />
        <span className={styles.geneValue}>{value}/10</span>
      </div>
    </div>
  );
}

// Main game component
function PermissionGame() {
  const engine = useGameEngine();
  const [showCircuit, setShowCircuit] = React.useState(false);
  const [showPresets, setShowPresets] = React.useState(false);
  
  const {
    genes,
    aiFactor,
    team,
    circuit,
    score,
    sessionTime,
    isRunning,
    genePoints,
    maxGenePoints,
    presetName,
    updateGene,
    updateAI,
    updateTeam,
    loadPreset,
    reset,
    togglePause,
  } = engine;
  
  const permissionStatus = getStatusClass(circuit.permission, { high: 60, mid: 30 });
  const riskStatus = getStatusClass(circuit.risk, { high: 60, mid: 40 }, true);
  const burnoutStatus = getStatusClass(circuit.burnout, { high: 60, mid: 40 }, true);
  
  return (
    <div className={styles.gameContainer}>
      {/* Header */}
      <header className={styles.gameHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.gameTitle}>The Permission Game</h1>
          <p className={styles.gameSubtitle}>
            {presetName ? `Preset: ${presetName}` : 'Sandbox Mode'}
          </p>
        </div>
        <div className={styles.headerControls}>
          <div className={styles.sessionTime}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {formatTime(sessionTime)}
          </div>
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreLabel}>Score</span>
            <span className={styles.scoreValue}>{formatNumber(score)}</span>
          </div>
          <button 
            className={styles.presetButton}
            onClick={() => setShowPresets(!showPresets)}
            aria-expanded={showPresets}
          >
            <span>Presets</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Presets Panel */}
      <div className={`${styles.presetsPanel} ${showPresets ? styles.open : ''}`}>
        <div className={styles.presetsGrid}>
          {PRESETS.map(preset => (
            <div
              key={preset.id}
              className={`${styles.presetCard} ${presetName === preset.name ? styles.active : ''}`}
              onClick={() => {
                loadPreset({ ...preset });
                setShowPresets(false);
              }}
            >
              <div className={styles.presetName}>{preset.name}</div>
              <div className={styles.presetDescription}>{preset.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Left panel: Controls */}
        <div className={styles.controlPanel}>
          {/* Pause/Reset Controls */}
          <div className={styles.controlSection}>
            <div className={styles.sectionTitle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6" />
                <path d="M1 12h6m6 0h6" />
              </svg>
              Controls
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={togglePause} 
                className={styles.presetButton}
                style={{ flex: 1 }}
              >
                {isRunning ? 'Pause' : 'Play'}
              </button>
              <button 
                onClick={reset} 
                className={styles.presetButton}
                style={{ flex: 1 }}
              >
                Reset
              </button>
            </div>
          </div>
          
          {/* AI Factor */}
          <div className={styles.controlSection}>
            <div className={styles.sectionTitle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
              AI Deployment Level
            </div>
            <div className={styles.aiSlider}>
              <div className={styles.aiSliderHeader}>
                <span className={styles.aiSliderLabel}>AI Factor</span>
                <span className={styles.aiSliderValue}>{Math.round(aiFactor * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={aiFactor * 100}
                onChange={(e) => updateAI(Number(e.target.value) / 100)}
                className={styles.aiSliderInput}
              />
              <div className={styles.aiSliderLabels}>
                <span>Pre-AI</span>
                <span>Full AI</span>
              </div>
            </div>
            {aiFactor > 0.5 && circuit.safetyFactor < 0.5 && (
              <div className={styles.bottleneckAlert} style={{ marginTop: '0.75rem' }}>
                <div className={styles.bottleneckContent}>
                  <div className={styles.bottleneckTitle}>Warning</div>
                  <div className={styles.bottleneckMessage}>
                    AI capacity exceeds evidence capability. Build spine genes.
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Team Ratio */}
          <div className={styles.controlSection}>
            <div className={styles.sectionTitle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <circle cx="19" cy="11" r="2" />
                <path d="M19 8v6" />
              </svg>
              Team Composition
            </div>
            <div className={styles.teamRatio}>
              <div className={styles.ratioInput}>
                <label className={styles.ratioLabel}>Mission</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={team.mission}
                  onChange={(e) => updateTeam({ ...team, mission: Number(e.target.value) })}
                  className={styles.ratioValue}
                />
              </div>
              <span className={styles.ratioDivider}>:</span>
              <div className={styles.ratioInput}>
                <label className={styles.ratioLabel}>Enablement</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={team.enablement}
                  onChange={(e) => updateTeam({ ...team, enablement: Number(e.target.value) })}
                  className={styles.ratioValue}
                />
              </div>
            </div>
            <div className={styles.ratioTotal}>
              Total: {team.mission + team.enablement} engineers
            </div>
          </div>
          
          {/* Gene Configuration */}
          <div className={styles.controlSection}>
            <div className={styles.sectionTitle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M12 2v20M2 12h20" />
              </svg>
              Gene Configuration
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--permission-mid)' }}>
                {genePoints}/{maxGenePoints} pts
              </span>
            </div>
            
            {/* Product Domain */}
            <div className={styles.domainGroup}>
              <div className={styles.domainHeader}>
                <span className={`${styles.domainDot} ${styles.product}`} />
                <span className={styles.domainName}>Product</span>
              </div>
              <div className={styles.domainGenes}>
                {(['discovery', 'tradeoffs', 'adoption', 'strategy'] as const).map(gene => (
                  <GeneSlider
                    key={gene}
                    geneId={gene}
                    value={genes[gene]}
                    onChange={(v) => updateGene(gene, v)}
                  />
                ))}
              </div>
            </div>
            
            {/* Education Domain */}
            <div className={styles.domainGroup}>
              <div className={styles.domainHeader}>
                <span className={`${styles.domainDot} ${styles.education}`} />
                <span className={styles.domainName}>Education</span>
              </div>
              <div className={styles.domainGenes}>
                {(['mentalModels', 'communication', 'enablement', 'cognitiveErgonomics'] as const).map(gene => (
                  <GeneSlider
                    key={gene}
                    geneId={gene}
                    value={genes[gene]}
                    onChange={(v) => updateGene(gene, v)}
                  />
                ))}
              </div>
            </div>
            
            {/* Systems Domain */}
            <div className={styles.domainGroup}>
              <div className={styles.domainHeader}>
                <span className={`${styles.domainDot} ${styles.systems}`} />
                <span className={styles.domainName}>Systems (The Spine)</span>
              </div>
              <div className={styles.domainGenes}>
                {(['constraints', 'verification', 'operability', 'governance'] as const).map(gene => (
                  <GeneSlider
                    key={gene}
                    geneId={gene}
                    value={genes[gene]}
                    onChange={(v) => updateGene(gene, v)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right panel: Metrics */}
        <div className={styles.metricsPanel}>
          {/* Primary Metrics */}
          <div className={styles.primaryMetrics}>
            <div className={`${styles.metricCard} ${styles.primary} ${styles[permissionStatus === 'high' ? 'highlight' : permissionStatus === 'mid' ? 'warning' : 'danger']}`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricTitle}>Permission</span>
                <span className={`${styles.metricDelta} ${circuit.permissionDelta >= 0 ? styles.positive : styles.negative}`}>
                  {circuit.permissionDelta >= 0 ? '+' : ''}{circuit.permissionDelta.toFixed(2)}/tick
                </span>
              </div>
              <div className={`${styles.metricValue} ${styles[permissionStatus]}`}>
                {circuit.permission.toFixed(1)}%
              </div>
              <ProgressBar value={circuit.permission} status={permissionStatus} large />
              <p className={styles.metricDescription}>
                Your license to operate and deliver outcomes
              </p>
            </div>
            
            <div className={`${styles.metricCard} ${styles.primary}`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricTitle}>Gov. Satisfaction</span>
              </div>
              <div className={`${styles.metricValue} ${styles[getStatusClass(circuit.govSatisfaction, { high: 60, mid: 40 })]}`}>
                {circuit.govSatisfaction.toFixed(1)}%
              </div>
              <ProgressBar 
                value={circuit.govSatisfaction} 
                status={getStatusClass(circuit.govSatisfaction, { high: 60, mid: 40 })} 
                large 
              />
              <p className={styles.metricDescription}>
                Aggregate stakeholder satisfaction
              </p>
            </div>
            
            <div className={`${styles.metricCard} ${styles.primary} ${circuit.risk > 50 ? styles.danger : ''}`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricTitle}>Risk</span>
                <span className={`${styles.metricDelta} ${circuit.riskDelta <= 0 ? styles.positive : styles.negative}`}>
                  {circuit.riskDelta >= 0 ? '+' : ''}{circuit.riskDelta.toFixed(2)}/tick
                </span>
              </div>
              <div className={`${styles.metricValue} ${styles[riskStatus]}`}>
                {circuit.risk.toFixed(1)}%
              </div>
              <ProgressBar value={circuit.risk} status={riskStatus} large />
              <p className={styles.metricDescription}>
                Unmitigated risk from AI capacity
              </p>
            </div>
            
            <div className={`${styles.metricCard} ${styles.primary} ${circuit.burnout > 50 ? styles.warning : ''}`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricTitle}>Burnout</span>
              </div>
              <div className={`${styles.metricValue} ${styles[burnoutStatus]}`}>
                {circuit.burnout.toFixed(1)}%
              </div>
              <ProgressBar value={circuit.burnout} status={burnoutStatus} large />
              <p className={styles.metricDescription}>
                Team capacity degradation
              </p>
            </div>
          </div>
          
          {/* Secondary Metrics */}
          <div className={styles.secondaryMetrics}>
            <div className={styles.metricRow}>
              <span className={styles.metricRowLabel}>Total Capacity</span>
              <span className={styles.metricRowValue}>{formatNumber(circuit.totalCapacity)} units</span>
              <div className={styles.metricRowBar}>
                <div 
                  className={`${styles.progressFill} ${styles.product}`}
                  style={{ width: `${Math.min(100, circuit.totalCapacity / 10)}%` }}
                />
              </div>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricRowLabel}>AI Multiplier</span>
              <span className={styles.metricRowValue}>x{circuit.aiMultiplier.toFixed(2)}</span>
              <div className={styles.metricRowBar}>
                <div 
                  className={`${styles.progressFill} ${styles.product}`}
                  style={{ width: `${Math.min(100, circuit.aiMultiplier * 20)}%` }}
                />
              </div>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricRowLabel}>Spine Strength</span>
              <span className={styles.metricRowValue}>{Math.round(circuit.spineStrength * 100)}%</span>
              <div className={styles.metricRowBar}>
                <div 
                  className={`${styles.progressFill} ${styles.systems}`}
                  style={{ width: `${circuit.spineStrength * 100}%` }}
                />
              </div>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricRowLabel}>Evidence Yield</span>
              <span className={styles.metricRowValue}>{formatNumber(circuit.evidenceYield)} units</span>
              <div className={styles.metricRowBar}>
                <div 
                  className={`${styles.progressFill} ${styles.systems}`}
                  style={{ width: `${Math.min(100, circuit.evidenceYield / 5)}%` }}
                />
              </div>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricRowLabel}>Outcomes/sec</span>
              <span className={styles.metricRowValue}>+{circuit.outcomesPerTick.toFixed(1)} pts</span>
              <div className={styles.metricRowBar}>
                <div 
                  className={`${styles.progressFill} ${styles.education}`}
                  style={{ width: `${Math.min(100, circuit.outcomesPerTick * 2)}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Bottleneck Alert */}
          {circuit.bottleneckSeverity > 20 && (
            <div className={styles.bottleneckAlert}>
              <svg className={styles.bottleneckIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div className={styles.bottleneckContent}>
                <div className={styles.bottleneckTitle}>Bottleneck Detected</div>
                <div className={styles.bottleneckMessage}>{circuit.bottleneck}</div>
                <ProgressBar 
                  value={circuit.bottleneckSeverity} 
                  status="mid"
                  showLabel={false}
                />
              </div>
            </div>
          )}
          
          {/* Stakeholder Breakdown */}
          <div className={styles.stakeholderSection}>
            <div className={styles.stakeholderTitle}>Stakeholder Satisfaction</div>
            <div className={styles.stakeholderList}>
              {Object.entries(circuit.stakeholderBreakdown).map(([key, value]) => (
                <div key={key} className={styles.stakeholderItem}>
                  <span className={styles.stakeholderName}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={styles.stakeholderValue}>{Math.round(value)}%</span>
                  <div className={styles.stakeholderBar}>
                    <div 
                      className={`${styles.progressFill} ${styles[getStatusClass(value, { high: 60, mid: 40 })]}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Circuit Panel */}
      <div className={`${styles.circuitPanel} ${showCircuit ? styles.expanded : styles.collapsed}`}>
        <button className={styles.circuitToggle} onClick={() => setShowCircuit(!showCircuit)}>
          <span>The Full Circuit Model</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showCircuit && (
          <div className={styles.circuitContent}>
            <div className={styles.circuitStage}>
              <div className={styles.stageName}>Stage 1: Human Capacity</div>
              <div className={styles.stageFormula}>h_eff = base x (1 - burnout) x (1 - coord)</div>
              <div className={styles.stageResult}>
                <span className={styles.stageResultLabel}>
                  {circuit.humanCapacity.toFixed(1)} x {circuit.burnoutFactor.toFixed(2)} x {(1 - circuit.coordResistance).toFixed(2)}
                </span>
                <span className={styles.stageResultValue}>= {circuit.effectiveHumanCapacity.toFixed(1)}</span>
              </div>
            </div>
            
            <div className={styles.circuitStage}>
              <div className={styles.stageName}>Stage 2: AI Amplification</div>
              <div className={styles.stageFormula}>G_ai = (1 + ai x 4) x sqrt(C1 x C2)</div>
              <div className={styles.stageResult}>
                <span className={styles.stageResultLabel}>
                  Base gain: {circuit.baseAIGain.toFixed(2)}, Safety: {circuit.safetyFactor.toFixed(2)}
                </span>
                <span className={styles.stageResultValue}>= x{circuit.aiMultiplier.toFixed(2)}</span>
              </div>
            </div>
            
            <div className={styles.circuitStage}>
              <div className={styles.stageName}>Stage 3: Total Capacity</div>
              <div className={styles.stageFormula}>capacity = h_eff x G_ai x demand</div>
              <div className={styles.stageResult}>
                <span className={styles.stageResultLabel}>
                  {circuit.effectiveHumanCapacity.toFixed(1)} x {circuit.aiMultiplier.toFixed(2)} x {circuit.demandFactor.toFixed(2)}
                </span>
                <span className={styles.stageResultValue}>= {circuit.totalCapacity.toFixed(1)}</span>
              </div>
            </div>
            
            <div className={styles.circuitStage}>
              <div className={styles.stageName}>Stage 4: Evidence (Spine)</div>
              <div className={styles.stageFormula}>evidence = capacity x spine_strength</div>
              <div className={styles.stageResult}>
                <span className={styles.stageResultLabel}>
                  {circuit.totalCapacity.toFixed(1)} x {circuit.spineStrength.toFixed(2)}
                </span>
                <span className={styles.stageResultValue}>= {circuit.evidenceYield.toFixed(1)}</span>
              </div>
            </div>
            
            <div className={styles.circuitStage}>
              <div className={styles.stageName}>Stage 5: Permission</div>
              <div className={styles.stageFormula}>delta = (evidence x 0.0015) - (risk x 0.001)</div>
              <div className={styles.stageResult}>
                <span className={styles.stageResultLabel}>Current: {circuit.permission.toFixed(1)}%</span>
                <span className={styles.stageResultValue}>
                  Delta: {circuit.permissionDelta >= 0 ? '+' : ''}{circuit.permissionDelta.toFixed(3)}/tick
                </span>
              </div>
            </div>
            
            <div className={styles.circuitStage}>
              <div className={styles.stageName}>Stage 6: Outcomes</div>
              <div className={styles.stageFormula}>outcomes = permission x capacity x mission_avg</div>
              <div className={styles.stageResult}>
                <span className={styles.stageResultLabel}>Score rate</span>
                <span className={styles.stageResultValue}>= {circuit.outcomesPerTick.toFixed(2)} pts/tick</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer insight */}
      <footer className={styles.gameFooter}>
        <p className={styles.insightText}>
          <span className={styles.insightHighlight}>Key Insight:</span> To maximize outcomes, build the enablement spine (Systems genes) 
          first. AI capacity without evidence capability creates risk, not permission.
        </p>
      </footer>
    </div>
  );
}

export default function GenomeGamePage() {
  return (
    <Layout
      title="The Permission Game"
      description="An interactive simulation for understanding the engineering genome in government context"
    >
      <Head>
        <style>{`
          .navbar { display: none !important; }
          .main-wrapper { padding-top: 0 !important; }
        `}</style>
      </Head>
      <PermissionGame />
    </Layout>
  );
}
