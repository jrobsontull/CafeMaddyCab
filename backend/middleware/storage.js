import multer from 'multer';
import { UUID } from 'bson';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const parentFolder = './uploads';
    if (file.fieldname === 'selfie') {
      callback(null, parentFolder + '/selfie');
    } else if (file.fieldname === 'photoId') {
      callback(null, parentFolder + '/photoId');
    }
  },
  filename: function (req, file, callback) {
    /* Check file type */

    /* Assign unique name */
    const id = new UUID().toString();
    const ext = file.mimetype.split('/')[1];
    callback(null, `${id}.${ext}`);
  },
});

export default storage;
