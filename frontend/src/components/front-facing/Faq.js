import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

import CMCLogo from '../../assets/img/logo.svg';

function Faq() {
  return (
    <div className="react-container">
      <div className="content frontend faq">
        <Navbar />

        <div className="title-logo">
          <img src={CMCLogo} alt="Cafe Maddy Cab" />
        </div>

        <h1 className="page-title-no-logo" id="faq">
          Frequently Asked Questions
        </h1>
        <div className="info-box-title">
          <h3>When can I request a ride?</h3>
        </div>
        <div className="info-box">
          We will be taking ride submissions starting Monday 5/16! The form will
          be open each week from Mondays to Wednesdays, until codes are
          depleted.
        </div>

        <div className="info-box-title">
          <h3>How do I donate?</h3>
        </div>
        <div className="info-box">
          Click{' '}
          <a
            href="https://www.gofundme.com/f/cafemaddycab"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{' '}
          or any &quot;Donate&quot; button throughout the website. You will be
          led to the GoFundMe page where you can make your contribution!
        </div>

        <div className="info-box-title">
          <h3>Who is eligible?</h3>
        </div>
        <div className="info-box">
          Low-income Asian LGBTQ+, Women, and elderly people who need financial
          support for an Uber ride for their safety.
        </div>

        <div className="info-box-title">
          <h3>Where can I take the ride?</h3>
        </div>
        <div className="info-box">
          Anywhere within the five boroughs of NYC.
        </div>

        <div className="info-box-title">
          <h3>How do I get a ride?</h3>
        </div>
        <div className="info-box">
          For instructions and details, visit the{' '}
          <Link to={'/how-to-ride'}>&quot;How it Works&quot;</Link> page. To
          fill out the Ride Request Form, visit the{' '}
          <Link to={'/request-ride'}>&quot;Request a Ride&quot;</Link> page.
        </div>

        <div className="info-box-title">
          <h3>
            Can I request a ride for my elderly parents, neighbor or friend?
          </h3>
        </div>
        <div className="info-box">
          Absolutely! In addition to your ride, you are eligible to request ride
          codes for Asian Elderly people.
        </div>

        <div className="info-box-title">
          <h3>How soon can I get the ride after I submit a ride request?</h3>
        </div>
        <div className="info-box">
          The ride codes will be sent via email every Monday mornings.
        </div>

        <div className="info-box-title">
          <h3>How will I know if my ride request gets accepted?</h3>
        </div>
        <div className="info-box">
          If your ride request gets accepted, you will receive an email with the
          ride code on the following Monday morning.
        </div>

        <div className="info-box-title">
          <h3>Why wasn&apos;t my ride request accepted?</h3>
        </div>
        <div className="info-box">
          After review, your ride request did not meet the eligibility
          requirements. Please refer to the{' '}
          <Link to={'/how-to-ride'}>&quot;How it Works&quot;</Link> section of
          our website for more details.
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Faq;
