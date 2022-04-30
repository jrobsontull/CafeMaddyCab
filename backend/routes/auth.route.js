import express from 'express';
import verifyCaptcha from '../middleware/validateCaptcha.js';
import validateHeader from '../middleware/validateHeader.js';
import AuthController from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/login').post(verifyCaptcha, AuthController.apiLoginUser);
router.route('/register').post(validateHeader, AuthController.apiRegisterUser);
router.route('/verify').post(AuthController.apiVerifyToken);
router.route('/getName').get(validateHeader, AuthController.apiGetUsername);
router
  .route('/changePassword')
  .put(validateHeader, AuthController.apiChangePassword);

export default router;
