import './TechnologyStack.css';

const stackData = [
  { name: 'React 19', role: 'Frontend Framework', category: 'UI Core' },
  { name: 'Vite 8', role: 'Build Tool & Dev Server', category: 'Bundler' },
  { name: 'PyTorch', role: 'Deep Learning & CNN', category: 'ML Engine' },
  { name: 'FastAPI', role: 'Async REST API', category: 'Backend' },
  { name: 'Torchvision', role: 'Datasets & Transforms', category: 'Vision' },
  { name: 'SQLite', role: 'Database Storage', category: 'Database' },
  { name: 'Docker', role: 'Container Deployment', category: 'DevOps' },
  { name: 'Pytest', role: 'Unit & API Testing', category: 'QA' }
];

export default function TechnologyStack() {
  return (
    <section id="tech-stack" className="tech-stack-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Tech Ecosystem</span>
          <h2>Built With Production-Grade Tools</h2>
          <p>Modern technologies powering accurate ML predictions and ultra-fast UI rendering.</p>
        </div>

        <div className="tech-grid">
          {stackData.map((t, idx) => (
            <div key={idx} className="glass-card tech-card">
              <span className="tech-badge">{t.category}</span>
              <h3 className="tech-name">{t.name}</h3>
              <p className="tech-role">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
