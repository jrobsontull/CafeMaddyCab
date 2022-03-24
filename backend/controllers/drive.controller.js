import DriveDAO from '../dao/driveDAO.js';
import { UUID } from 'bson';

export default class DriveController {
  // Refresh authentication token if needed
  static async apiReconnectDrive(req, res, next) {
    try {
      const response = await DriveDAO.googleAuth();
      res.json(response);
    } catch (e) {
      console.log('DriveController error: ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }

  // Get URL of photo from specified folder
  static async apiGetPhoto(req, res, next) {
    try {
      const file_id = req.body.file_id;
      const response = await DriveDAO.getPhoto(file_id);
      res.json(response);
    } catch (e) {
      console.log('DriveController error: ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }

  // Upload photo to specified folder
  static async apiPostPhoto(req, res, next) {
    try {
      const fileName = new UUID().toString();
      const fileLocation = req.body.file_location;
      const storageFolder = req.body.storageFolder || null;
      const response = await DriveDAO.uploadPhoto(
        fileName,
        fileLocation,
        storageFolder
      );
      res.json(response);
    } catch (e) {
      console.log('DriveController error: ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }

  // Delete photo
  static async apiDeletePhoto(req, res, next) {
    try {
    } catch (e) {
      console.log('DriveController error: ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }

  // List all files in specified folder
  static async apiListPhotos(req, res, next) {
    try {
      const folder = req.body.folder || {};
      const listResponse = await DriveDAO.listPhotos(folder);
      res.json(listResponse);
    } catch (e) {
      console.log('DriveController error: ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }
}
