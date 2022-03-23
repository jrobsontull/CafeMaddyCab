import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import rides from './routes/rides.route.js';
import drive from './routes/drive.route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/rides', rides);
app.use('api/v1/drive', drive);

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

export default app;
