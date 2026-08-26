import React from 'react';
import { Filter, Trash2 } from 'lucide-react';

export default function HistoryFilters({ selectedDigit, setSelectedDigit, onClear, isClearing }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
          <Filter size={16} /> Filter by Digit:
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${selectedDigit === null ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
            onClick={() => setSelectedDigit(null)}
          >
            All
          </button>
          {Array.from({ length: 10 }, (_, d) => (
            <button
              key={d}
              className={`btn ${selectedDigit === d ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
              onClick={() => setSelectedDigit(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn"
        style={{
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '0.5rem 1rem',
          fontSize: '0.85rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        onClick={onClear}
        disabled={isClearing}
      >
        <Trash2 size={15} /> {isClearing ? 'Clearing...' : 'Clear History'}
      </button>
    </div>
  );
}
