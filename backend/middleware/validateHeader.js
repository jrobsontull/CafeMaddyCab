import verify from '../utils/verifyToken.js';

function validateHeader(req, res, next) {
  // Do something
  const token = req.get('token') || null;
  if (verify(token)) {
    next();
  } else {
    res.status(401).json({ error: 'not authorised' });
  }
}

export default validateHeader;
