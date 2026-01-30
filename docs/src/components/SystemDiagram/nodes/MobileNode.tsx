/**
 * MobileNode - Simplified node for mobile view
 */

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useHistory } from '@docusaurus/router';
import { 
  ArrowRight, 
  Bot, 
  FileText 
} from 'lucide-react';
import type { DiagramNodeData } from '../data';
import styles from '../SystemDiagram.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ArrowRight,
  Bot,
  FileText,
};

function MobileNode({ data }: NodeProps<DiagramNodeData>) {
  const [showTooltip, setShowTooltip] = useState(false);
  const history = useHistory();
  const IconComponent = iconMap[data.icon] || FileText;

  const handleClick = () => {
    history.push(data.link);
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
      {/* Handles on all 4 sides for flexible edge routing - both source and target at each position */}
      <Handle type="target" position={Position.Top} id="top" className={styles.handle} />
      <Handle type="source" position={Position.Top} id="top-source" className={styles.handle} />
      <Handle type="target" position={Position.Bottom} id="bottom" className={styles.handle} />
      <Handle type="source" position={Position.Bottom} id="bottom-source" className={styles.handle} />
      <Handle type="target" position={Position.Left} id="left" className={styles.handle} />
      <Handle type="source" position={Position.Left} id="left-source" className={styles.handle} />
      <Handle type="target" position={Position.Right} id="right" className={styles.handle} />
      <Handle type="source" position={Position.Right} id="right-source" className={styles.handle} />
      
      <div className={styles.mobileIcon}>
        <IconComponent size={24} />
      </div>
      <div className={styles.mobileLabel}>{data.label}</div>
      <div className={styles.mobileDesc}>{data.description}</div>
      
      {showTooltip && (
        <div className={styles.tooltipMobile}>
          <div className={styles.tooltipHint}>Tap to learn more</div>
        </div>
      )}
    </div>
  );
}

export default memo(MobileNode);
