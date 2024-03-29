import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import RidesAPI from '../../utils/rides.api';
import TimeAPI from '../../utils/time.api';

import Loading from '../general/Loading';
import Navbar from './Navbar';
import Footer from './Footer';

import Taxi from '../../assets/img/taxi_icon_white.svg';

function RequestRide() {
  const [rideDetails, setRideDetails] = useState({});
  const [selfie, setSelfie] = useState({ file: null });
  const [photoId, setPhotoId] = useState({ file: null });
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const otherRef = useRef();

  const [formOpen, setFormOpen] = useState(false);

  const [story, setStory] = useState({
    story: '',
    charCount: 0,
    shareStory: false,
  });

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
    story: false,
    recaptcha: true,
  });

  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });
  const [isRequesting, setIsRequesting] = useState({
    state: false,
    message: null,
  });

  const navigate = useNavigate();

  function basicInputFieldChange(target, prop) {
    setRideDetails((prevDetails) => ({ ...prevDetails, [prop]: target.value }));
  }

  // Validate the names input on change and update
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

  // Validate the email input on change and update
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

  // Validate the identity input on change and update
  function validateIdentity(target) {
    if (target.checked && target.value) {
      setRideDetails((prevDetails) => ({
        ...prevDetails,
        identity: target.value,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, identity: false }));
    }
  }

  // Validate the income input on change and update
  function validateIncome(target) {
    if (target.checked && target.value) {
      if (target.value === '1') {
        setRideDetails((prevDetails) => ({
          ...prevDetails,
          income: true,
        }));
      } else {
        setRideDetails((prevDetails) => ({
          ...prevDetails,
          income: false,
        }));
      }

      setErrors((prevErrors) => ({ ...prevErrors, income: false }));
    }
  }

  // Validate the purpose input on change and update
  function validatePurpose(target) {
    if (target.checked && target.value) {
      let purpose = {};
      if (target.value === '6') {
        // Other box checked
        setIsOtherChecked(true); // keeping track of check state for css styling
        // Check if ok format
        const newPurpose = otherRef.current.value;
        if (newPurpose.length > 300 || newPurpose.length === 0) {
          // Reject
          purpose = { value: target.value, text: null };
          setErrors((prevErrors) => ({ ...prevErrors, purpose: true }));
          otherRef.current.classList.add('invalid');
        } else {
          purpose = { value: target.value, text: newPurpose };
          setErrors((prevErrors) => ({ ...prevErrors, purpose: false }));
          otherRef.current.classList.remove('invalid');
        }
      } else {
        purpose = { value: target.value, text: null };
        setIsOtherChecked(false); // keeping track of check state for css styling
        setErrors((prevErrors) => ({ ...prevErrors, purpose: false }));
        otherRef.current.classList.remove('invalid');
      }
      setRideDetails((prevDetails) => ({
        ...prevDetails,
        purpose: purpose,
      }));
    }
  }

  // Update purpose field in rideDetails on change of input
  function otherPurposeUpdate(target) {
    if (isOtherChecked) {
      // Process update
      // Check if length too long
      const newPurpose = target.value;
      if (newPurpose.length > 300 || newPurpose.length === 0) {
        // Reject
        setErrors((prevErrors) => ({ ...prevErrors, purpose: true }));
        target.classList.add('invalid');
      } else {
        // Update purpose state and option in rideDetails
        setRideDetails((prevDetails) => ({
          ...prevDetails,
          purpose: { value: 6, text: newPurpose },
        }));
        setErrors((prevErrors) => ({ ...prevErrors, purpose: false }));
        target.classList.remove('invalid');
      }
    } else {
      target.classList.remove('invalid');
    }
  }

  // Update understand errors on input
  function validateUnderstand(target, prop) {
    if (target.checked) {
      setErrors((prevErrors) => ({ ...prevErrors, [prop]: false }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [prop]: true }));
    }
  }

  // File handling and validation
  function selectFile(target, type) {
    const file = target.files[0];

    /* Validate file type and size */
    const dotIndx = file.name.lastIndexOf('.') + 1;
    const ext = file.name.substring(dotIndx, file.name.length).toLowerCase();

    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      if (file.size < 10 * 1024 * 1024) {
        /* Store data */
        if (type === 'selfie') {
          setSelfie({
            file: file,
          });
          setErrors((prevErrors) => ({ ...prevErrors, selfie: false }));
        } else if (type === 'photoId') {
          setPhotoId({
            file: target.files[0],
          });
          setErrors((prevErrors) => ({ ...prevErrors, photoId: false }));
        }
      } else {
        /* File too big */
        setErrors((prevErrors) => ({ ...prevErrors, [type]: true }));
        alert(
          'The image you selected is more than 10 MB. Please use an image smaller than this. '
        );
      }
    } else {
      /* Incorrect file format */
      setErrors((prevErrors) => ({ ...prevErrors, [type]: true }));
      alert('The file you selected is not an image.');
    }
  }

  // Update personal story
  function updateStory(target) {
    const newStory = target.value;
    if (newStory.length > 800) {
      setStory((prevStory) => ({ ...prevStory, story: '' }));
      target.classList.add('invalid');
      setErrors((prevErrors) => ({ ...prevErrors, story: true }));
    } else {
      const re =
        /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+!?"]+$/u;
      if (re.test(newStory)) {
        target.classList.remove('invalid');
        setStory((prevStory) => ({
          ...prevStory,
          story: newStory,
          charCount: newStory.length,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, story: false }));
      } else {
        setStory((prevStory) => ({
          ...prevStory,
          story: '',
        }));
        target.classList.add('invalid');
        setErrors((prevErrors) => ({ ...prevErrors, story: true }));
      }
    }
  }

  function setCaptcha(event) {
    const gResponse = event;
    if (gResponse) {
      setErrors((prevErrors) => ({ ...prevErrors, recaptcha: false }));
      setRideDetails((prevDetails) => ({
        ...prevDetails,
        gResponse: gResponse,
      }));
    } else {
      setErrorOnSubmit({
        state: true,
        message:
          'ReCAPTCHA submission invalid. Please try again or reload the page.',
      });
    }
  }

  function submitHandler() {
    let errorPresent = false;
    for (const error in errors) {
      if (errors[error] === true) {
        errorPresent = true;
        break;
      }
    }

    if (errorPresent) {
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
          message:
            'Please provide us with a valid selfie image for verification.',
        });
      } else if (errors.photoId) {
        setErrorOnSubmit({
          state: true,
          message:
            'Please provide us with a valid image of your photo ID for verification.',
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
      } else if (errors.story) {
        setErrorOnSubmit({
          state: true,
          message:
            'Your story contains invalid characters. Please remove before resubmitting.',
        });
      } else if (errors.recaptcha) {
        setErrorOnSubmit({
          state: true,
          message: 'Please complete the ReCAPTCHA before continuing.',
        });
      }

      window.scrollTo(0, 0);
    } else {
      setIsRequesting({
        state: true,
        message:
          "We're sending your request right now! This page will automatically refresh when your request has sent.",
      });

      RidesAPI.requestRide(rideDetails, selfie.file, photoId.file, story).then(
        (response) => {
          var { error } = response;
          if (error) {
            setIsRequesting({ state: false, message: null });
            setErrorOnSubmit({ state: true, message: error });
            window.scrollTo(0, 0);
          } else if (response && response.data.acknowledged === true) {
            // All good
            const id = response.data.insertedId;
            setIsRequesting({ state: false, message: null });
            navigate('/success/' + id, {
              state: { name: rideDetails.firstName },
            });
          }
        }
      );
    }
  }

  useEffect(() => {
    // Scroll to top on component load/refresh
    window.scrollTo(0, 0);

    // Set loading to true
    setIsRequesting({
      state: true,
      message:
        "We're loading this page right now and it will automatically refresh when complete.",
    });

    // Get NYC time and set form state
    TimeAPI.isFormOpen().then((response) => {
      setIsRequesting(false);
      if (typeof response !== 'object') {
        setErrorOnSubmit({
          state: true,
          message:
            'Failed to check if form was open. Please contact the Cafe Maddy Cab team for help.',
        });
        setFormOpen(false);
      } else if (
        Object.prototype.hasOwnProperty.call(response, "'error'") ||
        Object.prototype.hasOwnProperty.call(response, 'error')
      ) {
        setErrorOnSubmit({
          state: true,
          message:
            'Failed to check if form was open. Please contact the Cafe Maddy Cab team for help.',
        });
        setFormOpen(false);
      } else {
        setFormOpen(response.open);
      }
      setFormOpen(false); // close for foreseeable future
    });
  }, []);

  return (
    <div className="react-container">
      {isRequesting.state ? (
        <Loading
          pageTitle="Ride Request & Reimbursement Form"
          loadMessage={isRequesting.message}
        />
      ) : (
        <div className="content frontend">
          <Navbar />

          <h1 className="page-title-no-logo" id="request-ride">
            Ride Request & Reimbursement Form
          </h1>
          <h2 className="description">
            Cafe Maddy Cab is currently no longer provide vouchers. This is
            until we secure further funding. Thank you for your patience and
            your continued support. Keep a lookout on our{' '}
            <a
              href={'https://www.instagram.com/cafemaddycab/'}
              style={{ fontWeight: 600 }}
            >
              Instagram
            </a>{' '}
            page for more information.
          </h2>

          {errorOnSubmit.state ? (
            <div className="error">
              {errorOnSubmit.message
                ? errorOnSubmit.message
                : 'Not all the information has been filled out correctly.'}
            </div>
          ) : (
            ''
          )}

          {formOpen ? (
            <div className="request-container">
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
                    <input
                      type="radio"
                      name="identity"
                      id="1"
                      value="1"
                    ></input>
                    <label htmlFor="1">Asian female</label>
                  </div>
                  <div className="check-item">
                    <input
                      type="radio"
                      name="identity"
                      id="2"
                      value="2"
                    ></input>
                    <label htmlFor="2">Asian LGBTQ+</label>
                  </div>
                  <div className="check-item">
                    <input
                      type="radio"
                      name="identity"
                      id="3"
                      value="3"
                    ></input>
                    <label htmlFor="3">Asian elderly person</label>
                  </div>
                  <div className="check-item last-child">
                    <input
                      type="radio"
                      name="identity"
                      id="4"
                      value="4"
                    ></input>
                    <label htmlFor="4">
                      I am submitting on behalf of an Asian elderly person
                    </label>
                  </div>
                </div>

                <h3>
                  Are you of low income / unemployed, and need financial
                  assistance for your ride?
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
                      value="1"
                    ></input>
                    <label htmlFor="5">Yes</label>
                  </div>
                  <div className="check-item last-child">
                    <input
                      type="radio"
                      name="low-income"
                      id="6"
                      value="2"
                    ></input>
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
                    <input
                      type="radio"
                      name="purpose"
                      id="10"
                      value="4"
                    ></input>
                    <label htmlFor="10">
                      Care taking for an Asian elderly person
                    </label>
                  </div>
                  <div className="check-item">
                    <input
                      type="radio"
                      name="purpose"
                      id="11"
                      value="5"
                    ></input>
                    <label htmlFor="11">
                      Academic reasons (university, school, mandatory meeting)
                    </label>
                  </div>
                  <div className="check-item last-child">
                    <input
                      type="radio"
                      name="purpose"
                      id="12"
                      value="6"
                    ></input>
                    <label htmlFor="12" className="other-input">
                      <input
                        placeholder="Other"
                        onChange={(e) => otherPurposeUpdate(e.target)}
                        ref={otherRef}
                      ></input>
                    </label>
                  </div>
                </div>

                <h3>
                  Please submit a selfie/photo of yourself. If you are
                  submitting on behalf of someone else, please submit their
                  selfie/photo. We have a max upload limit of <span>10 MB</span>{' '}
                  per photo and request that you{' '}
                  <span id="mask-message">don&apos;t wear a mask</span> in the
                  photo.
                </h3>

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
                    accept=".jpg,.jpeg,.png"
                  />
                  <label htmlFor="selfie">Upload Photo</label>
                </div>

                <h3>
                  Please submit a photo of your photo ID. If you are submitting
                  on behalf of someone else, please submit a photo of their
                  photo ID. We have a max upload limit of <span>10 MB</span> per
                  photo.
                </h3>

                <div className="upload">
                  <input
                    type="text"
                    disabled
                    className="upload-location"
                    value={
                      photoId.file ? photoId.file.name : 'No photo selected'
                    }
                  ></input>
                  <input
                    name="photoId"
                    type="file"
                    className="input-file"
                    id="photoId"
                    onChange={(e) => selectFile(e.target, 'photoId')}
                    accept=".jpg,.jpeg,.png"
                  />
                  <label htmlFor="photoId">Upload Photo</label>
                </div>

                <h3>
                  I understand that the code is for 1 ride up to $20, and the
                  remaining balance does not roll over to a 2nd ride. I also
                  understand that Cafe Maddy Cab is not responsible for any
                  incidents that may occur on the Uber ride.
                </h3>

                <div className="check">
                  <div className="check-item">
                    <input
                      type="checkbox"
                      name="understand-1"
                      id="13"
                      onChange={(e) =>
                        validateUnderstand(e.target, 'understand1')
                      }
                    ></input>
                    <label htmlFor="13">Yes, I understand</label>
                  </div>
                </div>

                <h3>
                  I understand the code is valid only for rides within NYC. The
                  code will not apply to rides across NJ or Long Island.
                </h3>

                <div className="check">
                  <div className="check-item">
                    <input
                      type="checkbox"
                      name="understand-2"
                      id="14"
                      onChange={(e) =>
                        validateUnderstand(e.target, 'understand2')
                      }
                    ></input>
                    <label htmlFor="14">
                      Yes, my ride will be within the 5 boroughs of NYC
                    </label>
                  </div>
                </div>

                <h3>
                  Do you agree to our{' '}
                  <Link
                    to={'/terms-and-conditions'}
                    target="_blank"
                    id="terms-link"
                  >
                    Terms and Conditions
                  </Link>
                  ?
                </h3>

                <div className="check">
                  <div className="check-item">
                    <input
                      type="checkbox"
                      name="understand-3"
                      id="15"
                      onChange={(e) =>
                        validateUnderstand(e.target, 'understand3')
                      }
                    ></input>
                    <label htmlFor="15">
                      I have read and agree to the terms and conditions
                    </label>
                  </div>
                </div>

                <h3>
                  Please feel free to share your story about how this ride is
                  helping you (optional). If you also want, please tell us which
                  NYC borough you live in.
                </h3>

                <textarea
                  placeholder="Share your story here..."
                  onChange={(e) => updateStory(e.target)}
                  rows="4"
                  maxLength="800"
                ></textarea>
                <p className="char-count">{story.charCount} / 800</p>

                <h3>
                  If you agree to have the CMC team anonymously share your story
                  publically for funraising purposes, please check this box. If
                  you do not want your story shared anonymously, please do not
                  check this box.
                </h3>

                <div className="check story-check">
                  <div className="check-item">
                    <input
                      type="checkbox"
                      name="share-story"
                      id="16"
                      onChange={(e) =>
                        setStory((prevStory) => ({
                          ...prevStory,
                          shareStory: e.target.checked,
                        }))
                      }
                    ></input>
                    <label htmlFor="16">
                      Yes, I agree to have the CMC team anonymously share this
                      story for fundraising purposes
                    </label>
                  </div>
                </div>

                <h3 id="thank-you">
                  Thank you for choosing to stay safe! Codes will be emailed
                  every Monday morning at 8AM.
                </h3>
              </div>

              <div className="recaptcha-react">
                <ReCAPTCHA
                  sitekey="6Le78D0fAAAAAGCFMp-jkHsx_fOlK4nmOMdcd6_5"
                  onChange={(e) => setCaptcha(e)}
                />
              </div>

              <div className="btn submit ride" onClick={() => submitHandler()}>
                <div className="content">
                  <img src={Taxi} alt="Taxi" className="icon" />
                  <p>Submit Request</p>
                </div>
              </div>
            </div>
          ) : !errorOnSubmit.state ? (
            <div className="info-box no-title">
              Our submission form is currently closed. If you have any
              questions, please refer to our <Link to={'/faq'}>FAQ</Link> page.
            </div>
          ) : (
            ''
          )}

          <Footer />
        </div>
      )}
    </div>
  );
}

export default RequestRide;
