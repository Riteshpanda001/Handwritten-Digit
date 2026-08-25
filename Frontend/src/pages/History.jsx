import React, { useState, useEffect } from 'react';
import './History.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HistoryFilters from '../components/history/HistoryFilters';
import HistoryList from '../components/history/HistoryList';
import { getPredictionHistory, clearPredictionHistory } from '../services/historyApi';

export default function History() {
  const [records, setRecords] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDigit, setSelectedDigit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [selectedDigit]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getPredictionHistory({ digit: selectedDigit, limit: 100 });
      setRecords(data.records || []);
      setTotalCount(data.total_count || 0);
    } catch (err) {
      console.error('Failed fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all logged prediction history?')) {
      return;
    }
    setClearing(true);
    try {
      await clearPredictionHistory();
      await fetchHistory();
    } catch (err) {
      alert('Failed clearing history from server.');
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="history-page">
      <Navbar />

      <main className="history-main">
        <div className="container">
          <div className="history-header">
            <h1 className="history-title">
              Prediction <span className="text-gradient">History Logs</span>
            </h1>
            <p className="history-description">
              Review saved handwritten digit inference records, confidence levels, timestamps, and input modalities stored in SQLite.
            </p>
          </div>

          <HistoryFilters
            selectedDigit={selectedDigit}
            setSelectedDigit={setSelectedDigit}
            onClear={handleClearHistory}
            isClearing={clearing}
            totalCount={totalCount}
          />

          <HistoryList records={records} loading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
