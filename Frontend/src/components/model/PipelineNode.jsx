import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import * as Icons from 'lucide-react';
import { NODE_CATEGORIES } from '../../data/pipelineData';

const PipelineNode = ({ data, selected }) => {
  const categoryInfo = NODE_CATEGORIES[data.category] || NODE_CATEGORIES.input;
  
  // Dynamic Lucide Icon
  const IconComponent = Icons[data.iconName] || Icons.Cpu;

  return (
    <div
      className={`pipeline-node ${selected ? 'is-selected' : ''}`}
      style={{
        '--node-accent': categoryInfo.color,
        '--badge-bg': categoryInfo.badgeBg
      }}
    >
      {/* Target (Input) Ports */}
      {data.ports?.inputs?.map((portId, idx) => (
        <Handle
          key={`in-${portId}-${idx}`}
          type="target"
          position={Position.Left}
          id={portId}
          className="pipeline-handle handle-input"
          style={{ top: `${(idx + 1) * (100 / (data.ports.inputs.length + 1))}%` }}
        />
      ))}

      {/* Node Header */}
      <div className="pipeline-node-header">
        <div className="pipeline-node-icon">
          <IconComponent size={18} color={categoryInfo.color} />
        </div>
        <div className="pipeline-node-title-group">
          <h4 className="pipeline-node-title">{data.title}</h4>
          <span className="pipeline-node-badge">{data.badge}</span>
        </div>
      </div>

      {/* Node Description */}
      <p className="pipeline-node-desc">{data.description}</p>

      {/* Internal Content Displays */}
      {/* 1. Image Preprocessing Steps */}
      {data.steps && (
        <div className="pipeline-node-steps">
          <div className="pipeline-node-steps-title">Pipeline Operations:</div>
          <div className="pipeline-node-steps-list">
            {data.steps.map((step, i) => (
              <span key={i} className="pipeline-step-pill">
                {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 2. Key-Value Fields */}
      {data.fields && (
        <div className="pipeline-node-fields">
          {data.fields.map((field, idx) => (
            <div key={idx} className="pipeline-node-field">
              <span className="field-label">{field.label}:</span>
              <span className="field-value">{field.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* 3. Mini Neural Network Diagram for PyTorch CNN */}
      {data.hasMiniNet && (
        <div className="mini-net-container">
          <div className="mini-net-title">CNN Architecture Preview</div>
          <div className="mini-net-visual">
            <div className="net-layer conv" title="Conv2D (32 filters)">Conv</div>
            <div className="net-layer pool" title="MaxPool2D (2x2)">Pool</div>
            <div className="net-layer conv" title="Conv2D (64 filters)">Conv</div>
            <div className="net-layer fc" title="Linear Dense (128->10)">Linear</div>
          </div>
        </div>
      )}

      {/* 4. Mini Probability Bars for Node 14 */}
      {data.hasProbBars && data.probabilities && (
        <div className="mini-prob-container">
          {data.probabilities.map((item) => (
            <div key={item.digit} className={`mini-prob-row ${item.isTop ? 'is-top' : ''}`}>
              <span className="prob-digit">{item.digit}</span>
              <div className="prob-track">
                <div
                  className="prob-fill"
                  style={{ width: `${item.prob * 100}%` }}
                />
              </div>
              <span className="prob-val">{(item.prob * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Special Warning/Badge for Handwriting Quality (Heuristic) */}
      {data.isHeuristicBadge && (
        <div className="heuristic-note">
          <Icons.Info size={12} /> Rule-based Heuristic Engine (Not a trained model)
        </div>
      )}

      {/* Source (Output) Ports */}
      {data.ports?.outputs?.map((portId, idx) => (
        <Handle
          key={`out-${portId}-${idx}`}
          type="source"
          position={Position.Right}
          id={portId}
          className="pipeline-handle handle-output"
          style={{ top: `${(idx + 1) * (100 / (data.ports.outputs.length + 1))}%` }}
        />
      ))}
    </div>
  );
};

export default memo(PipelineNode);
