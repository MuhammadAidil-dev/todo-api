const multer = require('multer');
const fs = require('fs');
const path = require('path');

// otomatis membuat folder uploads
const uploadsDir = path.join(__dirname, '../../uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Folder uploads has been created');
  }
} catch (error) {
  console.error('Error creating uploads folder:', error);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); //folder tempat file disimpan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Penamaan file
  },
});

// Middleware Multer
const upload = multer({ storage: storage });

module.exports = upload;
