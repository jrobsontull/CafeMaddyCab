import RecaptchaDAO from '../dao/recaptchaDAO.js';

export default class RecaptchaController {
  static async apiVerifyResponse(req, res, next) {
    try {
      const testResponse = req.body.testResponse;
      const secret = process.env.RECAPTCHA_SECRET;
      const response = await RecaptchaDAO.verifyResponse(testResponse, secret);
      if (response) {
        res.json(response);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
