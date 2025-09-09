const Database = require("better-sqlite3");

const db = new Database("hr_system.db");

// Table employés
db.prepare(`CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  position TEXT,
  hireDate TEXT,
  salary REAL
)`).run();

// Table congés
db.prepare(`CREATE TABLE IF NOT EXISTS leave_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employeeId INTEGER,
  startDate TEXT,
  endDate TEXT,
  type TEXT,
  status TEXT DEFAULT 'pending'
)`).run();

// Table présences
db.prepare(`CREATE TABLE IF NOT EXISTS attendance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employeeId INTEGER,
  date TEXT,
  checkIn TEXT,
  checkOut TEXT
)`).run();

// Table paie
db.prepare(`CREATE TABLE IF NOT EXISTS payroll (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employeeId INTEGER,
  paymentDate TEXT,
  amount REAL,
  status TEXT
)`).run();

module.exports = db;
