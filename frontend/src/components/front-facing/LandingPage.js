// Module imports
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Component imports
import Navbar from './Navbar';
import Logo from './Logo';
import Footer from './Footer';

// Photo imports
import Donate from '../../assets/img/donate_icon.svg';
import DonateBlue from '../../assets/img/donate_icon_blue.svg';
import Taxi from '../../assets/img/taxi_icon.svg';
import Info from '../../assets/img/info_icon.svg';
import MissionPhoto from '../../assets/img/landing-page-thumb-1.png';
import QuotePhoto from '../../assets/img/landing-page-thumb-2.png';
import Arrow from '../../assets/img/arrow_right_blue.svg';
import Entry1 from '../../assets/img/pressphotos/entry-1.jpeg';
import Entry2 from '../../assets/img/pressphotos/entry-2.jpeg';
import Entry3 from '../../assets/img/pressphotos/entry-3.jpeg';

function LandingPage() {
  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content frontend landing-page">
        <Navbar />
        <Logo />

        <div className="line-break"></div>

        <div className="big-btns">
          <div className="btn-link" id="landing-page">
            <a
              href="https://www.gofundme.com/f/cafemaddycab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Donate} alt="Donate" className="icon" />
              <div className="text">Donate</div>
            </a>
          </div>
          <div className="btn-link" id="landing-page">
            <Link to={'/request-ride'}>
              <img src={Taxi} alt="Taxi" className="icon" />
              <div className="text">Request a Ride</div>
            </Link>
          </div>
          <div className="btn-link inverted" id="landing-page">
            <a href="/how-to-ride">
              <img src={Info} alt="Info" className="icon" />
              <div className="text">How it works</div>
            </a>
          </div>
        </div>

        <div className="picture-block">
          <img src={MissionPhoto} alt="MissionPhoto" />
          <div className="info">
            <p>Our Mission</p>
            <h1>Help our AAPI community feel safe with their NYC commute</h1>
            <a
              href="https://www.gofundme.com/f/cafemaddycab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={DonateBlue} alt="Donate" className="donate" />
              <p>Donate</p>
              <img src={Arrow} alt="Arrow" className="link-arrow" />
            </a>
          </div>
        </div>

        <h1 className="info-box-heading">What is Cafe Maddy Cab?</h1>
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
        <h1 className="info-box-heading">Why we&apos;re here</h1>
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
        <h1 className="info-box-heading">
          <Link to={'/press'}>Press</Link>
        </h1>
        <a className="press-page-entry" href="/press/1">
          <div className="press-page-pic">
            <img src={Entry1} alt="Entry 1" />
          </div>
          <div className="info-box" id="press-page-title">
            Woman raises over $100k in 2 days to pay for Asian Americans' taxi
            rides amid rise in hate crimes
          </div>
        </a>
        <a className="press-page-entry" href="/press/2">
          <div className="press-page-pic">
            <img src={Entry2} alt="Entry 2" />
          </div>
          <div className="info-box" id="press-page-title">
            'A Sigh Of Relief': Crowdfunded Cab Rides Aim To Get Asian Americans
            Home Safe
          </div>
        </a>
        <a className="press-page-entry" href="/press/3">
          <div className="press-page-pic">
            <img src={Entry3} alt="Entry 3" />
          </div>
          <div className="info-box" id="press-page-title">
            Brooklyn Woman Raises Over $100,000 to Provide Free Cab Rides for
            Asian Americans
          </div>
        </a>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
