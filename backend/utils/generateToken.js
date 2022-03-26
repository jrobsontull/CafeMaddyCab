import jwt from 'jsonwebtoken';

function generateToken(id) {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: '30d',
  });
}

export default generateToken;
