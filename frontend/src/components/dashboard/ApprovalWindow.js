import { useEffect, useState } from 'react';
import RidesAPI from '../../utils/rides.api';

import Arrow from '../../assets/img/arrow_right.svg';
import MissingPhoto from '../../assets/img/missing_photo_icon.svg';

function ApprovalWindow({ onCancel }) {
  const [newTotal, setNewTotal] = useState(0);

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
          <p>
            There are ({newTotal}) requests to be approved. How many would you
            like to approve now?
          </p>
          <div className="approve-input">
            <input type="text" placeholder="Write number here"></input>
            <div className="approve-btn">Approve now</div>
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
