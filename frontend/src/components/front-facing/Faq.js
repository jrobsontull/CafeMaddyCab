import Navbar from './Navbar';
import Footer from './Footer';

import CMCLogo from '../../assets/img/logo.svg';

function FAQ() {
  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />

        <div className="title-logo">
          <img src={CMCLogo} alt="Cafe Maddy Cab" />
        </div>

        <h1 className="page-title-no-logo" id="faq">
          Frequently Asked Questions
        </h1>
        <div className="info-box-title">
          <h3>Who is Eligible?</h3>
        </div>
        <div className="info-box">
          Low-income Asian LGBTQ, Women, and Elderly people who need financial
          support for an Uber ride for their safety.
        </div>

        <div className="info-box-title">
          <h3>Where can I take the ride?</h3>
        </div>
        <div className="info-box">Anywhere within NYC.</div>

        <div className="info-box-title">
          <h3>How do I get a ride?</h3>
        </div>
        <div className="info-box">
          For instructions and details, visit the &quot;How it Works&quot; page.
          To fill out the Ride Request & Reimbursement Form, visit the
          &quot;Request a Ride&quot; page.
        </div>

        <div className="info-box-title">
          <h3>How do I donate?</h3>
        </div>
        <div className="info-box">
          Click on any &quot;Donate&quot; button throughout the website. You
          will be led to the GoFundMe page where you can make your contribution!
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
          The ride codes will be sent via email every Monday Morning each week.
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default FAQ;
