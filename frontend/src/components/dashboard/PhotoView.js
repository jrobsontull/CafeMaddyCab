import { useEffect, useContext } from 'react';
import AuthContext from '../../utils/auth.context';

import Arrow from '../../assets/img/arrow_right.svg';
import MissingPhoto from '../../assets/img/missing_photo_icon.svg';

function PhotoView({ onClose, firstName, lastName, selfie, photoId }) {
  let baseImgUrl = 'http://localhost:8080/api/v1/image/';
  if (process.env.NODE_ENV === 'production') {
    baseImgUrl = 'https://cafemaddycab.org:443/api/v1/image/';
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window verification">
        <div className="header">
          <div className="title">
            <div className="back-btn" onClick={onClose}>
              <img className="nav-arrow" src={Arrow} alt="arrow" />
            </div>
            <p>
              ID Verification: <span>{firstName + ' ' + lastName}</span>
            </p>
          </div>
        </div>
        <div className="entry-content">
          <div className="photo-boxes">
            <div className="photo-box" id="selfie">
              {selfie.exists ? (
                <img src={baseImgUrl + selfie.path} />
              ) : (
                <img src={MissingPhoto} className="missing" />
              )}
            </div>
            <div className="photo-box" id="photoId">
              {photoId.exists ? (
                <img src={baseImgUrl + photoId.path} />
              ) : (
                <img src={MissingPhoto} className="missing" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoView;
