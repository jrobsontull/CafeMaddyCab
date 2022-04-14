import express from 'express';
import RidesController from '../controllers/rides.controller.js';

const router = express.Router();

router
  .route('/')
  .get(RidesController.apiGetRides)
  .post(RidesController.apiRequestRide)
  .put(RidesController.apiEditRideById);
router.route('/getById').get(RidesController.apiGetRideById);
router.route('/getStats').get(RidesController.apiGetStats);
router.route('/setInProgress').post(RidesController.apiSetInProgress);

export default router;
