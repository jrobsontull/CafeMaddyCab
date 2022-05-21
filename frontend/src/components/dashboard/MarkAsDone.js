import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RidesAPI from '../../utils/rides.api';
import AuthContext from '../../utils/auth.context';

import Arrow from '../../assets/img/arrow_right.svg';
import Spinner from '../general/Spinner';

function MarkAsDone({ onClose }) {
  const { user } = useContext(AuthContext);
  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });
  const [csvFile, setCsvFile] = useState({ file: null });

  const [successMessage, setSuccessMessage] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  function selectFile(target) {
    const file = target.files[0];

    /* Validate file type and size */
    const dotIndx = file.name.lastIndexOf('.') + 1;
    const ext = file.name.substring(dotIndx, file.name.length).toLowerCase();

    if (ext === 'csv') {
      setCsvFile({ file: file });
    } else {
      setErrorOnSubmit({
        state: true,
        message: 'You can only upload CSV files.',
      });
    }
  }

  function submitHandler() {
    setShowSpinner(true);
    if (csvFile.file) {
      // All good
      setSuccessMessage(false);
      setErrorOnSubmit({ state: false, message: null });
      RidesAPI.markAsDone(csvFile.file, user.user.token).then((response) => {
        setShowSpinner(false);
        var { error } = response;
        if (error) {
          setErrorOnSubmit({ state: true, message: error });
        } else {
          setSuccessMessage(true);
        }
      });
    } else {
      setErrorOnSubmit({
        state: true,
        message: 'You need to select a CSV file for upload first.',
      });
    }
  }

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window done">
        {showSpinner ? <Spinner /> : ''}
        <div className="header">
          <div className="title">
            <div className="back-btn" onClick={onClose}>
              <img className="nav-arrow" src={Arrow} alt="arrow" />
            </div>
            <p>Send Codes</p>
          </div>
        </div>
        <div className="entry-content">
          {errorOnSubmit.state ? (
            <div className="error">
              {errorOnSubmit.message
                ? errorOnSubmit.message
                : 'An unknown error occurred.'}
            </div>
          ) : (
            ''
          )}

          {successMessage ? (
            <div className="success-msg">
              These rides have been successfully marked as done.
            </div>
          ) : (
            ''
          )}
          <p>
            This window can be used for uploading a CSV (comma-deliminated)
            containing <strong>_id</strong> and <strong>coupon</strong> columns.
            Once uploaded, the ride rows with an attached coupon will be marked
            witht he &apos;Done&apos; status and the coupon assigned to the ride
            entry.
          </p>
          <div className="upload">
            <input
              type="text"
              disabled
              className="upload-location"
              value={csvFile.file ? csvFile.file.name : 'No file selected'}
            ></input>
            <input
              type="file"
              id="csv"
              className="input-file"
              accept=".csv"
              onChange={(e) => selectFile(e.target)}
            ></input>
            <label htmlFor="csv">Upload CSV</label>
          </div>
          <p>
            You can now press this button to save the changes to the database.
          </p>
          <div className="submit-btn" onClick={() => submitHandler()}>
            Mark rides as done
          </div>
        </div>
      </div>
    </div>
  );
}

MarkAsDone.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MarkAsDone;
