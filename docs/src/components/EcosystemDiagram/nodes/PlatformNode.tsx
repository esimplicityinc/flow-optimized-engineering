/**
 * PlatformNode - Custom node for platforms with nested sub-components
 */

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useHistory } from '@docusaurus/router';
import { 
  Layers,
  Rocket,
  Compass,
} from 'lucide-react';
import type { EcosystemNodeData } from '../data';
import styles from '../EcosystemDiagram.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Layers,
  Rocket,
  Compass,
};

function PlatformNode({ data }: NodeProps<EcosystemNodeData>) {
  const [showTooltip, setShowTooltip] = useState(false);
  const history = useHistory();
  const IconComponent = iconMap[data.icon] || Layers;
  
  // Determine node type for styling
  const isKatalyst = data.label === 'KATALYST';
  const isFoe = data.label === 'Flow Optimized Engineering';
  
  // Get the appropriate style class
  const getNodeClass = () => {
    if (isKatalyst) return styles.katalystNode;
    if (isFoe) return styles.foeNode;
    return styles.primaNode;
  };

  const handleClick = () => {
    if (data.link) {
      history.push(data.link);
    }
  };

  return (
    <div 
      className={`${styles.platformNode} ${getNodeClass()}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${data.label}: ${data.description}`}
      style={{ cursor: data.link ? 'pointer' : 'default' }}
    >
      <Handle type="target" position={Position.Top} className={styles.handle} />
      <Handle type="target" position={Position.Left} className={styles.handle} />
      
      <div className={styles.platformHeader}>
        <div className={styles.platformIcon}>
          <IconComponent size={24} />
        </div>
        <div className={styles.platformLabel}>{data.label}</div>
      </div>
      
      {/* Sub-components */}
      {data.subComponents && data.subComponents.length > 0 && (
        <div className={styles.subComponents}>
          {data.subComponents.map((comp) => (
            <span key={comp} className={styles.subComponent}>
              {comp}
            </span>
          ))}
        </div>
      )}
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>{data.label}</div>
          <div className={styles.tooltipDesc}>{data.description}</div>
          {data.subComponents && (
            <div className={styles.tooltipSubs}>
              Components: {data.subComponents.join(', ')}
            </div>
          )}
          {data.link && <div className={styles.tooltipHint}>Click to learn more</div>}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </div>
  );
}

export default memo(PlatformNode);
