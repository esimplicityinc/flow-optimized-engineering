import React, { ReactNode } from 'react';

type PrincipleType = 'understanding' | 'feedback' | 'confidence';

interface PrincipleCardProps {
  principle: PrincipleType;
  title: string;
  children: ReactNode;
  icon?: string;
}

const principleStyles: Record<PrincipleType, { color: string; bg: string }> = {
  understanding: {
    color: '#0891b2',
    bg: 'linear-gradient(135deg, rgba(8, 145, 178, 0.15) 0%, rgba(8, 145, 178, 0.05) 100%)',
  },
  feedback: {
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)',
  },
  confidence: {
    color: '#059669',
    bg: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)',
  },
};

const defaultIcons: Record<PrincipleType, string> = {
  understanding: '🧠',
  feedback: '🔄',
  confidence: '🛡️',
};

/**
 * PrincipleCard - Styled card for displaying FOE principles
 * 
 * Usage:
 * <PrincipleCard principle="understanding" title="Optimize for Understanding">
 *   Form accurate mental models...
 * </PrincipleCard>
 */
export function PrincipleCard({ 
  principle, 
  title, 
  children, 
  icon 
}: PrincipleCardProps) {
  const styles = principleStyles[principle];
  const displayIcon = icon || defaultIcons[principle];

  return (
    <div
      className={`principle-card ${principle}`}
      style={{
        padding: '2em',
        borderRadius: '20px',
        textAlign: 'center',
        background: styles.bg,
        border: `2px solid ${styles.color}`,
      }}
    >
      {displayIcon && (
        <div className="icon" style={{ fontSize: '3em', marginBottom: '0.3em' }}>
          {displayIcon}
        </div>
      )}
      <h3 style={{ 
        margin: '0.3em 0', 
        color: styles.color,
        fontSize: '1.2em',
      }}>
        {title}
      </h3>
      <div style={{ 
        color: '#64748b', 
        fontSize: '0.8em',
        lineHeight: 1.4,
      }}>
        {children}
      </div>
    </div>
  );
}

export default PrincipleCard;
