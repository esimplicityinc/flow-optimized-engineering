/**
 * AIFactorSlider - Slider with preset configurations
 */

import React from 'react';
import type { AIFactorSliderProps, Preset, GeneLevels } from './types';
import styles from './styles.module.css';

// Preset configurations
export const PRESETS: Preset[] = [
  {
    id: 'preAI',
    name: 'Pre-AI Baseline',
    description: 'Code is the bottleneck',
    aiFactor: 0.1,
    genes: {
      discovery: 0.5,
      tradeoffs: 0.5,
      adoption: 0.5,
      strategy: 0.5,
      mentalModels: 0.5,
      communication: 0.5,
      enablement: 0.4,
      cognitiveErgonomics: 0.4,
      constraints: 0.3,
      verification: 0.3,
      operability: 0.3,
      governance: 0.3,
    },
  },
  {
    id: 'aiWithoutSpine',
    name: 'AI Without Spine',
    description: 'Permission bottleneck',
    aiFactor: 0.8,
    genes: {
      discovery: 0.7,
      tradeoffs: 0.6,
      adoption: 0.7,
      strategy: 0.6,
      mentalModels: 0.5,
      communication: 0.5,
      enablement: 0.5,
      cognitiveErgonomics: 0.5,
      constraints: 0.3,
      verification: 0.3,
      operability: 0.3,
      governance: 0.3,
    },
  },
  {
    id: 'balanced',
    name: 'Balanced AI Era',
    description: 'Evidence scales with capacity',
    aiFactor: 0.8,
    genes: {
      discovery: 0.7,
      tradeoffs: 0.7,
      adoption: 0.7,
      strategy: 0.7,
      mentalModels: 0.7,
      communication: 0.7,
      enablement: 0.8,
      cognitiveErgonomics: 0.7,
      constraints: 0.8,
      verification: 0.8,
      operability: 0.8,
      governance: 0.8,
    },
  },
];

interface AIFactorSliderWithPresetsProps extends AIFactorSliderProps {
  activePreset?: string;
}

function AIFactorSlider({
  value,
  onChange,
  onPresetSelect,
  activePreset,
}: AIFactorSliderWithPresetsProps): React.ReactElement {
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };
  
  return (
    <div className={styles.sliderSection}>
      <div className={styles.sliderHeader}>
        <label className={styles.sliderLabel} htmlFor="ai-factor-slider">
          AI Factor
        </label>
        <span className={styles.sliderValue}>{value.toFixed(2)}</span>
      </div>
      
      <input
        id="ai-factor-slider"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={value}
        onChange={handleSliderChange}
        className={styles.slider}
        aria-label={`AI Factor: ${value.toFixed(2)}`}
      />
      
      <div className={styles.sliderMarkers}>
        <span>Pre-AI Era (code bottleneck)</span>
        <span>Full AI Era (permission bottleneck)</span>
      </div>
      
      {/* Presets */}
      <div className={styles.presets}>
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            className={`${styles.presetButton} ${activePreset === preset.id ? styles.active : ''}`}
            onClick={() => onPresetSelect(preset.id)}
            aria-pressed={activePreset === preset.id}
          >
            <span className={styles.presetName}>{preset.name}</span>
            <span className={styles.presetDesc}>{preset.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AIFactorSlider;
