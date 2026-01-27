/**
 * TeamNode - Custom node for teams/actors in the ecosystem
 */

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useHistory } from '@docusaurus/router';
import { 
  Building2,
  Shield,
  Users,
  UserCog,
} from 'lucide-react';
import type { EcosystemNodeData } from '../data';
import styles from '../EcosystemDiagram.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Shield,
  Users,
  UserCog,
};

function TeamNode({ data }: NodeProps<EcosystemNodeData>) {
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
      className={styles.teamNode}
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
      
      <div className={styles.teamIcon}>
        <IconComponent size={18} />
      </div>
      <div className={styles.teamLabel}>{data.label}</div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>{data.label}</div>
          <div className={styles.tooltipDesc}>{data.description}</div>
          {data.link && <div className={styles.tooltipHint}>Click to learn more</div>}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </div>
  );
}

export default memo(TeamNode);
