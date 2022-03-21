import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// If page doesn't exist
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
