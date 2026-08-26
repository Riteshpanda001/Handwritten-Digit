import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { AlertCircle, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <Navbar />

      <main className="notfound-main">
        <div
          className="glass-card"
          style={{
            maxWidth: '560px',
            padding: '3rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <AlertCircle size={36} />
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            404
          </h1>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Page Not Found
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            The page you are looking for does not exist or has been moved.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/" className="btn btn-primary">
              <Home size={16} /> Return Home
            </Link>
            <Link to="/predictor" className="btn btn-secondary">
              Go to Predictor <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
