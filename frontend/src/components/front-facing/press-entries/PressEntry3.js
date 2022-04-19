import { useEffect } from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';

import Logo from '../../../assets/img/logo.svg';
import EntryPhoto from '../../../assets/img/pressphotos/entry-3.jpeg';

function PressEntry() {
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
        <div className="press-entry">
          <div className="info-box" id="press-entry-title">
            Brooklyn Woman Raises Over $100,000 to Provide Free Cab Rides for
            Asian Americans
          </div>
          <img src={EntryPhoto} alt="EntryPhoto" />
          <div className="info-box" id="press-entry-content">
            <div className="entry-details">
              <p>By Joshua Espinoza</p>
              <p>04/06/2021</p>
            </div>
            Violent crimes against Asian Americans have dramatically surged over
            the past year, particularly in metropolitan areas like San Francisco
            and New York City. The disturbing incidents have understandably
            ignited fear throughout the nation, so much so that many AAPIs have
            been hesitant to take public transportation, fearing they may be
            targeted in a racist or xenophobic attack.
          </div>
        </div>
        <div className="btn-link">
          <a
            href="https://www.complex.com/life/brooklyn-woman-launches-fundraiser-to-cover-cab-fare-for-asian-americans"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on Complex
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PressEntry;
