import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        {/* Logo */}
<Link to="/" className="navbar-logo">
  <div className="navbar-cube-logo">
    <div className="cube-main"></div>
    <div className="cube-shadow-1"></div>
    <div className="cube-shadow-2"></div>
  </div>
  <span className="logo-text">PlacementPrep</span>
</Link>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <Link to="/" className={isActive('/')}>
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/technical" className={isActive('/technical')}>
            <span className="nav-icon">🔧</span>
            Technical Round
          </Link>
          <Link to="/aptitude" className={isActive('/aptitude')}>
            <span className="nav-icon">🧠</span>
            Aptitude Prep
          </Link>
          <Link to="/coding" className={isActive('/coding')}>
            <span className="nav-icon">💻</span>
            Coding Learning
          </Link>
          <Link to="/resume" className={isActive('/resume')}>
            <span className="nav-icon">📄</span>
            Resume Builder
          </Link>
        </div>

        {/* Auth Links */}
        <div className="navbar-auth">
          <Link to="/login" className="auth-link login-link">Login</Link>
          <Link to="/signup" className="auth-link signup-link">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
