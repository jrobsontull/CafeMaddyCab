import express from 'express';
import UserController from '../controllers/user.controller.js';
import validateHeader from '../middleware/validateHeader.js';

const router = express.Router();

router.route('/getName').get(validateHeader, UserController.apiGetName);

export default router;
