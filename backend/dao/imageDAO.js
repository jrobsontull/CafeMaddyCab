import fs from 'fs';

export default class ImageDAO {
  /* This function is not actually async yet */
  static async getImageStream(path) {
    try {
      if (fs.existsSync(path)) {
        return fs.createReadStream(path);
      } else {
        return null;
      }
    } catch (e) {
      console.error(
        'ImageDAO: Failed to get filestream (' + path + '). ' + e.message
      );
      return { error: e.message };
    }
  }
}
