import HistoryCard from './HistoryCard';
import { History as HistoryIcon } from 'lucide-react';

export default function HistoryList({ records, loading }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
        Fetching logged prediction records...
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div
        className="glass-card"
        style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <HistoryIcon size={48} style={{ opacity: 0.4, color: 'var(--interactive-cyan)' }} />
        <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>
          No Prediction History Found
        </h4>
        <p style={{ maxWidth: '400px', fontSize: '0.9rem' }}>
          Draw or upload handwritten digits on the Predictor page to generate log records in SQLite.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {records.map((record) => (
        <HistoryCard key={record.id} record={record} />
      ))}
    </div>
  );
}
