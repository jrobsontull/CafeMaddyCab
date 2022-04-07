import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../utils/auth.context';

function Header() {
  const { authUser } = useContext(AuthContext);
  const [isHamOpen, setHamOpen] = useState(false);
  const navigate = useNavigate();

  function toggleHamburger(ham) {
    ham.classList.toggle('change-state');
    setHamOpen(!isHamOpen);
  }

  function logoutHandler(ham) {
    //localStorage.removeItem('user');
    authUser();
    //toggleHamburger(ham);
    //navigate('/');
  }

  return (
    <div className="navbar">
      <div className="header">
        <div className="branding">
          <p className="cmc">CAFE MADDY CAB</p>
          <p>&#124;</p>
          <p className="page-name">Ride Dashboard</p>
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
          <li>
            <Link to={'dashboard/how-to-use'}>How to use</Link>
          </li>
          <li>
            <Link to={'dashboard/view-feedback'}>View feedback</Link>
          </li>
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
