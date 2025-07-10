// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../assets/css/Form.css';

// function Login() {
//   const [form, setForm] = useState({ airportName: '', password: '' });
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:3001/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (data.status === 'success') {
//         localStorage.setItem('airport', data.airportName); // Save airport name if needed
//         nav('/dashboard'); // ✅ Redirect to dashboard
//       } else {
//         alert(data.message || 'Invalid login');
//       }
//     } catch (err) {
//       alert('Server error. Please try again later.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="form-wrapper">
//       <form className="form-box" onSubmit={submit}>
//         <h2>Login</h2>
//         <input
//           name="airportName"
//           placeholder="Airport Name"
//           onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// 📁 Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Form.css'; // Adjust path if needed

function Login() {
  const [form, setForm] = useState({ airportName: '', password: '' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === 'success') {
        localStorage.setItem('airport', data.airportName);
        nav('/dashboard'); // Redirect on success
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Server error. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-box" onSubmit={submit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
