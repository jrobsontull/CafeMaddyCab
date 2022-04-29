import { useContext, useEffect } from 'react';
import AuthContext from '../../utils/auth.context';

import Navbar from './Navbar';

function Settings() {
  const { user } = useContext(AuthContext);

  function saveHandler() {}

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        <div className="settings-content">
          <p className="info">
            Use this page to change your password. If you need modifications to
            your username or common name (name visible in ride edits), get in
            touch with Jake, Virginia or Hikari.
          </p>
          <div className="input-row">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" disabled></input>
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
            <input type="text" id="role" disabled></input>
          </div>
          <div className="input-row">
            <label htmlFor="currentPass">Current password:</label>
            <input
              type="password"
              id="currentPass"
              placeholder="Current password"
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="newPass">New password:</label>
            <input
              type="password"
              id="newPass"
              placeholder="New password"
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="confirmPass">Confirm new password:</label>
            <input
              type="password"
              id="confirmPass"
              placeholder="Type new again"
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
