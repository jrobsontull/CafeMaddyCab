import { useEffect } from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';

import Logo from '../../../assets/img/logo.svg';
import EntryPhoto from '../../../assets/img/pressphotos/entry-4.jpeg';

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
            How Crowdfunded Cabs Became A Beacon Of Hope In The Fight Against
            AAPI Violence
          </div>
          <img src={EntryPhoto} alt="EntryPhoto" />
          <div className="info-box" id="press-entry-content">
            <div className="entry-details">
              <p>By Rose Minutaglio</p>
              <p>04/05/2021</p>
            </div>
            fter her grandmother passed away in January, Ivana Xie has been
            keeping her 96-year-old grandfather company on weekends. She picks
            up dim sum, and they spend hours playing very competitive games of
            mahjong. Xie used to feel full—both in heart and stomach—after
            leaving his apartment in the heart of New York City&apos;s
            Chinatown. Now she just feels anxious.<br></br>
            <br></br>Two months ago, an Asian man was stabbed by a stranger two
            blocks from where Xie&apos;s grandfather has lived since coming to
            the U.S. from China 30 years ago.&quot;I hate that I'm scared,&quot;
            Xie, 21, tells ELLE.com. &quot;But it's true, I&apos;m
            terrified.&quot;
          </div>
        </div>
        <div className="btn-link">
          <a
            href="https://www.elle.com/culture/career-politics/a36289304/crowdfund-cabs-fight-against-aapi-violence/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on Elle
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PressEntry;
