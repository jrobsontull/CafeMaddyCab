import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import useGA from '../../utils/analytics';

/*
 * Non-lazy component imports for immediately served or small files
 */

// Front-facing component imports
import LandingPage from '../front-facing/LandingPage';
import HowToPage from '../front-facing/HowTo';
import Faq from '../front-facing/Faq';
import Success from '../front-facing/Success';
import TermsAndConditions from '../front-facing/TermsAndConditions';

// Others
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';

/*
 * Lazy load components with larger file sizes for faster web load speeds
 */
import Loading from './Loading';

// Larger frontend imports
const RequestRide = lazy(() => import('../front-facing/RequestRide'));
const Press = lazy(() => import('../front-facing/Press'));

// Backend component imports
const Login = lazy(() => import('../dashboard/Login'));
const Dashboard = lazy(() => import('../dashboard/Dashboard'));
const Feedback = lazy(() => import('../dashboard/Feedback'));
const ApproveRides = lazy(() => import('../dashboard/ApproveRides'));
const ChangePassword = lazy(() => import('../dashboard/ChangePassword'));
const RegisterUser = lazy(() => import('../dashboard/RegisterUser'));

// Press entries
const PressEntry1 = lazy(() =>
  import('../front-facing/press-entries/PressEntry1')
);
const PressEntry2 = lazy(() =>
  import('../front-facing/press-entries/PressEntry2')
);
const PressEntry3 = lazy(() =>
  import('../front-facing/press-entries/PressEntry3')
);
const PressEntry4 = lazy(() =>
  import('../front-facing/press-entries/PressEntry4')
);
const PressEntry5 = lazy(() =>
  import('../front-facing/press-entries/PressEntry5')
);
const PressEntry6 = lazy(() =>
  import('../front-facing/press-entries/PressEntry6')
);
const PressEntry7 = lazy(() =>
  import('../front-facing/press-entries/PressEntry7')
);
const PressEntry8 = lazy(() =>
  import('../front-facing/press-entries/PressEntry8')
);

function Routing() {
  // Enable Google Analytics in production
  useGA();

  return (
    <Routes>
      <Route path={'/'} element={<LandingPage />} />
      <Route path={'/how-to-ride'} element={<HowToPage />} />
      <Route path={'/faq'} element={<Faq />} />
      <Route
        path={'/request-ride'}
        element={
          <Suspense fallback={<Loading />}>
            <RequestRide />
          </Suspense>
        }
      />
      <Route
        path={'/press'}
        element={
          <Suspense fallback={<Loading />}>
            <Press />
          </Suspense>
        }
      />
      <Route path={'/terms-and-conditions'} element={<TermsAndConditions />} />
      <Route path={'/success/:id'} element={<Success />} />
      <Route
        path={'/login'}
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={'/press/1'}
        element={
          <Suspense fallback={<Loading />}>
            <PressEntry1 />
          </Suspense>
        }
      />
      <Route
        path={'/press/2'}
        element={
          <Suspense fallback={<Loading />}>
            <PressEntry2 />
          </Suspense>
        }
      />
      <Route
        path={'/press/3'}
        element={
          <Suspense fallback={<Loading />}>
            <PressEntry3 />
          </Suspense>
        }
      />
      <Route
        path={'/press/4'}
        element={
          <Suspense fallback={<Loading />}>
            <PressEntry4 />
          </Suspense>
        }
      />
      <Route
        path={'/press/5'}
        element={
          <Suspense fallback={<Loading />}>
            <PressEntry5 />
          </Suspense>
        }
      />
      <Route
        path={'/press/6'}
        element={
          <Suspense fallback={<Loading />}>
            <PressEntry6 />
          </Suspense>
        }
      />
      <Route
        path={'/press/7'}
        element={
          <Suspense fallback={<Loading />}>
            <PressEntry7 />
          </Suspense>
        }
      />
      <Route
        path={'/press/8'}
        element={
          <Suspense fallback={<Loading />}>
            <PressEntry8 />
          </Suspense>
        }
      />

      <Route
        path={'/dashboard'}
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={'/dashboard/view-feedback'}
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Feedback />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={'/dashboard/approve-rides/:id'}
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <ApproveRides />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={'/dashboard/change-password'}
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <ChangePassword />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={'/dashboard/register-user'}
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <RegisterUser />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
