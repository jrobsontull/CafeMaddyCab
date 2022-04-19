import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

import Logo from '../../assets/img/logo.svg';

function PressPage() {
  const navigate = useNavigate();

  // set API call to retrieve all Press entries
  // entry fields: id, title, text, image, author, date
  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />

        <div className="title-logo">
          <div className="logo">
            <img src={Logo} alt="Cafe Maddy Cab" />
          </div>
          <div className="cmc-title">
            <h1>Cafe Maddy Cab</h1>
            <p>NYC cab rides for Asian women, LGBTQ+ and elderly in need</p>
          </div>
        </div>
        <hr />
        <h1 className="landing-heading">
          <a href="/press-page">Press</a>
        </h1>
        <div className="press-entry-landing" id="first-child">
          <div className="info-box" id="press">
            This is an example press title 1
          </div>
          <div className="info-box" id="press-pic"></div>
        </div>
        <div className="press-entry-landing">
          <div className="info-box" id="press">
            This is an example press title 2
          </div>
          <div className="info-box" id="press-pic"></div>
        </div>
        <div className="press-entry-landing">
          <div className="info-box" id="press">
            This is an example press title 3
          </div>
          <div className="info-box" id="press-pic"></div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default PressPage;
