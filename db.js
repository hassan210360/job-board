const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./jobBoard.db');

// Create Jobs Table
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, location TEXT)");

  // Create Users Table with CV uploads
  db.run("CREATE TABLE IF NOT EXISTS applicants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, job_id INTEGER, cv TEXT, FOREIGN KEY(job_id) REFERENCES jobs(id))");
});

module.exports = db;
