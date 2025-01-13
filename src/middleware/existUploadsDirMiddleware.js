const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../../uploads');

// otomatis membuat folder uploads
const existUploadsMiddleware = (req, res, next) => {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('Folder uploads has been created');
    }
    next();
  } catch (error) {
    console.error('Error creating uploads folder:', error);
    next(error);
  }
};

module.exports = existUploadsMiddleware;
