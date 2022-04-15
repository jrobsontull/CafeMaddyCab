import axios from 'axios';

async function verifyCaptcha(req, res, next) {
  try {
    const gResponse = req.get('g-response') || null;

    if (gResponse !== 'undefined' && gResponse !== null) {
      const secret = process.env.RECAPTCHA_SECRET;
      const params = '?secret=' + secret + '&response=' + gResponse;

      const requestRes = await axios
        .post('https://www.google.com/recaptcha/api/siteverify' + params)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.success) {
              /* Proceed to next middleware */
              next();
            } else {
              res.status(500).json({
                error: {
                  state: true,
                  message: 'Error validating reCAPTCHA response.',
                },
              });
            }
          } else {
            res.status(400).json({
              error: {
                state: true,
                message: 'Invalid reCAPTCHA response.',
              },
            });
          }
        });
      return requestRes;
    } else {
      res.status(400).json({
        error: {
          state: true,
          message:
            'You need to complete reCAPTCHA before submitting a request.',
        },
      });
    }
  } catch (e) {
    console.log('verifyCaptcha: Error verifying reCAPTCHA. ' + e.message);
    res.status(500).json({
      error: {
        state: true,
        message: 'Internal server error.',
      },
    });
  }
}

export default verifyCaptcha;
