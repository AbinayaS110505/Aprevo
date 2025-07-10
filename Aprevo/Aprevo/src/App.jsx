import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './assets/css/index.css';
import './assets/css/responsive.css';

import './assets/css/Form.css'
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CoPilot from './pages/CoPilot';
import AIAssist from './pages/AIAssist';
import Emergency from './pages/Emergency';


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/copilot" element={<CoPilot/>}/>
        <Route path="/aiassistant" element={<AIAssist />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>
    </Router>
  );
}

export default App;
