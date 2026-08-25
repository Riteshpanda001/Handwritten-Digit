import React from 'react';
import { Grid, Eye } from 'lucide-react';

export default function ConfusionMatrix({ matrix }) {
  const defaultMatrix = [
    [977, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 1131, 2, 2, 0, 0, 0, 0, 0, 0],
    [1, 0, 1029, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 1005, 0, 2, 0, 2, 1, 0],
    [0, 0, 0, 0, 980, 0, 0, 0, 0, 2],
    [0, 0, 0, 6, 0, 885, 1, 0, 0, 0],
    [8, 3, 0, 0, 1, 3, 942, 0, 1, 0],
    [0, 3, 7, 0, 0, 0, 0, 1018, 0, 0],
    [1, 0, 2, 1, 2, 0, 0, 3, 962, 3],
    [1, 2, 0, 2, 5, 1, 0, 4, 0, 994]
  ];

  const cm = matrix || defaultMatrix;

  return (
    <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Grid size={20} className="text-gradient" /> 10x10 Multi-Class Confusion Matrix
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Actual True Digits (Rows) vs. Predicted Classifications (Columns). Diagonal cells represent correct matches.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: '12px', height: '12px', background: 'rgba(34, 211, 238, 0.3)', border: '1px solid var(--interactive-cyan)', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Correct Match</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: '12px', height: '12px', background: 'rgba(239, 68, 68, 0.3)', border: '1px solid #ef4444', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Misclassification</span>
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
              <th style={{ padding: '0.75rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                True \ Pred
              </th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} style={{ padding: '0.75rem', color: 'var(--interactive-cyan)', fontWeight: 700, borderBottom: '1px solid var(--border-color)' }}>
                  Digit {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cm.map((row, r) => (
              <tr key={r}>
                <td style={{ padding: '0.75rem', color: 'var(--interactive-cyan)', fontWeight: 700, background: 'rgba(15, 23, 42, 0.4)', borderRight: '1px solid var(--border-color)' }}>
                  Digit {r}
                </td>
                {row.map((val, c) => {
                  const isDiag = r === c;
                  return (
                    <td
                      key={c}
                      style={{
                        padding: '0.6rem 0.4rem',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        background: isDiag
                          ? 'rgba(34, 211, 238, 0.18)'
                          : val > 0
                          ? 'rgba(239, 68, 68, 0.2)'
                          : 'transparent',
                        color: isDiag ? 'var(--interactive-cyan)' : val > 0 ? '#ef4444' : 'var(--text-muted)',
                        fontWeight: isDiag ? 700 : val > 0 ? 600 : 400
                      }}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
