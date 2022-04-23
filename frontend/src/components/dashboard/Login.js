import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../utils/auth.context';
import http from '../../utils/http.common';

import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
  const { user, authUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gResponse, setGResponse] = useState('');
  const [errors, setErrors] = useState({
    username: true,
    password: true,
    recaptcha: true,
  });
  const [errorStateMessage, setErrorStateMessage] = useState({
    state: false,
    message: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Navigate to dashboard if logged in
  useEffect(() => {
    if (!user.isVerifying && user.verified) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  function validateUsername(target) {
    const re =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (target.value !== '' && re.test(target.value)) {
      setUsername(target.value);
      setErrors((prevErrors) => ({ ...prevErrors, username: false }));
      target.classList.remove('invalid');
    } else {
      setUsername(null);
      setErrors((prevErrors) => ({ ...prevErrors, username: true }));
      target.classList.add('invalid');
    }
  }

  function validatePassword(target) {
    // Check for password that contains 8 characters, 1 number, 1 upper and 1 lower
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (target.value !== '' && re.test(target.value)) {
      setPassword(target.value);
      setErrors((prevErrors) => ({ ...prevErrors, password: false }));
      target.classList.remove('invalid');
    } else {
      setPassword(null);
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      target.classList.add('invalid');
    }
  }

  function validateCaptcha(event) {
    const gResponse = event;
    if (gResponse) {
      setErrors((prevErrors) => ({ ...prevErrors, recaptcha: false }));
      setGResponse(event);
    } else {
      setErrorStateMessage({
        state: true,
        message:
          'ReCAPTCHA submission invalid. Please try again or reload the page.',
      });
    }
  }

  async function loginHandler(e) {
    console.log('Validating...');
    let errorPresent = false;
    for (const error in errors) {
      if (errors[error] === true) {
        errorPresent = true;
        break;
      }
    }

    if (errorPresent) {
      console.log('Invalid form.');
      if (errors.username) {
        setErrorStateMessage({
          state: true,
          message: 'The username contains invalid characters.',
        });
      } else if (errors.password) {
        setErrorStateMessage({
          state: true,
          message: 'The password entered does not meet security requirements.',
        });
      } else if (errors.recaptcha) {
        setErrorStateMessage({
          state: true,
          message: 'Please complete the ReCAPTCHA before continuing.',
        });
      }
    } else {
      try {
        const header = {
          headers: {
            'Content-type': 'application/json',
            'g-response': gResponse,
          },
        };
        const payload = {
          username: username,
          password: password,
        };

        setIsLoading(true);

        const response = await http.post('api/v1/user/login', payload, header);

        localStorage.setItem('user', JSON.stringify(response.data));
        authUser();

        setIsLoading(false);
        navigate('/dashboard');
      } catch (e) {
        setErrorStateMessage({ state: true, message: e.response.data.error });
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="react-container">
      <div className="content login">
        <div className="titles">
          <h2>CAFE MADDY CAB</h2>
        </div>

        {errorStateMessage.state ? (
          <div className="error">
            {errorStateMessage.message
              ? errorStateMessage.message
              : 'Not all the information has been filled out correctly.'}
          </div>
        ) : (
          ''
        )}

        <div className="request-form login">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => validateUsername(e.target)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => validatePassword(e.target)}
          ></input>
        </div>

        <div className="recaptcha-react">
          <ReCAPTCHA
            sitekey="6Le78D0fAAAAAGCFMp-jkHsx_fOlK4nmOMdcd6_5"
            onChange={(e) => validateCaptcha(e)}
          />
        </div>

        <div className="btn login" onClick={(e) => loginHandler(e.target)}>
          Login
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default Login;
