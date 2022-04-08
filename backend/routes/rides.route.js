import express from 'express';
import RidesController from '../controllers/rides.controller.js';

const router = express.Router();

router.route('/').get(RidesController.apiGetRides);
router.route('/request').post(RidesController.apiRequestRide);

export default router;
