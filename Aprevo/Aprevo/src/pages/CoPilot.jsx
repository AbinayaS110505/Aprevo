import React, { useState, useEffect } from 'react';
import '../assets/css/Dashboard.css';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate

const COPILOT_CHECKS = [
  { name: 'Flight Plan Check (>= 80)', key: 'flight_plan', min: 80 },
  { name: 'Weather Clearance Score (>= 75)', key: 'weather_clearance', min: 75 },
  { name: 'Runway Clearance (>= 85)', key: 'runway_clearance', min: 85 },
  { name: 'MEL Status (<= 2)', key: 'mel', max: 2 },
  { name: 'Security Clearance Score (>= 90)', key: 'security_clearance', min: 90 },
  { name: 'Weight Balance Check (>= 100)', key: 'weight_balance', min: 100 },
];

const CoPilot = () => {
  const [key, setKey] = useState('');
  const [values, setValues] = useState({});
  const [valid, setValid] = useState({});
  const [recordLoaded, setRecordLoaded] = useState(false);
  const navigate = useNavigate(); // ✅ added here

  useEffect(() => {
    if (key) {
      fetch(`http://localhost:3001/getRecord?key=${key}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            const parsed = data.copilot_values || {};
            setValues(parsed);
            const newValid = {};
            COPILOT_CHECKS.forEach(c => {
              const val = parseFloat(parsed[c.key]);
              newValid[c.key] = c.min !== undefined ? val >= c.min : val <= c.max;
            });
            setValid(newValid);
            setRecordLoaded(true);
          } else {
            alert('❌ No record found for this key');
            setRecordLoaded(false);
          }
        });
    }
  }, [key]);

  const handleInput = (keyName, val) => {
    const newValues = { ...values, [keyName]: val };
    setValues(newValues);

    const config = COPILOT_CHECKS.find(c => c.key === keyName);
    const numVal = parseFloat(val);
    setValid({
      ...valid,
      [keyName]: config.min !== undefined ? numVal >= config.min : numVal <= config.max
    });
  };

  const handleSubmit = async () => {
    await fetch('http://localhost:3001/copilotSubmit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, copilot_values: values })
    });
    alert('✅ Co-Pilot data saved!');
  };

  return (
    <div className="preflight-dashboard">
      <nav className="dash-navbar">
        <h3>Co-Pilot Check</h3>
        <div>
          <button onClick={() => window.location.href = '/'}>Home</button>
          <button onClick={() => window.location.href = '/dashboard'}>Ground-serv</button>
          <button onClick={() => navigate('/aiassistant')}>AI Assistant</button>
          <button onClick={() => window.location.href = '/emergency'}>Emergency</button>
        </div>
      </nav>

      <div className="content-area">
        <div className="key-box">
          <input
            placeholder="Enter Key to Load Record"
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            className="gradient-input"
          />
        </div>

        {recordLoaded && (
          <>
            {COPILOT_CHECKS.map(({ name, key: fieldKey }) => (
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

            {Object.values(valid).length === COPILOT_CHECKS.length &&
              Object.values(valid).every(Boolean) && (
                <button onClick={handleSubmit} className="proceed-btn">Finish ✔</button>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoPilot;
