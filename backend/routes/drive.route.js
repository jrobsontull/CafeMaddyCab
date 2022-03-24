import express from 'express';
import DriveController from '../controllers/drive.controller.js';

const router = express.Router();

router.route('/').get(DriveController.apiReconnectDrive);

router
  .route('/photos')
  .get(DriveController.apiGetPhoto)
  .post(DriveController.apiPostPhoto)
  .delete(DriveController.apiDeletePhoto);

router.route('/photos/list').get(DriveController.apiListPhotos);

export default router;
