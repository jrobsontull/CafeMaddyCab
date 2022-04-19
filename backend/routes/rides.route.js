import express from 'express';

// Middleware
import multer from 'multer';
import multiUpload from '../middleware/upload.js';
import verifyCaptcha from '../middleware/validateCaptcha.js';
import apiLimitRequestRides from '../middleware/rateLimitter.js';

// Controller
import RidesController from '../controllers/rides.controller.js';

const router = express.Router();

router
  .route('/')
  .get(RidesController.apiGetRides)

  .post(
    apiLimitRequestRides,
    verifyCaptcha,
    function (req, res, next) {
      multiUpload(
        req,
        res,
        function (err) {
          /* Handle middleware errors and provide feedback to frontend */
          if (err instanceof multer.MulterError) {
            /* Handle specific file size error */
            if (err.code === 'LIMIT_FILE_SIZE') {
              console.log(
                'rides.route.js: File uploaded to Multer too large. ' +
                  err.message
              );
              res.status(500).json({
                error: {
                  state: true,
                  message: 'Each photo can only be a maximum of 10 MB.',
                },
              });
            } else {
              /* Handle all other Multer errors */
              console.log(
                'rides.route.js: A Multer error occurred. ' + err.message
              );
              res.status(500).json({
                error: { state: true, message: 'Internal server error.' },
              });
            }
          } else if (err) {
            console.log('rides.route.js: Other Multer error occurred. ' + err);
            res.status(400).json({ error: { state: true, message: err } });
          }

          /* All checks passed and pass req to controller */
          next();
        },
        next
      );
    },
    RidesController.apiRequestRide
  )

  .put(RidesController.apiEditRideById);
router.route('/getById').get(RidesController.apiGetRideById);
router.route('/getStats').get(RidesController.apiGetStats);
router.route('/setInProgress').post(RidesController.apiSetRidesInProgress);
router.route('/unsetInProgress').post(RidesController.apiUnsetRidesInProgress);
router.route('/approve').post(RidesController.apiApproveRides);

export default router;
