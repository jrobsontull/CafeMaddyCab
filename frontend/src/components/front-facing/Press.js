import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Logo from './Logo';
import Footer from './Footer';

import Entry1 from '../../assets/img/pressphotos/entry-1.jpeg';
import Entry2 from '../../assets/img/pressphotos/entry-2.jpeg';
import Entry3 from '../../assets/img/pressphotos/entry-3.jpeg';
import Entry4 from '../../assets/img/pressphotos/entry-4.jpeg';
import Entry5 from '../../assets/img/pressphotos/entry-5.jpeg';
import Entry6 from '../../assets/img/pressphotos/entry-6.jpeg';
import Entry7 from '../../assets/img/pressphotos/entry-7.jpeg';

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

        <h2 className="info-box-heading">Press</h2>

        <div className="entries">
          <Link to={'/press/7'} className="press-thumb">
            <img className="thumb" src={Entry7} alt="Entry 7" />
            <p className="author">NextShark</p>
            <h3 className="title">
              Cafe Maddy Cab: Program that pays cab fares for NYC AAPIs
              vulnerable to hate crimes relaunches
            </h3>
          </Link>

          <Link to={'/press/1'} className="press-thumb">
            <img className="thumb" src={Entry1} alt="Entry 1" />
            <p className="author">ABCNEWS</p>
            <h3 className="title">
              Woman raises over $100k in 2 days to pay for Asian Americans&apos;
              taxi rides amid rise in hate crimes
            </h3>
          </Link>

          <Link to={'/press/2'} className="press-thumb">
            <img className="thumb" src={Entry2} alt="Entry 2" />
            <p className="author">NPR</p>
            <h3 className="title">
              &apos;A Sigh Of Relief&apos;: Crowdfunded Cab Rides Aim To Get
              Asian Americans Home Safe
            </h3>
          </Link>

          <Link to={'/press/3'} className="press-thumb">
            <img className="thumb" src={Entry3} alt="Entry 3" />
            <p className="author">COMPLEX</p>
            <h3 className="title">
              Brooklyn Woman Raises Over $100,000 to Provide Free Cab Rides for
              Asian Americans
            </h3>
          </Link>

          <Link to={'/press/4'} className="press-thumb">
            <img className="thumb" src={Entry4} alt="Entry 4" />
            <p className="author">ELLE</p>
            <h3 className="title">
              How Crowdfunded Cabs Became A Beacon Of Hope In The Fight Against
              AAPI Violence
            </h3>
          </Link>

          <Link to={'/press/5'} className="press-thumb">
            <img className="thumb" src={Entry5} alt="Entry 5" />
            <p className="author">FOX5 NY</p>
            <h3 className="title">
              Brooklyn woman pays for cab rides for Asian New Yorkers
            </h3>
          </Link>

          <Link to={'/press/6'} className="press-thumb">
            <img className="thumb" src={Entry6} alt="Entry 6" />
            <p className="author">世界日報</p>
            <h3 className="title">
              快看世界／害怕坐紐約地鐵？亞裔搭出租車 她幫您報銷
            </h3>
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Press;
