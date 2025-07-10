import React, { useState } from 'react';
import '../assets/css/Emergency.css';

const Emergency = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const triggerAlarm = () => {
    const audio = new Audio('/alarm.mp3'); // Place alarm.mp3 in public folder
    audio.play();
    setShowPopup(true);
  };

  const sendAlert = async () => {
    if (!type || !message) {
      alert('Please select emergency type and message');
      return;
    }

    alert(`🚨 Sent to Airport Control: ${type} - ${message}`);
    setShowPopup(false);

    // Example POST to backend (optional)
    // await fetch('http://localhost:3001/emergency', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ type, message, time: new Date() })
    // });
  };

  return (
    <div className="emergency-container">
      <button className="emergency-btn" onClick={triggerAlarm}>
        🚨 Trigger Emergency
      </button>

      {showPopup && (
        <div className="popup-backdrop">
          <div className="popup-box">
            <h2>Emergency Alert</h2>
            <label>Type of Emergency</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="ATC Alert">🛫 ATC Alert</option>
              <option value="Mayday">📢 Mayday</option>
              <option value="Pan-Pan">⚠️ Pan-Pan</option>
              <option value="Technical Failure">⚙️ Technical Failure</option>
            </select>

            <label>Message to Control Room</label>
            <textarea
              placeholder="Enter details..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="submit-alert" onClick={sendAlert}>📡 Submit Alert</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;
