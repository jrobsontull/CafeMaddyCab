import express from 'express';
import AwsController from '../controllers/aws.controller.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router
  .route('/images')
  .post(upload.single('file'), AwsController.apiUploadFile);

router.route('/images/:folder/:id').get(AwsController.apiGetFileStream);

export default router;
