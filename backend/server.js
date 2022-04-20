import express from 'express';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';

// Middleware imports
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from './middleware/mongoSanitize.js';

// Route imports
import rides from './routes/rides.route.js';
import auth from './routes/auth.route.js';
import image from './routes/image.route.js';
import feedback from './routes/feedback.route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Secure HTTP headers
// if in dev use cross-origin, otherwise might be fine!
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'", 'https://localhost:8080/'],
        'script-src': [
          "'self'",
          'https://www.google.com',
          'https://www.gstatic.com',
        ],
        'frame-src': ["'self'", 'https://www.google.com'],
        'img-src': ["'self'", 'https://localhost:8080/'],
      },
    },
  })
);

// Sanitise all $ and . from req.body, req.params, req.headers, req.query
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(
        'Bad key found [' + key + '] in request and will be sanitized.'
      );
      console.log(
        'Request headers:\n',
        req.headers,
        '\nRequest URL:\n',
        req.url
      );
    },
  })
);

app.use('/api/v1/rides', rides);
app.use('/api/v1/user', auth);
app.use('/api/v1/image', image);
app.use('/api/v1/feedback', feedback);

// Serve static files if production mode
if (process.env.NODE_ENV === 'production') {
  // Serve react app files
  app.use(express.static('../frontend/build'));
  // All other GET requests not handled before will return the app
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: '../frontend/build/' });
  });
}

// If page doesn't exist
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

// Generate HTTPS server with temp dev SSL certificate if production
// let server;

// if (process.env.NODE_ENV === 'production') {
//   console.log('Starting HTTPS production server.');
//   server = https.createServer(
//     {
//       key: fs.readFileSync('ssl/key.pem'),
//       cert: fs.readFileSync('ssl/cert.pem'),
//     },
//     app
//   );
// } else {
//   console.log('Starting HTTP development server.');
//   server = app;
// }

export default app;
