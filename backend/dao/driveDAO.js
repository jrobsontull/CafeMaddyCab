import { google } from 'googleapis';
import credentials from '../google-credentials.json' assert { type: 'json' };
import stream from 'stream';

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
      return { status: 'Backend authed for drive API.' };
    } catch (e) {
      console.log(e.message);
      return { status: e.message };
    }
  }

  static async getPhoto(file_id) {
    if (drive) {
      const file = await new Promise((resolve, reject) => {
        const query = {
          fileId: file_id,
          fields: 'name, id, mimeType, webViewLink, webContentLink',
        };

        drive.files.get(query, function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });

      return file.data;
    }
  }

  static async uploadPhoto(name, file, storageLocation = null) {
    let parentFolder = backendFolderId;
    if (storageLocation === 'selfie') {
      parentFolder = selfieFolderId;
    } else if (storageLocation === 'photoId') {
      parentFolder = photoFolderId;
    }

    var fileMetadata = {
      name: name,
      parents: [parentFolder],
      mimeType: file.mimetype,
    };

    // Convert file buffer to stream
    let bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    var media = {
      body: bufferStream,
    };

    const uploadedRes = await new Promise((resolve, reject) => {
      drive.files.create(
        {
          resource: fileMetadata,
          media: media,
          fields: 'id',
        },
        function (err, file) {
          if (err) {
            reject(err);
          }
          resolve(file);
        }
      );
    });

    const finalFile = {
      file_id: uploadedRes.data.id,
      file_name: name,
      parentFolder: parentFolder,
      status: 'ok',
    };

    return finalFile;
  }

  static async listPhotos(folder) {
    if (drive) {
      let query = {};
      if (folder === 'selfie') {
        query = { q: "'" + selfieFolderId + "' in parents" };
      } else if (folder === 'photoId') {
        query = { q: "'" + photoFolderId + "' in parents" };
      } else {
        query = { q: "'" + backendFolderId + "' in parents" };
      }

      const fileList = await new Promise((resolve, reject) => {
        drive.files.list(query, function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });

      return fileList.data;
    }
  }
}
