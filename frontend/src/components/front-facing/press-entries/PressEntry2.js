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
            'A Sigh Of Relief': Crowdfunded Cab Rides Aim To Get Asian Americans
            Home Safe
          </div>
          <img src={EntryPhoto} alt="EntryPhoto" />
          <div className="info-box" id="press-entry-content">
            <div className="entry-details">
              <p>By Chloee Weiner</p>
              <p>04/09/2021</p>
            </div>
            Lately, Candy has been running to the bus stop on her way home from
            work. The 26 year-old dance instructor said it&apos;s usually dark
            outside by the time she finishes her shift at a studio in San
            Francisco — and she&apos;s started to dread commuting in the
            &quot;pitch black.&quot;<br></br>
            <br></br>&quot;I usually call my best friend who lives in New
            York,&quot; she said. &quot;I have him on the phone with me while I
            run to the bus stop and shiver, nervously waiting for the bus to
            come.&quot;<br></br>
            <br></br>Candy, who&apos;s Filipina American and asked that NPR not
            use her full name out of concern that she could be targeted, said
            the recent wave of anti-Asian violence around the Bay Area and
            elsewhere has made her fear for her own safety, especially when
            walking alone in the city.<br></br>
            <br></br>
            Now, a new effort is helping to get her home safe.
          </div>
        </div>
        <div className="btn-link">
          <a
            href="https://www.npr.org/2021/04/09/985698836/a-sigh-of-relief-crowdfunded-cab-rides-aim-to-get-asian-americans-home-safe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on npr
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PressEntry;
