import express from 'express';
import FeedbackController from '../controllers/feedback.controller.js';
import validateHeader from '../middleware/validateHeader.js';

const router = express.Router();

router.route('/').get(validateHeader, FeedbackController.apiGetFeedback);
router.route('/submit').post(FeedbackController.apiPostFeedback);

export default router;
