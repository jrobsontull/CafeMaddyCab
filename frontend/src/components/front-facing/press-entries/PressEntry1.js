import { useEffect } from 'react';

import Navbar from '../Navbar';
import Logo from '../Logo';
import Footer from '../Footer';

import EntryPhoto from '../../../assets/img/pressphotos/entry-1.jpeg';
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
            Woman raises over $100k in 2 days to pay for Asian Americans' taxi
            rides amid rise in hate crimes
          </h2>
          <img src={EntryPhoto} alt="Entry Header" className="entry-img" />
          <div className="entry-details">
            <p className="author">By Jon Haworth</p>
            <p className="date">04/06/2021</p>
          </div>
          <div className="press-text">
            <p>
              After seeing constant news reports and one shocking video after
              another of the recent spate of hate crimes against Asian Americans
              throughout the country, Maddy Park felt scared.
            </p>
            <p>
              &quot;Last week I took the train [in New York City]. It was a
              30-minute commute and I realized every minute of that commute I
              was terrified. I was scared that any moment in time someone might
              say a racial slur or attack me. Worst of all I thought that if
              something were to happen to me, nobody would stand up,&quot; Park
              told ABC News&apos; New York City station WABC.
            </p>
            <p>
              According to Stop AAPI Hate, a nonprofit organization that tracks
              such incidents, there were more than 3,795 hate incidents --
              including verbal harassment and physical assault -- against Asian
              Americans and Pacific Islanders in the United States from March
              19, 2020 to Feb. 28, 2021.
            </p>
            <p>This got her thinking.</p>

            <div className="read-more">
              Finish reading on{' '}
              <a
                href="https://abcnews.go.com/US/woman-raises-100k-days-pay-asian-americans-taxi/story?id=76895475"
                target="_blank"
                rel="noopener noreferrer"
              >
                ABC News...
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
