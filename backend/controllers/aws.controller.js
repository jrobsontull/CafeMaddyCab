import AwsDAO from '../dao/awsDAO.js';
import { UUID } from 'bson';

export default class AwsController {
  static async apiUploadFile(req, res, next) {
    try {
      const fileName = new UUID().toString();
      let file_obj = req.file;
      const parentFolder = req.body.parentFolder || null;

      const response = await AwsDAO.uploadFile(
        fileName,
        file_obj,
        parentFolder
      );

      console.log(response);
      res.json(response);
    } catch (e) {
      console.log('DriveController error: ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }
}
