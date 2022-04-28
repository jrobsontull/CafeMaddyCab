import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../utils/auth.context';

function Header() {
  const { user, authUser } = useContext(AuthContext);
  const [hamOpen, setHamOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const pageArray = [
    { name: 'Ride Dashboard', path: '/dashboard' },
    {
      name: 'Approve Rides',
      path: '/dashboard/approve-rides/' + user.user._id,
    },
    { name: 'View Feedback', path: '/dashboard/view-feedback' },
    { name: 'How to Use', path: '/dashboard/how-to-use' },
    { name: 'Settings', path: '/dashboard/settings' },
  ];

  const pageName = pageArray.find((elem) => {
    if (
      elem.path === location.pathname ||
      elem.path + '/' === location.pathname
    ) {
      return elem;
    }
  }).name;

  const pageList = pageArray.map((link) => (
    <li key={link.name}>
      <Link to={link.path}>{link.name}</Link>
    </li>
  ));

  function toggleHamburger(ham) {
    ham.classList.toggle('change-state');
    setHamOpen(!hamOpen);
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
      <div className={hamOpen ? 'nav active' : 'nav'}>
        <ul>
          {pageList}
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
