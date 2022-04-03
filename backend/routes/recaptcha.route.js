import express from 'express';
import RecaptchaController from '../controllers/recaptcha.controller.js';

const router = express.Router();

router.route('/').post(RecaptchaController.apiVerifyResponse);

export default router;
