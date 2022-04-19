import { rateLimit } from 'express-rate-limit';

// Limit requests per IP for different routes

// For ride POST requests to 2 per min
const apiLimitRequestRides = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req, res) {
    res
      .status(429)
      .json({
        error:
          'You have exceeded the request limit. Please wait to try again later.',
      });
  },
});

export default apiLimitRequestRides;
