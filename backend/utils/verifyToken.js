import jwt from 'jsonwebtoken';

function verify(token) {
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified);
    return true;
  } catch (e) {
    return false;
  }
}

export default verify;
