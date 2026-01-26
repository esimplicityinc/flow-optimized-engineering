import React from 'react';

interface StatBlockProps {
  value: string | number;
  label: string;
  suffix?: string;
  color?: 'primary' | 'understanding' | 'feedback' | 'confidence';
  size?: 'normal' | 'large';
}

const colorMap = {
  primary: '#1e40af',
  understanding: '#0891b2',
  feedback: '#7c3aed',
  confidence: '#059669',
};

/**
 * StatBlock - Display a large statistic with label
 * 
 * Usage:
 * <StatBlock value="208" suffix="×" label="deployment frequency" />
 */
export function StatBlock({ 
  value, 
  label, 
  suffix, 
  color = 'primary',
  size = 'normal' 
}: StatBlockProps) {
  const fontSize = size === 'large' ? '6em' : '4em';
  
  return (
    <div className="stat-block" style={{ textAlign: 'center', padding: '1em' }}>
      <div 
        className="stat-value" 
        style={{ 
          fontSize, 
          fontWeight: 800, 
          color: colorMap[color],
          lineHeight: 1,
          marginBottom: '0.1em',
        }}
      >
        {value}
        {suffix && (
          <span style={{ fontSize: '0.5em', verticalAlign: 'super' }}>
            {suffix}
          </span>
        )}
      </div>
      <div 
        className="stat-label"
        style={{
          fontSize: '0.5em',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default StatBlock;
