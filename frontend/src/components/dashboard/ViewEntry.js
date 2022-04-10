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
          <ul id="first-child">
            <li>
              <div className="description">ID:</div>
              <div className="value">{rideDetails.userId}</div>
            </li>
            <li>
              <div className="description">First name:</div>
              <div className="value">{rideDetails.firstName}</div>
            </li>
            <li>
              <div className="description">Last name:</div>
              <div className="value">{rideDetails.lastName}</div>
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
              <div className="value">{rideDetails.email}</div>
            </li>
            <li>
              <div className="description">Identity:</div>
              <div className="value">
                {rideDetails.identity
                  ? rideDetails.identity.text
                  : 'Loading...'}
              </div>
            </li>
            <li>
              <div className="description">Low income:</div>
              <div className="value">{rideDetails.income ? 'yes' : 'no'}</div>
            </li>
            <li>
              <div className="description">Ride purpose:</div>
              <div className="value">
                {rideDetails.purpose ? rideDetails.purpose.text : 'Loading...'}
              </div>
            </li>
          </ul>
          <ul id="last-child">
            <li>
              <div className="description">Status:</div>
              <div className="value">{rideDetails.status}</div>
            </li>
            <li>
              <div className="description">Approved by:</div>
              <div className="value">
                {rideDetails.approver ? rideDetails.approver : 'N/A'}
              </div>
            </li>
            <li>
              <div className="description">Ride coupon:</div>
              <div className="value">
                {rideDetails.coupon ? rideDetails.coupon : 'N/A'}
              </div>
            </li>
            <li className="photo-comparison">
              <div className="description">Photo comparison:</div>
              <div className="photo-container">
                <div className="photo-box">
                  <div className="title">Selfie</div>
                  <img
                    src={
                      rideDetails.selfie
                        ? rideDetails.selfie.webContentLink
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
                        ? rideDetails.photoId.webContentLink
                        : '/'
                    }
                    alt="loading..."
                  />
                </div>
              </div>
            </li>
            <li id="notes">
              <div className="value">
                {rideDetails.notes ? rideDetails.notes : 'Write notes here...'}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewEntry;
