import React, { useState, useEffect } from 'react';
import './Model.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ModelOverview from '../components/model/ModelOverview';
import ModelArchitecture from '../components/model/ModelArchitecture';
import ModelMetrics from '../components/model/ModelMetrics';
import ClassPerformanceTable from '../components/model/ClassPerformanceTable';
import ConfusionMatrix from '../components/model/ConfusionMatrix';
import { getModelInfo, reloadModel } from '../services/modelApi';
import { RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Model() {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchModelInfo();
  }, []);

  const fetchModelInfo = async () => {
    setLoading(true);
    try {
      const data = await getModelInfo();
      setModelInfo(data);
    } catch (err) {
      console.error('Failed fetching model info:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = async () => {
    setReloading(true);
    setMessage('');
    try {
      const res = await reloadModel();
      setMessage(res.message || 'Model successfully reloaded!');
      await fetchModelInfo();
    } catch (err) {
      setMessage('Failed to reload model from server.');
    } finally {
      setReloading(false);
    }
  };

  return (
    <div className="model-page">
      <Navbar />

      <main className="model-main">
        <div className="container">
          <div className="model-header">
            <h1 className="model-title">
              PyTorch Model <span className="text-gradient">Architecture & Performance</span>
            </h1>
            <p className="model-description">
              In-depth technical breakdown of the 2D Convolutional Neural Network (CNN), evaluation metrics, dataset benchmarks, and confusion matrix.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                className="btn btn-secondary"
                onClick={handleReload}
                disabled={reloading}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <RefreshCw size={16} className={reloading ? 'spin' : ''} />
                {reloading ? 'Reloading Model...' : 'Reload PyTorch Weights'}
              </button>
            </div>
            {message && (
              <p style={{ marginTop: '1rem', color: 'var(--interactive-cyan)', fontSize: '0.9rem' }}>
                {message}
              </p>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              Loading model specifications...
            </div>
          ) : (
            <>
              <ModelOverview modelInfo={modelInfo} />
              <ModelMetrics modelInfo={modelInfo} />
              <ClassPerformanceTable classReports={modelInfo?.class_reports} />
              <ModelArchitecture />
              <ConfusionMatrix matrix={modelInfo?.confusion_matrix} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
