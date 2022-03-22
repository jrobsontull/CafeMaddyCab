import express from 'express';
import RidesController from '../controllers/rides.controller.js';

const router = express.Router();

router.route('/').get(() => console.log('get request'));
router.route('/request').post(RidesController.apiRequestRide);

export default router;
