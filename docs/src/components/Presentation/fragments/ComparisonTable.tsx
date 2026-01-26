import React from 'react';

interface ComparisonRow {
  label: string;
  left: string;
  right: string;
}

interface ComparisonTableProps {
  leftHeader: string;
  rightHeader: string;
  rows: ComparisonRow[];
  leftColor?: string;
  rightColor?: string;
}

/**
 * ComparisonTable - Side-by-side comparison display
 * 
 * Usage:
 * <ComparisonTable
 *   leftHeader="Flow Metrics"
 *   rightHeader="Output Metrics"
 *   rows={[
 *     { label: 'What it measures', left: 'System health', right: 'Activity' },
 *   ]}
 * />
 */
export function ComparisonTable({
  leftHeader,
  rightHeader,
  rows,
  leftColor = '#3B82F6',
  rightColor = '#F59E0B',
}: ComparisonTableProps) {
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        margin: '1em 0',
      }}
    >
      <thead>
        <tr>
          <th style={{ 
            padding: '0.8em', 
            background: '#3223BD', 
            color: 'white',
            width: '20%',
          }}>
            &nbsp;
          </th>
          <th style={{ 
            padding: '0.8em', 
            background: leftColor, 
            color: 'white',
            width: '40%',
          }}>
            {leftHeader}
          </th>
          <th style={{ 
            padding: '0.8em', 
            background: rightColor, 
            color: 'white',
            width: '40%',
          }}>
            {rightHeader}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr 
            key={index}
            style={{
              background: index % 2 === 0 ? 'rgba(50, 35, 189, 0.05)' : 'transparent',
            }}
          >
            <td style={{ 
              padding: '0.6em 1em', 
              fontWeight: 600,
              borderBottom: '1px solid rgba(50, 35, 189, 0.1)',
            }}>
              {row.label}
            </td>
            <td style={{ 
              padding: '0.6em 1em',
              borderBottom: '1px solid rgba(50, 35, 189, 0.1)',
              textAlign: 'center',
            }}>
              {row.left}
            </td>
            <td style={{ 
              padding: '0.6em 1em',
              borderBottom: '1px solid rgba(50, 35, 189, 0.1)',
              textAlign: 'center',
            }}>
              {row.right}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ComparisonTable;
