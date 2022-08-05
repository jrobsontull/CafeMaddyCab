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
          be open each week from Monday to Wednesday, until codes are depleted.
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
          or any donate button throughout the website. This will lead you to our
          GoFundMe page where you can make a contribution!
        </div>

        <div className="info-box-title">
          <h3>Who is eligible?</h3>
        </div>
        <div className="info-box">
          Low-income Asian women, LGBTQ+ and elderly who are in need of
          financial support for an Uber ride, for their safety.
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
          For instructions on the ride request process, visit our{' '}
          <Link to={'/how-to-ride'}>How it Works</Link> page. To request a ride,
          please visit our <Link to={'/request-ride'}>Request a Ride</Link>{' '}
          page.
        </div>

        <div className="info-box-title">
          <h3>
            Can I request a ride for my elderly parents, neighbor or friend?
          </h3>
        </div>
        <div className="info-box">
          Absolutely! In addition to your ride, you are eligible to request ride
          coupons for Asian elderly people.
        </div>

        <div className="info-box-title">
          <h3>How soon will I get my ride coupon after I submit a request?</h3>
        </div>
        <div className="info-box">
          The ride coupons will be sent via email every Monday morning.
        </div>

        <div className="info-box-title">
          <h3>How will I know if my ride request is accepted?</h3>
        </div>
        <div className="info-box">
          If your ride request is accepted, you will receive an email with the
          ride coupon on the following Monday morning.
        </div>

        <div className="info-box-title">
          <h3>Why wasn&apos;t my ride request accepted?</h3>
        </div>
        <div className="info-box">
          After review by our team of volunteers, your ride request did not meet
          our eligibility requirements. Please refer to the{' '}
          <Link to={'/how-to-ride'}>How it Works</Link> page for more details.
        </div>

        <div className="info-box-title">
          <h3>Why didn&apos;t I receive a code?</h3>
        </div>
        <div className="info-box">
          If you met all of our eligibility critera, please note that we have
          limited stocks of codes until we secure further funding. Codes are
          currently limited to one $20 voucher per person per week. We are only
          distributiung 100 codes per week on a first come, first served basis.
          Thank you for your patience.
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Faq;
