import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');

  useEffect(() => {
    if (location.state) {
      setName(location.state.name);
    } else {
      navigate('/');
    }
  }, []);

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
      </div>
    </div>
  );
}

export default Success;
