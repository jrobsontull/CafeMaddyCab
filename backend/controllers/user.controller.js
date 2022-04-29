import UserDAO from '../dao/userDAO.js';

export default class UserController {
  static async apiGetName(req, res, next) {
    res.json('all good');
  }
}
