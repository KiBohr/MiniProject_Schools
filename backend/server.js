require('dotenv').config(); // Load env variables

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
app.use(cors());
app.use(express.json());

// Setup MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3912',  
  database: 'react_miniProject_db'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log(' Connected to MySQL database');
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// onfigure multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'schoolImages', // Optional: folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});
const upload = multer({ storage });


// Routes

// Get all schools
app.get('/schools', (req, res) => {
  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a new school
app.post('/schools', upload.single('image'), (req, res) => {
  console.log('Received form data:', req.body);

  // Step 1: Directly log the req.file object right after the multer middleware
  if (req.file) {
    console.log('Received file info:', req.file); // No stringifying, just log the raw object
  } else {
    console.log('No file uploaded');
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is missing' });
  }

  const imageUrl = req.file.path || req.file.url || req.file.secure_url;
  if (!imageUrl) {
    return res.status(500).json({ error: 'Failed to get image URL from upload' });
  }

  const newSchool = {
    ...req.body,
    image: imageUrl,
  };

  db.query('INSERT INTO schools SET ?', newSchool, (err, results) => {
    if (err) {
      console.error('Database insertion error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Inserted school with ID:', results.insertId);
    res.status(201).json({ id: results.insertId, ...newSchool });
  });
});



// Update existing school (without image upload)
app.put('/schools/:id', (req, res) => {
  const id = req.params.id;
  const updatedSchool = req.body;

  db.query('UPDATE schools SET ? WHERE id = ?', [updatedSchool, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'School updated successfully' });
  });
});

// Delete a school
app.delete('/schools/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM schools WHERE id = ?', id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'School deleted successfully' });
  });
});

// Catch all errors middleware - logs error and returns 500
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Backend server running on port ${PORT}`);
});
