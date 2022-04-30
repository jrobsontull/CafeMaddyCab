import { useState, useContext } from 'react';
import { saveAs } from 'file-saver';
import RidesAPI from '../../utils/rides.api';
import AuthContext from '../../utils/auth.context';
import PropTypes from 'prop-types';

import Arrow from '../../assets/img/arrow_right.svg';

function SendCodes({ onClose }) {
  const { user } = useContext(AuthContext);
  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });

  const [useDates, setUseDates] = useState(false);
  const [fromDate, setFromDate] = useState(getClosestMon());
  const [toDate, setToDate] = useState(getTodayDate());

  // Calculate closest Monday from current date
  function getClosestMon() {
    const nycCurrentDate = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    );
    const subIndex = nycCurrentDate.getDay() - 1;
    let closestMon = new Date();
    closestMon.setDate(nycCurrentDate.getDate() - subIndex);

    // Formatting for picker
    let dateArr = closestMon.toLocaleDateString('en-UK').split('/');
    dateArr = dateArr.reverse();
    return dateArr.join('-');
  }

  // Get today's date in date input format
  function getTodayDate() {
    const nowDate = new Date();
    // Formatting for picker
    let dateArr = nowDate.toLocaleDateString('en-UK').split('/');
    dateArr = dateArr.reverse();
    return dateArr.join('-');
  }

  // Download CSV btn handler
  function downloadCSV() {
    if (useDates) {
      RidesAPI.sendCodes(fromDate, toDate, user.user.token).then((response) => {
        var { error } = response;
        if (error) {
          setErrorOnSubmit({
            state: true,
            message: error,
          });
        } else {
          // All good
          var blob = new Blob([response], { type: 'text/csv;charset=utf-8;' });

          const downloadFileName =
            fromDate.split('-').join('') +
            '-' +
            toDate.split('-').join('') +
            '_rides.csv';

          saveAs(blob, downloadFileName);
        }
      });
    } else {
      RidesAPI.sendCodes(null, null, user.user.token).then((response) => {
        var { error } = response;
        if (error) {
          setErrorOnSubmit({
            state: true,
            message: error,
          });
        } else {
          // All good
          var blob = new Blob([response], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'all_approved_rides.csv');
        }
      });
    }
  }

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window send-codes">
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
          <p>
            This window can be used for downloading a list of approved rides at
            the end of the week. All rides currently marked as approved will be
            downloaded as a CSV file.
          </p>
          <p>
            Alternatively, you can specify a date range of approved rides to
            download.
          </p>
          <p>
            The output will contain Ride ID, First Name, Last Name and Coupon
            columns. The coupon column will be blank and needs to be filled in
            manually. Once this is done, you can upload this file to mark rides
            as done with the <strong>Mark as done</strong> button.
          </p>
          <div className="actions">
            <div className="options">
              <div className="use-date-check">
                <input
                  type="checkbox"
                  id="check-date"
                  onChange={() => setUseDates(!useDates)}
                ></input>
                <label htmlFor="check-date">Specify date for download</label>
              </div>
              <div className="date">
                <div className="picker">
                  <label htmlFor="from-date">From date:</label>
                  {useDates ? (
                    <input
                      type="date"
                      id="from-date"
                      defaultValue={getClosestMon()}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  ) : (
                    <input
                      type="date"
                      id="from-date"
                      defaultValue={getClosestMon()}
                      onChange={(e) => setFromDate(e.target.value)}
                      disabled
                    />
                  )}
                </div>
                <div className="picker">
                  <label htmlFor="to-date">To date:</label>
                  {useDates ? (
                    <input
                      type="date"
                      id="to-date"
                      defaultValue={getTodayDate()}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  ) : (
                    <input
                      type="date"
                      id="to-date"
                      defaultValue={getTodayDate()}
                      onChange={(e) => setToDate(e.target.value)}
                      disabled
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="download-btn" onClick={() => downloadCSV()}>
              Download CSV
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SendCodes.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SendCodes;
