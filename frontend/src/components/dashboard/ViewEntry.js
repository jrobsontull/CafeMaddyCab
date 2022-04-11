import { useEffect, useState } from 'react';
import RidesAPI from '../../utils/rides.api';

import Arrow from '../../assets/img/arrow_right.svg';

function ViewEntry({ rideId, onClose }) {
  const [rideDetails, setRideDetails] = useState({});

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
          <div className="save-changes-btn">Save changes</div>
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
                ></input>
              </li>
              <li>
                <div className="description">Last name:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.lastName}
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
                ></input>
              </li>
              <li>
                <div className="description">Identity:</div>
                <select
                  defaultValue={
                    rideDetails.identity
                      ? rideDetails.identity.text
                      : 'Loading...'
                  }
                  key={rideDetails.identity}
                >
                  <option id="identity-1">Asian female</option>
                  <option id="identity-2">Asian LGBTQ+</option>
                  <option id="identity-3">Asian elderly person</option>
                  <option id="identity-4">
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
                  defaultValue={rideDetails.status}
                >
                  <option>New</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                  <option>Unsure</option>
                  <option>Done</option>
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
                <div className="value">{'N/A'}</div>
              </li>
              <li>
                <div className="description">Ride coupon:</div>
                <input
                  className="value"
                  defaultValue={rideDetails.coupon ? rideDetails.coupon : 'N/A'}
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
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default ViewEntry;
