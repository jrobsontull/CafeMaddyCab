import { useEffect, useState } from 'react';
import FeedbackAPI from '../../utils/feedback.api';

import Navbar from './Navbar';

function FeedbackTable() {

  useEffect(() => {
    FeedbackAPI.getFeedback().then((response) => {
      console.log(response.entries);
    });
  }, []);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />
        <div className="dashboard">
        THIS IS A PLACEHOLDER
        </div>
      </div>
    </div>

  );
}

export default FeedbackTable;
