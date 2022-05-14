import express from 'express';
import StoriesController from '../controllers/stories.controller.js';
import validateHeader from '../middleware/validateHeader.js';

const router = express.Router();

router
  .route('/')
  .get(validateHeader, StoriesController.apiGetStories)
  .put(validateHeader, StoriesController.apiEditStoryById);
router.route('/submit').post(StoriesController.apiPostStory);

export default router;
