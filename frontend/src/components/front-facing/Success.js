import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import FeedbackAPI from '../../utils/feedback.api';

import Navbar from './Navbar';
import Footer from './Footer';
import Tick from '../../assets/img/success_tick.svg';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [errorStateMessage, setErrorStateMessage] = useState({
    state: false,
    message: null,
  });
  const [feedbackConfirm, setFeedbackConfirm] = useState(false);

  const rideId = useParams();

  function updateFeedback(target) {
    const newFeedback = target.value;
    if (newFeedback.length > 800) {
      setErrorStateMessage({
        state: true,
        message: 'Your feedback message is too long, please shorten it.',
      });
    } else {
      const re =
        /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

      if (re.test(newFeedback)) {
        setErrorStateMessage({ state: false, message: null });
        setFeedback(newFeedback);
        setCharCount(newFeedback.length);
      } else {
        setFeedback('');
        setErrorStateMessage({
          state: true,
          message: 'Your feedback message contains invalid characters.',
        });
      }
    }
  }

  function submitFeedback() {
    if (feedback === '') {
      setErrorStateMessage({
        state: true,
        message:
          'Please fill out the feedback form before clicking the button.',
      });
    } else {
      // All good
      FeedbackAPI.submitFeedback(feedback, rideId).then((response) => {
        if (response.data.error) {
          setErrorStateMessage({
            state: true,
            message: response.data.error,
          });
        } else {
          setFeedbackConfirm(true);
        }
      });
    }
  }

  useEffect(() => {
    if (location.state) {
      setName(location.state.name);
    } else {
      navigate('/');
    }
  }, [location]);

  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />

        <h1 className="page-title-no-logo">
          Ride Request & Reimbursement Form
        </h1>

        <div className="success-message">
          <img src={Tick} alt="Success" />
          <p>
            Thank you <span>{name}</span> for submitting a ride request, your
            request is now with us! We will contact you through email if your
            request is approved.
          </p>
          <p id="last-child">
            If you have any questions, please refer to the{' '}
            <Link className="contact" to={'/faq'}>
              FAQ page
            </Link>{' '}
            on our website.
          </p>
        </div>

        <div className="info-box-title">
          <h3>How did we do?</h3>
        </div>
        {!feedbackConfirm ? (
          <div className="info-box success" id="child-2">
            If you have any feedback on your experience, please feel free to
            leave it here. Your feedback is important to us for improving this
            service, thank you!
            <br></br>
            <br></br>
            {errorStateMessage.state ? (
              <div className="error">
                {errorStateMessage.message
                  ? errorStateMessage.message
                  : 'Not all the information has been filled out correctly.'}
              </div>
            ) : (
              ''
            )}
            <textarea
              className="info-box feedback-form"
              placeholder="Write feedback here..."
              onChange={(e) => updateFeedback(e.target)}
              rows="3"
              maxLength="800"
            ></textarea>
            <div
              className="btn submit send-feedback"
              onClick={() => submitFeedback()}
            >
              Send Feedback
            </div>
            <p className="char-count">{charCount} / 800</p>
          </div>
        ) : (
          <div className="info-box success" id="child-2">
            Thank you for your feedback!
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default Success;
