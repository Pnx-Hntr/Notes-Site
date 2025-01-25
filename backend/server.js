const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change if your database uses a different user
  password: '@1234567890', // Add your MySQL password
  database: 'notes_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insert the user into the database
    const query = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Check if the user exists
    const query = 'SELECT * FROM Users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });
  
      const user = results[0];
  
      // Compare the passwords
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: 'Invalid email or password' });
  
      // Generate a token
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    });
  });

  
  app.get('/notes', (req, res) => {
    const userId = req.query.userId;
  
    const query = 'SELECT * FROM Notes WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  
  app.post('/notes', (req, res) => {
    const { userId, noteTitle, noteBody } = req.body;
  
    const query = 'INSERT INTO Notes (user_id, note_title, note_body) VALUES (?, ?, ?)';
    db.query(query, [userId, noteTitle, noteBody], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Note added successfully!' });
    });
  });

  
  app.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
  
    const query = 'DELETE FROM Notes WHERE id = ?';
    db.query(query, [noteId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Note deleted successfully!' });
    });
  });

  
  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
