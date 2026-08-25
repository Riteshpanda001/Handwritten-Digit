import React, { useState, useEffect } from 'react';
import './AuthModal.css';
import { X, Mail, Lock, User, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

import { loginUser, registerUser } from '../../services/authApi';

export default function AuthModal({ isOpen, initialMode = 'login', onClose, onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setSuccessMessage('');
    setErrorMessage('');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      let data;
      if (mode === 'signup') {
        data = await registerUser(fullName, email, password);
      } else {
        data = await loginUser(email, password);
      }

      const user = { name: data.user.full_name, email: data.user.email };
      const msg =
        mode === 'signup'
          ? '🎉 Account created successfully! Welcome aboard.'
          : '✅ Logged in successfully! Welcome back.';
      setSuccessMessage(msg);
      setIsLoading(false);
      setTimeout(() => {
        onAuthSuccess(user);
        onClose();
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="auth-header">
          <h3 className="auth-title">
            {mode === 'login' ? (
              <>
                Welcome <span className="text-gradient">Back</span>
              </>
            ) : (
              <>
                Create <span className="text-gradient">Account</span>
              </>
            )}
          </h3>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Enter your credentials to access your digit prediction workspace.'
              : 'Get started with handwritten digit recognition and prediction tracking.'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setSuccessMessage('');
            }}
          >
            Log In
          </button>
          <button
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setMode('signup');
              setSuccessMessage('');
            }}
          >
            Get Started
          </button>
        </div>

        {errorMessage && (
          <div className="auth-error-banner" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-success-banner">
            <CheckCircle size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Arjun Dev"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn">
            {mode === 'login' ? (
              <>
                Log In to Workspace <ArrowRight size={18} />
              </>
            ) : (
              <>
                Create Account <Sparkles size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-text">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => {
                  setMode('signup');
                  setSuccessMessage('');
                }}
              >
                Sign up & Get Started
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => {
                  setMode('login');
                  setSuccessMessage('');
                }}
              >
                Log in here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
