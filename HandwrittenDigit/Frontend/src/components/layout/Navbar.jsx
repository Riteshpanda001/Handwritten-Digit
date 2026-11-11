import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logoIcon from '../../assets/logo/handwritten-digit-icon.svg';

export default function Navbar() {
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
            >
              Predictor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/model"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Model
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
