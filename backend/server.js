const multer = require('multer');

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './schoolImages');  // folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // unique file name
  }
});

const upload = multer({ storage });


const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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
  console.log('Connected to MySQL database');
});

// Get all schools
app.get('/schools', (req, res) => {
  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/schools', upload.single('image'), (req, res) => {
  console.log('Form fields:', req.body);   
  console.log('Uploaded file:', req.file); 

  const newSchool = {
    ...req.body,
    image: `/schoolImages/${req.file.filename}` // URL path for frontend access
  };

  db.query('INSERT INTO schools SET ?', newSchool, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: results.insertId, ...newSchool });
  });
});


app.use('/schoolImages', express.static('schoolImages'));


// Update an existing school by id
app.put('/schools/:id', (req, res) => {
  const id = req.params.id;
  const updatedSchool = req.body;
  db.query('UPDATE schools SET ? WHERE id = ?', [updatedSchool, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'School updated successfully' });
  });
});

// Delete a school by id
app.delete('/schools/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM schools WHERE id = ?', id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'School deleted successfully' });
  });
});


app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});
