import { useEffect, useState, useContext } from 'react';
import RidesAPI from '../../utils/rides.api';
import AuthContext from '../../utils/auth.context';

import Arrow from '../../assets/img/arrow_right.svg';

function ViewEntry({ rideId, onClose }) {
  const { user } = useContext(AuthContext);
  const [rideDetails, setRideDetails] = useState({});

  function updateGenericField(target, prop) {
    setRideDetails((prevDetails) => ({ ...prevDetails, [prop]: target.value }));
  }

  function updateIdentity(target) {
    let newIdentity = {};

    switch (parseInt(target.value)) {
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
    }

    setRideDetails((prevDetails) => ({
      ...prevDetails,
      identity: newIdentity,
    }));
  }

  function updateStatus(target) {
    let newStatus = {};

    switch (parseInt(target.value)) {
      case 1:
        newStatus = { value: 1, text: 'New' };
        break;
      case 2:
        newStatus = { value: 2, text: 'In progress' };
        break;
      case 3:
        newStatus = { value: 3, text: 'Approved' };
        break;
      case 4:
        newStatus = { value: 4, text: 'Rejected' };
        break;
      case 5:
        newStatus = { value: 5, text: 'Unsure' };
        break;
      case 6:
        newStatus = { value: 6, text: 'Done' };
        break;
    }

    setRideDetails((prevDetails) => ({
      ...prevDetails,
      status: newStatus,
    }));
  }

  function saveChanges() {
    const updatedRide = rideDetails;
    updatedRide.lastEditedBy = user.user.username;

    RidesAPI.editRideById(updatedRide).then(() => {
      onClose();
    });
  }

  useEffect(() => {
    RidesAPI.getRideById(rideId).then((response) => {
      setRideDetails(response.ride);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window">
        <div className="header">
          <div className="title">
            <div className="back-btn" onClick={onClose}>
              <img className="nav-arrow" src={Arrow} alt="arrow" />
            </div>

            <p>Ride Request: John Doe ({rideDetails.userId})</p>
          </div>
          <div className="save-changes-btn" onClick={() => saveChanges()}>
            Save changes
          </div>
        </div>
        <div className="entry-content">
          <div className="entry-content-columns">
            <ul id="first-child">
              <li>
                <div className="description">ID:</div>
                <div className="value">{rideDetails.userId}</div>
              </li>
              <li>
                <div className="description">First name:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.firstName}
                  onChange={(e) => updateGenericField(e.target, 'firstName')}
                ></input>
              </li>
              <li>
                <div className="description">Last name:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.lastName}
                  onChange={(e) => updateGenericField(e.target, 'lastName')}
                ></input>
              </li>
              <li>
                <div className="description">Date submitted:</div>
                <div className="value">
                  {new Date(rideDetails.dateRequested).toLocaleDateString(
                    'en-us'
                  )}
                </div>
              </li>
              <li>
                <div className="description">Email:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.email}
                  onChange={(e) => updateGenericField(e.target, 'email')}
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
                  <option value="3">Accepted</option>
                  <option value="4">Rejected</option>
                  <option value="5">Unsure</option>
                  <option value="6">Done</option>
                </select>
              </li>
              <li>
                <div className="description">Approved by:</div>
                <div className="value">
                  {rideDetails.approver ? rideDetails.approver : 'N/A'}
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
                  defaultValue={rideDetails.coupon ? rideDetails.coupon : 'N/A'}
                  onChange={(e) => updateGenericField(e.target, 'coupon')}
                ></input>
              </li>
              <li className="photo-comparison">
                <div className="description">Photo comparison:</div>
                <div className="photo-container">
                  <div className="photo-box">
                    <div className="title">Selfie</div>
                    <img
                      src={
                        rideDetails.selfie
                          ? rideDetails.selfie.altMediaView
                          : '/'
                      }
                      alt="loading..."
                    />
                  </div>
                  <div className="photo-box" id="photo-id">
                    <div className="title">Photo ID</div>
                    <img
                      src={
                        rideDetails.photoId
                          ? rideDetails.photoId.altMediaView
                          : '/'
                      }
                      alt="loading..."
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <textarea
            className="notes"
            placeholder={
              rideDetails.notes ? rideDetails.notes : 'Write notes here...'
            }
            defaultValue={rideDetails.notes ? rideDetails.notes : ''}
            onChange={(e) => updateGenericField(e.target, 'notes')}
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default ViewEntry;
