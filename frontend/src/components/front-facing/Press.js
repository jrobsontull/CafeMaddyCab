import { useEffect } from 'react';

import Navbar from './Navbar';
import Logo from './Logo';
import Footer from './Footer';

import Entry1 from '../../assets/img/pressphotos/entry-1.jpeg';
import Entry2 from '../../assets/img/pressphotos/entry-2.jpeg';
import Entry3 from '../../assets/img/pressphotos/entry-3.jpeg';
import Entry4 from '../../assets/img/pressphotos/entry-4.jpeg';
import Entry5 from '../../assets/img/pressphotos/entry-5.jpeg';
import Entry6 from '../../assets/img/pressphotos/entry-6.jpeg';

function Press() {
  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />
        <Logo />
        <div className="line-break"></div>

        <h1 className="press-heading">Press</h1>
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
        <a className="press-page-entry" href="/press/4">
          <div className="press-page-pic">
            <img src={Entry4} alt="Entry 4" />
          </div>
          <div className="info-box" id="press-page-title">
            How Crowdfunded Cabs Became A Beacon Of Hope In The Fight Against
            AAPI Violence
          </div>
        </a>
        <a className="press-page-entry" href="/press/5">
          <div className="press-page-pic">
            <img src={Entry5} alt="Entry 5" />
          </div>
          <div className="info-box" id="press-page-title">
            Brooklyn woman pays for cab rides for Asian New Yorkers
          </div>
        </a>
        <a className="press-page-entry" href="/press/6">
          <div className="press-page-pic">
            <img src={Entry6} alt="Entry 6" />
          </div>
          <div className="info-box" id="press-page-title">
            快看世界／害怕坐紐約地鐵？亞裔搭出租車 她幫您報銷
          </div>
        </a>

        <Footer />
      </div>
    </div>
  );
}

export default Press;
