/**
 * ContentNode - Custom node for content types (Experiments, Methods, etc.)
 */

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useHistory } from '@docusaurus/router';
import { 
  TestTube, 
  BookOpen, 
  Compass, 
  TrendingUp,
  FileText
} from 'lucide-react';
import type { DiagramNodeData } from '../data';
import styles from '../SystemDiagram.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TestTube,
  BookOpen,
  Compass,
  TrendingUp,
  FileText,
};

function ContentNode({ data }: NodeProps<DiagramNodeData>) {
  const [showTooltip, setShowTooltip] = useState(false);
  const history = useHistory();
  const IconComponent = iconMap[data.icon] || FileText;

  const handleClick = () => {
    history.push(data.link);
  };

  return (
    <div 
      className={styles.contentNode}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${data.label}: ${data.description}`}
    >
      {/* Handles on all 4 sides for flexible edge routing - both source and target at each position */}
      <Handle type="target" position={Position.Top} id="top" className={styles.handle} />
      <Handle type="source" position={Position.Top} id="top-source" className={styles.handle} />
      <Handle type="target" position={Position.Bottom} id="bottom" className={styles.handle} />
      <Handle type="source" position={Position.Bottom} id="bottom-source" className={styles.handle} />
      <Handle type="target" position={Position.Left} id="left" className={styles.handle} />
      <Handle type="source" position={Position.Left} id="left-source" className={styles.handle} />
      <Handle type="target" position={Position.Right} id="right" className={styles.handle} />
      <Handle type="source" position={Position.Right} id="right-source" className={styles.handle} />
      
      <div className={styles.contentIcon}>
        <IconComponent size={18} />
      </div>
      <div className={styles.contentLabel}>{data.label}</div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>{data.label}</div>
          <div className={styles.tooltipDesc}>{data.description}</div>
          <div className={styles.tooltipHint}>Click to learn more</div>
        </div>
      )}
    </div>
  );
}

export default memo(ContentNode);
