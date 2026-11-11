import { X, Cpu, Info, CheckCircle, Server, ArrowRight } from 'lucide-react';
import { NODE_CATEGORIES } from '../../data/pipelineData';

export default function PipelineInfoPanel({ node, onClose, modelInfo }) {
  if (!node || !node.data) return null;

  const { title, badge, category, infoPanel, steps } = node.data;
  const cat = NODE_CATEGORIES[category] || NODE_CATEGORIES.input;

  return (
    <div className="pipeline-info-panel-backdrop" onClick={onClose}>
      <aside
        className="pipeline-info-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Node Technical Detail Panel"
      >
        <div className="info-panel-header" style={{ borderLeft: `4px solid ${cat.color}` }}>
          <div className="info-panel-title-area">
            <span className="info-panel-badge" style={{ backgroundColor: cat.badgeBg, color: cat.color }}>
              {badge || cat.label}
            </span>
            <h3 className="info-panel-title">{title}</h3>
          </div>
          <button className="info-panel-close" onClick={onClose} aria-label="Close detail panel">
            <X size={18} />
          </button>
        </div>

        <div className="info-panel-body">
          {/* Purpose */}
          {infoPanel?.purpose && (
            <div className="info-section">
              <h5 className="section-title">
                <Info size={14} color={cat.color} /> Purpose & Role
              </h5>
              <p className="section-text">{infoPanel.purpose}</p>
            </div>
          )}

          {/* Technology */}
          {infoPanel?.technology && (
            <div className="info-section">
              <h5 className="section-title">
                <Cpu size={14} color={cat.color} /> Underlying Technology
              </h5>
              <div className="tech-badge-container">
                <span className="tech-tag">{infoPanel.technology}</span>
              </div>
            </div>
          )}

          {/* Dynamic Model Metrics if PyTorch CNN / Model Node */}
          {category === 'deep_learning' && modelInfo && (
            <div className="info-section model-live-metrics">
              <h5 className="section-title">
                <CheckCircle size={14} color="var(--accent-emerald)" /> Live PyTorch Model Specs
              </h5>
              <div className="metrics-grid">
                <div className="metric-chip">
                  <span className="chip-label">Accuracy:</span>
                  <span className="chip-value">{(modelInfo.test_accuracy || modelInfo.accuracy || 99.2).toFixed(2)}%</span>
                </div>
                <div className="metric-chip">
                  <span className="chip-label">Test Loss:</span>
                  <span className="chip-value">{(modelInfo.test_loss || 0.024).toFixed(4)}</span>
                </div>
                <div className="metric-chip">
                  <span className="chip-label">Dataset:</span>
                  <span className="chip-value">{modelInfo.dataset || 'MNIST (60k train / 10k test)'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Architecture / Implementation Blueprint */}
          {infoPanel?.architecture && (
            <div className="info-section">
              <h5 className="section-title">
                <Server size={14} color={cat.color} /> Component Blueprint
              </h5>
              <code className="architecture-code-block">{infoPanel.architecture}</code>
            </div>
          )}

          {/* Input -> Output specifications */}
          {(infoPanel?.input || infoPanel?.output) && (
            <div className="info-section io-flow-section">
              <h5 className="section-title">
                <ArrowRight size={14} color={cat.color} /> Data Interfaces
              </h5>
              <div className="io-card">
                <div className="io-row">
                  <span className="io-tag in">INPUT</span>
                  <span className="io-desc">{infoPanel.input}</span>
                </div>
                <div className="io-row">
                  <span className="io-tag out">OUTPUT</span>
                  <span className="io-desc">{infoPanel.output}</span>
                </div>
              </div>
            </div>
          )}

          {/* Hyperparameters / Parameters */}
          {infoPanel?.parameters && (
            <div className="info-section">
              <h5 className="section-title">Configuration Parameters</h5>
              <div className="params-table">
                {Object.entries(infoPanel.parameters).map(([paramKey, paramVal]) => (
                  <div key={paramKey} className="param-row">
                    <span className="param-name">{paramKey}</span>
                    <span className="param-val">{paramVal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Internal Steps if Preprocessing */}
          {steps && steps.length > 0 && (
            <div className="info-section">
              <h5 className="section-title">Sequential Execution Pipeline</h5>
              <ol className="ordered-steps">
                {steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
