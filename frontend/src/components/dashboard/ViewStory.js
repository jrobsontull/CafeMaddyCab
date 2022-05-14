import { useEffect, useState, useContext } from 'react';
import RidesAPI from '../../utils/rides.api';
import StoriesAPI from '../../utils/stories.api';
import AuthContext from '../../utils/auth.context';
import PropTypes from 'prop-types';

import Arrow from '../../assets/img/arrow_right.svg';

function ViewStory({ entry, onClose }) {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const [storyDetails, setStoryDetails] = useState({});
  const [selectedBookmark, setSelectedBookmark] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });

  function updateBookmark(target) {
    let newValue = false;
    if (target && typeof target.value === 'string') {
      if (target.value.toLowerCase() === 'true') {
        newValue = true;
      }
    }
    setSelectedBookmark(newValue);
  }

  function saveChanges() {
    console.log(storyDetails);
    if (selectedBookmark !== storyDetails.bookmark) {
      setErrorOnSubmit({ state: false, message: null });
      const updatedStory = storyDetails;
      updatedStory.bookmark = selectedBookmark;
      // call api edit story call
      StoriesAPI.editStoryById(updatedStory, user.user.token).then(
        (response) => {
          var { error } = response;
          if (error) {
            alert(error);
          } else {
            // Everything was all good
            onClose();
          }
        }
      );
    } else {
      // no changes were made
      setErrorOnSubmit({
        state: true,
        message: 'No changes were made',
      });
    }
  }

  useEffect(() => {
    setStoryDetails(entry);
    RidesAPI.getRideById(entry.rideId, user.user.token).then((response) => {
      if (response) {
        setUserDetails(response.ride);
      } else {
        // when a ride cannot be found using rideId
        setUserDetails(null);
      }
    });
  }, [storyDetails.rideId, user.user.token]);

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window">
        <div className="header">
          <div className="title">
            <div className="back-btn" onClick={onClose}>
              <img className="nav-arrow" src={Arrow} alt="arrow" />
            </div>

            <p>Story Details</p>
          </div>
          <div className="save-changes-btn" onClick={() => saveChanges()}>
            Save Changes
          </div>
        </div>
        <div className="entry-content">
          {errorOnSubmit.state ? (
            <div className="error">{errorOnSubmit.message}</div>
          ) : (
            ''
          )}
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
              <li>
                <div className="description">Share:</div>
                <div className="value">{storyDetails.share ? 'Yes' : 'No'}</div>
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
              <li>
                <div className="description">Bookmarked:</div>
                <select
                  className="status-dropdown"
                  defaultValue={
                    storyDetails.bookmark !== null
                      ? storyDetails.bookmark
                      : 'Loading...'
                  }
                  key={storyDetails.bookmark}
                  onChange={(e) => updateBookmark(e.target)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </li>
            </ul>
          </div>
          <div className="feedback-text">{storyDetails.text}</div>
        </div>
      </div>
    </div>
  );
}

ViewStory.propTypes = {
  entry: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewStory;
