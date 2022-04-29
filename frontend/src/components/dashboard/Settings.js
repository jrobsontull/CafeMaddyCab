import Navbar from './Navbar';

function Settings() {
  function saveHandler() {}

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        <div className="settings-content">
          <div className="input-row">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username"></input>
          </div>
          <div className="input-row">
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" disabled></input>
          </div>
          <div className="input-row">
            <label htmlFor="currentPass">Current password:</label>
            <input type="password" id="currentPass"></input>
          </div>
          <div className="input-row">
            <label htmlFor="newPass">New password:</label>
            <input type="password" id="newPass"></input>
          </div>
          <div className="input-row">
            <label htmlFor="confirmPass">Confirm new password:</label>
            <input type="password" id="confirmPass"></input>
          </div>
          <div className="change-password-btn" onClick={() => saveHandler()}>
            Change password
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
