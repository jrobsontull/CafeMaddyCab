import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/auth.context';

import './assets/css/global.css';
import LandingPage from './components/front-facing/LandingPage';
import HowToPage from './components/front-facing/HowTo';
import RequestRide from './components/front-facing/RequestRide';
import TermsAndConditions from './components/front-facing/TermsAndConditions';
import Success from './components/front-facing/Success';
import Login from './components/dashboard/Login';
import Dashboard from './components/dashboard/Dashboard';
import Feedback from './components/dashboard/Feedback';
import ApproveRides from './components/dashboard/ApproveRides';

import ProtectedRoute from './components/general/ProtectedRoute';

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'/how-to-ride'} element={<HowToPage />} />
            <Route path={'/request-ride'} element={<RequestRide />} />
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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
