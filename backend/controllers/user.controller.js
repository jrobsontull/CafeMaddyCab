import UserDAO from '../dao/userDAO.js';

export default class UserController {
  static async apiGetName(req, res, next) {
    try {
      console.log(req.params);
      const _id = req.params._id;
      console.log(_id);
    } catch (e) {
      console.log('UserController: Failed to retrieve username. ' + e.message);
      res.status(500).json({ error: e });
    }
  }
}
