import initSqlJs from 'sql.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'bus_tracking.db');

let db = null;

export async function initializeDatabase() {
  const SQL = await initSqlJs();
  
  // Load existing database or create new one
  let data;
  if (fs.existsSync(dbPath)) {
    data = fs.readFileSync(dbPath);
    db = new SQL.Database(data);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phoneNumber TEXT,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      busId TEXT NOT NULL,
      departureDate DATE NOT NULL,
      seatNumber TEXT NOT NULL,
      status TEXT DEFAULT 'confirmed',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS buses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      route TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      departure TEXT NOT NULL,
      arrival TEXT NOT NULL,
      price REAL NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed admin user
  await seedAdminUser(db);

  saveDatabase();
  console.log('Database initialized successfully');
  return db;
}

async function seedAdminUser(database) {
  try {
    // Check if admin user already exists
    const result = database.exec(
      'SELECT * FROM users WHERE email = ?',
      ['admin@smartbus.com']
    );

    // If admin user already exists, skip seeding
    if (result && result.length > 0 && result[0].values.length > 0) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the admin password
    const hashedPassword = await bcrypt.hash('admin@123', 10);

    // Insert admin user
    database.run(
      'INSERT INTO users (fullName, email, phoneNumber, password) VALUES (?, ?, ?, ?)',
      ['Admin User', 'admin@smartbus.com', '+1234567890', hashedPassword]
    );

    console.log('Admin user seeded successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}

export function saveDatabase() {
  if (db) {
    const data = db.export();
    fs.writeFileSync(dbPath, data);
  }
}

export function getDatabase() {
  return db;
}

export default db;

