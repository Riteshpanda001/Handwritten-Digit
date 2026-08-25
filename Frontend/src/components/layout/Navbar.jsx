import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logoIcon from '../../assets/logo/handwritten-digit-icon.svg';
import AuthModal from './AuthModal';
import { ArrowRight, UserCheck, LogOut } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../../services/authApi';

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser({ name: user.full_name, email: user.email });
      }
    }
    checkAuth();
  }, []);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="nav-brand">
            <img src={logoIcon} alt="Handwritten Digit Logo" className="brand-icon" />
            <span className="brand-title">
              Handwritten <span className="text-gradient">Digit</span>
            </span>
          </Link>

          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/predictor" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Predictor
              </NavLink>
            </li>
            <li>
              <NavLink to="/model" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Model
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                History
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
          </ul>

          <div className="nav-actions">
            {currentUser ? (
              <div className="user-profile-bar">
                <div className="user-badge">
                  <UserCheck size={16} />
                  <span>{currentUser.name}</span>
                </div>
                <button
                  className="btn btn-secondary nav-logout-btn"
                  onClick={handleLogout}
                  title="Log Out"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  className="btn btn-secondary nav-login-btn"
                  onClick={() => handleOpenAuth('login')}
                >
                  Log In
                </button>
                <button
                  className="btn btn-primary nav-get-started-btn"
                  onClick={() => handleOpenAuth('signup')}
                >
                  Get Started <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
