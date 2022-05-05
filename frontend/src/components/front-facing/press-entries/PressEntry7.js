import { useEffect } from 'react';

import Navbar from '../Navbar';
import Logo from '../Logo';
import Footer from '../Footer';

import EntryPhoto from '../../../assets/img/pressphotos/entry-7.jpeg';
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
            Cafe Maddy Cab: Program that pays cab fares for NYC AAPIs vulnerable
            to hate crimes relaunches
          </h2>
          <img src={EntryPhoto} alt="Entry Header" className="entry-img" />
          <div className="entry-details">
            <p className="author">By Celine Pun</p>
            <p className="date">05/03/2022</p>
          </div>
          <div className="press-text">
            <p>
              Food influencer Madeline Park relaunched her Cafe Maddy Cab
              program on Sunday to raise funds for anti-Asian hate crime
              prevention.
            </p>
            <p>
              In April 2021, the Korean American content creator developed Cafe
              Maddy Cab on Instagram to pay for cab fares for people who were at
              risk of being targeted by anti-Asian hate crimes in New York City,
              including seniors, women and LGBTQ-plus individuals. With a team
              of 25 volunteers and in collaboration with former tech company
              Stimulus, they raised $100,00 overnight and another $150,000 over
              the next three months from 4,016 donors. Cafe Maddy Cab also
              received support from Lyft and Uber to pay for 7,842 cab fares.
            </p>
            <p>
              Park eventually shut down the organization officially just a few
              months later on June 17 last year.
            </p>
            <div className="read-more">
              Finish reading on{' '}
              <a
                href="https://nextshark.com/cafe-maddy-cab-program-that-pays-cab-fares-for-nyc-aapis-vulnerable-to-hate-crimes-relaunches/?utm_campaign=later-linkinbio-nextshark&utm_content=later-26584294&utm_medium=social&utm_source=linkin.bio"
                target="_blank"
                rel="noopener noreferrer"
              >
                NextShark...
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
