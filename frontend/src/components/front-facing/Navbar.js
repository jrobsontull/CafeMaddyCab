import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [hamOpen, setHamOpen] = useState(false);

  const pageArray = [
    { name: 'How it Works', path: '/how-to-ride' },
    { name: 'Request a Ride', path: '/request-ride' },
    { name: 'Press', path: '/press' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const pageList = pageArray.map((link) => (
    <li key={link.name}>
      <a href={link.path}>{link.name}</a>
    </li>
  ));

  function toggleHamburger(ham) {
    ham.classList.toggle('change-state');
    setHamOpen(!hamOpen);
  }

  return (
    <div className="navbar frontend">
      <div className="header">
        <div className="branding">
          <Link to={"/"} className="cmc">Cafe Maddy Cab</Link>
        </div>

        <div
          className="nav-ham"
          onClick={(e) => {
            toggleHamburger(e.currentTarget);
          }}
        >
          <div className="ham1"></div>
          <div className="ham2"></div>
          <div className="ham3"></div>
        </div>
      </div>
      <div className={hamOpen ? 'nav active' : 'nav'}>
        <ul>{pageList}</ul>
      </div>
    </div>
  );
}

export default Header;
