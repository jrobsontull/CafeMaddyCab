import AuthDAO from '../dao/authDAO.js';
import generateToken from '../utils/generateToken.js';
import verify from '../utils/verifyToken.js';

export default class AuthController {
  static async apiLoginUser(req, res, next) {
    try {
      const loginResponse = await AuthDAO.loginUser(
        req.body.username,
        req.body.password
      );
      // Error handling
      var { error } = loginResponse;
      if (error) {
        res.status(400).json({ error });
      } else {
        // Create and sign token
        const user = loginResponse;
        user.token = generateToken(loginResponse._id);
        res.json(user);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiRegisterUser(req, res, next) {
    try {
      const registerResponse = await AuthDAO.registerUser(
        req.body.username,
        req.body.password,
        req.body.commonName
      );

      // Error handling
      var { error } = registerResponse;
      if (error) {
        res.status(400).json({ error });
      } else {
        const user = registerResponse;
        user.token = generateToken(registerResponse._id);
        res.status(201).json(user);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiVerifyToken(req, res, next) {
    const token = req.body.token;
    if (!token) {
      // If token doesn't exist
      res.status(401).send({ identity: 'invalid', message: 'Access denied.' });
    } else {
      if (verify(token)) {
        res
          .status(200)
          .send({ identity: 'valid', message: 'Identity approved.' });
      } else {
        res
          .status(400)
          .send({ identity: 'invalid', message: 'Invalid token.' });
      }
    }
  }
}
