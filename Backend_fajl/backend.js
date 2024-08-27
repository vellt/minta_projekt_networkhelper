const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    // Use the original file name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create the uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// POST endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.', status: 'error', data: null });
  }
  res.status(200).send({ message: 'File uploaded successfully', status: 'success', data: req.file.originalname });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
