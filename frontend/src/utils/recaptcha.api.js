import http from '../utils/http.common';

export default class RecaptchaAPI {
  static async verifyResponse(testResponse) {
    const body = {
      testResponse: testResponse,
    };
    const response = await postRequest(body, 'api/v1/captcha/verifyCaptcha');
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
