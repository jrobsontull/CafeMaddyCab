import multer from 'multer';

const csvUpload = multer({
  fileFilter: function (req, file, cb) {
    const allowedTypes = /csv/;
    const extName = allowedTypes.test(file.originalname.toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      // All good
      return cb(null, true);
    } else {
      cb('Only CSV formats are allowed!');
    }
  },
}).single('csvFile');

export default csvUpload;
