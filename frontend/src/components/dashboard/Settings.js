import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../utils/auth.context';
import UserAPI from '../../utils/user.api';

import Navbar from './Navbar';

function Settings() {
  const { user } = useContext(AuthContext);

  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });
  const [errors, setErrors] = useState({
    currentPass: true,
    newPass: true,
    confirmNewPass: true,
  });

  const [username, setUsername] = useState(null);
  const [currentPass, setCurrentPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [confirmNewPass, setConfirmNewPass] = useState(null);

  const [successMessage, setSuccessMessage] = useState(false);

  function validatePass(target, type) {
    // Check for password that contains 8 characters, 1 number, 1 upper and 1 lower
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (target.value !== '' && re.test(target.value)) {
      switch (type) {
        case 'current':
          setCurrentPass(target.value);
          setErrors((prevErrors) => ({ ...prevErrors, currentPass: false }));
          break;
        case 'new':
          setNewPass(target.value);
          setErrors((prevErrors) => ({ ...prevErrors, newPass: false }));
          break;
        case 'confirm':
          setConfirmNewPass(target.value);
          setErrors((prevErrors) => ({ ...prevErrors, confirmNewPass: false }));
          break;
        // no default
      }
      target.classList.remove('invalid');
    } else {
      switch (type) {
        case 'current':
          setCurrentPass(null);
          setErrors((prevErrors) => ({ ...prevErrors, currentPass: true }));
          break;
        case 'new':
          setNewPass(null);
          setErrors((prevErrors) => ({ ...prevErrors, newPass: true }));
          break;
        case 'confirm':
          setConfirmNewPass(null);
          setErrors((prevErrors) => ({ ...prevErrors, confirmNewPass: true }));
          break;
        // no default
      }
      target.classList.add('invalid');
    }
  }

  function saveHandler() {
    let errorPresent = false;
    for (const error in errors) {
      if (errors[error] === true) {
        errorPresent = true;
        break;
      }
    }

    if (errorPresent) {
      // Display error message
      if (errors.currentPass) {
        setErrorOnSubmit({
          state: true,
          message: 'You need to provide your old password in a valid format.',
        });
      } else if (errors.newPass) {
        setErrorOnSubmit({
          state: true,
          message: 'Your new password is not valid.',
        });
      } else if (errors.confirmNewPass) {
        setErrorOnSubmit({
          state: true,
          message: 'Your confirmed new password is not valid.',
        });
      }
    } else {
      // Check to make sure new and confirm password match
      if (newPass === confirmNewPass) {
        // Save changes
        setErrorOnSubmit({ state: false, message: null });

        UserAPI.changePassword(currentPass, newPass, user.user).then(
          (response) => {
            var { error } = response;
            if (error) {
              setErrorOnSubmit({ state: true, message: error });
            } else {
              setSuccessMessage(true);
            }
          }
        );
      } else {
        // Not a good match
        setErrorOnSubmit({
          state: true,
          message: 'Your new passwords do not match!',
        });
      }
    }
  }

  useEffect(() => {
    // Set username field
    UserAPI.getName(user.user).then((response) => {
      setUsername(response.username);
    });
  }, [user.user]);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        <div className="settings-content">
          <p className="info">
            Use this page to change your password. Note that new passwords must
            contain{' '}
            <span>
              one lowercase letter, one uppercase letter and one number
            </span>
            . No special characters or symbols are allowed. If you need
            modifications to your username or common name (name visible in ride
            edits), get in touch with Jake, Virginia or Hikari.
          </p>

          {successMessage ? (
            <div className="success">
              Your password has been changed successfully.
            </div>
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
              defaultValue={username ? username : ''}
              key={username ? username : ''}
              disabled
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="common-name">Common name:</label>
            <input
              type="text"
              id="common-name"
              defaultValue={user.user.commonName}
              disabled
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              defaultValue={user.user.role}
              disabled
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="currentPass">Current password:</label>
            <input
              type="password"
              id="currentPass"
              placeholder="Current password"
              onChange={(e) => validatePass(e.target, 'current')}
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="newPass">New password:</label>
            <input
              type="password"
              id="newPass"
              placeholder="New password"
              onChange={(e) => validatePass(e.target, 'new')}
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="confirmPass">Confirm new password:</label>
            <input
              type="password"
              id="confirmPass"
              placeholder="Type new again"
              onChange={(e) => validatePass(e.target, 'confirm')}
            ></input>
          </div>
          <div className="save-changes-btn" onClick={() => saveHandler()}>
            Save changes
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
