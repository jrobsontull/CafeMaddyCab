import { useEffect } from 'react';

import Navbar from '../Navbar';
import Logo from '../Logo';
import Footer from '../Footer';

import EntryPhoto from '../../../assets/img/pressphotos/entry-3.jpeg';
import DonateWhite from '../../../assets/img/donate_icon_white.svg';

function PressEntry() {
  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />
        <Logo />

        <div className="press-entry">
          <h2 className="title">
            Brooklyn Woman Raises Over $100,000 to Provide Free Cab Rides for
            Asian Americans
          </h2>
          <img src={EntryPhoto} alt="Entry Header" className="entry-img" />
          <div className="entry-details">
            <p className="author">By Joshua Espinoza</p>
            <p className="date">04/06/2021</p>
          </div>
          <div className="press-text">
            <p>
              Violent crimes against Asian Americans have dramatically surged
              over the past year, particularly in metropolitan areas like San
              Francisco and New York City. The disturbing incidents have
              understandably ignited fear throughout the nation, so much so that
              many AAPIs have been hesitant to take public transportation,
              fearing they may be targeted in a racist or xenophobic attack.
            </p>

            <div className="read-more">
              Finish reading on{' '}
              <a
                href="https://www.complex.com/life/brooklyn-woman-launches-fundraiser-to-cover-cab-fare-for-asian-americans"
                target="_blank"
                rel="noopener noreferrer"
              >
                Complex...
              </a>
            </div>
          </div>
        </div>
        <div className="btn-link" id="landing-page">
          <a
            href="https://www.gofundme.com/f/cafemaddycab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={DonateWhite} alt="Donate" className="icon" />
            <div className="text">Donate</div>
          </a>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default PressEntry;
