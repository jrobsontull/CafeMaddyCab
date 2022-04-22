import jwt from 'jsonwebtoken';

function verify(token) {
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

export default verify;
