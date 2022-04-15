import multer from 'multer';
import storage from './storage.js';
import validateType from './validateFileType.js';

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024, fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    validateType(file, callback);
  },
});

const multiUpload = upload.fields([
  { name: 'selfie', maxCount: 1 },
  { name: 'photoId', maxCount: 1 },
]);

export default multiUpload;
