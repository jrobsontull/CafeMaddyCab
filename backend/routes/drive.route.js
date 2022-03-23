import express from 'express';
import DriveController from '../controllers/drive.controller.js';

const router = express.Router();

router.route('/getAllPhotos').get(DriveController.apiGetAllPhotos);

export default router;
