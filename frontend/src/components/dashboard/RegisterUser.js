import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../dashboard/Navbar';
import AuthContext from '../../utils/auth.context';
import { useContext } from 'react';
import UserAPI from '../../utils/user.api';

function RegisterUser() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [commonName, setCommonName] = useState(null);
  const [role, setRole] = useState('approver');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });
  const [errors, setErrors] = useState({
    username: true,
    password: true,
    commonName: true,
  });
  const [successMessage, setSuccessMessage] = useState(false);

  function validateUsername(target) {
    const re =
      /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
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

  function validateCommonName(target) {
    const re =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (target.value !== '' && re.test(target.value)) {
      setCommonName(target.value);
      setErrors((prevErrors) => ({ ...prevErrors, commonName: false }));
      target.classList.remove('invalid');
    } else {
      setCommonName(null);
      setErrors((prevErrors) => ({ ...prevErrors, commonName: true }));
      target.classList.add('invalid');
    }
  }

  function updateRole(target) {
    if (target.value === 'approver') {
      setRole('approver');
    } else {
      setRole('admin');
    }
  }

  function registerHandler() {
    setSuccessMessage(false);

    let errorPresent = false;
    for (const error in errors) {
      if (errors[error] === true) {
        errorPresent = true;
        break;
      }
    }

    if (errorPresent) {
      if (errors.username) {
        setErrorOnSubmit({
          state: true,
          message:
            'You need to provide a valid username. This cannot include special characters.',
        });
      } else if (errors.password) {
        setErrorOnSubmit({
          state: true,
          message: 'The password does not meet the minimum requirements.',
        });
      } else if (errors.commonName) {
        setErrorOnSubmit({
          state: true,
          message:
            'The common name is not valid. No special characters or numbers allowed.',
        });
      }
    } else {
      setErrorOnSubmit({ state: false, message: null });

      UserAPI.registerUser(
        username,
        password,
        commonName,
        role,
        user.user.token
      ).then((response) => {
        var { error } = response;
        if (error) {
          setErrorOnSubmit({ state: true, message: error });
        } else {
          setSuccessMessage(true);
        }
      });
    }
  }

  // Navigate away if not admin
  useEffect(() => {
    if (user.user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user.user]);

  return (
    <div className="react-container">
      <div className="backend content">
        <Navbar />

        <div className="settings-content">
          <p className="info">
            Use this page to register new accounts for onboarding ops
            volunteers. Admin users have the ability to download CSV files, mark
            rides as done with codes and make user accounts. The approver role
            is for approving rides only. Note that the password must include{' '}
            <span>
              1 uppercase character, 1 lowercase character, 1 number and be at
              least 8 digits long
            </span>
            .
          </p>

          {successMessage ? (
            <div className="success-msg">User account successfully made.</div>
          ) : (
            ''
          )}

          {errorOnSubmit.state ? (
            <div className="error">
              {errorOnSubmit.message
                ? errorOnSubmit.message
                : 'An unknown error occurred.'}
            </div>
          ) : (
            ''
          )}

          <div className="input-row">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              onChange={(e) => validateUsername(e.target)}
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => validatePassword(e.target)}
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="common-name">Common name:</label>
            <input
              type="text"
              id="common-name"
              onChange={(e) => validateCommonName(e.target)}
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="role">Role:</label>
            <select id="role" onChange={(e) => updateRole(e.target)}>
              <option value="approver" id="role-1">
                Approver
              </option>
              <option value="admin" id="role-2">
                Admin
              </option>
            </select>
          </div>

          <div className="save-changes-btn" onClick={() => registerHandler()}>
            Register user
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
