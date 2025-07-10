

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate
// import '../assets/css/Form.css';

// const SignUp = () => {
//   const [form, setForm] = useState({ airportName: '', password: '' });
//   const navigate = useNavigate(); // ✅ Navigation hook

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('http://localhost:3001/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     const result = await res.text();

//     if (res.ok) {
//       alert("✅ Sign Up Successful! Redirecting to Login...");
//       setTimeout(() => {
//         navigate('/login'); // ✅ Go to login after popup
//       }, 500); // short delay to show alert
//     } else {
//       alert("❌ Signup Failed: " + result);
//     }
//   };

//   return (
//     <div className="form-wrapper transition-fade">
//       <Link to="/" className="back-arrow">←</Link>
//       <form className="form-box" onSubmit={handleSubmit}>
//         <h2>Sign Up</h2>
//         <input
//           type="text"
//           name="airportName"
//           placeholder="Airport Name"
//           value={form.airportName}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Form.css';

function Signup() {
  const [form, setForm] = useState({ airportName: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === 'success') {
        alert(data.message);         // e.g. "User registered. Please login."
        navigate('/login');          // ✅ Redirect to login page
      } else {
        alert(data.message);         // e.g. "User already exists" or "Signup failed"
      }
    } catch (err) {
      alert('Server error. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-box" onSubmit={submit}>
        <h2>Sign Up</h2>
        <input
          name="airportName"
          placeholder="Airport Name"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          <Link to="/login">Already have an account? Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
