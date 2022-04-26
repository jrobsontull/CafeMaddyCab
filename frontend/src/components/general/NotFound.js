import { Link } from 'react-router-dom';

import Navbar from '../front-facing/Navbar';
import Footer from '../front-facing/Footer';

import CMCLogo from '../../assets/img/logo.svg';

function NotFound() {
  return (
    <div className="react-container">
      <div className="content frontend not-found">
        <Navbar />
        <div className="title-logo">
          <img src={CMCLogo} alt="Cafe Maddy Cab" />
        </div>
        <div className="message">
          <h1>404</h1>
          <p>
            An error occured, this page was not found. Click{' '}
            <Link to={'/'}>here</Link> to go back to our home page.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default NotFound;
