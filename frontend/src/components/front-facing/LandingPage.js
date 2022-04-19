import { useEffect } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

import Logo from '../../assets/img/logo.svg';
import Donate from '../../assets/img/donate_icon.svg';
import DonateBlue from '../../assets/img/donate_icon_blue.svg';
import Taxi from '../../assets/img/taxi_icon.svg';
import InfoBlue from '../../assets/img/info_icon_blue.svg';
import MissionPhoto from '../../assets/img/landing-page-thumb-1.png';
import QuotePhoto from '../../assets/img/landing-page-thumb-2.png';
import Arrow from '../../assets/img/arrow_right_blue.svg';

function LandingPage() {
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
        <div className="btn-link donate" id="landing-page">
          <a
            href="https://www.gofundme.com/f/cafemaddycab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="icon">
              <img src={Donate} alt="Donate" />
            </div>
            Donate
          </a>
        </div>
        <div className="btn-link" id="landing-page">
          <a href="/request-ride">
            <div className="icon">
              <img src={Taxi} alt="Taxi" />
            </div>
            Request a Ride
          </a>
        </div>
        <div className="btn-link-invert" id="landing-page">
          <a href="/how-to-ride">
            <div className="icon">
              <img src={InfoBlue} alt="InfoBlue" />
            </div>
            How it Works
          </a>
        </div>

        <div className="mission">
          <div className="photo">
            <img src={MissionPhoto} alt="MissionPhoto" />
          </div>
          <div className="text">
            <p>Our Mission</p>
            <h1>Help our AAPI community feel safe with their NYC commute</h1>
            <a
              className="mission-donate"
              href="https://www.gofundme.com/f/cafemaddycab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={DonateBlue} alt="DonateBlue" />
              <p>Donate</p>
              <img src={Arrow} alt="Arrow" />
            </a>
          </div>
        </div>
        <h1 className="landing-heading">What is Cafe Maddy Cab?</h1>
        <div className="info-box" id="no-title">
          <p>
            Cafe Maddy Cab is an initiative that provides cab rides for the
            vulnerable Asian population in the NYC area, specifically at risk of
            Asian hate crimes. Our mission is to help our AAPI community feel
            safe in their commute in NYC. We are here for as long as we need
            hoping that soon we can close this initiative out as soon as
            possible.
          </p>
        </div>
        <div className="quote">
          <div className="text">
            <h1>
              Every time I see it, I can't help but think that "that could've
              been me"
            </h1>
            <p>Madeline Park, Founder</p>
          </div>
          <div className="photo">
            <img src={QuotePhoto} alt="QuotePhoto" />
          </div>
        </div>
        <h1 className="landing-heading">Why we&apos;re here</h1>
        <div className="info-box" id="no-title">
          <p>
            &quot;It&apos;s really terrifying. Every time I see it, I can&apos;t
            help but think that, that could&apos;ve been me&quot; says Madeline
            Park, the founder of Cafe Maddy Cab.
          </p>
          <p>
            If you&apos;re an Asian living in this city, we&apos;ve all felt the
            same way—seeing all the news and headlines about the anti-Asian hate
            crimes, we feel fearful to ride the subway. So Maddy, aka @cafemaddy
            founded Cafe Maddy Cab to make cab rides accessible to those who are
            in need, but for people who can&apos;t afford it.
          </p>
          <p>
            From April 2021 what began as a one person&apos;s effort to offer
            taxi rides became a widespread crowdfunded program, and with the
            total fundraised amount of more than $250,000, Cafe Maddy Cab paid
            for over <span>7800 essential rides</span> for Asian Women, LGBTQ,
            and Elderly folks of NYC. Cafe Maddy Cab service shut down last year
            after depleting the fund thinking it wouldn&apos;t be needed and the
            city felt safer. But with the recent rise in anti-Asian hate crimes
            in 2022, we felt the need to relaunch Cafe Maddy Cab.
          </p>
        </div>
        <h1 className="landing-heading">
          <a href="/press">Press</a>
        </h1>
        <div className="press-entry-landing" id="first-child">
          <div className="info-box" id="press">
            This is an example press title 1
          </div>
          <div className="info-box" id="press-pic"></div>
        </div>
        <div className="press-entry-landing">
          <div className="info-box" id="press">
            This is an example press title 2
          </div>
          <div className="info-box" id="press-pic"></div>
        </div>
        <div className="press-entry-landing">
          <div className="info-box" id="press">
            This is an example press title 3
          </div>
          <div className="info-box" id="press-pic"></div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
