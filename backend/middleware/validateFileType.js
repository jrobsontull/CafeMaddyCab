function validateType(file, callback) {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(file.originalname.toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return callback(null, true);
  } else {
    callback('Only JPEG and PNG image formats are allowed!');
  }
}

export default validateType;
