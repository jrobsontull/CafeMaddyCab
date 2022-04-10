import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/img/logo.svg';
import Donate from '../../assets/img/donate_icon.svg';
import Taxi from '../../assets/img/taxi_icon.svg';
import Arrow from '../../assets/img/arrow_right.svg';
import Insta from '../../assets/img/insta_icon.svg';
import Share from '../../assets/img/share_icon.svg';

function LandingPage() {
  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content">
        <div className="logo">
          <Link to={'/'}>
            <img src={Logo} alt="Cafe Maddy Cab" />
          </Link>
        </div>
        <div className="info-box-title">
          <h3>What is Cafe Maddy Cab?</h3>
        </div>
        <div className="info-box" id="child-1">
          <p>
            Cafe Maddy Cab is an initiative that provides cab rides for the
            vulnerable Asian population in the NYC area, specifically at risk of
            Asian hate crimes. Our mission is to help our AAPI community feel
            safe in their commute in NYC. We are here for as long as we need
            hoping that soon we can close this initiative out as soon as
            possible.
          </p>
        </div>
        <div className="info-box-title">
          <h3>Why we&apos;re here</h3>
        </div>
        <div className="info-box" id="child-2">
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
        <div className="btn-link donate" id="landing-page">
          <div className="icon">
            <img src={Donate} alt="Donate" />
          </div>
          <a href="https://www.donate.com">Donate to the cause</a>
          <img className="nav-arrow" src={Arrow} alt="arrow" />
        </div>
        <div className="btn-link learn" id="landing-page">
          <div className="icon">
            <img src={Taxi} alt="Taxi" />
          </div>
          <Link to={'/how-to-ride'}>Learn how to get a ride</Link>
          <img className="nav-arrow" src={Arrow} alt="arrow" />
        </div>
        <div className="footer">
          <ul>
            <li>
              <a href="https://www.instagram.com/cafemaddycab/">
                <img src={Insta} alt="Instagram" />
                <p>@cafemaddycab</p>
              </a>
            </li>
            <li>
              <img src={Share} alt="Share" />
              <p>Share</p>
            </li>
          </ul>
          <p>
            All donations are a tax-deductible contribution to Cafe Maddy Cab.
            Cafe Maddy Cab is a 501(c)(3) tax-exempt organisation for both
            federal and state purposes. Federal tax ID: XX-XXXXXXX.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
