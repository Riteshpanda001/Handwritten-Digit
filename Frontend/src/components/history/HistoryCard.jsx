import React, { useState } from 'react';
import { Calendar, Hash, ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';

export default function HistoryCard({ record }) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = record.created_at
    ? new Date(record.created_at).toLocaleString()
    : 'Recently';

  const confidencePercent = record.confidence !== undefined
    ? +(record.confidence * 100).toFixed(1)
    : 0;

  const scores = record.confidence_scores || {};

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.2))',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: 'var(--interactive-cyan)'
            }}
          >
            {record.predicted_digit}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Digit {record.predicted_digit}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '1rem',
                  background: record.input_type === 'canvas' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                  color: record.input_type === 'canvas' ? '#3b82f6' : '#8b5cf6',
                  border: '1px solid var(--border-color)',
                  textTransform: 'capitalize'
                }}
              >
                {record.input_type || 'canvas'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={14} /> {formattedDate}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Hash size={14} /> Log #{record.id}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--interactive-cyan)' }}>
              {confidencePercent}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Softmax Confidence
            </div>
          </div>

          {Object.keys(scores).length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="btn btn-secondary"
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <BarChart2 size={14} />
              {expanded ? 'Hide Breakdown' : 'View Scores'}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      </div>

      {expanded && Object.keys(scores).length > 0 && (
        <div
          style={{
            marginTop: '0.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem'
          }}
        >
          {Array.from({ length: 10 }, (_, d) => {
            const prob = (scores[d] !== undefined ? scores[d] * 100 : 0).toFixed(1);
            const isTop = d === record.predicted_digit;

            return (
              <div
                key={d}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isTop ? 'rgba(34, 211, 238, 0.15)' : 'rgba(15, 23, 42, 0.4)',
                  border: isTop ? '1px solid var(--interactive-cyan)' : '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isTop ? 'var(--interactive-cyan)' : 'var(--text-secondary)' }}>
                  Digit {d}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isTop ? 'var(--interactive-cyan)' : 'var(--text-primary)' }}>
                  {prob}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
