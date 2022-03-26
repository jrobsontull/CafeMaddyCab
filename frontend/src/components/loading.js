import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Loading() {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
    } else {
      setMessage(
        "We're sending your request right now! This page will automatically refresh when your request has sent."
      );
    }
  }, []);

  return (
    <div className="content">
      <div className="titles">
        <h2>CAFE MADDY CAB</h2>
        <h3>Ride Reimbursment</h3>
      </div>
      <div className="loading">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="info-box">{message}</div>
      </div>
    </div>
  );
}

export default Loading;
