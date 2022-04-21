import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/auth.context';

import './assets/css/global.css';

// Front-facing component imports
import LandingPage from './components/front-facing/LandingPage';
import HowToPage from './components/front-facing/HowTo';
import RequestRide from './components/front-facing/RequestRide';
import Press from './components/front-facing/Press';
import Success from './components/front-facing/Success';
import TermsAndConditions from './components/front-facing/TermsAndConditions';

// Backend component imports
import Login from './components/dashboard/Login';
import Dashboard from './components/dashboard/Dashboard';
import Feedback from './components/dashboard/Feedback';
import ApproveRides from './components/dashboard/ApproveRides';
import Settings from './components/dashboard/Settings';

// Protected routing
import ProtectedRoute from './components/general/ProtectedRoute';

// Press entries
import PressEntry1 from './components/front-facing/press-entries/PressEntry1';
import PressEntry2 from './components/front-facing/press-entries/PressEntry2';
import PressEntry3 from './components/front-facing/press-entries/PressEntry3';
import PressEntry4 from './components/front-facing/press-entries/PressEntry4';
import PressEntry5 from './components/front-facing/press-entries/PressEntry5';
import PressEntry6 from './components/front-facing/press-entries/PressEntry6';

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'/how-to-ride'} element={<HowToPage />} />
            <Route path={'/request-ride'} element={<RequestRide />} />
            <Route path={'/press'} element={<Press />} />
            <Route path={'/press/1'} element={<PressEntry1 />} />
            <Route path={'/press/2'} element={<PressEntry2 />} />
            <Route path={'/press/3'} element={<PressEntry3 />} />
            <Route path={'/press/4'} element={<PressEntry4 />} />
            <Route path={'/press/5'} element={<PressEntry5 />} />
            <Route path={'/press/6'} element={<PressEntry6 />} />
            <Route
              path={'/terms-and-conditions'}
              element={<TermsAndConditions />}
            />
            <Route path={'/success/:id'} element={<Success />} />
            <Route path={'/login'} element={<Login />} />
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
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
