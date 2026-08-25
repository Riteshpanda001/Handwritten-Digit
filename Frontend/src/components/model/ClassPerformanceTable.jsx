import React from 'react';
import { BarChart2, ShieldCheck, Target, Zap } from 'lucide-react';

export default function ClassPerformanceTable({ classReports }) {
  if (!classReports) return null;

  const digits = Array.from({ length: 10 }, (_, d) => d.toString());

  return (
    <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BarChart2 size={20} className="text-gradient" /> Per-Digit Performance Analysis
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Precision, Recall, and F1-Score metrics across all 10 digit classes (0–9) evaluated on the benchmark dataset.
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(15, 23, 42, 0.4)' }}>
              <th style={{ padding: '0.75rem 1rem', color: 'var(--interactive-cyan)' }}>Digit</th>
              <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Precision</th>
              <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Recall</th>
              <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>F1-Score</th>
              <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Support</th>
            </tr>
          </thead>
          <tbody>
            {digits.map((digit) => {
              const metrics = classReports[digit];
              if (!metrics) return null;
              const precision = (metrics.precision * 100).toFixed(2);
              const recall = (metrics.recall * 100).toFixed(2);
              const f1 = (metrics['f1-score'] * 100).toFixed(2);

              return (
                <tr
                  key={digit}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.2s ease'
                  }}
                  className="table-row-hover"
                >
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--interactive-cyan)' }}>
                    Digit {digit}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          flex: 1,
                          maxWidth: '80px',
                          height: '6px',
                          borderRadius: '3px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${precision}%`,
                            height: '100%',
                            background: 'var(--interactive-cyan)',
                            borderRadius: '3px'
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{precision}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          flex: 1,
                          maxWidth: '80px',
                          height: '6px',
                          borderRadius: '3px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${recall}%`,
                            height: '100%',
                            background: '#10b981',
                            borderRadius: '3px'
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{recall}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          flex: 1,
                          maxWidth: '80px',
                          height: '6px',
                          borderRadius: '3px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${f1}%`,
                            height: '100%',
                            background: '#8b5cf6',
                            borderRadius: '3px'
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{f1}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>
                    {metrics.support} samples
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
