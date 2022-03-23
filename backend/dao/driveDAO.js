import { firebase_v1beta1, google } from 'googleapis';
import { MongoDriverError } from 'mongodb';
import credentials from '../google-credentials.json' assert { type: 'json' };

let drive;
const selfieFolderId = '1VCEuqL2zhBb9avYUlYK5aF9JWxwOZ5pT';
const photoFolderId = '1UZr4I6BNTuv_TPQG16p_moj41rf3TcRg';
const backendFolderId = '1xNtznBGDfp7GJXSjBTaOU_adqTXT41Dg';

export default class DriveDAO {
  static async googleAuth() {
    const scopes = ['https://www.googleapis.com/auth/drive'];

    try {
      const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        scopes
      );

      drive = google.drive({ version: 'v3', auth });
      console.log('Backend authed for drive API.');
    } catch (e) {
      console.log(e.message);
    }
  }

  static async uploadPhoto(photo) {}

  static async getAllPhotos(folder) {
    if (drive) {
      let q = {};
      if (folder === 'selfie') {
        q = { q: "'" + selfieFolderId + "' in parents" };
      } else if (folder === 'photoId') {
        q = { q: "'" + photoFolderId + "' in parents" };
      } else {
        q = { q: "'" + backendFolderId + "' in parents" };
      }
      drive.files.list(q, (err, res) => {
        if (err) {
          console.log('Unable to get photos in folder: ' + err);
          return { error: err };
        }
        const files = res.data.files;
        if (files.length) {
          console.log('Search for all photos in folder');
          return files;
        } else {
          console.log('No files found');
          return { message: 'No files found' };
        }
      });
    }
  }
}
