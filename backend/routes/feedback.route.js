import express from 'express';
import FeedbackController from '../controllers/feedback.controller.js';

const router = express.Router();

router.route('/').get(FeedbackController.apiGetFeedback);
router.route('/submit').post(FeedbackController.apiPostFeedback);

export default router;
