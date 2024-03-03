const multer = require('multer');
const path = require('path');

const uploadsDirectory = path.resolve(__dirname, '../uploads');

const photosMiddleware = multer({
  dest: uploadsDirectory,
});

module.exports = photosMiddleware;
