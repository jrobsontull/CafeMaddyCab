import { Link } from 'react-router-dom';

import Logo from '../assets/img/logo.svg';

function LandingPage() {
  return (
    <div className="react-container">
      <div className="content">
        <div className="logo">
          <img src={Logo} alt="Cafe Maddy Cab" />
        </div>
        <div className="info-box" id="child-1">
          <p>
            Thank you for choosing to stay safe. Cafemaddy CAB is providing cab
            rides for eligible recipients. Uber codes will be emailed every
            Monday at 8AM for submissions made Mon-Wednesday each week, until
            codes are depleted.
          </p>
          <p>
            Uber has generously donated ride codes to help protect the AAPI
            Community. These voucher codes are reserved for our low-income Asian
            Elderly, women, and LGBTQ population in NYC, who may not be able to
            afford to take a ride to their essential trips. once the codes are
            depleted, the form will be closed. Codes will be sent while supplies
            last.
          </p>
        </div>
        <div className="info-box-title">
          <h3>How it works</h3>
        </div>
        <div className="info-box" id="child-2">
          <p>
            Please complete this form to be approved for up to 2 Uber codes per
            week. Here is our eligiblity criteria:
          </p>
          <ul>
            <li>
              eligible if you are an Asian woman, elderly or Part of the LGBTQ
              community in NYC
            </li>
            <li>eligible only for rides within NYC</li>
            <li>eligible for people in financial need</li>
            <li>each Uber code is $25</li>
            <li>people may submit fares on behalf of an Asian elderly</li>
          </ul>
          <p>
            CafemaddyCab is for those who need financial help to take a cab to
            ESSENTIAL trips. If you have a steady income and can afford your
            ride, please reconsider and reserve the rides for those who may have
            financial difficulty affording their ride.
          </p>
        </div>
        <div className="info-box-title">
          <h3>Some important notes</h3>
        </div>
        <div className="info-box" id="child-3">
          <ol>
            <li>
              Everyone is eligible for 2 rides per week. Please submit separate
              entries for each ride request.
            </li>
            <li>
              Each code is value of $25. Remaining balance does not roll over.
            </li>
            <li>
              we are not responsible for any incidents that may occur on the
              ride (see Terms and Conditions)
            </li>
          </ol>
        </div>
        <div className="btn-link submit" id="landing-page">
          <Link to={'/request-ride'}>Request Reimbursment</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
