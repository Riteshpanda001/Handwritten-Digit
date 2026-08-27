import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logoIcon from '../../assets/logo/handwritten-digit-icon.svg';
import { ArrowRight, UserCheck, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { currentUser, isAuthenticated, openAuthModal, logout } = useAuth();

  const handleNavClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openAuthModal('login');
    }
  };

  return (
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
            <NavLink
              to="/predictor"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, '/predictor')}
            >
              Predictor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/model"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, '/model')}
            >
              Model
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, '/history')}
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, '/about')}
            >
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
                onClick={logout}
                title="Log Out"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          ) : (
            <>
              <button
                className="btn btn-secondary nav-login-btn"
                onClick={() => openAuthModal('login')}
              >
                Log In
              </button>
              <button
                className="btn btn-primary nav-get-started-btn"
                onClick={() => openAuthModal('signup')}
              >
                Get Started <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
