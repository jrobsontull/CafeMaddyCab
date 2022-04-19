import { useEffect } from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';

import Logo from '../../../assets/img/logo.svg';
import EntryPhoto from '../../../assets/img/pressphotos/entry-1.jpeg';

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
            Brooklyn woman pays for cab rides for Asian New Yorkers
          </div>
          <img src={EntryPhoto} alt="EntryPhoto" />
          <div className="info-box" id="press-entry-content">
            <div className="entry-details">
              <p>By Arthur Chi&apos;en</p>
              <p>04/05/2021</p>
            </div>
            On social media, Park&apos;s influencer account goes by @cafemaddy,
            featuring a collection of stylish food-related posts. Realizing she
            can opt for a cab while others don&apos;t have the option because of
            their wallets, she started reimbursing people for their cab rides
            with her own money. <br></br> <br></br>When some people learned of
            her generosity, they donated money as well. After just two days, she
            had to stop accepting donations. <br></br> <br></br>Park has now set
            up a separate Instagram account to organize the effort:
            @cafemaddycab. Each night, after she and a couple of friends finish
            their day jobs, they go through submissions that come in on a Google
            form and reimburse rides for Asian women, Asian seniors, and Asian
            members of the LGBTQ community. <br></br> <br></br>Gratitude has
            been rolling in. From seniors who used @cafemaddycab to get to a
            vaccine or doctor&apos;s appointment. From students and volunteers
            finding an ally for their safety at a scary time.
          </div>
        </div>
        <div className="btn-link">
          <a
            href="https://www.fox5ny.com/news/brooklyn-woman-pays-for-cab-rides-for-asian-new-yorkers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on Fox5 NY
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PressEntry;
