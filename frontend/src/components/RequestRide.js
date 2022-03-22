import { useEffect, useState } from 'react';
import RidesAPI from '../utils/rides.api';

function RequestRide() {
  const [rideDetails, setRideDetails] = useState({});
  const [selfie, setSelfie] = useState({ location: null, fileName: null });
  const [photoId, setPhotoId] = useState({ location: null, fileName: null });

  function validator() {}

  function submitHandler() {
    console.log('Submitting ride request...');
    const response = RidesAPI.requestRide({ firstName: 'test' });
    if (response) {
      console.log(response);
    }
  }

  function selectFile(target, type) {
    let fileName = target.value.split('\\');
    fileName = fileName[fileName.length - 1];

    if (type === 'selfie') {
      setSelfie({
        location: target.value,
        fileName: fileName,
      });
    } else if (type === 'photoId') {
      console.log('photo');
      setPhotoId({
        location: target.value,
        fileName: fileName,
      });
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content">
        <div className="titles">
          <h2>CAFE MADDY CAB</h2>
          <h3>Ride Reimbursment</h3>
        </div>
        <div className="request-form">
          <input type="text" placeholder="First name"></input>
          <input type="text" placeholder="Last name"></input>
          <input type="email" placeholder="Email address"></input>

          <h3>What group do you most identify with?</h3>

          <div className="radio-check">
            <div className="check-item">
              <input type="radio" name="identity" id="1"></input>
              <label htmlFor="1">Asian female</label>
            </div>
            <div className="check-item">
              <input type="radio" name="identity" id="2"></input>
              <label htmlFor="2">Asian LGBTQ+</label>
            </div>
            <div className="check-item">
              <input type="radio" name="identity" id="3"></input>
              <label htmlFor="3">Asian elderly person</label>
            </div>
            <div className="check-item last-child">
              <input type="radio" name="identity" id="4"></input>
              <label htmlFor="4">
                I am submitting on behalf of an Asian Elderly person
              </label>
            </div>
          </div>

          <h3>
            Are you of low income / unemployed, and need financial assistance
            for your ride?
          </h3>

          <div className="radio-check">
            <div className="check-item">
              <input type="radio" name="low-income" id="5"></input>
              <label htmlFor="5">Yes</label>
            </div>
            <div className="check-item last-child">
              <input type="radio" name="low-income" id="6"></input>
              <label htmlFor="6">No</label>
            </div>
          </div>

          <h3>What is the purpose of your planned ride?</h3>

          <div className="radio-check">
            <div className="check-item">
              <input type="radio" name="purpose" id="7"></input>
              <label htmlFor="7">Medical appointment</label>
            </div>
            <div className="check-item">
              <input type="radio" name="purpose" id="8"></input>
              <label htmlFor="8">Vaccination</label>
            </div>
            <div className="check-item">
              <input type="radio" name="purpose" id="9"></input>
              <label htmlFor="9">Work (going to/from work)</label>
            </div>
            <div className="check-item">
              <input type="radio" name="purpose" id="10"></input>
              <label htmlFor="10">
                Care taking for an Asian elderly person
              </label>
            </div>
            <div className="check-item">
              <input type="radio" name="purpose" id="11"></input>
              <label htmlFor="11">
                Academic reasons (university, school, mandatory meeting)
              </label>
            </div>
            <div className="check-item last-child">
              <input type="radio" name="purpose" id="12"></input>
              <label htmlFor="12" className="other-input">
                <input placeholder="Other"></input>
              </label>
            </div>
          </div>

          <h3>Please submit a selfie / photo of the elderly person</h3>

          <div className="upload">
            <input
              type="text"
              disabled
              className="upload-location"
              value={selfie.fileName ? selfie.fileName : 'No photo selected'}
            ></input>
            <input
              name="selfie"
              type="file"
              className="input-file"
              id="selfie"
              onChange={(e) => selectFile(e.target, 'selfie')}
            />
            <label htmlFor="selfie">Upload Photo</label>
          </div>

          <h3>Please submit a copy/ photo of your photo ID</h3>

          <div className="upload">
            <input
              type="text"
              disabled
              className="upload-location"
              value={photoId.fileName ? photoId.fileName : 'No photo selected'}
            ></input>
            <input
              name="photoId"
              type="file"
              className="input-file"
              id="photoId"
              onChange={(e) => selectFile(e.target, 'photoId')}
            />
            <label htmlFor="photoId">Upload Photo</label>
          </div>

          <h3>
            I understand that the code is for 1 ride up to $25, and the
            remaining balance does not roll over to the 2nd ride. I also
            understand that Cafemaddy CAB is not responsible for any incidents
            that may occur on the Uber ride.
          </h3>

          <div className="check">
            <div className="check-item">
              <input type="checkbox" name="understand-1" id="13"></input>
              <label htmlFor="13">Yes, I understand</label>
            </div>
          </div>

          <h3>
            I understand the code is valid only for rides within NYC. The code
            will not apply to rides across NJ or Long Island.
          </h3>

          <div className="check">
            <div className="check-item">
              <input type="checkbox" name="understand-2" id="14"></input>
              <label htmlFor="14">
                Yes, my ride will be within the 5 boroughs of NYC
              </label>
            </div>
          </div>

          <h3>Do you agree to our Terms and Conditions?</h3>

          <div className="check">
            <div className="check-item">
              <input type="checkbox" name="understand-3" id="15"></input>
              <label htmlFor="15">
                I have read and agree to the terms and conditions
              </label>
            </div>
          </div>

          <h3>
            Thank you for choosing to stay safe! codes will be emailed every
            Monday morning at 8AM.
          </h3>
        </div>

        <div className="btn submit" onClick={() => submitHandler()}>
          Submit Request
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default RequestRide;
