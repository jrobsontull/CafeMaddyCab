import express from 'express';

// Middleware
import multer from 'multer';
import multiImageUpload from '../middleware/imageUpload.js';
import verifyCaptcha from '../middleware/validateCaptcha.js';
import apiLimitRequestRides from '../middleware/rateLimitter.js';
import validateHeader from '../middleware/validateHeader.js';
import csvUpload from '../middleware/csvUpload.js';

// Controller
import RidesController from '../controllers/rides.controller.js';

const router = express.Router();

// Handle ride requests with image uploads
router
  .route('/')
  .post(
    apiLimitRequestRides,
    verifyCaptcha,
    function (req, res, next) {
      multiImageUpload(
        req,
        res,
        function (err) {
          /* Handle middleware errors and provide feedback to frontend */
          if (err instanceof multer.MulterError) {
            /* Handle specific file size error */
            if (err.code === 'LIMIT_FILE_SIZE') {
              console.error(
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
              console.error(
                'rides.route.js: A Multer error occurred. ' + err.message
              );
              res.status(500).json({
                error: { state: true, message: 'Internal server error.' },
              });
            }
          } else if (err) {
            console.error(
              'rides.route.js: Other non-Multer error occurred. ' + err
            );
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
  .get(validateHeader, RidesController.apiGetRides)
  .put(validateHeader, RidesController.apiEditRideById);

// Get ride details by ID
router.route('/getById').get(validateHeader, RidesController.apiGetRideById);

// Get stats on all rides
router.route('/getStats').get(validateHeader, RidesController.apiGetStats);

// Set rides to in progress for approval
router
  .route('/setInProgress')
  .post(validateHeader, RidesController.apiSetRidesInProgress);

// Cancel in progress state of rides
router
  .route('/unsetInProgress')
  .post(validateHeader, RidesController.apiUnsetRidesInProgress);

// Approve rides after approval screen
router.route('/approve').post(validateHeader, RidesController.apiApproveRides);

// Download CSV of rides for needing codes
router.route('/sendCodes').get(validateHeader, RidesController.apiSendCodes);

// Mark rides as done and append coupon codes
router.route('/markAsDone').post(
  validateHeader,
  function (req, res, next) {
    csvUpload(
      req,
      res,
      function (err) {
        // Handle middleware errors
        if (err instanceof multer.MulterError) {
          console.error(
            'rides.route.js: A Multer error occurred. ' + err.message
          );
          res.status(500).json({
            error: 'Internal server error.' + err.message,
          });
        } else if (err) {
          // Handle other errors
          console.error(
            'rides.route.js: Other non-Multer error occurred. ' + err
          );
          res.status(400).json({ error: err });
        }
        next();
      },
      next
    );
  },
  RidesController.apiMarkAsDone
);

export default router;
