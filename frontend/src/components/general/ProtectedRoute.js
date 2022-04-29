import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../utils/auth.context';
import PropTypes from 'prop-types';

import Loading from '../general/Loading';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user.isVerifying) {
    return <Loading />;
  }

  if (user.verified === false) {
    return <Navigate to="/" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
