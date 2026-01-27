/**
 * MobileNode - Simplified node for mobile/compact view
 */

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useHistory } from '@docusaurus/router';
import { 
  Users,
  Compass,
  Rocket,
} from 'lucide-react';
import type { EcosystemNodeData } from '../data';
import styles from '../EcosystemDiagram.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users,
  Compass,
  Rocket,
};

function MobileNode({ data }: NodeProps<EcosystemNodeData>) {
  const [showTooltip, setShowTooltip] = useState(false);
  const history = useHistory();
  const IconComponent = iconMap[data.icon] || Users;

  const handleClick = () => {
    if (data.link) {
      history.push(data.link);
    }
  };

  return (
    <div 
      className={styles.mobileNode}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${data.label}: ${data.description}`}
    >
      <Handle type="target" position={Position.Top} className={styles.handle} />
      
      <div className={styles.mobileIcon}>
        <IconComponent size={24} />
      </div>
      <div className={styles.mobileLabel}>{data.label}</div>
      <div className={styles.mobileDesc}>{data.description}</div>
      
      {showTooltip && (
        <div className={styles.tooltipMobile}>
          Tap to explore
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </div>
  );
}

export default memo(MobileNode);
