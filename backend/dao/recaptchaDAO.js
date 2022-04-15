import axios from 'axios';

export default class RecaptchaDAO {
  static async verifyResponse(gResponse, secret) {
    try {
      const params = '?secret=' + secret + '&response=' + gResponse;
      const requestRes = await axios
        .post('https://www.google.com/recaptcha/api/siteverify' + params)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            return data;
          } else {
            return null;
          }
        });
      return requestRes;
    } catch (e) {
      console.log('Error verifying ReCAPTCHA: ' + e.message);
      return { error: e };
    }
  }
}
