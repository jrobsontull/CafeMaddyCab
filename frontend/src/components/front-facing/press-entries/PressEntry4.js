import { useEffect } from 'react';

import Navbar from '../Navbar';
import Logo from '../Logo';
import Footer from '../Footer';

import EntryPhoto from '../../../assets/img/pressphotos/entry-4.jpeg';
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
            &apos;A Sigh Of Relief&apos;: Crowdfunded Cab Rides Aim To Get Asian
            Americans Home Safe
          </h2>
          <img src={EntryPhoto} alt="Entry Header" className="entry-img" />
          <div className="entry-details">
            <p className="author">By Chloee Weiner</p>
            <p className="date">04/09/2021</p>
          </div>
          <div className="press-text">
            <p>
              Lately, Candy has been running to the bus stop on her way home
              from work. The 26 year-old dance instructor said it&apos;s usually
              dark outside by the time she finishes her shift at a studio in San
              Francisco — and she&apos;s started to dread commuting in the
              &quot;pitch black.&quot;
            </p>
            <p>
              Lately, Candy has been running to the bus stop on her way home
              from work. The 26 year-old dance instructor said it&apos;s usually
              dark outside by the time she finishes her shift at a studio in San
              Francisco — and she&apos;s started to dread commuting in the
              &quot;pitch black.&quot;
            </p>
            <p>
              &quot;I usually call my best friend who lives in New York,&quot;
              she said. &quot;I have him on the phone with me while I run to the
              bus stop and shiver, nervously waiting for the bus to come.&quot;
            </p>
            <p>
              Candy, who&apos;s Filipina American and asked that NPR not use her
              full name out of concern that she could be targeted, said the
              recent wave of anti-Asian violence around the Bay Area and
              elsewhere has made her fear for her own safety, especially when
              walking alone in the city.
            </p>
            <p> Now, a new effort is helping to get her home safe.</p>

            <div className="read-more">
              Finish reading on{' '}
              <a
                href="https://www.npr.org/2021/04/09/985698836/a-sigh-of-relief-crowdfunded-cab-rides-aim-to-get-asian-americans-home-safe"
                target="_blank"
                rel="noopener noreferrer"
              >
                NPR...
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
