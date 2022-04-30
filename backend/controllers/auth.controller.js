import AuthDAO from '../dao/authDAO.js';
import generateToken from '../utils/generateToken.js';
import verify from '../utils/verifyToken.js';
import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;

let users;

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
      console.error('AuthController: Failed to login user. ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiRegisterUser(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const commonName = req.body.commonName;
      const role = req.body.role || null;

      if (!username || !password || !commonName) {
        res.status(400).json({ error: 'Incomplete request body.' });
        return;
      }

      const registerResponse = await AuthDAO.registerUser(
        username,
        password,
        commonName,
        role
      );

      // Error handling
      var { error } = registerResponse;
      if (error) {
        res.status(400).json({ error });
      } else {
        const user = registerResponse;
        user.token = generateToken(registerResponse._id);
        res.json(user);
      }
    } catch (e) {
      console.error('AuthController: Failed to register user. ' + e.message);
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

  static async apiGetUsername(req, res, next) {
    try {
      const _id = req.query.id;

      const nameResponse = await AuthDAO.getUsername(_id);

      var { error } = nameResponse;
      if (error) {
        res.status(400).json({ error: error.message });
      } else {
        res.json(nameResponse);
      }
    } catch (e) {
      console.error(
        'AuthController: Failed to retrieve username. ' + e.message
      );
      res.status(500).json({ error: e });
    }
  }

  static async apiChangePassword(req, res, next) {
    try {
      const currentPass = req.body.currentPass;
      const newPass = req.body.newPass;
      const _id = req.body._id;

      if (currentPass && newPass && _id) {
        // All good
        const passResponse = await AuthDAO.changePassword(
          currentPass,
          newPass,
          _id
        );

        var { error } = passResponse;
        if (error) {
          res.status(400).json({ error: error });
        } else {
          res.json(passResponse);
        }
      } else {
        res.status(400).json({ error: 'Incomplete request body.' });
      }
    } catch (e) {
      console.error('AuthController: Failed to change password. ' + e.message);
      res.status(500).json({ error: e });
    }
  }
}
