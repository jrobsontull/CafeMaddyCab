// Module imports
import express from 'express';
import dotenv from 'dotenv';

// Middleware imports
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from './middleware/mongoSanitize.js';

// Route imports
import rides from './routes/rides.route.js';
import auth from './routes/auth.route.js';
import image from './routes/image.route.js';
import feedback from './routes/feedback.route.js';
import stories from './routes/stories.route.js';
import time from './routes/time.route.js';

// Configure server
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb' }));

// Secure HTTP headers
let crossOriPolicy = { policy: 'cross-origin' };
if (process.env.NODE_ENV === 'production') {
  crossOriPolicy = { policy: 'same-site' };
}

app.use(
  helmet({
    crossOriginResourcePolicy: crossOriPolicy,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': [
          "'self'",
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'https://cafemaddycab.org:8080/',
          'https://localhost:8080',
        ],
        'script-src': [
          "'self'",
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'https://www.google.com',
          'https://www.gstatic.com',
        ],
        'frame-src': ["'self'", 'https://www.google.com'],
        'img-src': [
          "'self'",
          'https://cafemaddycab.org:8080/',
          'https://localhost:8080',
        ],
        'connect-src': ["'self'", 'https://www.google-analytics.com'],
        'script-src-elem': [
          "'self'",
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://www.google.com',
          'https://www.gstatic.com',
        ],
      },
    },
  })
);

// Sanitise all $ and . from req.body, req.params, req.headers, req.query
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(
        'Bad key found [' + key + '] in request and will be sanitized.\n',
        '\nRequest headers:\n',
        req.headers,
        '\nRequest URL:\n',
        req.url
      );
    },
  })
);

// Set up routing
app.use('/api/v1/rides', rides);
app.use('/api/v1/auth', auth);
app.use('/api/v1/image', image);
app.use('/api/v1/feedback', feedback);
app.use('/api/v1/stories', stories);
app.use('/api/v1/time', time);

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

console.log('Starting HTTP server.');
export default app;
