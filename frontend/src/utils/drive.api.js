import http from './http.upload.common.js';

export default class DriveAPI {
  static async uploadPhoto(file, parentFolder) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('storageFolder', parentFolder);
    const response = postRequest(formData, '/api/v1/drive/photos/');
    if (response) {
      return response;
    }
  }
}

async function postRequest(body, url) {
  try {
    const payload = body;
    const response = await http.post(url, payload);

    if (response.status === 200) {
      return response;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error: ' + e.message);
    return null;
  }
}
