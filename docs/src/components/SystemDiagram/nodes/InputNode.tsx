/**
 * InputNode - Custom node for input sources (Human Experience, Repos, etc.)
 */

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useHistory } from '@docusaurus/router';
import { 
  User, 
  GitBranch, 
  Library, 
  Globe,
  ArrowRight
} from 'lucide-react';
import type { DiagramNodeData } from '../data';
import styles from '../SystemDiagram.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  User,
  GitBranch,
  Library,
  Globe,
  ArrowRight,
};

function InputNode({ data }: NodeProps<DiagramNodeData>) {
  const [showTooltip, setShowTooltip] = useState(false);
  const history = useHistory();
  const IconComponent = iconMap[data.icon] || ArrowRight;

  const handleClick = () => {
    history.push(data.link);
  };

  return (
    <div 
      className={styles.inputNode}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${data.label}: ${data.description}`}
    >
      <div className={styles.inputIcon}>
        <IconComponent size={16} />
      </div>
      <div className={styles.inputLabel}>{data.label}</div>
      
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

export default memo(InputNode);
