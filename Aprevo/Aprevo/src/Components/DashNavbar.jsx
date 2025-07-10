import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashNavbar.css';
import '../pages/CoPilot';

const DashNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="dash-navbar">
      <div className="logo">🛫 PreFlight Check</div>
      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/copilot')}>Co-Pilot</button>
        <button onClick={() => navigate('/ai')}>AI</button>
        <button onClick={() => navigate('/emergency')}>Emergency</button>
      </div>
    </div>
  );
};

export default DashNavbar;
