import express from 'express';
import ImageController from '../controllers/image.controller.js';

const router = express.Router();

router.route('/:folder/:id').get(ImageController.apiGetImageStream);

export default router;
