import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from './Footer';

import Logo from '../../assets/img/logo.svg';

import HowTo1 from '../../assets/img/how_to_1.svg';
import HowTo2 from '../../assets/img/how_to_2.svg';
import HowTo3 from '../../assets/img/how_to_3.svg';
import HowTo4 from '../../assets/img/how_to_4.svg';

import Taxi from '../../assets/img/taxi_icon.svg';
import Arrow from '../../assets/img/arrow_right.svg';

function HowToPage() {
  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content">
        <div className="logo">
          <Link to={'/'}>
            <img src={Logo} alt="Cafe Maddy Cab" />
          </Link>
        </div>
        <div className="info-box how-to" id="no-title">
          <p>
            Thank you for choosing to stay safe. Cafe Maddy Cab is providing cab
            rides for eligible recipients. Uber codes will be emailed every{' '}
            <span>Monday at 8AM</span> for submissions made{' '}
            <span>Monday to Wednesday</span> each week, until codes are
            depleted. Uber has generously donated ride codes to help protect the
            AAPI Community. These voucher codes are reserved for our low-income
            Asian elderly, women, and LGBTQ+ population in NYC, who may not be
            able to afford to take a ride to their essential trips. Once the
            codes are depleted, the form will be closed. Codes will be sent
            while supplies last.
          </p>
        </div>
        <div className="info-box-title">
          <h3>How it works</h3>
        </div>
        <div className="info-box how-to" id="child-2">
          <ul>
            <li>
              <img src={HowTo1} alt="how-to-1" />
              <h3>Eligibility</h3>
              <p>
                Asian female, LGBTQ, elderly pensioner in need of financial aid
                for cab rides
              </p>
            </li>
            <li>
              <img src={HowTo2} alt="how-to-2" />
              <h3>Ride request submission</h3>
              <p>Eligible Asian person fills out request form</p>
            </li>
            <li id="responsive-no-pad">
              <img src={HowTo3} alt="how-to-3" />
              <h3>Verification</h3>
              <p>
                Cafe Maddy Cab volunteer reviews and verifies eligibility, then
                sends Uber / Lyft code weekly
              </p>
            </li>
            <li id="responsive-no-pad">
              <img src={HowTo4} alt="how-to-4" />
              <h3>Ride provided</h3>
              <p id="last-child">
                Recipient activates code through Uber app, gets a ride for
                essential trip
              </p>
            </li>
          </ul>
        </div>
        <div className="info-box-title">
          <h3>Some important notes</h3>
        </div>
        <div className="info-box" id="child-2">
          <ol>
            <li>
              Everyone is eligible for 2 rides per week. Please submit separate
              entries for each ride request.
            </li>
            <li>
              Each code is value of $25. The remaining balance does not roll
              over.
            </li>
            <li>
              We are not responsible for any incidents that may occur on the
              ride (see Terms and Conditions on the next page).
            </li>
          </ol>
        </div>
        <div className="btn-link ride" id="landing-page">
          <div className="icon">
            <img src={Taxi} alt="Taxi" />
          </div>
          <Link to={'/request-ride'}>Request a ride</Link>
          <img className="nav-arrow" src={Arrow} alt="arrow" />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default HowToPage;
