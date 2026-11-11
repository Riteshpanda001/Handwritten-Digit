import React from 'react';

export default function ConfusionMatrix({ matrix }) {
  const defaultMatrix = [
    [975, 0, 1, 0, 0, 1, 1, 1, 1, 0],
    [0, 1130, 2, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 1025, 1, 1, 0, 0, 2, 1, 0],
    [0, 0, 1, 1002, 0, 3, 0, 2, 1, 1],
    [0, 0, 1, 0, 976, 0, 1, 0, 1, 3],
    [1, 0, 0, 2, 0, 885, 2, 1, 1, 0],
    [2, 1, 0, 0, 1, 2, 950, 0, 2, 0],
    [0, 2, 3, 0, 1, 0, 0, 1020, 1, 1],
    [1, 0, 1, 2, 0, 1, 1, 1, 965, 2],
    [1, 0, 0, 1, 3, 1, 0, 2, 1, 990]
  ];

  const cm = matrix || defaultMatrix;

  return (
    <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        10x10 Multi-Class Confusion Matrix
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Actual Digits (Rows) vs. Predicted Digits (Columns). Diagonal cells represent correct classifications.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem', color: 'var(--text-muted)' }}>True \ Pred</th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} style={{ padding: '0.5rem', color: 'var(--interactive-cyan)', fontWeight: 700 }}>
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cm.map((row, r) => (
              <tr key={r}>
                <td style={{ padding: '0.5rem', color: 'var(--interactive-cyan)', fontWeight: 700 }}>{r}</td>
                {row.map((val, c) => {
                  const isDiag = r === c;
                  return (
                    <td
                      key={c}
                      style={{
                        padding: '0.6rem',
                        border: '1px solid var(--border-color)',
                        background: isDiag
                          ? 'rgba(34, 211, 238, 0.15)'
                          : val > 0
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'transparent',
                        color: isDiag ? 'var(--interactive-cyan)' : val > 0 ? '#ef4444' : 'var(--text-muted)',
                        fontWeight: isDiag ? 700 : 400
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
