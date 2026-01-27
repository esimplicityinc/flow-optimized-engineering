/**
 * ConceptNode - Custom node for concepts/frameworks in the ecosystem
 */

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useHistory } from '@docusaurus/router';
import { 
  Sun,
  ListChecks,
  Compass,
  TrendingUp,
  BookOpen,
  Target,
  Network,
} from 'lucide-react';
import type { EcosystemNodeData } from '../data';
import styles from '../EcosystemDiagram.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sun,
  ListChecks,
  Compass,
  TrendingUp,
  BookOpen,
  Target,
  Network,
};

function ConceptNode({ data }: NodeProps<EcosystemNodeData>) {
  const [showTooltip, setShowTooltip] = useState(false);
  const history = useHistory();
  const IconComponent = iconMap[data.icon] || Compass;

  const handleClick = () => {
    if (data.link) {
      history.push(data.link);
    }
  };

  return (
    <div 
      className={styles.conceptNode}
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
      
      <div className={styles.conceptIcon}>
        <IconComponent size={18} />
      </div>
      <div className={styles.conceptLabel}>{data.label}</div>
      
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

export default memo(ConceptNode);
