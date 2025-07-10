import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';

const HomeNav = () => {
  return (
    <nav className="navbar">
      <div className="logo">𝔸𝕡𝕣𝕖𝕧𝕠</div>
      <div className="nav-buttons">
        <Link to="/signup" className="nav-link">
          <button className="nav-btn">Sign Up</button>
        </Link>
        <Link to="/login" className="nav-link">
          <button className="nav-btn">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default HomeNav;
