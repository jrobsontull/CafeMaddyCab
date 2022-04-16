import { useEffect, useState, useContext } from 'react';
import RidesAPI from '../../utils/rides.api';
import AuthContext from '../../utils/auth.context';
import { useNavigate } from 'react-router-dom';

import Arrow from '../../assets/img/arrow_right.svg';
import MissingPhoto from '../../assets/img/missing_photo_icon.svg';

function ApprovalWindow({ onCancel }) {
  const { user } = useContext(AuthContext);

  const [newTotal, setNewTotal] = useState(0);
  const [ridesToApprove, setRidesToApprove] = useState('');

  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });

  const navigate = useNavigate();

  function submitHandler() {
    if (ridesToApprove > 0 && newTotal > 0) {
      if (ridesToApprove <= newTotal) {
        setErrorOnSubmit({
          state: false,
          message: '',
        });

        RidesAPI.setInProgress(ridesToApprove, user.user).then((response) => {
          if (response.status === 'success') {
            /* Everything was all good */
            navigate('/dashboard/approve-rides/' + user.user._id);
          } else {
            setErrorOnSubmit({
              state: true,
              message: response.error,
            });
          }
        });
      } else {
        setErrorOnSubmit({
          state: true,
          message:
            "To approve total can't be more than the total number of new ride requests.",
        });
      }
    } else {
      setErrorOnSubmit({
        state: true,
        message:
          'Rides to approve and total number of new rides needs to be greater than 0.',
      });
    }
  }

  useEffect(() => {
    RidesAPI.getStats('status=1').then((response) => {
      setNewTotal(response.count);
    });
  }, []);

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window approve-window">
        <div className="header">
          <div className="title">
            <div className="back-btn" onClick={onCancel}>
              <img className="nav-arrow" src={Arrow} alt="arrow" />
            </div>
            <p>Approve Requests</p>
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
            There are ({newTotal}) requests to be approved. How many would you
            like to approve now?
          </p>
          <div className="approve-input">
            <input
              type="text"
              placeholder="Write number here"
              onChange={(e) => setRidesToApprove(e.target.value)}
            ></input>
            <div className="approve-btn" onClick={() => submitHandler()}>
              Approve now
            </div>
          </div>
          <p>
            On the next page, you will be asked to approve ride requests based
            on need, valid photo ID and purpose. User selfie's and their photo
            IDs will be presented next to each other like below. You can click
            these photos for an enlarged version.
          </p>
          <div className="photo-container">
            <div className="titles">
              <p>Selfie</p>
              <p>Photo ID</p>
            </div>
            <div className="photo-boxes">
              <div className="photo-box">
                <img src={MissingPhoto} alt="Deleted" />
              </div>
              <div className="photo-box" id="last-child">
                <img src={MissingPhoto} alt="Deleted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalWindow;
