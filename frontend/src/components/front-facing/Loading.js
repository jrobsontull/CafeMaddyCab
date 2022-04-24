import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbar';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />

        <h1 className="page-title-no-logo">
          Ride Request & Reimbursement Form
        </h1>

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
          <div className="message">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
