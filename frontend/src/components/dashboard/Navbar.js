import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../utils/auth.context';

function Header() {
  const { authUser } = useContext(AuthContext);
  const [isHamOpen, setHamOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const linkArray = [
    {name: 'Ride Dashboard', path: '/dashboard'},
    {name: 'How to Use', path: '/how-to-use'},
    {name: 'View Feedback', path: '/view-feedback'},
  ];
  const pageName = linkArray.find( ({path}) => path === location.pathname).name;
  const listLink = linkArray.filter( ({path}) => path !== location.pathname).map((link) => 
    <li key={link.name}>
      <Link to={link.path}>{link.name}</Link>
    </li>
  );

  function toggleHamburger(ham) {
    ham.classList.toggle('change-state');
    setHamOpen(!isHamOpen);
  }

  function logoutHandler(ham) {
    localStorage.removeItem('user');
    authUser();
    toggleHamburger(ham);
    navigate('/');
  }

  return (
    <div className="navbar">
      <div className="header">
        <div className="branding">
          <p className="cmc">CAFE MADDY CAB</p>
          <p>&#124;</p>
          <p className="page-name">{pageName}</p>
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
      <div className={isHamOpen ? 'nav active' : 'nav'}>
        <ul>
          {listLink}
          <li onClick={(e) => logoutHandler(e.currentTarget)}>
            <p>Logout</p>
            <div className="logout-icon"></div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
