import React, { useState } from 'react';
import './Features.css';
import {
  PenTool,
  Cpu,
  Zap,
  Maximize2,
  BarChart2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  Code2,
  X
} from 'lucide-react';

const categories = ['All Capabilities', 'Vision & Canvas', 'Deep Learning', 'Backend & DB'];

const featuresData = [
  {
    id: 'canvas',
    category: 'Vision & Canvas',
    icon: <PenTool size={28} />,
    tag: 'HTML5 Canvas',
    title: 'Interactive Drawing Canvas',
    description: 'Smooth, high-DPI HTML5 drawing surface with real-time stroke smoothing, mouse & touch support, and line weight controls.',
    metric: '60 FPS Rendering',
    codeSnippet: 'ctx.lineCap = "round";\nctx.lineWidth = 22;\nctx.strokeStyle = "#FFFFFF";'
  },
  {
    id: 'pytorch',
    category: 'Deep Learning',
    icon: <Cpu size={28} />,
    tag: 'PyTorch 2.0',
    title: 'PyTorch Neural Network',
    description: 'Custom Convolutional Neural Network trained on the 70,000-sample MNIST dataset achieving 99.2% test accuracy.',
    metric: '99.2% Test Acc',
    codeSnippet: 'class ConvNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv1 = nn.Conv2d(1, 32, kernel_size=3)'
  },
  {
    id: 'preprocess',
    category: 'Vision & Canvas',
    icon: <Maximize2 size={28} />,
    tag: 'OpenCV / NumPy',
    title: 'Smart Image Preprocessing',
    description: 'Automated bounding box detection, center-of-mass alignment, and 28x28 grayscale normalization pipeline.',
    metric: '28x28 Resizing',
    codeSnippet: 'cy, cx = center_of_mass(img)\nshift_x = np.round(14 - cx)\nshifted = shift(img, (shift_y, shift_x))'
  },
  {
    id: 'fastapi',
    category: 'Backend & DB',
    icon: <Zap size={28} />,
    tag: 'FastAPI Async',
    title: 'High-Speed REST API',
    description: 'Asynchronous Python backend engineered with Pydantic validation schemas for sub-15ms prediction latency.',
    metric: '< 15ms Latency',
    codeSnippet: '@router.post("/predict")\nasync def predict(data: PredictionInput):\n    return model.infer(data.image)'
  },
  {
    id: 'softmax',
    category: 'Deep Learning',
    icon: <BarChart2 size={28} />,
    tag: 'Softmax Heatmap',
    title: 'Probability Confidence Distribution',
    description: 'Visual breakdown showing model confidence percentages across all digits 0 through 9 simultaneously.',
    metric: 'Top-3 Ranking',
    codeSnippet: 'probs = F.softmax(output, dim=1)\nconfidence = torch.max(probs).item()'
  },
  {
    id: 'sqlite',
    category: 'Backend & DB',
    icon: <ShieldCheck size={28} />,
    tag: 'SQLite DB',
    title: 'Prediction History Storage',
    description: 'Database persistence tracking prediction records, confidence scores, and historical inference timestamps.',
    metric: 'ACID Persistence',
    codeSnippet: 'class PredictionRecord(Base):\n    __tablename__ = "prediction_history"\n    confidence = Column(Float)'
  }
];

export default function Features() {
  const [activeCategory, setActiveCategory] = useState('All Capabilities');
  const [selectedFeature, setSelectedFeature] = useState(null);

  const filteredFeatures =
    activeCategory === 'All Capabilities'
      ? featuresData
      : featuresData.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <Sparkles size={16} /> Core Capabilities
          </span>
          <h2>Features & Architecture Capabilities</h2>
          <p>
            An end-to-end Machine Learning web platform bridging modern frontend graphics with deep learning backend inference.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="features-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`feature-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {filteredFeatures.map((feat) => (
            <div
              key={feat.id}
              className="glass-card feature-card"
              onClick={() => setSelectedFeature(feat)}
            >
              <div className="feature-header">
                <div className="feature-icon-wrapper">{feat.icon}</div>
                <span className="feature-tag">{feat.tag}</span>
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.description}</p>
              
              <div className="feature-metrics">
                <span className="metric-badge">⚡ {feat.metric}</span>
              </div>

              <button className="feature-footer-link" type="button">
                Explore feature <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Spec Modal */}
      {selectedFeature && (
        <div className="feature-modal-overlay" onClick={() => setSelectedFeature(null)}>
          <div className="feature-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="feature-modal-close"
              onClick={() => setSelectedFeature(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="feature-header" style={{ marginBottom: '1rem' }}>
              <div className="feature-icon-wrapper">{selectedFeature.icon}</div>
              <span className="feature-tag">{selectedFeature.tag}</span>
            </div>

            <h3 className="feature-title" style={{ fontSize: '1.6rem' }}>
              {selectedFeature.title}
            </h3>

            <p className="feature-desc" style={{ fontSize: '1.05rem', margin: '1rem 0' }}>
              {selectedFeature.description}
            </p>

            <div className="feature-metrics" style={{ marginBottom: '1rem' }}>
              <span className="metric-badge">Performance Benchmark: {selectedFeature.metric}</span>
            </div>

            <h5 style={{ color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Implementation Snippet:
            </h5>
            <pre className="feature-modal-code">
              <code>{selectedFeature.codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
