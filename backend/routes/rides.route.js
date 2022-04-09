import express from 'express';
import RidesController from '../controllers/rides.controller.js';

const router = express.Router();

router.route('/').get(RidesController.apiGetRides);
router.route('/getById').get(RidesController.apiGetRideById);
router.route('/request').post(RidesController.apiRequestRide);

export default router;
