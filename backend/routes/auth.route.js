import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/login').post(AuthController.apiLoginUser);
router.route('/register').post(AuthController.apiRegisterUser);
router.route('/verify').post(AuthController.apiVerifyToken);

export default router;
