import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './History.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HistoryFilters from '../components/history/HistoryFilters';
import HistoryList from '../components/history/HistoryList';
import { getPredictionHistory, clearPredictionHistory } from '../services/historyApi';

export default function History() {
  const [records, setRecords] = useState([]);
  const [selectedDigit, setSelectedDigit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.resolve()
      .then(() => {
        if (active) setLoading(true);
        return getPredictionHistory({ digit: selectedDigit, limit: 100 });
      })
      .then((data) => {
        if (active) setRecords(data.records || []);
      })
      .catch((err) => {
        console.error('Failed fetching history:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedDigit]);

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all logged prediction history?')) {
      return;
    }
    setClearing(true);
    try {
      await clearPredictionHistory();
      setRecords([]);
    } catch {
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
          <div className="back-home-bar">
            <Link to="/" className="back-home-btn">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>

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
          />

          <HistoryList records={records} loading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
