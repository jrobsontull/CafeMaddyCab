import http from './http.upload.common.js';

export default class DriveAPI {
  static async uploadPhoto(file) {
    var formData = new FormData();
    formData.append('file', file);
    postRequest(formData, '/api/v1/drive/photos/').then((res) => {
      console.log(res);
    });
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
