import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedbackAPI from '../../utils/feedback.api';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [sentFeedbackConfirm, setFeedbackConfirm] = useState(false);

  useEffect(() => {
    if (location.state) {
      setName(location.state.name);
    } else {
      navigate('/');
    }
  }, []);

  function submitFeedback() {
    console.log('Feedback text to be submitted: ' + feedbackText);
    let feedbackToReq = {
      text: feedbackText,
    }
    FeedbackAPI.submitFeedback(feedbackToReq).then((fResponse) => {
      if (fResponse) {
        console.log('successful feedback response');
        setFeedbackConfirm(true);
      }
    });
  };

  return (
    <div className="react-container">
      <div className="content">
        <div className="titles">
          <h2>CAFE MADDY CAB</h2>
          <h3>Ride Reimbursment</h3>
        </div>

        <div className="info-box success" id="no-title">
          Thank you <span>{name}</span> for submitting a ride request, your
          request is now with us! We will get back to you if your request is
          approved.
          <br></br>
          <br></br>If you have any questions or technical difficulties, please
          get in touch with us <a href="mailto:example@domain.com">here</a>.
        </div>

        <div className="info-box-title">
          <h3>How did we do?</h3>
        </div>
        { !sentFeedbackConfirm ?
        <div className="info-box success" id="child-2">
          If you have any feedback on your experience, please feel free to leave it here. Your feedback is important to us for improving this service, thank you!
          <br></br>
          <br></br>
          <textarea className="info-box feedback-form"
            placeholder="Write feedback here..."
            onChange={(e) => setFeedbackText(e.target.value)}
          ></textarea>
          <div className="btn submit send-feedback" onClick={() => submitFeedback()}>
            Send Feedback
          </div>
        </div> : 
        <div className="info-box success" id="child-2">
          Thank you for your feedback!
        </div> }
      </div>
    </div>
  );
}

export default Success;
