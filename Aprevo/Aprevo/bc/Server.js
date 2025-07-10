

// require('dotenv').config(); // At the top

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// });
// // ✅ File: server.js// ✅ File: serverjs
// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql2');
// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ MySQL DB Connection
// // const db = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',       // your MySQL user
// //   password: '1234',   // your MySQL password
// //   database: 'aprevo'  // your DB name
// // });

// db.connect(err => {
//   if (err) return console.error('❌ MySQL connection failed:', err.message);
//   console.log('✅ Connected to MySQL');
// });

// // ✅ Signup route
// app.post('/signup', (req, res) => {
//   const { airportName, password } = req.body;
//   db.query('SELECT * FROM users WHERE airport_name = ?', [airportName], (err, rows) => {
//     if (err) return res.status(500).json({ status: 'error', message: 'DB error' });
//     if (rows.length > 0) return res.status(409).json({ status: 'error', message: 'User already exists' });

//     db.query('INSERT INTO users (airport_name, password) VALUES (?, ?)', [airportName, password], (err) => {
//       if (err) return res.status(500).json({ status: 'error', message: 'Signup failed' });
//       res.json({ status: 'success', message: 'User registered. Please login.' });
//     });
//   });
// });

// // ✅ Login route
// app.post('/login', (req, res) => {
//   const { airportName, password } = req.body;
//   db.query('SELECT * FROM users WHERE airport_name = ? AND password = ?', [airportName, password], (err, rows) => {
//     if (err) return res.status(500).json({ status: 'error', message: 'Server error' });
//     if (rows.length === 0) return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
//     res.json({ status: 'success', message: 'Login successful', airportName: rows[0].airport_name });
//   });
// });
// app.post('/submit', (req, res) => {
//   const { unique_key, airport_name, preflight, postflight } = req.body;
//   const now = new Date();

//   const query = `
//     INSERT INTO preflight_records (unique_key, airport_name, check_values, copilot_values, timestamp)
//     VALUES (?, ?, ?, ?, ?)
//     ON DUPLICATE KEY UPDATE
//       check_values = VALUES(check_values),
//       copilot_values = VALUES(copilot_values),
//       timestamp = VALUES(timestamp)
//   `;

//   db.query(query, [
//     unique_key,
//     airport_name,
//     JSON.stringify(preflight),
//     JSON.stringify(postflight),
//     now
//   ], (err, result) => {
//     if (err) {
//       console.error('❌ Database Error:', err); // Show error in terminal
//       return res.status(500).json({ message: 'Failed to save data' });
//     }

//     // ✅ Send success response to frontend
//     res.json({ message: '✅ Data saved successfully' });
//   });
// });

// app.post('/copilotSubmit', (req, res) => {
//   const { key, copilot_values } = req.body;
//   const query = `UPDATE preflight_records SET copilot_values = ? WHERE unique_key = ?`;

//   db.query(query, [JSON.stringify(copilot_values), key], (err) => {
//     if (err) {
//       console.error('❌ CoPilot Submit Failed:', err);
//       return res.status(500).json({ status: 'error', message: 'Copilot submit failed' });
//     }
//     res.json({ status: 'success', message: '✅ CoPilot data saved' });
//   });
// });


// // ✅ Get Record
// app.get('/getRecord', (req, res) => {
//   const { key } = req.query;
//   db.query('SELECT * FROM preflight_records WHERE unique_key = ?', [key], (err, results) => {
//     if (err || results.length === 0) return res.json(null);
//     res.json(results[0]);
//   });
// });

// // ✅ Start Server
// app.listen(3001, () => console.log('🚀 Server running on http://localhost:3001'));




// // 📁 File: server.js
// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql2');
// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ DB Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'aprevo'
// });

// db.connect(err => {
//   if (err) return console.error('❌ MySQL connection failed:', err.message);
//   console.log('✅ Connected to MySQL');
// });

// // ✅ Signup Route
// app.post('/signup', (req, res) => {
//   const { airportName, password } = req.body;
//   db.query('INSERT INTO users (airport_name, password) VALUES (?, ?)', [airportName, password],
//     (err, _) => err ? res.status(500).send('Signup failed') : res.send('success'));
// });

// // ✅ Login Route
// app.post('/login', (req, res) => {
//   const { airportName, password } = req.body;
//   db.query('SELECT * FROM users WHERE airport_name = ? AND password = ?', [airportName, password], (err, rows) => {
//     if (err) return res.status(500).send('Server error');
//     rows.length > 0 ? res.send('success') : res.status(401).send('invalid');
//   });
// });

// // ✅ Submit Preflight & Postflight from Dashboard
// app.post('/submit', (req, res) => {
//   const { airport_name, unique_key, preflight, postflight } = req.body;
//   const now = new Date();

//   const sql = `INSERT INTO preflight_records (
//     unique_key, airport_name, check_values, copilot_values, timestamp
//   ) VALUES (?, ?, ?, ?, ?)
//   ON DUPLICATE KEY UPDATE check_values = VALUES(check_values), timestamp = VALUES(timestamp)`;

//   db.query(sql, [
//     unique_key,
//     airport_name,
//     JSON.stringify(preflight),
//     JSON.stringify(postflight),
//     now
//   ], (err) => {
//     err ? res.status(500).send('submit failed') : res.send('submitted');
//   });
// });

// // ✅ Submit Copilot Data Only (from CoPilot.jsx)
// app.post('/copilotSubmit', (req, res) => {
//   const { key, copilot_values } = req.body;
//   const sql = `UPDATE preflight_records SET copilot_values = ? WHERE unique_key = ?`;
//   db.query(sql, [JSON.stringify(copilot_values), key], (err) => {
//     if (err) res.status(500).send("Update error");
//     else res.send("✅ Co-Pilot Data Stored");
//   });
// });

// // ✅ Fetch full record by key
// app.get('/getRecord', (req, res) => {
//   db.query('SELECT * FROM preflight_records WHERE unique_key = ?', [req.query.key], (err, results) => {
//     if (err || results.length === 0) return res.send(null);
//     res.send(results[0]);
//   });
// });

// // ✅ Start Server
// app.listen(3001, () => console.log('🚀 Server running on http://localhost:3001'));


// second work:

// // 📁 server.js
// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql2');
// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ MySQL DB connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'aprevo'
// });

// db.connect(err => {
//   if (err) return console.error('❌ MySQL connection failed:', err.message);
//   console.log('✅ Connected to MySQL');
// });

// // ✅ Signup route
// app.post('/signup', (req, res) => {
//   const { airportName, password } = req.body;

//   // Check if user already exists
//   db.query('SELECT * FROM users WHERE airport_name = ?', [airportName], (err, rows) => {
//     if (err) return res.status(500).json({ status: 'error', message: 'DB error' });
//     if (rows.length > 0) {
//       return res.status(409).json({ status: 'error', message: 'User already exists' });
//     }

//     // Insert new user
//     db.query(
//       'INSERT INTO users (airport_name, password) VALUES (?, ?)',
//       [airportName, password],
//       (err) => {
//         if (err) return res.status(500).json({ status: 'error', message: 'Signup failed' });
//         res.json({ status: 'success', message: 'User registered. Please login.' });
//       }
//     );
//   });
// });

// // ✅ Login route
// app.post('/login', (req, res) => {
//   const { airportName, password } = req.body;

//   db.query(
//     'SELECT * FROM users WHERE airport_name = ? AND password = ?',
//     [airportName, password],
//     (err, rows) => {
//       if (err) return res.status(500).json({ status: 'error', message: 'Server error' });
//       if (rows.length === 0) {
//         return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
//       }

//       // ✅ Login success
//       res.json({
//         status: 'success',
//         message: 'Login successful',
//         airportName: rows[0].airport_name
//       });
//     }
//   );
// });

// app.post('/submit', (req, res) => {
//   const { airport_name, unique_key, preflight, postflight } = req.body;
//   const now = new Date();

//   const sql = `
//     INSERT INTO preflight_records (unique_key, airport_name, check_values, copilot_values, timestamp)
//     VALUES (?, ?, ?, ?, ?)
//     ON DUPLICATE KEY UPDATE 
//       check_values = VALUES(check_values),
//       timestamp = VALUES(timestamp)
//   `;

//   db.query(
//     sql,
//     [unique_key, airport_name, JSON.stringify(preflight), JSON.stringify(postflight), now],
//     (err) => {
//       if (err) {
//         console.error('❌ Submit failed:', err.sqlMessage); // log full error
//         return res.status(500).json({ status: 'error', message: err.sqlMessage });
//       }
//       res.json({ status: 'success', message: 'Data submitted' });
//     }
//   );
// });


// // ✅ Copilot-only data submit
// app.post('/copilotSubmit', (req, res) => {
//   const { key, copilot_values } = req.body;
//   const sql = 'UPDATE preflight_records SET copilot_values = ? WHERE unique_key = ?';

//   db.query(sql, [JSON.stringify(copilot_values), key], (err) => {
//     if (err) return res.status(500).json({ status: 'error', message: 'Copilot update error' });
//     res.json({ status: 'success', message: 'Co-Pilot data updated' });
//   });
// });

// app.get('/getRecord', (req, res) => {
//   const { key, airport } = req.query;

//   db.query(
//     'SELECT * FROM preflight_records WHERE unique_key = ? AND airport_name = ?',
//     [key, airport],
//     (err, results) => {
//       if (err || results.length === 0) return res.json(null);
//       res.json(results[0]);
//     }
//   );
// });

// // ✅ Start server
// app.listen(3001, () => console.log('🚀 Server running at http://localhost:3001'));




// ✅ File: server.js// ✅ File: serverjs
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ MySQL DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // your MySQL user
  password: '1234',   // your MySQL password
  database: 'aprevo'  // your DB name
});

db.connect(err => {
  if (err) return console.error('❌ MySQL connection failed:', err.message);
  console.log('✅ Connected to MySQL');
});

// ✅ Signup route
app.post('/signup', (req, res) => {
  const { airportName, password } = req.body;
  db.query('SELECT * FROM users WHERE airport_name = ?', [airportName], (err, rows) => {
    if (err) return res.status(500).json({ status: 'error', message: 'DB error' });
    if (rows.length > 0) return res.status(409).json({ status: 'error', message: 'User already exists' });

    db.query('INSERT INTO users (airport_name, password) VALUES (?, ?)', [airportName, password], (err) => {
      if (err) return res.status(500).json({ status: 'error', message: 'Signup failed' });
      res.json({ status: 'success', message: 'User registered. Please login.' });
    });
  });
});

// ✅ Login route
app.post('/login', (req, res) => {
  const { airportName, password } = req.body;
  db.query('SELECT * FROM users WHERE airport_name = ? AND password = ?', [airportName, password], (err, rows) => {
    if (err) return res.status(500).json({ status: 'error', message: 'Server error' });
    if (rows.length === 0) return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    res.json({ status: 'success', message: 'Login successful', airportName: rows[0].airport_name });
  });
});
app.post('/submit', (req, res) => {
  const { unique_key, airport_name, preflight, postflight } = req.body;
  const now = new Date();

  const query = `
    INSERT INTO preflight_records (unique_key, airport_name, check_values, copilot_values, timestamp)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      check_values = VALUES(check_values),
      copilot_values = VALUES(copilot_values),
      timestamp = VALUES(timestamp)
  `;

  db.query(query, [
    unique_key,
    airport_name,
    JSON.stringify(preflight),
    JSON.stringify(postflight),
    now
  ], (err, result) => {
    if (err) {
      console.error('❌ Database Error:', err); // Show error in terminal
      return res.status(500).json({ message: 'Failed to save data' });
    }

    // ✅ Send success response to frontend
    res.json({ message: '✅ Data saved successfully' });
  });
});

app.post('/copilotSubmit', (req, res) => {
  const { key, copilot_values } = req.body;
  const query = `UPDATE preflight_records SET copilot_values = ? WHERE unique_key = ?`;

  db.query(query, [JSON.stringify(copilot_values), key], (err) => {
    if (err) {
      console.error('❌ CoPilot Submit Failed:', err);
      return res.status(500).json({ status: 'error', message: 'Copilot submit failed' });
    }
    res.json({ status: 'success', message: '✅ CoPilot data saved' });
  });
});


// ✅ Get Record
app.get('/getRecord', (req, res) => {
  const { key } = req.query;
  db.query('SELECT * FROM preflight_records WHERE unique_key = ?', [key], (err, results) => {
    if (err || results.length === 0) return res.json(null);
    res.json(results[0]);
  });
});

// ✅ Start Server
app.listen(3001, () => console.log('🚀 Server running on http://localhost:3001'));
