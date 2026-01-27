/**
 * AgentNode - Custom node for orchestrator agents
 */

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useHistory } from '@docusaurus/router';
import { 
  FlaskConical, 
  Search, 
  Map, 
  Radar, 
  Sparkles,
  Bot
} from 'lucide-react';
import type { DiagramNodeData } from '../data';
import styles from '../SystemDiagram.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FlaskConical,
  Search,
  Map,
  Radar,
  Sparkles,
  Bot,
};

function AgentNode({ data }: NodeProps<DiagramNodeData>) {
  const [showTooltip, setShowTooltip] = useState(false);
  const history = useHistory();
  const IconComponent = iconMap[data.icon] || Bot;

  const handleClick = () => {
    history.push(data.link);
  };

  return (
    <div 
      className={styles.agentNode}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${data.label}: ${data.description}`}
    >
      <Handle type="target" position={Position.Bottom} className={styles.handle} />
      
      <div className={styles.agentIcon}>
        <IconComponent size={20} />
      </div>
      <div className={styles.agentLabel}>{data.label}</div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>{data.label}</div>
          <div className={styles.tooltipDesc}>{data.description}</div>
          <div className={styles.tooltipHint}>Click to learn more</div>
        </div>
      )}
      
      <Handle type="source" position={Position.Top} className={styles.handle} />
    </div>
  );
}

export default memo(AgentNode);
