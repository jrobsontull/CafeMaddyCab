import { useEffect } from 'react';

import Navbar from '../Navbar';
import Logo from '../Logo';
import Footer from '../Footer';

import EntryPhoto from '../../../assets/img/pressphotos/entry-1.png';
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
            Brooklyn woman pays for cab rides for Asian New Yorkers
          </h2>
          <img src={EntryPhoto} alt="Entry Header" className="entry-img" />
          <div className="entry-details">
            <p className="author">By Arthur Chi&apos;en</p>
            <p className="date">04/05/2021</p>
          </div>
          <div className="press-text">
            <p>
              On social media, Park&apos;s influencer account goes by
              @cafemaddy, featuring a collection of stylish food-related posts.
              Realizing she can opt for a cab while others don&apos;t have the
              option because of their wallets, she started reimbursing people
              for their cab rides with her own money.
            </p>
            <p>
              When some people learned of her generosity, they donated money as
              well. After just two days, she had to stop accepting donations.
            </p>
            <p>
              Park has now set up a separate Instagram account to organize the
              effort: @cafemaddycab. Each night, after she and a couple of
              friends finish their day jobs, they go through submissions that
              come in on a Google form and reimburse rides for Asian women,
              Asian seniors, and Asian members of the LGBTQ community.
            </p>
            <p>
              Gratitude has been rolling in. From seniors who used @cafemaddycab
              to get to a vaccine or doctor&apos;s appointment. From students
              and volunteers finding an ally for their safety at a scary time.
            </p>

            <div className="read-more">
              Finish reading on{' '}
              <a
                href="https://www.fox5ny.com/news/brooklyn-woman-pays-for-cab-rides-for-asian-new-yorkers"
                target="_blank"
                rel="noopener noreferrer"
              >
                FOX5 NY...
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
