import fs from 'fs';

export default class ImageDAO {
  // This function is not actually async yet!
  static async getImageStream(path) {
    try {
      if (await checkFileExists(path)) {
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

  static async deleteImage(path) {
    try {
      if (await checkFileExists(path)) {
        const deleteResult = await fs.promises.unlink(path);
        if (!deleteResult) {
          return { status: 'success' };
        } else {
          return { error: deleteResult };
        }
      } else {
        return { error: 'This file does not exist.' };
      }
    } catch (e) {
      console.error(
        'ImageDAO: Failed to delete image at (' + path + '). ' + e.message
      );
      return { error: e.message };
    }
  }

  static async bulkDelete(paths) {
    try {
      let results = [];
      for (const path of paths) {
        results.push([path, await this.deleteImage(path)]);
      }
      return results;
    } catch (e) {
      console.error('ImageDAO: Failed to bulk delete images. ' + e.message);
      return { error: e.message };
    }
  }
}

// Check if file exists async
function checkFileExists(path) {
  return fs.promises
    .access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}
