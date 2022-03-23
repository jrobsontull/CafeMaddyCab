import { google } from 'googleapis';
import credentials from '../google-credentials.json' assert { type: 'json' };

export default class GoogleDAO {
  static authBackend() {
    const scopes = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      scopes
    );

    const drive = google.drive({ version: 'v3', auth });

    drive.files.list({}, (err, res) => {
      if (err) throw err;
      const files = res.data.files;
      if (files.length) {
        files.map((file) => {
          console.log(file);
        });
      } else {
        console.log('No files found');
      }
    });
  }
}
