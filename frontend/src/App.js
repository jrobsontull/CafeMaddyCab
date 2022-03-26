import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/auth.context';

import './assets/css/global.css';
import LandingPage from './components/LandingPage';
import RequestRide from './components/RequestRide';
import Success from './components/Success';
import Login from './components/Login';
import Management from './components/Management';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'/request-ride'} element={<RequestRide />} />
            <Route path={'/success/:id'} element={<Success />} />
            <Route path={'/login'} element={<Login />} />
            <Route
              path={'/management'}
              element={
                <ProtectedRoute>
                  <Management />
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
