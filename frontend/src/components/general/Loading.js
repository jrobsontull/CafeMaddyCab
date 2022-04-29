import { useState, useEffect } from 'react';
import Navbar from '../front-facing/Navbar';
import PropTypes from 'prop-types';

function Loading({ loadMessage }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (loadMessage) {
      setMessage(loadMessage);
    } else {
      setMessage(
        "We're loading this page right now. This page will automatically refresh when we're ready for you."
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

Loading.propTypes = {
  loadMessage: PropTypes.string,
};

export default Loading;
