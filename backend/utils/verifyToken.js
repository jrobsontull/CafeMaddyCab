import jwt from 'jsonwebtoken';

function verify(token) {
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(
      'verifyToken: User ' + verified.id + ' accessed a ProtectedRoute.'
    );
    return true;
  } catch (e) {
    return false;
  }
}

export default verify;
