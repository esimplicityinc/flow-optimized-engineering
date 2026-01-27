/**
 * FlowLines - Animated SVG flow connections with particles
 */

import React from 'react';
import type { FlowLinesProps } from './types';
import styles from './styles.module.css';

function FlowLines({ direction, speed, intensity }: FlowLinesProps): React.ReactElement {
  // Calculate animation duration based on speed (faster speed = shorter duration)
  const flowDuration = Math.max(0.5, 3 / speed);
  const particleDuration = Math.max(1, 4 / speed);
  
  // Flow labels based on direction
  const labels = direction === 'in' 
    ? ['Capacity', 'Demand'] 
    : ['Evidence', 'Permission'];
  
  // Number of particles based on intensity
  const particleCount = Math.ceil(intensity * 5);
  
  return (
    <div className={styles.flowLinesContainer}>
      <svg 
        className={styles.flowLinesSvg}
        viewBox="0 0 60 300"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for flow lines */}
          <linearGradient 
            id={`flowGradient-${direction}`} 
            x1="0%" y1="0%" x2="100%" y2="0%"
          >
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.3)" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id={`glow-${direction}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Motion path for particles */}
          <path
            id={`motionPath-${direction}`}
            d={direction === 'in' 
              ? "M 5 150 Q 30 150, 55 150"
              : "M 5 150 Q 30 150, 55 150"
            }
            fill="none"
          />
        </defs>
        
        {/* Main flow lines - multiple for depth effect */}
        {[0, 1, 2].map((i) => {
          const yOffset = 100 + (i * 50);
          const pathD = `M 0 ${yOffset} Q 30 ${yOffset + (i % 2 === 0 ? 10 : -10)}, 60 ${yOffset}`;
          
          return (
            <g key={i}>
              {/* Background glow */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="8"
                filter={`url(#glow-${direction})`}
              />
              
              {/* Main animated line */}
              <path
                d={pathD}
                className={styles.flowPath}
                style={{ 
                  '--flow-duration': `${flowDuration + (i * 0.3)}s`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.5 + (intensity * 0.5),
                } as React.CSSProperties}
              />
              
              {/* Particles along the path */}
              {Array.from({ length: particleCount }).map((_, pIndex) => (
                <circle
                  key={`particle-${i}-${pIndex}`}
                  r="3"
                  className={styles.flowParticle}
                  style={{
                    '--particle-duration': `${particleDuration}s`,
                    animationDelay: `${(pIndex / particleCount) * particleDuration}s`,
                    offsetPath: `path('${pathD}')`,
                    offsetRotate: '0deg',
                  } as React.CSSProperties}
                >
                  <animate
                    attributeName="r"
                    values="2;4;2"
                    dur={`${particleDuration}s`}
                    repeatCount="indefinite"
                    begin={`${(pIndex / particleCount) * particleDuration}s`}
                  />
                </circle>
              ))}
            </g>
          );
        })}
        
        {/* Flow labels */}
        <text
          x="30"
          y="70"
          className={styles.flowLabel}
          textAnchor="middle"
        >
          {labels[0]}
        </text>
        <text
          x="30"
          y="250"
          className={styles.flowLabel}
          textAnchor="middle"
        >
          {labels[1]}
        </text>
        
        {/* Arrow indicator */}
        <polygon
          points={direction === 'in' 
            ? "50,145 60,150 50,155"
            : "50,145 60,150 50,155"
          }
          fill="rgba(139, 92, 246, 0.8)"
          style={{ filter: `url(#glow-${direction})` }}
        />
      </svg>
    </div>
  );
}

export default FlowLines;
