import express from 'express';
import bcrypt from 'bcryptjs';
import { getDatabase, saveDatabase } from '../db/init.js';

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;
    const db = getDatabase();

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const existingUser = db.exec(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUser.length > 0 && existingUser[0].values.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    db.run(
      'INSERT INTO users (fullName, email, phoneNumber, password) VALUES (?, ?, ?, ?)',
      [fullName, email, phoneNumber || null, hashedPassword]
    );
    
    saveDatabase();

    // Get the inserted user's ID
    const result = db.exec('SELECT last_insert_rowid() as id');
    const userId = result[0].values[0][0];

    return res.status(201).json({
      message: 'User registered successfully',
      userId: userId,
      email: email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDatabase();

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const result = db.exec(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (!result || result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const columns = result[0].columns;
    const userRow = result[0].values[0];
    const user = {};
    
    columns.forEach((col, idx) => {
      user[col] = userRow[idx];
    });

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return user data (without password)
    return res.status(200).json({
      message: 'Login successful',
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;

