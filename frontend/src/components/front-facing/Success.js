import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import Tick from '../../assets/img/success_tick.svg';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Footer />
      </div>
    </div>
  );
}

export default Success;
