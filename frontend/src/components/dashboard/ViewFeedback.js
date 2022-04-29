import { useEffect, useState, useContext } from 'react';
import RidesAPI from '../../utils/rides.api';
import AuthContext from '../../utils/auth.context';
import PropTypes from 'prop-types';

import Arrow from '../../assets/img/arrow_right.svg';

function ViewFeedback({ rideId, onClose, feedbackText }) {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    RidesAPI.getRideById(rideId, user.user.token).then((response) => {
      if (response) {
        setUserDetails(response.ride);
      } else {
        // when a ride cannot be found using rideId
        setUserDetails(null);
      }
    });
  }, [rideId, user.user.token]);

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window">
        <div className="header">
          <div className="title">
            <div className="back-btn" onClick={onClose}>
              <img className="nav-arrow" src={Arrow} alt="arrow" />
            </div>

            <p>Feedback Details</p>
          </div>
        </div>
        <div className="entry-content">
          <div className="entry-content-columns">
            <ul id="first-child">
              <li>
                <div className="description">Ride ID:</div>
                <div className="value">
                  {userDetails ? userDetails.shortId : 'N/A'}
                </div>
              </li>
              <li>
                <div className="description">Email:</div>
                <div className="value">
                  {userDetails ? userDetails.email : 'N/A'}
                </div>
              </li>
            </ul>
            <ul id="last-child">
              <li>
                <div className="description">First Name:</div>
                <div className="value">
                  {userDetails ? userDetails.firstName : 'N/A'}
                </div>
              </li>
              <li>
                <div className="description">Last Name:</div>
                <div className="value">
                  {userDetails ? userDetails.lastName : 'N/A'}
                </div>
              </li>
            </ul>
          </div>
          <div className="feedback-text">{feedbackText}</div>
        </div>
      </div>
    </div>
  );
}

ViewFeedback.propTypes = {
  rideId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  feedbackText: PropTypes.string.isRequired,
};

export default ViewFeedback;
