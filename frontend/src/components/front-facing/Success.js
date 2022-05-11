import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import Tick from '../../assets/img/success_tick.svg';
import FeedbackAPI from '../../utils/feedback.api';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackCharCount, setCharCount] = useState(0);
  const [errorStateMessage, setErrorStateMessage] = useState({
    state: false,
    message: null,
  });
  const [feedbackConfirm, setFeedbackConfirm] = useState(false);

  const rideId = useParams();

  useEffect(() => {
    /*if (location.state) {
      setName(location.state.name);
    } else {
      navigate('/');
    }*/
    setName('Virginia');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updates Share Story textbox and char counter
  function feedbackTextUpdate(target) {
    setFeedbackText(target);
    setCharCount(target.length);
  }

  function submitFeedback() {
    if (feedbackText === '') {
      setErrorStateMessage({
        state: true,
        message:
          'Please fill out the feedback form before clicking Send Feedback.',
      });
      return;
    }

    const feedbackToReq = {
      rideId: rideId,
      text: feedbackText,
    };

    FeedbackAPI.submitFeedback(feedbackToReq).then((fResponse) => {
      if (fResponse) {
        setFeedbackConfirm(true);
      } else {
        setErrorStateMessage({
          state: true,
          message: 'There was an error sending feedback. Please try again.',
        });
      }
    });
  }

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
              onChange={(e) => feedbackTextUpdate(e.target.value)}
              rows="3"
              maxLength="500"
            ></textarea>
            <div
              className="btn submit send-feedback"
              onClick={() => submitFeedback()}
            >
              Send Feedback
            </div>
            <p className="char-count">{feedbackCharCount} / 500</p>
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
