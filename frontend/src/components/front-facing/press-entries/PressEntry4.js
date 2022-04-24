import { useEffect } from 'react';

import Navbar from '../Navbar';
import Logo from '../Logo';
import Footer from '../Footer';

import EntryPhoto from '../../../assets/img/pressphotos/entry-5.jpeg';
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
            How Crowdfunded Cabs Became A Beacon Of Hope In The Fight Against
            AAPI Violence
          </h2>
          <img src={EntryPhoto} alt="Entry Header" className="entry-img" />
          <div className="entry-details">
            <p className="author">By Rose Minutaglio</p>
            <p className="date">04/05/2021</p>
          </div>
          <div className="press-text">
            <p>
              After her grandmother passed away in January, Ivana Xie has been
              keeping her 96-year-old grandfather company on weekends. She picks
              up dim sum, and they spend hours playing very competitive games of
              mahjong. Xie used to feel full—both in heart and stomach—after
              leaving his apartment in the heart of New York City&apos;s
              Chinatown. Now she just feels anxious.
            </p>
            <p>
              Two months ago, an Asian man was stabbed by a stranger two blocks
              from where Xie&apos;s grandfather has lived since coming to the
              U.S. from China 30 years ago.&quot;I hate that I'm scared,&quot;
              Xie, 21, tells ELLE.com. &quot;But it's true, I&apos;m
              terrified.&quot;
            </p>

            <div className="read-more">
              Finish reading on{' '}
              <a
                href="https://www.elle.com/culture/career-politics/a36289304/crowdfund-cabs-fight-against-aapi-violence/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Elle...
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
