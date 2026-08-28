import React from 'react';
import { NODE_CATEGORIES } from '../../data/pipelineData';

export default function PipelineLegend() {
  return (
    <div className="pipeline-legend-box" aria-label="ML Pipeline Category Legend">
      <div className="legend-header">Node Categories</div>
      <div className="legend-grid">
        {Object.entries(NODE_CATEGORIES).map(([key, item]) => (
          <div key={key} className="legend-item">
            <span
              className="legend-color-dot"
              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
