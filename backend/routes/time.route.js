import express from 'express';
import TimeController from '../controllers/time.controller.js';

const router = express.Router();

router.route('/formOpen').get(TimeController.apiIsFormOpen);

export default router;
