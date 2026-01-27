/**
 * AIFactorSlider - Two sliders: AI Factor and FOE Maturity
 */

import React from 'react';
import type { GeneLevels } from './types';
import styles from './styles.module.css';

// Keep presets for programmatic use, but don't show buttons
export const PRESETS = [
  {
    id: 'preAI',
    name: 'Pre-AI Baseline',
    aiFactor: 0.1,
    foeMaturity: 0.3,
  },
  {
    id: 'aiWithoutSpine',
    name: 'AI Without Spine',
    aiFactor: 0.8,
    foeMaturity: 0.3,
  },
  {
    id: 'balanced',
    name: 'Balanced AI Era',
    aiFactor: 0.8,
    foeMaturity: 0.8,
  },
];

// Generate gene levels from FOE maturity value (0-1)
export function geneLevelsFromMaturity(maturity: number): GeneLevels {
  // Spine genes scale more dramatically with maturity
  const spineLevel = 0.2 + (maturity * 0.7); // 0.2 to 0.9
  
  // Other genes scale moderately
  const productLevel = 0.4 + (maturity * 0.4); // 0.4 to 0.8
  const educationLevel = 0.35 + (maturity * 0.45); // 0.35 to 0.8
  
  return {
    // Product genes
    discovery: productLevel,
    tradeoffs: productLevel,
    adoption: productLevel,
    strategy: productLevel,
    // Education genes
    mentalModels: educationLevel,
    communication: educationLevel,
    enablement: educationLevel + 0.05, // Enablement slightly higher
    cognitiveErgonomics: educationLevel,
    // Spine genes (most affected by FOE maturity)
    constraints: spineLevel,
    verification: spineLevel,
    operability: spineLevel,
    governance: spineLevel,
  };
}

interface DualSliderProps {
  aiFactor: number;
  foeMaturity: number;
  onAIFactorChange: (value: number) => void;
  onFOEMaturityChange: (value: number) => void;
}

function AIFactorSlider({
  aiFactor,
  foeMaturity,
  onAIFactorChange,
  onFOEMaturityChange,
}: DualSliderProps): React.ReactElement {
  
  return (
    <div className={styles.sliderSection}>
      {/* AI Factor Slider */}
      <div className={styles.sliderRow}>
        <div className={styles.sliderHeader}>
          <label className={styles.sliderLabel} htmlFor="ai-factor-slider">
            AI Factor
          </label>
          <span className={styles.sliderValue}>{aiFactor.toFixed(2)}</span>
        </div>
        
        <input
          id="ai-factor-slider"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={aiFactor}
          onChange={(e) => onAIFactorChange(parseFloat(e.target.value))}
          className={styles.slider}
          aria-label={`AI Factor: ${aiFactor.toFixed(2)}`}
        />
        
        <div className={styles.sliderMarkers}>
          <span>Pre-AI Era</span>
          <span>Full AI Era</span>
        </div>
      </div>
      
      {/* FOE Maturity Slider */}
      <div className={styles.sliderRow}>
        <div className={styles.sliderHeader}>
          <label className={styles.sliderLabel} htmlFor="foe-maturity-slider">
            Flow Optimized Engineering Maturity
          </label>
          <span className={styles.sliderValue}>{foeMaturity.toFixed(2)}</span>
        </div>
        
        <input
          id="foe-maturity-slider"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={foeMaturity}
          onChange={(e) => onFOEMaturityChange(parseFloat(e.target.value))}
          className={`${styles.slider} ${styles.sliderFOE}`}
          aria-label={`FOE Maturity: ${foeMaturity.toFixed(2)}`}
        />
        
        <div className={styles.sliderMarkers}>
          <span>No Spine (permission bottleneck)</span>
          <span>Strong Spine (evidence scales)</span>
        </div>
      </div>
    </div>
  );
}

export default AIFactorSlider;
