import express from 'express';
import AwsController from '../controllers/aws.controller.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router
  .route('/upload')
  .post(upload.single('file'), AwsController.apiUploadFile);

export default router;
