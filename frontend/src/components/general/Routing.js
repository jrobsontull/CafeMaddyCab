import { Routes, Route } from 'react-router-dom';
import useGA from '../../utils/analytics';

// Front-facing component imports
import LandingPage from '../front-facing/LandingPage';
import HowToPage from '../front-facing/HowTo';
import RequestRide from '../front-facing/RequestRide';
import Press from '../front-facing/Press';
import Success from '../front-facing/Success';
import TermsAndConditions from '../front-facing/TermsAndConditions';

// Backend component imports
import Login from '../dashboard/Login';
import Dashboard from '../dashboard/Dashboard';
import Feedback from '../dashboard/Feedback';
import ApproveRides from '../dashboard/ApproveRides';
import Settings from '../dashboard/Settings';

// Protected routing
import ProtectedRoute from './ProtectedRoute';

// Press entries
import PressEntry1 from '../front-facing/press-entries/PressEntry1';
import PressEntry2 from '../front-facing/press-entries/PressEntry2';
import PressEntry3 from '../front-facing/press-entries/PressEntry3';
import PressEntry4 from '../front-facing/press-entries/PressEntry4';
import PressEntry5 from '../front-facing/press-entries/PressEntry5';
import PressEntry6 from '../front-facing/press-entries/PressEntry6';

function Routing() {
  // Enable Google Analytics in production
  if (process.env.NODE_ENV === 'production') {
    useGA();
  }

  return (
    <Routes>
      <Route path={'/'} element={<LandingPage />} />
      <Route path={'/how-to-ride'} element={<HowToPage />} />
      <Route path={'/request-ride'} element={<RequestRide />} />
      <Route path={'/press'} element={<Press />} />
      <Route path={'/terms-and-conditions'} element={<TermsAndConditions />} />
      <Route path={'/success/:id'} element={<Success />} />
      <Route path={'/login'} element={<Login />} />

      <Route path={'/press/1'} element={<PressEntry1 />} />
      <Route path={'/press/2'} element={<PressEntry2 />} />
      <Route path={'/press/3'} element={<PressEntry3 />} />
      <Route path={'/press/4'} element={<PressEntry4 />} />
      <Route path={'/press/5'} element={<PressEntry5 />} />
      <Route path={'/press/6'} element={<PressEntry6 />} />

      <Route
        path={'/dashboard'}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/dashboard/view-feedback'}
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/dashboard/approve-rides/:id'}
        element={
          <ProtectedRoute>
            <ApproveRides />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/dashboard/settings'}
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing;
