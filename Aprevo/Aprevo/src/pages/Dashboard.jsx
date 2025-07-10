// ✅ File: PreFlightDashboard.jsx

import React, { useState, useEffect } from 'react';
import '../assets/css/Dashboard.css';
import { useNavigate } from 'react-router-dom'; 
const CHECKS = [
  { name: 'Fuel Level (>= 145.8)', key: 'fuel_level', min: 145.8 },
  { name: 'Tire Length (>= 75)', key: 'tire_length', min: 75 },
  { name: 'Hydraulic Pressure (>= 60)', key: 'hydraulic', min: 60 },
  { name: 'Brake Efficiency (>= 80)', key: 'brake', min: 80 },
  { name: 'Oil Level (>= 4.5)', key: 'oil', min: 4.5 },
  { name: 'External Damage Level (<= 1)', key: 'external_damage', max: 1 },
  { name: 'Flight Control Responsiveness (>= 95)', key: 'flight_control', min: 95 },
  { name: 'Lighting System (>= 80)', key: 'lighting', min: 80 },
  { name: 'Radar Check Score (>= 70)', key: 'radar', min: 70 },
  { name: 'Pitot Tube Check (>= 60)', key: 'pitot', min: 60 },
  { name: 'Avionics Check (>= 90)', key: 'avionics', min: 90 },
  { name: 'Emergency Equipment (>= 100)', key: 'emergency_eq', min: 100 },
  { name: 'Cargo Securing Score (>= 85)', key: 'cargo', min: 85 }
];

const Dashboard = () => {
    const navigate = useNavigate(); 
  const [key, setKey] = useState('');
  const [airport] = useState(localStorage.getItem('airport') || '');
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [valid, setValid] = useState({});
  const [copilotView, setCopilotView] = useState(false);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (key) {
      fetch(`http://localhost:3001/getRecord?key=${key}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            const parsed = JSON.parse(data.check_values || '{}');
            setValues(parsed);
            const newValid = {};
            CHECKS.forEach(c => {
              const val = parseFloat(parsed[c.key]);
              newValid[c.key] = c.min !== undefined ? val >= c.min : val <= c.max;
            });
            setValid(newValid);
            setExists(true);
          }
        });
    }
  }, [key]);

  const generateKey = () => setKey(Math.random().toString(36).substr(2, 6).toUpperCase());

  const handleInput = (keyName, val) => {
    const newValues = { ...values, [keyName]: val };
    setValues(newValues);

    const config = CHECKS.find(c => c.key === keyName);
    const numVal = parseFloat(val);
    setValid({
      ...valid,
      [keyName]: config.min !== undefined ? numVal >= config.min : numVal <= config.max
    });
  };

  const handleSubmit = async () => {
    if (!key) {
      alert('Please generate a key before submitting.');
      return;
    }

    const record = {
      unique_key: key,
      airport_name: airport,
      preflight: values,
      postflight: {},
    };

    const res = await fetch('http://localhost:3001/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });

    if (res.ok) {
      alert('✅ Saved to Database');
       setSubmitted(true);
    } else {
      alert('❌ Failed to save data');
    }
  };

  return (
    <div className="preflight-dashboard">
      <nav className="dash-navbar">
        <h3>✈️ PreFlight Check</h3>
        <div className="nav-links">
          <button onClick={() => window.location.href = '/'}>Dashboard</button>
            <button onClick={() => navigate('/copilot')}>Co-Pilot</button>
            <button onClick={() => navigate('/aiassistant')}>AI Assistant</button>

        </div>
      </nav>

      <div className="content-area">
        {!copilotView ? (
          <>
            <div className="key-box">
              <input
                value={key}
                readOnly
                className="gradient-input"
                placeholder="Generated Key"
              />
              <button onClick={generateKey}>🔑 Generate Key</button>
            </div>

            <input
              placeholder="Airport Name"
              value={airport}
              readOnly
              className="gradient-input"
            />

            {CHECKS.map(({ name, key: fieldKey }) => (
              <div
                key={fieldKey}
                className={`check-input ${valid[fieldKey] ? 'valid' : 'invalid'}`}
              >
                <label>{name}</label>
                <input
                  type="number"
                  placeholder="Enter value..."
                  value={values[fieldKey] || ''}
                  onChange={(e) => handleInput(fieldKey, e.target.value)}
                />
              </div>
            ))}

            {Object.values(valid).length === CHECKS.length &&
              Object.values(valid).every(Boolean) && (
                <button onClick={handleSubmit} className="proceed-btn">Proceed ✈️</button>
              )}
          </>
        ) : (
          <div className="copilot-box">
            <h4>👨‍✈️ Co-Pilot Details</h4>
            <p>Perform regular reviews of preflight checklist values.</p>
            <p>Help confirm runway alignment, communication systems & security readiness.</p>
            <p>Verify each entry before final clearance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
