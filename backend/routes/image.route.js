import express from 'express';
import ImageController from '../controllers/image.controller.js';
import validateHeader from '../middleware/validateHeader.js';

const router = express.Router();

router.route('/:folder/:id').get(ImageController.apiGetImageStream);

export default router;
