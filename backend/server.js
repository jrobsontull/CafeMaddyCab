import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';

import rides from './routes/rides.route.js';
import auth from './routes/auth.route.js';
import image from './routes/image.route.js';
import feedback from './routes/feedback.route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

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

// Generate HTTPS server with temp dev SSL certificate
const httpsServer = https.createServer(
  {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
  },
  app
);

export default httpsServer;
