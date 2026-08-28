import React, { useState, useEffect } from 'react';
import './Model.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ModelOverview from '../components/model/ModelOverview';
import ConfusionMatrix from '../components/model/ConfusionMatrix';
import MLPipeline from '../components/model/MLPipeline';
import { getModelInfo } from '../services/modelApi';

export default function Model() {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              Loading model specifications...
            </div>
          ) : (
            <>
              <ModelOverview modelInfo={modelInfo} />
              <MLPipeline modelInfo={modelInfo} />
              <ConfusionMatrix matrix={modelInfo?.confusion_matrix} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
