import DriveDAO from '../dao/driveDAO.js';

export default class DriveController {
  static async apiGetAllPhotos(req, res, next) {
    try {
      const folder = req.body.folder;
      const response = await DriveDAO.getAllPhotos(folder);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
