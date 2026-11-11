import React from 'react';
import { Calendar, Hash, Tag, Activity } from 'lucide-react';

export default function HistoryCard({ record }) {
  const formattedDate = record.created_at
    ? new Date(record.created_at).toLocaleString()
    : 'Recently';

  const confidencePercent = record.confidence !== undefined
    ? +(record.confidence * 100).toFixed(1)
    : 0;

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-md)',
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

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--interactive-cyan)' }}>
          {confidencePercent}%
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Softmax Confidence
        </div>
      </div>
    </div>
  );
}
