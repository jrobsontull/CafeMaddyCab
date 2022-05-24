import { useEffect, useState, useContext } from 'react';
import RidesAPI from '../../utils/rides.api';
import AuthContext from '../../utils/auth.context';
import PropTypes from 'prop-types';
import Spinner from '../general/Spinner';

import Arrow from '../../assets/img/arrow_right.svg';
import MissingPhoto from '../../assets/img/missing_photo_icon.svg';

function ViewEntry({ rideId, onClose }) {
  const { user } = useContext(AuthContext);
  const [rideDetails, setRideDetails] = useState({});
  const [selfie, setSelfie] = useState('/');
  const [photoId, setPhotoId] = useState('/');

  let baseImgUrl = 'http://localhost:8080/api/v1/image/';
  if (process.env.NODE_ENV === 'production') {
    baseImgUrl = 'https://cafemaddycab.org:443/api/v1/image/';
  }

  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });
  const [showSpinner, setShowSpinner] = useState(false);

  function updateGenericField(target, prop) {
    setRideDetails((prevDetails) => ({ ...prevDetails, [prop]: target.value }));
  }

  function updateIdentity(target) {
    let newIdentity = {};

    switch (parseInt(target.value, 10)) {
      case 1:
        newIdentity = { value: 1, text: 'Asian female' };
        break;
      case 2:
        newIdentity = { value: 2, text: 'Asian LGBTQ+' };
        break;
      case 3:
        newIdentity = { value: 3, text: 'Asian elderly person' };
        break;
      case 4:
        newIdentity = {
          value: 4,
          text: 'I am submitting on behalf of an Asian Elderly person',
        };
        break;
      // no default
    }

    setRideDetails((prevDetails) => ({
      ...prevDetails,
      identity: newIdentity,
    }));
  }

  function updateStatus(target) {
    let newStatus = {};
    let setApprover = false;

    switch (parseInt(target.value)) {
      case 1:
        newStatus = { value: 1, text: 'New' };
        setApprover = false;
        break;
      case 2:
        newStatus = { value: 2, text: 'In progress' };
        setApprover = true;
        break;
      case 3:
        newStatus = { value: 3, text: 'Approved' };
        setApprover = false;
        break;
      case 4:
        newStatus = { value: 4, text: 'Rejected' };
        setApprover = false;
        break;
      case 5:
        newStatus = { value: 5, text: 'Unsure' };
        setApprover = false;
        break;
      case 6:
        newStatus = { value: 6, text: 'Done' };
        setApprover = false;
        break;
      // no default
    }

    if (setApprover) {
      setRideDetails((prevDetails) => ({
        ...prevDetails,
        status: newStatus,
        approver: { commonName: user.user.commonName, id: user.user._id },
      }));
    } else {
      setRideDetails((prevDetails) => ({
        ...prevDetails,
        status: newStatus,
      }));
    }
  }

  function updateNotes(target) {
    const note = target.value;
    if (note.length > 1000) {
      target.classList.add('invalid');
      setErrorOnSubmit({
        state: true,
        message:
          'Too many characters in the notes field! Our limit is 1000 characters.',
      });
    } else {
      setRideDetails((prevDetails) => ({ ...prevDetails, notes: note }));
      setErrorOnSubmit({ state: false, message: null });
      target.classList.remove('invalid');
    }
  }

  function saveChanges() {
    const updatedRide = rideDetails;
    updatedRide.lastEditedBy = user.user.commonName;

    setShowSpinner(true);
    RidesAPI.editRideById(updatedRide, user.user.token).then((response) => {
      setShowSpinner(false);
      var { error } = response;
      if (error) {
        alert(error);
      } else {
        // Everything was all good
        onClose();
      }
    });
  }

  useEffect(() => {
    setShowSpinner(true);
    RidesAPI.getRideById(rideId, user.user.token).then((response) => {
      setShowSpinner(false);
      var { error } = response;
      if (error) {
        alert(error);
      } else {
        // Everything was all good
        setRideDetails(response.ride);
        setSelfie({
          url: baseImgUrl + response.ride.selfie.path,
          exists: response.ride.selfie.exists,
        });
        setPhotoId({
          url: baseImgUrl + response.ride.photoId.path,
          exists: response.ride.photoId.exists,
        });
      }
    });
  }, [rideId, user.user.token, baseImgUrl]);

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window">
        {showSpinner ? <Spinner /> : ''}
        <div className="header">
          <div className="title">
            <div className="back-btn" onClick={onClose}>
              <img className="nav-arrow" src={Arrow} alt="arrow" />
            </div>
            <p>
              Ride Request: {rideDetails.firstName} {rideDetails.lastName} (
              {rideDetails.shortId})
            </p>
          </div>
          <div className="save-changes-btn" onClick={() => saveChanges()}>
            Save changes
          </div>
        </div>
        <div className="entry-content">
          {rideDetails.isDuplicate ? (
            <div className="error">
              This ride is a possible duplicate. Use the search function to find
              the duplicate or click the duplicates filter in the left-hand
              column of the dashboard.
            </div>
          ) : (
            ''
          )}
          {errorOnSubmit.state ? (
            <div className="error">{errorOnSubmit.message}</div>
          ) : (
            ''
          )}
          <div className="entry-content-columns">
            <ul id="first-child">
              <li>
                <div className="description">ID:</div>
                <div className="value">{rideDetails.shortId}</div>
              </li>
              <li>
                <div className="description">First name:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.firstName}
                  onChange={(e) => updateGenericField(e.target, 'firstName')}
                  placeholder="First name"
                ></input>
              </li>
              <li>
                <div className="description">Last name:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.lastName}
                  onChange={(e) => updateGenericField(e.target, 'lastName')}
                  placeholder="Last name"
                ></input>
              </li>
              <li>
                <div className="description">Date submitted:</div>
                <div className="value">
                  {new Date(rideDetails.dateRequested).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    month: '2-digit',
                    day: '2-digit',
                    year: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
              </li>
              <li>
                <div className="description">Email:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.email}
                  onChange={(e) => updateGenericField(e.target, 'email')}
                  placeholder="Email"
                ></input>
              </li>
              <li>
                <div className="description">Identity:</div>
                <select
                  defaultValue={
                    rideDetails.identity
                      ? rideDetails.identity.value
                      : 'Loading...'
                  }
                  key={rideDetails.identity}
                  onChange={(e) => updateIdentity(e.target)}
                >
                  <option value="1" id="identity-1">
                    Asian female
                  </option>
                  <option value="2" id="identity-2">
                    Asian LGBTQ+
                  </option>
                  <option value="3" id="identity-3">
                    Asian elderly person
                  </option>
                  <option value="4" id="identity-4">
                    I am submitting on behalf of an Asian Elderly person
                  </option>
                </select>
              </li>
              <li>
                <div className="description">Low income:</div>
                <div className="value">{rideDetails.income ? 'Yes' : 'No'}</div>
              </li>
              <li>
                <div className="description">Ride purpose:</div>
                <div className="value">
                  {rideDetails.purpose
                    ? rideDetails.purpose.text
                    : 'Loading...'}
                </div>
              </li>
            </ul>
            <ul id="last-child">
              <li>
                <div className="description">Status:</div>
                <select
                  className="status-dropdown"
                  defaultValue={
                    rideDetails.status ? rideDetails.status.value : 'Loading...'
                  }
                  key={rideDetails.status}
                  onChange={(e) => updateStatus(e.target)}
                >
                  <option value="1">New</option>
                  <option value="2">In progress</option>
                  <option value="3">Approved</option>
                  <option value="4">Rejected</option>
                  <option value="5">Unsure</option>
                  <option value="6">Done</option>
                </select>
              </li>
              <li>
                <div className="description">Approved by:</div>
                <div className="value">
                  {rideDetails.approver
                    ? rideDetails.approver.commonName
                    : 'N/A'}
                </div>
              </li>
              <li>
                <div className="description">Last edited by:</div>
                <div className="value">
                  {rideDetails.lastEditedBy ? rideDetails.lastEditedBy : 'N/A'}
                </div>
              </li>
              <li>
                <div className="description">Ride coupon:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.coupon}
                  onChange={(e) => updateGenericField(e.target, 'coupon')}
                  placeholder="N/A"
                ></input>
              </li>
              <li className="photo-comparison">
                <div className="description">Photo comparison:</div>
                <div className="photo-container">
                  <div className="photo-box">
                    <div className="title">Selfie</div>
                    {selfie.exists ? (
                      <img src={selfie.url} alt="loading..." />
                    ) : (
                      <img
                        src={MissingPhoto}
                        className="missing-photo"
                        alt="N/A"
                      />
                    )}
                  </div>
                  <div className="photo-box" id="photo-id">
                    <div className="title">Photo ID</div>
                    {photoId.exists ? (
                      <img src={photoId.url} alt="loading..." />
                    ) : (
                      <img
                        src={MissingPhoto}
                        className="missing-photo"
                        alt="N/A"
                      />
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <textarea
            className="notes"
            placeholder="Write notes here..."
            defaultValue={rideDetails.notes ? rideDetails.notes : ''}
            onChange={(e) => updateNotes(e.target)}
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

ViewEntry.propTypes = {
  rideId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewEntry;
