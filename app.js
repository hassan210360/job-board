const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('./db.js');
const app = express();

// Setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to get all jobs
app.get('/jobs', (req, res) => {
  db.all("SELECT * FROM jobs", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Endpoint to post a new job
app.post('/jobs', (req, res) => {
  const { title, description, location } = req.body;
  db.run("INSERT INTO jobs (title, description, location) VALUES (?, ?, ?)", [title, description, location], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Endpoint to upload CV
app.post('/apply', upload.single('cv'), (req, res) => {
  const { name, email, job_id } = req.body;
  const cvPath = req.file.path;

  db.run("INSERT INTO applicants (name, email, job_id, cv) VALUES (?, ?, ?, ?)", [name, email, job_id, cvPath], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Application submitted successfully', id: this.lastID });
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
