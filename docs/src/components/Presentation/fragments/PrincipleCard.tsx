import React, { ReactNode } from 'react';
import { PrincipleIcons, defaultIconProps } from '../icons';

type PrincipleType = 'understanding' | 'feedback' | 'confidence';

interface PrincipleCardProps {
  principle: PrincipleType;
  title: string;
  children: ReactNode;
  /** Size of the icon in pixels */
  iconSize?: number;
  /** Hide the icon */
  hideIcon?: boolean;
}

const principleStyles: Record<PrincipleType, { color: string; bg: string }> = {
  understanding: {
    color: '#3EC5BB',
    bg: 'linear-gradient(135deg, rgba(62, 197, 187, 0.15) 0%, rgba(62, 197, 187, 0.05) 100%)',
  },
  feedback: {
    color: '#CC8BFA',
    bg: 'linear-gradient(135deg, rgba(204, 139, 250, 0.15) 0%, rgba(204, 139, 250, 0.05) 100%)',
  },
  confidence: {
    color: '#3B82F6',
    bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)',
  },
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
  iconSize = defaultIconProps.size,
  hideIcon = false,
}: PrincipleCardProps) {
  const styles = principleStyles[principle];
  const IconComponent = PrincipleIcons[principle];

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
      {!hideIcon && IconComponent && (
        <div className="icon" style={{ marginBottom: '0.5em' }}>
          <IconComponent 
            size={iconSize} 
            color={styles.color} 
            strokeWidth={defaultIconProps.strokeWidth}
            aria-hidden="true"
          />
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
        color: '#475569', 
        fontSize: '0.8em',
        lineHeight: 1.4,
      }}>
        {children}
      </div>
    </div>
  );
}

export default PrincipleCard;
