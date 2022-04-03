import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import RidesAPI from '../../utils/rides.api';
import DriveAPI from '../../utils/drive.api';
import RecaptchaAPI from '../../utils/recaptcha.api';

import Loading from './Loading';

function RequestRide() {
  const [rideDetails, setRideDetails] = useState({});
  const [selfie, setSelfie] = useState({ file: null, fileName: null });
  const [photoId, setPhotoId] = useState({ file: null, fileName: null });
  const [otherPurpose, setOtherPurpose] = useState('');

  const [errors, setErrors] = useState({
    firstName: true,
    lastName: true,
    email: true,
    identity: true,
    income: true,
    purpose: true,
    selfie: true,
    photoId: true,
    understand1: true,
    understand2: true,
    understand3: true,
    recaptcha: true,
  });

  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });
  const [isRequesting, setIsRequesting] = useState(false);

  const navigate = useNavigate();

  function basicInputFieldChange(target, prop) {
    setRideDetails((prevDetails) => ({ ...prevDetails, [prop]: target.value }));
  }

  function validateNames(target, prop) {
    const re =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (target.value !== '' && re.test(target.value)) {
      basicInputFieldChange(target, prop);
      setErrors((prevErrors) => ({ ...prevErrors, [prop]: false }));
      target.classList.remove('invalid');
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [prop]: true }));
      target.classList.add('invalid');
    }
  }

  function validateEmail(target) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (target.value !== '' && re.test(target.value)) {
      basicInputFieldChange(target, 'email');
      setErrors((prevErrors) => ({ ...prevErrors, email: false }));
      target.classList.remove('invalid');
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }));
      target.classList.add('invalid');
    }
  }

  function validateIdentity(target) {
    if (target.checked && target.value) {
      setRideDetails((prevDetails) => ({
        ...prevDetails,
        identity: target.value,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, identity: false }));
    }
  }

  function validateIncome(target) {
    if (target.checked && target.value) {
      setRideDetails((prevDetails) => ({
        ...prevDetails,
        income: target.value,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, income: false }));
    }
  }

  function validatePurpose(target) {
    if (target.checked && target.value) {
      let purpose = {};
      if (target.value === '6') {
        // Other box checked
        purpose = { value: target.value, text: otherPurpose };
      } else {
        purpose = { value: target.value, text: null };
      }
      setRideDetails((prevDetails) => ({
        ...prevDetails,
        purpose: purpose,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, purpose: false }));
    }
  }

  function validateUnderstand(target, prop) {
    if (target.checked) {
      setErrors((prevErrors) => ({ ...prevErrors, [prop]: false }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [prop]: true }));
    }
  }

  function selectFile(target, type) {
    let fileName = target.value.split('\\');
    fileName = fileName[fileName.length - 1];

    if (type === 'selfie') {
      setSelfie({
        file: target.files[0],
      });
      setErrors((prevErrors) => ({ ...prevErrors, selfie: false }));
    } else if (type === 'photoId') {
      setPhotoId({
        file: target.files[0],
      });
      setErrors((prevErrors) => ({ ...prevErrors, photoId: false }));
    }
  }

  function validateCaptcha(event) {
    const testResponse = event;
    RecaptchaAPI.verifyResponse(testResponse).then((response) => {
      if (response.data.success) {
        setErrors((prevErrors) => ({ ...prevErrors, recaptcha: false }));
      } else {
        setErrorOnSubmit({
          state: true,
          message:
            'ReCAPTCHA submission invalid. Please try again or reload the page.',
        });
      }
    });
  }

  function submitHandler() {
    console.log('Validating form...');
    let errorPresent = false;
    for (const error in errors) {
      if (errors[error] === true) {
        errorPresent = true;
        break;
      }
    }

    if (errorPresent) {
      console.log('Invalid form.');

      if (errors.firstName) {
        setErrorOnSubmit({
          state: true,
          message: 'You need to write a first name.',
        });
      } else if (errors.lastName) {
        setErrorOnSubmit({
          state: true,
          message: 'You need to write a last name.',
        });
      } else if (errors.email) {
        setErrorOnSubmit({
          state: true,
          message: 'You need to write a valid email.',
        });
      } else if (errors.identity) {
        setErrorOnSubmit({
          state: true,
          message: 'Please check which group you most identify with.',
        });
      } else if (errors.income) {
        setErrorOnSubmit({
          state: true,
          message:
            'Please tell us if whether you need financial assistance for your ride.',
        });
      } else if (errors.purpose) {
        setErrorOnSubmit({
          state: true,
          message: 'Please tell us the purpose of your ride.',
        });
      } else if (errors.selfie) {
        setErrorOnSubmit({
          state: true,
          message: 'Please provide us with a selfie for verification.',
        });
      } else if (errors.photoId) {
        setErrorOnSubmit({
          state: true,
          message:
            'Please provide us with a picture of your photo ID for verification.',
        });
      } else if (
        errors.understand1 ||
        errors.understand2 ||
        errors.understand3
      ) {
        setErrorOnSubmit({
          state: true,
          message:
            'You have not agreed to all our terms. You will need to do so to continue with a reimbursement request.',
        });
      } else if (errors.recaptcha) {
        setErrorOnSubmit({
          state: true,
          message: 'Please complete the ReCAPTCHA before continuing.',
        });
      }

      //setErrorOnSubmit({ state: true, message: null });
      window.scrollTo(0, 0);
    } else {
      console.log('Valid form.');
      setIsRequesting(true);

      // Update other purpose field if present
      if (rideDetails.purpose && rideDetails.purpose.value === '6') {
        setRideDetails((prevDetails) => ({
          ...prevDetails,
          purpose: { value: '6', text: otherPurpose },
        }));
      }

      // Post data
      let selfieResponse;
      let photoIdResponse;

      console.log('Submitting images first...');
      DriveAPI.uploadPhoto(selfie.file, 'selfie').then((sResponse) => {
        if (sResponse) {
          selfieResponse = sResponse.data;
          DriveAPI.uploadPhoto(photoId.file, 'photoId').then((pResponse) => {
            if (pResponse) {
              console.log('Photos uploaded');
              photoIdResponse = pResponse.data;

              let rideToReq = rideDetails;
              rideToReq.selfie = selfieResponse;
              rideToReq.photoId = photoIdResponse;
              requestRide(rideToReq);
            }
          });
        }
      });
    }
  }

  function requestRide(ride) {
    console.log('Submitting ride request...');
    RidesAPI.requestRide(ride).then((rResponse) => {
      if (rResponse && rResponse.data.acknowledged === true) {
        console.log('Got good response. Ride requested.');
        const id = rResponse.data.insertedId;
        setIsRequesting(false);
        navigate('/success/' + id, { state: { name: ride.firstName } });
      }
    });
  }

  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      {isRequesting ? (
        <Loading />
      ) : (
        <div className="content">
          <div className="titles">
            <h2>CAFE MADDY CAB</h2>
            <h3>Ride Reimburesment</h3>
          </div>

          {errorOnSubmit.state ? (
            <div className="error">
              {errorOnSubmit.message
                ? errorOnSubmit.message
                : 'Not all the information has been filled out correctly.'}
            </div>
          ) : (
            ''
          )}

          <div className="request-form">
            <input
              type="text"
              placeholder="First name"
              onChange={(e) => validateNames(e.target, 'firstName')}
            ></input>
            <input
              type="text"
              placeholder="Last name"
              onChange={(e) => validateNames(e.target, 'lastName')}
            ></input>
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => validateEmail(e.target)}
            ></input>

            <h3>What group do you most identify with?</h3>

            <div
              className="radio-check"
              onChange={(e) => validateIdentity(e.target)}
            >
              <div className="check-item">
                <input type="radio" name="identity" id="1" value="1"></input>
                <label htmlFor="1">Asian female</label>
              </div>
              <div className="check-item">
                <input type="radio" name="identity" id="2" value="2"></input>
                <label htmlFor="2">Asian LGBTQ+</label>
              </div>
              <div className="check-item">
                <input type="radio" name="identity" id="3" value="3"></input>
                <label htmlFor="3">Asian elderly person</label>
              </div>
              <div className="check-item last-child">
                <input type="radio" name="identity" id="4" value="4"></input>
                <label htmlFor="4">
                  I am submitting on behalf of an Asian Elderly person
                </label>
              </div>
            </div>

            <h3>
              Are you of low income / unemployed, and need financial assistance
              for your ride?
            </h3>

            <div
              className="radio-check"
              onChange={(e) => validateIncome(e.target)}
            >
              <div className="check-item">
                <input
                  type="radio"
                  name="low-income"
                  id="5"
                  value="yes"
                ></input>
                <label htmlFor="5">Yes</label>
              </div>
              <div className="check-item last-child">
                <input type="radio" name="low-income" id="6" value="no"></input>
                <label htmlFor="6">No</label>
              </div>
            </div>

            <h3>What is the purpose of your planned ride?</h3>

            <div
              className="radio-check"
              onChange={(e) => validatePurpose(e.target)}
            >
              <div className="check-item">
                <input type="radio" name="purpose" id="7" value="1"></input>
                <label htmlFor="7">Medical appointment</label>
              </div>
              <div className="check-item">
                <input type="radio" name="purpose" id="8" value="2"></input>
                <label htmlFor="8">Vaccination</label>
              </div>
              <div className="check-item">
                <input type="radio" name="purpose" id="9" value="3"></input>
                <label htmlFor="9">Work (going to/from work)</label>
              </div>
              <div className="check-item">
                <input type="radio" name="purpose" id="10" value="4"></input>
                <label htmlFor="10">
                  Care taking for an Asian elderly person
                </label>
              </div>
              <div className="check-item">
                <input type="radio" name="purpose" id="11" value="5"></input>
                <label htmlFor="11">
                  Academic reasons (university, school, mandatory meeting)
                </label>
              </div>
              <div className="check-item last-child">
                <input type="radio" name="purpose" id="12" value="6"></input>
                <label htmlFor="12" className="other-input">
                  <input
                    placeholder="Other"
                    onChange={(e) => setOtherPurpose(e.target.value)}
                  ></input>
                </label>
              </div>
            </div>

            <h3>Please submit a selfie / photo of the elderly person</h3>

            <div className="upload">
              <input
                type="text"
                disabled
                className="upload-location"
                value={selfie.file ? selfie.file.name : 'No photo selected'}
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
                value={photoId.file ? photoId.file.name : 'No photo selected'}
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
                <input
                  type="checkbox"
                  name="understand-1"
                  id="13"
                  onChange={(e) => validateUnderstand(e.target, 'understand1')}
                ></input>
                <label htmlFor="13">Yes, I understand</label>
              </div>
            </div>

            <h3>
              I understand the code is valid only for rides within NYC. The code
              will not apply to rides across NJ or Long Island.
            </h3>

            <div className="check">
              <div className="check-item">
                <input
                  type="checkbox"
                  name="understand-2"
                  id="14"
                  onChange={(e) => validateUnderstand(e.target, 'understand2')}
                ></input>
                <label htmlFor="14">
                  Yes, my ride will be within the 5 boroughs of NYC
                </label>
              </div>
            </div>

            <h3>Do you agree to our Terms and Conditions?</h3>

            <div className="check">
              <div className="check-item">
                <input
                  type="checkbox"
                  name="understand-3"
                  id="15"
                  onChange={(e) => validateUnderstand(e.target, 'understand3')}
                ></input>
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

          <div className="recaptcha-react">
            <ReCAPTCHA
              sitekey="6Le78D0fAAAAAGCFMp-jkHsx_fOlK4nmOMdcd6_5"
              onChange={(e) => validateCaptcha(e)}
            />
          </div>

          <div className="btn submit ride" onClick={() => submitHandler()}>
            Submit Request
          </div>

          <br></br>
          <br></br>
        </div>
      )}
    </div>
  );
}

export default RequestRide;